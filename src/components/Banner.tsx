import { Link } from 'react-router-dom';
import { SEATS_FILLED, TOTAL_SEATS } from '../config';

/** Thin site-wide design-partner banner pinned above the navbar. */
export default function Banner() {
  return (
    <div className="u-banner" role="region" aria-label="Design-partner cohort status">
      <Link
        to="/partners"
        data-cursor="link"
        className="u-annotation transition-colors duration-ui ease-mech hover:text-accent"
        style={{ padding: '4px 8px' }}
      >
        DESIGN-PARTNER COHORT — {SEATS_FILLED} OF {TOTAL_SEATS} SEATS FILLED
      </Link>
    </div>
  );
}
