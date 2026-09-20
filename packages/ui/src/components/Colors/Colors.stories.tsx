import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { tokens } from '@timmbr/theme';

const meta = {
  title: 'Foundations/Colors',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

interface SwatchProps {
  name: string;
  hex: string;
  className: string;
  isBase?: boolean;
}

const ColorSwatch: React.FC<SwatchProps> = ({ name, hex, className, isBase }) => (
  <div className="flex flex-col items-center">
    <div
      className={`w-24 h-24 rounded-lg shadow-sm border border-grey-200/40 dark:border-grey-700/60 relative flex items-center justify-center ${className}`}
      style={{ backgroundColor: hex }}
    >
      {isBase && (
        <span className="absolute top-2 right-2 bg-white/90 dark:bg-grey-900/90 text-grey-900 dark:text-grey-100 text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
          BASE
        </span>
      )}
    </div>
    <span className="mt-2 text-xs font-semibold text-grey-900 dark:text-grey-100">{name}</span>
    <span className="text-[11px] font-mono text-grey-500 dark:text-grey-400 uppercase">{hex}</span>
  </div>
);

export const Palettes: Story = {
  render: () => (
    <div className="max-w-5xl space-y-12 p-8 bg-white dark:bg-grey-900 rounded-xl border border-grey-200 dark:border-grey-800 shadow-sm font-sans">
      {/* Primary Scale */}
      <div>
        <div className="border-b border-grey-200 dark:border-grey-800 pb-3 mb-6">
          <h3 className="text-h4 text-grey-1000 dark:text-grey-50 font-display">Primary Colour Scale</h3>
          <p className="text-body-2 text-grey-600 dark:text-grey-300">
            Node #6:121 — Warm terra-cotta timber palette. Default base is <strong>500</strong> (accessible via <code>bg-primary</code> or <code>bg-primary-500</code>).
          </p>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-4">
          <ColorSwatch name="1000" hex={tokens.colors.primary[1000]} className="" />
          <ColorSwatch name="900" hex={tokens.colors.primary[900]} className="" />
          <ColorSwatch name="800" hex={tokens.colors.primary[800]} className="" />
          <ColorSwatch name="700" hex={tokens.colors.primary[700]} className="" />
          <ColorSwatch name="600" hex={tokens.colors.primary[600]} className="" />
          <ColorSwatch name="500 (Base)" hex={tokens.colors.primary[500]} className="" isBase />
          <ColorSwatch name="400" hex={tokens.colors.primary[400]} className="" />
          <ColorSwatch name="300" hex={tokens.colors.primary[300]} className="" />
          <ColorSwatch name="200" hex={tokens.colors.primary[200]} className="" />
          <ColorSwatch name="100" hex={tokens.colors.primary[100]} className="" />
          <ColorSwatch name="50" hex={tokens.colors.primary[50]} className="" />
        </div>
      </div>

      {/* Backgrounds */}
      <div>
        <div className="border-b border-grey-200 dark:border-grey-800 pb-3 mb-6">
          <h3 className="text-h4 text-grey-1000 dark:text-grey-50 font-display">Backgrounds</h3>
          <p className="text-body-2 text-grey-600 dark:text-grey-300">
            Node #6:134 — Warm organic surface backgrounds.
          </p>
        </div>
        <div className="flex flex-wrap gap-8">
          <ColorSwatch name="BG -1 (Subtle)" hex={tokens.colors.backgrounds.subtle} className="" />
          <ColorSwatch name="BG 1 (Surface 1)" hex={tokens.colors.backgrounds.surface1} className="" />
          <ColorSwatch name="BG 2 (Surface 2)" hex={tokens.colors.backgrounds.surface2} className="" />
        </div>
      </div>

      {/* Greys Scale */}
      <div>
        <div className="border-b border-grey-200 dark:border-grey-800 pb-3 mb-6">
          <h3 className="text-h4 text-grey-1000 dark:text-grey-50 font-display">Grey’s Scale (Neutral)</h3>
          <p className="text-body-2 text-grey-600 dark:text-grey-300">
            Node #6:140 — Neutral scale from pure black/deep charcoal (1000) to pure white (50).
          </p>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-11 gap-4">
          <ColorSwatch name="1000" hex={tokens.colors.greys[1000]} className="" />
          <ColorSwatch name="900" hex={tokens.colors.greys[900]} className="" />
          <ColorSwatch name="800" hex={tokens.colors.greys[800]} className="" />
          <ColorSwatch name="700" hex={tokens.colors.greys[700]} className="" />
          <ColorSwatch name="600" hex={tokens.colors.greys[600]} className="" />
          <ColorSwatch name="500" hex={tokens.colors.greys[500]} className="" />
          <ColorSwatch name="400" hex={tokens.colors.greys[400]} className="" />
          <ColorSwatch name="300" hex={tokens.colors.greys[300]} className="" />
          <ColorSwatch name="200" hex={tokens.colors.greys[200]} className="" />
          <ColorSwatch name="100" hex={tokens.colors.greys[100]} className="" />
          <ColorSwatch name="50" hex={tokens.colors.greys[50]} className="" />
        </div>
      </div>
    </div>
  ),
};
