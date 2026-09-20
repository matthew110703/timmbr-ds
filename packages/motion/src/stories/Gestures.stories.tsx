import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';

const meta: Meta = {
  title: 'Motion/Gestures',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

export const GesturesDemo: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-6 max-w-xl font-sans">
        <div>
          <h3 className="text-lg font-display font-semibold text-foreground">Interactive Gestures</h3>
          <p className="text-xs text-muted-foreground mt-1">
            Interact with the cards below to preview Hover lift, Tap compression, and Focus rings.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Hover Lift */}
          <div className="p-5 border border-grey-200 dark:border-grey-800 rounded-xl bg-card transition-all duration-200 hover:-translate-y-1.5 hover:shadow-lg cursor-pointer">
            <span className="text-xs font-semibold text-primary uppercase">Hover Gesture</span>
            <h4 className="font-semibold text-sm text-foreground mt-1">Elevation Lift</h4>
            <p className="text-xs text-muted-foreground mt-2">
              Smooth translateY(-6px) with dynamic shadow bloom.
            </p>
          </div>

          {/* Tap Compression */}
          <div className="p-5 border border-grey-200 dark:border-grey-800 rounded-xl bg-card transition-all duration-150 active:scale-95 cursor-pointer select-none">
            <span className="text-xs font-semibold text-primary uppercase">Tap Gesture</span>
            <h4 className="font-semibold text-sm text-foreground mt-1">Press Feedback</h4>
            <p className="text-xs text-muted-foreground mt-2">
              Instant scale(0.95) compression on click/tap event.
            </p>
          </div>

          {/* Focus Ring */}
          <button className="p-5 border border-grey-200 dark:border-grey-800 rounded-xl bg-card text-left outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-all cursor-pointer">
            <span className="text-xs font-semibold text-primary uppercase">Focus Gesture</span>
            <h4 className="font-semibold text-sm text-foreground mt-1">Keyboard Ring</h4>
            <p className="text-xs text-muted-foreground mt-2">
              Tab into this button to trigger the accessibility focus ring.
            </p>
          </button>
        </div>
      </div>
    );
  },
};
