import { useState, useCallback, useEffect } from 'react';
import type { Story, AppState, TabId, Category, PlatformId, SortOrder } from '../types';
import { BASE_STORIES, REFRESH_STORIES } from '../data/stories';
import { PLATFORMS } from '../data/platforms';

function loadSaved(): Set<number> {
  try {
    const raw = localStorage.getItem('ss_saved_v2');
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as number[]);
  } catch {
    return new Set();
  }
}

function persistSaved(ids: Set<number>): void {
  try {
    localStorage.setItem('ss_saved_v2', JSON.stringify([...ids]));
  } catch { /* ignore */ }
}

const ALL_PLATFORMS = new Set(PLATFORMS.map(p => p.id as PlatformId));

export function useAppState() {
  const [stories, setStories] = useState<Story[]>([...BASE_STORIES]);
  const [activeTab, setActiveTab] = useState<TabId>('trending');
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [activePlatforms, setActivePlatforms] = useState<Set<PlatformId>>(new Set(ALL_PLATFORMS));
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('virality');
  const [visibleCount, setVisibleCount] = useState(9);
  const [savedIds, setSavedIds] = useState<Set<number>>(loadSaved);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [newStoriesCount, setNewStoriesCount] = useState(0);
  const [refreshPoolIndex, setRefreshPoolIndex] = useState(0);

  // Persist saved
  useEffect(() => {
    persistSaved(savedIds);
  }, [savedIds]);

  // Auto-refresh every 45 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      triggerAutoRefresh();
    }, 45_000);
    return () => clearInterval(interval);
  }, [refreshPoolIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const triggerAutoRefresh = useCallback(() => {
    if (refreshPoolIndex >= REFRESH_STORIES.length) return;
    const batch = REFRESH_STORIES.slice(refreshPoolIndex, refreshPoolIndex + 1);
    if (batch.length === 0) return;
    setRefreshPoolIndex(prev => prev + 1);
    setStories(prev => {
      const existing = new Set(prev.map(s => s.id));
      const toAdd = batch.filter(s => !existing.has(s.id));
      return toAdd.length > 0 ? [...toAdd, ...prev] : prev;
    });
    setNewStoriesCount(prev => prev + batch.length);
    setLastUpdated(new Date());
  }, [refreshPoolIndex]);

  const manualRefresh = useCallback(() => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setTimeout(() => {
      triggerAutoRefresh();
      setIsRefreshing(false);
    }, 1200);
  }, [isRefreshing, triggerAutoRefresh]);

  const clearNewCount = useCallback(() => {
    setNewStoriesCount(0);
  }, []);

  const getFilteredStories = useCallback((): Story[] => {
    let result = [...stories];

    if (activeTab === 'saved') {
      result = result.filter(s => savedIds.has(s.id));
    } else if (activeTab === 'latest') {
      result = result.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
    }

    if (activeCategory !== 'all') {
      result = result.filter(s => s.category === activeCategory);
    }

    if (activePlatforms.size < ALL_PLATFORMS.size) {
      result = result.filter(s =>
        s.platforms.some(p => activePlatforms.has(p.platform))
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(s =>
        s.title.toLowerCase().includes(q) ||
        s.summary.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        (s.tags ?? []).some(t => t.toLowerCase().includes(q))
      );
    }

    if (sortOrder === 'virality') {
      result.sort((a, b) => b.virality - a.virality);
    } else if (sortOrder === 'engagement') {
      result.sort((a, b) => b.totalEngagement - a.totalEngagement);
    } else if (sortOrder === 'latest') {
      result.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
    }

    return result;
  }, [stories, activeTab, activeCategory, activePlatforms, searchQuery, sortOrder, savedIds]);

  const toggleSave = useCallback((id: number) => {
    setSavedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const togglePlatform = useCallback((id: PlatformId) => {
    setActivePlatforms(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        if (next.size <= 1) return prev; // keep at least one
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    setVisibleCount(9);
  }, []);

  const state: AppState = {
    activeTab,
    activeCategory,
    activePlatforms,
    searchQuery,
    sortOrder,
    visibleCount,
    savedIds,
    stories,
    selectedStory,
    isRefreshing,
    lastUpdated,
    newStoriesCount,
  };

  const actions = {
    setActiveTab: (tab: TabId) => { setActiveTab(tab); setVisibleCount(9); },
    setActiveCategory: (cat: Category) => { setActiveCategory(cat); setVisibleCount(9); },
    togglePlatform,
    setSearchQuery: (q: string) => { setSearchQuery(q); setVisibleCount(9); },
    setSortOrder: (s: SortOrder) => { setSortOrder(s); },
    loadMore: () => setVisibleCount(prev => prev + 6),
    toggleSave,
    setSelectedStory,
    manualRefresh,
    clearNewCount,
    getFilteredStories,
  };

  return { state, actions };
}
