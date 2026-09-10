import type { ReactNode } from 'react';

/** Small bordered label in annotation style (used on product tiles). */
export default function Chip({ children }: { children: ReactNode }) {
  return (
    <span
      className="u-annotation inline-block rounded-sm border text-sm border-teal"
      style={{ padding: '4px 10px', fontFamily: 'TT2020 Base', fontWeight: 500 }}
    >
      {children}
    </span>
  );
}
