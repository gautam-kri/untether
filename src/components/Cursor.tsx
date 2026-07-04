import { useEffect, useRef, useState } from 'react';
import { useFinePointer, useReducedMotion } from '../lib/hooks';

type Mode = 'default' | 'active' | 'hidden';

const INTERACTIVE = 'a, button, [role="button"], [data-cursor="link"], summary, label';
const TEXT_INPUT = 'input, textarea, select';

/** Custom reticle cursor that lerps toward the pointer on fine-pointer devices. */
export default function Cursor() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const raf = useRef(0);
  const [mode, setMode] = useState<Mode>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!fine) return;
    document.body.classList.add('u-has-cursor');
    return () => {
      document.body.classList.remove('u-has-cursor');
    };
  }, [fine]);

  useEffect(() => {
    if (!fine) return;

    const apply = () => {
      const el = ref.current;
      if (el) el.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
    };

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
      if (reduced) {
        pos.current = { ...target.current };
        apply();
      }
      const t = e.target as Element | null;
      if (t?.closest(TEXT_INPUT)) setMode('hidden');
      else if (t?.closest(INTERACTIVE)) setMode('active');
      else setMode('default');
    };

    const onLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    if (!reduced) {
      const loop = () => {
        pos.current.x += (target.current.x - pos.current.x) * 0.18;
        pos.current.y += (target.current.y - pos.current.y) * 0.18;
        apply();
        raf.current = requestAnimationFrame(loop);
      };
      raf.current = requestAnimationFrame(loop);
    }

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [fine, reduced, visible]);

  if (!fine) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="u-cursor"
      data-mode={mode}
      style={{ opacity: visible && mode !== 'hidden' ? 1 : 0 }}
    >
      <span className="u-cursor-dot" />
      <span className="u-cursor-tick u-tick-t" />
      <span className="u-cursor-tick u-tick-r" />
      <span className="u-cursor-tick u-tick-b" />
      <span className="u-cursor-tick u-tick-l" />
      <span className="u-cursor-br u-br-tl" />
      <span className="u-cursor-br u-br-tr" />
      <span className="u-cursor-br u-br-br" />
      <span className="u-cursor-br u-br-bl" />
    </div>
  );
}
