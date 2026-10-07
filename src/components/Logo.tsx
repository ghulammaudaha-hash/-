import React from 'react';
import { useNews } from '../context/NewsContext';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark';
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  variant = 'light',
  showTagline = true,
  className = '',
}) => {
  const { language, siteSettings } = useNews();

  // Generated brand emblem image or custom configured logo URL
  const logoImgSrc = siteSettings?.logoUrl || '/src/assets/images/dainik_samvad_news_logo_1791380404722.jpg';

  // Size configurations
  const imageSize = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11 sm:w-12 sm:h-12',
    lg: 'w-14 h-14 sm:w-16 sm:h-16',
  }[size];

  const titleSize = {
    sm: 'text-lg sm:text-xl',
    md: 'text-2xl sm:text-3xl',
    lg: 'text-3xl sm:text-4xl',
  }[size];

  const taglineSize = {
    sm: 'text-[10px]',
    md: 'text-[11px]',
    lg: 'text-xs',
  }[size];

  const isDark = variant === 'dark';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Brand Icon Emblem */}
      <div className={`relative ${imageSize} rounded-md overflow-hidden shrink-0 shadow-xs border border-red-700/30 bg-red-800 flex items-center justify-center transition-transform hover:scale-105`}>
        <img
          src={logoImgSrc}
          alt="दैनिक खबर लोगो"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Elegant SVG fallback if image fails
            const target = e.currentTarget;
            target.style.display = 'none';
          }}
        />
        {/* Subtle inner seal border */}
        <div className="absolute inset-0 ring-1 ring-inset ring-white/20 pointer-events-none rounded-md"></div>
      </div>

      {/* Brand Wordmark & Tagline */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline gap-2">
          <span
            className={`font-serif font-black tracking-tight leading-none transition-colors ${
              isDark
                ? 'text-white hover:text-red-400'
                : 'text-stone-900 group-hover:text-red-700'
            } ${titleSize}`}
          >
            {language === 'hi' ? 'दैनिक खबर' : 'DAINIK KHABAR'}
          </span>
          <span className="hidden sm:inline-block text-[10px] font-sans font-bold text-red-600 uppercase tracking-widest bg-red-50 border border-red-200 px-1.5 py-0.2 rounded-xs">
            24x7
          </span>
        </div>

        {showTagline && (
          <p
            className={`font-sans font-medium tracking-wide mt-1 leading-tight ${
              isDark ? 'text-stone-400' : 'text-stone-500'
            } ${taglineSize}`}
          >
            {language === 'hi'
              ? 'सत्य • निष्पक्षता • विश्वसनीयता'
              : 'Truth • Impartiality • Credibility'}
          </p>
        )}
      </div>
    </div>
  );
};
