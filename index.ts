export type Category =
  | 'all'
  | 'politics'
  | 'tech'
  | 'entertainment'
  | 'sports'
  | 'science'
  | 'business'
  | 'viral'
  | 'world';

export type PlatformId =
  | 'twitter'
  | 'instagram'
  | 'tiktok'
  | 'reddit'
  | 'youtube'
  | 'facebook'
  | 'threads'
  | 'bluesky';

export type SortOrder = 'virality' | 'engagement' | 'latest';
export type TabId = 'trending' | 'latest' | 'saved';

export interface Platform {
  id: PlatformId;
  name: string;
  shortName: string;
  color: string;
  bgColor: string;
  emoji: string;
}

export interface StorySource {
  platform: PlatformId;
  url: string;
  snippet: string;
  engagement: number;
  type: 'Post' | 'Video' | 'Thread' | 'Reel' | 'Photo' | 'Story' | 'Tweet';
  author?: string;
  authorHandle?: string;
}

export interface Story {
  id: number;
  title: string;
  summary: string;
  category: Category;
  image: string;
  virality: number;           // 0–100
  totalEngagement: number;
  platforms: StorySource[];
  timestamp: string;
  publishedAt: Date;
  trending: boolean;
  breaking?: boolean;
  isHero?: boolean;
  tags?: string[];
}

export interface AppState {
  activeTab: TabId;
  activeCategory: Category;
  activePlatforms: Set<PlatformId>;
  searchQuery: string;
  sortOrder: SortOrder;
  visibleCount: number;
  savedIds: Set<number>;
  stories: Story[];
  selectedStory: Story | null;
  isRefreshing: boolean;
  lastUpdated: Date;
  newStoriesCount: number;
}
