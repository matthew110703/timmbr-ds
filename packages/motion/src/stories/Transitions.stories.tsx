import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

const meta: Meta = {
  title: 'Motion/Transitions',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

export const TransitionsDemo: Story = {
  render: () => {
    const [active, setActive] = React.useState(false);

    return (
      <div className="flex flex-col gap-6 max-w-2xl font-sans">
        <div>
          <button
            onClick={() => setActive((v) => !v)}
            className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-md shadow-sm hover:bg-primary-600 transition-colors cursor-pointer"
          >
            Toggle Animation ({active ? 'Reset' : 'Trigger'})
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono text-muted-foreground">Instant (0ms)</span>
            <div className="h-10 bg-grey-100 dark:bg-grey-800 rounded-md p-1 relative overflow-hidden">
              <div
                className="h-full bg-primary rounded-sm transition-none"
                style={{ width: active ? '100%' : '15%' }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono text-muted-foreground">Fast (150ms)</span>
            <div className="h-10 bg-grey-100 dark:bg-grey-800 rounded-md p-1 relative overflow-hidden">
              <div
                className="h-full bg-primary rounded-sm transition-all duration-150 ease-out"
                style={{ width: active ? '100%' : '15%' }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono text-muted-foreground">Normal (250ms)</span>
            <div className="h-10 bg-grey-100 dark:bg-grey-800 rounded-md p-1 relative overflow-hidden">
              <div
                className="h-full bg-primary rounded-sm transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{ width: active ? '100%' : '15%' }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono text-muted-foreground">Slow (400ms)</span>
            <div className="h-10 bg-grey-100 dark:bg-grey-800 rounded-md p-1 relative overflow-hidden">
              <div
                className="h-full bg-primary rounded-sm transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ width: active ? '100%' : '15%' }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-xs font-mono text-muted-foreground">Spring / Bounce Physics</span>
            <div className="h-10 bg-grey-100 dark:bg-grey-800 rounded-md p-1 relative overflow-hidden">
              <div
                className="h-full bg-primary rounded-sm transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                style={{ width: active ? '100%' : '15%' }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
};
