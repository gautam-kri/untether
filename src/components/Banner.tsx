import { Link } from 'react-router-dom';
import { RESERVED_COUNT, TOTAL_PLACES } from '../config';

/** Thin site-wide reservation banner pinned above the navbar. */
export default function Banner() {
  return (
    <div className="u-banner" role="region" aria-label="Reservation status">
      <Link
        to="/reserve"
        data-cursor="link"
        className="u-annotation transition-colors duration-ui ease-mech hover:text-accent"
        style={{ padding: '4px 8px' }}
      >
        THE FIRST THOUSAND — {RESERVED_COUNT} OF {TOTAL_PLACES.toLocaleString('en-IN')} PLACES
        RESERVED
      </Link>
    </div>
  );
}
