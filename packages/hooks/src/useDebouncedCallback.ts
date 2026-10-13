import { useCallback, useEffect, useMemo, useRef } from 'react';

export interface DebouncedCallback<Args extends unknown[]> {
  (...args: Args): void;
  /** Runs a pending call now. */
  flush: () => void;
  /** Drops a pending call. */
  cancel: () => void;
  /** Whether a call is waiting. */
  isPending: () => boolean;
}

/**
 * A stable function that calls `callback` once calls stop for `delay` ms, with the latest
 * arguments. The newest `callback` is always used, and a pending call is dropped on unmount.
 */
export function useDebouncedCallback<Args extends unknown[]>(
  callback: (...args: Args) => void,
  delay: number
): DebouncedCallback<Args> {
  const callbackRef = useRef(callback);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const argsRef = useRef<Args | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const cancel = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    argsRef.current = null;
  }, []);

  const flush = useCallback(() => {
    if (!timerRef.current || !argsRef.current) return;
    const args = argsRef.current;
    cancel();
    callbackRef.current(...args);
  }, [cancel]);

  useEffect(() => cancel, [cancel]);

  return useMemo(() => {
    const debounced = ((...args: Args) => {
      argsRef.current = args;
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        timerRef.current = null;
        const latest = argsRef.current;
        argsRef.current = null;
        if (latest) callbackRef.current(...latest);
      }, delay);
    }) as DebouncedCallback<Args>;
    debounced.flush = flush;
    debounced.cancel = cancel;
    debounced.isPending = () => timerRef.current !== null;
    return debounced;
  }, [delay, flush, cancel]);
}
