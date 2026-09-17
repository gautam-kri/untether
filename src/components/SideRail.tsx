/**
 * Left-hand side rails, from the design kit's side ornaments.
 *
 * Three variants share one fixed slot on the left edge, mirroring
 * `ProgressNav` on the right, and hide below 900px like it does:
 *
 * - `RulerRail`   (S1) — tick rail whose accent line tracks scroll
 *                  position. Bound to a specific scroll container when one
 *                  is given, otherwise to the window.
 * - `ChevronRail` (S3) — a column of chevrons, no accent anywhere.
 * - `HexRail`     (S5) — a hex register, values editable in `config.ts`.
 *                  Lifts itself clear of the footer, which on the last
 *                  landing section is always on screen.
 *
 * `LandingRail` picks per landing section: the last section gets the hex
 * register; a section that scrolls internally (its `FitScale` has fallen
 * back to `data-fitscroll="true"`) gets the ruler bound to that scroller;
 * a section that fits on one screen gets chevrons. The scrolling pages
 * outside the landing (`PageShell`) mount `RulerRail` directly.
 *
 * Geometry lives in `styles/design-import.css` under `.u-rail*`.
 *
 * @module SideRail
 */
import { useEffect, useRef, useState } from 'react';
import { useLandingIndex } from '../lib/landingNav';
import { SECTIONS, SECTION_COUNT } from '../lib/sections';
import { HEX_REGISTER } from '../config';

const RULER_TICKS = 32;
const CHEVRONS = 10;

/** 0–1 progress of a scroll container (or of the document when none). */
function progressOf(node: Element | null): number {
  const el = node ?? document.scrollingElement ?? document.documentElement;
  const max = el.scrollHeight - el.clientHeight;
  return max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0;
}

/** S1 — ticks with an accent line that follows scroll progress. */
export function RulerRail({ scroller = null }: { scroller?: Element | null }) {
  const marker = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = marker.current;
    if (!el) return;
    let raf = 0;
    const paint = () => {
      raf = 0;
      el.style.top = `${progressOf(scroller) * 100}%`;
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    paint();
    // A bound container fires `scroll` on itself; the window case is caught
    // by capturing on the document, since `scroll` does not bubble.
    const src: EventTarget = scroller ?? document;
    src.addEventListener('scroll', schedule, { capture: !scroller, passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      src.removeEventListener('scroll', schedule, { capture: !scroller });
      window.removeEventListener('resize', schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scroller]);

  return (
    <div className="u-rail" aria-hidden="true">
      <div className="u-rail-ticks">
        {Array.from({ length: RULER_TICKS }, (_, i) => (
          <span key={i} className="u-rail-tick" data-major={i % 5 === 0 ? '' : undefined} />
        ))}
      </div>
      <span ref={marker} className="u-rail-marker" />
    </div>
  );
}

/** S3 — chevron column, deliberately without an accent marking. */
export function ChevronRail() {
  return (
    <div className="u-rail" aria-hidden="true">
      <div className="u-rail-chevrons">
        {Array.from({ length: CHEVRONS }, (_, i) => (
          <span key={i} className="u-rail-chevron" />
        ))}
      </div>
    </div>
  );
}

/**
 * S5 — hex register. Edit `HEX_REGISTER` in config.ts to encode something.
 *
 * The rail is fixed to the viewport, but the last section's footer is
 * always on screen beneath it, so this variant measures that footer and
 * ends 2rem above it (`--rail-bottom` is read by `.u-rail`).
 */
export function HexRail() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const footer = document.querySelector('footer');
    if (!el || !footer) return;
    const lift = () => el.style.setProperty('--rail-bottom', `calc(${footer.offsetHeight}px + 2rem)`);
    lift();
    const ro = new ResizeObserver(lift);
    ro.observe(footer);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="u-rail" aria-hidden="true">
      <div className="u-rail-hex">
        {HEX_REGISTER.values.map((v, i) => (
          <span key={i} className="u-rail-hex-word" data-accent={i === HEX_REGISTER.accent ? '' : undefined}>
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Landing: hex register on the last section; ruler on any section that is
 * scrolling internally; chevrons on any that fits. `FitScale` decides
 * whether a section scrolls after measuring, and can change its mind on
 * resize, so the decision is read live off its `data-fitscroll` attribute.
 */
export function LandingRail() {
  const active = useLandingIndex();
  const [scroller, setScroller] = useState<Element | null>(null);

  useEffect(() => {
    const section = document.getElementById(SECTIONS[active]?.id ?? '');
    const fit = section?.querySelector('.u-fit') ?? null;
    if (!fit) {
      setScroller(null);
      return;
    }
    const sync = () => setScroller(fit.getAttribute('data-fitscroll') === 'true' ? fit : null);
    sync();
    const mo = new MutationObserver(sync);
    mo.observe(fit, { attributes: true, attributeFilter: ['data-fitscroll'] });
    return () => mo.disconnect();
  }, [active]);

  if (active === SECTION_COUNT - 1) return <HexRail />;
  return scroller ? <RulerRail scroller={scroller} /> : <ChevronRail />;
}
