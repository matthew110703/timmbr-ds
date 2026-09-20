import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ScaleView } from '../components/ScaleView';
import { AnimatePresence } from 'motion/react';

const meta: Meta = {
  title: 'Motion/Scale',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

export const ScaleDemo: Story = {
  render: () => {
    const [visible, setVisible] = React.useState(true);

    return (
      <div className="flex flex-col gap-6 max-w-md font-sans">
        <div className="flex gap-3">
          <button
            onClick={() => setVisible((v) => !v)}
            className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-md shadow-sm hover:bg-primary-600 transition-colors cursor-pointer"
          >
            Toggle Scale ({visible ? 'Hide' : 'Show'})
          </button>
        </div>

        <AnimatePresence mode="wait">
          {visible && (
            <ScaleView
              className="p-6 bg-card border border-grey-200 dark:border-grey-800 rounded-xl shadow-md"
            >
              <h4 className="font-semibold text-sm text-foreground">Scale & Zoom Entrance</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Gently zooms from 94% to 100% scale using spring physics. Ideal for modal dialogs, popovers, and alerts.
              </p>
            </ScaleView>
          )}
        </AnimatePresence>
      </div>
    );
  },
};
