import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Printer,
  Clock,
  User,
  MessageSquare,
  ThumbsUp,
  Bookmark,
  Check,
  Facebook,
  Twitter,
  Send,
  Eye,
  ChevronRight,
  PlayCircle,
} from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { Article } from '../types/news';

export const ArticleView: React.FC = () => {
  const {
    activeArticleId,
    setActiveArticleId,
    articles,
    videos,
    addComment,
    incrementShares,
    language,
    fontSize,
    setFontSize,
  } = useNews();

  const [copied, setCopied] = useState(false);
  const [commentName, setCommentName] = useState('');
  const [commentCity, setCommentCity] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  const article: Article | undefined = articles.find((a) => a.id === activeArticleId);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center">
        <h2 className="font-serif text-2xl font-bold mb-4">लेख नहीं मिला</h2>
        <button
          onClick={() => setActiveArticleId(null)}
          className="px-4 py-2 bg-stone-900 text-white rounded text-sm cursor-pointer"
        >
          मुख्य पृष्ठ पर लौटें
        </button>
      </div>
    );
  }

  // Related articles (same category, different id)
  const relatedArticles = articles
    .filter((a) => a.category === article.category && a.id !== article.id)
    .slice(0, 3);

  // Recommended videos
  const recommendedVideos = videos.slice(0, 2);

  // Social share triggers
  const articleUrl = typeof window !== 'undefined' ? window.location.href : 'https://dainikkhabar.news';
  const shareText = `${article.title} - दैनिक खबर`;

  const handleShareWhatsApp = () => {
    incrementShares(article.id);
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + articleUrl)}`, '_blank');
  };

  const handleShareTwitter = () => {
    incrementShares(article.id);
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(articleUrl)}`, '_blank');
  };

  const handleShareFacebook = () => {
    incrementShares(article.id);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(articleUrl);
    setCopied(true);
    incrementShares(article.id);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !commentName.trim()) return;

    addComment(article.id, {
      authorName: commentName,
      authorCity: commentCity || 'भारत',
      text: commentText,
    });

    setCommentText('');
    setCommentName('');
    setCommentCity('');
    setCommentSubmitted(true);
    setTimeout(() => setCommentSubmitted(false), 4000);
  };

  // Font size mapper class
  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'sm':
        return 'text-base leading-relaxed';
      case 'lg':
        return 'text-xl leading-loose';
      case 'xl':
        return 'text-2xl leading-loose';
      default:
        return 'text-lg leading-relaxed';
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* 1. TOP BREADCRUMB & BACK BUTTON */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200 text-xs text-stone-500 no-print">
        <button
          onClick={() => setActiveArticleId(null)}
          className="flex items-center gap-1.5 text-stone-700 hover:text-red-700 font-bold transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'hi' ? 'मुख्य पृष्ठ पर लौटें' : 'Back to Home'}</span>
        </button>

        <nav className="flex items-center gap-1.5" aria-label="ब्रेडक्रम्ब">
          <span>होम</span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="capitalize font-semibold text-red-600">{article.category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="truncate max-w-[180px] sm:max-w-xs">{article.slug}</span>
        </nav>
      </div>

      {/* 2. CATEGORY KICKER & HEADLINE */}
      <header className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
            {article.category === 'india' ? 'भारत' : article.category === 'world' ? 'दुनिया' : article.category === 'up' ? 'उत्तर प्रदेश' : 'समाचार'}
          </span>
          {article.isLeadStory && (
            <span className="text-xs font-bold text-stone-500">
              · विशेष संपादकीय
            </span>
          )}
        </div>

        <h1 className="font-serif font-black text-2xl sm:text-4xl lg:text-4xl text-stone-900 leading-tight tracking-tight mb-4 text-balance">
          {article.title}
        </h1>

        {article.subhead && (
          <p className="text-lg sm:text-xl text-stone-600 font-serif leading-relaxed mb-6 font-medium">
            {article.subhead}
          </p>
        )}

        {/* AUTHOR BYLINE & TIMESTAMPS */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3.5 border-y border-stone-200 text-xs text-stone-600">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden ring-1 ring-stone-300 shrink-0">
              {article.author.avatar ? (
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-bold text-stone-600">
                  <User className="w-5 h-5" />
                </div>
              )}
            </div>
            <div>
              <div className="font-bold text-stone-900 text-sm">{article.author.name}</div>
              <div className="text-[11px] text-stone-500">{article.author.role}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-stone-500">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>प्रकाशित: {article.publishedAt}</span>
            </div>
            {article.updatedAt && (
              <span className="hidden sm:inline">
                (अपडेट: {article.updatedAt})
              </span>
            )}
            <span className="font-mono text-stone-400">· {article.readTime}</span>
          </div>
        </div>

        {/* UTILITY BAR: Font Size & Share */}
        <div className="flex items-center justify-between py-2.5 text-xs no-print">
          {/* Font Controls */}
          <div className="flex items-center gap-2">
            <span className="text-stone-500 font-medium">फॉन्ट आकार:</span>
            <div className="flex items-center bg-stone-100 rounded border border-stone-200 p-0.5">
              <button
                onClick={() => setFontSize('sm')}
                className={`px-2 py-0.5 font-bold cursor-pointer rounded ${fontSize === 'sm' ? 'bg-white shadow-xs text-stone-900' : 'text-stone-600'}`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('base')}
                className={`px-2 py-0.5 font-bold cursor-pointer rounded ${fontSize === 'base' ? 'bg-white shadow-xs text-stone-900' : 'text-stone-600'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('lg')}
                className={`px-2 py-0.5 font-bold cursor-pointer rounded ${fontSize === 'lg' ? 'bg-white shadow-xs text-stone-900' : 'text-stone-600'}`}
              >
                A+
              </button>
            </div>
          </div>

          {/* Social Share & Print */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleShareWhatsApp}
              className="p-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded cursor-pointer transition-colors"
              title="व्हाट्सएप पर शेयर करें"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleShareTwitter}
              className="p-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded cursor-pointer transition-colors"
              title="X / ट्विटर पर शेयर करें"
            >
              <Twitter className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleShareFacebook}
              className="p-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded cursor-pointer transition-colors"
              title="फेसबुक पर शेयर करें"
            >
              <Facebook className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleCopyLink}
              className="flex items-center gap-1 px-2 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded border border-stone-200 cursor-pointer transition-colors font-medium text-[11px]"
              title="लिंक कॉपी करें"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'कॉपी हुआ!' : 'कॉपी लिंक'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded border border-stone-200 cursor-pointer transition-colors"
              title="प्रिंट करें"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* 3. FEATURED IMAGE WITH CAPTION */}
      <div className="mb-8">
        <div className="aspect-[16/9] w-full bg-stone-100 rounded-sm overflow-hidden border border-stone-200">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
        {article.imageCaption && (
          <figcaption className="text-xs text-stone-500 italic mt-2.5 px-1 border-l-2 border-stone-300 pl-2">
            {article.imageCaption}
          </figcaption>
        )}
      </div>

      {/* 4. MAIN ARTICLE PROSE */}
      <div className={`prose max-w-none text-stone-800 font-sans ${getFontSizeClass()}`}>
        <div
          dangerouslySetInnerHTML={{ __html: article.content }}
          className="space-y-4"
        />
      </div>

      {/* 5. ARTICLE TAGS */}
      {article.tags && article.tags.length > 0 && (
        <div className="mt-8 pt-6 border-t border-stone-200 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-stone-500">विषय / टैग:</span>
          {article.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs bg-stone-100 text-stone-700 px-2.5 py-1 rounded hover:bg-stone-200 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* 6. COMMENTS SECTION */}
      <section className="mt-12 pt-8 border-t-2 border-stone-900 no-print">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif font-black text-xl text-stone-900 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-red-600" />
            <span>पाठकों की प्रतिक्रियाएं ({article.comments?.length || 0})</span>
          </h3>
          <span className="text-xs text-stone-500">संपादकीय दिशानिर्देशों के अधीन</span>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleCommentSubmit} className="bg-stone-50 p-5 rounded-sm border border-stone-200 mb-8 space-y-3">
          <h4 className="font-serif font-bold text-sm text-stone-900">अपनी राय साझा करें:</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="आपका नाम *"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              required
              className="text-xs p-2.5 bg-white border border-stone-300 rounded focus:border-red-600 focus:outline-none"
            />
            <input
              type="text"
              placeholder="शहर (वैकल्पिक)"
              value={commentCity}
              onChange={(e) => setCommentCity(e.target.value)}
              className="text-xs p-2.5 bg-white border border-stone-300 rounded focus:border-red-600 focus:outline-none"
            />
          </div>

          <textarea
            placeholder="अपनी टिप्पणी यहां लिखें..."
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
            className="w-full text-xs p-2.5 bg-white border border-stone-300 rounded focus:border-red-600 focus:outline-none"
          ></textarea>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-stone-400">
              * अभद्र या भड़काऊ भाषा की अनुमति नहीं है।
            </span>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded cursor-pointer transition-colors"
            >
              टिप्पणी भेजें
            </button>
          </div>

          {commentSubmitted && (
            <div className="bg-emerald-100 text-emerald-800 text-xs p-2 rounded">
              आपकी टिप्पणी सफलतापूर्वक जोड़ दी गई है।
            </div>
          )}
        </form>

        {/* Existing Comments List */}
        <div className="space-y-4">
          {article.comments && article.comments.length > 0 ? (
            article.comments.map((comment) => (
              <div key={comment.id} className="p-4 bg-white rounded border border-stone-200">
                <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5">
                  <div className="font-bold text-stone-900">
                    {comment.authorName} {comment.authorCity && <span className="text-stone-400 font-normal">({comment.authorCity})</span>}
                  </div>
                  <span>{comment.createdAt}</span>
                </div>
                <p className="text-sm text-stone-700">{comment.text}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-xs text-stone-500">
              अभी तक कोई टिप्पणी नहीं है। पहली टिप्पणी आप करें!
            </div>
          )}
        </div>
      </section>

      {/* 7. RELATED STORIES & RECOMMENDED VIDEOS */}
      <section className="mt-14 pt-8 border-t border-stone-300 no-print">
        <h3 className="font-serif font-black text-xl text-stone-900 mb-6">
          इस श्रेणी से और प्रमुख खबरें
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {relatedArticles.map((rel) => (
            <div
              key={rel.id}
              onClick={() => {
                setActiveArticleId(rel.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="group cursor-pointer"
            >
              <div className="aspect-[16/10] bg-stone-100 rounded-xs overflow-hidden mb-2 border border-stone-200">
                <img
                  src={rel.featuredImage}
                  alt={rel.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <span className="text-[11px] text-stone-400 font-medium block mb-1">
                {rel.publishedAt}
              </span>
              <h4 className="font-serif font-bold text-sm text-stone-900 leading-snug group-hover:text-red-700 transition-colors line-clamp-2">
                {rel.title}
              </h4>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};
