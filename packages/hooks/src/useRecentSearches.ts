import { useCallback } from 'react';
import { useStoredList } from './useStoredList';

/** Entries shorter than this aren't worth remembering. */
export const RECENT_SEARCH_MIN_LENGTH = 2;
/** Longer entries are cut to this many characters. */
export const RECENT_SEARCH_MAX_LENGTH = 100;

export interface UseRecentSearchesOptions {
  /** localStorage key. Pages on the same origin that use the same key share the list. */
  storageKey: string;
  /** Most entries kept (newest first). Defaults to 8. */
  max?: number;
}

export interface RecentSearches {
  /** Newest first. Empty on the server and on the first client render. */
  items: string[];
  /** Remembers a search (moves it to the front if it's already there, ignoring case). */
  add: (query: string) => void;
  remove: (query: string) => void;
  clear: () => void;
}

/** Trims, collapses whitespace and caps the length; null when too short to keep. */
export function normalizeRecentSearch(query: string): string | null {
  const value = query.trim().replace(/\s+/g, ' ').slice(0, RECENT_SEARCH_MAX_LENGTH).trim();
  return value.length >= RECENT_SEARCH_MIN_LENGTH ? value : null;
}

/** The list after remembering `query`: newest first, no case-insensitive duplicates. */
export function addRecentSearch(items: string[], query: string, max: number): string[] {
  const value = normalizeRecentSearch(query);
  if (!value) return items;
  const lower = value.toLowerCase();
  return [value, ...items.filter((item) => item.toLowerCase() !== lower)].slice(0, max);
}

const isSearch = (value: unknown): value is string => typeof value === 'string' && value.length > 0;
/** Searches are the same entry regardless of case. */
const searchKey = (query: string) => query.toLowerCase();

/**
 * The shopper's recent searches, kept in localStorage on this device (see useStoredList): shared
 * live by every component with the same key, also across tabs, and hydration-safe.
 */
export function useRecentSearches({ storageKey, max = 8 }: UseRecentSearchesOptions): RecentSearches {
  const list = useStoredList({ storageKey, max, getKey: searchKey, isItem: isSearch });
  const { add: addItem, remove: removeItem } = list;

  const add = useCallback(
    (query: string) => {
      const value = normalizeRecentSearch(query);
      if (value) addItem(value);
    },
    [addItem]
  );
  const remove = useCallback((query: string) => removeItem(searchKey(query)), [removeItem]);

  return { items: list.items, add, remove, clear: list.clear };
}
