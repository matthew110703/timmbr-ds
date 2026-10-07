import { cva, type VariantProps } from 'class-variance-authority';

/**
 * Colour lives on the wrapper and the icon inherits it (`currentColor`), so a
 * consumer `className="text-grey-50"` reliably recolours the spinner.
 */
export const spinnerVariants = cva('inline-flex items-center gap-2', {
  variants: {
    variant: {
      default: 'text-primary',
      primary: 'text-primary',
      secondary: 'text-primary-1000',
      white: 'text-grey-50',
      muted: 'text-grey-500',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const spinnerIconVariants = cva('shrink-0 animate-spin', {
  variants: {
    size: {
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-7',
      xl: 'size-10',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type SpinnerVariants = VariantProps<typeof spinnerVariants> &
  VariantProps<typeof spinnerIconVariants>;
