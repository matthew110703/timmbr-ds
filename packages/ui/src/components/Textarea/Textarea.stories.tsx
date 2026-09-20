import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'filled', 'subtle'],
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    autoResize: { control: 'boolean' },
    floating: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    label: 'Special Instructions',
    placeholder: 'Enter woodworking project specifications...',
    helperText: 'Provide custom wood joinery or finish requirements.',
  },
};

export const FloatingLabel: Story = {
  args: {
    label: 'Project Blueprint Notes',
    floating: true,
    placeholder: 'Add dimensional specifications...',
    helperText: 'Floating label animates to top on focus.',
  },
};

export const WithCharacterCounter: Story = {
  args: {
    label: 'Timber Source Biography',
    placeholder: 'Describe origin of harvested timber...',
    maxLength: 150,
    showCount: true,
    defaultValue: 'Sustainably harvested Douglas Fir from Pacific Northwest groves.',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Defect Report',
    defaultValue: 'Grain splitting along radial edge.',
    error: 'Description must contain at least 50 characters detailing split depth.',
  },
};

export const AutoResize: Story = {
  args: {
    label: 'Dynamic Note (Auto expands height)',
    placeholder: 'Type multi-line content to watch textarea automatically expand...',
    autoResize: true,
    rows: 2,
  },
};
