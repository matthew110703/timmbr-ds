import { cva, type VariantProps } from 'class-variance-authority';

export const selectTriggerVariants = cva(
  'flex w-full items-center justify-between rounded-[2px] border font-sans text-foreground transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 select-none cursor-pointer',
  {
    variants: {
      variant: {
        outline:
          'border-grey-300 dark:border-grey-700 bg-white dark:bg-grey-900 focus:border-primary focus:ring-primary/20',
        filled:
          'border-transparent bg-grey-100 dark:bg-grey-800 focus:bg-white dark:focus:bg-grey-900 focus:border-primary focus:ring-primary/20',
      },
      size: {
        sm: 'h-9 px-3 text-xs',
        default: 'h-11 px-3.5 text-sm',
        md: 'h-11 px-3.5 text-sm',
        lg: 'h-[52px] px-4 text-base',
      },
      isError: {
        true: 'border-destructive focus:border-destructive focus:ring-destructive/20 text-destructive',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'default',
      isError: false,
    },
  }
);

export const selectContentVariants = cva(
  'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-grey-200 dark:border-grey-700 bg-white dark:bg-grey-900 text-foreground shadow-md transition-all font-sans p-1'
);

export const selectItemVariants = cva(
  'relative flex w-full cursor-pointer select-none items-center rounded-sm py-2 pl-8 pr-2 text-sm outline-none transition-colors hover:bg-grey-100 dark:hover:bg-grey-800 focus:bg-grey-100 dark:focus:bg-grey-800 focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50'
);

export type SelectTriggerVariants = VariantProps<typeof selectTriggerVariants>;
