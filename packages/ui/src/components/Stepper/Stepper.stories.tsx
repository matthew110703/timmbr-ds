import type { Meta, StoryObj } from '@storybook/react';
import { Stepper } from './Stepper';

const orderSteps = [
  { label: 'Placed', description: '7 Oct' },
  { label: 'Confirmed' },
  { label: 'Shipped' },
  { label: 'Delivered' },
];

const meta: Meta<typeof Stepper> = {
  title: 'Navigation/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    status: { control: 'select', options: ['default', 'error'] },
    current: { control: { type: 'number', min: 0, max: 4 } },
  },
  args: { steps: orderSteps, current: 2 },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Horizontal: Story = {};
export const Vertical: Story = { args: { orientation: 'vertical' } };
export const Failed: Story = {
  args: { steps: [{ label: 'Placed' }, { label: 'Cancelled' }], current: 1, status: 'error' },
};
export const AllComplete: Story = { args: { current: 4 } };
