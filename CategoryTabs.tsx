import type { TabId, Category } from '../types';
import { CATEGORY_LABELS } from './utils';

interface Props {
  activeTab: TabId;
  activeCategory: Category;
  onTabChange: (t: TabId) => void;
  onCategoryChange: (c: Category) => void;
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'trending', label: '🔥 Trending' },
  { id: 'latest',   label: '⚡ Latest'   },
  { id: 'saved',    label: '🔖 Saved'    },
];

const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];

export function CategoryTabs({ activeTab, activeCategory, onTabChange, onCategoryChange }: Props) {
  return (
    <div className="border-b border-border-subtle bg-bg-base/60 backdrop-blur-glass">
      {/* Tabs */}
      <div className="flex items-center gap-1 px-4 sm:px-6 pt-2 overflow-x-auto hide-scrollbar">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => onTabChange(t.id)}
            className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-200 border-b-2 -mb-px ${
              activeTab === t.id
                ? 'tab-active border-transparent'
                : 'border-transparent text-text-tertiary hover:text-text-secondary'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Category chips */}
      <div className="flex items-center gap-2 px-4 sm:px-6 py-3 overflow-x-auto hide-scrollbar">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 border ${
              activeCategory === cat
                ? 'chip-active'
                : 'border-border-subtle text-text-tertiary hover:text-text-secondary hover:border-border-base'
            }`}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>
    </div>
  );
}
