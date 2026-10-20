import { useEffect, useState } from 'react';
import { useDebouncedCallback } from './useDebouncedCallback';

/**
 * Returns a debounced copy of `value` that only updates after `delay` ms of
 * inactivity. Cancels any pending update on unmount.
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const setDebounced = useDebouncedCallback(setDebouncedValue, delay);

  useEffect(() => {
    setDebounced(value);
  }, [value, setDebounced]);

  return debouncedValue;
}
