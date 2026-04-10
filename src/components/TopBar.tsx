import { Search, SlidersHorizontal, Menu } from 'lucide-react';
import type { SortOrder } from '../types';
import { useSecondsAgo } from '../hooks/useTimer';

interface Props {
  searchQuery: string;
  sortOrder: SortOrder;
  lastUpdated: Date;
  onSearch: (q: string) => void;
  onSortChange: (s: SortOrder) => void;
  onMenuToggle: () => void;
}

const SORT_OPTIONS: { value: SortOrder; label: string }[] = [
  { value: 'virality',   label: '🔥 Virality'   },
  { value: 'engagement', label: '📊 Engagement'  },
  { value: 'latest',     label: '⚡ Latest'      },
];

export function TopBar({ searchQuery, sortOrder, lastUpdated, onSearch, onSortChange, onMenuToggle }: Props) {
  const ago = useSecondsAgo(lastUpdated);

  return (
    <header className="sticky top-0 z-40 flex items-center gap-3 px-4 sm:px-6 py-3 bg-bg-base/80 backdrop-blur-glass border-b border-border-subtle">
      {/* Mobile menu toggle */}
      <button
        className="sm:hidden w-9 h-9 rounded-xl bg-bg-surface border border-border-subtle flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
        onClick={onMenuToggle}
        aria-label="Toggle menu"
      >
        <Menu size={16} />
      </button>

      {/* Search */}
      <div className="relative flex-1 max-w-xl">
        <Search
          size={15}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-tertiary pointer-events-none"
        />
        <input
          type="search"
          value={searchQuery}
          onChange={e => onSearch(e.target.value)}
          placeholder="Search stories, categories, tags…"
          className="
            w-full pl-10 pr-4 py-2.5
            bg-bg-surface border border-border-subtle rounded-pill
            text-sm text-text-primary placeholder:text-text-tertiary
            focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/30
            transition-all
          "
          aria-label="Search stories"
        />
        {searchQuery && (
          <button
            onClick={() => onSearch('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary text-xs"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Sort */}
      <div className="relative flex items-center gap-1">
        <SlidersHorizontal size={14} className="text-text-tertiary" />
        <select
          value={sortOrder}
          onChange={e => onSortChange(e.target.value as SortOrder)}
          className="
            bg-bg-surface border border-border-subtle rounded-xl
            text-sm text-text-secondary pl-2 pr-6 py-2
            focus:outline-none focus:border-accent-blue/50
            cursor-pointer transition-all appearance-none
            hover:text-text-primary hover:border-border-base
          "
          aria-label="Sort order"
        >
          {SORT_OPTIONS.map(o => (
            <option key={o.value} value={o.value} style={{ background: '#111118' }}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {/* Live indicator + last updated */}
      <div className="hidden sm:flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-rose/10 border border-accent-rose/20 text-accent-rose text-xxs font-bold uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-rose animate-pulse-dot" />
          Live
        </div>
        <span className="text-xxs text-text-tertiary whitespace-nowrap">
          Updated {ago}
        </span>
      </div>
    </header>
  );
}
