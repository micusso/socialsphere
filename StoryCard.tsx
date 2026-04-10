import { Bookmark, BookmarkCheck } from 'lucide-react';
import type { Story } from '../types';
import { fmtEngagement, getCategoryColor } from './utils';
import { PlatformBadge } from './PlatformBadge';
import { ViralityRing } from './ViralityRing';

interface Props {
  story: Story;
  isSaved: boolean;
  isNew?: boolean;
  onOpen: (story: Story) => void;
  onToggleSave: (id: number) => void;
}

export function StoryCard({ story, isSaved, isNew, onOpen, onToggleSave }: Props) {
  const catColor = getCategoryColor(story.category);
  const visiblePlatforms = story.platforms.slice(0, 4);
  const extraPlatforms = story.platforms.length - visiblePlatforms.length;

  return (
    <article
      className={`glass-card glass-card-hover rounded-card cursor-pointer group relative flex flex-col h-full ${isNew ? 'new-story-pulse' : ''}`}
      onClick={() => onOpen(story)}
      tabIndex={0}
      role="button"
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(story); } }}
      aria-label={`Read story: ${story.title}`}
    >
      {/* Thumbnail — 16:9 */}
      <div className="relative w-full overflow-hidden rounded-t-card" style={{ paddingBottom: '56.25%' }}>
        <img
          src={story.image}
          alt={story.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={e => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${story.id}card/640/360`; }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-bg-surface/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="text-xxs font-bold uppercase tracking-widest px-2 py-1 rounded-md"
            style={{
              backgroundColor: `${catColor}22`,
              color: catColor,
              border: `1px solid ${catColor}44`,
              backdropFilter: 'blur(8px)',
            }}
          >
            {story.category}
          </span>
        </div>

        {/* Breaking badge */}
        {story.breaking && (
          <div className="absolute top-3 left-[50%] -translate-x-1/2">
            <span className="flex items-center gap-1 text-xxs font-bold uppercase tracking-widest px-2 py-1 rounded-full bg-accent-rose/90 text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-dot" />
              Breaking
            </span>
          </div>
        )}

        {/* Save button */}
        <button
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-glass border transition-all duration-200
            opacity-0 group-hover:opacity-100 focus:opacity-100
            ${isSaved
              ? 'bg-accent-amber/20 border-accent-amber/40 text-accent-amber opacity-100'
              : 'bg-bg-base/70 border-border-base text-text-secondary hover:text-accent-amber hover:border-accent-amber/40'
            }
          `}
          onClick={e => { e.stopPropagation(); onToggleSave(story.id); }}
          aria-label={isSaved ? 'Remove from saved' : 'Save story'}
          tabIndex={-1}
        >
          {isSaved
            ? <BookmarkCheck size={13} className="text-accent-amber" />
            : <Bookmark size={13} />
          }
        </button>

        {/* Trending overlay badge */}
        {story.trending && (
          <div className="absolute bottom-3 left-3">
            <span className="text-xxs font-bold px-2 py-1 rounded-md bg-bg-base/70 backdrop-blur-glass border border-border-base text-accent-rose">
              🔥 Trending
            </span>
          </div>
        )}

        {/* Virality ring — bottom right */}
        <div className="absolute bottom-3 right-3">
          <ViralityRing score={story.virality} size={40} />
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title */}
        <h3 className="font-display font-semibold text-h4 text-text-primary leading-snug line-clamp-2 group-hover:text-accent-blue transition-colors duration-200">
          {story.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-text-secondary leading-relaxed line-clamp-2 flex-1">
          {story.summary}
        </p>

        {/* Platform badges */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {visiblePlatforms.map(src => (
            <PlatformBadge key={src.platform} platformId={src.platform} />
          ))}
          {extraPlatforms > 0 && (
            <span className="text-xxs text-text-tertiary font-medium px-1.5 py-0.5 rounded bg-bg-overlay border border-border-subtle">
              +{extraPlatforms}
            </span>
          )}
          <span className="ml-auto text-xxs text-text-tertiary">
            {story.platforms.length} platform{story.platforms.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-border-subtle">
          <span className="text-xs font-semibold text-accent-emerald">
            {fmtEngagement(story.totalEngagement)}
            <span className="text-text-tertiary font-normal ml-1">engagements</span>
          </span>
          <span className="text-xs text-text-tertiary">{story.timestamp}</span>
        </div>
      </div>
    </article>
  );
}
