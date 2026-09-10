/**
 * Root application layout.
 *
 * Renders the global chrome (custom cursor, banner, navbar) and all
 * client-side routes. Route transitions are coordinated through
 * `RouteWipeHost`, which intercepts internal `<a>` clicks and plays
 * the shutter-bar wipe animation before the actual navigation occurs.
 *
 * @module App
 */
import { useEffect, useRef, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import Cursor from './components/Cursor';
import Landing from './pages/Landing';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Trust from './sections/TrustSection';
import Memory from './pages/Memory';
import Partners from './pages/Partners';
import Faq from './pages/Faq';
import { ShutterBars, SWAP_AT, TRANSITION_LOCK } from './components/wipe';
import { beginTransition, endTransition } from './lib/transition';
import { routeWipe } from './lib/routeWipe';
import { useReducedMotion } from './lib/hooks';

/**
 * Services cover-first route transitions and intercepts internal link clicks so
 * every page change plays the shutter: bars sweep in over the CURRENT page, the
 * route swaps under full cover, then the bars sweep out to reveal the new page.
 */
function RouteWipeHost() {
  const navigate = useNavigate();
  const location = useLocation();
  const reduced = useReducedMotion();
  const [sweep, setSweep] = useState<{ dir: number; key: number } | null>(null);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  // Perform a wipe when one is requested.
  useEffect(
    () =>
      routeWipe.subscribe((req) => {
        if (reduced) {
          navigate(req.to);
          window.scrollTo(0, 0);
          return;
        }
        clearTimers();
        beginTransition();
        setSweep({ dir: req.dir, key: req.key });
        timers.current.push(
          window.setTimeout(() => {
            navigate(req.to);
            window.scrollTo(0, 0);
          }, SWAP_AT),
        );
        timers.current.push(
          window.setTimeout(() => {
            setSweep(null);
            endTransition();
          }, TRANSITION_LOCK),
        );
      }),
    [reduced, navigate],
  );

  useEffect(() => () => clearTimers(), []);

  // Capture-phase interceptor: route internal <a> navigations through the wipe.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const a = (e.target as HTMLElement | null)?.closest('a');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('/') || href.startsWith('//')) return;
      // Same page → let the element's own handler run (e.g. logo → hero section).
      if (href === location.pathname) return;
      e.preventDefault();
      e.stopPropagation();
      routeWipe.go(href, 1);
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [location.pathname]);

  return sweep ? <ShutterBars key={sweep.key} dir={sweep.dir} className="z-[60]" /> : null;
}

/**
 * Root component rendered by `main.tsx`.
 *
 * Composes the persistent global chrome (Cursor, Banner, Navbar) with
 * the route outlet. `RouteWipeHost` is a sibling of `<Routes>` so it
 * can intercept link clicks, play the cover-first shutter animation,
 * then navigate under full cover.
 */
export default function App() {
  return (
    <>
      <Cursor />
      {/*<Banner />*/}
      <Navbar />
      <RouteWipeHost />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/memory" element={<Memory />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </>
  );
}
