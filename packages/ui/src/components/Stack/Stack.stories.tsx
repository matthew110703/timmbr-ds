import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack';
import { Divider } from '../Divider';

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
      description: 'Spacing between children',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
      description: 'Cross-axis alignment',
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between'],
      description: 'Main-axis distribution',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Stack>;

export const Default: Story = {
  render: (args) => (
    <Stack {...args} className="max-w-md">
      <div className="p-4 bg-secondary rounded-[2px] text-sm font-medium">Item 1</div>
      <div className="p-4 bg-secondary rounded-[2px] text-sm font-medium">Item 2</div>
      <div className="p-4 bg-secondary rounded-[2px] text-sm font-medium">Item 3</div>
    </Stack>
  ),
  args: {
    gap: 4,
    align: 'stretch',
  },
};

export const WithDividers: Story = {
  render: () => (
    <Stack divider={<Divider />} className="max-w-md">
      <div className="py-2 font-medium">Account Settings</div>
      <div className="py-2 font-medium">Security & Passwords</div>
      <div className="py-2 font-medium">Notifications & Alerts</div>
      <div className="py-2 font-medium">Billing & Invoices</div>
    </Stack>
  ),
};

export const AlignmentOptions: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-6">
      <Stack align="start" className="p-4 border border-grey-200">
        <span className="text-xs font-bold uppercase text-primary">Align: Start</span>
        <button className="px-3 py-1 bg-primary text-white text-xs rounded-[2px]">Short</button>
        <button className="px-5 py-1 bg-primary text-white text-xs rounded-[2px]">Longer Button</button>
      </Stack>
      <Stack align="center" className="p-4 border border-grey-200">
        <span className="text-xs font-bold uppercase text-primary">Align: Center</span>
        <button className="px-3 py-1 bg-primary text-white text-xs rounded-[2px]">Short</button>
        <button className="px-5 py-1 bg-primary text-white text-xs rounded-[2px]">Longer Button</button>
      </Stack>
      <Stack align="end" className="p-4 border border-grey-200">
        <span className="text-xs font-bold uppercase text-primary">Align: End</span>
        <button className="px-3 py-1 bg-primary text-white text-xs rounded-[2px]">Short</button>
        <button className="px-5 py-1 bg-primary text-white text-xs rounded-[2px]">Longer Button</button>
      </Stack>
    </div>
  ),
};
