import { cva, type VariantProps } from 'class-variance-authority';

export const iconVariants = cva(
  'inline-flex shrink-0 items-center justify-center transition-all leading-none',
  {
    variants: {
      size: {
        xs: 'size-3 text-xs',
        sm: 'size-4 text-sm',
        md: 'size-5 text-base',
        lg: 'size-6 text-lg',
        xl: 'size-8 text-2xl',
      },
      foreground: {
        default: 'text-foreground',
        muted: 'text-grey-600 dark:text-grey-400',
        subtle: 'text-grey-500 dark:text-grey-500',
        primary: 'text-primary',
        secondary: 'text-secondary-foreground',
        destructive: 'text-destructive',
        white: 'text-white',
        inherit: 'text-inherit',
      },
      clickable: {
        true: 'cursor-pointer hover:bg-grey-100 dark:hover:bg-grey-800 hover:text-foreground hover:scale-105 active:scale-95 rounded-[4px] p-1 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
        false: 'pointer-events-none',
      },
    },
    defaultVariants: {
      size: 'md',
      foreground: 'inherit',
      clickable: false,
    },
  }
);

export type IconVariants = VariantProps<typeof iconVariants>;
