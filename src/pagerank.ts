import { Page } from './types';

export interface PageRankComputation {
  scores: Map<number, number>;
  iterations: number;
  converged: boolean;
  history: Array<{ iteration: number; scores: Record<number, number>; delta: number }>;
}

const DAMPING_FACTOR = 0.85;
const CONVERGENCE_THRESHOLD = 0.000001;
const MAX_ITERATIONS = 200;

/**
 * Calculates the iterative PageRank of a list of active pages.
 * Handles dangling nodes correctly by redistributing their probability mass evenly.
 *
 * Formula:
 * PR(A) = (1 - d) / N + d * (sum(PR(T) / C(T)) + sum(PR(dangling) / N))
 */
export function calculatePageRank(
  pages: Page[],
  dampingFactor: number = DAMPING_FACTOR,
  threshold: number = CONVERGENCE_THRESHOLD,
  maxIterations: number = MAX_ITERATIONS
): PageRankComputation {
  const N = pages.length;
  if (N === 0) {
    return {
      scores: new Map(),
      iterations: 0,
      converged: true,
      history: [],
    };
  }

  const activeIds = new Set(pages.map((p) => p.id));

  // Map of page id to its valid outgoing links (only to other active pages)
  const outgoingMap = new Map<number, number[]>();
  // Map of page id to its incoming links from active pages
  const incomingMap = new Map<number, number[]>();

  pages.forEach((page) => {
    // Only count links pointing to pages that exist in the active set
    const validOutgoing = page.linksTo.filter((targetId) => activeIds.has(targetId));
    outgoingMap.set(page.id, validOutgoing);
    if (!incomingMap.has(page.id)) {
      incomingMap.set(page.id, []);
    }
  });

  // Populate incoming links
  pages.forEach((page) => {
    const validOutgoing = outgoingMap.get(page.id) || [];
    validOutgoing.forEach((targetId) => {
      const inc = incomingMap.get(targetId) || [];
      inc.push(page.id);
      incomingMap.set(targetId, inc);
    });
  });

  // Initial PageRank: 1 / N for each active page
  let currentScores = new Map<number, number>();
  pages.forEach((page) => {
    currentScores.set(page.id, 1 / N);
  });

  const history: Array<{ iteration: number; scores: Record<number, number>; delta: number }> = [];

  // Record iteration 0
  const initialSnapshot: Record<number, number> = {};
  pages.forEach((p) => {
    initialSnapshot[p.id] = 1 / N;
  });
  history.push({ iteration: 0, scores: initialSnapshot, delta: 1 });

  let iteration = 0;
  let converged = false;

  while (iteration < maxIterations && !converged) {
    iteration++;
    const nextScores = new Map<number, number>();

    // 1. Calculate dangling node sum
    // Dangling nodes are pages with 0 outgoing links to active pages
    let danglingSum = 0;
    pages.forEach((page) => {
      const out = outgoingMap.get(page.id) || [];
      if (out.length === 0) {
        danglingSum += currentScores.get(page.id) || 0;
      }
    });

    const baseRank = (1 - dampingFactor) / N;
    const danglingShare = (dampingFactor * danglingSum) / N;

    let maxDelta = 0;

    // 2. Compute new PR for each page
    pages.forEach((page) => {
      const inLinks = incomingMap.get(page.id) || [];
      let incomingSum = 0;

      inLinks.forEach((sourceId) => {
        const sourcePr = currentScores.get(sourceId) || 0;
        const sourceOutCount = outgoingMap.get(sourceId)?.length || 1;
        incomingSum += sourcePr / sourceOutCount;
      });

      const newPr = baseRank + danglingShare + dampingFactor * incomingSum;
      nextScores.set(page.id, newPr);

      const delta = Math.abs(newPr - (currentScores.get(page.id) || 0));
      if (delta > maxDelta) {
        maxDelta = delta;
      }
    });

    // Record history snapshot
    const scoreSnapshot: Record<number, number> = {};
    pages.forEach((p) => {
      scoreSnapshot[p.id] = nextScores.get(p.id) || 0;
    });
    history.push({ iteration, scores: scoreSnapshot, delta: maxDelta });

    currentScores = nextScores;

    if (maxDelta < threshold) {
      converged = true;
    }
  }

  return {
    scores: currentScores,
    iterations: iteration,
    converged,
    history,
  };
}

/**
 * Helper to get incoming links for a given page ID among active pages
 */
export function getIncomingLinks(pageId: number, activePages: Page[]): Page[] {
  const activeIds = new Set(activePages.map((p) => p.id));
  return activePages.filter((source) => {
    return source.linksTo.some((targetId) => targetId === pageId && activeIds.has(pageId));
  });
}

/**
 * Helper to get outgoing pages for a given page ID among active pages
 */
export function getOutgoingLinks(page: Page, activePages: Page[]): Page[] {
  const activeMap = new Map(activePages.map((p) => [p.id, p]));
  return page.linksTo
    .map((targetId) => activeMap.get(targetId))
    .filter((p): p is Page => p !== undefined);
}
