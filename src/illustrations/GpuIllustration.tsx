import { Callout, Circle, IllustrationFrame, Line, Path, Rect } from './Illustration';

function Fan({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  return (
    <g>
      <Circle cx={cx} cy={cy} r={r} />
      <Circle cx={cx} cy={cy} r={r - 5} />
      <Circle cx={cx} cy={cy} r={9} />
      {Array.from({ length: 9 }, (_, i) => {
        const a = (i / 9) * Math.PI * 2;
        const x1 = cx + Math.cos(a) * 9;
        const y1 = cy + Math.sin(a) * 9;
        const x2 = cx + Math.cos(a + 0.5) * (r - 5);
        const y2 = cy + Math.sin(a + 0.5) * (r - 5);
        return <Path key={i} d={`M${x1} ${y1} Q${cx + Math.cos(a + 0.25) * (r * 0.6)} ${cy + Math.sin(a + 0.25) * (r * 0.6)} ${x2} ${y2}`} />;
      })}
    </g>
  );
}

/** Top-down view of an inference graphics card PCB. */
export default function GpuIllustration({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const dieX = 70;
  const dieY = 82;
  const dieS = 74;
  return (
    <IllustrationFrame
      viewBox="0 0 420 300"
      title="Untether inference GPU — die with pin grid, dual fans and 16GB of VRAM"
      className={className}
      style={style}
    >
      {/* Board outline */}
      <Rect x="30" y="46" width="360" height="176" rx="4" />

      {/* Gold-finger edge connector on the bottom edge */}
      <Path d="M70 222 L70 244 L214 244 L214 222" />
      <Path d="M120 244 L120 250 L214 250 L214 244" />
      {Array.from({ length: 14 }, (_, i) => {
        const x = 76 + i * 10;
        return <Line key={i} x1={x} y1={226} x2={x} y2={242} />;
      })}

      {/* Central inference die with pin grid */}
      <Rect x={dieX} y={dieY} width={dieS} height={dieS} rx="3" />
      <Rect x={dieX + 8} y={dieY + 8} width={dieS - 16} height={dieS - 16} />
      {Array.from({ length: 6 }, (_, r) =>
        Array.from({ length: 6 }, (_, c) => (
          <circle
            key={`${r}-${c}`}
            className="u-illus-line"
            data-draw
            pathLength={1}
            cx={dieX + 15 + c * 8.8}
            cy={dieY + 15 + r * 8.8}
            r="1.5"
          />
        )),
      )}

      {/* VRAM modules around the die */}
      <Rect x={dieX - 2} y={dieY - 26} width="30" height="16" rx="1.5" />
      <Rect x={dieX + 44} y={dieY - 26} width="30" height="16" rx="1.5" />
      <Rect x={dieX - 28} y={dieY + 20} width="16" height="30" rx="1.5" />
      <Rect x={dieX - 2} y={dieY + dieS + 8} width="30" height="16" rx="1.5" />

      {/* Dual axial fans */}
      <Fan cx={300} cy={104} r={40} />
      <Fan cx={300} cy={186} r={30} />

      <Callout point={[dieX + dieS / 2, dieY + dieS / 2]} elbow={[150, 40]} labelPos={[150, 32]} anchor="middle" label="INFERENCE DIE" />
      <Callout point={[dieX + 58, dieY - 18]} elbow={[210, 26]} labelPos={[214, 20]} label="16GB VRAM" />
    </IllustrationFrame>
  );
}
