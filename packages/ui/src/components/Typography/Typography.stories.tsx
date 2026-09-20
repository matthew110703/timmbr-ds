import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

const meta = {
  title: 'Foundations/Typography',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Direct implementation of Figma Typography node #5:22
 * - Headings (H1-H6): DM Serif Display (400)
 * - Subtitles, Body, and Captions: Manrope (300, 400, 500, 600)
 * - Page Title: Outfit (700)
 */
export const Specification: Story = {
  render: () => (
    <div className="max-w-4xl bg-white dark:bg-grey-900 text-grey-1000 dark:text-grey-50 p-8 rounded-xl border border-grey-200 dark:border-grey-800 shadow-sm space-y-12">
      {/* Header */}
      <div className="border-b border-grey-200 dark:border-grey-800 pb-6">
        <span className="text-xs uppercase tracking-wider text-grey-500 dark:text-grey-400 font-sans font-medium">
          Timmbr Design System / Typography (#5:22)
        </span>
        <h1 className="text-page-title text-grey-1000 dark:text-grey-50 mt-2">Typography</h1>
        <p className="text-body-1 text-grey-600 dark:text-grey-300 mt-1">
          Editorial serif display headings paired with high-legibility geometric sans-serif for UI, body, and subtitles.
        </p>
      </div>

      {/* Headings Section */}
      <div className="space-y-6">
        <div className="flex items-baseline justify-between border-b border-grey-200 dark:border-grey-800 pb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Headings (DM Serif Display)
          </span>
          <span className="text-xs text-grey-400 dark:text-grey-500 font-mono">Font: DM Serif Display / Regular 400 / Line Height: 1.3em</span>
        </div>

        <div className="space-y-6">
          <div className="flex items-baseline justify-between gap-8 pb-4 border-b border-grey-100 dark:border-grey-800/60">
            <h1 className="text-h1">Typography / h1</h1>
            <span className="text-xs text-grey-400 dark:text-grey-500 font-mono shrink-0">64px (4rem) / 1.3</span>
          </div>

          <div className="flex items-baseline justify-between gap-8 pb-4 border-b border-grey-100 dark:border-grey-800/60">
            <h2 className="text-h2">Typography / h2</h2>
            <span className="text-xs text-grey-400 dark:text-grey-500 font-mono shrink-0">48px (3rem) / 1.3</span>
          </div>

          <div className="flex items-baseline justify-between gap-8 pb-4 border-b border-grey-100 dark:border-grey-800/60">
            <h3 className="text-h3">Typography / h3</h3>
            <span className="text-xs text-grey-400 dark:text-grey-500 font-mono shrink-0">32px (2rem) / 1.3</span>
          </div>

          <div className="flex items-baseline justify-between gap-8 pb-4 border-b border-grey-100 dark:border-grey-800/60">
            <h4 className="text-h4">Typography / h4</h4>
            <span className="text-xs text-grey-400 dark:text-grey-500 font-mono shrink-0">24px (1.5rem) / 1.3 / -0.02em</span>
          </div>

          <div className="flex items-baseline justify-between gap-8 pb-4 border-b border-grey-100 dark:border-grey-800/60">
            <h5 className="text-h5">Typography / h5</h5>
            <span className="text-xs text-grey-400 dark:text-grey-500 font-mono shrink-0">20px (1.25rem) / 1.3</span>
          </div>

          <div className="flex items-baseline justify-between gap-8">
            <h6 className="text-h6">Typography / h6</h6>
            <span className="text-xs text-grey-400 dark:text-grey-500 font-mono shrink-0">20px (1.25rem) / 1.3</span>
          </div>
        </div>
      </div>

      {/* Subtitles & Body Section */}
      <div className="space-y-6">
        <div className="flex items-baseline justify-between border-b border-grey-200 dark:border-grey-800 pb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            Subtitles & Body (Manrope)
          </span>
          <span className="text-xs text-grey-400 dark:text-grey-500 font-mono">Font: Manrope / Line Height: 1.3em</span>
        </div>

        <div className="space-y-4">
          <div className="flex items-baseline justify-between gap-8 pb-3 border-b border-grey-100 dark:border-grey-800/60">
            <p className="text-subtitle-1">Typography / Subtitle 1</p>
            <span className="text-xs text-grey-400 dark:text-grey-500 font-mono shrink-0">18px / SemiBold 600</span>
          </div>

          <div className="flex items-baseline justify-between gap-8 pb-3 border-b border-grey-100 dark:border-grey-800/60">
            <p className="text-subtitle-2">Typography / Subtitle 2</p>
            <span className="text-xs text-grey-400 dark:text-grey-500 font-mono shrink-0">18px / SemiBold 600</span>
          </div>

          <div className="flex items-baseline justify-between gap-8 pb-3 border-b border-grey-100 dark:border-grey-800/60">
            <p className="text-body-1">Typography / Body 1</p>
            <span className="text-xs text-grey-400 dark:text-grey-500 font-mono shrink-0">16px / Regular 400</span>
          </div>

          <div className="flex items-baseline justify-between gap-8 pb-3 border-b border-grey-100 dark:border-grey-800/60">
            <p className="text-body-2-medium">Typography / Body 2 Medium</p>
            <span className="text-xs text-grey-400 dark:text-grey-500 font-mono shrink-0">14px / Medium 500</span>
          </div>

          <div className="flex items-baseline justify-between gap-8 pb-3 border-b border-grey-100 dark:border-grey-800/60">
            <p className="text-body-2-semibold">Typography / Body 2 Semibold</p>
            <span className="text-xs text-grey-400 dark:text-grey-500 font-mono shrink-0">14px / SemiBold 600</span>
          </div>

          <div className="flex items-baseline justify-between gap-8 pb-3 border-b border-grey-100 dark:border-grey-800/60">
            <p className="text-body-2">Typography / Body 2</p>
            <span className="text-xs text-grey-400 dark:text-grey-500 font-mono shrink-0">14px / Regular 400</span>
          </div>

          <div className="flex items-baseline justify-between gap-8 pb-3 border-b border-grey-100 dark:border-grey-800/60">
            <p className="text-body-2-light">Typography / Body 2 Light</p>
            <span className="text-xs text-grey-400 dark:text-grey-500 font-mono shrink-0">14px / Light 300</span>
          </div>

          <div className="flex items-baseline justify-between gap-8 pb-3 border-b border-grey-100 dark:border-grey-800/60">
            <p className="text-body-3">Typography / Body 3</p>
            <span className="text-xs text-grey-400 dark:text-grey-500 font-mono shrink-0">12px / Regular 400</span>
          </div>

          <div className="flex items-baseline justify-between gap-8">
            <p className="text-body-3-light">Typography / Captions Body 3 Light</p>
            <span className="text-xs text-grey-400 dark:text-grey-500 font-mono shrink-0">12px / Light 300</span>
          </div>
        </div>
      </div>
    </div>
  ),
};
