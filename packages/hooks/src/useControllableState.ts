import { useState, useCallback, useRef, useEffect } from 'react';

export interface UseControllableStateProps<T> {
  value?: T;
  defaultValue?: T | (() => T);
  onChange?: (value: T) => void;
}

/**
 * Hook to support both controlled and uncontrolled component state patterns.
 */
export function useControllableState<T>({
  value: controlledValue,
  defaultValue,
  onChange,
}: UseControllableStateProps<T>): [T, (nextValue: T | ((prev: T) => T)) => void] {
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<T>(defaultValue as T);

  const onChangeRef = useRef(onChange);
  useEffect(() => {
    onChangeRef.current = onChange;
  });

  const value = isControlled ? (controlledValue as T) : internalValue;

  const setValue = useCallback(
    (nextValue: T | ((prev: T) => T)) => {
      const resolvedValue =
        typeof nextValue === 'function'
          ? (nextValue as (prev: T) => T)(value)
          : nextValue;

      if (!isControlled) {
        setInternalValue(resolvedValue);
      }
      onChangeRef.current?.(resolvedValue);
    },
    [isControlled, value]
  );

  return [value, setValue];
}
