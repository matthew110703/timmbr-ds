import type { Meta, StoryObj } from '@storybook/react';
import { Price } from './Price';

const meta: Meta<typeof Price> = {
  title: 'Data Display/Price',
  component: Price,
  tags: ['autodocs'],
  args: { amount: 32999, compareAt: 66999, currency: 'INR', size: 'md' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
};

export default meta;
type Story = StoryObj<typeof Price>;

export const OnSale: Story = {};
export const FullPrice: Story = { args: { compareAt: null } };
export const WithoutDiscountLabel: Story = { args: { showDiscount: false } };
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Price {...args} size="sm" />
      <Price {...args} size="md" />
      <Price {...args} size="lg" />
    </div>
  ),
};
