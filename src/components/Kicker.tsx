import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';

interface KickerProps {
  children: ReactNode;
  className?: string;
  /** Omit the leading rule (used where a kicker doubles as a role label). */
  noRule?: boolean;
}

/**
 * Small red label above a heading, preceded by a 24px accent rule.
 *
 * The label never wraps; instead it is uniformly scaled down (like
 * `FitScale`) whenever its natural width would exceed the space available,
 * so it always fits within its container/screen on one line.
 */
export default function Kicker({ children, className, noRule }: KickerProps) {
  const outer = useRef<HTMLParagraphElement>(null);
  const inner = useRef<HTMLSpanElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;

    const measure = () => {
      const avail = o.clientWidth;
      const natural = i.scrollWidth; // layout width — unaffected by transform
      if (!avail || !natural) return;
      const next = natural > avail ? avail / natural : 1;
      setScale((prev) => (Math.abs(prev - next) > 0.003 ? next : prev));
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
  }, [children]);

  return (
    <p
      ref={outer}
      className={`font-base uppercase text-accent overflow-hidden ${className ?? ''}`}
      style={{ fontSize: '1rem', letterSpacing: '0.15em', fontWeight: 500, lineHeight: 1 }}
    >
      <span
        ref={inner}
        className="inline-flex items-center gap-3"
        style={{
          whiteSpace: 'nowrap',
          transform: scale === 1 ? undefined : `scale(${scale})`,
          transformOrigin: 'left center',
        }}
      >
        {!noRule && (
          <span
            aria-hidden="true"
            className="inline-block h-0.5 shrink-0 bg-accent"
            style={{ width: '24px' }}
          />
        )}
        <span>{children}</span>
      </span>
    </p>
  );
}
