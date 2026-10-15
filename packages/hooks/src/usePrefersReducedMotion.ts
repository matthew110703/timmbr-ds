import { useMediaQuery } from './useMediaQuery';

/**
 * Returns true when the OS / browser has prefers-reduced-motion: reduce set.
 * Components should treat this as a signal to skip or minimise animations.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
