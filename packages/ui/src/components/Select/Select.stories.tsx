import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Select } from './Select';

const sampleOptions = [
  { value: 'walnut', label: 'American Walnut' },
  { value: 'oak', label: 'White Oak' },
  { value: 'teak', label: 'Burmese Teak' },
  { value: 'maple', label: 'Hard Maple' },
  { value: 'cherry', label: 'Black Cherry', disabled: true },
];

const meta: Meta<typeof Select> = {
  title: 'Forms/Select',
  component: Select,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'filled'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    label: 'Wood Species',
    placeholder: 'Choose hardwood...',
    options: sampleOptions,
    helperText: 'Select your primary timber species for crafting.',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Wood Species',
    placeholder: 'Choose hardwood...',
    options: sampleOptions,
    error: 'Please select an available wood species.',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full">
      <Select
        variant="outline"
        label="Outline Variant"
        placeholder="Select option"
        options={sampleOptions}
      />
      <Select
        variant="filled"
        label="Filled Variant"
        placeholder="Select option"
        options={sampleOptions}
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full">
      <Select size="sm" label="Small (36px)" options={sampleOptions} />
      <Select size="default" label="Default (44px)" options={sampleOptions} />
      <Select size="lg" label="Large (52px)" options={sampleOptions} />
    </div>
  ),
};
