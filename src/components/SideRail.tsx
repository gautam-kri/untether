/**
 * Left-hand side rails, from the design kit's side ornaments.
 *
 * Variants share one fixed slot on the left edge, mirroring `ProgressNav`
 * on the right, and hide below 900px like it does:
 *
 * - `RulerRail`   (S1) — tick rail whose accent line tracks scroll
 *                  position. Bound to a specific scroll container when one
 *                  is given, otherwise to the window.
 * - `ChevronRail` (S3) — a column of chevrons, no accent anywhere.
 * - `HexRail`     (S5) — a hex register, values editable in `config.ts`.
 *
 * Two pickers choose between them:
 *
 * - `LandingRail` — per landing section: the last gets the hex register; a
 *   section scrolling internally (its `FitScale` fell back to
 *   `data-fitscroll="true"`) gets the ruler bound to that scroller; one
 *   that fits gets chevrons.
 * - `PageRail` — per route page (`PageShell`): a page that scrolls gets the
 *   ruler, a page that fits on one screen gets the hex register.
 *
 * Geometry lives in `styles/design-import.css` under `.u-rail*`.
 *
 * @module SideRail
 */
import { useEffect, useRef, useState, type RefObject } from 'react';
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

/**
 * Keeps a fixed rail clear of the footer.
 *
 * The rail is positioned against the viewport, so it knows nothing about the
 * footer and would otherwise draw straight over it. This measures how far the
 * footer intrudes into the viewport and writes that to `--rail-lift`, which
 * `.u-rail` adds to its bottom offset — so the rail is full height while the
 * footer is off screen and shortens only as the footer comes into view.
 *
 * Only for rails whose page genuinely has a visible footer: on the landing
 * page every section stays mounted, so Mission's footer is in the DOM (and
 * measurable) even while another section is showing.
 */
function useFooterLift(ref: RefObject<HTMLDivElement>, enabled: boolean) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    const footer = document.querySelector('footer');
    if (!footer) return;

    let raf = 0;
    const measure = () => {
      raf = 0;
      const overlap = Math.max(0, window.innerHeight - footer.getBoundingClientRect().top);
      el.style.setProperty('--rail-lift', `${Math.round(overlap)}px`);
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    // Capture phase: `scroll` does not bubble, so this catches the window and
    // any nested scroller alike.
    document.addEventListener('scroll', schedule, { capture: true, passive: true });
    window.addEventListener('resize', schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(footer);
    return () => {
      document.removeEventListener('scroll', schedule, { capture: true });
      window.removeEventListener('resize', schedule);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, enabled]);
}

/** S1 — ticks with an accent line that follows scroll progress. */
export function RulerRail({ scroller = null }: { scroller?: Element | null }) {
  const root = useRef<HTMLDivElement>(null);
  const marker = useRef<HTMLSpanElement>(null);
  // Only the window-bound ruler shares a page with a visible footer; the
  // landing variants are bound to a section's own scroller.
  useFooterLift(root, !scroller);

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
    <div ref={root} className="u-rail" aria-hidden="true">
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

/** S5 — hex register. Edit `HEX_REGISTER` in config.ts to encode something. */
export function HexRail() {
  const root = useRef<HTMLDivElement>(null);
  // Both its homes — Mission and a non-scrolling route page — show a footer.
  useFooterLift(root, true);

  return (
    <div ref={root} className="u-rail" aria-hidden="true">
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

/**
 * Route pages: a scroll-tracking ruler is meaningless on a page that fits on
 * one screen (Contact), so those get the hex register instead. Measured
 * rather than hardcoded per route, and re-measured on resize, since whether
 * a page scrolls depends on the viewport.
 */
export function PageRail() {
  const [scrolls, setScrolls] = useState(true);

  useEffect(() => {
    const check = () => {
      const el = document.scrollingElement ?? document.documentElement;
      // A few px of tolerance for sub-pixel rounding.
      setScrolls(el.scrollHeight - el.clientHeight > 4);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(document.body);
    window.addEventListener('resize', check);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', check);
    };
  }, []);

  return scrolls ? <RulerRail /> : <HexRail />;
}
