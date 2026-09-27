import { cva, type VariantProps } from 'class-variance-authority';

export const linkButtonVariants = cva(
  'inline-flex items-center justify-center font-sans transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 select-none no-underline',
  {
    variants: {
      variant: {
        default:
          'text-primary underline-offset-4 hover:underline font-medium p-0 h-auto active:scale-100',
        link:
          'text-primary underline-offset-4 hover:underline font-medium p-0 h-auto active:scale-100',
        primary:
          'bg-primary text-white hover:bg-primary-600 hover:brightness-105 hover:shadow-md active:bg-primary-700 active:brightness-95 shadow-sm active:scale-[0.98] font-semibold whitespace-nowrap',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-bg-subtle hover:brightness-105 active:bg-secondary-foreground/10 active:brightness-95 shadow-xs hover:shadow-sm active:scale-[0.98] font-semibold whitespace-nowrap',
        outline:
          'border border-grey-300 dark:border-grey-700 bg-transparent text-foreground hover:bg-grey-100 dark:hover:bg-grey-900 active:bg-grey-200 dark:active:bg-grey-800 hover:border-grey-400 dark:hover:border-grey-600 active:scale-[0.98] font-semibold whitespace-nowrap',
        ghost:
          'text-foreground hover:bg-grey-100 dark:hover:bg-grey-900 active:bg-grey-200 dark:active:bg-grey-800 active:scale-[0.98] font-semibold whitespace-nowrap',
        destructive:
          'bg-destructive text-white hover:bg-red-700 hover:brightness-105 hover:shadow-md active:brightness-95 shadow-sm active:scale-[0.98] font-semibold whitespace-nowrap',
        muted:
          'text-grey-600 dark:text-grey-400 hover:text-foreground underline-offset-4 hover:underline font-normal p-0 h-auto active:scale-100',
        subtle:
          'text-foreground/80 hover:text-foreground underline-offset-4 hover:underline font-normal p-0 h-auto active:scale-100',
      },
      size: {
        sm: 'text-xs gap-1',
        default: 'text-sm gap-1.5',
        md: 'text-sm gap-1.5',
        lg: 'text-base gap-2',
        icon: 'p-1 shrink-0',
      },
      disabled: {
        true: 'pointer-events-none opacity-50 cursor-not-allowed',
        false: 'cursor-pointer',
      },
    },
    compoundVariants: [
      // Button sizing variants when rendered with button appearance
      {
        variant: ['primary', 'secondary', 'outline', 'ghost', 'destructive'],
        size: 'sm',
        className: 'h-9 px-3 rounded-[2px] gap-2',
      },
      {
        variant: ['primary', 'secondary', 'outline', 'ghost', 'destructive'],
        size: ['default', 'md'],
        className: 'h-11 px-5 rounded-[2px] gap-2',
      },
      {
        variant: ['primary', 'secondary', 'outline', 'ghost', 'destructive'],
        size: 'lg',
        className: 'h-[52px] px-6 rounded-[2px] gap-2',
      },
      {
        variant: ['primary', 'secondary', 'outline', 'ghost', 'destructive'],
        size: 'icon',
        className: 'h-10 w-10 p-0 rounded-[2px]',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      disabled: false,
    },
  }
);

export type LinkButtonVariants = VariantProps<typeof linkButtonVariants>;
