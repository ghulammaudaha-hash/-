import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, BellRing, Flame } from 'lucide-react';
import { useNews } from '../context/NewsContext';

export const BreakingNewsTicker: React.FC = () => {
  const { breakingNews, language, setActiveArticleId, setSelectedCategory } = useNews();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Active items only
  const activeItems = breakingNews.filter((item) => item.active);

  useEffect(() => {
    if (activeItems.length === 0 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeItems.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [activeItems.length, isPaused]);

  if (activeItems.length === 0) return null;

  const currentItem = activeItems[currentIndex] || activeItems[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeItems.length) % activeItems.length);
  };

  const handleHeadlineClick = () => {
    if (currentItem.articleId) {
      setActiveArticleId(currentItem.articleId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSelectedCategory('top');
    }
  };

  return (
    <div
      className="w-full bg-[#b91c1c] text-white border-b border-red-800 relative z-30 shadow-xs"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-11 text-xs sm:text-sm">
        {/* Urgent/Live Ticker Label */}
        <div className="shrink-0 flex items-center gap-2 bg-red-950/70 py-1.5 px-3 rounded text-white font-black tracking-wide mr-3 border border-red-700/60">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-300"></span>
          </span>
          <span className="font-serif">
            {language === 'hi' ? 'ब्रेकिंग न्यूज़' : 'BREAKING NEWS'}
          </span>
        </div>

        {/* Headline text with smooth transition */}
        <div className="flex-1 overflow-hidden">
          <div
            onClick={handleHeadlineClick}
            className="flex items-center gap-2 cursor-pointer hover:underline underline-offset-4 truncate group transition-all"
          >
            {currentItem.isUrgent && (
              <span className="hidden sm:inline-flex items-center gap-1 bg-yellow-400 text-stone-900 font-bold px-1.5 py-0.2 rounded text-[11px] shrink-0">
                <Flame className="w-3 h-3 text-red-700 fill-red-700" />
                <span>अति-महत्वपूर्ण</span>
              </span>
            )}
            <span className="font-medium tracking-wide truncate">
              {language === 'hi' ? currentItem.textHi : currentItem.textEn || currentItem.textHi}
            </span>
            <span className="hidden md:inline-block text-red-200 text-xs shrink-0">
              ({currentItem.timestamp})
            </span>
          </div>
        </div>

        {/* Controls: Prev / Next / Counter */}
        <div className="shrink-0 flex items-center gap-1.5 ml-2">
          <span className="hidden sm:inline-block text-[11px] text-red-200 font-mono">
            {currentIndex + 1}/{activeItems.length}
          </span>
          <div className="flex items-center bg-red-900/80 rounded border border-red-700/50">
            <button
              onClick={handlePrev}
              className="p-1 hover:bg-red-800 rounded-l transition-colors cursor-pointer"
              aria-label="पिछली खबर"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-1 hover:bg-red-800 rounded-r transition-colors cursor-pointer"
              aria-label="अगली खबर"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
