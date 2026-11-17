import React from 'react';
import { MiniGoogleLogo } from './MiniGoogleLogo';
import { Sparkles, History } from 'lucide-react';

interface HeaderProps {
  theme: 'retro1998' | 'cyber';
  onToggleTheme: () => void;
  indexedCount: number;
  totalOriginal: number;
  onRestoreAll?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  theme,
  onToggleTheme,
  indexedCount,
  totalOriginal,
  onRestoreAll,
}) => {
  const isRetro = theme === 'retro1998';

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-colors backdrop-blur-md ${
        isRetro
          ? 'bg-[#FFFFFF]/95 border-b border-[#E0E0E0] shadow-sm text-[#202124]'
          : 'bg-[#080A0F]/90 border-b border-[#252E3D]/80 text-[#F5F7FA]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: MiniGoogle 1998 Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <MiniGoogleLogo size="md" withYear={true} />
          <span
            className={`hidden sm:inline-block text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded border ${
              isRetro
                ? 'bg-[#F1F3F4] border-[#DADCE0] text-[#5F6368]'
                : 'bg-[#151B26] border-[#252E3D] text-[#43B5FF]'
            }`}
          >
            Stanford CS Prototype
          </span>
        </div>

        {/* Center Navigation links */}
        <nav
          className={`hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider ${
            isRetro ? 'text-[#5F6368]' : 'text-[#929BAA]'
          }`}
        >
          <button
            onClick={() => scrollTo('search-lab')}
            className={`hover:text-[#4285F4] transition-colors py-1 ${
              isRetro ? 'hover:underline' : 'hover:border-b hover:border-[#B6FF5C]'
            }`}
          >
            1998 Search Lab
          </button>
          <button
            onClick={() => scrollTo('network-graph')}
            className={`hover:text-[#34A853] transition-colors py-1 ${
              isRetro ? 'hover:underline' : 'hover:border-b hover:border-[#B6FF5C]'
            }`}
          >
            PageRank Graph
          </button>
          <button
            onClick={() => scrollTo('spam-detector')}
            className={`hover:text-[#EA4335] transition-colors py-1 ${
              isRetro ? 'hover:underline' : 'hover:border-b hover:border-[#FFAA55]'
            }`}
          >
            Spam Detector
          </button>
          <button
            onClick={() => scrollTo('algorithm-section')}
            className={`hover:text-[#4285F4] transition-colors py-1 ${
              isRetro ? 'hover:underline' : 'hover:border-b hover:border-[#43B5FF]'
            }`}
          >
            1998 Algorithm
          </button>
        </nav>

        {/* Right side: Mode Switcher & Status */}
        <div className="flex items-center gap-3">
          {/* Theme Mode Switcher */}
          <button
            onClick={onToggleTheme}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all border ${
              isRetro
                ? 'bg-[#E8F0FE] border-[#4285F4]/40 text-[#1967D2] hover:bg-[#D2E3FC]'
                : 'bg-[#151B26] border-[#B6FF5C]/40 text-[#B6FF5C] hover:bg-[#B6FF5C]/15 shadow-[0_0_10px_rgba(182,255,92,0.2)]'
            }`}
            title="Toggle between 1998 Stanford Classic & Cyber Lab UI"
          >
            {isRetro ? (
              <>
                <Sparkles className="w-3.5 h-3.5 text-[#4285F4]" />
                <span className="font-bold">1998 Classic Google</span>
              </>
            ) : (
              <>
                <History className="w-3.5 h-3.5 text-[#B6FF5C]" />
                <span className="font-bold">Cyber Lab Mode</span>
              </>
            )}
          </button>

          {/* Restore indicator if modified */}
          {indexedCount < totalOriginal && onRestoreAll && (
            <button
              onClick={onRestoreAll}
              className="text-xs font-mono px-2 py-1 rounded bg-[#EA4335]/10 border border-[#EA4335]/40 text-[#EA4335] hover:bg-[#EA4335]/20 transition-all"
            >
              RESTORE ({indexedCount}/{totalOriginal})
            </button>
          )}

          {/* System Online badge */}
          <div
            className={`hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full border ${
              isRetro
                ? 'bg-[#E6F4EA] border-[#CEEAD6] text-[#137333]'
                : 'bg-[#10141D] border-[#252E3D] text-[#B6FF5C]'
            }`}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#34A853] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#34A853]"></span>
            </span>
            <span className="text-[11px] font-mono font-medium tracking-wider">
              1998 ONLINE
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
