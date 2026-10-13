/**
 * URL state of a filterable listing (search results, category pages…), framework-free.
 *
 * The query string is the single source of truth:
 *   ?material=teak,walnut&size=king&price=10000-50000&q=bed&sort=price_asc&page=2
 * - every non-reserved key whose name and values are slugs is a filter group (values OR'ed);
 * - `price` is `min-max` (either side may be empty), `q` a search, `sort` and `page` as named.
 *
 * `serializeListingSearchParams` is canonical — keys and values sorted, defaults dropped — so
 * equivalent selections always produce the same URL (and the same cache entry everywhere).
 */

export interface ListingState {
  /** Filter groups: key → selected values (slugs). */
  filters: Record<string, string[]>;
  priceMin?: number;
  priceMax?: number;
  q?: string;
  sort?: string;
  /** 1-based. */
  page: number;
}

export interface ListingStateConfig {
  /** Allowed sort values; anything else falls back to `defaultSort`. */
  sorts: readonly string[];
  defaultSort: string;
  /** When given, only these keys are filter groups (others are ignored). */
  allowedKeys?: readonly string[];
  /** Extra query keys that are never filters (e.g. "utm_source"). */
  reserved?: readonly string[];
  /** Defaults: 20 groups, 30 values per group, 1000 pages, 100-character search. */
  maxGroups?: number;
  maxValuesPerGroup?: number;
  maxPage?: number;
  maxQueryLength?: number;
}

export type ListingAction =
  | { type: 'toggle'; key: string; value: string }
  | { type: 'setGroup'; key: string; values: string[] }
  | { type: 'clearGroup'; key: string }
  | { type: 'setPrice'; min?: number; max?: number }
  | { type: 'clearPrice' }
  | { type: 'setSort'; sort: string }
  | { type: 'setQuery'; q?: string }
  | { type: 'setPage'; page: number }
  /** Clears filters and price; keeps the search and the sort. */
  | { type: 'clearAll' }
  | { type: 'replace'; state: ListingState };

/** Query keys the listing uses itself; never treated as filter groups. */
export const LISTING_RESERVED_KEYS = ['q', 'sort', 'page', 'price', 'limit'] as const;

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const compare = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);

type SearchParamsInput =
  | URLSearchParams
  | Record<string, string | string[] | undefined>
  | string
  | null
  | undefined;

function entriesOf(input: SearchParamsInput): [string, string][] {
  if (!input) return [];
  if (typeof input === 'string' || input instanceof URLSearchParams) {
    return [...new URLSearchParams(input).entries()];
  }
  return Object.entries(input).flatMap(([key, value]) =>
    value === undefined ? [] : (Array.isArray(value) ? value : [value]).map((v): [string, string] => [key, v])
  );
}

function parseWholeNumber(raw: string): number | undefined {
  if (!/^\d{1,9}$/.test(raw)) return undefined;
  return Number(raw);
}

/** Reads listing state from search params; invalid or unknown parts are dropped, never thrown. */
export function parseListingSearchParams(input: SearchParamsInput, config: ListingStateConfig): ListingState {
  const maxGroups = config.maxGroups ?? 20;
  const maxValues = config.maxValuesPerGroup ?? 30;
  const maxPage = config.maxPage ?? 1000;
  const maxQ = config.maxQueryLength ?? 100;
  const reserved = new Set<string>([...LISTING_RESERVED_KEYS, ...(config.reserved ?? [])]);
  const allowed = config.allowedKeys ? new Set(config.allowedKeys) : null;

  const state: ListingState = { filters: {}, page: 1 };
  const groups = new Map<string, Set<string>>();

  for (const [key, raw] of entriesOf(input)) {
    if (key === 'q') {
      const q = raw.trim().replace(/\s+/g, ' ').slice(0, maxQ);
      if (q) state.q = q;
    } else if (key === 'sort') {
      if (config.sorts.includes(raw) && raw !== config.defaultSort) state.sort = raw;
    } else if (key === 'page') {
      const page = parseWholeNumber(raw);
      if (page && page > 1) state.page = Math.min(page, maxPage);
    } else if (key === 'price') {
      const match = /^(\d*)-(\d*)$/.exec(raw);
      if (match) {
        let min = match[1] ? parseWholeNumber(match[1]) : undefined;
        let max = match[2] ? parseWholeNumber(match[2]) : undefined;
        if (min !== undefined && max !== undefined && min > max) [min, max] = [max, min];
        if (min !== undefined) state.priceMin = min;
        if (max !== undefined) state.priceMax = max;
      }
    } else if (!reserved.has(key) && SLUG.test(key) && (!allowed || allowed.has(key))) {
      const values = groups.get(key) ?? new Set<string>();
      for (const value of raw.split(',')) {
        const v = value.trim();
        if (SLUG.test(v) && values.size < maxValues) values.add(v);
      }
      if (values.size > 0 && (groups.has(key) || groups.size < maxGroups)) groups.set(key, values);
    }
  }

  for (const [key, values] of groups) state.filters[key] = [...values].sort(compare);
  return state;
}

