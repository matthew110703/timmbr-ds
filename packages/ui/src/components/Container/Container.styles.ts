import { cva, type VariantProps } from 'class-variance-authority';

export const containerVariants = cva('w-full mx-auto px-4 sm:px-6 lg:px-8 transition-all', {
  variants: {
    maxWidth: {
      sm: 'max-w-screen-sm',
      md: 'max-w-screen-md',
      lg: 'max-w-screen-lg',
      xl: 'max-w-screen-xl',
      '2xl': 'max-w-screen-2xl',
      full: 'max-w-full',
    },
    padded: {
      true: 'px-4 sm:px-6 lg:px-8',
      false: 'px-0',
    },
  },
  defaultVariants: {
    maxWidth: 'lg',
    padded: true,
  },
});

export type ContainerVariants = VariantProps<typeof containerVariants>;
