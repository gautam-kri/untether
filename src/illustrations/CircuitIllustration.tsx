import { IllustrationFrame, Polyline, Rect } from './Illustration';

const W = 1200;
const H = 700;
const GRID = 40;

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface CircuitData {
  traces: string[];
  vias: [number, number][];
  foot: [number, number, number][]; // x, y, orientation (0 h / 1 v)
}

function build(): CircuitData {
  const rng = mulberry32(20260704);
  const traces: string[] = [];
  const vias: [number, number][] = [];
  const foot: [number, number, number][] = [];

  const rows = H / GRID;
  for (let i = 0; i < 20; i++) {
    let x = 0;
    let y = GRID * (1 + Math.floor(rng() * (rows - 2)));
    const pts: [number, number][] = [[x, y]];
    const segments = 3 + Math.floor(rng() * 3);
    for (let s = 0; s < segments; s++) {
      x = Math.min(W, x + GRID * (2 + Math.floor(rng() * 5)));
      pts.push([x, y]);
      const dir = rng() > 0.5 ? 1 : -1;
      y = Math.max(GRID, Math.min(H - GRID, y + dir * GRID * (1 + Math.floor(rng() * 2))));
      pts.push([x, y]);
    }
    x = Math.min(W, x + GRID * 2);
    pts.push([x, y]);
    traces.push(pts.map((p) => p.join(',')).join(' '));
    pts.forEach((p) => {
      if (rng() > 0.45) vias.push(p);
    });
  }

  for (let i = 0; i < 14; i++) {
    const fx = GRID * (2 + Math.floor(rng() * (W / GRID - 4)));
    const fy = GRID * (1 + Math.floor(rng() * (rows - 2)));
    foot.push([fx, fy, rng() > 0.5 ? 0 : 1]);
  }

  return { traces, vias, foot };
}

const DATA = build();

/** Background circuit motif — right-angled traces, vias and footprints. */
export default function CircuitIllustration({
  opacity = 0.25,
  className,
  style,
}: {
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <IllustrationFrame
      viewBox={`0 0 ${W} ${H}`}
      decorative
      preserveAspectRatio="xMidYMid slice"
      className={className}
      style={{ opacity, ...style }}
    >
      {DATA.traces.map((points, i) => (
        <Polyline key={`t${i}`} points={points} />
      ))}
      {DATA.vias.map(([cx, cy], i) => (
        <circle key={`v${i}`} className="u-illus-line" data-draw pathLength={1} cx={cx} cy={cy} r="3" />
      ))}
      {DATA.foot.map(([x, y, o], i) =>
        o === 0 ? (
          <g key={`f${i}`}>
            <Rect x={x} y={y - 6} width="28" height="12" rx="1.5" />
            <line className="u-illus-line" data-draw pathLength={1} x1={x - 6} y1={y} x2={x} y2={y} />
            <line className="u-illus-line" data-draw pathLength={1} x1={x + 28} y1={y} x2={x + 34} y2={y} />
          </g>
        ) : (
          <g key={`f${i}`}>
            <Rect x={x - 6} y={y} width="12" height="28" rx="1.5" />
            <line className="u-illus-line" data-draw pathLength={1} x1={x} y1={y - 6} x2={x} y2={y} />
            <line className="u-illus-line" data-draw pathLength={1} x1={x} y1={y + 28} x2={x} y2={y + 34} />
          </g>
        ),
      )}
    </IllustrationFrame>
  );
}
