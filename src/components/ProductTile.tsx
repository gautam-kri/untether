import type { ReactNode } from 'react';
import Chip from './Chip';

interface ProductTileProps {
  illustration: ReactNode;
  chip: string;
  title: string;
  children: ReactNode;
}

/** Product card: illustration, chip, title and description. */
export default function ProductTile({ illustration, chip, title, children }: ProductTileProps) {
  return (
    <article className="u-tile flex h-full flex-col" style={{ padding: '32px' }}>
      <div className="flex items-center justify-center" style={{ height: '160px' }}>
        {illustration}
      </div>
      <div className="mt-6">
        <Chip>{chip}</Chip>
      </div>
      <h3 className="u-display u-tile-title mt-4">{title}</h3>
      <p className="u-body u-body-teal mt-3">{children}</p>
    </article>
  );
}