/** Canonical query string (without "?"): keys and values sorted, defaults dropped. */
export function serializeListingSearchParams(state: ListingState, config: Pick<ListingStateConfig, 'defaultSort'>): string {
  const entries: [string, string][] = [];
  for (const [key, values] of Object.entries(state.filters)) {
    const unique = [...new Set(values)].sort(compare);
    if (unique.length > 0) entries.push([key, unique.join(',')]);
  }
  if (state.priceMin !== undefined || state.priceMax !== undefined) {
    entries.push(['price', `${state.priceMin ?? ''}-${state.priceMax ?? ''}`]);
  }
  if (state.q) entries.push(['q', state.q]);
  if (state.sort && state.sort !== config.defaultSort) entries.push(['sort', state.sort]);
  if (state.page > 1) entries.push(['page', String(state.page)]);

  entries.sort(([a], [b]) => compare(a, b));
  // Commas stay readable in filter values; everything else is encoded.
  return entries
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value).replace(/%2C/g, ',')}`)
    .join('&');
}

/** Every change except paging returns to page 1 (the old page may not exist any more). */
export function listingReducer(state: ListingState, action: ListingAction): ListingState {
  const withFilters = (filters: Record<string, string[]>): ListingState => ({ ...state, filters, page: 1 });

  switch (action.type) {
    case 'toggle': {
      const current = state.filters[action.key] ?? [];
      const values = current.includes(action.value)
        ? current.filter((v) => v !== action.value)
        : [...current, action.value].sort(compare);
      const { [action.key]: _removed, ...rest } = state.filters;
      return withFilters(values.length ? { ...rest, [action.key]: values } : rest);
    }
    case 'setGroup': {
      const { [action.key]: _removed, ...rest } = state.filters;
      const values = [...new Set(action.values)].sort(compare);
      return withFilters(values.length ? { ...rest, [action.key]: values } : rest);
    }
    case 'clearGroup': {
      const { [action.key]: _removed, ...rest } = state.filters;
      return withFilters(rest);
    }
    case 'setPrice': {
      let { min, max } = action;
      if (min !== undefined && max !== undefined && min > max) [min, max] = [max, min];
      const { priceMin: _a, priceMax: _b, ...rest } = state;
      return {
        ...rest,
        ...(min !== undefined && { priceMin: min }),
        ...(max !== undefined && { priceMax: max }),
        page: 1,
      };
    }
    case 'clearPrice': {
      const { priceMin: _a, priceMax: _b, ...rest } = state;
      return { ...rest, page: 1 };
    }
    case 'setSort':
      return { ...state, sort: action.sort, page: 1 };
    case 'setQuery': {
      const { q: _q, ...rest } = state;
      return { ...rest, ...(action.q && { q: action.q }), page: 1 };
    }
    case 'setPage':
      return { ...state, page: Math.max(1, Math.floor(action.page)) };
    case 'clearAll': {
      const { priceMin: _a, priceMax: _b, ...rest } = state;
      return { ...rest, filters: {}, page: 1 };
    }
    case 'replace':
      return action.state;
  }
}

/** Selected filter values plus one for an active price range (for "Filters (3)" badges). */
export function countActiveFilters(state: ListingState): number {
  const values = Object.values(state.filters).reduce((sum, v) => sum + v.length, 0);
  return values + (state.priceMin !== undefined || state.priceMax !== undefined ? 1 : 0);
}

/** "material:teak,walnut;size:king" — a compact single-parameter form of the filter groups. */
export function encodeFilters(filters: Record<string, string[]>): string {
  return Object.entries(filters)
    .filter(([, values]) => values.length > 0)
    .sort(([a], [b]) => compare(a, b))
    .map(([key, values]) => `${key}:${[...new Set(values)].sort(compare).join(',')}`)
    .join(';');
}

/** Inverse of `encodeFilters`; malformed groups are skipped. */
export function decodeFilters(encoded: string | null | undefined): Record<string, string[]> {
  const filters: Record<string, string[]> = {};
  for (const segment of (encoded ?? '').split(';')) {
    const colon = segment.indexOf(':');
    if (colon <= 0) continue;
    const key = segment.slice(0, colon);
    const values = segment
      .slice(colon + 1)
      .split(',')
      .filter((v) => SLUG.test(v));
    if (SLUG.test(key) && values.length) filters[key] = [...new Set([...(filters[key] ?? []), ...values])].sort(compare);
  }
  return filters;
}

export interface NiceRange {
  min: number;
  max: number;
  step: number;
}

/**
 * "Nice" slider bounds for values between `min` and `max`: the smallest of `steps` that keeps
 * the slider within `maxStops` stops, with both bounds snapped outward. Wider ranges use a
 * multiple of the largest step. Always spans at least one step.
 */
export function niceRange(
  min: number,
  max: number,
  steps: readonly number[] = [500, 1000, 2000, 5000, 10000],
  maxStops = 50
): NiceRange {
  const low = Math.max(0, Math.floor(Math.min(min, max)));
  const high = Math.max(low, Math.ceil(Math.max(min, max)));
  const snap = (step: number): NiceRange => {
    const lo = Math.floor(low / step) * step;
    return { min: lo, max: Math.max(lo + step, Math.ceil(high / step) * step), step };
  };
  for (const step of steps) {
    const range = snap(step);
    if ((range.max - range.min) / step <= maxStops) return range;
  }
  const largest = steps[steps.length - 1];
  return snap(largest * Math.ceil((high - low) / (largest * maxStops)));
}
