/**
 * Site-wide config. Manually-edited values live here so copy and the
 * reservation counter can be updated without touching components.
 */

// The First Thousand — reservation counter.
// TODO: wire RESERVED_COUNT to the payments backend (Razorpay) once live.
export const RESERVED_COUNT = 0;
export const TOTAL_PLACES = 1000;

export const RESERVE_PRICE = '₹999';
export const FOUNDERS_EMAIL = 'founders@untether.in';

// Placeholder — replace with the real 90-second demo embed URL.
export const DEMO_VIDEO_URL = '';

// Plausible analytics (placeholder domain — update to the live domain).
export const PLAUSIBLE_DOMAIN = 'untether.in';

// Open foundations / threat model links (placeholders).
export const GITHUB_URL = 'https://github.com/untether';
export const THREAT_MODEL_PDF_URL = '#';

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
