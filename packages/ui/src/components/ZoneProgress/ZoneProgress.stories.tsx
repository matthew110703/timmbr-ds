import type { Meta, StoryObj } from '@storybook/react';
import { ZoneProgress } from './ZoneProgress';
import { PageProgress } from '../PageProgress';

const meta: Meta<typeof ZoneProgress> = {
  title: 'Feedback/ZoneProgress',
  component: ZoneProgress,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Infrastructure component — mount once in each zone root layout inside `TimmbrConfigProvider`. Handles three behaviours automatically: within-zone router progress (patches `history.pushState`), cross-zone click loading, and cross-zone link hover prefetch via `<link rel="prefetch">`. Renders nothing when idle; the slim `PageProgress` bar appears only during navigation.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ZoneProgress>;

/** Mounted and idle — no navigation in progress. The component renders nothing visible. */
export const Idle: Story = {};

/** Bar mid-trickle at ~60% — what a user sees during a slightly slow navigation. ZoneProgress drives this automatically; the story previews it via PageProgress directly. */
export const Active: Story = {
  render: () => <PageProgress loading progress={60} />,
};

/** Bar at 100% just before the fade-out. */
export const Completing: Story = {
  render: () => <PageProgress loading progress={100} />,
};
