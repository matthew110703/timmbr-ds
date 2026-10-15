import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { QuantityStepper } from './QuantityStepper';

const meta: Meta<typeof QuantityStepper> = {
  title: 'Forms/QuantityStepper',
  component: QuantityStepper,
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof QuantityStepper> = {
  render: function Story() {
    const [value, setValue] = React.useState(1);
    return <QuantityStepper value={value} onChange={setValue} max={5} size="lg" />;
  },
};
