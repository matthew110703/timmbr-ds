import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Feedback/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'info', 'success', 'warning', 'destructive'],
      description: 'Semantic alert severity style',
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg'],
      description: 'Padding and text scale',
    },
    dismissible: {
      control: 'boolean',
      description: 'Renders a close button',
    },
    title: {
      control: 'text',
      description: 'Alert heading title',
    },
    children: {
      control: 'text',
      description: 'Alert explanatory description body',
    },
  },
  args: {
    variant: 'info',
    size: 'default',
    title: 'Moisture Target Updated',
    children: 'Kiln batch OAK-492 has stabilized at 8.2% equilibrium moisture content.',
    dismissible: true,
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-full max-w-xl">
      <Alert
        variant="default"
        title="Timber Spec Note"
      >
        Standard kiln drying guidelines recommend 6-8 weeks stabilization.
      </Alert>
      <Alert
        variant="info"
        title="Automated Optimization"
      >
        Optimal cut algorithm achieved 92.4% board recovery rate.
      </Alert>
      <Alert
        variant="success"
        title="FSC Certification Verified"
      >
        All logs in this shipment verified through sustainable forestry chain.
      </Alert>
      <Alert
        variant="warning"
        title="Kiln Ambient Humidity"
      >
        Chamber 3 humidity dropped below 30%. Steam injection cycling.
      </Alert>
      <Alert
        variant="destructive"
        title="Blade Deflection Detected"
      >
        Saw head 2 tolerance exceeded 0.08mm. Immediate recalibration required.
      </Alert>
    </div>
  ),
};
