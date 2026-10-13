import type { Meta, StoryObj } from '@storybook/react';
import { Swatch } from './Swatch';

const finishes = {
  Walnut: '#5C3A21',
  Honey: '#B5753A',
  Teak: '#8B5A2B',
  Natural: '#D9B98B',
  White: '#E9E4DC',
  'Frosty White': '#F7F6F2',
};

const meta: Meta<typeof Swatch> = {
  title: 'Display/Swatch',
  component: Swatch,
  args: { color: '#5C3A21', size: 'md' },
};
export default meta;

export const Default: StoryObj<typeof Swatch> = {};

export const Finishes: StoryObj<typeof Swatch> = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      {Object.entries(finishes).map(([label, color], i) => (
        <Swatch key={label} color={color} label={label} selected={i === 0} size="lg" />
      ))}
    </div>
  ),
};
