import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { motion } from 'motion/react';

const meta: Meta = {
  title: 'Motion/Layout',
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj;

export const SharedLayoutIndicator: Story = {
  render: () => {
    const [activeTab, setActiveTab] = React.useState('spec');
    const tabs = [
      { id: 'spec', label: 'Specifications' },
      { id: 'grain', label: 'Wood Grain' },
      { id: 'finishes', label: 'Finishes' },
    ];

    return (
      <div className="flex flex-col gap-6 max-w-lg font-sans">
        <div>
          <h3 className="text-lg font-display font-semibold text-foreground">
            Shared Layout Transition
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Active pill indicator glides smoothly across tabs using layout physics.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-grey-100 dark:bg-grey-800 rounded-lg w-fit">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  isActive ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="motion-tab-active-pill"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    className="absolute inset-0 bg-primary rounded-md shadow-xs -z-0"
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  },
};

