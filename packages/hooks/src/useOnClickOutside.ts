import { type RefObject } from 'react';
import { useEventListener } from './useEventListener';

/**
 * Calls `handler` when a `mousedown` or `touchstart` event occurs outside
 * the element referenced by `ref`.
 */
export function useOnClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: MouseEvent | TouchEvent) => void,
): void {
  useEventListener('mousedown', (event) => {
    if (!ref.current || ref.current.contains(event.target as Node)) return;
    handler(event);
  });

  useEventListener('touchstart', (event) => {
    if (!ref.current || ref.current.contains(event.target as Node)) return;
    handler(event);
  });
}
