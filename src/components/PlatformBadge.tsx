import { PLATFORM_MAP } from '../data/platforms';
import type { PlatformId } from '../types';

interface Props {
  platformId: PlatformId;
  size?: 'sm' | 'md';
  showName?: boolean;
}

export function PlatformBadge({ platformId, size = 'sm', showName = false }: Props) {
  const p = PLATFORM_MAP[platformId];
  if (!p) return null;

  return (
    <span
      className="platform-badge"
      style={{
        backgroundColor: p.bgColor,
        color: p.color,
        fontSize: size === 'sm' ? '0.65rem' : '0.75rem',
        padding: size === 'sm' ? '2px 6px' : '4px 10px',
      }}
      title={p.name}
    >
      <span style={{ fontSize: size === 'sm' ? '0.7rem' : '0.85rem' }}>{p.emoji}</span>
      {showName && <span>{p.shortName}</span>}
    </span>
  );
}
