import { Page, SearchResultItem, KeywordMatch } from './types';

/**
 * Counts keyword occurrences in a string (case-insensitive, whole-word or substring matching).
 * Tokenizes text and also checks whole word vs substring occurrences for search precision.
 */
export function countKeywordMatches(text: string, query: string): number {
  if (!query.trim() || !text) return 0;
  
  const cleanQuery = query.trim().toLowerCase();
  // Match word boundaries or substring for flexibility
  const regex = new RegExp(`\\b${escapeRegExp(cleanQuery)}\\b`, 'gi');
  const matches = text.match(regex);
  if (matches && matches.length > 0) {
    return matches.length;
  }
  
  // Fallback to substring match if no word boundary match (e.g. within url dashes)
  const subRegex = new RegExp(escapeRegExp(cleanQuery), 'gi');
  const subMatches = text.match(subRegex);
  return subMatches ? subMatches.length : 0;
}

function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Calculates keyword occurrences in URL, title, and content.
 */
export function analyzePageKeywords(page: Page, query: string): KeywordMatch {
  const urlMatches = countKeywordMatches(page.url.replace(/[-_.]/g, ' '), query);
  const titleMatches = countKeywordMatches(page.title || '', query);
  const contentMatches = countKeywordMatches(page.content, query);
  const totalMatches = urlMatches + titleMatches + contentMatches;

  // Calculate density against total words in page content + title
  const words = `${page.title || ''} ${page.content}`.trim().split(/\s+/).filter(Boolean).length;
  const keywordDensity = words > 0 ? (totalMatches / words) * 100 : 0;

  return {
    urlMatches,
    contentMatches: titleMatches + contentMatches,
    totalMatches,
    keywordDensity: Math.round(keywordDensity * 10) / 10,
  };
}

export interface SearchRankingResult {
  keywordRanked: SearchResultItem[];
  pageRankRanked: SearchResultItem[];
  query: string;
  totalMatches: number;
}

/**
 * Performs search ranking using both Method 1 (Keyword Frequency) and Method 2 (PageRank).
 *
 * Method 1 Formula:
 * Keyword Score = Occurrences in URL + title + content
 *
 * Method 2 Formula:
 * Combined Score = 70% Normalized Keyword Relevance + 30% Normalized PageRank
 * Both scores are normalized between 0 and 1 within the active matching dataset.
 * Only pages with keyword relevance > 0 are included in the results.
 */
export function performSearchRanking(
  pages: Page[],
  pageRankMap: Map<number, number>,
  query: string
): SearchRankingResult {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    return {
      keywordRanked: [],
      pageRankRanked: [],
      query: '',
      totalMatches: 0,
    };
  }

  // 1. Calculate keyword matches for all active pages
  const itemsWithMatches = pages.map((page) => {
    const matches = analyzePageKeywords(page, trimmedQuery);
    const pr = pageRankMap.get(page.id) || 0;
    return {
      page,
      keywordScore: matches.totalMatches,
      keywordMatches: matches,
      pageRank: pr,
    };
  });

  // Only include pages with keyword relevance > 0
  const relevantItems = itemsWithMatches.filter((item) => item.keywordScore > 0);

  if (relevantItems.length === 0) {
    return {
      keywordRanked: [],
      pageRankRanked: [],
      query: trimmedQuery,
      totalMatches: 0,
    };
  }

  // Find min and max for normalization within the active matching dataset
  const maxKw = Math.max(...relevantItems.map((item) => item.keywordScore));
  const minKw = Math.min(...relevantItems.map((item) => item.keywordScore));

  const maxPr = Math.max(...relevantItems.map((item) => item.pageRank));
  const minPr = Math.min(...relevantItems.map((item) => item.pageRank));

  // Build normalized search items
  const fullItems: Omit<SearchResultItem, 'keywordRank' | 'pageRankRank'>[] = relevantItems.map(
    (item) => {
      // Linear normalization between 0 and 1
      // If min === max, normalize to 1.0 (all equally matched)
      const normKw = maxKw === minKw ? 1.0 : (item.keywordScore - minKw) / (maxKw - minKw);
      const normPr = maxPr === minPr ? 1.0 : (item.pageRank - minPr) / (maxPr - minPr);

      // Documented Formula: 70% Normalized Keyword + 30% Normalized PageRank
      const combinedScore = 0.7 * normKw + 0.3 * normPr;

      return {
        page: item.page,
        keywordScore: item.keywordScore,
        keywordMatches: item.keywordMatches,
        normalizedKeywordScore: normKw,
        pageRank: item.pageRank,
        normalizedPageRank: normPr,
        combinedScore: Math.round(combinedScore * 1000) / 1000,
      };
    }
  );

  // Method 1: Sort strictly by keyword score descending (tie-break by page ID)
  const keywordSorted = [...fullItems].sort((a, b) => {
    if (b.keywordScore !== a.keywordScore) {
      return b.keywordScore - a.keywordScore;
    }
    return a.page.id - b.page.id;
  });

  const keywordRanked: SearchResultItem[] = keywordSorted.map((item, index) => ({
    ...item,
    keywordRank: index + 1,
    pageRankRank: 0,
  }));

  // Method 2: Sort strictly by combined score descending
  const pageRankSorted = [...fullItems].sort((a, b) => {
    if (Math.abs(b.combinedScore - a.combinedScore) > 0.0001) {
      return b.combinedScore - a.combinedScore;
    }
    // Tie breaker: actual pageRank
    if (b.pageRank !== a.pageRank) {
      return b.pageRank - a.pageRank;
    }
    return a.page.id - b.page.id;
  });

  const pageRankRanked: SearchResultItem[] = pageRankSorted.map((item, index) => ({
    ...item,
    keywordRank: 0,
    pageRankRank: index + 1,
  }));

  // Update cross ranks
  keywordRanked.forEach((item) => {
    const prIndex = pageRankRanked.findIndex((p) => p.page.id === item.page.id);
    item.pageRankRank = prIndex !== -1 ? prIndex + 1 : 0;
  });

  pageRankRanked.forEach((item) => {
    const kwIndex = keywordRanked.findIndex((p) => p.page.id === item.page.id);
    item.keywordRank = kwIndex !== -1 ? kwIndex + 1 : 0;
  });

  return {
    keywordRanked,
    pageRankRanked,
    query: trimmedQuery,
    totalMatches: relevantItems.length,
  };
}
