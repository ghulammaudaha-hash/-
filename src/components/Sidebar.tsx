import React, { useState } from 'react';
import {
  TrendingUp,
  Flame,
  PlayCircle,
  Mail,
  CheckCircle,
  Trophy,
  ExternalLink,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';

export const Sidebar: React.FC = () => {
  const {
    articles,
    videos,
    sportsScore,
    advertisements,
    setActiveArticleId,
    setSelectedCategory,
    language,
  } = useNews();

  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Trending articles sorted by views
  const trendingArticles = [...articles].sort((a, b) => b.views - a.views).slice(0, 5);

  // Popular videos
  const popularVideos = [...videos].sort((a, b) => b.views - a.views).slice(0, 3);

  // Sidebar Ad
  const sidebarAd = advertisements.find((ad) => ad.position === 'sidebar' && ad.enabled);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmailInput('');
      }, 3000);
    }
  };

  return (
    <aside className="space-y-8">
      {/* 1. TRENDING NEWS (ट्रेंडिंग खबरें) - With Editorial Rank 01, 02, 03 */}
      <div className="bg-white p-5 rounded-sm border border-stone-200 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200">
          <h3 className="font-serif font-black text-lg text-stone-900 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-red-600" />
            <span>{language === 'hi' ? 'ट्रेंडिंग खबरें' : 'Trending Stories'}</span>
          </h3>
          <span className="text-[11px] font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
            TOP 5
          </span>
        </div>

        <ol className="divide-y divide-stone-100">
          {trendingArticles.map((article, index) => {
            const rankStr = `0${index + 1}`;

            return (
              <li
                key={article.id}
                onClick={() => {
                  setActiveArticleId(article.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="py-3 first:pt-0 last:pb-0 flex items-start gap-3.5 group cursor-pointer transition-colors hover:bg-stone-50/80 -mx-2 px-2 rounded-xs"
              >
                {/* Editorial Big Number */}
                <span className="font-serif font-black text-2xl text-stone-300 group-hover:text-red-600 transition-colors w-7 shrink-0 text-center select-none">
                  {rankStr}
                </span>

                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-stone-400 font-semibold mb-0.5 flex items-center gap-1.5">
                    <span className="text-red-600 font-medium">{article.category.toUpperCase()}</span>
                    <span>·</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-stone-900 leading-snug group-hover:text-red-700 transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* 2. LIVE SPORTS MINI SCORECARD */}
      {sportsScore && (
        <div className="bg-gradient-to-br from-stone-900 to-stone-950 text-white p-4 sm:p-5 rounded-sm shadow-md">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-xs uppercase tracking-wider text-stone-300">
                {sportsScore.tournament}
              </span>
            </div>
            <button
              onClick={() => setSelectedCategory('sports')}
              className="text-[11px] text-amber-400 hover:text-amber-300 underline underline-offset-2 cursor-pointer"
            >
              खेल हब →
            </button>
          </div>

          <div className="text-xs text-stone-400 mb-2">{sportsScore.matchType}</div>

          <div className="space-y-2 py-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-stone-200">{sportsScore.team1.name}</span>
              <span className="font-mono font-bold text-stone-100">{sportsScore.team1.score}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-amber-300">{sportsScore.team2.name}</span>
              <span className="font-mono font-bold text-amber-300">{sportsScore.team2.score}</span>
            </div>
          </div>

          <div className="mt-3 pt-2.5 border-t border-stone-800 text-[11px] text-emerald-400 font-medium">
            {sportsScore.status}
          </div>
        </div>
      )}

      {/* 3. POPULAR VIDEOS */}
      <div className="bg-white p-5 rounded-sm border border-stone-200 shadow-xs">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-stone-200">
          <h3 className="font-serif font-black text-lg text-stone-900 flex items-center gap-2">
            <PlayCircle className="w-5 h-5 text-red-600" />
            <span>{language === 'hi' ? 'लोकप्रिय वीडियो' : 'Popular Videos'}</span>
          </h3>
          <button
            onClick={() => setSelectedCategory('video')}
            className="text-xs text-red-600 font-semibold hover:underline"
          >
            सभी देखें →
          </button>
        </div>

        <div className="space-y-4">
          {popularVideos.map((vid) => (
            <div
              key={vid.id}
              onClick={() => setSelectedCategory('video')}
              className="group cursor-pointer flex gap-3 items-center"
            >
              <div className="relative w-24 aspect-video shrink-0 bg-stone-900 rounded-xs overflow-hidden">
                <img
                  src={vid.thumbnailUrl}
                  alt={vid.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute bottom-1 right-1 bg-black/80 text-white font-mono text-[9px] px-1 rounded">
                  {vid.duration}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 leading-snug group-hover:text-red-700 transition-colors line-clamp-2">
                  {vid.title}
                </h4>
                <span className="text-[10px] text-stone-500 mt-0.5 block">{vid.publishedAt}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. SPONSORED SIDEBAR ADVERTISEMENT */}
      {sidebarAd && (
        <div className="bg-stone-50 border border-stone-200 p-4 rounded-sm text-center">
          <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block mb-2">
            विज्ञापन / ADVERTISEMENT
          </span>
          <div className="overflow-hidden rounded-xs mb-3 aspect-[4/3] bg-stone-200">
            <img
              src={sidebarAd.imageUrl}
              alt={sidebarAd.headline}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <h4 className="font-serif font-bold text-sm text-stone-900 mb-1">{sidebarAd.headline}</h4>
          <p className="text-xs text-stone-600 mb-3">{sidebarAd.subtext}</p>
          <a
            href={sidebarAd.targetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full py-2 bg-stone-900 text-white text-xs font-semibold rounded hover:bg-stone-800 transition-colors"
          >
            {sidebarAd.callToAction}
          </a>
        </div>
      )}

      {/* 5. NEWSLETTER SIGNUP */}
      <div className="bg-red-50/80 border border-red-200 p-5 rounded-sm">
        <div className="flex items-center gap-2 text-red-700 font-bold text-sm mb-1">
          <Mail className="w-4 h-4 text-red-600" />
          <span>{language === 'hi' ? 'दैनिक खबर बुलेटिन' : 'Daily Khabar Bulletin'}</span>
        </div>
        <p className="text-xs text-stone-600 mb-3">
          {language === 'hi'
            ? 'देश और दुनिया की सबसे बड़ी खबरें हर सुबह सीधे अपने ईमेल पर पाएं।'
            : 'Get the biggest verified news stories delivered to your inbox every morning.'}
        </p>

        {subscribed ? (
          <div className="bg-emerald-100 text-emerald-800 text-xs p-2.5 rounded font-medium flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>धन्यवाद! आप दैनिक बुलेटिन से जुड़ चुके हैं।</span>
          </div>
        ) : (
          <form onSubmit={handleSubscribe} className="space-y-2">
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="आपका ईमेल पता दर्ज करें"
              required
              className="w-full text-xs px-3 py-2 bg-white border border-stone-300 rounded focus:outline-none focus:border-red-600 text-stone-900"
            />
            <button
              type="submit"
              className="w-full py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded cursor-pointer transition-colors"
            >
              {language === 'hi' ? 'सब्सक्राइब करें' : 'Subscribe Free'}
            </button>
          </form>
        )}
      </div>
    </aside>
  );
};
