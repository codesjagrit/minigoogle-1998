import React from 'react';
import { Terminal } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#252E3D]/60">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#151B26] border border-[#252E3D] text-[#B6FF5C] text-xs font-mono mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>CLASSROOM RESEARCH DEMONSTRATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] font-sans tracking-tight mb-4">
            SEARCH INTELLIGENCE <span className="text-[#B6FF5C]">LAB</span>
          </h2>
          <p className="text-sm text-[#929BAA] leading-relaxed mb-4">
            <strong>LINKLENS</strong> was created to demystify how search engines evolve from naive keyword frequency matching to topological graph ranking.
          </p>
          <p className="text-sm text-[#929BAA] leading-relaxed mb-6">
            In 1998, Larry Page and Sergey Brin formulated PageRank at Stanford University. By modeling the World Wide Web as a giant directed graph, they transformed how information retrieval evaluates truth, trust, and relevance.
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-xl bg-[#10141D] border border-[#252E3D]">
              <div className="text-[#B6FF5C] font-bold text-sm mb-0.5">DAMPING: 0.85</div>
              <div className="text-[#929BAA]">Standard Stanford random surfer factor</div>
            </div>
            <div className="p-3 rounded-xl bg-[#10141D] border border-[#252E3D]">
              <div className="text-[#43B5FF] font-bold text-sm mb-0.5">&epsilon; &lt; 10⁻⁶</div>
              <div className="text-[#929BAA]">Convergence epsilon limit threshold</div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#10141D] border border-[#252E3D] space-y-4 font-mono text-xs">
          <div className="text-[#F5F7FA] font-bold text-sm flex items-center justify-between pb-3 border-b border-[#252E3D]">
            <span>SYSTEM CONFIGURATION MANIFEST</span>
            <span className="text-[#B6FF5C] text-[11px]">ACTIVE</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#252E3D]/50 text-[#929BAA]">
            <span>Engine Name:</span>
            <span className="text-[#F5F7FA]">LINKLENS Research Core</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#252E3D]/50 text-[#929BAA]">
            <span>Ranking Mode:</span>
            <span className="text-[#FFAA55]">Dual Comparison (KW vs PR)</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#252E3D]/50 text-[#929BAA]">
            <span>Formula Weighting:</span>
            <span className="text-[#B6FF5C]">70% Keyword + 30% PageRank</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#252E3D]/50 text-[#929BAA]">
            <span>Dangling Node Strategy:</span>
            <span className="text-[#43B5FF]">Uniform Redistribution (1/N)</span>
          </div>
          <div className="flex justify-between py-1 text-[#929BAA]">
            <span>Spam Defense:</span>
            <span className="text-[#FF626C]">Multi-Heuristic Density Filter</span>
          </div>
        </div>
      </div>
    </section>
  );
};
