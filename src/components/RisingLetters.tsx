import { useReducedMotion } from '../lib/hooks';

interface RisingLettersProps {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
}

/** Renders text whose letters rise from a clipped baseline, staggered. */
export default function RisingLetters({
  text,
  className,
  stagger = 40,
  delay = 0,
}: RisingLettersProps) {
  const reduced = useReducedMotion();
  return (
    <span className={className} aria-label={text} style={{ display: 'inline-flex' }}>
      {text.split('').map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{ display: 'inline-block', overflow: 'hidden', lineHeight: 1.05 }}
        >
          <span
            style={{
              display: 'inline-block',
              animation: reduced
                ? 'none'
                : `u-letter-rise 650ms var(--ease-mech) ${delay + i * stagger}ms both`,
            }}
          >
            {ch === ' ' ? ' ' : ch}
          </span>
        </span>
      ))}
    </span>
  );
}
