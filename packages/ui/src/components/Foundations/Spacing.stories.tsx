import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { tokens } from '@timmbr/theme';

const meta = {
  title: 'Foundations/Spacing',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const SpacingScale: Story = {
  render: () => (
    <div className="max-w-4xl p-8 bg-white dark:bg-grey-900 rounded-xl border border-grey-200 dark:border-grey-800 shadow-sm font-sans space-y-6">
      <div>
        <h2 className="text-h4 font-display text-foreground">Spacing Scale</h2>
        <p className="text-body-2 text-muted-foreground mt-1">
          Standard 4px-based geometric spacing scale for margins, padding, and layout gaps.
        </p>
      </div>

      <div className="space-y-3 divide-y divide-grey-100 dark:divide-grey-800">
        {Object.entries(tokens.spacing).map(([token, value]) => (
          <div key={token} className="pt-3 flex items-center gap-6">
            <div className="w-24 shrink-0 font-mono text-xs font-semibold text-foreground">
              spacing-{token}
            </div>
            <div className="w-16 shrink-0 font-mono text-xs text-muted-foreground">
              {value}
            </div>
            <div className="flex-1 flex items-center">
              <div
                className="h-6 bg-primary rounded-sm transition-all"
                style={{ width: value }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
};
