import { useEffect, useRef } from 'react';

/**
 * Dominating hero visual: the product glasses fill the background; moving the
 * cursor slides a vertical boundary that "peels" the outer skin away to reveal
 * the wireframe internals underneath. Cursor-driven, smoothed with a rAF lerp.
 * Touch / coarse pointers just see the product shot.
 */
export default function HeroGlasses() {
  const boxRef = useRef<HTMLDivElement>(null);
  const target = useRef(0); // 0..1 boundary position
  const cur = useRef(0);
  const raf = useRef<number>();

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const onMove = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      target.current = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width));
    };
    const reset = () => {
      target.current = 0;
    };

    const tick = () => {
      cur.current += (target.current - cur.current) * 0.1;
      box.style.setProperty('--rx', (cur.current * 100).toFixed(2) + '%');
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('mouseleave', reset);
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('mouseleave', reset);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div className="u-hero-glasses" aria-hidden="true">
      <div ref={boxRef} className="u-hero-glasses-box">
        <img src="/images/hero-glasses-2k.webp" alt="" className="u-hg-skin" />
        <img src="/images/hero-wireframe-2k.webp" alt="" className="u-hg-wire" />
      </div>
    </div>
  );
}
