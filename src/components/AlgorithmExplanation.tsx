import React, { useState } from 'react';
import { BookOpen, ArrowRight, Check, X, Cpu } from 'lucide-react';

export const AlgorithmExplanation: React.FC = () => {
  const [simulationAuthority, setSimulationAuthority] = useState<'low' | 'high'>('high');

  return (
    <section id="algorithm-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#252E3D]/60">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#151B26] border border-[#252E3D] text-[#43B5FF] text-xs font-mono mb-3">
          <BookOpen className="w-3.5 h-3.5 text-[#43B5FF]" />
          <span>ACADEMIC FOUNDATION & ALGORITHM THEORY</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] font-sans tracking-tight mb-3">
          WHY <span className="text-[#B6FF5C]">LINKS MATTER.</span>
        </h2>
        <p className="text-sm text-[#929BAA]">
          Understanding the seismic shift from text string counting to stationary Markov chain equilibrium.
        </p>
      </div>

      {/* Prominent Golden Statement */}
      <div className="relative p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#10141D] via-[#151B26] to-[#10141D] border border-[#B6FF5C]/30 shadow-[0_0_35px_rgba(182,255,92,0.1)] mb-12 text-center">
        <div className="text-[#B6FF5C] font-mono text-xs uppercase tracking-widest mb-2 font-bold">
          PARADIGM SHIFT IN SEARCH INTELLIGENCE
        </div>
        <blockquote className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#F5F7FA] font-sans leading-snug max-w-4xl mx-auto">
          &ldquo;Old search engines could be manipulated by repeating keywords. PageRank changed the game by treating links as votes of confidence.&rdquo;
        </blockquote>
      </div>

      {/* Side-by-Side Comparison: Traditional vs PageRank */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Traditional Search */}
        <div className="p-6 rounded-2xl bg-[#10141D] border border-[#FFAA55]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 rounded-lg bg-[#FFAA55]/10 border border-[#FFAA55]/30 text-[#FFAA55]">
                <X className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold font-mono text-[#F5F7FA]">
                  Traditional Search (Pre-1998)
                </h3>
                <span className="text-xs text-[#FFAA55] font-mono">Naive Keyword Frequency</span>
              </div>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-[#929BAA] font-sans">
              <li className="flex items-start gap-2">
                <span className="text-[#FFAA55] font-mono font-bold">&bull;</span>
                <span><strong>Counted raw keywords:</strong> Pages were evaluated solely by how many times a word appeared in title and body.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFAA55] font-mono font-bold">&bull;</span>
                <span><strong>Easily manipulated:</strong> Spammers pasted white-on-white text repeating &ldquo;pizza&rdquo; hundreds of times to hijack rank #1.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FFAA55] font-mono font-bold">&bull;</span>
                <span><strong>Zero trust awareness:</strong> An empty spam blog had the same credibility as an authoritative university directory or major newsroom.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-[#252E3D] text-[11px] font-mono text-[#FF626C]">
            Vulnerable to keyword stuffing & spam farms.
          </div>
        </div>

        {/* PageRank Algorithm */}
        <div className="p-6 rounded-2xl bg-[#10141D] border border-[#B6FF5C]/30 flex flex-col justify-between shadow-[0_0_20px_rgba(182,255,92,0.06)]">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="p-2 rounded-lg bg-[#B6FF5C]/10 border border-[#B6FF5C]/30 text-[#B6FF5C]">
                <Check className="w-5 h-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold font-mono text-[#F5F7FA]">
                  PageRank Revolution
                </h3>
                <span className="text-xs text-[#B6FF5C] font-mono">Directed Hyperlink Graph Walk</span>
              </div>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-[#929BAA] font-sans">
              <li className="flex items-start gap-2">
                <span className="text-[#B6FF5C] font-mono font-bold">&bull;</span>
                <span><strong>Hyperlinks as votes:</strong> A link from Website A to Website B is an objective editorial vote of endorsement.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B6FF5C] font-mono font-bold">&bull;</span>
                <span><strong>Weighted endorsement:</strong> A vote from a high-authority site carries exponentially greater weight than a link from a spam blog.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#B6FF5C] font-mono font-bold">&bull;</span>
                <span><strong>Global equilibrium:</strong> Importance flows through the entire web graph until convergence, making spam isolation automatic.</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-[#252E3D] text-[11px] font-mono text-[#B6FF5C]">
            Resilient to local text tricks via global link consensus.
          </div>
        </div>
      </div>

      {/* Interactive Visual Explanation: Website A -> Website B */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#10141D] border border-[#252E3D] mb-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#252E3D] gap-4">
          <div>
            <span className="text-xs font-mono text-[#43B5FF] uppercase tracking-wider font-bold">
              INTERACTIVE DEMONSTRATION
            </span>
            <h3 className="text-xl font-bold text-[#F5F7FA] font-sans">
              How Link Weight Transfers Authority
            </h3>
          </div>

          <div className="flex items-center gap-2 bg-[#080A0F] p-1 rounded-xl border border-[#252E3D]">
            <span className="text-xs font-mono text-[#929BAA] px-2">Sender Authority:</span>
            <button
              onClick={() => setSimulationAuthority('low')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                simulationAuthority === 'low'
                  ? 'bg-[#FFAA55]/20 text-[#FFAA55] border border-[#FFAA55]'
                  : 'text-[#929BAA] hover:text-[#F5F7FA]'
              }`}
            >
              Weak Site (PR 0.05)
            </button>
            <button
              onClick={() => setSimulationAuthority('high')}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                simulationAuthority === 'high'
                  ? 'bg-[#B6FF5C]/20 text-[#B6FF5C] border border-[#B6FF5C]'
                  : 'text-[#929BAA] hover:text-[#F5F7FA]'
              }`}
            >
              Authority Site (PR 0.40)
            </button>
          </div>
        </div>

        {/* Visual Node Diagram */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          {/* Website A */}
          <div className="flex flex-col items-center">
            <div
              className={`w-24 h-24 rounded-2xl border-2 flex flex-col items-center justify-center font-mono transition-all ${
                simulationAuthority === 'high'
                  ? 'border-[#B6FF5C] bg-[#151B26] shadow-[0_0_20px_rgba(182,255,92,0.3)]'
                  : 'border-[#FFAA55] bg-[#151B26] shadow-[0_0_15px_rgba(255,170,85,0.2)]'
              }`}
            >
              <span className="text-xs text-[#929BAA]">WEBSITE A</span>
              <span
                className={`text-lg font-bold ${
                  simulationAuthority === 'high' ? 'text-[#B6FF5C]' : 'text-[#FFAA55]'
                }`}
              >
                {simulationAuthority === 'high' ? 'PR 0.40' : 'PR 0.05'}
              </span>
              <span className="text-[10px] text-[#929BAA]">1 Outlink</span>
            </div>
            <span className="text-xs font-mono text-[#929BAA] mt-2">
              {simulationAuthority === 'high' ? 'Major Pune Food Portal' : 'Unread Random Blog'}
            </span>
          </div>

          {/* Directed Vote Arrow */}
          <div className="flex flex-col items-center text-center">
            <div className="text-[10px] font-mono text-[#43B5FF] uppercase font-bold tracking-wider mb-1">
              {simulationAuthority === 'high' ? 'VOTE VALUE = 0.34 PR' : 'VOTE VALUE = 0.04 PR'}
            </div>
            <div className="flex items-center gap-2">
              <span className="w-12 sm:w-24 h-0.5 bg-gradient-to-r from-transparent via-[#43B5FF] to-[#B6FF5C]" />
              <ArrowRight className="w-5 h-5 text-[#B6FF5C] animate-pulse" />
            </div>
            <span className="text-[10px] font-mono text-[#929BAA] mt-1">
              PR(A) &times; 0.85 &divide; 1
            </span>
          </div>

          {/* Website B */}
          <div className="flex flex-col items-center">
            <div
              className={`w-28 h-28 rounded-2xl border-2 flex flex-col items-center justify-center font-mono transition-all ${
                simulationAuthority === 'high'
                  ? 'border-[#B6FF5C] bg-[#151B26] shadow-[0_0_25px_rgba(182,255,92,0.4)]'
                  : 'border-[#252E3D] bg-[#151B26]'
              }`}
            >
              <span className="text-xs text-[#929BAA]">WEBSITE B</span>
              <span className="text-xl font-bold text-[#F5F7FA]">
                {simulationAuthority === 'high' ? 'PR 0.365' : 'PR 0.065'}
              </span>
              <span className="text-[10px] text-[#B6FF5C] font-semibold">
                {simulationAuthority === 'high' ? '+0.34 BOOST' : '+0.04 BOOST'}
              </span>
            </div>
            <span className="text-xs font-mono text-[#929BAA] mt-2">Target Recipe Page</span>
          </div>
        </div>

        <p className="text-center text-xs text-[#929BAA] font-sans max-w-xl mx-auto">
          Notice how a single link from an authority portal imparts <strong>8.5x more trust</strong> than a link from a low-authority site. This is why keyword spam rings cannot trick PageRank without high-authority backlinks.
        </p>
      </div>

      {/* The Exact Mathematical Equation Card */}
      <div className="p-6 rounded-2xl bg-[#080A0F] border border-[#252E3D]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#B6FF5C] mb-3">
          <Cpu className="w-4 h-4" />
          <span>FORMAL MATHEMATICAL FORMULATION</span>
        </div>

        <div className="p-4 rounded-xl bg-[#10141D] border border-[#252E3D] font-mono text-center text-sm sm:text-base text-[#F5F7FA] overflow-x-auto mb-4">
          <span className="text-[#B6FF5C]">PR(A)</span> ={' '}
          <span className="text-[#43B5FF]">\frac{'{'}(1 - d){'}'}{'{'}N{'}'}</span> +{' '}
          <span className="text-[#FFAA55]">d</span> &times; &sum;{' '}
          <span className="text-[#F5F7FA]">\frac{'{'}PR(T){'}'}{'{'}C(T){'}'}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono text-[#929BAA]">
          <div className="p-2.5 rounded-lg bg-[#151B26] border border-[#252E3D]">
            <strong className="text-[#B6FF5C]">PR(A):</strong> PageRank of target page A.
          </div>
          <div className="p-2.5 rounded-lg bg-[#151B26] border border-[#252E3D]">
            <strong className="text-[#FFAA55]">d = 0.85:</strong> Damping factor (85% link following, 15% random teleportation).
          </div>
          <div className="p-2.5 rounded-lg bg-[#151B26] border border-[#252E3D]">
            <strong className="text-[#43B5FF]">T &isin; In-links:</strong> All websites linking into page A.
          </div>
          <div className="p-2.5 rounded-lg bg-[#151B26] border border-[#252E3D]">
            <strong className="text-[#F5F7FA]">C(T):</strong> Number of outgoing links on page T.
          </div>
        </div>
      </div>
    </section>
  );
};
