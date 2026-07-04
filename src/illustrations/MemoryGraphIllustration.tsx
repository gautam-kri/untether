import { Callout, Circle, IllustrationFrame, Line } from './Illustration';

const NODES: [number, number, number][] = [
  [90, 90, 18], // 0 CLAIM
  [200, 60, 12], // 1
  [300, 100, 16], // 2
  [60, 190, 10], // 3
  [150, 180, 22], // 4 (meter)
  [260, 200, 14], // 5 (meter)
  [350, 190, 10], // 6
  [110, 270, 13], // 7
  [240, 280, 16], // 8 (meter)
];

const EDGES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 6],
  [6, 5],
  [5, 8],
  [8, 7],
  [7, 3],
  [3, 0],
  [1, 4],
  [4, 5],
  [0, 4],
  [2, 5],
];

const METER_NODES = [4, 5, 8];

/** A knowledge graph of claims, evidence and relationships. */
export default function MemoryGraphIllustration({
  className,
  style,
  decorative,
}: {
  className?: string;
  style?: React.CSSProperties;
  decorative?: boolean;
}) {
  const red: [number, number] = [0, 8]; // the accent edge
  const [ra, rb] = red;
  const redLine = { x1: NODES[ra][0], y1: NODES[ra][1], x2: NODES[rb][0], y2: NODES[rb][1] };
  const crossed = NODES[4]; // the white node the red edge passes over

  return (
    <IllustrationFrame
      viewBox="0 0 420 330"
      title="A private memory graph linking claims to their evidence"
      decorative={decorative}
      className={className}
      style={style}
    >
      <defs>
        <clipPath id="mg-crossed-node">
          <circle cx={crossed[0]} cy={crossed[1]} r={crossed[2]} />
        </clipPath>
      </defs>

      {/* White edges */}
      {EDGES.map(([a, b], i) => (
        <Line key={i} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} />
      ))}

      {/* Accent edge, with blend-teal where it crosses a white node */}
      <Line {...redLine} stroke="var(--accent-red)" style={{ opacity: 1 }} />
      <g clipPath="url(#mg-crossed-node)">
        <line
          className="u-illus-line"
          data-draw
          pathLength={1}
          {...redLine}
          stroke="var(--blend-teal)"
          style={{ opacity: 1 }}
        />
      </g>

      {/* Nodes */}
      {NODES.map(([cx, cy, r], i) => (
        <Circle key={i} cx={cx} cy={cy} r={r} />
      ))}

      {/* Tiny bar meters on three nodes */}
      {METER_NODES.map((i) => {
        const [cx, cy] = NODES[i];
        const heights = [5, 9, 7];
        return (
          <g key={`m${i}`}>
            {heights.map((h, j) => {
              const x = cx - 5 + j * 5;
              const base = cy + 6;
              return <Line key={j} x1={x} y1={base} x2={x} y2={base - h} />;
            })}
          </g>
        );
      })}

      <Callout point={[90, 90]} elbow={[58, 42]} labelPos={[20, 36]} label="CLAIM" />
      <Callout point={[240, 280]} elbow={[240, 314]} labelPos={[240, 320]} anchor="middle" label="EVIDENCE" />
      <Callout point={[186, 214]} elbow={[300, 268]} labelPos={[306, 264]} label="RELATIONSHIP" />
    </IllustrationFrame>
  );
}
