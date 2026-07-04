import { useRef, type ReactNode, type SVGProps } from 'react';
import { useReveal } from '../lib/reveal';
import { useReducedMotion } from '../lib/hooks';

interface FrameProps {
  viewBox: string;
  title?: string;
  /** Purely decorative art gets aria-hidden and no <title>. */
  decorative?: boolean;
  className?: string;
  style?: React.CSSProperties;
  preserveAspectRatio?: string;
  children: ReactNode;
}

/** SVG wrapper that arms/plays the shared draw-on when revealed. */
export function IllustrationFrame({
  viewBox,
  title,
  decorative,
  className,
  style,
  preserveAspectRatio = 'xMidYMid meet',
  children,
}: FrameProps) {
  const ref = useRef<SVGSVGElement>(null);
  const seen = useReveal(ref);
  const reduced = useReducedMotion();
  const state = reduced ? '' : seen ? 'is-played' : 'is-armed';

  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      preserveAspectRatio={preserveAspectRatio}
      className={`u-illus ${state} ${className ?? ''}`}
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : title}
      aria-hidden={decorative ? true : undefined}
      style={{ width: '100%', height: '100%', ...style }}
    >
      {!decorative && title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

/* Drawable stroke primitives — consistent styling + draw-on wiring. */
const draw = { className: 'u-illus-line', 'data-draw': true, pathLength: 1 } as const;

export const Path = (p: SVGProps<SVGPathElement>) => <path {...draw} {...p} />;
export const Line = (p: SVGProps<SVGLineElement>) => <line {...draw} {...p} />;
export const Circle = (p: SVGProps<SVGCircleElement>) => <circle {...draw} {...p} />;
export const Ellipse = (p: SVGProps<SVGEllipseElement>) => <ellipse {...draw} {...p} />;
export const Rect = (p: SVGProps<SVGRectElement>) => <rect {...draw} {...p} />;
export const Polyline = (p: SVGProps<SVGPolylineElement>) => <polyline {...draw} {...p} />;
export const Polygon = (p: SVGProps<SVGPolygonElement>) => <polygon {...draw} {...p} />;

interface CalloutProps {
  point: [number, number];
  label: string;
  labelPos: [number, number];
  elbow?: [number, number];
  anchor?: 'start' | 'middle' | 'end';
  fontSize?: number;
}

/** Annotation callout: a dot on the part, a leader elbow, and a label. */
export function Callout({ point, label, labelPos, elbow, anchor, fontSize = 11 }: CalloutProps) {
  const [px, py] = point;
  const [lx, ly] = labelPos;
  const pts = elbow
    ? `${px},${py} ${elbow[0]},${elbow[1]} ${lx},${ly}`
    : `${px},${py} ${lx},${ly}`;
  const a = anchor ?? (lx < px ? 'end' : 'start');
  return (
    <g>
      <polyline className="u-illus-lead" data-draw pathLength={1} points={pts} fill="none" />
      <circle className="u-callout-dot" data-draw pathLength={1} cx={px} cy={py} r={3.2} />
      <text
        className="u-illus-anno"
        x={lx}
        y={ly - 5}
        textAnchor={a}
        style={{ fontSize }}
      >
        {label}
      </text>
    </g>
  );
}

interface HatchProps {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  gap?: number;
}

/** 45° parallel hatching clipped to a rectangular region. */
export function Hatch({ id, x, y, width, height, gap = 6 }: HatchProps) {
  const lines: ReactNode[] = [];
  // Diagonal (slope 1) lines sweeping across the box, later clipped.
  for (let d = -width; d < height; d += gap) {
    lines.push(
      <line
        key={d}
        className="u-illus-hatch"
        x1={x}
        y1={y + d}
        x2={x + width}
        y2={y + d + width}
      />,
    );
  }
  return (
    <g clipPath={`url(#${id})`}>
      <defs>
        <clipPath id={id}>
          <rect x={x} y={y} width={width} height={height} />
        </clipPath>
      </defs>
      {lines}
    </g>
  );
}
