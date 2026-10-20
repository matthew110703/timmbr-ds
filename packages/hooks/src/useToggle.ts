import { useCallback, useState } from 'react';

/**
 * Boolean toggle with stable `toggle`, `setTrue`, and `setFalse` callbacks.
 * Returns `[value, toggle, setTrue, setFalse]`.
 */
export function useToggle(
  initialValue = false,
): [boolean, () => void, () => void, () => void] {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return [value, toggle, setTrue, setFalse];
}
