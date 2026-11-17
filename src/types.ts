export interface Page {
  id: number;
  url: string;
  title?: string;
  content: string;
  linksTo: number[]; // Target page IDs
  isSpam?: boolean;
}

export interface PageRankScore {
  pageId: number;
  score: number;
  iterations: number;
  converged: boolean;
}

export interface KeywordMatch {
  urlMatches: number;
  contentMatches: number;
  totalMatches: number;
  keywordDensity: number; // percentage
}

export interface SearchResultItem {
  page: Page;
  keywordScore: number;
  keywordMatches: KeywordMatch;
  normalizedKeywordScore: number;
  pageRank: number;
  normalizedPageRank: number;
  combinedScore: number;
  keywordRank: number;
  pageRankRank: number;
}

export interface SpamDetectionResult {
  page: Page;
  occurrences: number;
  density: number;
  incomingLinksCount: number;
  pageRank: number;
  isFlagged: boolean;
  reasons: string[];
}

export interface GraphNode {
  id: string;
  pageId: number;
  url: string;
  pageRank: number;
  inDegree: number;
  outDegree: number;
  x: number;
  y: number;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  sourceId: number;
  targetId: number;
}
