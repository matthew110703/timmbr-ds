import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CreditCard, FileText, Lock, ShieldCheck } from '@timmbr/icons';
import { Stepper } from './Stepper';

const orderSteps = [
  { label: 'Placed', description: '7 Oct' },
  { label: 'Confirmed' },
  { label: 'Shipped' },
  { label: 'Delivered' },
];

const checkoutSteps = [
  { label: 'Card Details', description: 'Visa ending 4242', icon: <CreditCard size={16} /> },
  { label: 'Form Review', description: 'Check your order', icon: <FileText size={16} /> },
  { label: 'Authenticate OTP', description: 'Verify your identity', icon: <Lock size={16} /> },
  { label: 'Create Code', description: 'Set your PIN', icon: <ShieldCheck size={16} /> },
];

const meta: Meta<typeof Stepper> = {
  title: 'Navigation/Stepper',
  component: Stepper,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['horizontal', 'vertical'] },
    status: { control: 'select', options: ['default', 'error'] },
    variant: { control: 'select', options: ['default', 'progress'] },
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

// ── Progress variant ─────────────────────────────────────────────────────────

export const Progress: Story = {
  args: { steps: checkoutSteps, current: 2, variant: 'progress' },
};

export const ProgressAllComplete: Story = {
  args: { steps: checkoutSteps, current: 4, variant: 'progress' },
};

export const ProgressFirst: Story = {
  args: { steps: checkoutSteps, current: 0, variant: 'progress' },
};

export const ProgressError: Story = {
  args: { steps: checkoutSteps, current: 2, status: 'error', variant: 'progress' },
};
