import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { OtpInput } from './OtpInput';

const meta: Meta<typeof OtpInput> = {
  title: 'Forms/OtpInput',
  component: OtpInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Accessible OTP / PIN verification input component built on input-otp with animated carets, slot styling, paste support, and Timmbr design tokens.',
      },
    },
  },
  argTypes: {
    length: {
      control: { type: 'number', min: 4, max: 8 },
      description: 'Number of character slots',
    },
    variant: {
      control: 'select',
      options: ['default', 'filled', 'underline'],
      description: 'Visual slot styling variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size scale',
    },
    error: {
      control: 'text',
      description: 'Error state boolean or error message string',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof OtpInput>;

/**
 * Default 6-digit OTP input.
 */
export const Default: Story = {
  args: {
    length: 6,
    variant: 'default',
    size: 'md',
  },
};

/**
 * 4-digit PIN code variant.
 */
export const FourDigits: Story = {
  args: {
    length: 4,
    variant: 'default',
    size: 'md',
  },
};

/**
 * Filled slot background styling.
 */
export const FilledVariant: Story = {
  args: {
    length: 6,
    variant: 'filled',
    size: 'md',
  },
};

/**
 * Minimalist underline styling.
 */
export const UnderlineVariant: Story = {
  args: {
    length: 6,
    variant: 'underline',
    size: 'md',
  },
};

/**
 * Large size scale for prominent mobile/touch interactions.
 */
export const LargeSize: Story = {
  args: {
    length: 6,
    size: 'lg',
    variant: 'default',
  },
};

/**
 * Small compact size scale.
 */
export const SmallSize: Story = {
  args: {
    length: 6,
    size: 'sm',
    variant: 'default',
  },
};

/**
 * Error state with user feedback message.
 */
export const WithError: Story = {
  args: {
    length: 6,
    variant: 'default',
    size: 'md',
    error: 'Incorrect verification code. Please check SMS and try again.',
  },
};

/**
 * Disabled state.
 */
export const Disabled: Story = {
  args: {
    length: 6,
    disabled: true,
    value: '123456',
  },
};

/**
 * Interactive controlled example with onComplete callback.
 */
export const Interactive: Story = {
  render: () => {
    const [val, setVal] = React.useState('');
    const [completed, setCompleted] = React.useState<string | null>(null);

    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <OtpInput
          length={6}
          value={val}
          onChange={(newVal) => {
            setVal(newVal);
            if (completed) setCompleted(null);
          }}
          onComplete={(code) => setCompleted(code)}
        />
        {completed ? (
          <p className="text-sm font-medium text-emerald-700">
            Completed OTP: <code>{completed}</code>
          </p>
        ) : (
          <p className="text-xs text-[#777]">Enter 6 digits to trigger onComplete</p>
        )}
      </div>
    );
  },
};

