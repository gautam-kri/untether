interface KickerProps {
  children: React.ReactNode;
  className?: string;
  /** Omit the leading rule (used where a kicker doubles as a role label). */
  noRule?: boolean;
}

/** Small red label above a heading, preceded by a 24px accent rule. */
export default function Kicker({ children, className, noRule }: KickerProps) {
  return (
    <p
      className={`flex items-center gap-3 font-base uppercase text-accent ${className ?? ''}`}
      style={{ fontSize: '0.75rem', letterSpacing: '0.35em', fontWeight: 700 }}
    >
      {!noRule && (
        <span
          aria-hidden="true"
          className="inline-block h-px bg-accent"
          style={{ width: '24px' }}
        />
      )}
      <span>{children}</span>
    </p>
  );
}
