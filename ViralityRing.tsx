import { getViralityColor } from './utils';

interface Props {
  score: number;
  size?: number;
}

export function ViralityRing({ score, size = 44 }: Props) {
  const color = getViralityColor(score);
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const fill = (score / 100) * circ;

  return (
    <div className="virality-ring" style={{ width: size, height: size }} title={`Virality: ${score}/100`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={3}
        />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none"
          stroke={color}
          strokeWidth={3}
          strokeDasharray={`${fill} ${circ}`}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 4px ${color})`, transition: 'stroke-dasharray 0.6s ease' }}
        />
      </svg>
      <span style={{
        position: 'absolute',
        fontSize: size < 40 ? '0.6rem' : '0.65rem',
        fontWeight: 700,
        color,
        fontFamily: 'Syne, sans-serif',
        letterSpacing: '-0.02em',
        lineHeight: 1,
      }}>
        {score}
      </span>
    </div>
  );
}
