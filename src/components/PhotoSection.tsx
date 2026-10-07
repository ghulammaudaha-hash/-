import React, { useState, useEffect } from 'react';
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
  Clock,
  Eye,
  Layers,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { PhotoStory } from '../types/news';

export const PhotoSection: React.FC = () => {
  const { photoStories, language } = useNews();
  const [activeStory, setActiveStory] = useState<PhotoStory | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeStory) return;
      if (e.key === 'ArrowRight') {
        setCurrentPhotoIndex((prev) => (prev + 1) % activeStory.images.length);
      } else if (e.key === 'ArrowLeft') {
        setCurrentPhotoIndex((prev) => (prev - 1 + activeStory.images.length) % activeStory.images.length);
      } else if (e.key === 'Escape') {
        setActiveStory(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeStory]);

  const openGallery = (story: PhotoStory) => {
    setActiveStory(story);
    setCurrentPhotoIndex(0);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="pb-4 mb-8 border-b-2 border-stone-900">
        <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wider mb-1">
          <Camera className="w-4 h-4" />
          <span>{language === 'hi' ? 'फोटो जर्नलिज्म' : 'Photo Journalism'}</span>
        </div>
        <h1 className="font-serif font-black text-2xl sm:text-3xl text-stone-900">
          {language === 'hi' ? 'तस्वीरों में आज का भारत और दुनिया' : 'Photo Stories & Galleries'}
        </h1>
        <p className="text-sm text-stone-600 mt-1">
          {language === 'hi'
            ? 'देश-दुनिया की सबसे बेहतरीन, संवेदनशील और सजीव तस्वीरों का संग्रह'
            : 'Curated visual stories from India and across the globe'}
        </p>
      </div>

      {/* Gallery Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {photoStories.map((story) => (
          <div
            key={story.id}
            onClick={() => openGallery(story)}
            className="group cursor-pointer bg-white rounded-sm border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
          >
            {/* Cover Image */}
            <div className="relative aspect-[16/10] bg-stone-900 overflow-hidden">
              <img
                src={story.coverImage}
                alt={story.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

              {/* Photos Counter Badge */}
              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded flex items-center gap-1.5 border border-white/20">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>{story.images.length} {language === 'hi' ? 'तस्वीरें' : 'Photos'}</span>
              </div>
            </div>

            {/* Story Details */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs text-stone-400 mb-2">
                  <span className="text-red-600 font-semibold">{story.category.toUpperCase()}</span>
                  <span>·</span>
                  <span>{story.publishedAt}</span>
                  <span>·</span>
                  <span>{story.author}</span>
                </div>
                <h3 className="font-serif font-black text-lg sm:text-xl text-stone-900 leading-snug group-hover:text-red-700 transition-colors mb-2">
                  {story.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 line-clamp-2">
                  {story.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="font-bold text-red-600 group-hover:underline">
                  गैलरी देखें →
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Eye className="w-3 h-3 text-stone-400" />
                  <span>{story.views.toLocaleString('hi-IN')}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeStory && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-md animate-in fade-in select-none">
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white border-b border-white/10 pb-3">
            <div>
              <span className="text-xs text-amber-400 font-mono font-bold tracking-wider">
                {currentPhotoIndex + 1} / {activeStory.images.length}
              </span>
              <h2 className="font-serif font-bold text-sm sm:text-base text-stone-200 line-clamp-1 mt-0.5">
                {activeStory.title}
              </h2>
            </div>
            <button
              onClick={() => setActiveStory(null)}
              className="p-2 text-stone-400 hover:text-white cursor-pointer rounded-full hover:bg-white/10"
              aria-label="बंद करें"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Photo Center Container */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            {/* Prev Button */}
            <button
              onClick={() =>
                setCurrentPhotoIndex((prev) => (prev - 1 + activeStory.images.length) % activeStory.images.length)
              }
              className="absolute left-2 sm:left-4 z-10 p-3 bg-black/60 hover:bg-black/90 text-white rounded-full border border-white/20 transition-all cursor-pointer"
              aria-label="पिछली तस्वीर"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Current Image */}
            <div className="max-w-5xl max-h-[70vh] flex flex-col items-center justify-center">
              <img
                src={activeStory.images[currentPhotoIndex].url}
                alt={activeStory.images[currentPhotoIndex].caption}
                className="max-h-[60vh] max-w-full object-contain rounded-sm shadow-2xl transition-all"
              />
              <p className="text-stone-300 text-xs sm:text-sm text-center mt-3 max-w-2xl px-4">
                {activeStory.images[currentPhotoIndex].caption}
                {activeStory.images[currentPhotoIndex].credit && (
                  <span className="block text-stone-500 text-[11px] mt-0.5 font-sans">
                    {activeStory.images[currentPhotoIndex].credit}
                  </span>
                )}
              </p>
            </div>

            {/* Next Button */}
            <button
              onClick={() =>
                setCurrentPhotoIndex((prev) => (prev + 1) % activeStory.images.length)
              }
              className="absolute right-2 sm:right-4 z-10 p-3 bg-black/60 hover:bg-black/90 text-white rounded-full border border-white/20 transition-all cursor-pointer"
              aria-label="अगली तस्वीर"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 border-t border-white/10 no-scrollbar">
            {activeStory.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPhotoIndex(idx)}
                className={`relative w-16 h-12 rounded overflow-hidden shrink-0 transition-all cursor-pointer border-2 ${
                  currentPhotoIndex === idx
                    ? 'border-red-600 scale-105'
                    : 'border-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
