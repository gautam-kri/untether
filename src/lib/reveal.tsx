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
