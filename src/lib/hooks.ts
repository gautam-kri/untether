/**
 * Responsive media-query React hooks.
 *
 * Provides SSR-safe, reactive hooks for detecting pointer type and
 * motion preferences. Used throughout the site to conditionally enable
 * the custom cursor (fine pointer only) and to disable animations when
 * the user prefers reduced motion.
 *
 * @module hooks
 */
import { useEffect, useState } from 'react';

/** Tracks a CSS media query, SSR-safe and reactive to changes. */
export function useMediaQuery(query: string): boolean {
  const get = () =>
    typeof window !== 'undefined' && window.matchMedia(query).matches;
  const [matches, setMatches] = useState(get);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

/** True when the user has requested reduced motion. */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}

/** True on fine-pointer (mouse) devices, where the custom cursor mounts. */
export function useFinePointer(): boolean {
  return useMediaQuery('(pointer: fine)');
}
