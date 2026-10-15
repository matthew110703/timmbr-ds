import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { FilterChips } from './FilterChips';

const initial = [
  { id: 'material:teak', label: 'Teak Wood' },
  { id: 'material:oak', label: 'Oak Wood' },
  { id: 'size:king', label: 'King Size' },
  { id: 'price', label: '₹10,000 – ₹50,000' },
];

function Interactive() {
  const [chips, setChips] = React.useState(initial);
  return (
    <FilterChips
      chips={chips}
      onRemove={(chip) => setChips((all) => all.filter((c) => c.id !== chip.id))}
      onClearAll={() => setChips([])}
    />
  );
}

const meta: Meta<typeof FilterChips> = {
  title: 'Navigation/FilterChips',
  component: FilterChips,
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj = { render: () => <Interactive /> };
