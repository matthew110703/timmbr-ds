import type { Meta, StoryObj } from '@storybook/react';
import { ChevronRight, CreditCard } from '@timmbr/icons';
import { RadioGroup } from '../Radio';
import { RadioCard } from './RadioCard';

const meta: Meta<typeof RadioCard> = {
  title: 'Forms/RadioCard',
  component: RadioCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: { control: 'radio', options: ['row', 'card'] },
  },
};

export default meta;
type Story = StoryObj<typeof RadioCard>;

export const Cards: Story = {
  render: (args) => (
    <RadioGroup aria-label="Delivery" defaultValue="standard">
      <RadioCard
        {...args}
        variant="card"
        value="standard"
        label="Standard delivery"
        description="3–5 business days"
        icon={<CreditCard className="h-5 w-5" />}
      />
      <RadioCard
        {...args}
        variant="card"
        value="express"
        label="Express delivery"
        description="Next business day"
        icon={<CreditCard className="h-5 w-5" />}
      />
      <RadioCard
        {...args}
        variant="card"
        value="pickup"
        label="Store pickup"
        description="Not available for this order"
        icon={<CreditCard className="h-5 w-5" />}
        disabled
      />
    </RadioGroup>
  ),
};

/** Rows inside a surface, divided by the group. A trailing element replaces the selection marker. */
export const DividedRows: Story = {
  render: () => (
    <RadioGroup aria-label="Method" className="gap-0 divide-y divide-border">
      <RadioCard
        value="card"
        label="Credit card"
        icon={<CreditCard className="h-5 w-5" />}
        trailing={<ChevronRight className="h-4 w-4" />}
      />
      <RadioCard
        value="debit"
        label="ATM / Debit card"
        icon={<CreditCard className="h-5 w-5" />}
        trailing={<ChevronRight className="h-4 w-4" />}
      />
      <RadioCard
        value="netbanking"
        label="Internet banking"
        icon={<CreditCard className="h-5 w-5" />}
        trailing={<ChevronRight className="h-4 w-4" />}
      />
    </RadioGroup>
  ),
};
