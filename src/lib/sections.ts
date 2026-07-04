/** Ordered landing sections — drives the wipe system, progress nav and hash. */
export interface SectionMeta {
  id: string;
  hash: string;
  navLabel: string;
}

export const SECTIONS: SectionMeta[] = [
  { id: 'hero', hash: '#hero', navLabel: 'HERO' },
  { id: 'about', hash: '#about', navLabel: 'ABOUT' },
  { id: 'products', hash: '#products', navLabel: 'PRODUCTS' },
  { id: 'features', hash: '#features', navLabel: 'FEATURES' },
  { id: 'mission', hash: '#mission', navLabel: 'MISSION' },
  { id: 'contact-cta', hash: '#contact-cta', navLabel: 'CONTACT' },
];

export const SECTION_COUNT = SECTIONS.length;

export function indexForHash(hash: string): number {
  const clean = hash.replace(/^#/, '');
  const i = SECTIONS.findIndex((s) => s.hash === `#${clean}`);
  return i < 0 ? 0 : i;
}
