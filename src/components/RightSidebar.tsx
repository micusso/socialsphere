import type { Story } from '../types';
import { PLATFORMS } from '../data/platforms';
import { BASE_STORIES } from '../data/stories';
import { fmtEngagement } from './utils';

interface Props {
  stories: Story[];
  onOpen: (story: Story) => void;
}

export function RightSidebar({ stories, onOpen }: Props) {
  const topStories = [...stories].sort((a, b) => b.virality - a.virality).slice(0, 5);
  const totalEng = BASE_STORIES.reduce((s, st) => s + st.totalEngagement, 0);

  // Platform activity
  const platformActivity = PLATFORMS.map(p => {
    const total = stories.reduce((sum, st) => {
      const src = st.platforms.find(s => s.platform === p.id);
      return sum + (src ? src.engagement : 0);
    }, 0);
    return { ...p, total };
  }).sort((a, b) => b.total - a.total);
  const maxActivity = platformActivity[0]?.total ?? 1;

  return (
    <aside className="h-full bg-bg-surface border-l border-border-subtle overflow-y-auto hide-scrollbar px-4 py-5 space-y-6">
      {/* Live Stats */}
      <div>
        <div className="text-xxs font-bold uppercase tracking-widest text-text-tertiary mb-3">📊 Live Stats</div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { val: stories.length.toString(), lbl: 'Stories' },
            { val: fmtEngagement(totalEng), lbl: 'Engagements' },
            { val: '8', lbl: 'Platforms' },
            { val: stories.filter(s => s.trending).length.toString(), lbl: 'Trending' },
          ].map(({ val, lbl }) => (
            <div key={lbl} className="bg-bg-raised rounded-xl p-3 border border-border-subtle">
              <div className="font-display font-bold text-lg text-accent-blue leading-none">{val}</div>
              <div className="text-xxs text-text-tertiary mt-1">{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Top 5 Trending */}
      <div>
        <div className="text-xxs font-bold uppercase tracking-widest text-text-tertiary mb-3">🔥 Top Stories</div>
        <div className="space-y-1">
          {topStories.map((story, i) => (
            <button
              key={story.id}
              onClick={() => onOpen(story)}
              className="w-full flex items-start gap-3 p-2.5 rounded-xl hover:bg-bg-overlay transition-colors text-left"
            >
              <span className="font-display font-bold text-xl text-bg-overlay mt-0.5 leading-none min-w-[20px]">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-text-primary line-clamp-2 leading-snug mb-1">
                  {story.title}
                </p>
                <p className="text-xxs text-text-tertiary">
                  {fmtEngagement(story.totalEngagement)} · {story.timestamp}
                </p>
              </div>
              <img
                src={story.image}
                alt=""
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0 opacity-80"
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Platform Activity */}
      <div>
        <div className="text-xxs font-bold uppercase tracking-widest text-text-tertiary mb-3">📡 Platform Activity</div>
        <div className="space-y-2.5">
          {platformActivity.map(p => (
            <div key={p.id}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-text-secondary">{p.emoji} {p.shortName}</span>
                <span className="text-xxs text-text-tertiary">{fmtEngagement(p.total)}</span>
              </div>
              <div className="h-1 rounded-full bg-bg-overlay overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${Math.round((p.total / maxActivity) * 100)}%`,
                    background: p.color,
                    boxShadow: `0 0 6px ${p.color}66`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div className="text-xxs text-text-tertiary text-center leading-relaxed pt-2 border-t border-border-subtle opacity-60">
        Mock data. Connect real APIs in{' '}
        <code className="font-mono bg-bg-overlay px-1 py-0.5 rounded">src/api/</code>
        {' '}to go live.
      </div>
    </aside>
  );
}
