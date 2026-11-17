import React, { useState, useRef, useMemo } from 'react';
import { Page } from '../types';
import { Network, RotateCcw, ZoomIn, ZoomOut, Info } from 'lucide-react';

interface NetworkGraphProps {
  pages: Page[];
  pageRankMap: Map<number, number>;
  onSelectPage: (pageId: number) => void;
  selectedPageId?: number | null;
}

// Initial layout coordinates for the 6 nodes in a 900x520 viewport
const DEFAULT_COORDS: Record<number, { x: number; y: number }> = {
  1: { x: 260, y: 190 }, // pune-food-guide.com
  2: { x: 470, y: 260 }, // best-pizza-pune.com (central authority)
  3: { x: 690, y: 170 }, // college-canteen-blog.com
  4: { x: 710, y: 390 }, // pizza-recipes-home.com
  5: { x: 380, y: 430 }, // cheap-eats-pune.com
  6: { x: 130, y: 340 }, // pizza-pizza-pizza.com (isolated spammer)
};

export const NetworkGraph: React.FC<NetworkGraphProps> = ({
  pages,
  pageRankMap,
  onSelectPage,
  selectedPageId,
}) => {
  const [hoveredNodeId, setHoveredNodeId] = useState<number | null>(null);
  const [positions, setPositions] = useState<Record<number, { x: number; y: number }>>(DEFAULT_COORDS);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [draggedNodeId, setDraggedNodeId] = useState<number | null>(null);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Active page IDs
  const activeIds = useMemo(() => new Set(pages.map((p) => p.id)), [pages]);

  // Edges computed strictly from active pages and their linksTo
  const edges = useMemo(() => {
    const list: Array<{ id: string; source: number; target: number }> = [];
    pages.forEach((page) => {
      page.linksTo.forEach((targetId) => {
        if (activeIds.has(targetId)) {
          list.push({
            id: `edge-${page.id}->${targetId}`,
            source: page.id,
            target: targetId,
          });
        }
      });
    });
    return list;
  }, [pages, activeIds]);

  // Max and min PR for node sizing
  const maxPr = Math.max(0.01, ...Array.from(pageRankMap.values()));
  const minPr = Math.min(...Array.from(pageRankMap.values()));

  const getNodeRadius = (pageId: number) => {
    const pr = pageRankMap.get(pageId) || 0.05;
    // Map PageRank (typically 0.02 to 0.40) to radius between 24px and 52px
    const normalized = (pr - minPr) / (maxPr - minPr || 1);
    return Math.round(26 + normalized * 26);
  };

  // Node Dragging Handler
  const handleNodeMouseDown = (e: React.MouseEvent, pageId: number) => {
    e.stopPropagation();
    setDraggedNodeId(pageId);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target === svgRef.current || (e.target as HTMLElement).tagName === 'svg') {
      setIsDraggingCanvas(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedNodeId !== null) {
      const dx = (e.clientX - dragStart.x) / zoom;
      const dy = (e.clientY - dragStart.y) / zoom;
      setPositions((prev) => {
        const current = prev[draggedNodeId] || { x: 400, y: 260 };
        return {
          ...prev,
          [draggedNodeId]: {
            x: Math.max(50, Math.min(850, current.x + dx)),
            y: Math.max(50, Math.min(480, current.y + dy)),
          },
        };
      });
      setDragStart({ x: e.clientX, y: e.clientY });
    } else if (isDraggingCanvas) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDraggedNodeId(null);
    setIsDraggingCanvas(false);
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setPositions(DEFAULT_COORDS);
  };

  // Determine relationship for hover highlight
  const getEdgeHighlight = (source: number, target: number) => {
    if (hoveredNodeId === null) return 'normal';
    if (source === hoveredNodeId) return 'outgoing'; // Outgoing from hovered: neon green
    if (target === hoveredNodeId) return 'incoming'; // Incoming to hovered: electric blue
    return 'dimmed';
  };

  return (
    <section id="network-graph" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#252E3D]/60">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#151B26] border border-[#252E3D] text-[#B6FF5C] text-xs font-mono mb-2">
            <Network className="w-3.5 h-3.5 text-[#B6FF5C]" />
            <span>INTERACTIVE HYPERLINK TOPOLOGY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F5F7FA] font-sans tracking-tight">
            THE INTERNET IS <span className="text-[#B6FF5C]">A NETWORK.</span>
          </h2>
          <p className="text-sm text-[#929BAA] max-w-2xl mt-1">
            Websites do not exist in isolation. PageRank interprets every directed hyperlink as an endorsement vote, propagating authority through graph equilibrium.
          </p>
        </div>

        {/* Viewport Action Controls */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-[#10141D] p-1.5 rounded-xl border border-[#252E3D]">
          <button
            onClick={() => setZoom((z) => Math.min(1.8, z + 0.15))}
            className="p-1.5 rounded-lg text-[#929BAA] hover:text-[#F5F7FA] hover:bg-[#151B26] transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(0.6, z - 0.15))}
            className="p-1.5 rounded-lg text-[#929BAA] hover:text-[#F5F7FA] hover:bg-[#151B26] transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={resetView}
            className="p-1.5 rounded-lg text-[#929BAA] hover:text-[#B6FF5C] hover:bg-[#151B26] transition-colors flex items-center gap-1 text-xs font-mono"
            title="Reset Graph Layout"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Main Graph Card Container */}
      <div className="relative rounded-2xl bg-[#080A0F] border border-[#252E3D] shadow-2xl overflow-hidden cyber-grid select-none">
        {/* Floating Top Control Info Bar */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 text-xs font-mono text-[#929BAA]">
          <span className="px-2.5 py-1 rounded bg-[#10141D]/90 border border-[#252E3D] backdrop-blur-sm">
            Active Nodes: <strong className="text-[#B6FF5C]">{pages.length}</strong>
          </span>
          <span className="px-2.5 py-1 rounded bg-[#10141D]/90 border border-[#252E3D] backdrop-blur-sm">
            Directed Edges: <strong className="text-[#43B5FF]">{edges.length}</strong>
          </span>
          <span className="hidden sm:inline-block px-2.5 py-1 rounded bg-[#10141D]/90 border border-[#252E3D] backdrop-blur-sm text-[11px]">
            Hover to inspect links • Click node to explore • Drag to move
          </span>
        </div>

        {/* Floating Legend Box (Bottom Left) */}
        <div className="absolute bottom-4 left-4 z-20 p-3 rounded-xl bg-[#10141D]/90 border border-[#252E3D] backdrop-blur-md text-[11px] font-mono space-y-1.5 shadow-xl max-w-xs">
          <div className="text-[#F5F7FA] font-bold text-xs flex items-center gap-1.5 pb-1 border-b border-[#252E3D]">
            <Info className="w-3.5 h-3.5 text-[#B6FF5C]" />
            GRAPH TOPOLOGY LEGEND
          </div>
          <div className="flex items-center gap-2 text-[#929BAA]">
            <span className="w-3 h-3 rounded-full border-2 border-[#B6FF5C] bg-[#B6FF5C]/20" />
            <span>Node Area = PageRank Weight</span>
          </div>
          <div className="flex items-center gap-2 text-[#929BAA]">
            <span className="w-4 h-0.5 bg-[#43B5FF]" />
            <span className="text-[#43B5FF]">Blue: Inbound Link (Vote Received)</span>
          </div>
          <div className="flex items-center gap-2 text-[#929BAA]">
            <span className="w-4 h-0.5 bg-[#B6FF5C]" />
            <span className="text-[#B6FF5C]">Green: Outbound Link (Vote Cast)</span>
          </div>
          <div className="flex items-center gap-2 text-[#929BAA]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF626C]" />
            <span>Red badge: Keyword Spammer</span>
          </div>
        </div>

        {/* SVG Canvas */}
        <div className="w-full h-[540px] cursor-grab active:cursor-grabbing relative overflow-hidden">
          <svg
            ref={svgRef}
            className="w-full h-full"
            viewBox="0 0 920 540"
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <defs>
              {/* Arrow Marker Definitions */}
              <marker
                id="arrow-default"
                viewBox="0 0 10 10"
                refX="22"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#252E3D" />
              </marker>

              <marker
                id="arrow-green"
                viewBox="0 0 10 10"
                refX="24"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#B6FF5C" />
              </marker>

              <marker
                id="arrow-blue"
                viewBox="0 0 10 10"
                refX="24"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#43B5FF" />
              </marker>

              {/* Glowing Filters */}
              <filter id="glow-neon" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
              {/* Directed Edges (Arrows) */}
              {edges.map((edge) => {
                const sPos = positions[edge.source] || DEFAULT_COORDS[edge.source] || { x: 300, y: 300 };
                const tPos = positions[edge.target] || DEFAULT_COORDS[edge.target] || { x: 500, y: 300 };
                const state = getEdgeHighlight(edge.source, edge.target);

                // Calculate curved path offset so bidirectional edges don't overlap
                const dx = tPos.x - sPos.x;
                const dy = tPos.y - sPos.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const midX = (sPos.x + tPos.x) / 2;
                const midY = (sPos.y + tPos.y) / 2;

                // Perpendicular curvature offset
                const curvature = 24;
                const normX = -dy / (dist || 1);
                const normY = dx / (dist || 1);
                const ctrlX = midX + normX * curvature;
                const ctrlY = midY + normY * curvature;

                const pathData = `M ${sPos.x} ${sPos.y} Q ${ctrlX} ${ctrlY} ${tPos.x} ${tPos.y}`;

                let strokeColor = '#252E3D';
                let markerId = 'arrow-default';
                let strokeWidth = 1.5;
                let strokeOpacity = 0.6;
                let isGlowing = false;

                if (state === 'outgoing') {
                  strokeColor = '#B6FF5C';
                  markerId = 'arrow-green';
                  strokeWidth = 3;
                  strokeOpacity = 1;
                  isGlowing = true;
                } else if (state === 'incoming') {
                  strokeColor = '#43B5FF';
                  markerId = 'arrow-blue';
                  strokeWidth = 3;
                  strokeOpacity = 1;
                  isGlowing = true;
                } else if (state === 'dimmed') {
                  strokeOpacity = 0.15;
                  strokeWidth = 1;
                }

                return (
                  <g key={edge.id}>
                    <path
                      d={pathData}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={strokeWidth}
                      strokeOpacity={strokeOpacity}
                      markerEnd={`url(#${markerId})`}
                      filter={isGlowing ? (state === 'incoming' ? 'url(#glow-blue)' : 'url(#glow-neon)') : undefined}
                      className="transition-all duration-300 pointer-events-none"
                    />
                  </g>
                );
              })}

              {/* Nodes */}
              {pages.map((page) => {
                const pos = positions[page.id] || DEFAULT_COORDS[page.id] || { x: 400, y: 260 };
                const pr = pageRankMap.get(page.id) || 0.05;
                const radius = getNodeRadius(page.id);
                const isHovered = hoveredNodeId === page.id;
                const isSelected = selectedPageId === page.id;

                // Incoming and Outgoing count
                const incoming = pages.filter((p) => p.linksTo.includes(page.id));
                const outgoing = page.linksTo.filter((tid) => activeIds.has(tid));

                const isAuthorityCenter = page.id === 2;

                return (
                  <g
                    key={page.id}
                    transform={`translate(${pos.x}, ${pos.y})`}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredNodeId(page.id)}
                    onMouseLeave={() => setHoveredNodeId(null)}
                    onMouseDown={(e) => handleNodeMouseDown(e, page.id)}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPage(page.id);
                    }}
                  >
                    {/* Pulsing ring for central authority or selected */}
                    {(isAuthorityCenter || isSelected || isHovered) && (
                      <circle
                        r={radius + 8}
                        fill="none"
                        stroke={isHovered ? '#43B5FF' : '#B6FF5C'}
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        className="animate-spin"
                        style={{ animationDuration: '12s' }}
                        opacity={0.7}
                      />
                    )}

                    {/* Node Background Circle */}
                    <circle
                      r={radius}
                      fill="#10141D"
                      stroke={
                        isSelected
                          ? '#43B5FF'
                          : isHovered
                          ? '#B6FF5C'
                          : page.isSpam
                          ? '#FF626C'
                          : '#B6FF5C'
                      }
                      strokeWidth={isHovered || isSelected ? 3 : 2}
                      className="transition-all duration-200"
                      filter={isHovered || isSelected ? 'url(#glow-neon)' : undefined}
                    />

                    {/* Internal concentric circle */}
                    <circle
                      r={radius - 6}
                      fill="#151B26"
                      stroke="#252E3D"
                      strokeWidth="1"
                    />

                    {/* Page Number in Center */}
                    <text
                      textAnchor="middle"
                      dy="0.35em"
                      className="font-mono font-bold text-xs select-none pointer-events-none fill-[#F5F7FA]"
                    >
                      P{page.id}
                    </text>

                    {/* PageRank Score badge below center */}
                    <text
                      textAnchor="middle"
                      dy={radius + 15}
                      className="font-mono font-bold text-[11px] select-none pointer-events-none fill-[#B6FF5C]"
                    >
                      PR {pr.toFixed(3)}
                    </text>

                    {/* URL Label */}
                    <text
                      textAnchor="middle"
                      dy={radius + 28}
                      className="font-mono text-[10px] select-none pointer-events-none fill-[#929BAA] hover:fill-[#F5F7FA]"
                    >
                      {page.url.length > 22 ? page.url.substring(0, 20) + '..' : page.url}
                    </text>

                    {/* Hover Info Tooltip */}
                    {isHovered && (
                      <g transform={`translate(0, -${radius + 32})`} className="pointer-events-none z-30">
                        <rect
                          x="-80"
                          y="-24"
                          width="160"
                          height="26"
                          rx="6"
                          fill="#080A0F"
                          stroke="#B6FF5C"
                          strokeWidth="1"
                          opacity="0.95"
                        />
                        <text
                          textAnchor="middle"
                          y="-7"
                          className="font-mono text-[10px] fill-[#F5F7FA]"
                        >
                          In: {incoming.length} | Out: {outgoing.length} | PR: {pr.toFixed(4)}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
};
