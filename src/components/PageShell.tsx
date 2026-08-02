import { type ReactNode } from 'react';
import Footer from './Footer';

/** Standard scrolling page: navbar-safe padding, content, pinned footer.
 *  Route entrance transitions are handled globally by RouteWipeHost (App). */
export default function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col" style={{ paddingTop: 'var(--nav-total)' }}>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
