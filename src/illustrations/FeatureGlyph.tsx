import { Circle, IllustrationFrame, Line, Path, Rect } from './Illustration';

export type GlyphName = 'lock' | 'doc-check' | 'radio' | 'swap' | 'wrench' | 'grid';

const GLYPHS: Record<GlyphName, React.ReactNode> = {
  lock: (
    <>
      <Path d="M11 15 L11 11 A5 5 0 0 1 21 11 L21 15" fill="none" />
      <Rect x="8" y="15" width="16" height="11" rx="2" />
      <Circle cx="16" cy="19.5" r="1.4" />
      <Line x1="16" y1="20.5" x2="16" y2="23" />
    </>
  ),
  'doc-check': (
    <>
      <Path d="M9 5 L19 5 L23 9 L23 27 L9 27 Z" fill="none" />
      <Path d="M19 5 L19 9 L23 9" fill="none" />
      <Path d="M13 17 L16 20 L21 13" fill="none" />
    </>
  ),
  radio: (
    <>
      <Circle cx="16" cy="23" r="1.6" />
      <Path d="M11 20 Q16 15 21 20" fill="none" />
      <Path d="M8 17 Q16 8 24 17" fill="none" />
    </>
  ),
  swap: (
    <>
      <Line x1="8" y1="12" x2="22" y2="12" />
      <Path d="M19 9 L22 12 L19 15" fill="none" />
      <Line x1="24" y1="20" x2="10" y2="20" />
      <Path d="M13 17 L10 20 L13 23" fill="none" />
    </>
  ),
  wrench: (
    <>
      <Path d="M23 9 A5 5 0 1 0 23 17 L19 13 Z" fill="none" />
      <Line x1="20" y1="14" x2="9" y2="25" />
    </>
  ),
  grid: (
    <>
      <Rect x="6" y="8" width="20" height="16" rx="1.5" />
      <Line x1="6" y1="13" x2="26" y2="13" />
      <Line x1="12.7" y1="8" x2="12.7" y2="24" />
      <Line x1="19.3" y1="8" x2="19.3" y2="24" />
    </>
  ),
};

/** 32px line-art glyph for a feature tile. */
export default function FeatureGlyph({ name }: { name: GlyphName }) {
  return (
    <IllustrationFrame viewBox="0 0 32 32" decorative>
      {GLYPHS[name]}
    </IllustrationFrame>
  );
}
