import { cva, type VariantProps } from 'class-variance-authority';

export const centerVariants = cva(
  'items-center justify-center',
  {
    variants: {
      inline: {
        true: 'inline-flex',
        false: 'flex',
      },
    },
    defaultVariants: {
      inline: false,
    },
  }
);

export type CenterVariants = VariantProps<typeof centerVariants>;
