import { PATENT_URL, PRIVACY_PDF_URL, TERMS_PDF_URL, WHITEPAPER_PDF_URL } from '../config';

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

        {/* Two tiers: the product links lead; the legal links sit beneath them,
            a step smaller and dimmer. */}
        <nav
          className="flex w-full flex-col items-center gap-2 sm:w-auto sm:items-end"
          aria-label="Footer"
        >
          {/* Never wraps: on narrow screens the size, tracking and gap step down so both fit one line. */}
          <div className="flex flex-nowrap items-center justify-center gap-4 sm:gap-6">
            <a href={WHITEPAPER_PDF_URL} className="u-annotation u-hit whitespace-nowrap transition-colors text-xs tracking-[0.12em] sm:text-sm sm:tracking-[0.2em] duration-ui ease-mech hover:text-accent" data-cursor="link">
              SECURITY WHITEPAPER
            </a>
            <a href={PATENT_URL} className="u-annotation u-hit whitespace-nowrap transition-colors text-xs tracking-[0.12em] sm:text-sm sm:tracking-[0.2em] duration-ui ease-mech hover:text-accent" data-cursor="link">
              MEMORY PATENT
            </a>
          </div>
          <div className="flex flex-nowrap items-center justify-center gap-5" style={{ opacity: 0.7 }}>
            <a
              href={PRIVACY_PDF_URL}
              target="_blank"
              rel="noreferrer"
              className="u-annotation u-hit transition-colors duration-ui ease-mech hover:text-accent"
              data-cursor="link"
            >
              PRIVACY POLICY
            </a>
            <a
              href={TERMS_PDF_URL}
              target="_blank"
              rel="noreferrer"
              className="u-annotation u-hit transition-colors duration-ui ease-mech hover:text-accent"
              data-cursor="link"
            >
              TERMS &amp; CONDITIONS
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
}
