import React from 'react';
import { SearchResultItem } from '../types';
import { ResultCard } from './ResultCard';
import { Flame, ShieldCheck, Info } from 'lucide-react';

interface RankingColumnProps {
  method: 'keyword' | 'pagerank';
  label: string;
  title: string;
  description: string;
  items: SearchResultItem[];
  query: string;
  onSelectPage: (pageId: number) => void;
}

export const RankingColumn: React.FC<RankingColumnProps> = ({
  method,
  label,
  title,
  description,
  items,
  query,
  onSelectPage,
}) => {
  const isKeyword = method === 'keyword';
  const maxKeywordScore = Math.max(1, ...items.map((i) => i.keywordScore));

  return (
    <div
      className={`flex flex-col h-full rounded-2xl border p-5 sm:p-6 transition-all ${
        isKeyword
          ? 'bg-[#10141D]/90 border-[#FFAA55]/30'
          : 'bg-[#10141D]/90 border-[#B6FF5C]/30 shadow-[0_0_30px_rgba(182,255,92,0.06)]'
      }`}
    >
      {/* Column Header */}
      <div className="border-b border-[#252E3D] pb-4 mb-5">
        <div className="flex items-center justify-between mb-1.5">
          <span
            className={`text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full font-bold border ${
              isKeyword
                ? 'bg-[#FFAA55]/10 border-[#FFAA55]/30 text-[#FFAA55]'
                : 'bg-[#B6FF5C]/10 border-[#B6FF5C]/30 text-[#B6FF5C]'
            }`}
          >
            {label}
          </span>
          <span className="text-xs font-mono text-[#929BAA]">
            {items.length} {items.length === 1 ? 'Page' : 'Pages'} Ranked
          </span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          {isKeyword ? (
            <Flame className="w-5 h-5 text-[#FFAA55]" />
          ) : (
            <ShieldCheck className="w-5 h-5 text-[#B6FF5C]" />
          )}
          <h3 className="text-lg sm:text-xl font-bold font-sans text-[#F5F7FA]">
            {title}
          </h3>
        </div>

        <p className="text-xs text-[#929BAA] leading-relaxed mb-3">
          {description}
        </p>

        {/* Formula Badge */}
        <div className="flex items-center gap-2 p-2 rounded-lg bg-[#080A0F] border border-[#252E3D] text-[11px] font-mono text-[#929BAA]">
          <Info className="w-3.5 h-3.5 shrink-0 text-[#43B5FF]" />
          {isKeyword ? (
            <span>
              Formula: <strong className="text-[#FFAA55]">Occurrences</strong> in URL + Title + Content
            </span>
          ) : (
            <span>
              Formula: <strong className="text-[#B6FF5C]">70% Normalized KW</strong> + <strong className="text-[#43B5FF]">30% Normalized PR</strong>
            </span>
          )}
        </div>
      </div>

      {/* Results List */}
      <div className="flex-1 space-y-3">
        {items.length === 0 ? (
          <div className="py-12 text-center text-[#929BAA] font-mono text-xs border border-dashed border-[#252E3D] rounded-xl p-6">
            <p className="mb-1 text-sm font-semibold text-[#F5F7FA]">No Matching Pages</p>
            <p>No indexed pages contain the term &ldquo;{query}&rdquo;.</p>
            <p className="mt-2 text-[#43B5FF]">Try searching for &ldquo;pizza&rdquo;, &ldquo;food&rdquo;, &ldquo;pune&rdquo;, or &ldquo;chai&rdquo;.</p>
          </div>
        ) : (
          items.map((item) => (
            <ResultCard
              key={item.page.id}
              item={item}
              method={method}
              maxKeywordScore={maxKeywordScore}
              onSelectPage={onSelectPage}
              query={query}
            />
          ))
        )}
      </div>

      {/* Bottom Insights Footer */}
      {items.length > 0 && (
        <div className="mt-5 pt-3 border-t border-[#252E3D] text-[11px] font-mono text-[#929BAA] flex items-center justify-between">
          <span>
            {isKeyword ? (
              <span>
                Sorted by: <strong className="text-[#FFAA55]">Raw frequency descending</strong>
              </span>
            ) : (
              <span>
                Sorted by: <strong className="text-[#B6FF5C]">Authority combined score</strong>
              </span>
            )}
          </span>
          <span className="text-[10px] text-[#43B5FF]">Click card to inspect</span>
        </div>
      )}
    </div>
  );
};
