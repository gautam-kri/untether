import { useState } from 'react';
import { useReducedMotion } from '../lib/hooks';

interface Person {
  id: string;
  name: string;
  mask: string;
  sign: string;
  /** Spotlight centre, as % of the image box. */
  cx: number;
  cy: number;
  hotspot: { left: string; top: string; width: string; height: string };
}

const PEOPLE: Person[] = [
  {
    id: 'gautam',
    name: 'Gautam Krishna',
    mask: '/founders-gautam.webp',
    sign: '/founders-gautam-sign.webp',
    cx: 33,
    cy: 30,
    hotspot: { left: '8%', top: '0%', width: '50%', height: '66%' },
  },
  {
    id: 'harish',
    name: 'Harish Senthilkumar',
    mask: '/founders-harish.webp',
    sign: '/founders-harish-sign.webp',
    cx: 66,
    cy: 66,
    hotspot: { left: '42%', top: '40%', width: '58%', height: '60%' },
  },
];

/**
 * Centred team photo. Hovering a founder opens a circular spotlight that reveals
 * their marked-up "mask" (scribbles + outline) while their signature is drawn on
 * left-to-right, as if being signed. Clicking opens their full bio (onSelect).
 */
export default function FoundersPhoto({ onSelect }: { onSelect: (id: string) => void }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const clear = (id: string) => setActive((a) => (a === id ? null : a));

  return (
    <figure className="m-0">
      <div className="relative mx-auto w-full max-w-[900px]">
        <div className="relative mx-auto w-full overflow-hidden rounded-sm border border-hairline min-[720px]:w-[46%]">
          <img
            src="/founders.webp"
            alt="Untether's two co-founders"
            width={1131}
            height={1600}
            decoding="async"
            className="block h-auto w-full"
          />

          {PEOPLE.map((p) => {
            const on = active === p.id;
            return (
              <div key={p.id} className="pointer-events-none absolute inset-0" aria-hidden="true">
                {/* Scribble mask — circular spotlight reveal */}
                <img
                  src={p.mask}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    clipPath: `circle(${on ? 150 : 0}% at ${p.cx}% ${p.cy}%)`,
                    transition: reduced ? undefined : 'clip-path 650ms var(--ease-mech)',
                    willChange: 'clip-path',
                  }}
                />
                {/* Signature — drawn on left-to-right */}
                <img
                  src={p.sign}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{
                    opacity: on ? 1 : 0,
                    clipPath: on ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
                    transition: reduced
                      ? undefined
                      : on
                        ? 'clip-path 800ms var(--ease-mech) 200ms, opacity 180ms linear'
                        : 'opacity 200ms linear, clip-path 0ms linear 220ms',
                    willChange: 'clip-path',
                  }}
                />
              </div>
            );
          })}

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
      </div>

      <figcaption className="u-annotation mt-4 text-center">
        HOVER A FOUNDER — CLICK FOR MORE
      </figcaption>
    </figure>
  );
}
