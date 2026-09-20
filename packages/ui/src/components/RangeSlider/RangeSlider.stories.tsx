import type { Meta, StoryObj } from '@storybook/react';
import { RangeSlider } from './RangeSlider';

const meta: Meta<typeof RangeSlider> = {
  title: 'Forms/RangeSlider',
  component: RangeSlider,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
    showReadouts: { control: 'boolean' },
    showActions: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof RangeSlider>;

export const Default: Story = {
  args: {
    label: 'Standard Range',
    defaultValue: [25, 75],
    min: 0,
    max: 100,
  },
  render: (args) => (
    <div className="w-80">
      <RangeSlider {...args} />
    </div>
  ),
};

export const PriceRangeSelector: Story = {
  args: {
    label: 'Price Range',
    min: 1000,
    max: 100000,
    step: 500,
    defaultValue: [7999, 99989],
    formatValue: (val) => `₹${val.toLocaleString('en-IN')}`,
    showReadouts: true,
    showActions: true,
    applyLabel: 'Apply',
    resetLabel: 'Reset',
  },
  render: (args) => (
    <div className="w-80 p-5 rounded border border-grey-200 dark:border-grey-800 bg-white dark:bg-grey-900 shadow-sm">
      <RangeSlider {...args} />
    </div>
  ),
};

export const SingleThumb: Story = {
  args: {
    label: 'Volume / Opacity',
    min: 0,
    max: 100,
    defaultValue: [65],
    formatValue: (val) => `${val}%`,
  },
  render: (args) => (
    <div className="w-80">
      <RangeSlider {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Range',
    defaultValue: [20, 80],
    disabled: true,
  },
  render: (args) => (
    <div className="w-80">
      <RangeSlider {...args} />
    </div>
  ),
};
