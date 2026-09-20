/**
 * Standard scrolling page layout shell.
 *
 * Wraps content in a standard flex column that ensures the footer is
 * pushed to the bottom of the viewport even if content is sparse.
 * Applies the necessary top padding to clear the fixed navbar and banner.
 * Used by all routes except the Landing page (which manages its own
 * full-viewport wiping sections).
 *
 * Route-level entrance animations (the shutter wipe) are handled
 * globally by `RouteWipeHost` in `App.tsx`, so this shell does not
 * define any entrance transitions itself.
 *
 * @module PageShell
 */
import { type ReactNode } from 'react';
import Footer from './Footer';
import { PageRail } from './SideRail';

/** Standard scrolling page: navbar-safe padding, content, pinned footer.
 *  Route entrance transitions are handled globally by RouteWipeHost (App). */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col" style={{ paddingTop: 'var(--nav-total)' }}>
      <PageRail />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
