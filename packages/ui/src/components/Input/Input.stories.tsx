import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { Sparkles, AlertCircle, Search } from '@timmbr/icons';

const meta: Meta<typeof Input> = {
  title: 'Forms/Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-sm">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'filled', 'subtle'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'md', 'lg'],
    },
    clearable: { control: 'boolean' },
    disabled: { control: 'boolean' },
    floating: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your prompt...',
  },
};

export const WithLabelAndHelper: Story = {
  args: {
    label: 'Email address',
    placeholder: 'name@example.com',
    helperText: 'We will never share your email with anyone.',
    clearable: true,
  },
};

export const FloatingLabel: Story = {
  args: {
    label: 'Company Name',
    floating: true,
    placeholder: 'e.g. Timber Studio',
    helperText: 'Floating label smoothly transitions to top on focus.',
  },
};

export const WithAdornments: Story = {
  args: {
    label: 'AI Search query',
    placeholder: 'Search documentation...',
    leftAdornment: <Sparkles className="w-4 h-4 text-primary" />,
    clearable: true,
    defaultValue: 'Woodworking textures',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Username',
    defaultValue: 'nexus_user',
    error: 'This username is already taken. Please choose another.',
    rightAdornment: <AlertCircle className="w-4 h-4 text-destructive" />,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full">
      <Input size="sm" placeholder="Small (36px)" label="Small input" />
      <Input size="default" placeholder="Default (44px)" label="Default input" />
      <Input size="lg" placeholder="Large (52px)" label="Large input" />
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full">
      <Input variant="outline" placeholder="Outline variant" label="Outline" />
      <Input variant="filled" placeholder="Filled variant" label="Filled" />
      <Input variant="subtle" placeholder="Subtle variant" label="Subtle" />
    </div>
  ),
};

export const PasswordInput: Story = {
  args: {
    label: 'Account Password',
    type: 'password',
    defaultValue: 'superSecret123!',
    helperText: 'Click the eye icon to reveal password.',
  },
};

export const InputTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full">
      <Input label="Email Input" type="email" placeholder="nexus@timmbr.design" />
      <Input label="Number Input" type="number" defaultValue="42" />
      <Input label="Search Input" type="search" placeholder="Search components..." leftAdornment={<Search className="w-4 h-4" />} />
      <Input label="Password Input" type="password" defaultValue="timber-craft" />
    </div>
  ),
};

export const MotionEffects: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full">
      <Input
        label="Animated Entrance & Focus"
        placeholder="Focus transitions animated..."
        motion="fade"
        helperText="Uses preset 'fade' animation."
      />
      <Input
        label="Motion Disabled"
        placeholder="Instant state transitions..."
        motion={false}
        helperText="All focus and hover animations disabled."
      />
    </div>
  ),
};

