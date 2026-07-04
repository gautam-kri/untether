import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { RevealProvider } from '../lib/reveal';
import { useReducedMotion } from '../lib/hooks';
import { landingNav } from '../lib/landingNav';
import { SECTIONS, indexForHash } from '../lib/sections';
import { REDUCED_DUR, REDUCED_LOCK, ShutterBars, SWAP_AT, TRANSITION_LOCK } from './wipe';
import { beginTransition, endTransition } from '../lib/transition';

interface WipeContainerProps {
  sections: { id: string; content: ReactNode }[];
}

/** Full-viewport section switcher: bars sweep, section swaps under full cover. */
export default function WipeContainer({ sections }: WipeContainerProps) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(() => indexForHash(window.location.hash));
  const [outgoing, setOutgoing] = useState<number | null>(null); // reduced-motion crossfade only
  const [transition, setTransition] = useState<{ dir: number; key: number } | null>(null);

  const activeRef = useRef(active);
  activeRef.current = active;
  const busyRef = useRef(false);
  const timers = useRef<number[]>([]);
  const wheelLock = useRef(0);
  const touchY = useRef<number | null>(null);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const goTo = useCallback(
    (target: number): boolean => {
      if (busyRef.current) return false;
      if (target < 0 || target >= sections.length) return false;
      if (target === activeRef.current) return false;

      const from = activeRef.current;
      const dir = target > from ? 1 : -1;
      busyRef.current = true;
      clearTimers();
      beginTransition();
      landingNav.setAnimating(true);
      landingNav.setIndex(target); // progress nav advances at transition start
      window.history.replaceState(null, '', SECTIONS[target].hash);

      if (reduced) {
        setOutgoing(from);
        setActive(target);
        timers.current.push(
          window.setTimeout(() => {
            setOutgoing(null);
            busyRef.current = false;
            landingNav.setAnimating(false);
            endTransition();
          }, REDUCED_LOCK),
        );
        return true;
      }

      setTransition({ dir, key: Date.now() });
      // Instant swap under full cover — a visibility toggle on already-mounted
      // sections, run inside rAF so it lands cleanly between animation frames.
      timers.current.push(
        window.setTimeout(() => window.requestAnimationFrame(() => setActive(target)), SWAP_AT),
      );
      timers.current.push(
        window.setTimeout(() => {
          setTransition(null);
          busyRef.current = false;
          landingNav.setAnimating(false);
          endTransition();
        }, TRANSITION_LOCK),
      );
      return true;
    },
    [reduced, sections.length],
  );

  // Instant jump (used by the mobile menu, which plays its own sweep).
  const jump = useCallback((target: number) => {
    setTransition(null);
    setOutgoing(null);
    setActive(target);
    activeRef.current = target;
    landingNav.setIndex(target);
    window.history.replaceState(null, '', SECTIONS[target].hash);
  }, []);

  useEffect(() => {
    landingNav.register(goTo, jump);
    landingNav.setIndex(activeRef.current);
    return () => {
      clearTimers();
      landingNav.unregister();
    };
  }, [goTo, jump]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const onHash = () => {
      const i = indexForHash(window.location.hash);
      if (i !== activeRef.current) goTo(i);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof Element && e.target.closest('input, textarea, select')) return;
      let handled = true;
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
          goTo(activeRef.current + 1);
          break;
        case 'ArrowUp':
        case 'PageUp':
          goTo(activeRef.current - 1);
          break;
        case 'Home':
          goTo(0);
          break;
        case 'End':
          goTo(sections.length - 1);
          break;
        default:
          handled = false;
      }
      if (handled) e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goTo, sections.length]);

  // Dense sections (mostly mobile) scroll internally; only advance at the edge.
  const canAdvance = (down: boolean): boolean => {
    const secEl = document.getElementById(SECTIONS[activeRef.current].id);
    const sc = secEl?.querySelector('.u-fit') as HTMLElement | null;
    if (!sc || sc.getAttribute('data-fitscroll') !== 'true') return true;
    if (down) return sc.scrollTop + sc.clientHeight >= sc.scrollHeight - 2;
    return sc.scrollTop <= 2;
  };

  const onWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    if (now < wheelLock.current) return;
    if (Math.abs(e.deltaY) < 16) return;
    const down = e.deltaY > 0;
    if (!canAdvance(down)) return;
    if (goTo(activeRef.current + (down ? 1 : -1))) {
      wheelLock.current = now + 500;
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchY.current = e.touches[0].clientY;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchY.current === null) return;
    const dy = touchY.current - e.changedTouches[0].clientY;
    touchY.current = null;
    if (Math.abs(dy) <= 50) return;
    const down = dy > 0;
    if (canAdvance(down)) goTo(activeRef.current + (down ? 1 : -1));
  };

  return (
    <main
      className="relative overflow-hidden"
      style={{ height: '100dvh' }}
      onWheel={onWheel}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {sections.map((s, i) => {
        const isActive = i === active;
        const isOutgoing = reduced && i === outgoing;
        const visible = isActive || isOutgoing;
        return (
          <section
            key={s.id}
            id={s.id}
            aria-hidden={!isActive}
            className="absolute inset-0"
            style={{
              opacity: reduced ? (isActive ? 1 : 0) : 1,
              visibility: visible ? 'visible' : 'hidden',
              zIndex: isActive ? 2 : 1,
              transition: reduced ? `opacity ${REDUCED_DUR}ms var(--ease-mech)` : undefined,
            }}
          >
            <RevealProvider active={isActive}>{s.content}</RevealProvider>
          </section>
        );
      })}

      {transition && !reduced && (
        <ShutterBars key={transition.key} dir={transition.dir} className="z-50" />
      )}
    </main>
  );
}
