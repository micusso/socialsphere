import { useState, useEffect } from 'react';
import { useAppState } from './hooks/useAppState';
import { Sidebar } from './components/Sidebar';
import { MobileSidebar } from './components/MobileSidebar';
import { TopBar } from './components/TopBar';
import { CategoryTabs } from './components/CategoryTabs';
import { HeroCard } from './components/HeroCard';
import { StoryCard } from './components/StoryCard';
import { StoryModal } from './components/StoryModal';
import { RightSidebar } from './components/RightSidebar';
import { ToastContainer, showToast } from './components/Toast';
import type { Story } from './types';

export default function App() {
  const { state, actions } = useAppState();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevNewCount, setPrevNewCount] = useState(0);

  const filtered = actions.getFilteredStories();
  const visible   = filtered.slice(0, state.visibleCount);
  const heroStory = state.stories.find(s => s.isHero) ?? state.stories[0];

  // Show toast when new stories arrive
  useEffect(() => {
    if (state.newStoriesCount > prevNewCount && state.newStoriesCount > 0) {
      showToast(`${state.newStoriesCount} new ${state.newStoriesCount === 1 ? 'story' : 'stories'} added`, '⚡', 'new');
    }
    setPrevNewCount(state.newStoriesCount);
  }, [state.newStoriesCount, prevNewCount]);

  const handleOpen = (story: Story) => actions.setSelectedStory(story);
  const handleClose = () => actions.setSelectedStory(null);

  const handleToggleSave = (id: number) => {
    const wasSaved = state.savedIds.has(id);
    actions.toggleSave(id);
    showToast(wasSaved ? 'Removed from saved' : 'Story saved!', wasSaved ? '🗑️' : '🔖', 'success');
  };

  const handleModalToggleSave = (id: number) => {
    actions.toggleSave(id);
    // Toast is shown inside StoryModal
  };

  const sidebarProps = {
    activeTab:        state.activeTab,
    activeCategory:   state.activeCategory,
    activePlatforms:  state.activePlatforms,
    savedCount:       state.savedIds.size,
    isRefreshing:     state.isRefreshing,
    newStoriesCount:  state.newStoriesCount,
    onTabChange:      actions.setActiveTab,
    onCategoryChange: actions.setActiveCategory,
    onPlatformToggle: actions.togglePlatform,
    onRefresh:        actions.manualRefresh,
    onClearNew:       actions.clearNewCount,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-bg-base font-body">
      {/* ── Left Sidebar (desktop) ── */}
      <div className="hidden sm:flex flex-col w-56 lg:w-64 flex-shrink-0">
        <Sidebar {...sidebarProps} />
      </div>

      {/* ── Mobile Sidebar ── */}
      <MobileSidebar
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        {...sidebarProps}
      />

      {/* ── Main content ── */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* TopBar */}
        <TopBar
          searchQuery={state.searchQuery}
          sortOrder={state.sortOrder}
          lastUpdated={state.lastUpdated}
          onSearch={actions.setSearchQuery}
          onSortChange={actions.setSortOrder}
          onMenuToggle={() => setMobileMenuOpen(v => !v)}
        />

        {/* Scrollable feed */}
        <div className="flex-1 overflow-y-auto">
          {/* Category tabs */}
          <CategoryTabs
            activeTab={state.activeTab}
            activeCategory={state.activeCategory}
            onTabChange={actions.setActiveTab}
            onCategoryChange={actions.setActiveCategory}
          />

          <div className="px-4 sm:px-6 py-5 space-y-6 max-w-5xl mx-auto">
            {/* Hero (only on trending, all-category, no search) */}
            {state.activeTab === 'trending' &&
             state.activeCategory === 'all' &&
             !state.searchQuery &&
             heroStory && (
              <HeroCard
                story={heroStory}
                isSaved={state.savedIds.has(heroStory.id)}
                onOpen={handleOpen}
                onToggleSave={handleToggleSave}
              />
            )}

            {/* Search result label */}
            {state.searchQuery && (
              <div className="text-sm text-text-secondary animate-fade-in">
                <span className="font-medium text-text-primary">{filtered.length}</span> result{filtered.length !== 1 ? 's' : ''} for{' '}
                <span className="text-accent-blue">"{state.searchQuery}"</span>
              </div>
            )}

            {/* Saved tab banner */}
            {state.activeTab === 'saved' && (
              <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-accent-amber/5 border border-accent-amber/20 text-sm text-accent-amber animate-fade-in">
                <span>🔖 {state.savedIds.size} saved {state.savedIds.size === 1 ? 'story' : 'stories'}</span>
                {state.savedIds.size > 0 && (
                  <button
                    onClick={() => { [...state.savedIds].forEach(id => actions.toggleSave(id)); showToast('All saves cleared', '🗑️'); }}
                    className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>
            )}

            {/* Grid */}
            {visible.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {visible.map((story, i) => (
                  <div
                    key={story.id}
                    className="animate-slide-up"
                    style={{ animationDelay: `${Math.min(i * 40, 200)}ms` }}
                  >
                    <StoryCard
                      story={story}
                      isSaved={state.savedIds.has(story.id)}
                      isNew={(story as Story & { isNew?: boolean }).isNew}
                      onOpen={handleOpen}
                      onToggleSave={handleToggleSave}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center animate-fade-in">
                <div className="text-5xl">{state.activeTab === 'saved' ? '🔖' : '🔍'}</div>
                <div>
                  <p className="font-display font-semibold text-lg text-text-primary mb-1">
                    {state.activeTab === 'saved' ? 'No saved stories' : 'No stories found'}
                  </p>
                  <p className="text-sm text-text-tertiary">
                    {state.activeTab === 'saved'
                      ? 'Bookmark stories to see them here.'
                      : 'Try a different search term or clear your filters.'}
                  </p>
                </div>
                {state.searchQuery && (
                  <button
                    onClick={() => actions.setSearchQuery('')}
                    className="px-4 py-2 rounded-xl bg-accent-blue/10 border border-accent-blue/30 text-sm text-accent-blue hover:bg-accent-blue/20 transition-all"
                  >
                    Clear search
                  </button>
                )}
              </div>
            )}

            {/* Load more */}
            {visible.length < filtered.length && (
              <div className="flex justify-center pt-2 pb-6">
                <button
                  onClick={actions.loadMore}
                  className="px-6 py-3 rounded-pill bg-bg-surface border border-border-base text-sm font-semibold text-text-secondary hover:text-text-primary hover:border-border-strong transition-all hover:shadow-card"
                >
                  Load {Math.min(6, filtered.length - visible.length)} more stories ↓
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ── Right Sidebar (large screens) ── */}
      <div className="hidden lg:flex flex-col w-64 xl:w-72 flex-shrink-0">
        <RightSidebar stories={state.stories} onOpen={handleOpen} />
      </div>

      {/* ── Modal ── */}
      {state.selectedStory && (
        <StoryModal
          story={state.selectedStory}
          isSaved={state.savedIds.has(state.selectedStory.id)}
          onClose={handleClose}
          onToggleSave={handleModalToggleSave}
        />
      )}

      {/* ── Toast notifications ── */}
      <ToastContainer />
    </div>
  );
}
