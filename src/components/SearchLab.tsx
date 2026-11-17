import React from 'react';
import { SearchRankingResult } from '../searchRanking';
import { RankingColumn } from './RankingColumn';
import { ArrowLeftRight, AlertOctagon } from 'lucide-react';

interface SearchLabProps {
  rankingResult: SearchRankingResult;
  onSelectPage: (pageId: number) => void;
  onOpenSpamScanner: () => void;
}

export const SearchLab: React.FC<SearchLabProps> = ({
  rankingResult,
  onSelectPage,
  onOpenSpamScanner,
}) => {
  const { keywordRanked, pageRankRanked, query } = rankingResult;

  // Find top page in each method
  const topKeywordPage = keywordRanked[0];
  const topPageRankPage = pageRankRanked[0];

  const rankingDivergence =
    topKeywordPage &&
    topPageRankPage &&
    topKeywordPage.page.id !== topPageRankPage.page.id;

  return (
    <section id="search-lab" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#151B26] border border-[#252E3D] text-[#B6FF5C] text-xs font-mono mb-3">
          <ArrowLeftRight className="w-3.5 h-3.5" />
          <span>ALGORITHM COMPARISON ENGINE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] font-sans tracking-tight mb-3">
          ONE QUERY. <span className="text-[#B6FF5C]">TWO DIFFERENT RESULTS.</span>
        </h2>
        <p className="text-sm sm:text-base text-[#929BAA] leading-relaxed">
          Compare how keyword frequency and link authority influence search rankings.
        </p>
      </div>

      {/* Analytical Callout Banner when top rankings diverge */}
      {rankingDivergence && query.toLowerCase() === 'pizza' && (
        <div className="mb-8 p-4 rounded-xl bg-[#151B26] border border-[#FFAA55]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-[0_0_20px_rgba(255,170,85,0.08)]">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded bg-[#080A0F] border border-[#FFAA55]/30 text-[#FFAA55] shrink-0 mt-0.5">
              <AlertOctagon className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-mono font-bold text-[#FFAA55] uppercase tracking-wider mb-0.5">
                CRITICAL RANKING ANOMALY OBSERVED
              </div>
              <p className="text-xs text-[#F5F7FA] leading-relaxed">
                Traditional keyword ranking ranks <strong className="text-[#FF626C]">{topKeywordPage.page.url}</strong> at #1 simply because it repeats &ldquo;pizza&rdquo; {topKeywordPage.keywordScore} times. But PageRank identifies that <strong className="text-[#B6FF5C]">{topPageRankPage.page.url}</strong> has real authority with multiple incoming links.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenSpamScanner}
            className="shrink-0 px-3 py-1.5 rounded-lg bg-[#FFAA55]/15 border border-[#FFAA55]/40 text-[#FFAA55] hover:bg-[#FFAA55]/25 text-xs font-mono font-semibold transition-colors"
          >
            SCAN SPAM &rarr;
          </button>
        </div>
      )}

      {/* Two-Panel Comparison Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
        {/* Left Panel: Traditional Search */}
        <RankingColumn
          method="keyword"
          label="METHOD 01 / TRADITIONAL SEARCH"
          title="Keyword Frequency"
          description="Pages are ranked by how often the search term appears in their title, URL, and content."
          items={keywordRanked}
          query={query}
          onSelectPage={onSelectPage}
        />

        {/* Right Panel: PageRank Algorithm */}
        <RankingColumn
          method="pagerank"
          label="METHOD 02 / LINK AUTHORITY"
          title="PageRank Algorithm"
          description="Pages are ranked using keyword relevance and the importance of websites linking to them."
          items={pageRankRanked}
          query={query}
          onSelectPage={onSelectPage}
        />
      </div>
    </section>
  );
};
