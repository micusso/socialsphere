import { useEffect, useCallback } from 'react';
import { X, Bookmark, BookmarkCheck, Share2, ExternalLink, TrendingUp } from 'lucide-react';
import type { Story } from '../types';
import { PLATFORM_MAP } from '../data/platforms';
import { fmtEngagement, getCategoryColor, getViralityColor } from './utils';
import { ViralityRing } from './ViralityRing';
import { showToast } from './Toast';

interface Props {
  story: Story;
  isSaved: boolean;
  onClose: () => void;
  onToggleSave: (id: number) => void;
}

export function StoryModal({ story, isSaved, onClose, onToggleSave }: Props) {
  const catColor = getCategoryColor(story.category);
  const viralColor = getViralityColor(story.virality);

  // Lock scroll & escape key
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handler); };
  }, [onClose]);

  const handleShare = useCallback(() => {
    const text = `${story.title}\n\n${story.summary.slice(0, 120)}…`;
    if (navigator.share) {
      navigator.share({ title: story.title, text, url: window.location.href }).catch(() => null);
    } else {
      navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard', '📋', 'success'));
    }
  }, [story]);

  const handleSave = () => {
    onToggleSave(story.id);
    showToast(isSaved ? 'Removed from saved' : 'Story saved!', isSaved ? '🗑️' : '🔖', 'success');
  };

  const totalEng = fmtEngagement(story.totalEngagement);

  return (
    <div
      className="fixed inset-0 z-[500] flex items-end sm:items-center justify-center p-0 sm:p-4 modal-overlay animate-fade-in"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label={story.title}
    >
      <div className="
        relative w-full sm:max-w-2xl max-h-[96vh] sm:max-h-[90vh]
        overflow-y-auto rounded-t-3xl sm:rounded-2xl
        bg-bg-raised border border-border-base shadow-modal
        animate-slide-up
      ">
        {/* Thumbnail */}
        <div className="relative h-48 sm:h-64 overflow-hidden rounded-t-3xl sm:rounded-t-2xl">
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover"
            onError={e => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${story.id}modal/720/320`; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-raised via-bg-raised/40 to-transparent" />

          {/* Close */}
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-bg-base/80 backdrop-blur-glass border border-border-base flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-bg-overlay transition-all"
          >
            <X size={16} />
          </button>

          {/* Breaking badge */}
          {story.breaking && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-rose/90 text-white text-xxs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse-dot" />
              Breaking
            </div>
          )}

          {/* Engagement banner */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 flex-wrap">
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-glass border border-border-base bg-bg-base/70"
              style={{ color: viralColor }}
            >
              <TrendingUp size={12} />
              Trending on {story.platforms.length} platforms · {totalEng} engagements
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 sm:px-6 pt-5 pb-6 space-y-5">
          {/* Category + time */}
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold uppercase tracking-widest" style={{ color: catColor }}>
              {story.category}
            </span>
            <span className="text-text-tertiary">·</span>
            <span className="text-text-tertiary">{story.timestamp}</span>
            {story.trending && (
              <>
                <span className="text-text-tertiary">·</span>
                <span className="font-semibold" style={{ color: viralColor }}>🔥 Trending</span>
              </>
            )}
          </div>

          {/* Title */}
          <h2 className="font-display font-bold text-h2 text-text-primary leading-tight">
            {story.title}
          </h2>

          {/* AI summary */}
          <div className="rounded-xl border border-accent-blue/20 bg-accent-blue/5 p-4 space-y-2">
            <div className="flex items-center gap-2 text-xxs font-bold uppercase tracking-widest text-accent-blue">
              <span>🤖</span> AI-Generated Summary
            </div>
            <p className="text-text-secondary text-sm leading-relaxed">{story.summary}</p>
          </div>

          {/* Virality + tags */}
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <ViralityRing score={story.virality} size={48} />
              <div>
                <div className="text-xxs font-bold uppercase tracking-widest text-text-tertiary mb-0.5">Virality Score</div>
                <div className="text-sm font-semibold" style={{ color: viralColor }}>{story.virality}/100</div>
              </div>
            </div>
            {story.tags && (
              <div className="flex gap-1.5 flex-wrap">
                {story.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 rounded-full bg-bg-overlay border border-border-subtle text-xs text-text-secondary">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Sources */}
          <div>
            <div className="text-xxs font-bold uppercase tracking-widest text-text-tertiary mb-3">
              All Coverage — {story.platforms.length} Sources
            </div>
            <div className="space-y-2">
              {story.platforms.map((src, i) => {
                const p = PLATFORM_MAP[src.platform];
                if (!p) return null;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl bg-bg-surface border border-border-subtle hover:border-border-base transition-all"
                  >
                    {/* Platform icon */}
                    <div
                      className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center text-base font-bold"
                      style={{ background: p.bgColor, color: p.color }}
                    >
                      {p.emoji}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-xs font-semibold" style={{ color: p.color }}>{p.name}</span>
                        <span className="text-xxs text-text-tertiary px-1.5 py-0.5 rounded bg-bg-overlay">{src.type}</span>
                        {src.author && (
                          <span className="text-xxs text-text-tertiary truncate">{src.authorHandle ?? src.author}</span>
                        )}
                      </div>
                      <p className="text-xs text-text-secondary truncate leading-relaxed">"{src.snippet}"</p>
                    </div>

                    {/* Engagement */}
                    <div className="flex-shrink-0 text-right">
                      <div className="text-sm font-bold text-accent-emerald">{fmtEngagement(src.engagement)}</div>
                      <div className="text-xxs text-text-tertiary">engagements</div>
                    </div>

                    {/* Link */}
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={e => e.stopPropagation()}
                      aria-label={`View on ${p.name}`}
                      className="flex-shrink-0 w-8 h-8 rounded-lg bg-bg-overlay border border-border-subtle flex items-center justify-center text-text-tertiary hover:text-accent-blue hover:border-accent-blue/40 transition-all"
                    >
                      <ExternalLink size={13} />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all border ${
                isSaved
                  ? 'bg-accent-amber/10 border-accent-amber/30 text-accent-amber'
                  : 'bg-bg-overlay border-border-base text-text-secondary hover:text-text-primary hover:border-border-strong'
              }`}
            >
              {isSaved ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}
              {isSaved ? 'Saved' : 'Save'}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-bg-overlay border border-border-base text-text-secondary hover:text-text-primary hover:border-border-strong transition-all"
            >
              <Share2 size={15} />
              Share
            </button>
            <button
              onClick={onClose}
              className="ml-auto flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-accent-blue/10 border border-accent-blue/30 text-accent-blue hover:bg-accent-blue/20 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
