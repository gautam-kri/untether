import { Circle, Ellipse, Hatch, IllustrationFrame, Line, Path } from './Illustration';

/** Line-art bust inside a circular frame, with an optional caption label. */
export default function PortraitPlaceholder({
  label,
  className,
  style,
}: {
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <IllustrationFrame
      viewBox="0 0 240 280"
      title={label ? `Portrait placeholder for ${label}` : 'Portrait placeholder'}
      className={className}
      style={style}
    >
      <defs>
        <clipPath id="portrait-frame">
          <circle cx="120" cy="115" r="98" />
        </clipPath>
      </defs>

      {/* Frame */}
      <Circle cx="120" cy="115" r="98" />
      <Circle cx="120" cy="115" r="92" />

      <g clipPath="url(#portrait-frame)">
        {/* Shoulders */}
        <Path d="M40 224 Q40 168 78 152 Q120 138 162 152 Q200 168 200 224 Z" fill="none" />
        {/* Neck */}
        <Line x1="104" y1="140" x2="104" y2="160" />
        <Line x1="136" y1="140" x2="136" y2="160" />
        {/* Head */}
        <Ellipse cx="120" cy="96" rx="36" ry="42" />
        {/* Brow, nose, jaw */}
        <Line x1="104" y1="86" x2="136" y2="86" />
        <Path d="M120 90 L120 106 Q120 110 116 111" fill="none" />
        <Path d="M100 118 Q120 134 140 118" fill="none" />
        {/* Hatching in the lower third */}
        <Hatch id="portrait-hatch" x={30} y={150} width={180} height={64} gap={8} />
      </g>

      {label && (
        <text className="u-illus-anno" x="120" y="256" textAnchor="middle">
          {label}
        </text>
      )}
    </IllustrationFrame>
  );
}
