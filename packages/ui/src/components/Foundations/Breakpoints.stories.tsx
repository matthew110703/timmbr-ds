import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { tokens } from '@timmbr/theme';

const meta = {
  title: 'Foundations/Breakpoints',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ResponsiveBreakpoints: Story = {
  render: () => (
    <div className="max-w-4xl p-8 bg-white dark:bg-grey-900 rounded-xl border border-grey-200 dark:border-grey-800 shadow-sm font-sans space-y-6">
      <div>
        <h2 className="text-h4 font-display text-foreground">Responsive Breakpoints</h2>
        <p className="text-body-2 text-muted-foreground mt-1">
          Standard screen width thresholds matching modern responsive display targets.
        </p>
      </div>

      <div className="space-y-4">
        {Object.entries(tokens.breakpoints).map(([token, value]) => (
          <div
            key={token}
            className="p-4 rounded-lg bg-grey-50 dark:bg-grey-800/60 border border-grey-200 dark:border-grey-700 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="w-16 font-mono text-sm font-bold text-primary">{token}</span>
              <span className="text-sm font-medium text-foreground">
                {token === 'sm' && 'Mobile Landscape / Small Tablets'}
                {token === 'md' && 'Tablets Portrait'}
                {token === 'lg' && 'Laptops & Landscape Tablets'}
                {token === 'xl' && 'Desktops'}
                {token === '2xl' && 'Large Screens & Monitors'}
              </span>
            </div>
            <span className="font-mono text-xs px-2.5 py-1 rounded bg-white dark:bg-grey-900 border border-grey-200 dark:border-grey-700 text-foreground font-semibold">
              ≥ {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};
