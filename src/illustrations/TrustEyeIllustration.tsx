/**
 * The eye that never records.
 *
 * The eye is the design canvas's drawing, verbatim: a 72×44 viewBox, lids,
 * iris ring, accent pupil and four crosshair ticks, blinking on its 6s
 * cycle. It sits inline in the Trust content at full strength.
 *
 * On first reveal it plays a one-shot sequence, timed in
 * `styles/trust-eye.css` under `.u-eye*`:
 *   1. a small accent X — just larger than the iris — glitches in and out;
 *   2. three shutter bars slide in from alternating sides and tile the
 *      whole graphic edge to edge, in the same flat fill and teal leading
 *      edge as the site's wipe bars;
 *   3. the whole element glitches out, and then its wrapper collapses so
 *      no dead space is left above the section header.
 * Under `prefers-reduced-motion` it rests shuttered: bars closed, no X, no
 * glitch-out, no collapse.
 *
 * Deliberately not a camera aperture: an aperture implies capture.
 *
 * @module TrustEyeIllustration
 */
import { useRef, type CSSProperties } from 'react';
import { useReveal } from '../lib/reveal';

const W = 72;
const H = 44;
const CX = 36;
const CY = 22;
const IRIS = 11;
/** Half-size of the X: a smidge past the iris. */
const X_R = IRIS + 3;
const BARS = 3;
// A hair of overlap so antialiasing can never open a seam between bars.
const BAR_H = H / BARS + 0.06;
const EDGE = 0.8;

export default function TrustEyeIllustration({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const live = useReveal(ref);
  const state = live ? 'is-live' : '';

  return (
    <div className={`u-eye-wrap ${state}`}>
      <svg
        ref={ref}
        viewBox={`0 0 ${W} ${H}`}
        className={`u-eye ${state} ${className ?? ''}`}
        style={style}
        aria-hidden="true"
      >
        {/* The design's eye, untouched */}
        <g className="u-eye-lids">
          <path d="M4 22 Q36 -8 68 22 Q36 52 4 22 Z" fill="none" stroke="var(--teal-text)" strokeWidth="1.5" />
          <circle cx={CX} cy={CY} r={IRIS} fill="none" stroke="var(--teal-text)" strokeWidth="1.5" />
          <circle cx={CX} cy={CY} r={4.5} fill="var(--accent-red)" />
          <g stroke="var(--teal-text)" strokeWidth="1">
            <line x1="36" y1="11" x2="36" y2="15" />
            <line x1="36" y1="29" x2="36" y2="33" />
            <line x1="25" y1="22" x2="29" y2="22" />
            <line x1="43" y1="22" x2="47" y2="22" />
          </g>
        </g>

        {/* The X — glitches in and out before the shutters close */}
        <g className="u-eye-x" fill="none">
          <line x1={CX - X_R} y1={CY - X_R} x2={CX + X_R} y2={CY + X_R} />
          <line x1={CX + X_R} y1={CY - X_R} x2={CX - X_R} y2={CY + X_R} />
        </g>

        {/* Shutter bars — full width, tiled edge to edge, alternating sides,
            each with a teal leading edge like the wipe bars */}
        {Array.from({ length: BARS }, (_, i) => {
          const fromRight = i % 2 === 1;
          const y = (i * H) / BARS;
          return (
            <g
              key={i}
              className="u-eye-bar"
              data-side={fromRight ? 'r' : 'l'}
              style={{ '--i': i } as CSSProperties}
            >
              <rect className="u-eye-bar-fill" x={0} y={y} width={W} height={BAR_H} />
              <rect
                className="u-eye-bar-edge"
                x={fromRight ? 0 : W - EDGE}
                y={y}
                width={EDGE}
                height={BAR_H}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
