import { Callout, Hatch, IllustrationFrame, Path, Rect } from './Illustration';

/** A padlock whose keyhole is a power-symbol glyph. */
export default function LockIllustration({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <IllustrationFrame
      viewBox="0 0 340 330"
      title="A padlock whose keyhole is a power symbol — your keys stay home"
      className={className}
      style={style}
    >
      {/* Shackle */}
      <Path d="M108 156 L108 118 A42 42 0 0 1 192 118 L192 156" fill="none" />
      <Path d="M122 156 L122 118 A28 28 0 0 1 178 118 L178 156" fill="none" />

      {/* Body */}
      <Rect x="72" y="156" width="156" height="140" rx="14" />
      <Hatch id="lock-body-hatch" x={76} y={238} width={148} height={54} gap={8} />

      {/* Keyhole as a power-symbol glyph */}
      <Path d="M139 212 A15 15 0 1 0 161 212" fill="none" />
      <Path d="M150 200 L150 216" />

      <Callout point={[178, 116]} elbow={[214, 66]} labelPos={[218, 62]} label="KEYS STAY HOME" />
    </IllustrationFrame>
  );
}
