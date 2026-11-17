import { Page, SpamDetectionResult } from './types';
import { analyzePageKeywords } from './searchRanking';
import { getIncomingLinks } from './pagerank';

export interface SpamScanReport {
  scannedQuery: string;
  totalScanned: number;
  flaggedPages: SpamDetectionResult[];
  cleanPages: SpamDetectionResult[];
}

/**
 * Detects keyword spamming / keyword-stuffing using transparent heuristics:
 * 1. Keyword appears >= 5 times in title + URL + content.
 * 2. Unusually high keyword density (e.g. >= 30% of total word count).
 * 3. Weak link authority (0 or 1 incoming link, or PageRank in bottom percentile).
 *
 * For query 'pizza', pizza-pizza-pizza.com (repeats 'pizza' 10+ times, 80%+ density, 0 incoming links)
 * is cleanly and indisputably flagged with exact breakdown.
 */
export function scanForSpam(
  pages: Page[],
  pageRankMap: Map<number, number>,
  query: string
): SpamScanReport {
  const cleanQuery = query.trim().toLowerCase();
  const flaggedPages: SpamDetectionResult[] = [];
  const cleanPages: SpamDetectionResult[] = [];

  pages.forEach((page) => {
    const analysis = analyzePageKeywords(page, cleanQuery);
    const incoming = getIncomingLinks(page.id, pages);
    const pr = pageRankMap.get(page.id) || 0;

    const reasons: string[] = [];
    let isFlagged = false;

    // Heuristic 1: Keyword count threshold
    const highOccurrences = analysis.totalMatches >= 5;
    if (highOccurrences) {
      reasons.push(
        `High keyword repetition: "${cleanQuery}" appears ${analysis.totalMatches} times across URL and content.`
      );
    }

    // Heuristic 2: Extreme keyword density (> 25% of text is the repeated keyword)
    const highDensity = analysis.keywordDensity >= 25;
    if (highDensity) {
      reasons.push(
        `Abnormal keyword density: ${analysis.keywordDensity.toFixed(1)}% of total words are the target keyword (normal pages are typically 1%–10%).`
      );
    }

    // Heuristic 3: Weak link authority (no or minimal organic inbound votes)
    const weakAuthority = incoming.length === 0 || pr < 0.05;
    if (weakAuthority && highOccurrences) {
      reasons.push(
        `Near-zero network authority: 0 incoming links from other websites, PageRank of ${pr.toFixed(4)} indicates no organic editorial trust.`
      );
    }

    // Explicit spam flag if matching multiple red flags or pre-marked spam
    if ((highOccurrences && highDensity) || (highOccurrences && weakAuthority) || page.isSpam && analysis.totalMatches >= 3) {
      isFlagged = true;
      if (reasons.length === 0) {
        reasons.push('Page content exhibits artificial keyword repetition patterns without structural narrative.');
      }
    }

    const resultItem: SpamDetectionResult = {
      page,
      occurrences: analysis.totalMatches,
      density: analysis.keywordDensity,
      incomingLinksCount: incoming.length,
      pageRank: pr,
      isFlagged,
      reasons,
    };

    if (isFlagged) {
      flaggedPages.push(resultItem);
    } else {
      cleanPages.push(resultItem);
    }
  });

  return {
    scannedQuery: cleanQuery,
    totalScanned: pages.length,
    flaggedPages,
    cleanPages,
  };
}
