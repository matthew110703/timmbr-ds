import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../Button';
import { SnackbarHost } from './SnackbarHost';
import { snackbar } from './snackbarStore';

const meta: Meta<typeof SnackbarHost> = {
  title: 'Feedback/Snackbar',
  component: SnackbarHost,
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
export default meta;

/** One at a time at the bottom; swipe it away, or wait. `toast()` shows these on phones. */
export const Playground: StoryObj<typeof SnackbarHost> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 16 }}>
      <Button onClick={() => snackbar('Saved to your wishlist')}>Plain</Button>
      <Button
        onClick={() =>
          snackbar.success('Added to cart', {
            description: 'Hale Teak King Size Bed',
            action: { label: 'View cart', onClick: () => {} },
          })
        }
      >
        With action
      </Button>
      <Button onClick={() => snackbar.error("Couldn't update your wishlist")}>Error</Button>
      <SnackbarHost />
    </div>
  ),
};
