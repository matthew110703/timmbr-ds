import { cva } from 'class-variance-authority';

export const otpContainerVariants = cva(
  'flex items-center gap-2 select-none justify-center',
  {
    variants: {
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

export const otpSlotVariants = cva(
  'relative flex items-center justify-center tabular-nums font-semibold transition-all duration-150',
  {
    variants: {
      variant: {
        default:
          'rounded-lg border bg-bg-1/30 border-border-warm text-grey-950',
        filled:
          'rounded-lg border border-transparent bg-bg-1 text-grey-950',
        underline:
          'rounded-none border-b-2 border-t-0 border-x-0 border-border-warm bg-transparent text-grey-950',
      },
      size: {
        sm: 'w-8 h-10 text-body-1',
        md: 'w-11 h-13 text-h5',
        lg: 'w-13 h-15 text-h4',
      },
      isActive: {
        true: 'border-primary ring-2 ring-primary/25 z-10',
        false: '',
      },
      hasError: {
        true: '!border-destructive !ring-destructive/20 text-destructive',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      isActive: false,
      hasError: false,
    },
  }
);
