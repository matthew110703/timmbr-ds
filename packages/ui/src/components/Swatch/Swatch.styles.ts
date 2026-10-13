import { cva, type VariantProps } from 'class-variance-authority';

export const swatchVariants = cva(
  'inline-block shrink-0 rounded-full bg-[var(--swatch)] ring-offset-2 ring-offset-grey-50 transition-shadow',
  {
    variants: {
      size: {
        sm: 'size-4',
        md: 'size-5',
        lg: 'size-7',
      },
      selected: {
        true: 'ring-2 ring-primary',
        false: '',
      },
      /** Very light colours need an edge to show on white. */
      light: {
        true: 'border border-grey-300',
        false: '',
      },
    },
    defaultVariants: { size: 'md', selected: false, light: false },
  }
);

export type SwatchVariants = VariantProps<typeof swatchVariants>;
