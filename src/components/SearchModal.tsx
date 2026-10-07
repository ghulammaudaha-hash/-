import React, { useState } from 'react';
import { Search, X, Clock, Video, Camera, FileText, ChevronRight } from 'lucide-react';
import { useNews } from '../context/NewsContext';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    articles,
    videos,
    photoStories,
    setActiveArticleId,
    setSelectedCategory,
    language,
  } = useNews();

  const [activeTab, setActiveTab] = useState<'all' | 'news' | 'videos' | 'photos'>('all');

  if (!isSearchOpen) return null;

  const query = searchQuery.trim().toLowerCase();

  // Search filter
  const matchedArticles = query
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.summary.toLowerCase().includes(query) ||
          a.author.name.toLowerCase().includes(query) ||
          a.tags.some((t) => t.toLowerCase().includes(query))
      )
    : [];

  const matchedVideos = query
    ? videos.filter(
        (v) =>
          v.title.toLowerCase().includes(query) ||
          v.description.toLowerCase().includes(query) ||
          v.tags.some((t) => t.toLowerCase().includes(query))
      )
    : [];

  const matchedPhotos = query
    ? photoStories.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      )
    : [];

  const totalResults = matchedArticles.length + matchedVideos.length + matchedPhotos.length;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-12 sm:pt-20 animate-in fade-in">
      <div className="bg-white w-full max-w-3xl rounded-sm shadow-2xl overflow-hidden border border-stone-200">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-red-600 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              language === 'hi'
                ? 'खबरें, वीडियो, फोटो, विषय या लेखक खोजें...'
                : 'Search news, videos, photos, topics or authors...'
            }
            autoFocus
            className="flex-1 text-base sm:text-lg text-stone-900 placeholder:text-stone-400 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2.5 py-1 text-xs font-bold text-stone-600 hover:bg-stone-100 rounded cursor-pointer"
          >
            बंद करें [ESC]
          </button>
        </div>

        {/* Tab Filters */}
        <div className="px-5 py-2.5 bg-stone-50 border-b border-stone-200 flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded font-semibold cursor-pointer ${
              activeTab === 'all' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            सभी परिणाम ({totalResults})
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`px-3 py-1 rounded font-semibold cursor-pointer ${
              activeTab === 'news' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            समाचार ({matchedArticles.length})
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-3 py-1 rounded font-semibold cursor-pointer ${
              activeTab === 'videos' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            वीडियो ({matchedVideos.length})
          </button>
          <button
            onClick={() => setActiveTab('photos')}
            className={`px-3 py-1 rounded font-semibold cursor-pointer ${
              activeTab === 'photos' ? 'bg-stone-900 text-white' : 'text-stone-600 hover:bg-stone-200'
            }`}
          >
            फोटो ({matchedPhotos.length})
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-5 divide-y divide-stone-100">
          {!query && (
            <div className="py-8 text-center text-stone-500 text-sm">
              <p className="mb-2 font-medium">खोजने के लिए शब्द टाइप करें</p>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                <span className="text-stone-400">सुझाव:</span>
                {['इसरो', 'क्रिकेट', 'सेंसेक्स', 'उत्तर प्रदेश', 'बजट', 'जलवायु'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="underline text-red-600 hover:text-red-800 cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query && totalResults === 0 && (
            <div className="py-12 text-center text-stone-500 text-sm">
              <p className="font-semibold text-stone-700">कोई परिणाम नहीं मिला</p>
              <p className="text-xs text-stone-400 mt-1">
                कृपया अन्य कीवर्ड या श्रेणी से खोजें।
              </p>
            </div>
          )}

          {/* Matched Articles */}
          {(activeTab === 'all' || activeTab === 'news') &&
            matchedArticles.map((art) => (
              <div
                key={art.id}
                onClick={() => {
                  setActiveArticleId(art.id);
                  setIsSearchOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="py-3 group cursor-pointer hover:bg-stone-50 -mx-2 px-2 rounded"
              >
                <div className="flex items-center gap-2 text-[11px] text-stone-400 mb-1">
                  <FileText className="w-3 h-3 text-red-600" />
                  <span className="font-bold text-red-600 uppercase">{art.category}</span>
                  <span>·</span>
                  <span>{art.publishedAt}</span>
                  <span>·</span>
                  <span>लेखक: {art.author.name}</span>
                </div>
                <h4 className="font-serif font-bold text-sm text-stone-900 group-hover:text-red-700 transition-colors">
                  {art.title}
                </h4>
                <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">{art.summary}</p>
              </div>
            ))}

          {/* Matched Videos */}
          {(activeTab === 'all' || activeTab === 'videos') &&
            matchedVideos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => {
                  setSelectedCategory('video');
                  setIsSearchOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="py-3 group cursor-pointer hover:bg-stone-50 -mx-2 px-2 rounded"
              >
                <div className="flex items-center gap-2 text-[11px] text-stone-400 mb-1">
                  <Video className="w-3 h-3 text-red-600" />
                  <span className="font-bold text-stone-700">वीडियो</span>
                  <span>·</span>
                  <span>{vid.duration}</span>
                </div>
                <h4 className="font-serif font-bold text-sm text-stone-900 group-hover:text-red-700 transition-colors">
                  {vid.title}
                </h4>
              </div>
            ))}

          {/* Matched Photos */}
          {(activeTab === 'all' || activeTab === 'photos') &&
            matchedPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => {
                  setSelectedCategory('photo');
                  setIsSearchOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="py-3 group cursor-pointer hover:bg-stone-50 -mx-2 px-2 rounded"
              >
                <div className="flex items-center gap-2 text-[11px] text-stone-400 mb-1">
                  <Camera className="w-3 h-3 text-red-600" />
                  <span className="font-bold text-stone-700">फोटो स्टोरी</span>
                  <span>·</span>
                  <span>{photo.images.length} तस्वीरें</span>
                </div>
                <h4 className="font-serif font-bold text-sm text-stone-900 group-hover:text-red-700 transition-colors">
                  {photo.title}
                </h4>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
