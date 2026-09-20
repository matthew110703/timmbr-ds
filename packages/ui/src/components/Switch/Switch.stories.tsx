import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Forms/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default', 'md', 'lg'],
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: {
    'aria-label': 'Airplane mode',
  },
};

export const Checked: Story = {
  args: {
    label: 'Dark Wood Mode',
    defaultChecked: true,
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Automatic Texture Optimization',
    description:
      'Dynamically render procedural wood grains according to client device GPU capabilities.',
    defaultChecked: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 w-80">
      <Switch size="sm" label="Small Switch (20px)" defaultChecked />
      <Switch size="default" label="Default Switch (24px)" defaultChecked />
      <Switch size="lg" label="Large Switch (28px)" defaultChecked />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-80">
      <Switch disabled label="Disabled Unchecked" />
      <Switch disabled defaultChecked label="Disabled Checked" />
    </div>
  ),
};
