import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Presence } from '../presence';
import { ScaleView } from '../components/ScaleView';

const meta: Meta = {
  title: 'Motion/Presence',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

export const PresenceDemo: Story = {
  render: () => {
    const [items, setItems] = React.useState(['Walnut Plank', 'Ash Hardwood', 'Cherry Timber']);

    const addItem = () => {
      const names = ['Birch Sheet', 'Cedar Post', 'Maple Lumber', 'Teak Beam'];
      const nextName = names[Math.floor(Math.random() * names.length)];
      setItems((prev) => [...prev, `${nextName} #${prev.length + 1}`]);
    };

    const removeItem = (idx: number) => {
      setItems((prev) => prev.filter((_, i) => i !== idx));
    };

    return (
      <div className="flex flex-col gap-6 max-w-md font-sans">
        <div>
          <button
            onClick={addItem}
            className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-md shadow-sm hover:bg-primary-600 transition-colors cursor-pointer"
          >
            Add Item to DOM
          </button>
        </div>

        <Presence>
          <div className="flex flex-col gap-2">
            {items.map((item, idx) => (
              <ScaleView
                key={item}
                className="flex items-center justify-between p-3 border border-grey-200 dark:border-grey-800 rounded-lg bg-card shadow-xs"
              >
                <span className="text-sm font-medium text-foreground">{item}</span>
                <button
                  onClick={() => removeItem(idx)}
                  className="text-xs text-destructive hover:underline cursor-pointer"
                >
                  Remove
                </button>
              </ScaleView>
            ))}
          </div>
        </Presence>
      </div>
    );
  },
};
