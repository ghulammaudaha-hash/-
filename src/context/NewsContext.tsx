import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Article,
  BreakingNewsItem,
  VideoItem,
  PhotoStory,
  LiveBlogEntry,
  SportsScore,
  Advertisement,
  SiteSettings,
  CategoryId,
  AdminUser,
  AdminRole,
  Comment,
} from '../types/news';
import {
  INITIAL_ARTICLES,
  INITIAL_BREAKING_NEWS,
  INITIAL_VIDEOS,
  INITIAL_PHOTO_STORIES,
  INITIAL_LIVE_UPDATES,
  INITIAL_SPORTS_SCORE,
  INITIAL_ADVERTISEMENTS,
  INITIAL_SITE_SETTINGS,
  INITIAL_ADMIN_USERS,
} from '../data/initialData';

interface NewsContextType {
  // Data
  articles: Article[];
  breakingNews: BreakingNewsItem[];
  videos: VideoItem[];
  photoStories: PhotoStory[];
  liveUpdates: LiveBlogEntry[];
  sportsScore: SportsScore;
  advertisements: Advertisement[];
  siteSettings: SiteSettings;
  
  // Navigation & UI states
  language: 'hi' | 'en';
  setLanguage: (lang: 'hi' | 'en') => void;
  selectedCategory: CategoryId;
  setSelectedCategory: (cat: CategoryId) => void;
  activeArticleId: string | null;
  setActiveArticleId: (id: string | null) => void;
  activePhotoStoryId: string | null;
  setActivePhotoStoryId: (id: string | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  setFontSize: (size: 'sm' | 'base' | 'lg' | 'xl') => void;
  activeModal: 'about' | 'editorial' | 'privacy' | 'terms' | 'advertise' | 'sitemap' | null;
  setActiveModal: (modal: 'about' | 'editorial' | 'privacy' | 'terms' | 'advertise' | 'sitemap' | null) => void;
  
  // Admin & CMS
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  adminUser: AdminUser | null;
  loginAdmin: (username: string, role?: AdminRole) => boolean;
  logoutAdmin: () => void;
  
  // Article CRUD
  addArticle: (article: Omit<Article, 'id' | 'views' | 'shares' | 'comments'>) => void;
  updateArticle: (id: string, updates: Partial<Article>) => void;
  deleteArticle: (id: string) => void;
  addComment: (articleId: string, comment: Omit<Comment, 'id' | 'createdAt' | 'likes'>) => void;
  incrementViews: (articleId: string) => void;
  incrementShares: (articleId: string) => void;

  // Breaking News CRUD
  addBreakingNews: (item: Omit<BreakingNewsItem, 'id'>) => void;
  updateBreakingNews: (id: string, updates: Partial<BreakingNewsItem>) => void;
  deleteBreakingNews: (id: string) => void;

  // Video CRUD
  addVideo: (video: Omit<VideoItem, 'id' | 'views'>) => void;
  deleteVideo: (id: string) => void;

  // Photo story CRUD
  addPhotoStory: (story: Omit<PhotoStory, 'id' | 'views'>) => void;
  deletePhotoStory: (id: string) => void;

  // Live Blog CRUD
  addLiveUpdate: (entry: Omit<LiveBlogEntry, 'id' | 'timestamp'>) => void;
  deleteLiveUpdate: (id: string) => void;

  // Ads & Settings
  toggleAd: (id: string) => void;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  resetToDefaults: () => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load local storage states with safe fallback
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem('samvad_articles');
      return saved ? JSON.parse(saved) : INITIAL_ARTICLES;
    } catch {
      return INITIAL_ARTICLES;
    }
  });

  const [breakingNews, setBreakingNews] = useState<BreakingNewsItem[]>(() => {
    try {
      const saved = localStorage.getItem('samvad_breaking_news');
      return saved ? JSON.parse(saved) : INITIAL_BREAKING_NEWS;
    } catch {
      return INITIAL_BREAKING_NEWS;
    }
  });

  const [videos, setVideos] = useState<VideoItem[]>(() => {
    try {
      const saved = localStorage.getItem('samvad_videos');
      return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
    } catch {
      return INITIAL_VIDEOS;
    }
  });

  const [photoStories, setPhotoStories] = useState<PhotoStory[]>(() => {
    try {
      const saved = localStorage.getItem('samvad_photos');
      return saved ? JSON.parse(saved) : INITIAL_PHOTO_STORIES;
    } catch {
      return INITIAL_PHOTO_STORIES;
    }
  });

  const [liveUpdates, setLiveUpdates] = useState<LiveBlogEntry[]>(() => {
    try {
      const saved = localStorage.getItem('samvad_live_updates');
      return saved ? JSON.parse(saved) : INITIAL_LIVE_UPDATES;
    } catch {
      return INITIAL_LIVE_UPDATES;
    }
  });

  const [sportsScore] = useState<SportsScore>(INITIAL_SPORTS_SCORE);

  const [advertisements, setAdvertisements] = useState<Advertisement[]>(() => {
    try {
      const saved = localStorage.getItem('samvad_ads');
      return saved ? JSON.parse(saved) : INITIAL_ADVERTISEMENTS;
    } catch {
      return INITIAL_ADVERTISEMENTS;
    }
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem('samvad_settings') || localStorage.getItem('khabar_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.brandNameHi === 'दैनिक संवाद') {
          parsed.brandNameHi = 'दैनिक खबर';
          parsed.brandNameEn = 'Dainik Khabar';
          parsed.contactEmail = 'editor@dainikkhabar.news';
          parsed.address = 'खबर भवन, 14 संसद मार्ग, नई दिल्ली 110001';
        }
        return parsed;
      }
      return INITIAL_SITE_SETTINGS;
    } catch {
      return INITIAL_SITE_SETTINGS;
    }
  });

  // UI States
  const [language, setLanguage] = useState<'hi' | 'en'>('hi');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('top');
  const [activeArticleId, setActiveArticleId] = useState<string | null>(null);
  const [activePhotoStoryId, setActivePhotoStoryId] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState<'sm' | 'base' | 'lg' | 'xl'>('base');
  const [activeModal, setActiveModal] = useState<'about' | 'editorial' | 'privacy' | 'terms' | 'advertise' | 'sitemap' | null>(null);
  
  // Admin Portal State
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem('samvad_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Persist changes
  useEffect(() => {
    localStorage.setItem('samvad_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('samvad_breaking_news', JSON.stringify(breakingNews));
  }, [breakingNews]);

  useEffect(() => {
    localStorage.setItem('samvad_videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('samvad_photos', JSON.stringify(photoStories));
  }, [photoStories]);

  useEffect(() => {
    localStorage.setItem('samvad_live_updates', JSON.stringify(liveUpdates));
  }, [liveUpdates]);

  useEffect(() => {
    localStorage.setItem('samvad_ads', JSON.stringify(advertisements));
  }, [advertisements]);

  useEffect(() => {
    localStorage.setItem('samvad_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  // Article handlers
  const addArticle = (data: Omit<Article, 'id' | 'views' | 'shares' | 'comments'>) => {
    const newArt: Article = {
      ...data,
      id: `art-${Date.now()}`,
      views: 1,
      shares: 0,
      comments: [],
    };
    setArticles((prev) => [newArt, ...prev]);
  };

  const updateArticle = (id: string, updates: Partial<Article>) => {
    setArticles((prev) =>
      prev.map((art) => (art.id === id ? { ...art, ...updates, updatedAt: 'अभी-अभी' } : art))
    );
  };

  const deleteArticle = (id: string) => {
    setArticles((prev) => prev.filter((art) => art.id !== id));
    if (activeArticleId === id) {
      setActiveArticleId(null);
    }
  };

  const addComment = (articleId: string, commentData: Omit<Comment, 'id' | 'createdAt' | 'likes'>) => {
    const newComment: Comment = {
      ...commentData,
      id: `c-${Date.now()}`,
      createdAt: 'अभी-अभी',
      likes: 0,
    };
    setArticles((prev) =>
      prev.map((art) =>
        art.id === articleId
          ? { ...art, comments: [newComment, ...(art.comments || [])] }
          : art
      )
    );
  };

  const incrementViews = (articleId: string) => {
    setArticles((prev) =>
      prev.map((art) => (art.id === articleId ? { ...art, views: art.views + 1 } : art))
    );
  };

  const incrementShares = (articleId: string) => {
    setArticles((prev) =>
      prev.map((art) => (art.id === articleId ? { ...art, shares: art.shares + 1 } : art))
    );
  };

  // Breaking news handlers
  const addBreakingNews = (item: Omit<BreakingNewsItem, 'id'>) => {
    const newItem: BreakingNewsItem = {
      ...item,
      id: `bn-${Date.now()}`,
    };
    setBreakingNews((prev) => [newItem, ...prev]);
  };

  const updateBreakingNews = (id: string, updates: Partial<BreakingNewsItem>) => {
    setBreakingNews((prev) =>
      prev.map((bn) => (bn.id === id ? { ...bn, ...updates } : bn))
    );
  };

  const deleteBreakingNews = (id: string) => {
    setBreakingNews((prev) => prev.filter((bn) => bn.id !== id));
  };

  // Video handlers
  const addVideo = (videoData: Omit<VideoItem, 'id' | 'views'>) => {
    const newVid: VideoItem = {
      ...videoData,
      id: `vid-${Date.now()}`,
      views: 1,
    };
    setVideos((prev) => [newVid, ...prev]);
  };

  const deleteVideo = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  // Photo handlers
  const addPhotoStory = (storyData: Omit<PhotoStory, 'id' | 'views'>) => {
    const newStory: PhotoStory = {
      ...storyData,
      id: `photo-${Date.now()}`,
      views: 1,
    };
    setPhotoStories((prev) => [newStory, ...prev]);
  };

  const deletePhotoStory = (id: string) => {
    setPhotoStories((prev) => prev.filter((p) => p.id !== id));
  };

  // Live blog handlers
  const addLiveUpdate = (entryData: Omit<LiveBlogEntry, 'id' | 'timestamp'>) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' });
    const newEntry: LiveBlogEntry = {
      ...entryData,
      id: `live-${Date.now()}`,
      timestamp: now.toISOString(),
      timeDisplay: timeStr,
    };
    setLiveUpdates((prev) => [newEntry, ...prev]);
  };

  const deleteLiveUpdate = (id: string) => {
    setLiveUpdates((prev) => prev.filter((l) => l.id !== id));
  };

  // Ads & Settings
  const toggleAd = (id: string) => {
    setAdvertisements((prev) =>
      prev.map((ad) => (ad.id === id ? { ...ad, enabled: !ad.enabled } : ad))
    );
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSiteSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetToDefaults = () => {
    setArticles(INITIAL_ARTICLES);
    setBreakingNews(INITIAL_BREAKING_NEWS);
    setVideos(INITIAL_VIDEOS);
    setPhotoStories(INITIAL_PHOTO_STORIES);
    setLiveUpdates(INITIAL_LIVE_UPDATES);
    setAdvertisements(INITIAL_ADVERTISEMENTS);
    setSiteSettings(INITIAL_SITE_SETTINGS);
    localStorage.clear();
  };

  // Admin auth
  const loginAdmin = (username: string, role: AdminRole = 'super_admin') => {
    const found = INITIAL_ADMIN_USERS.find((u) => u.username.toLowerCase() === username.toLowerCase());
    const user: AdminUser = found || {
      id: `adm-${Date.now()}`,
      username,
      name: username === 'admin' ? 'राजेश माथुर (संपादक)' : username,
      role,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
    };
    setAdminUser(user);
    localStorage.setItem('samvad_admin_user', JSON.stringify(user));
    return true;
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    localStorage.removeItem('samvad_admin_user');
  };

  return (
    <NewsContext.Provider
      value={{
        articles,
        breakingNews,
        videos,
        photoStories,
        liveUpdates,
        sportsScore,
        advertisements,
        siteSettings,
        language,
        setLanguage,
        selectedCategory,
        setSelectedCategory,
        activeArticleId,
        setActiveArticleId,
        activePhotoStoryId,
        setActivePhotoStoryId,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        fontSize,
        setFontSize,
        activeModal,
        setActiveModal,
        isAdminOpen,
        setIsAdminOpen,
        adminUser,
        loginAdmin,
        logoutAdmin,
        addArticle,
        updateArticle,
        deleteArticle,
        addComment,
        incrementViews,
        incrementShares,
        addBreakingNews,
        updateBreakingNews,
        deleteBreakingNews,
        addVideo,
        deleteVideo,
        addPhotoStory,
        deletePhotoStory,
        addLiveUpdate,
        deleteLiveUpdate,
        toggleAd,
        updateSettings,
        resetToDefaults,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = (): NewsContextType => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
};
