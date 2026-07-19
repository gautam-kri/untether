import { IllustrationFrame, Rect, Line, Polyline } from './Illustration';

interface Stage {
  label: string;
  sub?: string;
  accent?: boolean;
}

const STAGES: Stage[] = [
  { label: 'RAW INPUT' },
  { label: 'OBSERVATIONS' },
  { label: 'INFERENCES' },
  { label: 'CLAIMS', sub: 'CONFIDENCE · STATUS', accent: true },
  { label: 'RELATIONSHIPS' },
  { label: 'LIFE EPISODES' },
  { label: 'LIVING PROFILE' },
];

const W = 148; // box width
const H = 52; // box height
const G = 22; // gap between boxes
const X0 = 12;
const CY = 66; // vertical centre of the row

/**
 * Horizontal memory pipeline in the site's line-art style:
 * raw input → observations → inferences → evidence-gated claims → relationships
 * → life episodes → living profile. Scales responsively inside its container.
 */
export default function MemoryPipelineIllustration({
  className,
  style,
  decorative,
}: {
  className?: string;
  style?: React.CSSProperties;
  decorative?: boolean;
}) {
  const totalW = X0 * 2 + STAGES.length * W + (STAGES.length - 1) * G;
  const top = CY - H / 2;

  return (
    <IllustrationFrame
      viewBox={`0 0 ${totalW} 128`}
      title="How raw input becomes evidence-gated, permanent memory"
      decorative={decorative}
      className={className}
      style={style}
      preserveAspectRatio="xMidYMid meet"
    >
      {STAGES.map((s, i) => {
        const x = X0 + i * (W + G);
        const cx = x + W / 2;
        const stroke = s.accent ? 'var(--accent-red)' : undefined;
        return (
          <g key={s.label}>
            {/* Connector + arrowhead into this box (skip the first) */}
            {i > 0 && (
              <>
                <Line x1={x - G} y1={CY} x2={x} y2={CY} />
                <Polyline points={`${x - 7},${CY - 4} ${x},${CY} ${x - 7},${CY + 4}`} fill="none" />
              </>
            )}
            <Rect x={x} y={top} width={W} height={H} rx={4} stroke={stroke} />
            <text
              className="u-illus-anno"
              x={cx}
              y={CY + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ fontSize: 13, letterSpacing: '0.06em', fill: s.accent ? 'var(--accent-red)' : undefined }}
            >
              {s.label}
            </text>
            {s.sub && (
              <text
                className="u-illus-anno"
                x={cx}
                y={CY + H / 2 + 16}
                textAnchor="middle"
                style={{ fontSize: 10, letterSpacing: '0.14em' }}
              >
                {s.sub}
              </text>
            )}
          </g>
        );
      })}
    </IllustrationFrame>
  );
}
