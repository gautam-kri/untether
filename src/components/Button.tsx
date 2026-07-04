import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary';

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  className?: string;
}

interface LinkButtonProps extends CommonProps {
  to: string;
  onClick?: never;
  type?: never;
}
interface ActionButtonProps extends CommonProps {
  to?: never;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

type ButtonProps = LinkButtonProps | ActionButtonProps;

const base =
  'inline-flex items-center justify-center rounded-sm font-base uppercase transition-colors duration-ui ease-mech select-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-accent text-ink border-[1.5px] border-accent hover:bg-line hover:border-line',
  secondary:
    'bg-transparent text-accent border-[1.5px] border-accent hover:bg-accent hover:text-ink',
};

/** Shared CTA button: renders a router link or an action button. */
export default function Button(props: ButtonProps) {
  const { children, variant = 'primary', className } = props;
  const cls = `${base} ${variants[variant]} ${className ?? ''}`;
  const style = {
    height: '44px',
    padding: '0 22px',
    fontSize: '0.6875rem',
    letterSpacing: '0.2em',
    fontWeight: 700,
  } as const;

  if ('to' in props && props.to !== undefined) {
    return (
      <Link to={props.to} className={cls} style={style}>
        {children}
      </Link>
    );
  }
  return (
    <button
      type={props.type ?? 'button'}
      onClick={props.onClick}
      className={cls}
      style={style}
    >
      {children}
    </button>
  );
}
