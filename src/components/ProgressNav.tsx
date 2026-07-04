import { landingNav, useLandingIndex } from '../lib/landingNav';
import { SECTIONS } from '../lib/sections';

const GAP = 48;
const R = 5;
const N = SECTIONS.length;
const TRACK = GAP * (N - 1);

/** Fixed right-side progress navigator for the landing page. */
export default function ProgressNav() {
  const active = useLandingIndex();

  return (
    <nav className="u-prognav" aria-label="Section progress">
      <ol
        className="relative m-0 list-none p-0"
        style={{ height: TRACK + R * 2, width: 12 }}
      >
        {/* Track */}
        <span
          aria-hidden="true"
          className="absolute"
          style={{
            left: '50%',
            top: R,
            height: TRACK,
            width: 1.5,
            transform: 'translateX(-50%)',
            background: 'var(--hairline)',
          }}
        />
        {/* Progress fill */}
        <span
          aria-hidden="true"
          className="absolute"
          style={{
            left: '50%',
            top: R,
            height: (active / (N - 1)) * TRACK,
            width: 1.5,
            transform: 'translateX(-50%)',
            background: 'var(--accent-red)',
            transition: 'height 350ms var(--ease-mech)',
          }}
        />

        {SECTIONS.map((s, i) => {
          const state = i === active ? 'active' : i < active ? 'passed' : 'idle';
          const fill =
            state === 'active'
              ? 'var(--accent-red)'
              : state === 'passed'
                ? 'var(--blend-teal)'
                : 'transparent';
          return (
            <li
              key={s.id}
              className="absolute"
              style={{ left: '50%', top: R + i * GAP, transform: 'translate(-50%, -50%)' }}
            >
              <button
                type="button"
                className="u-prognav-btn"
                aria-label={s.navLabel}
                aria-current={state === 'active' ? 'true' : undefined}
                onClick={() => landingNav.goTo(i)}
              >
                <span className="u-prognav-label u-annotation">{s.navLabel}</span>
                <span className="u-prognav-dot" style={{ background: fill }} />
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
