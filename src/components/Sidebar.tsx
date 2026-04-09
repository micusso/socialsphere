import type { ReactNode } from 'react';
import { RefreshCw, Bookmark, Flame, Zap, Globe } from 'lucide-react';
import type { TabId, Category, PlatformId } from '../types';
import { PLATFORMS } from '../data/platforms';
import { CATEGORY_LABELS } from './utils';

interface Props {
  activeTab: TabId;
  activeCategory: Category;
  activePlatforms: Set<PlatformId>;
  savedCount: number;
  isRefreshing: boolean;
  newStoriesCount: number;
  onTabChange: (t: TabId) => void;
  onCategoryChange: (c: Category) => void;
  onPlatformToggle: (p: PlatformId) => void;
  onRefresh: () => void;
  onClearNew: () => void;
}

const CATEGORIES: Category[] = ['all', 'politics', 'tech', 'entertainment', 'sports', 'science', 'business', 'viral', 'world'];

const TAB_ITEMS: { id: TabId; label: string; icon: ReactNode }[] = [
  { id: 'trending', label: 'Trending',  icon: <Flame size={15} /> },
  { id: 'latest',   label: 'Latest',    icon: <Zap size={15} /> },
  { id: 'saved',    label: 'Saved',     icon: <Bookmark size={15} /> },
];

export function Sidebar({
  activeTab, activeCategory, activePlatforms,
  savedCount, isRefreshing, newStoriesCount,
  onTabChange, onCategoryChange, onPlatformToggle, onRefresh, onClearNew,
}: Props) {
  return (
    <aside className="flex flex-col h-full bg-bg-surface border-r border-border-subtle overflow-y-auto hide-scrollbar">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-border-subtle">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-accent-violet flex items-center justify-center text-sm font-bold text-white shadow-glow-blue flex-shrink-0">
            🌐
          </div>
          <div>
            <div className="font-display font-bold text-base gradient-text-blue leading-none">SocialSphere</div>
            <div className="text-xxs text-text-tertiary mt-0.5">Social News, Unified</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-3 pt-4 pb-2">
        <div className="text-xxs font-bold uppercase tracking-widest text-text-tertiary px-2 mb-2">Discover</div>
        {TAB_ITEMS.map(t => (
          <button
            key={t.id}
            onClick={() => onTabChange(t.id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl mb-1 text-sm font-medium transition-all duration-150 text-left ${
              activeTab === t.id
                ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-overlay'
            }`}
          >
            <span className={activeTab === t.id ? 'text-accent-blue' : 'text-text-tertiary'}>{t.icon}</span>
            {t.label}
            {t.id === 'saved' && savedCount > 0 && (
              <span className="ml-auto text-xxs font-bold px-1.5 py-0.5 rounded-full bg-accent-amber/20 text-accent-amber">
                {savedCount}
              </span>
            )}
            {t.id === 'trending' && newStoriesCount > 0 && (
              <button
                onClick={e => { e.stopPropagation(); onClearNew(); }}
                className="ml-auto text-xxs font-bold px-1.5 py-0.5 rounded-full bg-accent-rose/20 text-accent-rose animate-badge-pop"
              >
                +{newStoriesCount} new
              </button>
            )}
          </button>
        ))}
      </div>

      {/* Categories */}
      <div className="px-3 pt-2 pb-2">
        <div className="text-xxs font-bold uppercase tracking-widest text-text-tertiary px-2 mb-2">Categories</div>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg mb-0.5 text-sm transition-all duration-150 text-left ${
              activeCategory === cat
                ? 'bg-bg-overlay text-text-primary font-medium'
                : 'text-text-secondary hover:text-text-primary hover:bg-bg-overlay'
            }`}
          >
            {activeCategory === cat && (
              <span className="w-1 h-1 rounded-full bg-accent-blue flex-shrink-0" />
            )}
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Platforms */}
      <div className="px-3 pt-2 pb-2">
        <div className="text-xxs font-bold uppercase tracking-widest text-text-tertiary px-2 mb-2">Platforms</div>
        {PLATFORMS.map(p => {
          const active = activePlatforms.has(p.id);
          return (
            <button
              key={p.id}
              onClick={() => onPlatformToggle(p.id)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg mb-0.5 text-sm transition-all duration-150 text-left ${
                active ? 'text-text-primary' : 'text-text-tertiary opacity-60 hover:opacity-80'
              } hover:bg-bg-overlay`}
            >
              <span
                className="w-2 h-2 rounded-full flex-shrink-0 transition-all"
                style={{ background: active ? p.color : 'rgba(255,255,255,0.15)' }}
              />
              <span className="truncate">{p.emoji} {p.shortName}</span>
              {active && <span className="ml-auto text-accent-blue text-xs">✓</span>}
            </button>
          );
        })}
      </div>

      {/* Refresh button */}
      <div className="mt-auto px-4 py-4 border-t border-border-subtle">
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-accent-blue to-accent-violet text-white text-sm font-semibold font-display hover:opacity-90 active:scale-98 transition-all disabled:opacity-60"
          aria-label="Refresh feed"
        >
          <RefreshCw
            size={14}
            className={isRefreshing ? 'animate-spin' : ''}
          />
          {isRefreshing ? 'Refreshing…' : 'Refresh Feed'}
        </button>
        <p className="text-center text-xxs text-text-tertiary mt-2">Auto-refreshes every 45s</p>
      </div>

      {/* Footer note */}
      <div className="px-4 pb-4">
        <div className="text-xxs text-text-tertiary leading-relaxed text-center opacity-60">
          <Globe size={10} className="inline mr-1" />
          Aggregates public social data
        </div>
      </div>
    </aside>
  );
}
