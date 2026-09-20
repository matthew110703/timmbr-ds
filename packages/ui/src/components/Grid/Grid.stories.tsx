import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Grid } from './Grid';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

const SampleBox = ({ label }: { label: string }) => (
  <div className="h-20 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center font-sans font-medium text-sm text-primary">
    {label}
  </div>
);

export const Default: Story = {
  render: () => (
    <Grid cols={3} gap={4}>
      <SampleBox label="Item 1" />
      <SampleBox label="Item 2" />
      <SampleBox label="Item 3" />
      <SampleBox label="Item 4" />
      <SampleBox label="Item 5" />
      <SampleBox label="Item 6" />
    </Grid>
  ),
};

export const ResponsiveColumns: Story = {
  render: () => (
    <Grid cols={{ sm: 1, md: 2, lg: 4 }} gap={4}>
      <SampleBox label="Responsive 1" />
      <SampleBox label="Responsive 2" />
      <SampleBox label="Responsive 3" />
      <SampleBox label="Responsive 4" />
    </Grid>
  ),
};

export const AutoFit: Story = {
  render: () => (
    <Grid autoFit minChildWidth="160px" gap={4}>
      <SampleBox label="Auto 1" />
      <SampleBox label="Auto 2" />
      <SampleBox label="Auto 3" />
      <SampleBox label="Auto 4" />
      <SampleBox label="Auto 5" />
    </Grid>
  ),
};
