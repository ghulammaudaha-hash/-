import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  RotateCcw,
  Clock,
  Eye,
  Radio,
  Flame,
  Share2,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { VideoItem } from '../types/news';

export const HeroVideoSection: React.FC = () => {
  const { videos, articles, setActiveArticleId, language } = useNews();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pick hero video or first video
  const heroVideo: VideoItem = videos.find((v) => v.isHero) || videos[0];

  // Pick 4 right-column news cards
  const rightColumnArticles = articles.slice(0, 4);

  // Video Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState(heroVideo.duration || '06:45');
  const [isControlsVisible, setIsControlsVisible] = useState(true);
  const [autoPlayMuted, setAutoPlayMuted] = useState(false);

  // Time format helper
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setProgress((current / total) * 100);
    setCurrentTime(formatTime(current));
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = pos * (videoRef.current.duration || 1);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen?.();
    } else {
      videoRef.current.requestFullscreen?.();
    }
  };

  const toggleAutoPlayMuted = () => {
    const nextState = !autoPlayMuted;
    setAutoPlayMuted(nextState);
    if (nextState && videoRef.current) {
      videoRef.current.muted = true;
      setIsMuted(true);
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Check if video URL is a YouTube embed
  const isYouTube = heroVideo.videoUrl.includes('youtube.com') || heroVideo.videoUrl.includes('youtu.be');

  return (
    <section className="bg-white border-b border-stone-200 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Headline Kicker */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-200 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-6 bg-red-600 inline-block rounded-xs"></span>
            <h2 className="font-serif font-black text-xl sm:text-2xl text-stone-900 tracking-tight flex items-center gap-2">
              <span>{language === 'hi' ? 'मुख्य वीडियो एवं ताज़ा समाचार' : 'Featured Video & Top Stories'}</span>
            </h2>
            <span className="text-xs bg-red-50 text-red-700 font-bold px-2 py-0.5 rounded border border-red-200 uppercase">
              {language === 'hi' ? 'विशेष रिपोर्ट' : 'Special Report'}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={toggleAutoPlayMuted}
              className={`text-xs px-2.5 py-1 rounded font-medium transition-colors cursor-pointer border ${
                autoPlayMuted
                  ? 'bg-stone-900 text-white border-stone-900'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border-stone-200'
              }`}
            >
              {autoPlayMuted
                ? (language === 'hi' ? '✓ ऑटो-प्ले सक्रिय' : '✓ Auto-play Active')
                : (language === 'hi' ? 'ऑटो-प्ले म्यूट' : 'Auto-play Muted')}
            </button>
          </div>
        </div>

        {/* Desktop 2-Column Layout: Video on Left (7 cols), Top Stories on Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* LEFT AREA: DOMINANT 16:9 VIDEO PLAYER */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
            <div
              className="relative w-full aspect-video bg-black rounded-sm overflow-hidden shadow-md group"
              onMouseEnter={() => setIsControlsVisible(true)}
              onMouseLeave={() => isPlaying && setIsControlsVisible(false)}
            >
              {isYouTube ? (
                <iframe
                  src={heroVideo.videoUrl}
                  title={heroVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    src={heroVideo.videoUrl}
                    poster={heroVideo.thumbnailUrl}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => setIsPlaying(false)}
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={togglePlay}
                  />

                  {/* Big Play Button Overlay when paused */}
                  {!isPlaying && (
                    <div
                      onClick={togglePlay}
                      className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] cursor-pointer transition-opacity group-hover:bg-black/30"
                    >
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-2xl transition-transform transform group-hover:scale-110">
                        <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-white" />
                      </div>
                    </div>
                  )}

                  {/* Video Controls Bar */}
                  <div
                    className={`absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-3 sm:p-4 transition-opacity duration-300 ${
                      isControlsVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {/* Progress Bar / Scrubber */}
                    <div
                      className="w-full h-1.5 bg-white/30 rounded-full mb-3 cursor-pointer relative overflow-hidden hover:h-2 transition-all"
                      onClick={handleSeek}
                    >
                      <div
                        className="h-full bg-red-600 relative transition-all"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-white text-xs">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={togglePlay}
                          className="hover:text-red-400 transition-colors cursor-pointer"
                          aria-label={isPlaying ? 'रोकें' : 'चलाएं'}
                        >
                          {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white" />}
                        </button>

                        <button
                          onClick={toggleMute}
                          className="hover:text-red-400 transition-colors cursor-pointer"
                          aria-label={isMuted ? 'ध्वनि चालू' : 'म्यूट'}
                        >
                          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>

                        <span className="font-mono text-stone-300 text-[11px]">
                          {currentTime} / {duration}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="bg-red-600/90 text-white font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase">
                          HD 1080p
                        </span>
                        <button
                          onClick={toggleFullscreen}
                          className="hover:text-red-400 transition-colors cursor-pointer"
                          aria-label="फुलस्क्रीन"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Video Metadata & Description */}
            <div className="mt-4">
              <div className="flex items-center gap-3 text-xs text-stone-500 mb-2">
                <span className="font-semibold text-red-600 uppercase tracking-wider">
                  {heroVideo.category.toUpperCase()}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-stone-400" />
                  <span>{heroVideo.publishedAt}</span>
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 font-mono">
                  <Eye className="w-3.5 h-3.5 text-stone-400" />
                  <span>{heroVideo.views.toLocaleString('hi-IN')} {language === 'hi' ? 'बार देखा गया' : 'views'}</span>
                </span>
              </div>

              <h1 className="font-serif font-black text-xl sm:text-2xl lg:text-3xl text-stone-900 leading-snug tracking-tight mb-2 hover:text-red-700 transition-colors">
                {heroVideo.title}
              </h1>

              <p className="text-stone-600 text-sm sm:text-base leading-relaxed line-clamp-2">
                {heroVideo.description}
              </p>

              {heroVideo.authorName && (
                <div className="mt-2 text-xs font-semibold text-stone-500">
                  {heroVideo.authorName}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT AREA: 4 LATEST IMPORTANT NEWS CARDS */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col divide-y divide-stone-200">
            <div className="pb-2.5 mb-2 flex items-center justify-between">
              <h3 className="font-serif font-bold text-base text-stone-900 uppercase tracking-wider flex items-center gap-2">
                <Flame className="w-4 h-4 text-red-600" />
                <span>{language === 'hi' ? 'ताज़ा प्रमुख खबरें' : 'Latest Top Stories'}</span>
              </h3>
              <span className="text-xs text-stone-500 font-medium">
                {language === 'hi' ? 'रीयल-टाइम अपडेट' : 'Real-time'}
              </span>
            </div>

            {rightColumnArticles.map((article, idx) => {
              const isLiveCard = idx === 0 || article.isLive;

              return (
                <article
                  key={article.id}
                  onClick={() => {
                    setActiveArticleId(article.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="py-3.5 first:pt-1 group cursor-pointer transition-all hover:bg-stone-50/80 -mx-2 px-2 rounded-xs"
                >
                  <div className="flex gap-3.5 items-start">
                    {/* Small thumbnail */}
                    <div className="w-24 sm:w-28 aspect-[4/3] shrink-0 bg-stone-100 rounded-xs overflow-hidden relative border border-stone-200">
                      <img
                        src={article.featuredImage}
                        alt={article.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {isLiveCard && (
                        <div className="absolute top-1 left-1 bg-red-600 text-white font-black text-[9px] px-1.5 py-0.2 rounded-xs flex items-center gap-1 shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                          <span>LIVE</span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mb-1">
                        <span className="font-semibold text-red-600">
                          {article.category === 'india' ? 'भारत' : article.category === 'world' ? 'दुनिया' : article.category === 'up' ? 'उत्तर प्रदेश' : 'राजनीति'}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{article.publishedAt}</span>
                      </div>

                      <h4 className="font-serif font-bold text-sm sm:text-base text-stone-900 leading-snug group-hover:text-red-700 transition-colors line-clamp-2">
                        {article.title}
                      </h4>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
