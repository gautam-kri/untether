/**
 * Site-wide config. Manually-edited values live here so copy and the
 * design-partner counter can be updated without touching components.
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

// Tiers — commodity hardware, our software.
export interface Tier {
  name: string;
  price: string;
  sub?: string;
  badge: string;
  body: string;
}
export const TIERS: Tier[] = [
  {
    name: 'UNTETHER CLOUD',
    price: '$300/mo',
    badge: 'START HERE',
    body: 'The full chief of staff, hosted on dedicated infrastructure keyed to you. The fastest way in — no hardware to rack.',
  },
  {
    name: 'UNTETHER BRIDGE',
    price: '$400/mo',
    sub: '+ home node',
    badge: 'YOUR DATA, HOME',
    body: 'A home node holds your memory and keys; compute bursts to your dedicated cloud only when it must. Your history stays under your roof.',
  },
  {
    name: 'UNTETHER VAULT',
    price: '$3–5K appliance',
    sub: '+ $500/mo',
    badge: 'FLAGSHIP',
    body: 'A sealed appliance that runs perception, reasoning, and memory entirely in your home. Not one byte leaves.',
  },
];

// Founder profile links (placeholders — replace with real URLs).
export const FOUNDER_LINKS = {
  gautam: {
    github: 'https://github.com/gautam-kri',
    linkedin: 'https://www.linkedin.com/in/gautam-krishna',
  },
  harish: {
    github: 'https://github.com/harish',
    linkedin: 'https://www.linkedin.com/in/harish-senthilkumar',
  },
} as const;
