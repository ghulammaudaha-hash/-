import React, { useState } from 'react';
import {
  Radio,
  Clock,
  Flame,
  PlusCircle,
  Share2,
  Check,
  RefreshCw,
  Bell,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';

export const LiveBlogSection: React.FC = () => {
  const { liveUpdates, addLiveUpdate, adminUser, language } = useNews();
  const [filterUrgentOnly, setFilterUrgentOnly] = useState(false);
  const [newUpdateTitle, setNewUpdateTitle] = useState('');
  const [newUpdateContent, setNewUpdateContent] = useState('');
  const [isUrgentNew, setIsUrgentNew] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);

  const displayedUpdates = filterUrgentOnly
    ? liveUpdates.filter((u) => u.isUrgent)
    : liveUpdates;

  const handlePostLiveUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUpdateTitle.trim() || !newUpdateContent.trim()) return;

    addLiveUpdate({
      title: newUpdateTitle,
      content: newUpdateContent,
      isUrgent: isUrgentNew,
      author: adminUser?.name || 'संपादकीय टीम',
      timeDisplay: 'अभी',
    });

    setNewUpdateTitle('');
    setNewUpdateContent('');
    setIsUrgentNew(false);
    setShowAddForm(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      {/* Header with Pulsing Live Indicator */}
      <div className="bg-stone-900 text-white p-6 rounded-sm shadow-md mb-8 border-l-4 border-red-600">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
            </span>
            <span className="bg-red-600 text-white text-xs font-black uppercase px-2 py-0.5 rounded tracking-wider">
              {language === 'hi' ? 'लाइव ब्लॉग' : 'LIVE BLOG'}
            </span>
            <span className="text-xs text-stone-400">
              {language === 'hi' ? 'ताज़ा घटनाक्रम की पल-पल की जानकारी' : 'Minute-by-minute updates'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilterUrgentOnly(!filterUrgentOnly)}
              className={`text-xs px-2.5 py-1 rounded font-semibold transition-colors cursor-pointer border ${
                filterUrgentOnly
                  ? 'bg-amber-500 text-stone-950 border-amber-500 font-bold'
                  : 'bg-white/10 text-stone-300 border-white/20 hover:bg-white/20'
              }`}
            >
              {filterUrgentOnly
                ? (language === 'hi' ? 'केवल महत्वपूर्ण सक्रिय' : 'Urgent Only')
                : (language === 'hi' ? 'सभी अपडेट' : 'All Updates')}
            </button>

            {adminUser && (
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded font-bold flex items-center gap-1 cursor-pointer"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>नया अपडेट</span>
              </button>
            )}
          </div>
        </div>

        <h1 className="font-serif font-black text-2xl sm:text-3xl text-white">
          {language === 'hi'
            ? 'देश और दुनिया का महा-बुलेटिन: आज की सबसे बड़ी हलचल'
            : 'National & Global Live Bulletin: Today\'s Breaking Events'}
        </h1>
      </div>

      {/* Admin Fast Post Form */}
      {showAddForm && (
        <form
          onSubmit={handlePostLiveUpdate}
          className="bg-white border-2 border-red-600 p-5 rounded-sm shadow-md mb-8 space-y-3 animate-in fade-in"
        >
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <span className="font-serif font-bold text-sm text-stone-900">
              तुरंत लाइव अपडेट जोड़ें
            </span>
            <label className="flex items-center gap-1.5 text-xs text-red-600 font-bold cursor-pointer">
              <input
                type="checkbox"
                checked={isUrgentNew}
                onChange={(e) => setIsUrgentNew(e.target.checked)}
              />
              <span>अति-महत्वपूर्ण (Urgent)</span>
            </label>
          </div>

          <input
            type="text"
            placeholder="अपडेट की मुख्य हेडलाइन *"
            value={newUpdateTitle}
            onChange={(e) => setNewUpdateTitle(e.target.value)}
            required
            className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:border-red-600 focus:outline-none"
          />

          <textarea
            placeholder="विस्तृत विवरण *"
            rows={3}
            value={newUpdateContent}
            onChange={(e) => setNewUpdateContent(e.target.value)}
            required
            className="w-full text-xs p-2.5 bg-stone-50 border border-stone-300 rounded focus:border-red-600 focus:outline-none"
          ></textarea>

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-100 rounded"
            >
              रद्द करें
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded cursor-pointer"
            >
              लाइव पोस्ट करें
            </button>
          </div>
        </form>
      )}

      {/* Chronological Timeline */}
      <div className="relative pl-6 sm:pl-8 border-l-2 border-stone-300 space-y-8">
        {displayedUpdates.map((entry, index) => {
          const isLatest = index === 0;

          return (
            <div key={entry.id} className="relative group">
              {/* Timeline Dot Indicator */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${
                  entry.isUrgent ? 'bg-red-600 ring-4 ring-red-100' : 'bg-stone-800'
                }`}
              >
                {isLatest && (
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                )}
              </div>

              {/* Card Container */}
              <div
                className={`p-5 rounded-sm border shadow-xs transition-all ${
                  entry.isUrgent
                    ? 'bg-red-50/40 border-red-300'
                    : 'bg-white border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-500 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-stone-900 bg-stone-100 px-2 py-0.5 rounded text-[11px]">
                      {entry.timeDisplay}
                    </span>
                    {entry.isUrgent && (
                      <span className="inline-flex items-center gap-1 font-bold text-red-700 text-[11px] bg-red-100/80 px-1.5 py-0.2 rounded">
                        <Flame className="w-3 h-3" />
                        <span>अति-महत्वपूर्ण</span>
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-stone-400">{entry.author}</span>
                </div>

                <h3 className="font-serif font-black text-base sm:text-lg text-stone-900 mb-2 leading-snug">
                  {entry.title}
                </h3>

                <p className="text-stone-700 text-sm leading-relaxed">
                  {entry.content}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
