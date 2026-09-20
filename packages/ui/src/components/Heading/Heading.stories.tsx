import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading';

const meta: Meta<typeof Heading> = {
  title: 'Components & Data/Heading',
  component: Heading,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'Heading hierarchy level (1-6)',
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      description: 'Underlying HTML heading tag override',
    },
    font: {
      control: 'select',
      options: ['display', 'title'],
      description: 'Font family: display (DM Serif Display) or title (Outfit)',
    },
    foreground: {
      control: 'select',
      options: ['default', 'muted', 'subtle', 'primary', 'secondary', 'destructive'],
      description: 'Foreground color token',
    },
    weight: {
      control: 'select',
      options: ['light', 'normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight override',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    children: 'Editorial Display Heading',
    level: 1,
    font: 'display',
  },
};

export const AllLevels: Story = {
  render: () => (
    <div className="space-y-6 max-w-3xl">
      <Heading level={1}>Heading 1 — 64px Editorial Serif</Heading>
      <Heading level={2}>Heading 2 — 48px Editorial Serif</Heading>
      <Heading level={3}>Heading 3 — 32px Editorial Serif</Heading>
      <Heading level={4}>Heading 4 — 24px Editorial Serif</Heading>
      <Heading level={5}>Heading 5 — 20px Editorial Serif</Heading>
      <Heading level={6}>Heading 6 — 20px Editorial Serif</Heading>
    </div>
  ),
};

export const OutfitPageTitle: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Heading level={2} font="title">
        Page Title — 48px Outfit Bold
      </Heading>
      <Heading level={3} font="title" weight="semibold">
        Section Title — 32px Outfit SemiBold
      </Heading>
    </div>
  ),
};

export const ForegroundColors: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Heading level={2} foreground="default">Default Heading Color</Heading>
      <Heading level={2} foreground="primary">Primary Timber Terra-cotta Heading</Heading>
      <Heading level={2} foreground="muted">Muted Heading Color</Heading>
      <Heading level={2} foreground="secondary">Secondary Accent Heading</Heading>
    </div>
  ),
};
