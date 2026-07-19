/** Ordered landing sections — drives the wipe system, progress nav and hash. */
export interface SectionMeta {
  id: string;
  hash: string;
  navLabel: string;
}

export const SECTIONS: SectionMeta[] = [
  { id: 'hero', hash: '#hero', navLabel: 'HERO' },
  { id: 'two-walls', hash: '#product', navLabel: 'PRODUCT' },
  { id: 'memory-receipts', hash: '#memory', navLabel: 'MEMORY' },
  { id: 'tiers', hash: '#tiers', navLabel: 'TIERS' },
  { id: 'mission', hash: '#mission', navLabel: 'MISSION' },
];

export const SECTION_COUNT = SECTIONS.length;

export function indexForHash(hash: string): number {
  const clean = hash.replace(/^#/, '');
  const i = SECTIONS.findIndex((s) => s.hash === `#${clean}`);
  return i < 0 ? 0 : i;
}
