import { Callout, IllustrationFrame, Line, Path } from './Illustration';

/** Isometric small-form-factor cube server. */
export default function ServerIllustration({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <IllustrationFrame
      viewBox="0 0 430 330"
      title="Untether personal server — a small-form-factor cube with dual GPU bays"
      className={className}
      style={style}
    >
      {/* Cube faces */}
      {/* Top face: P1(170,150) L1(80,100) T(170,50) R1(260,100) */}
      <Path d="M170 150 L80 100 L170 50 L260 100 Z" />
      {/* Front (left) face: P0(170,260) P1(170,150) L1(80,100) L0(80,210) */}
      <Path d="M170 260 L170 150 L80 100 L80 210 Z" />
      {/* Right face: P0(170,260) P1(170,150) R1(260,100) R0(260,210) */}
      <Path d="M170 260 L170 150 L260 100 L260 210 Z" />

      {/* Front-face controls, mapped onto the parallelogram */}
      <g transform="matrix(1 0.5556 0 1 80 100)">
        {/* Riveted nameplate */}
        <rect className="u-illus-line" data-draw pathLength={1} x="16" y="26" width="58" height="22" rx="2" />
        <circle className="u-illus-line" data-draw pathLength={1} cx="20" cy="30" r="1.3" />
        <circle className="u-illus-line" data-draw pathLength={1} cx="70" cy="30" r="1.3" />
        <circle className="u-illus-line" data-draw pathLength={1} cx="20" cy="44" r="1.3" />
        <circle className="u-illus-line" data-draw pathLength={1} cx="70" cy="44" r="1.3" />
        <text
          x="45"
          y="41"
          textAnchor="middle"
          style={{
            fontFamily: '"TT2020 StyleB", Georgia, serif',
            fontSize: 9,
            letterSpacing: '0.12em',
            fill: 'var(--body-white)',
          }}
        >
          UNTETHER
        </text>
        {/* Two status LEDs */}
        <circle className="u-illus-line" data-draw pathLength={1} cx="22" cy="66" r="2.4" />
        <circle className="u-illus-line" data-draw pathLength={1} cx="33" cy="66" r="2.4" />
        {/* Power button with power glyph */}
        <circle className="u-illus-line" data-draw pathLength={1} cx="63" cy="70" r="8" />
        <path className="u-illus-line" data-draw pathLength={1} d="M63 64 L63 70" />
        <path
          className="u-illus-line"
          data-draw
          pathLength={1}
          d="M59.5 66 A6 6 0 1 0 66.5 66"
          fill="none"
        />
      </g>

      {/* Right-face vent slots (12), mapped onto the parallelogram */}
      <g transform="matrix(1 -0.5556 0 1 170 150)">
        {Array.from({ length: 12 }, (_, i) => {
          const x = 12 + i * 6;
          return (
            <Line key={i} x1={x} y1={18} x2={x} y2={95} />
          );
        })}
      </g>

      <Callout point={[210, 150]} elbow={[300, 96]} labelPos={[306, 92]} label="DUAL GPU BAY" />
      <Callout point={[150, 90]} elbow={[92, 40]} labelPos={[20, 36]} label="LOCAL MEMORY CORE" />
    </IllustrationFrame>
  );
}
