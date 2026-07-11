import { DEMO_VIDEO_URL } from '../config';

function PlayChip() {
  return (
    <span
      className="inline-flex items-center gap-3 rounded-sm border border-hairline transition-colors duration-ui ease-mech hover:border-accent"
      style={{ height: '44px', padding: '0 18px' }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <circle cx="9" cy="9" r="8" fill="none" stroke="var(--accent-red)" strokeWidth="1.25" />
        <path d="M7 5.5 L13 9 L7 12.5 Z" fill="var(--accent-red)" />
      </svg>
      <span className="u-annotation">WATCH THE 90-SECOND DEMO</span>
    </span>
  );
}

/** Compact 90-second demo affordance. Links to the embed once DEMO_VIDEO_URL is set. */
export default function DemoVideo() {
  if (DEMO_VIDEO_URL) {
    return (
      <a href={DEMO_VIDEO_URL} target="_blank" rel="noreferrer" data-cursor="link" className="inline-block">
        <PlayChip />
      </a>
    );
  }
  return <PlayChip />;
}
