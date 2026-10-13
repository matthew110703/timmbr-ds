import { describe, expect, it } from 'vitest';
import {
  countActiveFilters,
  decodeFilters,
  encodeFilters,
  listingReducer,
  niceRange,
  parseListingSearchParams,
  serializeListingSearchParams,
  type ListingAction,
  type ListingState,
} from './listing-state';

const config = { sorts: ['relevance', 'newest', 'price_asc'], defaultSort: 'relevance' };
const empty: ListingState = { filters: {}, page: 1 };

describe('parseListingSearchParams', () => {
  it('reads filters, price, search, sort and page', () => {
    expect(
      parseListingSearchParams(
        'material=walnut,teak&size=king&price=1000-5000&q=  oak   bed &sort=newest&page=3',
        config
      )
    ).toEqual({
      filters: { material: ['teak', 'walnut'], size: ['king'] },
      priceMin: 1000,
      priceMax: 5000,
      q: 'oak bed',
      sort: 'newest',
      page: 3,
    });
  });

  it('accepts records and URLSearchParams, merging repeated keys', () => {
    expect(parseListingSearchParams({ material: ['teak', 'oak'] }, config).filters).toEqual({
      material: ['oak', 'teak'],
    });
    expect(parseListingSearchParams(new URLSearchParams('material=teak&material=oak'), config).filters).toEqual({
      material: ['oak', 'teak'],
    });
  });

  it('drops anything invalid instead of throwing', () => {
    const state = parseListingSearchParams(
      'utm_source=google&Material=teak&material=Teak,ok-1,bad_value&sort=cheapest&page=-2&page=abc&price=x-y',
      config
    );
    expect(state).toEqual({ filters: { material: ['ok-1'] }, page: 1 });
  });

  it('treats one-sided and swapped price ranges sensibly', () => {
    expect(parseListingSearchParams('price=5000-', config)).toMatchObject({ priceMin: 5000 });
    expect(parseListingSearchParams('price=-5000', config)).toMatchObject({ priceMax: 5000 });
    expect(parseListingSearchParams('price=9000-1000', config)).toMatchObject({ priceMin: 1000, priceMax: 9000 });
  });

  it('respects reserved keys, allowed keys and limits', () => {
    expect(parseListingSearchParams('gclid=abc&material=teak', { ...config, reserved: ['gclid'] }).filters).toEqual({
      material: ['teak'],
    });
    expect(parseListingSearchParams('material=teak&size=king', { ...config, allowedKeys: ['size'] }).filters).toEqual({
      size: ['king'],
    });
    expect(parseListingSearchParams('page=5000', { ...config, maxPage: 100 }).page).toBe(100);
    expect(parseListingSearchParams('a=1&b=1&c=1', { ...config, maxGroups: 2 }).filters).toEqual({
      a: ['1'],
      b: ['1'],
    });
  });

  it('drops the default sort so it never reaches the URL', () => {
    expect(parseListingSearchParams('sort=relevance', config).sort).toBeUndefined();
  });
});

describe('serializeListingSearchParams', () => {
  it('is canonical: sorted keys and values, defaults dropped', () => {
    const a = serializeListingSearchParams(
      { filters: { size: ['queen', 'king'], material: ['teak'] }, sort: 'relevance', page: 1 },
      config
    );
    const b = serializeListingSearchParams(
      { filters: { material: ['teak'], size: ['king', 'queen'] }, page: 1 },
      config
    );
    expect(a).toBe('material=teak&size=king,queen');
    expect(b).toBe(a);
  });

  it('round-trips through parse', () => {
    const state: ListingState = {
      filters: { finish: ['walnut-finish'], material: ['oak', 'teak'] },
      priceMin: 2000,
      q: 'dining table & chairs',
      sort: 'price_asc',
      page: 2,
    };
    const query = serializeListingSearchParams(state, config);
    expect(parseListingSearchParams(query, config)).toEqual(state);
  });

  it('is empty for the default state', () => {
    expect(serializeListingSearchParams(empty, config)).toBe('');
  });
});

describe('listingReducer', () => {
  const base: ListingState = { filters: { material: ['teak'] }, priceMin: 1000, sort: 'newest', page: 4 };

  it('toggles values and drops emptied groups', () => {
    const added = listingReducer(base, { type: 'toggle', key: 'material', value: 'oak' });
    expect(added.filters.material).toEqual(['oak', 'teak']);
    const removed = listingReducer(base, { type: 'toggle', key: 'material', value: 'teak' });
    expect(removed.filters).toEqual({});
  });

  it('returns to page 1 on every change except paging', () => {
    const actions: ListingAction[] = [
      { type: 'toggle', key: 'size', value: 'king' },
      { type: 'setGroup', key: 'size', values: ['king'] },
      { type: 'clearGroup', key: 'material' },
      { type: 'setPrice', min: 10 },
      { type: 'clearPrice' },
      { type: 'setSort', sort: 'price_asc' },
      { type: 'setQuery', q: 'bed' },
      { type: 'clearAll' },
    ];
    for (const action of actions) expect(listingReducer(base, action).page).toBe(1);
    expect(listingReducer(base, { type: 'setPage', page: 7 }).page).toBe(7);
    expect(listingReducer(base, { type: 'setPage', page: 0 }).page).toBe(1);
  });

  it('clearAll keeps the search and sort but drops filters and price', () => {
    const state = listingReducer({ ...base, q: 'oak' }, { type: 'clearAll' });
    expect(state).toEqual({ filters: {}, q: 'oak', sort: 'newest', page: 1 });
  });

  it('swaps an inverted price range and clears an empty one', () => {
    expect(listingReducer(empty, { type: 'setPrice', min: 9, max: 1 })).toMatchObject({ priceMin: 1, priceMax: 9 });
    const cleared = listingReducer(base, { type: 'setPrice' });
    expect(cleared.priceMin).toBeUndefined();
    expect(cleared.priceMax).toBeUndefined();
  });

  it('never mutates the previous state', () => {
    const before = JSON.stringify(base);
    listingReducer(base, { type: 'toggle', key: 'material', value: 'oak' });
    expect(JSON.stringify(base)).toBe(before);
  });
});

describe('helpers', () => {
  it('counts selected values plus an active price range', () => {
    expect(countActiveFilters({ filters: { a: ['1', '2'], b: ['3'] }, priceMax: 5, page: 1 })).toBe(4);
    expect(countActiveFilters(empty)).toBe(0);
  });

  it('encodes and decodes the single-parameter filter form', () => {
    const filters = { size: ['queen', 'king'], material: ['teak'] };
    expect(encodeFilters(filters)).toBe('material:teak;size:king,queen');
    expect(decodeFilters('size:queen,king;material:teak;bad;:x;k:Bad')).toEqual({
      material: ['teak'],
      size: ['king', 'queen'],
    });
    expect(decodeFilters(undefined)).toEqual({});
  });

  it('builds nice slider ranges', () => {
    expect(niceRange(7999, 99989)).toEqual({ min: 6000, max: 100000, step: 2000 });
    expect(niceRange(4999, 19999)).toEqual({ min: 4500, max: 20000, step: 500 });
    expect(niceRange(0, 5_000_000).step).toBe(100000);
    expect(niceRange(32999, 32999)).toEqual({ min: 32500, max: 33000, step: 500 });
  });
});
