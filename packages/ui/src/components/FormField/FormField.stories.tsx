import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { FormField } from './FormField';
import { Input } from '../Input';
import { Textarea } from '../Textarea';
import { Select } from '../Select';

const meta: Meta<typeof FormField> = {
  title: 'Forms/FormField',
  component: FormField,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const WithInput: Story = {
  render: () => (
    <FormField
      label="Account Identifier"
      required
      helperText="Must be unique across your organization."
    >
      <Input placeholder="acme_workspace" />
    </FormField>
  ),
};

export const WithError: Story = {
  render: () => (
    <FormField
      label="Primary Email"
      required
      error="Email address domain is not authorized."
    >
      <Input defaultValue="nexus@untrusted.org" error />
    </FormField>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <FormField
      label="Woodworking Project Notes"
      helperText="Provide joinery and drying schedule specifications."
    >
      <Textarea placeholder="Details on mortise and tenon joints..." />
    </FormField>
  ),
};

export const WithSelect: Story = {
  render: () => (
    <FormField
      label="Grain Direction"
      required
      helperText="Select the structural grain orientation."
    >
      <Select
        placeholder="Select orientation"
        options={[
          { value: 'radial', label: 'Radial Cut' },
          { value: 'tangential', label: 'Tangential Cut' },
          { value: 'quarter', label: 'Quarter Sawn' },
        ]}
      />
    </FormField>
  ),
};
