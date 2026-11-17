import React, { useState, useEffect } from 'react';
import { Search, Sparkles, RotateCcw, Zap } from 'lucide-react';
import { MiniGoogleLogo } from './MiniGoogleLogo';

interface HeroSectionProps {
  theme: 'retro1998' | 'cyber';
  query: string;
  onSearchChange: (newQuery: string) => void;
  indexedCount: number;
  onFeelingLucky: () => void;
}

const EXAMPLE_QUERIES = ['pizza', 'food', 'pune', 'chai', 'dosa'];

export const HeroSection: React.FC<HeroSectionProps> = ({
  theme,
  query,
  onSearchChange,
  indexedCount,
  onFeelingLucky,
}) => {
  const [inputValue, setInputValue] = useState(query);
  const isRetro = theme === 'retro1998';

  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearchChange(inputValue.trim());
      const el = document.getElementById('search-lab');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleChipClick = (q: string) => {
    setInputValue(q);
    onSearchChange(q);
  };

  return (
    <section
      className={`relative pt-10 pb-14 overflow-hidden border-b transition-colors ${
        isRetro
          ? 'bg-[#FAFAFA] border-[#E0E0E0]'
          : 'bg-[#080A0F] border-[#252E3D]/50 cyber-grid'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Lab Identification Badge */}
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono mb-6 border ${
            isRetro
              ? 'bg-[#FFFFFF] border-[#DADCE0] text-[#5F6368] shadow-sm'
              : 'bg-[#151B26] border-[#252E3D] text-[#929BAA]'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#34A853] animate-pulse" />
          <span className="tracking-widest">
            STANFORD UNIVERSITY / CS345 / 1998 PROTOTYPE
          </span>
          <span className="text-[#DADCE0]">|</span>
          <span className="text-[#4285F4] font-semibold">PAGERANK LAB</span>
        </div>

        {/* 1998 Big Centered MiniGoogle Logo */}
        <div className="mb-4 flex justify-center">
          <MiniGoogleLogo size="xl" withYear={true} />
        </div>

        {/* 1998 Classic Subtitle */}
        <p
          className={`text-sm sm:text-base mb-2 font-serif italic ${
            isRetro ? 'text-[#3C4043]' : 'text-[#929BAA]'
          }`}
        >
          Search the web using <strong>MiniGoogle!</strong> &mdash; A PageRank-Based Search Engine
        </p>

        <p
          className={`text-xs font-mono mb-8 max-w-xl mx-auto ${
            isRetro ? 'text-[#70757A]' : 'text-[#43B5FF]'
          }`}
        >
          &ldquo;Old search engines were fooled by keyword stuffing. PageRank changed the game by treating links as votes of confidence.&rdquo;
        </p>

        {/* Search Input Box */}
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-5">
          <div className="relative group">
            <div
              className={`relative flex items-center rounded-2xl border transition-all shadow-md overflow-hidden ${
                isRetro
                  ? 'bg-[#FFFFFF] border-[#DFE1E5] hover:shadow-lg focus-within:shadow-lg focus-within:border-[#4285F4]'
                  : 'bg-[#10141D] border-[#252E3D] focus-within:border-[#B6FF5C] shadow-2xl'
              }`}
            >
              <div className="pl-4 pr-2">
                <Search
                  className={`w-5 h-5 ${
                    isRetro ? 'text-[#9AA0A6]' : 'text-[#B6FF5C]'
                  }`}
                />
              </div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search the web... try pizza, food, Pune, chai"
                className={`w-full py-3.5 px-2 font-mono text-sm sm:text-base focus:outline-none ${
                  isRetro
                    ? 'bg-transparent text-[#202124] placeholder-[#9AA0A6]'
                    : 'bg-transparent text-[#F5F7FA] placeholder-[#929BAA]/60'
                }`}
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={() => setInputValue('')}
                  className="px-2 text-xs font-mono text-[#9AA0A6] hover:text-[#202124]"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>

          {/* 1998 Dual Action Buttons */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <button
              type="submit"
              className={`px-5 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-sm ${
                isRetro
                  ? 'bg-[#F8F9FA] hover:bg-[#F1F3F4] text-[#3C4043] border border-[#DADCE0]'
                  : 'bg-[#B6FF5C] text-[#080A0F] hover:bg-[#a6f049] shadow-[0_0_15px_rgba(182,255,92,0.3)]'
              }`}
            >
              MiniGoogle Search
            </button>
            <button
              type="button"
              onClick={onFeelingLucky}
              className={`px-5 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                isRetro
                  ? 'bg-[#F8F9FA] hover:bg-[#F1F3F4] text-[#3C4043] border border-[#DADCE0]'
                  : 'bg-[#151B26] hover:bg-[#252E3D] text-[#43B5FF] border border-[#43B5FF]/40'
              }`}
              title="Inspect the #1 PageRank authority page immediately"
            >
              <Zap className="w-3.5 h-3.5 text-[#FBBC05]" />
              <span>I&apos;m Feeling Lucky</span>
            </button>
          </div>
        </form>

        {/* Example Query Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <span
            className={`text-xs font-mono flex items-center gap-1 mr-1 ${
              isRetro ? 'text-[#5F6368]' : 'text-[#929BAA]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#4285F4]" />
            SPECIAL SEARCHES:
          </span>
          {EXAMPLE_QUERIES.map((q) => {
            const isActive = query.toLowerCase() === q.toLowerCase();
            return (
              <button
                key={q}
                type="button"
                onClick={() => handleChipClick(q)}
                className={`px-3 py-1 rounded-md text-xs font-mono transition-all border ${
                  isActive
                    ? isRetro
                      ? 'bg-[#E8F0FE] border-[#4285F4] text-[#1967D2] font-bold shadow-sm'
                      : 'bg-[#B6FF5C]/15 border-[#B6FF5C] text-[#B6FF5C] font-semibold'
                    : isRetro
                    ? 'bg-[#FFFFFF] border-[#DADCE0] text-[#3C4043] hover:border-[#4285F4]'
                    : 'bg-[#151B26] border-[#252E3D] text-[#929BAA] hover:text-[#F5F7FA]'
                }`}
              >
                {q}
              </button>
            );
          })}

          {query.toLowerCase() !== 'pizza' && (
            <button
              onClick={() => handleChipClick('pizza')}
              className="inline-flex items-center gap-1 text-[11px] font-mono text-[#EA4335] hover:underline ml-2"
              title="Reset query to pizza"
            >
              <RotateCcw className="w-3 h-3" />
              Reset query
            </button>
          )}
        </div>

        {/* Small Information Line */}
        <div
          className={`inline-block py-1 px-4 rounded-md text-[11px] font-mono tracking-wider border ${
            isRetro
              ? 'bg-[#FFFFFF] border-[#DADCE0] text-[#5F6368]'
              : 'bg-[#10141D]/80 border-[#252E3D] text-[#929BAA]'
          }`}
        >
          INDEXED PAGES: <span className="font-bold text-[#34A853]">{String(indexedCount).padStart(2, '0')}</span> | RANKING MODE:{' '}
          <span className="font-bold text-[#4285F4]">MINIGOOGLE 1998 COMPARISON</span>
        </div>
      </div>
    </section>
  );
};
