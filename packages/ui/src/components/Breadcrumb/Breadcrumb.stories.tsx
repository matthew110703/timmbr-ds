import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Navigation/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Living Room', href: '/category/living-room' },
      { label: 'Sofas', href: '/category/sofas' },
      { label: '3 Seater Sofas' },
    ],
  },
};
export default meta;

export const Default: StoryObj<typeof Breadcrumb> = {};

/** Narrow the viewport: the middle collapses behind "…". */
export const Collapsed: StoryObj<typeof Breadcrumb> = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
};
