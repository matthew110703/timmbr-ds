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

/** All three sizes side-by-side. */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-full max-w-xl">
      <Alert variant="info" size="sm" title="Small alert">
        Compact size for inline notices where vertical space is tight.
      </Alert>
      <Alert variant="info" size="default" title="Default alert">
        Standard size for most informational messages.
      </Alert>
      <Alert variant="info" size="lg" title="Large alert">
        Prominent size for critical notices that need to stand out.
      </Alert>
    </div>
  ),
};

/** `icon={null}` suppresses the icon entirely. */
export const NoIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-3 w-full max-w-xl">
      <Alert variant="warning" title="No icon variant" icon={null}>
        This alert has no leading icon. Use when the variant colour is sufficient context.
      </Alert>
      <Alert variant="success" title="FSC Certification Verified" icon={null}>
        All logs in this shipment verified through sustainable forestry chain.
      </Alert>
    </div>
  ),
};

/** Pass a custom React element as `icon` to replace the default variant icon. */
export const CustomIcon: Story = {
  render: () => (
    <Alert
      variant="info"
      title="Custom icon slot"
      icon={
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
          <path d="M10 2a8 8 0 100 16A8 8 0 0010 2zm1 11H9v-2h2v2zm0-4H9V5h2v4z" />
        </svg>
      }
    >
      You can pass any React node as the icon prop.
    </Alert>
  ),
};
