import { useCallback, useSyncExternalStore } from 'react';

const LOCAL_STORAGE_EVENT = 'timmbr:local-storage';

// Module-level listener registry — one Set per storage key.
const listeners = new Map<string, Set<() => void>>();

function getListeners(key: string): Set<() => void> {
  if (!listeners.has(key)) listeners.set(key, new Set());
  return listeners.get(key)!;
}

function notifyListeners(key: string) {
  getListeners(key).forEach((l) => l());
}

// One shared window-level 'storage' handler (cross-tab sync).
// Attached once when the first subscriber for any key is added.
let windowListenerAttached = false;

function ensureWindowListener() {
  if (windowListenerAttached || typeof window === 'undefined') return;
  windowListenerAttached = true;
  window.addEventListener('storage', (event) => {
    if (event.key) notifyListeners(event.key);
  });
}

function subscribe(key: string) {
  return (listener: () => void) => {
    ensureWindowListener();
    getListeners(key).add(listener);

    // Same-tab sync: listen for custom dispatch events.
    const handleCustomEvent = (event: Event) => {
      if ((event as CustomEvent<string>).detail === key) listener();
    };
    window.addEventListener(LOCAL_STORAGE_EVENT, handleCustomEvent);

    return () => {
      getListeners(key).delete(listener);
      window.removeEventListener(LOCAL_STORAGE_EVENT, handleCustomEvent);
    };
  };
}

function readFromStorage<T>(key: string, initialValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item !== null ? (JSON.parse(item) as T) : initialValue;
  } catch {
    return initialValue;
  }
}

function dispatchLocalStorageEvent(key: string) {
  try {
    window.dispatchEvent(new CustomEvent(LOCAL_STORAGE_EVENT, { detail: key }));
  } catch {
    // ignore in SSR / test environments
  }
}

/**
 * Reactive `localStorage` key/value hook with SSR safety and cross-tab sync.
 * Returns `[storedValue, setValue, removeValue]`.
 *
 * - Same-tab updates are reflected immediately across all hook instances with the same key.
 * - Cross-tab updates are reflected via the `storage` window event.
 * - Safe to call in private windows or environments without `localStorage` — falls back to `initialValue`.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): readonly [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const value = useSyncExternalStore(
    subscribe(key),
    () => readFromStorage(key, initialValue),
    () => initialValue,
  );

  const setValue = useCallback(
    (nextValue: T | ((prev: T) => T)) => {
      try {
        const current = readFromStorage(key, initialValue);
        const resolved =
          typeof nextValue === 'function'
            ? (nextValue as (prev: T) => T)(current)
            : nextValue;
        localStorage.setItem(key, JSON.stringify(resolved));
      } catch {
        // quota exceeded or private window — fail silently
      }
      notifyListeners(key);
      dispatchLocalStorageEvent(key);
    },
    [key, initialValue],
  );

  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
    notifyListeners(key);
    dispatchLocalStorageEvent(key);
  }, [key]);

  return [value, setValue, removeValue] as const;
}
