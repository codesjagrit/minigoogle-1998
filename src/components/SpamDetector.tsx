import React, { useState } from 'react';
import { Page } from '../types';
import { scanForSpam, SpamScanReport } from '../spamDetection';
import {
  ShieldAlert,
  Radar,
  Trash2,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Link,
  Percent,
  Hash,
} from 'lucide-react';

interface SpamDetectorProps {
  pages: Page[];
  originalPages: Page[];
  pageRankMap: Map<number, number>;
  query: string;
  onRemovePage: (pageId: number) => void;
  onRemoveAllFlagged: (flaggedIds: number[]) => void;
  onRestoreAll: () => void;
  onSelectPage: (pageId: number) => void;
}

export const SpamDetector: React.FC<SpamDetectorProps> = ({
  pages,
  originalPages,
  pageRankMap,
  query,
  onRemovePage,
  onRemoveAllFlagged,
  onRestoreAll,
  onSelectPage,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [scanReport, setScanReport] = useState<SpamScanReport | null>(null);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      const report = scanForSpam(pages, pageRankMap, query || 'pizza');
      setScanReport(report);
      setIsScanning(false);
      setHasScanned(true);
    }, 400);
  };

  const isIndexModified = pages.length < originalPages.length;

  return (
    <section id="spam-detector" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#252E3D]/60">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#151B26] border border-[#FFAA55]/40 text-[#FFAA55] text-xs font-mono mb-2">
            <ShieldAlert className="w-3.5 h-3.5 text-[#FFAA55]" />
            <span>HEURISTIC INTEGRITY ANALYZER</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] font-sans tracking-tight">
            DETECT <span className="text-[#FFAA55]">KEYWORD SPAM.</span>
          </h2>
          <p className="text-sm text-[#929BAA] max-w-2xl mt-1">
            Early search engines were plagued by &ldquo;keyword stuffing&rdquo; — repeating a term dozens of times to trick rank algorithms. Uncover how PageRank and transparent heuristics dismantle spam.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {isIndexModified && (
            <button
              onClick={onRestoreAll}
              className="px-4 py-2.5 rounded-xl bg-[#151B26] border border-[#B6FF5C]/40 text-[#B6FF5C] hover:bg-[#B6FF5C]/15 font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(182,255,92,0.1)]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              RESTORE ALL PAGES (06)
            </button>
          )}

          <button
            onClick={handleScan}
            disabled={isScanning}
            className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
              isScanning
                ? 'bg-[#252E3D] text-[#929BAA] cursor-not-allowed'
                : 'bg-gradient-to-r from-[#FFAA55] to-[#FF626C] text-[#080A0F] hover:opacity-95 shadow-[0_0_20px_rgba(255,170,85,0.3)]'
            }`}
          >
            <Radar className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'SCANNING INDEX...' : 'SCAN FOR SPAM'}</span>
          </button>
        </div>
      </div>

      {/* Transparent Heuristic Policy Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
        <div className="p-3.5 rounded-xl bg-[#10141D] border border-[#252E3D]">
          <div className="text-xs font-mono font-bold text-[#FFAA55] flex items-center gap-1.5 mb-1">
            <Hash className="w-3.5 h-3.5" />
            HEURISTIC 01: HIGH REPETITION
          </div>
          <p className="text-xs text-[#929BAA] font-sans">
            Search keyword appears <strong>&ge; 5 times</strong> across page title, URL slug, and content.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#10141D] border border-[#252E3D]">
          <div className="text-xs font-mono font-bold text-[#FFAA55] flex items-center gap-1.5 mb-1">
            <Percent className="w-3.5 h-3.5" />
            HEURISTIC 02: ABNORMAL DENSITY
          </div>
          <p className="text-xs text-[#929BAA] font-sans">
            Target keyword density exceeds <strong>25%</strong> of total words, indicating artificial manipulation.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#10141D] border border-[#252E3D]">
          <div className="text-xs font-mono font-bold text-[#43B5FF] flex items-center gap-1.5 mb-1">
            <Link className="w-3.5 h-3.5" />
            HEURISTIC 03: ZERO LINK TRUST
          </div>
          <p className="text-xs text-[#929BAA] font-sans">
            Page has <strong>zero inbound links</strong> (PageRank &le; 0.05), indicating nobody in the network endorses it.
          </p>
        </div>
      </div>

      {/* Scan Results Display */}
      {hasScanned && scanReport && (
        <div className="space-y-6">
          {scanReport.flaggedPages.length > 0 ? (
            <div className="p-6 rounded-2xl bg-[#10141D] border border-[#FF626C]/40 shadow-[0_0_30px_rgba(255,98,108,0.1)]">
              {/* Flagged Alert Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#252E3D] gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-[#FF626C]/10 border border-[#FF626C]/30 text-[#FF626C]">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold font-mono text-[#F5F7FA]">
                      {scanReport.flaggedPages.length} SPAM ARTIFACT(S) DETECTED FOR &ldquo;{scanReport.scannedQuery}&rdquo;
                    </h4>
                    <p className="text-xs text-[#929BAA]">
                      These pages exploit keyword frequencies without providing verifiable authority.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    onRemoveAllFlagged(scanReport.flaggedPages.map((f) => f.page.id))
                  }
                  className="px-4 py-2 rounded-xl bg-[#FF626C] text-[#080A0F] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#ff4a56] transition-all flex items-center gap-1.5 shrink-0 shadow-[0_0_15px_rgba(255,98,108,0.3)]"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove flagged pages from index
                </button>
              </div>

              {/* Flagged Cards */}
              <div className="grid grid-cols-1 gap-4 mt-4">
                {scanReport.flaggedPages.map((flagged) => (
                  <div
                    key={flagged.page.id}
                    className="p-4 rounded-xl bg-[#151B26] border border-[#FF626C]/30 flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#FF626C]/20 text-[#FF626C] border border-[#FF626C]/40">
                          PAGE #{flagged.page.id}
                        </span>
                        <span
                          onClick={() => onSelectPage(flagged.page.id)}
                          className="font-mono text-sm font-bold text-[#F5F7FA] hover:text-[#43B5FF] cursor-pointer"
                        >
                          {flagged.page.url}
                        </span>
                      </div>

                      {/* Metrics strip */}
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                        <span className="text-[#FFAA55]">
                          Occurrences: <strong>{flagged.occurrences}</strong>
                        </span>
                        <span className="text-[#FF626C]">
                          Keyword Density: <strong>{flagged.density.toFixed(1)}%</strong>
                        </span>
                        <span className="text-[#929BAA]">
                          Inbound Links: <strong>{flagged.incomingLinksCount}</strong>
                        </span>
                        <span className="text-[#43B5FF]">
                          PageRank: <strong>{flagged.pageRank.toFixed(4)}</strong>
                        </span>
                      </div>

                      {/* Explanation Reasons */}
                      <div className="space-y-1 text-xs text-[#F5F7FA]/90 bg-[#080A0F] p-3 rounded-lg border border-[#252E3D]">
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#FF626C] font-bold">
                          EVALUATION AUDIT LOG:
                        </div>
                        {flagged.reasons.map((reason, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-xs text-[#929BAA]">
                            <span className="text-[#FF626C] font-mono">&bull;</span>
                            <span>{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex md:flex-col gap-2 shrink-0">
                      <button
                        onClick={() => onRemovePage(flagged.page.id)}
                        className="px-3 py-1.5 rounded-lg bg-[#FF626C]/10 border border-[#FF626C]/30 text-[#FF626C] hover:bg-[#FF626C]/20 text-xs font-mono transition-colors flex items-center justify-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        Remove P{flagged.page.id}
                      </button>
                      <button
                        onClick={() => onSelectPage(flagged.page.id)}
                        className="px-3 py-1.5 rounded-lg bg-[#10141D] border border-[#252E3D] text-[#929BAA] hover:text-[#F5F7FA] text-xs font-mono transition-colors text-center"
                      >
                        Inspect
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-[#10141D] border border-[#B6FF5C]/30 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[#B6FF5C]/10 border border-[#B6FF5C]/30 text-[#B6FF5C]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold font-mono text-[#F5F7FA]">
                  INDEX CLEAN — NO ARTIFICIAL KEYWORD SPAM DETECTED
                </h4>
                <p className="text-xs text-[#929BAA] mt-0.5">
                  All active pages show healthy keyword densities and verifiable network graph connections for &ldquo;{scanReport.scannedQuery}&rdquo;.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
