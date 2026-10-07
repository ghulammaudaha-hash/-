import React, { useState } from 'react';
import {
  Trophy,
  Flame,
  Award,
  Calendar,
  Share2,
  ChevronRight,
  TrendingUp,
  Activity,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { Article } from '../types/news';

export const SportsSection: React.FC = () => {
  const { articles, sportsScore, setActiveArticleId, language } = useNews();
  const [selectedSportTab, setSelectedSportTab] = useState('cricket');

  // Filter sports articles
  const sportsArticles = articles.filter((a) => a.category === 'sports');
  const otherFeaturedSports = articles.slice(0, 3); // companion items

  const sportsTabs = [
    { id: 'cricket', nameHi: 'क्रिकेट (Cricket)', nameEn: 'Cricket' },
    { id: 'hockey', nameHi: 'हॉकी (Hockey)', nameEn: 'Hockey' },
    { id: 'football', nameHi: 'फुटबॉल (Football)', nameEn: 'Football' },
    { id: 'tennis', nameHi: 'टेनिस (Tennis)', nameEn: 'Tennis' },
    { id: 'kabaddi', nameHi: 'कबड्डी (Kabaddi)', nameEn: 'Kabaddi' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b-2 border-stone-900 gap-4">
        <div>
          <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4" />
            <span>{language === 'hi' ? 'दैनिक खबर खेल डेस्क' : 'Sports Desk'}</span>
          </div>
          <h1 className="font-serif font-black text-2xl sm:text-3xl text-stone-900">
            {language === 'hi' ? 'खेल समाचार एवं लाइव स्कोरकार्ड' : 'Sports News & Scores'}
          </h1>
        </div>

        {/* Sports tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {sportsTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedSportTab(tab.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xs transition-colors whitespace-nowrap cursor-pointer ${
                selectedSportTab === tab.id
                  ? 'bg-red-700 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {language === 'hi' ? tab.nameHi : tab.nameEn}
            </button>
          ))}
        </div>
      </div>

      {/* FEATURED MATCH SCOREBOARD HERO CARD */}
      {sportsScore && (
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white p-6 rounded-sm shadow-md mb-8 border-l-4 border-amber-400">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="font-bold uppercase tracking-wider text-amber-300">
                {sportsScore.tournament}
              </span>
              <span className="text-stone-400">· {sportsScore.matchType}</span>
            </div>
            <span className="bg-white/10 text-stone-200 text-[11px] font-mono px-2 py-0.5 rounded">
              गाबा, ब्रिस्बेन
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Team 1 & 2 Scores */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇦🇺</span>
                  <span className="font-serif font-bold text-lg">{sportsScore.team1.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-black text-xl text-stone-200">
                    {sportsScore.team1.score}
                  </span>
                  <span className="block text-xs text-stone-400 font-mono">
                    {sportsScore.team1.overs}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🇮🇳</span>
                  <span className="font-serif font-bold text-lg text-amber-300">
                    {sportsScore.team2.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-mono font-black text-2xl text-amber-300">
                    {sportsScore.team2.score}
                  </span>
                  <span className="block text-xs text-amber-400/80 font-mono">
                    {sportsScore.team2.overs}
                  </span>
                </div>
              </div>
            </div>

            {/* Match summary & player of the match */}
            <div className="bg-white/5 p-4 rounded border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider block mb-1">
                  परिणाम / RESULT
                </span>
                <h3 className="font-serif font-black text-lg text-white mb-2">
                  {sportsScore.status}
                </h3>
                <p className="text-xs text-stone-300 leading-relaxed">
                  {sportsScore.highlightText}
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-white/10 text-[11px] text-stone-400 flex items-center justify-between">
                <span>मैन ऑफ द मैच: ऋषभ पंत</span>
                <span className="text-amber-300 font-semibold">सीरीज स्कोर: 2-1 (भारत आगे)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SPORTS STORIES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sportsArticles.map((article) => (
          <div
            key={article.id}
            onClick={() => {
              setActiveArticleId(article.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group cursor-pointer bg-white rounded-sm border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
          >
            <div className="aspect-[16/10] bg-stone-100 overflow-hidden relative">
              <img
                src={article.featuredImage}
                alt={article.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                मैच रिपोर्ट
              </span>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] text-stone-400 font-medium block mb-1">
                  {article.publishedAt} · {article.readTime}
                </span>
                <h3 className="font-serif font-black text-base text-stone-900 leading-snug group-hover:text-red-700 transition-colors line-clamp-2 mb-2">
                  {article.title}
                </h3>
                <p className="text-xs text-stone-600 line-clamp-2">
                  {article.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 text-xs font-bold text-red-600 flex items-center gap-1 group-hover:underline">
                <span>विस्तृत रिपोर्ट पढ़ें</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PLAYER SPOTLIGHT CARD */}
      <div className="mt-10 bg-stone-50 border border-stone-200 p-6 rounded-sm">
        <h3 className="font-serif font-bold text-lg text-stone-900 mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>सप्ताह के सर्वश्रेष्ठ खिलाड़ी (Player of the Week)</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded border border-stone-200">
            <span className="text-xs text-stone-400">क्रिकेट</span>
            <h4 className="font-serif font-bold text-base text-stone-900 mt-1">ऋषभ पंत</h4>
            <p className="text-xs text-stone-600 mt-1">
              ब्रिस्बेन टेस्ट में 112 रनों की मैच जिताऊ शतकीय पारी।
            </p>
          </div>
          <div className="p-4 bg-white rounded border border-stone-200">
            <span className="text-xs text-stone-400">हॉकी</span>
            <h4 className="font-serif font-bold text-base text-stone-900 mt-1">हरमनप्रीत सिंह</h4>
            <p className="text-xs text-stone-600 mt-1">
              एशियाई चैंपियंस ट्रॉफी में पेनाल्टी कॉर्नर से 8 गोल दागे।
            </p>
          </div>
          <div className="p-4 bg-white rounded border border-stone-200">
            <span className="text-xs text-stone-400">शतरंज</span>
            <h4 className="font-serif font-bold text-base text-stone-900 mt-1">डी. गुकेश</h4>
            <p className="text-xs text-stone-600 mt-1">
              विश्व कैंडिडेट टूर्नामेंट जीतकर सबसे युवा चैलेंजर बने।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
