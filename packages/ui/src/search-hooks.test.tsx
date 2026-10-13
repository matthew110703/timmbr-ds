import '@testing-library/jest-dom/vitest';
import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { addRecentSearch, normalizeRecentSearch, useRecentSearches, useSearchSuggestions } from '@timmbr/hooks';

const KEY = 'test:recent-searches';

describe('recent search rules', () => {
  it('normalises, and drops entries too short to keep', () => {
    expect(normalizeRecentSearch('  teak   bed ')).toBe('teak bed');
    expect(normalizeRecentSearch('a')).toBeNull();
    expect(normalizeRecentSearch('x'.repeat(150))).toHaveLength(100);
  });

  it('puts the newest first, de-duplicates ignoring case, and caps the list', () => {
    expect(addRecentSearch(['sofa', 'Teak Bed'], 'teak bed', 8)).toEqual(['teak bed', 'sofa']);
    expect(
      addRecentSearch(
        ['b', 'c'].map((x) => x.repeat(2)),
        'aa',
        2
      )
    ).toEqual(['aa', 'bb']);
    const same = ['sofa'];
    expect(addRecentSearch(same, ' ', 8)).toBe(same);
  });
});

describe('useRecentSearches', () => {
  afterEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it('remembers, removes and clears searches in localStorage', () => {
    const { result } = renderHook(() => useRecentSearches({ storageKey: KEY }));
    expect(result.current.items).toEqual([]);

    act(() => result.current.add('Teak bed'));
    act(() => result.current.add('sofa'));
    expect(result.current.items).toEqual(['sofa', 'Teak bed']);
    expect(JSON.parse(window.localStorage.getItem(KEY)!)).toEqual(['sofa', 'Teak bed']);

    act(() => result.current.remove('TEAK BED'));
    expect(result.current.items).toEqual(['sofa']);

    act(() => result.current.clear());
    expect(result.current.items).toEqual([]);
    expect(window.localStorage.getItem(KEY)).toBeNull();
  });

  it('keeps every component with the same key in sync', () => {
    const a = renderHook(() => useRecentSearches({ storageKey: KEY }));
    const b = renderHook(() => useRecentSearches({ storageKey: KEY, max: 1 }));

    act(() => a.result.current.add('sofa'));
    act(() => a.result.current.add('bed'));

    expect(b.result.current.items).toEqual(['bed']);
  });

  it('picks up changes made in another tab', () => {
    const { result } = renderHook(() => useRecentSearches({ storageKey: KEY }));
    act(() => {
      window.localStorage.setItem(KEY, JSON.stringify(['from another tab']));
      window.dispatchEvent(new StorageEvent('storage', { key: KEY }));
    });
    expect(result.current.items).toEqual(['from another tab']);
  });

  it('ignores corrupt data', () => {
    window.localStorage.setItem(KEY, '{"not":"a list"');
    const { result } = renderHook(() => useRecentSearches({ storageKey: KEY }));
    expect(result.current.items).toEqual([]);

    act(() => {
      window.localStorage.setItem(KEY, JSON.stringify(['ok', 3, null, '']));
      window.dispatchEvent(new StorageEvent('storage', { key: KEY }));
    });
    expect(result.current.items).toEqual(['ok']);
  });

  it('works (with an empty list) when storage throws', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    const { result } = renderHook(() => useRecentSearches({ storageKey: `${KEY}-blocked` }));
    expect(result.current.items).toEqual([]);
    expect(() => act(() => result.current.add('sofa'))).not.toThrow();
  });
});

describe('useSearchSuggestions', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  const flush = async (ms = 200) => {
    await act(async () => {
      vi.advanceTimersByTime(ms);
      await Promise.resolve();
      await Promise.resolve();
    });
  };

  it('does nothing below the minimum length', async () => {
    const fetcher = vi.fn().mockResolvedValue(['x']);
    const { result } = renderHook(() => useSearchSuggestions('t', fetcher));
    await flush();
    expect(fetcher).not.toHaveBeenCalled();
    expect(result.current).toEqual({ items: [], loading: false, query: '' });
  });

  it('fetches once typing pauses, with the normalised query', async () => {
    const fetcher = vi.fn().mockResolvedValue(['Teak Bed']);
    const { result, rerender } = renderHook(({ q }) => useSearchSuggestions(q, fetcher), {
      initialProps: { q: 'te' },
    });
    rerender({ q: 'tea' });
    rerender({ q: ' Teak ' });
    expect(result.current.loading).toBe(true);
    await flush();

    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(fetcher.mock.calls[0][0]).toBe('teak');
    expect(result.current).toEqual({ items: ['Teak Bed'], loading: false, query: 'teak' });
  });

  it('aborts a request a newer query replaces', async () => {
    const signals: AbortSignal[] = [];
    const fetcher = vi.fn((q: string, signal: AbortSignal) => {
      signals.push(signal);
      return new Promise<string[]>((resolve) => setTimeout(() => resolve([q]), 500));
    });
    const { result, rerender } = renderHook(({ q }) => useSearchSuggestions(q, fetcher), {
      initialProps: { q: 'teak' },
    });
    await flush();
    rerender({ q: 'teak bed' });
    await flush();

    expect(signals[0].aborted).toBe(true);
    await flush(500);
    expect(result.current.items).toEqual(['teak bed']);
  });

  it('answers a repeated query from memory, without fetching', async () => {
    const fetcher = vi.fn(async (q: string) => [q]);
    const { result, rerender } = renderHook(({ q }) => useSearchSuggestions(q, fetcher), {
      initialProps: { q: 'teak' },
    });
    await flush();
    rerender({ q: 'teak b' });
    await flush();
    rerender({ q: 'teak' });

    expect(result.current).toEqual({ items: ['teak'], loading: false, query: 'teak' });
    await flush();
    expect(fetcher).toHaveBeenCalledTimes(2);
  });

  it('shows nothing when the request fails', async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error('offline'));
    const { result } = renderHook(() => useSearchSuggestions('teak', fetcher));
    await flush();
    expect(result.current).toEqual({ items: [], loading: false, query: 'teak' });
  });

  it('does not remember a failure: the same query is fetched again later', async () => {
    const fetcher = vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValue(['Teak Bed']);
    const { result, rerender } = renderHook(({ q }) => useSearchSuggestions(q, fetcher), {
      initialProps: { q: 'teak' },
    });
    await flush();
    rerender({ q: 'teak b' });
    await flush();
    rerender({ q: 'teak' });
    await flush();

    expect(fetcher).toHaveBeenCalledTimes(3);
    expect(result.current).toEqual({ items: ['Teak Bed'], loading: false, query: 'teak' });
  });
});
