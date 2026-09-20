import { cva, type VariantProps } from 'class-variance-authority';

export const checkboxVariants = cva(
  'peer shrink-0 rounded-[2px] border border-grey-300 dark:border-grey-600 bg-white dark:bg-grey-900 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-white data-[state=indeterminate]:bg-primary data-[state=indeterminate]:border-primary data-[state=indeterminate]:text-white cursor-pointer flex items-center justify-center',
  {
    variants: {
      size: {
        sm: 'w-4 h-4',
        default: 'w-5 h-5',
        md: 'w-5 h-5',
        lg: 'w-6 h-6 rounded-[3px]',
      },
      isError: {
        true: 'border-destructive focus-visible:ring-destructive',
        false: '',
      },
    },
    defaultVariants: {
      size: 'default',
      isError: false,
    },
  }
);

export const checkboxIndicatorVariants = cva(
  'flex items-center justify-center text-current',
  {
    variants: {
      size: {
        sm: 'w-3 h-3',
        default: 'w-3.5 h-3.5',
        md: 'w-3.5 h-3.5',
        lg: 'w-4 h-4',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

export type CheckboxVariants = VariantProps<typeof checkboxVariants>;
