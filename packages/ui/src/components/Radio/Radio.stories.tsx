import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { RadioGroup, RadioItem } from './Radio';

const deliveryOptions = [
  {
    value: 'standard',
    label: 'Standard Ground Delivery',
    description: 'Delivered in 3–5 business days.',
  },
  {
    value: 'express',
    label: 'Express Freight',
    description: 'Next business day priority transport.',
  },
  {
    value: 'white-glove',
    label: 'White Glove Installation',
    description: 'Full assembly and room placement included.',
  },
];

const meta: Meta<typeof RadioGroup> = {
  title: 'Forms/Radio',
  component: RadioGroup,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'md', 'lg'],
    },
    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    label: 'Shipping Method',
    defaultValue: 'standard',
    options: deliveryOptions,
    helperText: 'Select your preferred courier fulfillment speed.',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Shipping Method',
    options: deliveryOptions,
    error: 'A delivery option must be selected before checkout.',
  },
};

export const Horizontal: Story = {
  args: {
    label: 'Material Finish',
    defaultValue: 'matte',
    orientation: 'horizontal',
    options: [
      { value: 'matte', label: 'Matte' },
      { value: 'satin', label: 'Satin' },
      { value: 'gloss', label: 'High Gloss' },
    ],
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-full">
      <RadioGroup
        size="sm"
        label="Small Size (16px)"
        defaultValue="opt1"
        options={[
          { value: 'opt1', label: 'Compact option 1' },
          { value: 'opt2', label: 'Compact option 2' },
        ]}
      />
      <RadioGroup
        size="default"
        label="Default Size (20px)"
        defaultValue="opt1"
        options={[
          { value: 'opt1', label: 'Standard option 1' },
          { value: 'opt2', label: 'Standard option 2' },
        ]}
      />
      <RadioGroup
        size="lg"
        label="Large Size (24px)"
        defaultValue="opt1"
        options={[
          { value: 'opt1', label: 'Large option 1' },
          { value: 'opt2', label: 'Large option 2' },
        ]}
      />
    </div>
  ),
};
