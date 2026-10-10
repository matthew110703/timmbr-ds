import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from './Rating';

const meta: Meta<typeof Rating> = {
  title: 'Data Display/Rating',
  component: Rating,
  tags: ['autodocs'],
  args: { value: 4.5, count: 817, size: 'sm' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md'] } },
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {};
export const WithoutCount: Story = { args: { count: undefined } };
export const Medium: Story = { args: { size: 'md' } };
