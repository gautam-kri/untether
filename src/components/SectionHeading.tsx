import type { ElementType, ReactNode } from 'react';

interface SectionHeadingProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Render at hero-wordmark scale instead of the section-heading scale. */
  hero?: boolean;
}

/** Display heading in the TT2020 StyleB face at the section-heading scale. */
export default function SectionHeading({
  children,
  as: Tag = 'h2',
  className,
  hero,
}: SectionHeadingProps) {
  return (
    <Tag
      className={`u-display ${hero ? 'u-hero-wordmark' : 'u-section-heading'} ${className ?? ''}`}
    >
      {children}
    </Tag>
  );
}
