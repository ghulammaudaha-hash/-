import React from 'react';
import { ArrowRight, Clock, Eye, Share2, Flame } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { Article, CategoryId } from '../types/news';

export const MainNewsGrid: React.FC = () => {
  const {
    articles,
    selectedCategory,
    setSelectedCategory,
    setActiveArticleId,
    advertisements,
    language,
  } = useNews();

  // If a specific category is chosen from navigation (and it's not 'top', 'video', 'photo', 'live', 'sports')
  const isFilteredCategory = selectedCategory !== 'top' && !['video', 'photo', 'live', 'sports'].includes(selectedCategory);

  // Group articles by category
  const categoriesToShow: Array<{ id: CategoryId; nameHi: string; nameEn: string }> = isFilteredCategory
    ? [
        {
          id: selectedCategory,
          nameHi:
            selectedCategory === 'india'
              ? 'भारत'
              : selectedCategory === 'world'
              ? 'दुनिया'
              : selectedCategory === 'up'
              ? 'उत्तर प्रदेश'
              : selectedCategory === 'politics'
              ? 'राजनीति'
              : selectedCategory === 'business'
              ? 'बिजनेस'
              : selectedCategory === 'tech'
              ? 'टेक्नोलॉजी'
              : selectedCategory === 'health'
              ? 'स्वास्थ्य'
              : selectedCategory === 'education'
              ? 'शिक्षा'
              : 'समाचार',
          nameEn: selectedCategory.toUpperCase(),
        },
      ]
    : [
        { id: 'india', nameHi: 'भारत', nameEn: 'India' },
        { id: 'world', nameHi: 'दुनिया', nameEn: 'World' },
        { id: 'up', nameHi: 'उत्तर प्रदेश', nameEn: 'Uttar Pradesh' },
        { id: 'politics', nameHi: 'राजनीति', nameEn: 'Politics' },
        { id: 'business', nameHi: 'बिजनेस', nameEn: 'Business' },
        { id: 'tech', nameHi: 'टेक्नोलॉजी', nameEn: 'Technology' },
        { id: 'health', nameHi: 'स्वास्थ्य', nameEn: 'Health' },
        { id: 'entertainment', nameHi: 'मनोरंजन', nameEn: 'Entertainment' },
        { id: 'education', nameHi: 'शिक्षा', nameEn: 'Education' },
      ];

  const inFeedAd = advertisements.find((ad) => ad.position === 'in-feed' && ad.enabled);

  return (
    <div className="space-y-12">
      {categoriesToShow.map((cat, sectionIdx) => {
        // Find articles for this category
        const categoryArticles = articles.filter((a) => a.category === cat.id && a.status === 'published');
        if (categoryArticles.length === 0) return null;

        const leadStory = categoryArticles[0];
        const secondaryStories = categoryArticles.slice(1, 4);

        return (
          <section key={cat.id} className="border-b border-stone-200 pb-10 last:border-b-0">
            {/* Section Header */}
            <div className="flex items-center justify-between pb-3 mb-6 border-b-2 border-stone-900">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-6 bg-red-600 inline-block"></span>
                <h2 className="font-serif font-black text-2xl text-stone-900 tracking-tight">
                  {language === 'hi' ? cat.nameHi : cat.nameEn}
                </h2>
              </div>
              <button
                onClick={() => setSelectedCategory(cat.id)}
                className="text-xs font-bold text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>{language === 'hi' ? 'और खबरें' : 'More Stories'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Editorial Grid: 1 Big Featured Story on Left (7 cols), Companion Stories on Right (5 cols) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              
              {/* Featured Lead Story */}
              {leadStory && (
                <div
                  onClick={() => {
                    setActiveArticleId(leadStory.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="md:col-span-7 group cursor-pointer"
                >
                  <div className="aspect-[16/10] bg-stone-100 overflow-hidden rounded-xs border border-stone-200 mb-3 relative">
                    <img
                      src={leadStory.featuredImage}
                      alt={leadStory.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {leadStory.isLeadStory && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-xs tracking-wider">
                        {language === 'hi' ? 'प्रमुख खबर' : 'TOP STORY'}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                    <span className="font-semibold text-red-600">{language === 'hi' ? cat.nameHi : cat.nameEn}</span>
                    <span aria-hidden="true">·</span>
                    <span>{leadStory.publishedAt}</span>
                    <span aria-hidden="true">·</span>
                    <span>{leadStory.readTime}</span>
                  </div>

                  <h3 className="font-serif font-black text-xl sm:text-2xl text-stone-900 leading-snug group-hover:text-red-700 transition-colors mb-2">
                    {leadStory.title}
                  </h3>

                  <p className="text-stone-600 text-sm leading-relaxed line-clamp-3">
                    {leadStory.summary}
                  </p>
                </div>
              )}

              {/* Secondary Stories List */}
              <div className="md:col-span-5 flex flex-col divide-y divide-stone-200">
                {secondaryStories.map((story) => (
                  <article
                    key={story.id}
                    onClick={() => {
                      setActiveArticleId(story.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="py-3.5 first:pt-0 last:pb-0 group cursor-pointer transition-colors"
                  >
                    <div className="flex gap-3 items-start">
                      <div className="w-24 aspect-[4/3] bg-stone-100 rounded-xs overflow-hidden shrink-0 border border-stone-200">
                        <img
                          src={story.featuredImage}
                          alt={story.title}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[11px] text-stone-400 font-medium mb-1">
                          {story.publishedAt}
                        </div>
                        <h4 className="font-serif font-bold text-sm text-stone-900 leading-snug group-hover:text-red-700 transition-colors line-clamp-2">
                          {story.title}
                        </h4>
                      </div>
                    </div>
                  </article>
                ))}

                {/* If there are no secondary stories in mock, show additional related headlines */}
                {secondaryStories.length === 0 && (
                  <div className="py-4 text-xs text-stone-500 italic">
                    इस श्रेणी में और अधिक विश्लेषण शीघ्र आ रहे हैं।
                  </div>
                )}
              </div>
            </div>

            {/* In-feed ad banner after 2nd section */}
            {sectionIdx === 1 && inFeedAd && (
              <div className="mt-8 bg-stone-100 border border-stone-200 p-4 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-stone-200 rounded shrink-0 overflow-hidden">
                    <img
                      src={inFeedAd.imageUrl}
                      alt={inFeedAd.headline}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block">
                      प्रायोजित / SPONSORED
                    </span>
                    <h4 className="font-serif font-bold text-sm text-stone-900">{inFeedAd.headline}</h4>
                    <p className="text-xs text-stone-600 line-clamp-1">{inFeedAd.subtext}</p>
                  </div>
                </div>
                <a
                  href={inFeedAd.targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded hover:bg-stone-800 transition-colors whitespace-nowrap"
                >
                  {inFeedAd.callToAction}
                </a>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
};
