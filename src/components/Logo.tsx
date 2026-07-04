import { useEffect, useRef, useState } from 'react';
import { LOGO_PATH, LOGO_VIEWBOX } from '../data/logoMark';
import { useReducedMotion } from '../lib/hooks';

interface LogoProps {
  /** Rendered height in pixels (the mark is square). */
  size?: number;
  /** Play the one-time draw-on: the contour traces, then the fill blooms. */
  animate?: boolean;
  className?: string;
  title?: string;
}

/**
 * Untether brand mark. A single-path silhouette drawn in `currentColor`
 * so it inherits the surrounding text color at any size.
 */
export default function Logo({ size = 28, animate = false, className, title }: LogoProps) {
  const reduced = useReducedMotion();
  const [drawn, setDrawn] = useState(!animate || reduced);
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!animate || reduced) {
      setDrawn(true);
      return;
    }
    setDrawn(false);
    const id = window.requestAnimationFrame(() => setDrawn(true));
    return () => window.cancelAnimationFrame(id);
  }, [animate, reduced]);

  const playing = animate && !reduced;

  return (
    <svg
      ref={ref}
      viewBox={LOGO_VIEWBOX}
      width={size}
      height={size}
      className={className}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      style={{ display: 'block', color: 'currentColor', overflow: 'visible' }}
    >
      {/* Fill silhouette — blooms in after the contour draws. */}
      <path
        d={LOGO_PATH}
        fill="currentColor"
        fillRule="evenodd"
        style={{
          fillOpacity: playing ? (drawn ? 1 : 0) : 1,
          transition: playing ? 'fill-opacity 500ms var(--ease-mech) 700ms' : undefined,
        }}
      />
      {/* Contour trace — only visible while the draw-on plays. */}
      {playing && (
        <path
          d={LOGO_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.25}
          vectorEffect="non-scaling-stroke"
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: drawn ? 0 : 1,
            transition: 'stroke-dashoffset 1200ms var(--ease-mech)',
            opacity: drawn ? 0 : 0.9,
            transitionProperty: 'stroke-dashoffset, opacity',
            transitionDuration: '1200ms, 400ms',
            transitionDelay: '0ms, 1000ms',
            transitionTimingFunction: 'var(--ease-mech)',
          }}
        />
      )}
    </svg>
  );
}
