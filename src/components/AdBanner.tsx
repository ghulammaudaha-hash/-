import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useNews } from '../context/NewsContext';

interface AdBannerProps {
  position: 'header' | 'hero' | 'in-feed' | 'sidebar' | 'article' | 'footer';
}

export const AdBanner: React.FC<AdBannerProps> = ({ position }) => {
  const { advertisements } = useNews();
  const ad = advertisements.find((a) => a.position === position && a.enabled);

  if (!ad) return null;

  return (
    <aside aria-label="विज्ञापन" className="my-4 no-print">
      <div className="bg-[#f5f5f5] border border-stone-200/80 p-2 sm:p-3 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <span className="text-[9px] uppercase font-bold text-stone-400 bg-stone-200/60 px-1 py-0.5 rounded tracking-wider shrink-0">
            विज्ञापन
          </span>
          <div>
            <h4 className="text-xs font-bold text-stone-900 line-clamp-1">{ad.headline}</h4>
            <p className="text-[11px] text-stone-500 line-clamp-1">{ad.subtext}</p>
          </div>
        </div>

        <a
          href={ad.targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-xs text-red-600 hover:text-red-700 font-bold flex items-center gap-1 hover:underline underline-offset-2"
        >
          <span>{ad.callToAction}</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </aside>
  );
};
