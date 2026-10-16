import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { ScrollRail } from './ScrollRail';

const SampleCard = ({ label }: { label: string }) => (
  <div className="w-[240px] sm:w-[270px] shrink-0 snap-start aspect-square rounded-sm bg-grey-100 border border-grey-200 flex items-center justify-center text-body-2 text-grey-500 select-none">
    {label}
  </div>
);

const items = Array.from({ length: 8 }, (_, i) => `Item ${i + 1}`);

const meta: Meta<typeof ScrollRail> = {
  title: 'Layout/ScrollRail',
  component: ScrollRail,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div className="p-6 max-w-4xl mx-auto">
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof ScrollRail>;

export const Default: Story = {
  render: () => (
    <ScrollRail>
      {items.map((l) => (
        <SampleCard key={l} label={l} />
      ))}
    </ScrollRail>
  ),
};

export const GapVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      {(['sm', 'md', 'lg'] as const).map((gap) => (
        <div key={gap}>
          <p className="mb-2 text-caption text-grey-400 uppercase tracking-wide">gap="{gap}"</p>
          <ScrollRail gap={gap}>
            {items.map((l) => (
              <SampleCard key={l} label={l} />
            ))}
          </ScrollRail>
        </div>
      ))}
    </div>
  ),
};

export const NoChevrons: Story = {
  render: () => (
    <ScrollRail hideChevrons>
      {items.map((l) => (
        <SampleCard key={l} label={l} />
      ))}
    </ScrollRail>
  ),
};

export const FewItems: Story = {
  name: 'Few items (no overflow)',
  render: () => (
    <ScrollRail>
      {Array.from({ length: 2 }, (_, i) => (
        <SampleCard key={i} label={`Item ${i + 1}`} />
      ))}
    </ScrollRail>
  ),
};

export const FixedScrollAmount: Story = {
  render: () => (
    <ScrollRail scrollAmount={200}>
      {items.map((l) => (
        <SampleCard key={l} label={l} />
      ))}
    </ScrollRail>
  ),
};
