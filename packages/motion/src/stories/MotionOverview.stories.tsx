import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { transitions } from '../transitions';

const meta: Meta = {
  title: 'Motion/Overview',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

export const Overview: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-8 max-w-4xl font-sans">
        <div>
          <h2 className="text-2xl font-display font-semibold text-foreground">
            Timmbr Motion Architecture
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Physics-driven motion tokens, spring curves, presence orchestration, and gestures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 border border-grey-200 dark:border-grey-800 rounded-xl bg-card">
            <h3 className="font-semibold text-sm text-foreground">Transitions</h3>
            <p className="text-xs text-muted-foreground mt-1 mb-4">
              Instant, Fast (150ms), Normal (250ms), Slow (400ms), and Spring physics.
            </p>
            <div className="flex flex-col gap-2">
              {Object.entries(transitions).map(([key, val]) => (
                <div
                  key={key}
                  className="flex items-center justify-between text-xs py-1 border-b border-grey-100 dark:border-grey-800 last:border-0"
                >
                  <span className="font-mono text-primary">{key}</span>
                  <span className="text-muted-foreground font-mono">
                    {'duration' in val ? `${(val as any).duration * 1000}ms` : 'spring physics'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 border border-grey-200 dark:border-grey-800 rounded-xl bg-card">
            <h3 className="font-semibold text-sm text-foreground">Variants</h3>
            <p className="text-xs text-muted-foreground mt-1 mb-4">
              Preset orchestrations for Fade, Slide, Scale, FadeSlide, and Collapse.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              <span className="p-2 rounded bg-grey-100 dark:bg-grey-800 text-foreground">fadeVariants</span>
              <span className="p-2 rounded bg-grey-100 dark:bg-grey-800 text-foreground">slideVariants</span>
              <span className="p-2 rounded bg-grey-100 dark:bg-grey-800 text-foreground">scaleVariants</span>
              <span className="p-2 rounded bg-grey-100 dark:bg-grey-800 text-foreground">fadeSlide</span>
              <span className="p-2 rounded bg-grey-100 dark:bg-grey-800 text-foreground">collapse</span>
              <span className="p-2 rounded bg-grey-100 dark:bg-grey-800 text-foreground">popVariants</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
};
