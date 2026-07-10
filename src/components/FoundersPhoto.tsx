import { useState } from 'react';
import { useReducedMotion } from '../lib/hooks';

const VB_W = 1000;
const VB_H = 611; // matches a 46%-wide centred image (1054:1400) in the stage
const LINE_LEFT_X = 248; // where a left-side name meets its leader line
const LINE_RIGHT_X = 752; // where a right-side name meets its leader line

interface Person {
  id: string;
  name: string;
  overlay: string;
  side: 'left' | 'right';
  edge: [number, number]; // start of the leader line, on the founder's red outline
  hotspot: { left: string; top: string; width: string; height: string };
}

const PEOPLE: Person[] = [
  {
    id: 'gautam',
    name: 'Gautam Krishna',
    overlay: '/founders-gautam.webp',
    side: 'left',
    edge: [408, 64],
    hotspot: { left: '10%', top: '0%', width: '48%', height: '64%' },
  },
  {
    id: 'harish',
    name: 'Harish Senthilkumar',
    overlay: '/founders-harish.webp',
    side: 'right',
    edge: [592, 257],
    hotspot: { left: '44%', top: '38%', width: '56%', height: '62%' },
  },
];

/** Centred team photo: hover reveals a founder in red with their name to the
 *  side; clicking opens their full bio below (handled by onSelect). */
export default function FoundersPhoto({ onSelect }: { onSelect: (id: string) => void }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const clear = (id: string) => setActive((a) => (a === id ? null : a));

  return (
    <figure className="m-0">
      <div className="relative mx-auto w-full max-w-[900px]">
        {/* Image — full width on mobile, centred column on desktop */}
        <div className="relative mx-auto w-full overflow-hidden rounded-sm border border-hairline min-[720px]:w-[46%]">
          <img
            src="/founders.jpg"
            alt="Untether's two co-founders"
            width={1054}
            height={1400}
            decoding="async"
            className="block h-auto w-full"
          />
          {PEOPLE.map((p) => (
            <img
              key={p.id}
              src={p.overlay}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-cover"
              style={{
                opacity: active === p.id ? 1 : 0,
                transition: `opacity ${reduced ? 0 : 240}ms var(--ease-mech)`,
              }}
            />
          ))}
          {PEOPLE.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-label={`${p.name}, co-founder — read full bio`}
              className="absolute cursor-pointer border-0 bg-transparent"
              style={p.hotspot}
              data-cursor="link"
              onMouseEnter={() => setActive(p.id)}
              onMouseLeave={() => clear(p.id)}
              onFocus={() => setActive(p.id)}
              onBlur={() => clear(p.id)}
              onClick={() => onSelect(p.id)}
            />
          ))}
        </div>

        {/* Leader lines from each red outline out to the side (desktop) */}
        <svg
          className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible min-[720px]:block"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {PEOPLE.map((p) => {
            const on = active === p.id;
            const endX = p.side === 'left' ? LINE_LEFT_X : LINE_RIGHT_X;
            return (
              <g key={p.id} style={{ opacity: on ? 1 : 0, transition: 'opacity 150ms var(--ease-mech)' }}>
                <polyline
                  points={`${p.edge[0]},${p.edge[1]} ${endX},${p.edge[1]}`}
                  fill="none"
                  stroke="var(--accent-red)"
                  strokeWidth={2}
                  vectorEffect="non-scaling-stroke"
                  pathLength={1}
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset: on || reduced ? 0 : 1,
                    transition: reduced ? undefined : 'stroke-dashoffset 320ms var(--ease-mech)',
                  }}
                />
                <circle cx={p.edge[0]} cy={p.edge[1]} r={5} fill="var(--accent-red)" />
              </g>
            );
          })}
        </svg>

        {/* Founder names, outside the image to the side (desktop) */}
        {PEOPLE.map((p) => (
          <span
            key={p.id}
            aria-hidden="true"
            className="pointer-events-none absolute hidden font-base text-teal min-[720px]:block"
            style={{
              ...(p.side === 'left'
                ? { left: 0, textAlign: 'right', paddingRight: '12px' }
                : { left: '74%', textAlign: 'left', paddingLeft: '12px' }),
              width: '26%',
              top: `${(p.edge[1] / VB_H) * 100}%`,
              transform: 'translateY(-50%)',
              fontSize: '1rem',
              lineHeight: 1.2,
              opacity: active === p.id ? 1 : 0,
              transition: 'opacity 200ms var(--ease-mech)',
            }}
          >
            {p.name}
          </span>
        ))}
      </div>

      <figcaption className="u-annotation mt-4 text-center">
        HOVER A FOUNDER — CLICK FOR MORE
      </figcaption>
    </figure>
  );
}
