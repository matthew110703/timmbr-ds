import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Stat, StatLabel, StatValue, StatHelpText, StatIndicator } from './Stat';

const meta: Meta<typeof Stat> = {
  title: 'Data/Stat',
  component: Stat,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'subtle'],
      description: 'Card enclosure style',
    },
  },
  args: {
    variant: 'bordered',
  },
};

export default meta;
type Story = StoryObj<typeof Stat>;

export const Default: Story = {
  render: (args) => (
    <div className="w-72">
      <Stat {...args}>
        <StatLabel>Total Timber Milled</StatLabel>
        <StatValue>142,500 BF</StatValue>
        <StatHelpText>
          <StatIndicator type="increase">+12.4%</StatIndicator>
          <span>vs last quarter</span>
        </StatHelpText>
      </Stat>
    </div>
  ),
};

export const MetricGroup: Story = {
  render: () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
      <Stat variant="bordered">
        <StatLabel>Kiln Throughput</StatLabel>
        <StatValue>98.2%</StatValue>
        <StatHelpText>
          <StatIndicator type="increase">+3.1%</StatIndicator>
          <span>peak capacity</span>
        </StatHelpText>
      </Stat>

      <Stat variant="bordered">
        <StatLabel>Moisture Standard Dev</StatLabel>
        <StatValue>0.4%</StatValue>
        <StatHelpText>
          <StatIndicator type="decrease">-0.2%</StatIndicator>
          <span>less moisture variance</span>
        </StatHelpText>
      </Stat>

      <Stat variant="bordered">
        <StatLabel>FSC Yield Ratio</StatLabel>
        <StatValue>94.8%</StatValue>
        <StatHelpText>
          <StatIndicator type="increase">+5.6%</StatIndicator>
          <span>certified recovery</span>
        </StatHelpText>
      </Stat>
    </div>
  ),
};
