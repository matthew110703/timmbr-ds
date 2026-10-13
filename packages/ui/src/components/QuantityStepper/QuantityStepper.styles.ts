import { cva } from 'class-variance-authority';

/** Bordered box: − value +, on a white surface with the 4px radius used by fields. */
export const quantityStepperVariants = cva(
  'inline-flex shrink-0 items-center rounded-sm border border-grey-300 bg-grey-50 font-sans text-grey-950',
  {
    variants: {
      size: {
        md: 'h-11',
        lg: 'h-[52px]',
      },
      disabled: {
        true: 'opacity-50',
        false: '',
      },
    },
    defaultVariants: { size: 'md', disabled: false },
  }
);

export const quantityStepperButtonVariants = cva(
  'flex h-full w-10 items-center justify-center rounded-sm text-grey-500 transition-colors hover:text-grey-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring disabled:cursor-not-allowed disabled:text-grey-300'
);

export const quantityStepperValueVariants = cva('min-w-6 text-center text-body-1 font-semibold tabular-nums');
