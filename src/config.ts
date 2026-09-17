/**
 * Site-wide configuration constants.
 *
 * All manually-edited values (copy, pricing, seat counts, external URLs)
 * live here so they can be updated in one place without touching
 * individual components. Several values are still placeholders — see the
 * TODO/placeholder comments for items that need wiring to a backend or
 * replacing with live URLs before launch.
 *
 * @module config
 */

// Design-partner cohort — seat counter.
// TODO: wire SEATS_FILLED to the leads/payments backend once live.
export const SEATS_FILLED = 0;
export const TOTAL_SEATS = 10;

// Monthly price for the design-partner cohort (Untether Cloud tier).
export const PARTNER_PRICE = '$300/mo';

// Single contact email constant. Site domain is untether.in.
export const CONTACT_EMAIL = 'hello@untether.in';

// Placeholder — replace with the real hallway-demo embed URL.
export const DEMO_VIDEO_URL = '';

// Plausible analytics (placeholder domain — update to the live domain).
export const PLAUSIBLE_DOMAIN = 'untether.in';

// Open foundations / security whitepaper links (placeholders).
export const GITHUB_URL = 'https://github.com/untether';
export const WHITEPAPER_PDF_URL = '#';
// Memory patent page — placeholder until the patent page exists.
export const PATENT_URL = '#';

// Legal — blank placeholder PDFs in /public until the real documents land.
export const PRIVACY_PDF_URL = '/privacy-policy.pdf';
export const TERMS_PDF_URL = '/terms.pdf';

// Tiers — commodity hardware, our software.
export interface Tier {
  name: string;
  /** Amount for a purchasable tier, or a status line ("COMING SOON") otherwise. */
  price: string;
  /** Call to action shown beside the amount, e.g. "ORDER NOW". */
  sub?: string;
  badge: string;
  body: string;
  /** Rendered with the accent border, band and FLAGSHIP tag. */
  flagship?: boolean;
}
export const TIERS: Tier[] = [
  {
    name: 'UNTETHER CLOUD',
    price: 'COMING SOON',
    badge: 'YOUR PRIVACY, OUR PRIORITY',
    body: 'The full chief of staff, hosted on dedicated infrastructure keyed to you. The fastest way in — no hardware to rack.',
  },
  {
    name: 'UNTETHER BRIDGE',
    price: 'COMING SOON',
    badge: 'YOUR DATA, YOUR RULES. WE JUST RUN COMPUTE',
    body: 'A home node holds your memory and keys. We run your inference, layered with end-to-end encryption, and complete privacy. Your history stays under your roof.',
  },
  {
    name: 'UNTETHER VAULT',
    price: '$4,999',
    sub: 'ORDER NOW',
    badge: 'YOUR DATA, YOUR HARDWARE, YOUR COMPUTE',
    body: 'A sealed appliance that runs perception, reasoning, and memory entirely in your home. Not one byte leaves.',
    flagship: true,
  },
];

// Hex register — the side rail on the last landing section (Mission).
// Twelve words, shown top to bottom; `accent` is the index drawn in red.
// Encode whatever you like here; the rail renders exactly these strings.
export const HEX_REGISTER = {
  values: ['A17F', '0X3B', '44C2', 'FE01', '9D08', '1B77', 'C4E0', '552A', 'B9F3', '081D', '7E66', 'D30C'],
  accent: 6,
} as const;

// Founder profile links (placeholders — replace with real URLs).
// GitHub is intentionally inert for now (empty → rendered as a non-navigating link).
export const FOUNDER_LINKS = {
  gautam: {
    github: '',
    linkedin: 'https://www.linkedin.com/in/mr-gautam-krishna/',
  },
  harish: {
    github: '',
    linkedin: 'https://www.linkedin.com/in/harish-senthilkumar/',
  },
} as const;
