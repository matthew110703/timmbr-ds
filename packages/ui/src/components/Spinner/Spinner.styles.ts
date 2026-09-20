import { cva, type VariantProps } from 'class-variance-authority';

export const spinnerVariants = cva(
  'inline-flex shrink-0 animate-spin text-current font-sans',
  {
    variants: {
      size: {
        xs: 'size-3',
        sm: 'size-4',
        md: 'size-5',
        lg: 'size-7',
        xl: 'size-10',
      },
      variant: {
        default: 'text-primary',
        primary: 'text-primary',
        secondary: 'text-secondary-foreground',
        white: 'text-white',
        muted: 'text-muted-foreground',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  }
);

export type SpinnerVariants = VariantProps<typeof spinnerVariants>;
