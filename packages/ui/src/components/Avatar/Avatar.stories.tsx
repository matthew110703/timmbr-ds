import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components & Data/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'The dimension of the avatar',
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'subtle', 'grey', 'outline'],
      description: 'Color scheme for the fallback background',
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'busy', 'away', undefined],
      description: 'Presence status indicator dot',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    initials: 'M',
    size: 'md',
    variant: 'primary',
  },
};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    alt: 'Sarah Jenkins',
    initials: 'SJ',
    size: 'lg',
    status: 'online',
  },
};

export const WithInitials: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Avatar initials="M" variant="primary" />
      <Avatar initials="JD" variant="secondary" />
      <Avatar initials="TB" variant="subtle" />
      <Avatar initials="AL" variant="grey" />
      <Avatar initials="NK" variant="outline" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Avatar size="xs" initials="XS" />
      <Avatar size="sm" initials="SM" />
      <Avatar size="md" initials="MD" />
      <Avatar size="lg" initials="LG" />
      <Avatar size="xl" initials="XL" />
      <Avatar size="2xl" initials="2X" />
    </div>
  ),
};

export const StatusIndicators: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Avatar initials="ON" status="online" />
      <Avatar initials="AW" status="away" />
      <Avatar initials="BU" status="busy" />
      <Avatar initials="OF" status="offline" />
    </div>
  ),
};
