import { X } from 'lucide-react';
import type { TabId, Category, PlatformId } from '../types';
import { Sidebar } from './Sidebar';

interface Props {
  open: boolean;
  onClose: () => void;
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

export function MobileSidebar({ open, onClose, ...rest }: Props) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 z-[201] w-72 animate-slide-in-right shadow-modal">
        <div className="absolute top-3 right-3 z-10">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-bg-overlay border border-border-base flex items-center justify-center text-text-secondary hover:text-text-primary"
            aria-label="Close menu"
          >
            <X size={14} />
          </button>
        </div>
        <div className="h-full">
          <Sidebar {...rest} />
        </div>
      </div>
    </>
  );
}
