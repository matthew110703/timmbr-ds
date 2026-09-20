import { cva, type VariantProps } from 'class-variance-authority';

export const inputWrapperVariants = cva(
  'relative flex items-center w-full transition-all duration-150 rounded-[2px] border text-foreground outline-none',
  {
    variants: {
      variant: {
        outline:
          'border-grey-300 dark:border-grey-700 bg-white dark:bg-grey-900 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary',
        filled:
          'border-transparent bg-grey-100 dark:bg-grey-800 focus-within:bg-white dark:focus-within:bg-grey-900 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary',
        subtle:
          'border-grey-200 dark:border-grey-800 bg-grey-50 dark:bg-grey-900/50 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary',
      },
      size: {
        sm: 'h-9 px-2.5 text-xs',
        default: 'h-11 px-3.5 text-sm',
        md: 'h-11 px-3.5 text-sm',
        lg: 'h-[52px] px-4 text-base',
      },
      isError: {
        true: 'border-destructive focus-within:border-destructive focus-within:ring-1 focus-within:ring-destructive text-destructive',
        false: '',
      },
      isDisabled: {
        true: 'opacity-50 cursor-not-allowed bg-grey-100/60 dark:bg-grey-800/40 pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'default',
      isError: false,
      isDisabled: false,
    },
  }
);

export const inputFieldVariants = cva(
  'w-full h-full bg-transparent font-sans border-0 p-0 text-foreground placeholder:text-muted focus:outline-none focus:ring-0 focus-visible:outline-none disabled:cursor-not-allowed'
);

export type InputVariants = VariantProps<typeof inputWrapperVariants>;
