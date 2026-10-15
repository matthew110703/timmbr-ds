import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { FormActions } from './FormActions';
import { Button } from '../Button';

const meta: Meta<typeof FormActions> = {
  title: 'Forms/FormActions',
  component: FormActions,
  tags: ['autodocs'],
  argTypes: {
    align: {
      control: 'radio',
      options: ['start', 'end', 'between'],
      description: 'Button alignment from sm breakpoint up',
    },
    divider: {
      control: 'boolean',
      description: 'Show a top border divider above the actions',
    },
  },
  args: {
    align: 'end',
    divider: false,
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-xl border border-border rounded-lg p-6 bg-card">
        <Story />
      </div>
    ),
  ],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof FormActions>;

export const Default: Story = {
  render: (args) => (
    <FormActions {...args}>
      <Button variant="ghost">Cancel</Button>
      <Button variant="primary">Save changes</Button>
    </FormActions>
  ),
};

export const AlignStart: Story = {
  render: () => (
    <FormActions align="start">
      <Button variant="primary">Submit</Button>
      <Button variant="ghost">Reset</Button>
    </FormActions>
  ),
};

export const AlignBetween: Story = {
  render: () => (
    <FormActions align="between">
      <Button variant="ghost">← Back</Button>
      <Button variant="primary">Next →</Button>
    </FormActions>
  ),
};

export const WithDivider: Story = {
  render: () => (
    <FormActions divider>
      <Button variant="outline">Discard</Button>
      <Button variant="primary">Publish</Button>
    </FormActions>
  ),
};
