import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta: Meta<typeof Text> = {
  title: 'Components & Data/Text',
  component: Text,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['p', 'span'],
      description: 'The HTML element to render',
    },
    variant: {
      control: 'select',
      options: [
        'body-1',
        'body-2',
        'body-2-medium',
        'body-2-semibold',
        'body-2-light',
        'body-3',
        'body-3-light',
        'subtitle-1',
        'subtitle-2',
        'caption',
      ],
      description: 'Typography style variant',
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
    italic: {
      control: 'boolean',
      description: 'Applies italic style',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children:
      'Timmbr design system provides high-legibility geometric typography crafted for modern digital applications.',
    variant: 'body-1',
    as: 'p',
  },
};

export const ParagraphVsSpan: Story = {
  render: () => (
    <div className="space-y-4 max-w-xl">
      <Text as="p" variant="body-1">
        This is a block-level paragraph element (<Text as="span" weight="bold">as="p"</Text>) ideal for standard reading text and narrative descriptions.
      </Text>
      <div>
        <Text as="span" variant="body-2-semibold" foreground="primary">
          Inline Span:
        </Text>{' '}
        <Text as="span" variant="body-2" foreground="muted">
          This sentence uses an inline span element (<Text as="span" italic>as="span"</Text>) for embedded text.
        </Text>
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-3 max-w-2xl">
      <Text variant="subtitle-1">Subtitle 1 — 18px SemiBold</Text>
      <Text variant="subtitle-2">Subtitle 2 — 18px SemiBold</Text>
      <Text variant="body-1">Body 1 — 16px Regular reading text</Text>
      <Text variant="body-2">Body 2 — 14px Regular UI text</Text>
      <Text variant="body-2-medium">Body 2 Medium — 14px Medium emphasis</Text>
      <Text variant="body-2-semibold">Body 2 SemiBold — 14px Strong emphasis</Text>
      <Text variant="body-2-light">Body 2 Light — 14px Light weight</Text>
      <Text variant="body-3">Body 3 — 12px Compact caption text</Text>
      <Text variant="body-3-light">Body 3 Light — 12px Light metadata</Text>
      <Text variant="caption">CAPTION — 11px Uppercase metadata label</Text>
    </div>
  ),
};

export const WeightsAndStyles: Story = {
  render: () => (
    <div className="space-y-2 max-w-lg">
      <Text weight="light">Light weight (300)</Text>
      <Text weight="normal">Normal weight (400)</Text>
      <Text weight="medium">Medium weight (500)</Text>
      <Text weight="semibold">SemiBold weight (600)</Text>
      <Text weight="bold">Bold weight (700)</Text>
      <Text italic foreground="primary">Italic styled with primary foreground</Text>
    </div>
  ),
};

export const ForegroundColors: Story = {
  render: () => (
    <div className="space-y-2 max-w-lg">
      <Text foreground="default">Default Foreground Text</Text>
      <Text foreground="muted">Muted Foreground Text</Text>
      <Text foreground="subtle">Subtle Secondary Text</Text>
      <Text foreground="primary">Primary Timber Accent (#C0643A)</Text>
      <Text foreground="destructive">Destructive Warning Text</Text>
    </div>
  ),
};
