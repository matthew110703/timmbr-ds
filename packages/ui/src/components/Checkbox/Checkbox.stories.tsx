import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'Subscribe to Timmbr design updates',
    defaultChecked: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Natural wood grain enhancement',
    description:
      'Enables high-fidelity ambient lighting and depth maps on cedar and teak surfaces.',
    defaultChecked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: 'Select all furniture catalog items',
    checked: 'indeterminate',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'I confirm that I am at least 18 years old',
    error: 'You must confirm your age before proceeding.',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox size="sm" label="Small checkbox (16px)" defaultChecked />
      <Checkbox size="default" label="Default checkbox (20px)" defaultChecked />
      <Checkbox size="lg" label="Large checkbox (24px)" defaultChecked />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox disabled label="Disabled unchecked" />
      <Checkbox disabled defaultChecked label="Disabled checked" />
    </div>
  ),
};
