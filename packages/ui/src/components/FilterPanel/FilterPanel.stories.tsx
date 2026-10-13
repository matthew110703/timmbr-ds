import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { listingReducer, type ListingState } from '@timmbr/utils';
import { FilterPanel } from './FilterPanel';
import type { FilterGroup } from './FilterPanel.types';

/** Figma PLP (140:3886) sidebar content. Counts are static here; a page refreshes them. */
const facets: FilterGroup[] = [
  {
    key: 'fast-delivery',
    label: 'Fast Delivery',
    display: 'toggle',
    options: [{ value: 'yes', label: 'Yes', count: 19 }],
  },
  {
    key: 'clearance',
    label: 'Clearance Sale',
    display: 'toggle',
    options: [{ value: 'yes', label: 'Yes', count: 33 }],
  },
  {
    key: 'material',
    label: 'Material',
    display: 'checkbox',
    options: [
      { value: 'sheesham', label: 'Sheesham Wood', count: 42 },
      { value: 'engineered', label: 'Engineered Wood', count: 18 },
      { value: 'fabric', label: 'Fabric', count: 0 },
      { value: 'cotton', label: 'Cotton', count: 6 },
      { value: 'ash', label: 'Ash Wood', count: 9 },
      { value: 'teak', label: 'Teak Wood', count: 12 },
      { value: 'oak', label: 'Oak Wood', count: 7 },
    ],
  },
  {
    key: 'size',
    label: 'Size',
    display: 'checkbox',
    options: [
      { value: 'king', label: 'King Size', count: 51 },
      { value: 'queen', label: 'Queen Size', count: 38 },
      { value: 'single', label: 'Single Size', count: 4 },
    ],
  },
  {
    key: 'finish',
    label: 'Finish',
    display: 'swatch',
    options: [
      { value: 'walnut', label: 'Walnut Finish', count: 24, swatch: '#5C3A21' },
      { value: 'honey', label: 'Honey Finish', count: 15, swatch: '#B5753A' },
      { value: 'teak', label: 'Teak Finish', count: 11, swatch: '#8B5A2B' },
      { value: 'white', label: 'White Finish', count: 3, swatch: '#E9E4DC' },
      {
        value: 'frosty',
        label: 'Frosty White Finish',
        count: 2,
        swatch: '#F7F6F2',
      },
      {
        value: 'natural',
        label: 'Natural Finish',
        count: 6,
        swatch: '#D9B98B',
      },
    ],
  },
  {
    key: 'brand',
    label: 'Brand',
    display: 'checkbox',
    options: Array.from({ length: 20 }, (_, i) => ({
      value: `brand-${i}`,
      label: `Workshop ${i + 1}`,
      count: 20 - i,
    })),
  },
];

const withSelection = (state: ListingState): FilterGroup[] =>
  facets.map((group) => ({
    ...group,
    options: group.options.map((o) => ({
      ...o,
      selected: (state.filters[group.key] ?? []).includes(o.value),
    })),
  }));

/** Wires the panel to the listing reducer, as a page would (without navigation). */
function Interactive() {
  const [state, dispatch] = React.useReducer(listingReducer, {
    filters: { material: ['teak'] },
    page: 1,
  });
  const format = (v: number) => `₹${v.toLocaleString('en-IN')}`;
  return (
    <div style={{ width: 292 }}>
      <FilterPanel
        groups={withSelection(state)}
        onToggle={(key, value) => dispatch({ type: 'toggle', key, value })}
        onClearGroup={(key) => dispatch({ type: 'clearGroup', key })}
        price={{
          min: 6000,
          max: 100000,
          step: 2000,
          value: [state.priceMin ?? 6000, state.priceMax ?? 100000],
          format,
          onApply: (min, max) => dispatch({ type: 'setPrice', min, max }),
          onReset: () => dispatch({ type: 'clearPrice' }),
        }}
      />
      <pre style={{ fontSize: 11, marginTop: 12 }}>{JSON.stringify(state, null, 1)}</pre>
    </div>
  );
}

const meta: Meta<typeof FilterPanel> = {
  title: 'Navigation/FilterPanel',
  component: FilterPanel,
  parameters: { layout: 'padded' },
};
export default meta;

export const Default: StoryObj = { render: () => <Interactive /> };
