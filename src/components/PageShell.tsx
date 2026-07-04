import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useReducedMotion } from '../lib/hooks';
import { beginTransition, endTransition } from '../lib/transition';
import Footer from './Footer';

/** One fully-opaque 180vw panel swept left→right across on route entry. */
function RouteWipe() {
  const reduced = useReducedMotion();
  const [done, setDone] = useState(reduced);
  const ended = useRef(false);
  useEffect(() => {
    if (reduced) {
      setDone(true);
      return;
    }
    beginTransition();
    const end = () => {
      if (!ended.current) {
        ended.current = true;
        endTransition();
      }
    };
    const t = window.setTimeout(() => {
      setDone(true);
      end();
    }, 640);
    return () => {
      window.clearTimeout(t);
      end();
    };
  }, [reduced]);

  if (done) return null;
  return (
    <div aria-hidden="true" className="u-shutter-overlay z-[65]">
      <div
        className="u-route-shutter"
        style={{ animation: 'u-route-ltr var(--dur-route) var(--ease-shutter) both' }}
      />
    </div>
  );
}

/** Standard scrolling page: navbar-safe padding, content, pinned footer. */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col" style={{ paddingTop: 'var(--nav-total)' }}>
      <RouteWipe />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
