import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { FadeView } from '../components/FadeView';
import { AnimatePresence } from 'motion/react';

const meta: Meta = {
  title: 'Motion/Fade',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

export const FadeDemo: Story = {
  render: () => {
    const [visible, setVisible] = React.useState(true);

    return (
      <div className="flex flex-col gap-6 max-w-md font-sans">
        <button
          onClick={() => setVisible((v) => !v)}
          className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-md shadow-sm hover:bg-primary-600 transition-colors cursor-pointer w-fit"
        >
          Toggle Fade ({visible ? 'Hide' : 'Show'})
        </button>

        <AnimatePresence mode="wait">
          {visible && (
            <FadeView className="p-6 bg-card border border-grey-200 dark:border-grey-800 rounded-xl shadow-md">
              <h4 className="font-semibold text-sm text-foreground">Fade Entrance Effect</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Smooth opacity animation tuned for soft entrances and non-jarring UI reveals.
              </p>
            </FadeView>
          )}
        </AnimatePresence>
      </div>
    );
  },
};
