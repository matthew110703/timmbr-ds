import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { tokens } from '@timmbr/theme';

const meta = {
  title: 'Foundations/Shadows',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ElevationShadows: Story = {
  render: () => (
    <div className="max-w-4xl p-8 bg-white dark:bg-grey-900 rounded-xl border border-grey-200 dark:border-grey-800 shadow-sm font-sans space-y-6">
      <div>
        <h2 className="text-h4 font-display text-foreground">Elevation & Shadows</h2>
        <p className="text-body-2 text-muted-foreground mt-1">
          Elevation levels for cards, modals, dropdowns, and floating elements.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-4">
        {Object.entries(tokens.shadows).map(([token, value]) => (
          <div
            key={token}
            className="p-6 rounded-lg bg-white dark:bg-grey-800 border border-grey-100 dark:border-grey-700 flex flex-col items-center justify-center gap-2 min-h-[140px] transition-all"
            style={{ boxShadow: value }}
          >
            <span className="font-semibold text-sm text-foreground">shadow-{token}</span>
            <span className="text-[10px] font-mono text-muted-foreground text-center line-clamp-2 px-2">
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};
