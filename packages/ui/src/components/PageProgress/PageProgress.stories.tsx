import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { PageProgress } from './PageProgress';

const meta: Meta<typeof PageProgress> = {
  title: 'Feedback/PageProgress',
  component: PageProgress,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'NProgress-style slim line fixed at the very top of the viewport. Mount it or set `loading={true}` to show; set `loading={false}` to complete and fade out.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageProgress>;

export const Indeterminate: Story = {
  render: () => {
    const [loading, setLoading] = React.useState(false);
    return (
      <div className="p-8 flex flex-col gap-4">
        <PageProgress loading={loading} />
        <div className="flex gap-3">
          <button
            type="button"
            className="rounded-md bg-primary text-white px-4 py-2 text-sm font-semibold"
            onClick={() => setLoading(true)}
            disabled={loading}
          >
            Start
          </button>
          <button
            type="button"
            className="rounded-md border border-grey-300 px-4 py-2 text-sm font-semibold"
            onClick={() => setLoading(false)}
            disabled={!loading}
          >
            Finish
          </button>
        </div>
        <p className="text-body-3 text-grey-500">Click Start to begin loading, Finish to complete.</p>
      </div>
    );
  },
};

export const Determinate: Story = {
  render: () => {
    const [progress, setProgress] = React.useState(0);
    const [loading, setLoading] = React.useState(true);
    return (
      <div className="p-8 flex flex-col gap-4">
        <PageProgress loading={loading} progress={progress} />
        <label className="flex flex-col gap-2">
          <span className="text-body-3 font-medium">Progress: {progress}%</span>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(e) => {
              setProgress(Number(e.target.value));
              setLoading(true);
            }}
            className="w-64"
          />
        </label>
        <button
          type="button"
          className="w-fit rounded-md border border-grey-300 px-4 py-2 text-sm font-semibold"
          onClick={() => { setLoading(false); setProgress(0); }}
        >
          Complete &amp; reset
        </button>
      </div>
    );
  },
};

export const CustomColor: Story = {
  args: {
    loading: true,
    color: 'bg-success',
    height: 4,
  },
};

export const NoAnimation: Story = {
  render: () => {
    const [loading, setLoading] = React.useState(false);
    return (
      <div className="p-8 flex flex-col gap-4">
        <PageProgress loading={loading} motion={false} />
        <div className="flex gap-3">
          <button
            type="button"
            className="rounded-md bg-primary text-white px-4 py-2 text-sm font-semibold"
            onClick={() => setLoading((v) => !v)}
          >
            Toggle (no animation)
          </button>
        </div>
      </div>
    );
  },
};
