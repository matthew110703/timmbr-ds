import { useCallback, useMemo, useSyncExternalStore } from 'react';

export interface UseStoredListOptions<T> {
  /** localStorage key. Pages on the same origin that use the same key share the list. */
  storageKey: string;
  /** Most entries kept (newest first). Defaults to 12. */
  max?: number;
  /** Identity of an entry: adding one with the same key moves it to the front. */
  getKey: (item: T) => string;
  /** Keeps only well-formed entries when reading (the stored JSON may be old or edited). */
  isItem: (value: unknown) => value is T;
}

export interface StoredList<T> {
  /** Newest first. Empty on the server and on the first client render. */
  items: T[];
  /** Puts `item` first, replacing an entry with the same key. */
  add: (item: T) => void;
  remove: (key: string) => void;
  clear: () => void;
}

const EMPTY: never[] = [];
/** Same-tab change notice: the `storage` event only reaches OTHER tabs. */
const CHANGE_EVENT = 'timmbr:stored-list';

// Parsed lists by storage key and raw value, so getSnapshot returns the same array until the
// stored value changes (useSyncExternalStore requires a stable snapshot).
const snapshots = new Map<string, { raw: string | null; items: unknown[] }>();

function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    // Storage blocked (privacy settings, sandboxed frame): behave as if empty.
    return null;
  }
}

/** The stored list for `key`, keeping only entries `isItem` accepts. */
export function readStoredList<T>(key: string, isItem: (value: unknown) => value is T): T[] {
  const raw = readRaw(key);
  const cached = snapshots.get(key);
  if (cached && cached.raw === raw) return cached.items as T[];
  let items: T[] = EMPTY;
  if (raw) {
    try {
      const value: unknown = JSON.parse(raw);
      if (Array.isArray(value)) items = value.filter(isItem);
    } catch {
      // Corrupt JSON: treat as empty; the next write replaces it.
    }
  }
  snapshots.set(key, { raw, items });
  return items;
}

/** Stores the list (removing the key when empty) and tells this tab's subscribers. */
export function writeStoredList<T>(key: string, items: T[]) {
  try {
    if (items.length) window.localStorage.setItem(key, JSON.stringify(items));
    else window.localStorage.removeItem(key);
  } catch {
    // Full or blocked storage: the list just isn't remembered.
  }
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: key }));
}

function subscribe(key: string, onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) onChange();
  };
  const onLocal = (event: Event) => {
    if ((event as CustomEvent<string>).detail === key) onChange();
  };
  window.addEventListener('storage', onStorage);
  window.addEventListener(CHANGE_EVENT, onLocal);
  return () => {
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(CHANGE_EVENT, onLocal);
  };
}

const serverSnapshot = () => EMPTY;

/**
 * A small list kept in localStorage on this device (recent searches, recently viewed…). Every
 * component using the same key sees the same list, updated live (also across tabs). The server
 * render and the first client render see an empty list, so there's never a hydration mismatch.
 */
export function useStoredList<T>({ storageKey, max = 12, getKey, isItem }: UseStoredListOptions<T>): StoredList<T> {
  const subscribeToKey = useCallback((onChange: () => void) => subscribe(storageKey, onChange), [storageKey]);
  const stored = useSyncExternalStore(
    subscribeToKey,
    () => readStoredList(storageKey, isItem),
    serverSnapshot as () => T[]
  );
  const items = useMemo(() => stored.slice(0, max), [stored, max]);

  const add = useCallback(
    (item: T) => {
      const key = getKey(item);
      const rest = readStoredList(storageKey, isItem).filter((entry) => getKey(entry) !== key);
      writeStoredList(storageKey, [item, ...rest].slice(0, max));
    },
    [storageKey, max, getKey, isItem]
  );
  const remove = useCallback(
    (key: string) =>
      writeStoredList(
        storageKey,
        readStoredList(storageKey, isItem).filter((entry) => getKey(entry) !== key)
      ),
    [storageKey, getKey, isItem]
  );
  const clear = useCallback(() => writeStoredList(storageKey, []), [storageKey]);

  return { items, add, remove, clear };
}
