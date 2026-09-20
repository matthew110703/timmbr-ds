import { cva, type VariantProps } from 'class-variance-authority';

export const textareaVariants = cva(
  'w-full font-sans rounded-[2px] border text-foreground placeholder:text-muted transition-all duration-150 outline-none focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        outline:
          'border-grey-300 dark:border-grey-700 bg-white dark:bg-grey-900 focus:border-primary focus:ring-1 focus:ring-primary',
        filled:
          'border-transparent bg-grey-100 dark:bg-grey-800 focus:bg-white dark:focus:bg-grey-900 focus:border-primary focus:ring-1 focus:ring-primary',
        subtle:
          'border-grey-200 dark:border-grey-800 bg-grey-50 dark:bg-grey-900/50 focus:border-primary focus:ring-1 focus:ring-primary',
      },
      size: {
        sm: 'p-2 text-xs min-h-[72px]',
        default: 'p-3 text-sm min-h-[96px]',
        md: 'p-3 text-sm min-h-[96px]',
        lg: 'p-4 text-base min-h-[120px]',
      },
      resize: {
        none: 'resize-none',
        vertical: 'resize-y',
        horizontal: 'resize-x',
        both: 'resize',
      },
      isError: {
        true: 'border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive text-destructive',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'outline',
      size: 'default',
      resize: 'vertical',
      isError: false,
    },
  }
);

export type TextareaVariants = VariantProps<typeof textareaVariants>;
