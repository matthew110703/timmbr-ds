import { cva } from 'class-variance-authority';

export const pageProgressVariants = cva(
  'fixed top-0 left-0 right-0 overflow-hidden',
  {
    variants: {
      fading: {
        true: 'transition-opacity duration-300 opacity-0',
        false: '',
      },
    },
    defaultVariants: { fading: false },
  }
);

export const pageProgressBarVariants = cva(
  'absolute top-0 bottom-0 rounded-full',
  {
    variants: {
      indeterminate: {
        true: 'animate-indeterminate-bar',
        false: '',
      },
      animated: {
        true: '',
        false: 'transition-none animate-none',
      },
    },
    defaultVariants: { indeterminate: false, animated: true },
  }
);
