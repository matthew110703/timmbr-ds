import { type RefObject, useEffect, useRef } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

// Overload: window target (no element arg)
export function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: undefined,
  options?: AddEventListenerOptions,
): void;

// Overload: HTMLElement target
export function useEventListener<
  K extends keyof HTMLElementEventMap,
  T extends HTMLElement = HTMLDivElement,
>(
  eventName: K,
  handler: (event: HTMLElementEventMap[K]) => void,
  element: RefObject<T> | T | null,
  options?: AddEventListenerOptions,
): void;

// Overload: Document target
export function useEventListener<K extends keyof DocumentEventMap>(
  eventName: K,
  handler: (event: DocumentEventMap[K]) => void,
  element: RefObject<Document>,
  options?: AddEventListenerOptions,
): void;

/**
 * Attach a typed event listener to `window`, a `Document`, or an `HTMLElement`.
 * The handler ref is always fresh — no need to memoize the handler at the call site.
 */
export function useEventListener<
  KW extends keyof WindowEventMap,
  KE extends keyof HTMLElementEventMap,
  KD extends keyof DocumentEventMap,
  T extends HTMLElement = HTMLDivElement,
>(
  eventName: KW | KE | KD,
  handler: (
    event: WindowEventMap[KW] | HTMLElementEventMap[KE] | DocumentEventMap[KD] | Event,
  ) => void,
  element?: RefObject<T | Document> | T | null,
  options?: AddEventListenerOptions,
): void {
  const handlerRef = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  });

  useEffect(() => {
    const target: EventTarget | null =
      element === undefined || element === null
        ? window
        : 'current' in element
          ? element.current
          : element;

    if (!target || !target.addEventListener) return;

    const listener = (event: Event) => handlerRef.current(event as never);
    target.addEventListener(eventName, listener, options);
    return () => target.removeEventListener(eventName, listener, options);
  }, [eventName, element, options]);
}
