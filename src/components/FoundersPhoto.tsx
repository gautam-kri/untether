import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../lib/hooks';

const VB_W = 620;
const VB_H = 824;

interface Person {
  id: string;
  name: string;
  overlay: string;
  head: [number, number];
  elbow: [number, number];
  label: [number, number];
  anchor: 'start' | 'end';
  hotspot: { left: string; top: string; width: string; height: string };
}

const PEOPLE: Person[] = [
  {
    id: 'gautam',
    name: 'GAUTAM KRISHNA',
    overlay: '/founders-gautam.webp',
    head: [252, 62],
    elbow: [150, 78],
    label: [24, 100],
    anchor: 'start',
    hotspot: { left: '18%', top: '0%', width: '38%', height: '62%' },
  },
  {
    id: 'harish',
    name: 'HARISH SENTHILKUMAR',
    overlay: '/founders-harish.webp',
    head: [366, 322],
    elbow: [360, 244],
    label: [300, 222],
    anchor: 'start',
    hotspot: { left: '46%', top: '40%', width: '52%', height: '60%' },
  },
];

/** Team photo with per-founder hover: red tint + drawn leader line + typed name. */
export default function FoundersPhoto() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const [typed, setTyped] = useState('');
  const timer = useRef<number>(0);

  useEffect(() => {
    window.clearInterval(timer.current);
    const p = PEOPLE.find((x) => x.id === active);
    if (!p) {
      setTyped('');
      return;
    }
    if (reduced) {
      setTyped(p.name);
      return;
    }
    setTyped('');
    let i = 0;
    timer.current = window.setInterval(() => {
      i += 1;
      setTyped(p.name.slice(0, i));
      if (i >= p.name.length) window.clearInterval(timer.current);
    }, 45);
    return () => window.clearInterval(timer.current);
  }, [active, reduced]);

  const clear = (id: string) => setActive((a) => (a === id ? null : a));
  const scrollBottom = () =>
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: reduced ? 'auto' : 'smooth',
    });

  return (
    <figure className="m-0">
      <div className="relative overflow-hidden rounded-sm border border-hairline">
        <img
          src="/founders.jpg"
          alt="Untether's two co-founders"
          width={1054}
          height={1400}
          decoding="async"
          className="block h-auto w-full"
        />

        {/* Per-founder red-tinted overlays */}
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

        {/* Leader line + typed name */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {PEOPLE.map((p) => {
            const on = active === p.id;
            const points = `${p.head[0]},${p.head[1]} ${p.elbow[0]},${p.elbow[1]} ${p.label[0]},${p.label[1]}`;
            return (
              <g
                key={p.id}
                style={{ opacity: on ? 1 : 0, transition: 'opacity 150ms var(--ease-mech)' }}
              >
                <polyline
                  points={points}
                  fill="none"
                  stroke="var(--accent-red)"
                  strokeWidth={2}
                  vectorEffect="non-scaling-stroke"
                  pathLength={1}
                  style={{
                    strokeDasharray: 1,
                    strokeDashoffset: on || reduced ? 0 : 1,
                    transition: reduced ? undefined : 'stroke-dashoffset 340ms var(--ease-mech)',
                  }}
                />
                <circle cx={p.head[0]} cy={p.head[1]} r={5} fill="var(--accent-red)" />
                <text
                  x={p.label[0]}
                  y={p.label[1] - 6}
                  textAnchor={p.anchor}
                  style={{
                    fontFamily: '"TT2020 Base", ui-monospace, monospace',
                    fontSize: '17px',
                    letterSpacing: '0.18em',
                    fill: 'var(--line-white)',
                    paintOrder: 'stroke',
                    stroke: 'rgba(6,6,6,0.92)',
                    strokeWidth: '4px',
                    strokeLinejoin: 'round',
                  }}
                >
                  {on ? typed : ''}
                  {on && !reduced && typed.length < p.name.length ? '▍' : ''}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Hover / focus / click hotspots */}
        {PEOPLE.map((p) => (
          <button
            key={p.id}
            type="button"
            aria-label={`${p.name}, co-founder — scroll to details`}
            className="absolute cursor-pointer border-0 bg-transparent"
            style={p.hotspot}
            data-cursor="link"
            onMouseEnter={() => setActive(p.id)}
            onMouseLeave={() => clear(p.id)}
            onFocus={() => setActive(p.id)}
            onBlur={() => clear(p.id)}
            onClick={scrollBottom}
          />
        ))}
      </div>
      <figcaption className="u-annotation mt-3 text-center">HOVER — OR TAP — A FOUNDER</figcaption>
    </figure>
  );
}
