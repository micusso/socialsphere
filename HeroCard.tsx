import { TrendingUp, Clock, Bookmark, BookmarkCheck } from 'lucide-react';
import type { Story } from '../types';
import { fmtEngagement, getCategoryColor } from './utils';
import { PlatformBadge } from './PlatformBadge';
import { ViralityRing } from './ViralityRing';

interface Props {
  story: Story;
  isSaved: boolean;
  onOpen: (story: Story) => void;
  onToggleSave: (id: number) => void;
}

export function HeroCard({ story, isSaved, onOpen, onToggleSave }: Props) {
  const catColor = getCategoryColor(story.category);

  return (
    <article
      className="hero-card relative w-full overflow-hidden rounded-2xl cursor-pointer group animate-fade-in"
      style={{ minHeight: 420 }}
      onClick={() => onOpen(story)}
      tabIndex={0}
      role="button"
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen(story); } }}
      aria-label={`Top story: ${story.title}`}
    >
      {/* Background image */}
      <img
        src={story.image}
        alt={story.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        onError={e => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${story.id}hero/1200/600`; }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-bg-base via-bg-base/60 to-bg-base/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-bg-base/80 via-transparent to-transparent" />

      {/* Top badges */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        {/* Live pulsing badge */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent-rose/90 backdrop-blur-glass border border-accent-rose/40 text-white text-xxs font-bold uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse-dot live-ring" />
          Live
        </div>
        <div
          className="px-2.5 py-1 rounded-full text-xxs font-bold uppercase tracking-widest backdrop-blur-glass border"
          style={{ backgroundColor: `${catColor}22`, color: catColor, borderColor: `${catColor}44` }}
        >
          {story.category}
        </div>
        {story.breaking && (
          <div className="px-2.5 py-1 rounded-full text-xxs font-bold uppercase tracking-widest bg-accent-amber/80 backdrop-blur-glass text-bg-base">
            Breaking
          </div>
        )}
      </div>

      {/* Save button */}
      <button
        className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-glass border transition-all duration-200
          ${isSaved
            ? 'bg-accent-amber/20 border-accent-amber/40 text-accent-amber'
            : 'bg-bg-base/50 border-border-base text-text-secondary hover:text-accent-amber hover:border-accent-amber/40'
          }
        `}
        onClick={e => { e.stopPropagation(); onToggleSave(story.id); }}
        aria-label={isSaved ? 'Remove from saved' : 'Save story'}
      >
        {isSaved ? <BookmarkCheck size={16} className="text-accent-amber" /> : <Bookmark size={16} />}
      </button>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 space-y-4">
        {/* Title */}
        <h2 className="font-display font-bold text-hero text-text-primary leading-tight max-w-3xl drop-shadow-lg">
          {story.title}
        </h2>

        {/* Summary */}
        <p className="text-body text-text-primary/80 max-w-2xl leading-relaxed line-clamp-2 drop-shadow">
          {story.summary}
        </p>

        {/* Meta row */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Platform badges */}
          <div className="flex items-center gap-1.5">
            {story.platforms.slice(0, 5).map(src => (
              <PlatformBadge key={src.platform} platformId={src.platform} size="md" />
            ))}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm text-text-primary/70">
            <span className="flex items-center gap-1.5">
              <TrendingUp size={14} className="text-accent-emerald" />
              <strong className="text-text-primary">{story.platforms.length} platforms</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-accent-emerald font-bold">{fmtEngagement(story.totalEngagement)}</span>
              <span>engagements</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={13} />
              {story.timestamp}
            </span>
          </div>

          {/* Virality ring */}
          <div className="ml-auto">
            <ViralityRing score={story.virality} size={52} />
          </div>
        </div>
      </div>
    </article>
  );
}
