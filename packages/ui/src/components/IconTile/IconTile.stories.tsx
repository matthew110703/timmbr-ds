import type { Meta, StoryObj } from '@storybook/react';
import { Heart, MapPin, Package, ShieldCheck } from '@timmbr/icons';
import { IconTile } from './IconTile';

const meta: Meta<typeof IconTile> = {
  title: 'Data Display/IconTile',
  component: IconTile,
  tags: ['autodocs'],
  args: { size: 'md', tone: 'primary', children: <Package /> },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    tone: { control: 'inline-radio', options: ['primary', 'neutral', 'success', 'warning', 'destructive'] },
  },
};

export default meta;
type Story = StoryObj<typeof IconTile>;

export const Default: Story = {};
export const Tones: Story = {
  render: () => (
    <div className="flex gap-3">
      <IconTile tone="primary"><Package /></IconTile>
      <IconTile tone="neutral"><Heart /></IconTile>
      <IconTile tone="success"><MapPin /></IconTile>
      <IconTile tone="warning"><ShieldCheck /></IconTile>
      <IconTile tone="destructive"><ShieldCheck /></IconTile>
    </div>
  ),
};
