import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { listingReducer } from '@timmbr/utils';
import { Button } from '../Button';
import { FilterDrawer } from './FilterDrawer';
import type { FilterGroup } from '../FilterPanel/FilterPanel.types';

const groups: FilterGroup[] = [
  {
    key: 'fast-delivery',
    label: 'Fast Delivery',
    display: 'toggle',
    options: [{ value: 'yes', label: 'Yes', count: 19 }],
  },
  {
    key: 'material',
    label: 'Material',
    display: 'checkbox',
    options: [
      { value: 'sheesham', label: 'Sheesham Wood', count: 42 },
      { value: 'teak', label: 'Teak Wood', count: 12 },
      { value: 'fabric', label: 'Fabric', count: 0 },
    ],
  },
  {
    key: 'finish',
    label: 'Finish',
    display: 'swatch',
    options: [
      { value: 'walnut', label: 'Walnut Finish', count: 24, swatch: '#5C3A21' },
      { value: 'honey', label: 'Honey Finish', count: 15, swatch: '#B5753A' },
    ],
  },
];

/** A staged draft with a fake count (a page would fetch it for the draft). */
function Interactive() {
  const [open, setOpen] = React.useState(true);
  const [draft, dispatch] = React.useReducer(listingReducer, { filters: {}, page: 1 });
  const picked = Object.values(draft.filters).flat().length;
  const staged = groups.map((g) => ({
    ...g,
    options: g.options.map((o) => ({ ...o, selected: (draft.filters[g.key] ?? []).includes(o.value) })),
  }));
  return (
    <>
      <Button onClick={() => setOpen(true)}>Filter</Button>
      <FilterDrawer
        open={open}
        onOpenChange={setOpen}
        groups={staged}
        onToggle={(key, value) => dispatch({ type: 'toggle', key, value })}
        price={{ min: 6000, max: 100000, step: 2000, value: [draft.priceMin ?? 6000, draft.priceMax ?? 100000] }}
        onPriceChange={(min, max) => dispatch({ type: 'setPrice', min, max })}
        onClearAll={() => dispatch({ type: 'clearAll' })}
        onApply={() => setOpen(false)}
        total={Math.max(0, 120 - picked * 37)}
      />
    </>
  );
}

const meta: Meta<typeof FilterDrawer> = {
  title: 'Navigation/FilterDrawer',
  component: FilterDrawer,
  parameters: { layout: 'fullscreen', viewport: { defaultViewport: 'mobile1' } },
};
export default meta;

export const Default: StoryObj = { render: () => <Interactive /> };
