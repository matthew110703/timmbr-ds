import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { MediaCard } from './MediaCard';
import { Badge } from '../Badge';
import { Button } from '../Button';

const image = (
  <img
    src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=70"
    alt=""
  />
);

const meta: Meta<typeof MediaCard> = {
  title: 'Data Display/MediaCard',
  component: MediaCard,
  tags: ['autodocs'],
  argTypes: {
    orientation: { control: 'select', options: ['vertical', 'horizontal'] },
    variant: { control: 'select', options: ['plain', 'outline'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    ratio: { control: 'select', options: ['square', 'portrait', 'landscape'] },
  },
  args: { media: image, title: 'Søren Mid-Century 3-Seater Sofa', subtitle: 'Cognac Saddle · Leather' },
};

export default meta;
type Story = StoryObj<typeof MediaCard>;

/** Grid item, e.g. a product card built on top of it. */
export const Vertical: Story = {
  args: {
    aside: '₹89,999',
    meta: (
      <Badge variant="success" size="sm">
        In stock
      </Badge>
    ),
    footer: (
      <>
        <Button size="sm">Move to cart</Button>
        <Button size="sm" variant="ghost">
          Remove
        </Button>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className="max-w-xs">
        <Story />
      </div>
    ),
  ],
};

/** List row, e.g. an order or cart line item. */
export const Horizontal: Story = {
  args: { orientation: 'horizontal', variant: 'outline', meta: 'Qty 1 × ₹89,999', aside: '₹89,999' },
  decorators: [
    (Story) => (
      <div className="max-w-xl">
        <Story />
      </div>
    ),
  ],
};
