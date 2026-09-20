import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components & Data/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Divider orientation',
    },
    decorative: {
      control: 'boolean',
      description: 'Whether screen readers ignore the separator',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div>Above section content</div>
      <Divider />
      <div>Below section content</div>
    </div>
  ),
};

export const WithCenteredLabel: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <button className="w-full py-2 bg-primary text-white rounded-[2px] font-semibold text-sm">
        Sign in with Email
      </button>
      <Divider label="OR" />
      <button className="w-full py-2 border border-grey-300 rounded-[2px] font-semibold text-sm">
        Continue with Google
      </button>
    </div>
  ),
};

export const Dashed: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div>Section 1</div>
      <Divider variant="dashed" />
      <div>Section 2 (thick dashed)</div>
      <Divider variant="dashed" thickness="thick" />
      <div>Section 3</div>
    </div>
  ),
};

export const Dotted: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div>Section 1</div>
      <Divider variant="dotted" />
      <div>Section 2</div>
      <Divider variant="dotted" thickness="thick" />
      <div>Section 3</div>
    </div>
  ),
};

export const CustomColors: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <div>Primary Solid</div>
      <Divider color="primary" />
      <div>Brand Dashed</div>
      <Divider color="brand" variant="dashed" thickness="thick" />
    </div>
  ),
};

export const LabelPositions: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <p className="text-sm text-grey-500 mb-2">Start Position:</p>
        <Divider label="Left Aligned" labelPosition="start" />
      </div>
      <div>
        <p className="text-sm text-grey-500 mb-2">Center Position:</p>
        <Divider label="Centered (Default)" labelPosition="center" />
      </div>
      <div>
        <p className="text-sm text-grey-500 mb-2">End Position:</p>
        <Divider label="Right Aligned" labelPosition="end" />
      </div>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      <Divider
        icon={
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        }
        label="Trending Now"
        variant="dashed"
      />
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-6 items-center gap-4 text-sm font-medium">
      <span>Dashboard</span>
      <Divider orientation="vertical" />
      <span>Analytics</span>
      <Divider orientation="vertical" />
      <span>Settings</span>
    </div>
  ),
};
