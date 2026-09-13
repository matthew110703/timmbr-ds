import { useEffect, useState } from 'react';

/**
 * Returns true once the component has mounted on the client. Safe for SSR hydration guards.
 */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
