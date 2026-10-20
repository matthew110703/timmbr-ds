import { useState } from 'react';
import { useEventListener } from './useEventListener';

export interface WindowSize {
  width: number;
  height: number;
}

/**
 * Reactive window dimensions. Returns `{ width: 0, height: 0 }` on the server.
 */
export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>(() => {
    if (typeof window === 'undefined') return { width: 0, height: 0 };
    return { width: window.innerWidth, height: window.innerHeight };
  });

  useEventListener('resize', () => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  });

  return size;
}
