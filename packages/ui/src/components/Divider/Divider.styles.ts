import { cva, type VariantProps } from 'class-variance-authority';

export const dividerVariants = cva('shrink-0 transition-colors', {
  variants: {
    orientation: {
      horizontal: 'w-full',
      vertical: 'h-full',
    },
    variant: {
      solid: 'border-solid',
      dashed: 'border-dashed bg-transparent',
      dotted: 'border-dotted bg-transparent',
    },
    thickness: {
      thin: '',
      default: '',
      thick: '',
    },
    color: {
      default: 'border-grey-200 dark:border-grey-800 bg-grey-200 dark:bg-grey-800',
      primary: 'border-primary bg-primary',
      muted: 'border-grey-100 dark:border-grey-800 bg-grey-100 dark:bg-grey-800',
      brand: 'border-primary-500 bg-primary-500',
    },
  },
  compoundVariants: [
    { orientation: 'horizontal', variant: 'solid', thickness: 'thin', className: 'h-px' },
    { orientation: 'horizontal', variant: 'solid', thickness: 'default', className: 'h-px' },
    { orientation: 'horizontal', variant: 'solid', thickness: 'thick', className: 'h-0.5' },
    { orientation: 'horizontal', variant: ['dashed', 'dotted'], thickness: 'thin', className: 'border-t' },
    { orientation: 'horizontal', variant: ['dashed', 'dotted'], thickness: 'default', className: 'border-t-2' },
    { orientation: 'horizontal', variant: ['dashed', 'dotted'], thickness: 'thick', className: 'border-t-4' },
    { orientation: 'vertical', variant: 'solid', thickness: 'thin', className: 'w-px' },
    { orientation: 'vertical', variant: 'solid', thickness: 'default', className: 'w-px' },
    { orientation: 'vertical', variant: 'solid', thickness: 'thick', className: 'w-0.5' },
    { orientation: 'vertical', variant: ['dashed', 'dotted'], thickness: 'thin', className: 'border-l' },
    { orientation: 'vertical', variant: ['dashed', 'dotted'], thickness: 'default', className: 'border-l-2' },
    { orientation: 'vertical', variant: ['dashed', 'dotted'], thickness: 'thick', className: 'border-l-4' },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    variant: 'solid',
    thickness: 'default',
    color: 'default',
  },
});

export type DividerVariants = VariantProps<typeof dividerVariants>;
