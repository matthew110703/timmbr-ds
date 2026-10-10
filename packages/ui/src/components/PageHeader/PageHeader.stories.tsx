import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Plus } from '@timmbr/icons';
import { PageHeader } from './PageHeader';
import { Button } from '../Button';

const meta: Meta<typeof PageHeader> = {
  title: 'Layout/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'select', options: ['sm', 'default', 'lg'] },
    as: { control: 'select', options: ['h1', 'h2', 'h3'] },
  },
  args: {
    title: 'Addresses',
    description: 'Manage where your orders are delivered.',
  },
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

export const Default: Story = {};

export const WithActions: Story = {
  args: { actions: <Button leftIcon={<Plus size={16} />}>Add address</Button> },
};

export const WithBackLink: Story = {
  args: {
    title: 'Order #8F2A91C3',
    description: 'Placed on 7 Oct 2026',
    back: { href: '#', label: 'All orders' },
    divider: true,
  },
};
