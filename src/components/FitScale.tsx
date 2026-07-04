import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Fits its content to the available height.
 *
 * - Content that fits (or fits when gently scaled to >= minScale) is scaled so
 *   the whole section sits on one screen and a single wheel/swipe advances.
 * - Content too dense to scale readably (e.g. mobile Products/Features, or the
 *   text-heavy Mission/CTA sections with a higher minScale) stays full size and
 *   scrolls internally; the wipe then advances at the scroll edge.
 */
export default function FitScale({
  children,
  className,
  minScale = 0.55,
}: {
  children: ReactNode;
  className?: string;
  /** Below this scale, scroll instead of shrinking (readability floor). */
  minScale?: number;
}) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [scroll, setScroll] = useState(false);

  useLayoutEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;

    const measure = () => {
      const avail = o.clientHeight;
      const natural = i.offsetHeight; // layout height — unaffected by transform
      if (!avail || !natural) return;
      const ideal = avail / natural;
      let nextScale = 1;
      let nextScroll = false;
      if (ideal < 1) {
        if (ideal >= minScale) nextScale = ideal;
        else nextScroll = true; // too dense to shrink — scroll instead
      }
      setScale((prev) => (Math.abs(prev - nextScale) > 0.003 ? nextScale : prev));
      setScroll((prev) => (prev !== nextScroll ? nextScroll : prev));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(o);
    ro.observe(i);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div
      ref={outer}
      data-fitscroll={scroll ? 'true' : 'false'}
      className={`u-fit flex w-full justify-center ${
        scroll ? 'items-start overflow-y-auto' : 'items-center overflow-hidden'
      } ${className ?? ''}`}
    >
      <div
        ref={inner}
        style={{
          transform: scale === 1 ? undefined : `scale(${scale})`,
          transformOrigin: 'center center',
          width: '100%',
        }}
      >
        {children}
      </div>
    </div>
  );
}
