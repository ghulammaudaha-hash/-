export type CategoryId = 
  | 'top'
  | 'india'
  | 'world'
  | 'up'
  | 'politics'
  | 'business'
  | 'sports'
  | 'entertainment'
  | 'tech'
  | 'health'
  | 'education'
  | 'lifestyle'
  | 'video'
  | 'photo'
  | 'live';

export interface CategoryInfo {
  id: CategoryId;
  nameHi: string;
  nameEn: string;
  slug: string;
  color?: string;
}

export interface Comment {
  id: string;
  authorName: string;
  authorCity?: string;
  text: string;
  createdAt: string;
  likes: number;
}

export interface Article {
  id: string;
  title: string;
  titleEn?: string;
  subhead?: string;
  slug: string;
  category: CategoryId;
  summary: string;
  content: string;
  featuredImage: string;
  imageCaption?: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  views: number;
  shares: number;
  isHero?: boolean;
  isLeadStory?: boolean;
  isBreaking?: boolean;
  isLive?: boolean;
  isTrending?: boolean;
  tags: string[];
  readTime: string;
  comments: Comment[];
  status: 'published' | 'draft' | 'scheduled';
  seoTitle?: string;
  seoDescription?: string;
}

export interface BreakingNewsItem {
  id: string;
  textHi: string;
  textEn?: string;
  url?: string;
  articleId?: string;
  timestamp: string;
  isUrgent: boolean;
  active: boolean;
}

export interface VideoItem {
  id: string;
  title: string;
  category: CategoryId;
  duration: string;
  videoUrl: string;
  thumbnailUrl: string;
  publishedAt: string;
  views: number;
  description: string;
  isHero?: boolean;
  authorName: string;
  tags: string[];
}

export interface PhotoStoryItem {
  url: string;
  caption: string;
  credit?: string;
}

export interface PhotoStory {
  id: string;
  title: string;
  category: CategoryId;
  publishedAt: string;
  author: string;
  coverImage: string;
  description: string;
  images: PhotoStoryItem[];
  views: number;
}

export interface LiveBlogEntry {
  id: string;
  timestamp: string;
  timeDisplay: string;
  title: string;
  content: string;
  isUrgent: boolean;
  author: string;
  image?: string;
}

export interface SportsScore {
  id: string;
  tournament: string;
  matchType: string;
  team1: {
    name: string;
    score: string;
    overs?: string;
    flag?: string;
  };
  team2: {
    name: string;
    score: string;
    overs?: string;
    flag?: string;
  };
  status: string;
  highlightText: string;
  isLive: boolean;
}

export interface Advertisement {
  id: string;
  position: 'header' | 'hero' | 'in-feed' | 'sidebar' | 'article' | 'footer';
  enabled: boolean;
  sponsorName: string;
  headline: string;
  subtext: string;
  imageUrl: string;
  targetUrl: string;
  callToAction: string;
}

export interface SiteSettings {
  brandNameHi: string;
  brandNameEn: string;
  taglineHi: string;
  taglineEn: string;
  logoUrl?: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    twitter: string;
    facebook: string;
    youtube: string;
    whatsapp: string;
    telegram: string;
    instagram: string;
  };
  adsEnabled: boolean;
  breakingNewsEnabled: boolean;
}

export type AdminRole = 'super_admin' | 'editor' | 'reporter';

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: AdminRole;
  avatar: string;
}
