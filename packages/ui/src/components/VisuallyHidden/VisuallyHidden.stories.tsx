import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { VisuallyHidden } from './VisuallyHidden';
import { Button } from '../Button';

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Data Display/VisuallyHidden',
  component: VisuallyHidden,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof VisuallyHidden>;

/** The label text is visually absent but present in the accessibility tree. Inspect with a screen reader or the browser accessibility tree panel. */
export const Default: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-4">
      <Button aria-label="Close dialog">
        ✕
        <VisuallyHidden>Close dialog</VisuallyHidden>
      </Button>
      <p className="text-body-2 text-muted-foreground text-center max-w-xs">
        The button above announces "Close dialog" to screen readers, but only shows the ✕ icon visually.
      </p>
    </div>
  ),
};

/** `asChild` lets you apply sr-only to an existing element (e.g. an `<h2>` needed for section semantics). */
export const AsChild: Story = {
  render: () => (
    <div className="space-y-2">
      <p className="text-body-2 text-muted-foreground">The heading below is in the DOM but not visible:</p>
      <VisuallyHidden asChild>
        <h2>Products section</h2>
      </VisuallyHidden>
      <p className="text-body-2">↑ Inspect the DOM to see the sr-only h2 element.</p>
    </div>
  ),
};
