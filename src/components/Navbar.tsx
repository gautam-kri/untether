import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import { landingNav, useLandingIndex, useLandingMounted } from '../lib/landingNav';
import { useReducedMotion } from '../lib/hooks';
import { SECTIONS } from '../lib/sections';
import { ShutterBars, SWAP_AT, TRANSITION_LOCK } from './wipe';
import { beginTransition, endTransition } from '../lib/transition';

const SECTION_LINKS = [
  { label: 'ABOUT', index: 1 },
  { label: 'PRODUCTS', index: 2 },
  { label: 'FEATURES', index: 3 },
  { label: 'MISSION', index: 4 },
];
const ROUTE_LINKS = [
  { label: 'TEAM', to: '/team' },
  { label: 'CONTACT', to: '/contact' },
];

function Underline({ show }: { show: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="absolute left-0 right-0"
      style={{
        bottom: '-8px',
        height: '2px',
        background: 'var(--accent-red)',
        opacity: show ? 1 : 0,
        transition: 'opacity var(--dur-ui) var(--ease-mech)',
      }}
    />
  );
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const reduced = useReducedMotion();
  const landingIndex = useLandingIndex();
  const landingMounted = useLandingMounted();
  const onLanding = location.pathname === '/';

  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState(false);
  const [sweep, setSweep] = useState<{ dir: number; key: number } | null>(null);
  const busy = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach((t) => window.clearTimeout(t));
    },
    [],
  );

  const openMenu = () => {
    if (busy.current) return;
    setOpen(true);
    if (reduced) {
      setPanel(true);
      return;
    }
    busy.current = true;
    beginTransition();
    setSweep({ dir: 1, key: Date.now() });
    // Reveal the panel while the bars fully cover the screen.
    timers.current.push(window.setTimeout(() => setPanel(true), SWAP_AT));
    timers.current.push(
      window.setTimeout(() => {
        setSweep(null);
        busy.current = false;
        endTransition();
      }, TRANSITION_LOCK),
    );
  };

  const closeMenu = (after?: () => void) => {
    if (busy.current) return;
    if (reduced) {
      setPanel(false);
      setOpen(false);
      after?.();
      return;
    }
    busy.current = true;
    beginTransition();
    setSweep({ dir: -1, key: Date.now() });
    timers.current.push(
      window.setTimeout(() => {
        setPanel(false);
        setOpen(false);
        after?.();
      }, SWAP_AT),
    );
    timers.current.push(
      window.setTimeout(() => {
        setSweep(null);
        busy.current = false;
        endTransition();
      }, TRANSITION_LOCK),
    );
  };

  const goHome = (e: React.MouseEvent) => {
    if (open) closeMenu();
    if (onLanding && landingMounted) {
      e.preventDefault();
      landingNav.goTo(0);
    }
  };

  const goSection = (index: number) => {
    if (onLanding && landingMounted) landingNav.goTo(index);
    else navigate({ pathname: '/', hash: SECTIONS[index].hash });
  };

  const menuSection = (index: number) =>
    closeMenu(() => {
      if (onLanding && landingMounted) landingNav.jump(index);
      else navigate({ pathname: '/', hash: SECTIONS[index].hash });
    });
  const menuRoute = (to: string) => closeMenu(() => navigate(to));

  const menuLinks = [
    ...SECTION_LINKS.map((l) => ({ label: l.label, onClick: () => menuSection(l.index) })),
    ...ROUTE_LINKS.map((l) => ({ label: l.label, onClick: () => menuRoute(l.to) })),
  ];

  return (
    <>
      <header className="u-navbar">
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-6">
          <Link
            to="/"
            onClick={goHome}
            className="u-hit flex items-center gap-3 text-body"
            data-cursor="link"
            aria-label="Untether home"
          >
            <Logo size={40} />
            <span className="u-display" style={{ fontSize: '1.5rem' }}>
              UNTETHER
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden items-center gap-9 min-[900px]:flex" aria-label="Primary">
            {SECTION_LINKS.map((l) => (
              <button
                key={l.label}
                type="button"
                onClick={() => goSection(l.index)}
                className="u-annotation u-hit transition-colors duration-ui ease-mech hover:text-accent"
                style={{ fontSize: '0.875rem' }}
                aria-current={onLanding && landingIndex === l.index ? 'true' : undefined}
              >
                <span className="relative inline-block">
                  {l.label}
                  <Underline show={onLanding && landingIndex === l.index} />
                </span>
              </button>
            ))}
            {ROUTE_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="u-annotation u-hit transition-colors duration-ui ease-mech hover:text-accent"
                style={{ fontSize: '0.875rem' }}
                aria-current={location.pathname === l.to ? 'page' : undefined}
              >
                <span className="relative inline-block">
                  {l.label}
                  <Underline show={location.pathname === l.to} />
                </span>
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => (open ? closeMenu() : openMenu())}
            className="u-annotation u-hit transition-colors duration-ui ease-mech hover:text-accent min-[900px]:hidden"
            style={{ fontSize: '0.875rem' }}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </header>

      {/* Full-screen mobile overlay — sibling of the (backdrop-filtered) header. */}
      {panel && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-[55] flex flex-col items-center justify-center gap-6 bg-ink"
        >
          {menuLinks.map((l) => (
            <button
              key={l.label}
              type="button"
              onClick={l.onClick}
              className="u-display u-section-heading transition-colors duration-ui ease-mech hover:text-accent"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}

      {sweep && <ShutterBars key={sweep.key} dir={sweep.dir} className="z-[60]" />}
    </>
  );
}
