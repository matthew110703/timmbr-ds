import { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from './useDebouncedCallback';

export interface UseSearchSuggestionsOptions {
  /** Shorter queries show nothing and fetch nothing. Defaults to 2. */
  minLength?: number;
  /** Wait for typing to pause this long before fetching. Defaults to 200ms. */
  debounceMs?: number;
  /** Recent answers kept in memory, so backspacing is instant. Defaults to 20. */
  cacheSize?: number;
}

export interface SearchSuggestions<T> {
  /** Suggestions for the current query (a related previous query's while the next one loads). */
  items: T[];
  /** A fetch for the current query is pending. */
  loading: boolean;
  /** The query `items` belong to (trimmed, lowercase), or '' when there are none. */
  query: string;
}

const normalize = (query: string) => query.trim().replace(/\s+/g, ' ').toLowerCase();

/**
 * Typeahead suggestions for a search box: fetches once typing pauses, cancels the request a
 * newer keystroke replaces (AbortController), and remembers recent answers. A failed request
 * shows no suggestions; it never throws.
 *
 * `fetcher` receives the trimmed lowercase query and an AbortSignal to pass to fetch().
 */
export function useSearchSuggestions<T>(
  query: string,
  fetcher: (query: string, signal: AbortSignal) => Promise<T[]>,
  { minLength = 2, debounceMs = 200, cacheSize = 20 }: UseSearchSuggestionsOptions = {}
): SearchSuggestions<T> {
  const normalized = normalize(query);
  const active = normalized.length >= minLength;

  const cache = useRef(new Map<string, T[]>());
  const controller = useRef<AbortController | null>(null);
  const fetcherRef = useRef(fetcher);
  useEffect(() => {
    fetcherRef.current = fetcher;
  }, [fetcher]);

  // The latest answer, with the query it answers.
  const [result, setResult] = useState<{ query: string; items: T[] }>({ query: '', items: [] });

  const run = useDebouncedCallback((q: string) => {
    controller.current?.abort();
    const current = new AbortController();
    controller.current = current;
    fetcherRef.current(q, current.signal).then(
      (items) => {
        if (current.signal.aborted) return;
        const answers = cache.current;
        answers.delete(q);
        answers.set(q, items);
        if (answers.size > cacheSize) answers.delete(answers.keys().next().value as string);
        setResult({ query: q, items });
      },
      () => {
        // A failure shows no suggestions but isn't cached, so the same query is tried again later.
        if (!current.signal.aborted) setResult({ query: q, items: [] });
      }
    );
  }, debounceMs);

  const cached = active ? cache.current.get(normalized) : undefined;

  useEffect(() => {
    if (!active || cached) {
      // Nothing to fetch: drop a pending fetch and any request in flight.
      run.cancel();
      controller.current?.abort();
      return;
    }
    run(normalized);
  }, [normalized, active, cached, run]);

  useEffect(() => () => controller.current?.abort(), []);

  if (!active) return { items: [], loading: false, query: '' };
  if (cached) return { items: cached, loading: false, query: normalized };
  // Answered but not cached: the request failed.
  if (result.query === normalized) return { items: result.items, loading: false, query: normalized };
  // While loading, keep showing the last answer if it's for a related query (typing on or
  // backspacing), so the list doesn't flash empty on every keystroke.
  const related = result.query && (normalized.startsWith(result.query) || result.query.startsWith(normalized));
  return related
    ? { items: result.items, loading: true, query: result.query }
    : { items: [], loading: true, query: '' };
}
