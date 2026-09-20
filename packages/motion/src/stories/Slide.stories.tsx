import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { SlideView } from '../components/SlideView';
import { AnimatePresence } from 'motion/react';

const meta: Meta = {
  title: 'Motion/Slide',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

export const SlideDirections: Story = {
  render: () => {
    const [direction, setDirection] = React.useState<'up' | 'down' | 'left' | 'right'>('up');
    const [key, setKey] = React.useState(0);

    const trigger = (dir: 'up' | 'down' | 'left' | 'right') => {
      setDirection(dir);
      setKey((k) => k + 1);
    };

    return (
      <div className="flex flex-col gap-6 max-w-md font-sans">
        <div className="flex gap-2">
          <button
            onClick={() => trigger('up')}
            className={`px-3 py-1.5 text-xs font-semibold rounded cursor-pointer transition-colors ${
              direction === 'up'
                ? 'bg-primary text-white'
                : 'bg-grey-100 dark:bg-grey-800 text-foreground hover:bg-grey-200'
            }`}
          >
            Slide Up
          </button>
          <button
            onClick={() => trigger('down')}
            className={`px-3 py-1.5 text-xs font-semibold rounded cursor-pointer transition-colors ${
              direction === 'down'
                ? 'bg-primary text-white'
                : 'bg-grey-100 dark:bg-grey-800 text-foreground hover:bg-grey-200'
            }`}
          >
            Slide Down
          </button>
          <button
            onClick={() => trigger('left')}
            className={`px-3 py-1.5 text-xs font-semibold rounded cursor-pointer transition-colors ${
              direction === 'left'
                ? 'bg-primary text-white'
                : 'bg-grey-100 dark:bg-grey-800 text-foreground hover:bg-grey-200'
            }`}
          >
            Slide Left
          </button>
          <button
            onClick={() => trigger('right')}
            className={`px-3 py-1.5 text-xs font-semibold rounded cursor-pointer transition-colors ${
              direction === 'right'
                ? 'bg-primary text-white'
                : 'bg-grey-100 dark:bg-grey-800 text-foreground hover:bg-grey-200'
            }`}
          >
            Slide Right
          </button>
        </div>

        <AnimatePresence mode="wait">
          <SlideView
            key={key}
            direction={direction}
            className="p-6 bg-card border border-grey-200 dark:border-grey-800 rounded-xl shadow-md"
          >
            <h4 className="font-semibold text-sm text-foreground">
              Slide Direction: <span className="text-primary uppercase">{direction}</span>
            </h4>
            <p className="text-xs text-muted-foreground mt-1">
              Combines directional offset with opacity fade-in for fluid navigational transitions.
            </p>
          </SlideView>
        </AnimatePresence>
      </div>
    );
  },
};
