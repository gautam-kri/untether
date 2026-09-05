/**
 * Reveal coordination for illustration draw-on animations.
 *
 * Provides a dual-mode reveal system:
 *
 * 1. **Context-driven** (landing page) — `RevealProvider` wraps each
 *    wipe section. Illustrations use `useReveal()` which reads the
 *    context and triggers the draw-on when the section becomes active.
 *
 * 2. **Intersection-driven** (scrolling pages) — When no provider is
 *    present (`ctx === null`), `useReveal()` falls back to an
 *    `IntersectionObserver` and reveals the illustration when it
 *    scrolls into view (15% threshold).
 *
 * Both modes latch — once revealed, an illustration never resets.
 *
 * The `Reveal` component is a thin layout wrapper retained for
 * call-site compatibility; it no longer applies entrance animations
 * (those are handled entirely by the shutter-bar system now).
 *
 * @module reveal
 */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ElementType,
  type ReactNode,
} from 'react';

/**
 * Draw-on reveal coordination (illustration stroke draw-on only).
 *
 * `null`  → the consumer watches its own viewport intersection (scrolling pages).
 * `true`  → reveal now (this section is shown).
 * `false` → not yet revealed.
 */
const RevealContext = createContext<boolean | null>(null);

export function RevealProvider({ active, children }: { active: boolean; children: ReactNode }) {
  return <RevealContext.Provider value={active}>{children}</RevealContext.Provider>;
}

/** Returns true once the element has been revealed; latches and never resets. */
export function useReveal(ref: React.RefObject<Element>): boolean {
  const ctx = useContext(RevealContext);
  const [seen, setSeen] = useState(ctx === true);

  useEffect(() => {
    if (ctx !== null) {
      if (ctx) setSeen(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ctx, ref]);

  return seen;
}

interface RevealProps {
  children: ReactNode;
  /** Retained for call-site compatibility; content no longer animates. */
  index?: number;
  as?: ElementType;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Layout wrapper. Section and route transitions are driven entirely by the
 * shutter bars now, so this renders its children with no entrance animation.
 */
export function Reveal({ children, as: Tag = 'div', className, style }: RevealProps) {
  return (
    <Tag className={className} style={style}>
      {children}
    </Tag>
  );
}
