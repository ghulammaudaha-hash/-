import React, { useState } from 'react';
import {
  Play,
  Clock,
  Eye,
  Filter,
  X,
  Share2,
  Maximize2,
  Video,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { VideoItem, CategoryId } from '../types/news';

export const VideoSection: React.FC = () => {
  const { videos, language } = useNews();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  const categories = [
    { id: 'all', nameHi: 'सभी वीडियो', nameEn: 'All Videos' },
    { id: 'tech', nameHi: 'टेक एवं विज्ञान', nameEn: 'Tech & Science' },
    { id: 'politics', nameHi: 'राजनीति एवं संसद', nameEn: 'Politics' },
    { id: 'sports', nameHi: 'खेल', nameEn: 'Sports' },
    { id: 'world', nameHi: 'दुनिया', nameEn: 'World' },
  ];

  const filteredVideos =
    selectedCategory === 'all'
      ? videos
      : videos.filter((v) => v.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b-2 border-stone-900 gap-4">
        <div>
          <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Video className="w-4 h-4" />
            <span>{language === 'hi' ? 'दैनिक खबर वीडियो हब' : 'Video Hub'}</span>
          </div>
          <h1 className="font-serif font-black text-2xl sm:text-3xl text-stone-900">
            {language === 'hi' ? 'वीडियो समाचार एवं विश्लेषण' : 'Video News & Explainers'}
          </h1>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xs transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === c.id
                  ? 'bg-stone-900 text-white'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {language === 'hi' ? c.nameHi : c.nameEn}
            </button>
          ))}
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            onClick={() => setActiveVideo(video)}
            className="group cursor-pointer bg-white rounded-sm border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
          >
            {/* Thumbnail with duration & play icon */}
            <div className="relative aspect-video bg-black overflow-hidden">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-12 h-12 bg-red-600/90 text-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-red-600 transition-all">
                  <Play className="w-6 h-6 ml-0.5 fill-white" />
                </div>
              </div>
              <span className="absolute bottom-2 right-2 bg-black/85 text-white font-mono text-xs px-2 py-0.5 rounded font-bold">
                {video.duration}
              </span>
              <span className="absolute top-2 left-2 bg-stone-900/80 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                {video.category}
              </span>
            </div>

            {/* Video Meta */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-serif font-bold text-base text-stone-900 leading-snug group-hover:text-red-700 transition-colors line-clamp-2 mb-2">
                  {video.title}
                </h3>
                <p className="text-xs text-stone-600 line-clamp-2 mb-3">
                  {video.description}
                </p>
              </div>

              <div className="flex items-center justify-between text-[11px] text-stone-400 border-t border-stone-100 pt-3">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{video.publishedAt}</span>
                </span>
                <span className="flex items-center gap-1 font-mono">
                  <Eye className="w-3 h-3" />
                  <span>{video.views.toLocaleString('hi-IN')}</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-xs animate-in fade-in">
          <div className="bg-stone-950 text-white w-full max-w-4xl rounded-sm overflow-hidden border border-stone-800 shadow-2xl">
            {/* Top Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-stone-800">
              <span className="text-xs font-bold text-red-500 uppercase tracking-wider">
                दैनिक खबर वीडियो प्लेयर
              </span>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1 text-stone-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Container */}
            <div className="aspect-video bg-black relative">
              <video
                src={activeVideo.videoUrl}
                poster={activeVideo.thumbnailUrl}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Details */}
            <div className="p-5">
              <div className="flex items-center gap-3 text-xs text-stone-400 mb-2">
                <span className="text-red-400 font-bold uppercase">{activeVideo.category}</span>
                <span>·</span>
                <span>{activeVideo.publishedAt}</span>
                <span>·</span>
                <span>{activeVideo.views.toLocaleString('hi-IN')} दृश्य</span>
              </div>

              <h2 className="font-serif font-bold text-xl text-stone-100 mb-2">
                {activeVideo.title}
              </h2>
              <p className="text-sm text-stone-300 leading-relaxed">
                {activeVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
