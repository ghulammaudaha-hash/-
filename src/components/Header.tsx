import React, { useState } from 'react';
import {
  Search,
  Menu,
  X,
  Globe,
  Radio,
  UserCheck,
  TrendingUp,
  Clock,
  CloudSun,
  ShieldAlert,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { CATEGORIES } from '../data/initialData';
import { CategoryId } from '../types/news';

import { Logo } from './Logo';

export const Header: React.FC = () => {
  const {
    language,
    setLanguage,
    selectedCategory,
    setSelectedCategory,
    setIsSearchOpen,
    isAdminOpen,
    setIsAdminOpen,
    adminUser,
    setActiveArticleId,
    setActivePhotoStoryId,
  } = useNews();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Today's date in Hindi
  const todayDateHindi = 'बुधवार, 7 अक्टूबर 2026';
  const todayDateEnglish = 'Wednesday, October 7, 2026';

  const handleCategoryClick = (catId: CategoryId) => {
    setSelectedCategory(catId);
    setActiveArticleId(null);
    setActivePhotoStoryId(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    setSelectedCategory('top');
    setActiveArticleId(null);
    setActivePhotoStoryId(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="w-full bg-white border-b border-stone-200 sticky top-0 z-40 transition-all shadow-xs">
      {/* 1. TOP UTILITY STRIP (Slim bar) */}
      <div className="bg-[#121212] text-[#e0e0e0] text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Date & Weather */}
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-stone-300 font-medium">
              <Clock className="w-3.5 h-3.5 text-red-500" />
              <span>{language === 'hi' ? todayDateHindi : todayDateEnglish}</span>
            </span>
            <span className="hidden md:flex items-center gap-1 text-stone-400">
              <span className="text-stone-600">|</span>
              <CloudSun className="w-3.5 h-3.5 text-amber-400" />
              <span>नई दिल्ली 28°C</span>
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-emerald-400">
              <span className="text-stone-600">|</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>ई-पेपर संस्करण 14.2</span>
            </span>
          </div>

          {/* Right: Live broadcast, Language toggle, Admin portal */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleCategoryClick('live')}
              className="flex items-center gap-1.5 text-red-400 hover:text-red-300 font-semibold cursor-pointer transition-colors"
            >
              <Radio className="w-3.5 h-3.5 animate-pulse text-red-500" />
              <span>{language === 'hi' ? 'लाइव कवरेज' : 'LIVE Coverage'}</span>
            </button>

            <span className="text-stone-600">|</span>

            {/* Language switch */}
            <div className="flex items-center gap-1 bg-stone-800/80 px-2 py-0.5 rounded text-[11px]">
              <Globe className="w-3 h-3 text-stone-400" />
              <button
                onClick={() => setLanguage('hi')}
                className={`cursor-pointer px-1 transition-colors ${
                  language === 'hi' ? 'text-white font-bold underline underline-offset-2' : 'text-stone-400 hover:text-white'
                }`}
              >
                हिंदी
              </button>
              <span className="text-stone-600">/</span>
              <button
                onClick={() => setLanguage('en')}
                className={`cursor-pointer px-1 transition-colors ${
                  language === 'en' ? 'text-white font-bold underline underline-offset-2' : 'text-stone-400 hover:text-white'
                }`}
              >
                ENG
              </button>
            </div>

            <span className="text-stone-600">|</span>

            {/* Admin CMS Trigger */}
            <button
              onClick={() => setIsAdminOpen(!isAdminOpen)}
              className="flex items-center gap-1 text-stone-300 hover:text-white cursor-pointer transition-colors font-medium"
              title="संपादकीय सीएमएस पैनल"
            >
              {adminUser ? (
                <span className="flex items-center gap-1 text-emerald-400">
                  <UserCheck className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{adminUser.name}</span>
                </span>
              ) : (
                <span className="flex items-center gap-1 hover:text-amber-300">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">CMS संपादक</span>
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN BRAND HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        {/* Brand Logo & Editorial Seal */}
        <div className="flex items-center gap-4">
          <button
            onClick={handleLogoClick}
            className="flex items-center text-left group cursor-pointer"
            aria-label="दैनिक खबर होमपेज"
          >
            <Logo size="md" />
          </button>
        </div>

        {/* Right Action Icons & Search */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Trending shortcut */}
          <button
            onClick={() => handleCategoryClick('top')}
            className="hidden md:flex items-center gap-1.5 text-xs text-stone-700 hover:text-red-600 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded transition-colors cursor-pointer"
          >
            <TrendingUp className="w-3.5 h-3.5 text-red-600" />
            <span>{language === 'hi' ? 'ट्रेंडिंग खबरें' : 'Trending'}</span>
          </button>

          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 text-stone-700 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded transition-colors cursor-pointer"
            aria-label="खोजें"
          >
            <Search className="w-4 h-4 text-stone-600" />
            <span className="hidden sm:inline text-xs font-medium text-stone-600">
              {language === 'hi' ? 'खोजें...' : 'Search...'}
            </span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-800 hover:text-red-600 lg:hidden cursor-pointer"
            aria-label="मेनू खोलें"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 3. CATEGORY NAVIGATION BAR (Desktop) */}
      <nav className="hidden lg:block border-t border-stone-200 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ul className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const isLive = cat.id === 'live';
              const isVideo = cat.id === 'video';

              return (
                <li key={cat.id} className="shrink-0">
                  <button
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`relative px-3 py-2 text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      isActive
                        ? 'text-red-700 font-bold'
                        : 'text-stone-700 hover:text-stone-900 hover:bg-stone-50'
                    }`}
                  >
                    {isLive && (
                      <span className="inline-block w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                    )}
                    {isVideo && (
                      <span className="text-red-600 font-bold">▶</span>
                    )}
                    <span>{language === 'hi' ? cat.nameHi : cat.nameEn}</span>

                    {/* Active Underline */}
                    {isActive && (
                      <span className="absolute bottom-0 inset-x-2 h-[3px] bg-red-600 rounded-t"></span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* 4. MOBILE DRAWER NAVIGATION */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[108px] bg-black/60 z-50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white w-4/5 max-w-sm h-full shadow-2xl p-5 overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <span className="font-serif font-bold text-lg text-stone-900">
                {language === 'hi' ? 'सभी श्रेणियां' : 'All Sections'}
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 text-stone-500 hover:text-stone-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4">
              <ul className="space-y-1">
                {CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <li key={cat.id}>
                      <button
                        onClick={() => handleCategoryClick(cat.id)}
                        className={`w-full text-left px-3 py-2.5 rounded text-base font-semibold flex items-center justify-between transition-colors ${
                          isActive
                            ? 'bg-red-50 text-red-700 font-bold'
                            : 'text-stone-800 hover:bg-stone-100'
                        }`}
                      >
                        <span>{language === 'hi' ? cat.nameHi : cat.nameEn}</span>
                        {cat.id === 'live' && (
                          <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded font-bold">
                            LIVE
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Mobile Footer Links */}
            <div className="pt-4 border-t border-stone-200 space-y-3">
              <button
                onClick={() => {
                  setIsAdminOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center py-2 bg-stone-900 text-white rounded font-medium text-sm flex items-center justify-center gap-2"
              >
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>संपादकीय CMS एडमिन</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
