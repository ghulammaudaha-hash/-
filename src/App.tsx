import React from 'react';
import { NewsProvider, useNews } from './context/NewsContext';
import { Header } from './components/Header';
import { BreakingNewsTicker } from './components/BreakingNewsTicker';
import { HeroVideoSection } from './components/HeroVideoSection';
import { MainNewsGrid } from './components/MainNewsGrid';
import { Sidebar } from './components/Sidebar';
import { ArticleView } from './components/ArticleView';
import { VideoSection } from './components/VideoSection';
import { PhotoSection } from './components/PhotoSection';
import { SportsSection } from './components/SportsSection';
import { LiveBlogSection } from './components/LiveBlogSection';
import { SearchModal } from './components/SearchModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { StaticPageModal } from './components/StaticPageModal';
import { AdBanner } from './components/AdBanner';

const MainLayout: React.FC = () => {
  const { activeArticleId, selectedCategory } = useNews();

  const renderContent = () => {
    // 1. If an individual article is clicked, show full Article Page
    if (activeArticleId) {
      return <ArticleView />;
    }

    // 2. Dedicated Section Hubs
    if (selectedCategory === 'video') {
      return <VideoSection />;
    }

    if (selectedCategory === 'photo') {
      return <PhotoSection />;
    }

    if (selectedCategory === 'sports') {
      return <SportsSection />;
    }

    if (selectedCategory === 'live') {
      return <LiveBlogSection />;
    }

    // 3. Homepage / Category News Grid
    return (
      <div className="space-y-6">
        {/* HERO SECTION – VIDEO FIRST (Only on Home/Top) */}
        {selectedCategory === 'top' && <HeroVideoSection />}

        {/* MAIN BODY: News Grid on Left (8 cols) & Sidebar on Right (4 cols) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Main Editorial Stories Grid */}
            <div className="lg:col-span-8">
              <MainNewsGrid />
            </div>

            {/* Sidebar with Trending, Scores, Videos, Ads */}
            <div className="lg:col-span-4">
              <Sidebar />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfcfc] text-[#1c1c1c]">
      {/* 1. News Header */}
      <Header />

      {/* 2. Breaking News Ticker */}
      <BreakingNewsTicker />

      {/* Top Banner Ad Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <AdBanner position="header" />
      </div>

      {/* 3. Main Dynamic Content */}
      <main className="flex-1">
        {renderContent()}
      </main>

      {/* 4. Professional Editorial Footer */}
      <Footer />

      {/* 5. Modals & Overlays */}
      <SearchModal />
      <AdminDashboard />
      <StaticPageModal />
    </div>
  );
};

export default function App() {
  return (
    <NewsProvider>
      <MainLayout />
    </NewsProvider>
  );
}
