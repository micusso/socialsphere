export function fmtEngagement(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000)     return `${(n / 1_000).toFixed(0)}K`;
  return n.toString();
}

export function getCategoryColor(cat: string): string {
  const map: Record<string, string> = {
    tech:          '#4f8dff',
    politics:      '#a78bfa',
    entertainment: '#f472b6',
    sports:        '#34d399',
    science:       '#22d3ee',
    business:      '#fbbf24',
    viral:         '#f87171',
    world:         '#c084fc',
  };
  return map[cat] ?? '#888';
}

export function getViralityColor(v: number): string {
  if (v >= 95) return '#ef4444';
  if (v >= 85) return '#f97316';
  if (v >= 75) return '#f59e0b';
  if (v >= 60) return '#10b981';
  return '#4f8dff';
}

export function cn(...classes: (string | false | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export const CATEGORY_LABELS: Record<string, string> = {
  all:           'All',
  politics:      '🏛 Politics',
  tech:          '💻 Tech',
  entertainment: '🎬 Entertainment',
  sports:        '⚽ Sports',
  science:       '🔬 Science',
  business:      '📈 Business',
  viral:         '🚀 Viral',
  world:         '🌍 World',
};
