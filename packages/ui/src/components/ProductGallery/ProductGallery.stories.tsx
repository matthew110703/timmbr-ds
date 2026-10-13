import type { Meta, StoryObj } from '@storybook/react';
import { ProductGallery } from './ProductGallery';

const R2 = 'https://pub-dc2a8fc90be54a65b2d2000bed9fc8d2.r2.dev/products/koto-boucle-curved-accent-chair/images';
const images = [
  { src: `${R2}/oatmeal-hero.jpg`, alt: 'Koto chair in oatmeal bouclé' },
  { src: `${R2}/charcoal-variant.jpg`, alt: 'Koto chair in charcoal' },
  { src: `${R2}/back-curve.jpg`, alt: 'The curved back of the Koto chair' },
];

const meta: Meta<typeof ProductGallery> = {
  title: 'Display/ProductGallery',
  component: ProductGallery,
  args: { images },
  decorators: [(Story) => <div style={{ maxWidth: 736 }}>{Story()}</div>],
};
export default meta;

export const Default: StoryObj<typeof ProductGallery> = {};
export const Square: StoryObj<typeof ProductGallery> = { args: { aspectRatio: '1 / 1' } };
