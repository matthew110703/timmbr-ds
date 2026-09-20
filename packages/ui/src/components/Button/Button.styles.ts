import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[2px] font-sans font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-white hover:bg-primary-600 hover:brightness-105 hover:shadow-md active:bg-primary-700 active:brightness-95 shadow-sm',
        primary:
          'bg-primary text-white hover:bg-primary-600 hover:brightness-105 hover:shadow-md active:bg-primary-700 active:brightness-95 shadow-sm',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-bg-subtle hover:brightness-105 active:bg-secondary-foreground/10 active:brightness-95 shadow-xs hover:shadow-sm',
        outline:
          'border border-grey-300 dark:border-grey-700 bg-transparent text-foreground hover:bg-grey-100 dark:hover:bg-grey-900 active:bg-grey-200 dark:active:bg-grey-800 hover:border-grey-400 dark:hover:border-grey-600',
        ghost:
          'text-foreground hover:bg-grey-100 dark:hover:bg-grey-900 active:bg-grey-200 dark:active:bg-grey-800',
        destructive:
          'bg-destructive text-white hover:bg-red-700 hover:brightness-105 hover:shadow-md active:brightness-95 shadow-sm',
        link:
          'text-primary underline-offset-4 hover:underline p-0 h-auto active:scale-100 font-normal',
      },
      size: {
        sm: 'h-9 px-3 text-xs',
        default: 'h-11 px-5 text-sm',
        md: 'h-11 px-5 text-sm',
        lg: 'h-[52px] px-6 text-base',
        icon: 'h-10 w-10 p-0 shrink-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
