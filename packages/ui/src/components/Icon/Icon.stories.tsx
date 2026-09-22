import type { Meta, StoryObj } from '@storybook/react';
import { Sparkles, Heart, Search, ArrowRight, Bell, Share2 } from '@timmbr/icons';
import { Icon } from './Icon';

const meta: Meta<typeof Icon> = {
  title: 'Components & Data/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Icon dimensions',
    },
    foreground: {
      control: 'select',
      options: ['inherit', 'default', 'muted', 'subtle', 'primary', 'destructive'],
      description: 'Foreground color token',
    },
    clickable: {
      control: 'boolean',
      description: 'Renders icon as interactive button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: {
    icon: Sparkles,
    size: 'lg',
    foreground: 'primary',
  },
};

export const LucideIcons: Story = {
  render: () => (
    <div className="flex gap-4 items-center text-foreground">
      <Icon icon={Sparkles} size="lg" foreground="primary" />
      <Icon icon={Search} size="lg" />
      <Icon icon={Heart} size="lg" foreground="destructive" />
      <Icon icon={Bell} size="lg" foreground="muted" />
      <Icon icon={Share2} size="lg" />
    </div>
  ),
};

export const ClickableButtonIcons: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Icon
        icon={Heart}
        clickable
        size="lg"
        foreground="destructive"
        aria-label="Favorite item"
        onClick={() => alert('Favorited!')}
      />
      <Icon
        icon={Bell}
        clickable
        size="lg"
        foreground="primary"
        aria-label="View notifications"
        onClick={() => alert('Notifications clicked')}
      />
      <Icon
        icon={Share2}
        clickable
        size="lg"
        aria-label="Share content"
        onClick={() => alert('Shared')}
      />
    </div>
  ),
};

export const CustomSvgAndRawContent: Story = {
  render: () => (
    <div className="flex gap-4 items-center">
      <Icon
        size="lg"
        foreground="primary"
        svg={
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        }
      />
      <Icon size="xl" foreground="muted">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" />
        </svg>
      </Icon>
    </div>
  ),
};

export const MotionEffects: Story = {
  render: () => (
    <div className="flex gap-6 items-center">
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Sparkles} clickable size="lg" foreground="primary" aria-label="Default animated" />
        <span className="text-xs text-muted-foreground">Animated (Pill + Tap)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icon icon={Sparkles} clickable motion={false} size="lg" foreground="muted" aria-label="Motion disabled" />
        <span className="text-xs text-muted-foreground">motion=false</span>
      </div>
    </div>
  ),
};

