/**
 * Mission background — seven slow-turning dashed rings with accent centres,
 * peppered through the gutters either side of the centred body column.
 *
 * Each ring is the design canvas's reticle with its spokes removed. The
 * field is anchored to the body column itself (see `.u-reticle-field`), so
 * every ring sits a fixed `gap` outside the column's edge regardless of
 * viewport width — "close to the body" stays true on any screen. Sizes run
 * 5–14rem; the vertical positions are hand-placed so no two rings overlap
 * and none reaches the footer, even on a 700px-tall section. Each ring has
 * its own period and direction so the field never reads as clones, and
 * strokes are non-scaling so the small rings keep a 1px line. Hidden below
 * 1280px, where the gutters get too narrow. Static under
 * `prefers-reduced-motion`.
 *
 * Styling lives in `styles/design-import.css` under `.u-reticle*`.
 *
 * @module ReticleIllustration
 */
import type { CSSProperties } from 'react';

/* CSSProperties has no slot for custom properties; an intersection lets the
   per-ring knobs type-check without a cast. */
type RingStyle = CSSProperties & { '--size': string; '--dur': string; '--dir': string };

interface Ring {
  size: string;
  /** Top edge, as a share of the section height. */
  top: string;
  /** Which gutter, and how far outside the column's edge the ring sits. */
  side: 'L' | 'R';
  gap: string;
  dur: string;
  reverse?: boolean;
}

const RINGS: Ring[] = [
  // left gutter, top to bottom
  { size: '14rem', top: '10%', side: 'L', gap: '0.5rem', dur: '90s' },
  { size: '5rem', top: '46%', side: 'L', gap: '1.5rem', dur: '50s', reverse: true },
  { size: '7rem', top: '59%', side: 'L', gap: '0.5rem', dur: '70s' },
  { size: '5rem', top: '76%', side: 'L', gap: '2.5rem', dur: '55s', reverse: true },
  // right gutter, top to bottom
  { size: '11rem', top: '12%', side: 'R', gap: '0.75rem', dur: '80s', reverse: true },
  { size: '8.5rem', top: '48%', side: 'R', gap: '0.5rem', dur: '65s' },
  { size: '6rem', top: '74%', side: 'R', gap: '3rem', dur: '60s', reverse: true },
];

export default function ReticleIllustration() {
  return (
    <div className="u-reticle-field" aria-hidden="true">
      {RINGS.map((r, i) => {
        // A left ring's RIGHT edge sits `gap` outside the column's left edge;
        // a right ring's LEFT edge sits `gap` outside the column's right edge.
        const anchor =
          r.side === 'L' ? { right: `calc(100% + ${r.gap})` } : { left: `calc(100% + ${r.gap})` };
        const style: RingStyle = {
          '--size': r.size,
          '--dur': r.dur,
          '--dir': r.reverse ? 'reverse' : 'normal',
          top: r.top,
          ...anchor,
        };
        return (
          <svg key={i} className="u-reticle" viewBox="0 0 100 100" style={style}>
            <circle cx="50" cy="50" r="44" />
            <circle className="is-centre" cx="50" cy="50" r="5" />
          </svg>
        );
      })}
    </div>
  );
}
