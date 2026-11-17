import React, { useEffect } from 'react';
import { Page } from '../types';
import { getIncomingLinks, getOutgoingLinks } from '../pagerank';
import { analyzePageKeywords } from '../searchRanking';
import {
  X,
  Terminal,
  ExternalLink,
  ArrowDownLeft,
  ArrowUpRight,
  FileText,
  AlertTriangle,
} from 'lucide-react';

interface PageExplorerProps {
  pageId: number | null;
  allPages: Page[];
  pageRankMap: Map<number, number>;
  query: string;
  onClose: () => void;
  onSelectPage: (id: number) => void;
}

export const PageExplorer: React.FC<PageExplorerProps> = ({
  pageId,
  allPages,
  pageRankMap,
  query,
  onClose,
  onSelectPage,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (pageId === null) return null;

  const page = allPages.find((p) => p.id === pageId);
  if (!page) return null;

  const incomingLinks = getIncomingLinks(page.id, allPages);
  const outgoingLinks = getOutgoingLinks(page, allPages);
  const prScore = pageRankMap.get(page.id) || 0;
  const keywordAnalysis = analyzePageKeywords(page, query);

  // Normalized scores for active dataset
  const activePrs = allPages.map((p) => pageRankMap.get(p.id) || 0);
  const minPr = Math.min(...activePrs);
  const maxPr = Math.max(...activePrs);
  const normPr = maxPr === minPr ? 1 : (prScore - minPr) / (maxPr - minPr);

  const activeKws = allPages.map((p) => analyzePageKeywords(p, query).totalMatches);
  const relevantKws = activeKws.filter((c) => c > 0);
  const minKw = relevantKws.length > 0 ? Math.min(...relevantKws) : 0;
  const maxKw = relevantKws.length > 0 ? Math.max(...relevantKws) : 1;
  const normKw =
    keywordAnalysis.totalMatches === 0
      ? 0
      : maxKw === minKw
      ? 1
      : (keywordAnalysis.totalMatches - minKw) / (maxKw - minKw);

  const combinedScore = keywordAnalysis.totalMatches > 0 ? 0.7 * normKw + 0.3 * normPr : 0;

  // Highlight query in text
  const highlightMatches = (text: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark
          key={i}
          className="bg-[#B6FF5C]/30 text-[#B6FF5C] font-mono px-1 py-0.5 rounded border border-[#B6FF5C]/40"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080A0F]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#10141D] border border-[#252E3D] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-[#151B26] border-b border-[#252E3D]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#FF626C]/80" />
              <span className="w-3 h-3 rounded-full bg-[#FFAA55]/80" />
              <span className="w-3 h-3 rounded-full bg-[#B6FF5C]/80" />
            </div>
            <div className="h-4 w-[1px] bg-[#252E3D] mx-2" />
            <div className="flex items-center gap-2 text-xs font-mono text-[#F5F7FA]">
              <Terminal className="w-3.5 h-3.5 text-[#B6FF5C]" />
              <span>NODE_INSPECTOR // PAGE_{String(page.id).padStart(2, '0')}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#929BAA] hover:text-[#F5F7FA] hover:bg-[#252E3D] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 font-mono">
          {/* Identity Card */}
          <div className="p-4 rounded-xl bg-[#080A0F] border border-[#252E3D]">
            <div className="flex items-center justify-between text-xs text-[#929BAA] mb-1">
              <span>TARGET NODE: PAGE #{page.id}</span>
              {page.isSpam && (
                <span className="text-[#FF626C] flex items-center gap-1 font-bold">
                  <AlertTriangle className="w-3 h-3" />
                  FLAGGED SPAMMER
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-[#F5F7FA] truncate flex items-center gap-2">
              <span className="text-[#B6FF5C]">{page.url}</span>
              <a
                href={`https://${page.url}`}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.preventDefault()}
                className="text-[#929BAA] hover:text-[#43B5FF]"
                title="Mock destination"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </h3>
            <p className="text-xs text-[#929BAA] mt-1 font-sans">{page.title}</p>
          </div>

          {/* Metrics Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-3 rounded-xl bg-[#151B26] border border-[#252E3D]">
              <div className="text-[10px] text-[#929BAA] uppercase tracking-wider mb-1">
                PageRank
              </div>
              <div className="text-base font-bold text-[#B6FF5C]">
                {prScore.toFixed(4)}
              </div>
              <div className="text-[10px] text-[#929BAA]">
                Norm: {normPr.toFixed(3)}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#151B26] border border-[#252E3D]">
              <div className="text-[10px] text-[#929BAA] uppercase tracking-wider mb-1">
                Matches &ldquo;{query}&rdquo;
              </div>
              <div className="text-base font-bold text-[#FFAA55]">
                {keywordAnalysis.totalMatches}
              </div>
              <div className="text-[10px] text-[#929BAA]">
                Density: {keywordAnalysis.keywordDensity}%
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#151B26] border border-[#252E3D]">
              <div className="text-[10px] text-[#929BAA] uppercase tracking-wider mb-1">
                Combined Score
              </div>
              <div className="text-base font-bold text-[#43B5FF]">
                {combinedScore.toFixed(3)}
              </div>
              <div className="text-[10px] text-[#929BAA]">
                70% KW + 30% PR
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#151B26] border border-[#252E3D]">
              <div className="text-[10px] text-[#929BAA] uppercase tracking-wider mb-1">
                Link Balance
              </div>
              <div className="text-base font-bold text-[#F5F7FA]">
                {incomingLinks.length} <span className="text-[#929BAA] font-normal text-xs">in</span> /{' '}
                {outgoingLinks.length} <span className="text-[#929BAA] font-normal text-xs">out</span>
              </div>
              <div className="text-[10px] text-[#929BAA]">
                Net: {incomingLinks.length - outgoingLinks.length >= 0 ? `+${incomingLinks.length - outgoingLinks.length}` : incomingLinks.length - outgoingLinks.length}
              </div>
            </div>
          </div>

          {/* Full Page Content Preview */}
          <div className="p-4 rounded-xl bg-[#080A0F] border border-[#252E3D]">
            <div className="flex items-center justify-between text-xs text-[#929BAA] mb-2">
              <span className="flex items-center gap-1.5 font-semibold text-[#F5F7FA]">
                <FileText className="w-3.5 h-3.5 text-[#43B5FF]" />
                RAW PAGE CONTENT (HTML BODY)
              </span>
              <span className="text-[10px] text-[#929BAA]">
                Word count: {page.content.split(/\s+/).length}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-[#10141D] border border-[#252E3D]/60 text-xs text-[#F5F7FA] font-sans leading-relaxed break-words">
              {highlightMatches(page.content)}
            </div>
          </div>

          {/* Incoming & Outgoing Connections Breakdown */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Incoming Links */}
            <div className="p-4 rounded-xl bg-[#151B26] border border-[#252E3D]">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#43B5FF] font-bold flex items-center gap-1">
                  <ArrowDownLeft className="w-3.5 h-3.5" />
                  INCOMING LINKS ({incomingLinks.length})
                </span>
                <span className="text-[10px] text-[#929BAA]">Votes Received</span>
              </div>

              {incomingLinks.length === 0 ? (
                <div className="text-xs text-[#929BAA] italic py-2">
                  No incoming links (zero authority votes).
                </div>
              ) : (
                <div className="space-y-1.5">
                  {incomingLinks.map((inPage) => (
                    <button
                      key={inPage.id}
                      onClick={() => onSelectPage(inPage.id)}
                      className="w-full text-left p-2 rounded-lg bg-[#10141D] hover:bg-[#252E3D] border border-[#252E3D] hover:border-[#43B5FF] text-xs text-[#F5F7FA] flex items-center justify-between transition-colors group"
                    >
                      <span className="truncate group-hover:text-[#43B5FF]">
                        P{inPage.id} • {inPage.url}
                      </span>
                      <span className="text-[10px] text-[#B6FF5C] shrink-0 font-mono">
                        PR {(pageRankMap.get(inPage.id) || 0).toFixed(3)}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Outgoing Links */}
            <div className="p-4 rounded-xl bg-[#151B26] border border-[#252E3D]">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#B6FF5C] font-bold flex items-center gap-1">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  OUTGOING LINKS ({outgoingLinks.length})
                </span>
                <span className="text-[10px] text-[#929BAA]">Votes Cast</span>
              </div>

              {outgoingLinks.length === 0 ? (
                <div className="text-xs text-[#929BAA] italic py-2">
                  Dangling node (0 outgoing links).
                </div>
              ) : (
                <div className="space-y-1.5">
                  {outgoingLinks.map((outPage) => (
                    <button
                      key={outPage.id}
                      onClick={() => onSelectPage(outPage.id)}
                      className="w-full text-left p-2 rounded-lg bg-[#10141D] hover:bg-[#252E3D] border border-[#252E3D] hover:border-[#B6FF5C] text-xs text-[#F5F7FA] flex items-center justify-between transition-colors group"
                    >
                      <span className="truncate group-hover:text-[#B6FF5C]">
                        P{outPage.id} • {outPage.url}
                      </span>
                      <span className="text-[10px] text-[#43B5FF] shrink-0 font-mono">
                        Inspect &rarr;
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#151B26] border-t border-[#252E3D] flex items-center justify-between text-xs text-[#929BAA]">
          <span>Use links above to navigate graph nodes</span>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded-lg bg-[#252E3D] text-[#F5F7FA] hover:bg-[#3A465B] transition-colors"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
};
