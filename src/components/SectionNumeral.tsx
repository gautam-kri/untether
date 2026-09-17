/**
 * Section numeral — the big stroked watermark in a section's top-right.
 *
 * Placed so its cap-top is flush with the cap-top of the section HEADING
 * (the display text below the kicker), whatever sits above that heading.
 * Rather than hardcoding the kicker/eye/margin stack — which differs per
 * section and drifts with any spacing change — it measures the heading and
 * derives both cap-tops from Anton's metrics (ascent 1.176, descent 0.329,
 * cap height 0.859, all in em) at each element's own line-height. Rects
 * are read inside `FitScale`'s scaled subtree, so the measured offset is
 * divided back by that scale before it is written as layout pixels.
 * Re-measures on resize. Without JS it falls back to the CSS `top`.
 *
 * Must be a direct child of the section's content container, alongside the
 * heading it aligns to (`.u-section-heading`).
 *
 * @module SectionNumeral
 */
import { useEffect, useRef } from 'react';

const ANTON_CONTENT = 1.176 + 0.329;
const ANTON_ASC_MINUS_CAP = 1.176 - 0.859;

/** Distance from an Anton element's box top to its cap-top, in em, at `lh`. */
const capTop = (lh: number) => (lh - ANTON_CONTENT) / 2 + ANTON_ASC_MINUS_CAP;

export default function SectionNumeral({ n }: { n: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const box = el?.parentElement;
    const heading = box?.querySelector<HTMLElement>('.u-section-heading');
    if (!el || !box || !heading) return;

    const place = () => {
      const hs = getComputedStyle(heading);
      const ns = getComputedStyle(el);
      const hSize = parseFloat(hs.fontSize);
      const nSize = parseFloat(ns.fontSize);
      const hLh = parseFloat(hs.lineHeight) / hSize;
      const nLh = parseFloat(ns.lineHeight) / nSize;
      const boxRect = box.getBoundingClientRect();
      const scale = box.offsetWidth ? boxRect.width / box.offsetWidth : 1;
      const headingTop = (heading.getBoundingClientRect().top - boxRect.top) / scale;
      el.style.top = `${headingTop + capTop(hLh) * hSize - capTop(nLh) * nSize}px`;
    };

    place();
    const ro = new ResizeObserver(place);
    ro.observe(box);
    ro.observe(heading);
    window.addEventListener('resize', place);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', place);
    };
  }, []);

  return (
    <div ref={ref} className="u-watermark" aria-hidden="true">
      {n}
    </div>
  );
}
