import type { Meta, StoryObj } from '@storybook/react';
import { StockMeter } from './StockMeter';

const meta: Meta<typeof StockMeter> = {
  title: 'Data Display/StockMeter',
  component: StockMeter,
  tags: ['autodocs'],
  args: { available: 3 },
};
export default meta;

export const LowStock: StoryObj<typeof StockMeter> = {};
