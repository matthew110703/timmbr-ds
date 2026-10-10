import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none active:scale-[0.98]',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-grey-50 hover:bg-primary-600 hover:brightness-105 hover:shadow-md active:bg-primary-700 active:brightness-95 shadow-sm',
        primary:
          'bg-primary text-grey-50 hover:bg-primary-600 hover:brightness-105 hover:shadow-md active:bg-primary-700 active:brightness-95 shadow-sm',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-bg-subtle hover:brightness-105 active:bg-secondary-foreground/10 active:brightness-95 shadow-xs hover:shadow-sm',
        outline:
          'border border-grey-300 dark:border-grey-700 bg-transparent text-foreground hover:bg-grey-100 dark:hover:bg-grey-900 active:bg-grey-200 dark:active:bg-grey-800 hover:border-grey-400 dark:hover:border-grey-600',
        ghost:
          'text-foreground hover:bg-grey-100 dark:hover:bg-grey-900 active:bg-grey-200 dark:active:bg-grey-800',
        destructive:
          'bg-destructive text-grey-50 hover:bg-destructive/90 hover:brightness-105 hover:shadow-md active:brightness-95 shadow-sm',
        'destructive-outline':
          'border border-destructive/40 bg-transparent text-destructive hover:bg-destructive/10 hover:border-destructive active:bg-destructive/15',
        'destructive-ghost':
          'text-destructive hover:bg-destructive/10 active:bg-destructive/15',
        /** Floating over imagery (e.g. a wishlist toggle on a product photo). */
        overlay:
          'bg-card/90 text-foreground shadow-xs backdrop-blur-xs hover:bg-card hover:text-primary aria-pressed:text-primary [&[aria-pressed=true]_svg]:fill-current',
        link:
          'text-primary underline-offset-4 hover:underline p-0 h-auto active:scale-100 font-normal',
      },
      size: {
        sm: 'h-9 px-3 text-body-3 [&_svg]:size-3.5',
        default: 'h-11 px-5 text-body-2 [&_svg]:size-4',
        md: 'h-11 px-5 text-body-2 [&_svg]:size-4',
        lg: 'h-[52px] px-6 text-body-1 [&_svg]:size-5',
        icon: 'h-10 w-10 p-0 shrink-0 [&_svg]:size-5',
        'icon-sm': 'h-8 w-8 p-0 shrink-0 [&_svg]:size-4.5',
      },
      shape: {
        default: 'rounded-[2px]',
        circle: 'rounded-full',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    compoundVariants: [
      // A text link keeps its inline size: no button height or padding.
      { variant: 'link', className: 'h-auto px-0 py-0' },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'default',
      fullWidth: false,
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
