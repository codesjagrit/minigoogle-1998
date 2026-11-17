import React from 'react';
import { Layers, Network, Activity, Crown, Search } from 'lucide-react';
import { Page } from '../types';

interface StatisticsPanelProps {
  pages: Page[];
  pageRankMap: Map<number, number>;
  searchResultsCount: number;
  query: string;
}

export const StatisticsPanel: React.FC<StatisticsPanelProps> = ({
  pages,
  pageRankMap,
  searchResultsCount,
  query,
}) => {
  // Dynamically calculate:
  // 1. Total Indexed Pages
  const totalPages = pages.length;

  // 2. Total Directed Links among active pages
  const activeIds = new Set(pages.map((p) => p.id));
  const totalDirectedLinks = pages.reduce((acc, p) => {
    return acc + p.linksTo.filter((targetId) => activeIds.has(targetId)).length;
  }, 0);

  // 3. Average PageRank
  const avgPageRank =
    totalPages > 0
      ? Array.from(pageRankMap.values()).reduce((a, b) => a + b, 0) / totalPages
      : 0;

  // 4. Highest Authority Page
  let highestAuthorityPage: Page | null = null;
  let highestAuthorityScore = -1;
  pages.forEach((page) => {
    const score = pageRankMap.get(page.id) || 0;
    if (score > highestAuthorityScore) {
      highestAuthorityScore = score;
      highestAuthorityPage = page;
    }
  });

  return (
    <div className="w-full bg-[#10141D] border-y border-[#252E3D] py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 lg:gap-4">
          {/* Metric 1: Total Indexed Pages */}
          <div className="bg-[#151B26] p-3 rounded-lg border border-[#252E3D]/70 flex items-center gap-3">
            <div className="p-2 rounded bg-[#080A0F] border border-[#252E3D] text-[#43B5FF]">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#929BAA]">
                Indexed Pages
              </div>
              <div className="text-lg font-mono font-bold text-[#F5F7FA]">
                {String(totalPages).padStart(2, '0')}
                <span className="text-xs text-[#929BAA] font-normal ml-1">/ 06</span>
              </div>
            </div>
          </div>

          {/* Metric 2: Total Directed Links */}
          <div className="bg-[#151B26] p-3 rounded-lg border border-[#252E3D]/70 flex items-center gap-3">
            <div className="p-2 rounded bg-[#080A0F] border border-[#252E3D] text-[#B6FF5C]">
              <Network className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#929BAA]">
                Directed Links
              </div>
              <div className="text-lg font-mono font-bold text-[#B6FF5C]">
                {String(totalDirectedLinks).padStart(2, '0')}
                <span className="text-xs text-[#929BAA] font-normal ml-1">active</span>
              </div>
            </div>
          </div>

          {/* Metric 3: Average PageRank */}
          <div className="bg-[#151B26] p-3 rounded-lg border border-[#252E3D]/70 flex items-center gap-3">
            <div className="p-2 rounded bg-[#080A0F] border border-[#252E3D] text-[#43B5FF]">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#929BAA]">
                Avg PageRank
              </div>
              <div className="text-lg font-mono font-bold text-[#F5F7FA]">
                {avgPageRank.toFixed(4)}
              </div>
            </div>
          </div>

          {/* Metric 4: Highest Authority Page */}
          <div className="bg-[#151B26] p-3 rounded-lg border border-[#252E3D]/70 flex items-center gap-3 col-span-2 md:col-span-1">
            <div className="p-2 rounded bg-[#080A0F] border border-[#B6FF5C]/30 text-[#B6FF5C]">
              <Crown className="w-4 h-4" />
            </div>
            <div className="truncate min-w-0">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#929BAA]">
                Top Authority
              </div>
              <div className="text-xs font-mono font-bold text-[#B6FF5C] truncate">
                {highestAuthorityPage ? (highestAuthorityPage as Page).url.split('.')[0] : 'None'}
              </div>
              <div className="text-[10px] text-[#929BAA] font-mono">
                PR {highestAuthorityScore.toFixed(3)}
              </div>
            </div>
          </div>

          {/* Metric 5: Current Search Results */}
          <div className="bg-[#151B26] p-3 rounded-lg border border-[#252E3D]/70 flex items-center gap-3 col-span-2 md:col-span-1">
            <div className="p-2 rounded bg-[#080A0F] border border-[#252E3D] text-[#FFAA55]">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#929BAA]">
                Results for &ldquo;{query || '*'}&rdquo;
              </div>
              <div className="text-lg font-mono font-bold text-[#FFAA55]">
                {String(searchResultsCount).padStart(2, '0')}
                <span className="text-xs text-[#929BAA] font-normal ml-1">pages</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
