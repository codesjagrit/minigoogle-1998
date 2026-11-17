import React from 'react';
import { RotateCcw, ArrowUp } from 'lucide-react';

interface FooterProps {
  onResetAll: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onResetAll }) => {
  return (
    <footer className="border-t border-[#252E3D] bg-[#080A0F] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#929BAA]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#B6FF5C]" />
          <span className="text-[#F5F7FA] font-bold">LINKLENS</span>
          <span>&mdash; Search Intelligence Laboratory</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={onResetAll}
            className="hover:text-[#B6FF5C] transition-colors flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            Reset State
          </button>
          <span>•</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-[#43B5FF] transition-colors flex items-center gap-1"
          >
            <ArrowUp className="w-3 h-3" />
            Top of Lab
          </button>
        </div>
      </div>
    </footer>
  );
};
