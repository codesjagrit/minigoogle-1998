import React from 'react';
import { ExternalLink, Link2, AlertTriangle, Hash, Award } from 'lucide-react';
import { SearchResultItem } from '../types';

interface ResultCardProps {
  item: SearchResultItem;
  method: 'keyword' | 'pagerank';
  maxKeywordScore: number;
  onSelectPage: (pageId: number) => void;
  query: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  item,
  method,
  maxKeywordScore,
  onSelectPage,
  query,
}) => {
  const { page, keywordScore, pageRank, combinedScore, keywordRank, pageRankRank, normalizedKeywordScore, normalizedPageRank } = item;
  const isMethodKeyword = method === 'keyword';
  const displayRank = isMethodKeyword ? keywordRank : pageRankRank;

  // Percentage for progress bars
  const kwPercentage = maxKeywordScore > 0 ? (keywordScore / maxKeywordScore) * 100 : 0;
  const combinedPercentage = Math.min(100, Math.max(5, combinedScore * 100));

  // Highlight query in text
  const highlightMatches = (text: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span
          key={i}
          className={
            isMethodKeyword
              ? 'bg-[#FFAA55]/20 text-[#FFAA55] font-semibold px-0.5 rounded'
              : 'bg-[#B6FF5C]/20 text-[#B6FF5C] font-semibold px-0.5 rounded'
          }
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const isTopRank = displayRank === 1;

  return (
    <div
      onClick={() => onSelectPage(page.id)}
      className={`group relative p-4 rounded-xl transition-all cursor-pointer border ${
        isTopRank
          ? isMethodKeyword
            ? 'bg-[#151B26] border-[#FFAA55]/50 shadow-[0_0_15px_rgba(255,170,85,0.1)] hover:border-[#FFAA55]'
            : 'bg-[#151B26] border-[#B6FF5C]/50 shadow-[0_0_20px_rgba(182,255,92,0.15)] hover:border-[#B6FF5C]'
          : 'bg-[#151B26]/80 border-[#252E3D] hover:border-[#43B5FF]/50 hover:bg-[#151B26]'
      }`}
    >
      {/* Top row: Rank badge, URL, and spam or top indicator */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Rank Badge */}
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
              isMethodKeyword
                ? isTopRank
                  ? 'bg-[#FFAA55] text-[#080A0F] shadow-[0_0_8px_rgba(255,170,85,0.4)]'
                  : 'bg-[#10141D] text-[#FFAA55] border border-[#FFAA55]/30'
                : isTopRank
                ? 'bg-[#B6FF5C] text-[#080A0F] shadow-[0_0_10px_rgba(182,255,92,0.5)]'
                : 'bg-[#10141D] text-[#B6FF5C] border border-[#B6FF5C]/30'
            }`}
          >
            #{displayRank}
          </div>

          {/* Website URL */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 font-mono text-xs text-[#43B5FF] group-hover:text-[#F5F7FA] transition-colors truncate">
              <span className="font-semibold truncate">{page.url}</span>
              <ExternalLink className="w-3 h-3 shrink-0 text-[#929BAA] group-hover:text-[#B6FF5C]" />
            </div>
            <div className="text-[11px] text-[#929BAA] truncate">
              {page.title}
            </div>
          </div>
        </div>

        {/* Flag badges */}
        <div className="flex items-center gap-1 shrink-0">
          {page.isSpam && (
            <span
              className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-[#FF626C]/10 border border-[#FF626C]/30 text-[#FF626C]"
              title="Keyword Stuffing Detected"
            >
              <AlertTriangle className="w-3 h-3" />
              STUFFED
            </span>
          )}
          {isTopRank && (
            <span
              className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded ${
                isMethodKeyword
                  ? 'bg-[#FFAA55]/15 border border-[#FFAA55]/40 text-[#FFAA55]'
                  : 'bg-[#B6FF5C]/15 border border-[#B6FF5C]/40 text-[#B6FF5C]'
              }`}
            >
              <Award className="w-3 h-3" />
              RANK #1
            </span>
          )}
        </div>
      </div>

      {/* Description Snippet */}
      <p className="text-xs text-[#929BAA] font-sans line-clamp-2 mb-3 leading-relaxed">
        {highlightMatches(page.content)}
      </p>

      {/* Method-specific metrics & Score Bar */}
      {isMethodKeyword ? (
        /* Traditional Keyword Search View */
        <div className="space-y-1.5 pt-2 border-t border-[#252E3D]/50">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-[#929BAA] flex items-center gap-1">
              <Hash className="w-3 h-3 text-[#FFAA55]" />
              Keyword Occurrences:
            </span>
            <span className="text-[#FFAA55] font-bold">
              {keywordScore} match{keywordScore !== 1 ? 'es' : ''}
              <span className="text-[#929BAA] font-normal text-[10px] ml-1">
                ({item.keywordMatches.urlMatches} url, {item.keywordMatches.contentMatches} text)
              </span>
            </span>
          </div>

          {/* Orange/Red Progress Bar */}
          <div className="w-full bg-[#10141D] rounded-full h-2 overflow-hidden border border-[#252E3D]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#FFAA55] to-[#FF626C] transition-all duration-500"
              style={{ width: `${kwPercentage}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-[#929BAA]">
            <span>Density: {item.keywordMatches.keywordDensity}%</span>
            <span>Raw Keyword Score: {keywordScore}</span>
          </div>
        </div>
      ) : (
        /* PageRank Link Authority View */
        <div className="space-y-2 pt-2 border-t border-[#252E3D]/50">
          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
            <div className="flex items-center justify-between bg-[#10141D] px-2 py-1 rounded border border-[#252E3D]">
              <span className="text-[#929BAA]">PageRank:</span>
              <span className="text-[#B6FF5C] font-bold">{pageRank.toFixed(4)}</span>
            </div>
            <div className="flex items-center justify-between bg-[#10141D] px-2 py-1 rounded border border-[#252E3D]">
              <span className="text-[#929BAA]">Combined:</span>
              <span className="text-[#43B5FF] font-bold">{combinedScore.toFixed(3)}</span>
            </div>
          </div>

          {/* Neon Green Combined Score Bar */}
          <div>
            <div className="flex justify-between items-center text-[10px] font-mono text-[#929BAA] mb-1">
              <span>Authority + Relevance Score</span>
              <span className="text-[#B6FF5C] font-semibold">{Math.round(combinedScore * 100)}%</span>
            </div>
            <div className="w-full bg-[#10141D] rounded-full h-2 overflow-hidden border border-[#252E3D]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#43B5FF] to-[#B6FF5C] transition-all duration-500 shadow-[0_0_8px_rgba(182,255,92,0.4)]"
                style={{ width: `${combinedPercentage}%` }}
              />
            </div>
          </div>

          {/* Breakdown pill */}
          <div className="flex items-center justify-between text-[10px] font-mono text-[#929BAA]">
            <span>Formula: 70% KW ({normalizedKeywordScore.toFixed(2)}) + 30% PR ({normalizedPageRank.toFixed(2)})</span>
            <span className="text-[#B6FF5C] flex items-center gap-1">
              <Link2 className="w-3 h-3" />
              {page.linksTo.length} out
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
