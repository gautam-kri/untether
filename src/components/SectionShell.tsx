/**
 * Layout shell for full-viewport landing page sections.
 *
 * Wraps section content in a `FitScale` auto-scaler so it fits within
 * exactly one screen height, degrading gracefully to scroll on small
 * devices if the content is too dense. Sets the necessary padding to
 * clear the navbar and the bottom safe area.
 *
 * Also accepts an absolutely-positioned `bg` layer for decorative
 * backgrounds (like the hero glasses or motiffs) that sit behind
 * the scaling content layer.
 *
 * @module SectionShell
 */
import type { ReactNode } from 'react';
import FitScale from './FitScale';

interface SectionShellProps {
  children: ReactNode;
  /** Absolutely-positioned background layer (illustration / motif). */
  bg?: ReactNode;
  className?: string;
  /** Horizontally center the content column. */
  center?: boolean;
  /** Readability floor for the fit-scale (higher = scroll sooner on small screens). */
  fitMinScale?: number;
}

/** Full-height section scaffold: navbar-safe padding, content auto-fit to view. */
export default function SectionShell({
  children,
  bg,
  className,
  center,
  fitMinScale,
}: SectionShellProps) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className ?? ''}`}
      style={{
        paddingTop: 'calc(var(--nav-total) + 24px)',
        paddingBottom: 'calc(24px + env(safe-area-inset-bottom, 0px))',
      }}
    >
      {bg}
      <FitScale className="h-full" minScale={fitMinScale}>
        <div
          className={`relative mx-auto w-full max-w-7xl px-6 md:px-10 ${center ? 'text-center' : ''}`}
        >
          {children}
        </div>
      </FitScale>
    </div>
  );
}
