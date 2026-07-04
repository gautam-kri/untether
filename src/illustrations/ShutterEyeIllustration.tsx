import { Callout, Circle, IllustrationFrame, Path } from './Illustration';

/** An open eye with three horizontal bars sliding across the iris. */
export default function ShutterEyeIllustration({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  const cx = 170;
  const cy = 125;
  const iris = 46;
  return (
    <IllustrationFrame
      viewBox="0 0 340 250"
      title="An open eye with a shutter across the iris — controlled access"
      className={className}
      style={style}
    >
      <defs>
        <clipPath id="eye-iris">
          <circle cx={cx} cy={cy} r={iris} />
        </clipPath>
      </defs>

      {/* Eyelids */}
      <Path d="M44 125 Q170 46 296 125 Q170 204 44 125 Z" fill="none" />
      {/* Iris + pupil */}
      <Circle cx={cx} cy={cy} r={iris} />
      <Circle cx={cx} cy={cy} r={18} />

      {/* Sliding shutter bars, clipped to the iris */}
      <g clipPath="url(#eye-iris)">
        <g className="u-shutter-bars">
          {[-18, 0, 18].map((dy) => (
            <rect
              key={dy}
              x={cx - iris - 12}
              y={cy + dy - 3.5}
              width={iris * 2 + 24}
              height={7}
              fill="var(--line-white)"
              opacity={0.85}
            />
          ))}
        </g>
      </g>

      <Callout point={[cx + 22, cy - 20]} elbow={[250, 56]} labelPos={[330, 50]} anchor="end" label="CONTROLLED ACCESS" />
    </IllustrationFrame>
  );
}
