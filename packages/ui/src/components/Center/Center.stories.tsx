import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Center } from './Center';

const meta: Meta<typeof Center> = {
  title: 'Layout/Center',
  component: Center,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Center>;

export const Default: Story = {
  render: () => (
    <Center className="w-80 h-40 bg-grey-100 dark:bg-grey-800 rounded-lg border border-grey-200 dark:border-grey-700">
      <div className="p-4 bg-primary text-white font-sans font-semibold rounded-md shadow-sm">
        Centered Content
      </div>
    </Center>
  ),
};

export const Inline: Story = {
  render: () => (
    <div className="font-sans text-foreground">
      <span>Prefix text </span>
      <Center inline className="size-8 bg-primary/20 text-primary rounded-full font-bold">
        ✓
      </Center>
      <span> Suffix text</span>
    </div>
  ),
};
