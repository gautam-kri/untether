import { Link } from 'react-router-dom';

/** Footer strip: brand mark, copyright line, and route links over a hairline. */
export default function Footer() {
  return (
    <footer
      className="border-t border-hairline w-full"
      style={{ paddingTop: '20px', paddingBottom: 'calc(20px + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 px-6 text-center sm:flex-row sm:justify-between sm:text-left">

        <p className="u-annotation order-3 sm:order-none">
          © 2026 UNTETHER · BUILT LOCALLY IN CHENNAI.
        </p>

        <nav className="flex w-full items-center justify-center gap-6 sm:w-auto" aria-label="Footer">
          <Link
            to="/#trust"
            className="u-annotation u-hit transition-colors text-sm duration-ui ease-mech hover:text-accent"
            data-cursor="link"
          >
            SECURITY WHITEPAPER
          </Link>
          <Link
            to="/memory"
            className="u-annotation u-hit transition-colors text-sm duration-ui ease-mech hover:text-accent"
            data-cursor="link"
          >
            MEMORY SYSTEM
          </Link>
        </nav>
      </div>
    </footer>
  );
}
