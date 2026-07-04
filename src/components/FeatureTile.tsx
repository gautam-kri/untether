import type { ReactNode } from 'react';
import FeatureGlyph, { type GlyphName } from '../illustrations/FeatureGlyph';

interface FeatureTileProps {
  glyph: GlyphName;
  title: string;
  children: ReactNode;
}

/** Feature card: 32px glyph, title and description. */
export default function FeatureTile({ glyph, title, children }: FeatureTileProps) {
  return (
    <article className="u-tile flex h-full flex-col" style={{ padding: '24px' }}>
      <div style={{ width: '32px', height: '32px' }} className="text-body">
        <FeatureGlyph name={glyph} />
      </div>
      <h3 className="u-display u-tile-title mt-5">{title}</h3>
      <p className="u-body u-body-teal mt-3">{children}</p>
    </article>
  );
}
