import React, { useState, useMemo } from 'react';
import { INITIAL_PAGES } from './data';
import { Page } from './types';
import { calculatePageRank } from './pagerank';
import { performSearchRanking } from './searchRanking';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { StatisticsPanel } from './components/StatisticsPanel';
import { SearchLab } from './components/SearchLab';
import { NetworkGraph } from './components/NetworkGraph';
import { SpamDetector } from './components/SpamDetector';
import { AlgorithmExplanation } from './components/AlgorithmExplanation';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';
import { PageExplorer } from './components/PageExplorer';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'retro1998' | 'cyber'>('retro1998');
  const [query, setQuery] = useState<string>('pizza');
  const [activePages, setActivePages] = useState<Page[]>(INITIAL_PAGES);
  const [selectedPageId, setSelectedPageId] = useState<number | null>(null);

  const pageRankResult = useMemo(() => {
    return calculatePageRank(activePages);
  }, [activePages]);

  const searchResults = useMemo(() => {
    return performSearchRanking(activePages, pageRankResult.scores, query);
  }, [activePages, pageRankResult.scores, query]);

  const handleRemovePage = (pageId: number) => {
    setActivePages((prev) => prev.filter((p) => p.id !== pageId));
    if (selectedPageId === pageId) setSelectedPageId(null);
  };

  const handleRemoveAllFlagged = (flaggedIds: number[]) => {
    const idSet = new Set(flaggedIds);
    setActivePages((prev) => prev.filter((p) => !idSet.has(p.id)));
    if (selectedPageId !== null && idSet.has(selectedPageId)) setSelectedPageId(null);
  };

  const handleRestoreAll = () => setActivePages(INITIAL_PAGES);

  const handleResetAll = () => {
    setQuery('pizza');
    setActivePages(INITIAL_PAGES);
    setSelectedPageId(null);
  };

  const handleOpenSpamScanner = () => {
    const el = document.getElementById('spam-detector');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFeelingLucky = () => {
    if (searchResults.pageRankRanked.length > 0) {
      setSelectedPageId(searchResults.pageRankRanked[0].page.id);
    }
  };

  const toggleTheme = () => {
    setTheme((t) => (t === 'retro1998' ? 'cyber' : 'retro1998'));
  };

  const isRetro = theme === 'retro1998';

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-300 ${
        isRetro
          ? 'bg-[#FFFFFF] text-[#202124]'
          : 'bg-[#080A0F] text-[#F5F7FA] selection:bg-[#B6FF5C]/20 selection:text-[#B6FF5C]'
      }`}
    >
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        indexedCount={activePages.length}
        totalOriginal={INITIAL_PAGES.length}
        onRestoreAll={handleRestoreAll}
      />

      <HeroSection
        theme={theme}
        query={query}
        onSearchChange={setQuery}
        indexedCount={activePages.length}
        onFeelingLucky={handleFeelingLucky}
      />

      <StatisticsPanel
        pages={activePages}
        pageRankMap={pageRankResult.scores}
        searchResultsCount={searchResults.totalMatches}
        query={query}
      />

      <SearchLab
        rankingResult={searchResults}
        onSelectPage={setSelectedPageId}
        onOpenSpamScanner={handleOpenSpamScanner}
      />

      <NetworkGraph
        pages={activePages}
        pageRankMap={pageRankResult.scores}
        onSelectPage={setSelectedPageId}
        selectedPageId={selectedPageId}
      />

      <SpamDetector
        pages={activePages}
        originalPages={INITIAL_PAGES}
        pageRankMap={pageRankResult.scores}
        query={query}
        onRemovePage={handleRemovePage}
        onRemoveAllFlagged={handleRemoveAllFlagged}
        onRestoreAll={handleRestoreAll}
        onSelectPage={setSelectedPageId}
      />

      <AlgorithmExplanation />

      <AboutSection />

      <Footer onResetAll={handleResetAll} />

      <PageExplorer
        pageId={selectedPageId}
        allPages={activePages}
        pageRankMap={pageRankResult.scores}
        query={query}
        onClose={() => setSelectedPageId(null)}
        onSelectPage={setSelectedPageId}
      />
    </div>
  );
};

export default App;
