import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { tokens } from '@timmbr/theme';

const meta = {
  title: 'Foundations/Radius',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const RadiusScale: Story = {
  render: () => (
    <div className="max-w-4xl p-8 bg-white dark:bg-grey-900 rounded-xl border border-grey-200 dark:border-grey-800 shadow-sm font-sans space-y-6">
      <div>
        <h2 className="text-h4 font-display text-foreground">Corner Radius</h2>
        <p className="text-body-2 text-muted-foreground mt-1">
          Harmonized curvature tokens ranging from precision borders to fully circular pills.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
        {Object.entries(tokens.radius).map(([token, value]) => (
          <div key={token} className="flex flex-col items-center gap-3">
            <div
              className="w-24 h-24 bg-primary/10 border-2 border-primary flex items-center justify-center text-xs font-semibold text-primary transition-all"
              style={{ borderRadius: value }}
            >
              {token}
            </div>
            <div className="text-center">
              <div className="text-xs font-semibold text-foreground">rounded-{token}</div>
              <div className="text-[11px] font-mono text-muted-foreground">{value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
