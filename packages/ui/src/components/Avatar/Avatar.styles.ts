import { cva, type VariantProps } from 'class-variance-authority';

export const avatarRootVariants = cva(
  'relative inline-flex shrink-0 select-none overflow-hidden rounded-full items-center justify-center font-sans font-bold',
  {
    variants: {
      size: {
        xs: 'size-6 text-[10px]',
        sm: 'size-8 text-xs',
        md: 'size-10 text-[15px]',
        lg: 'size-12 text-base',
        xl: 'size-16 text-xl',
        '2xl': 'size-20 text-2xl',
      },
      variant: {
        primary: 'bg-primary text-white',
        secondary: 'bg-secondary text-secondary-foreground',
        subtle: 'bg-bg-subtle text-foreground',
        grey: 'bg-grey-700 text-white',
        outline: 'bg-background border border-grey-300 dark:border-grey-700 text-foreground',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'primary',
    },
  }
);

export const avatarStatusVariants = cva(
  'absolute bottom-0 right-0 rounded-full ring-2 ring-background',
  {
    variants: {
      status: {
        online: 'bg-emerald-500',
        offline: 'bg-grey-400',
        busy: 'bg-rose-500',
        away: 'bg-amber-500',
      },
      size: {
        xs: 'size-1.5',
        sm: 'size-2',
        md: 'size-2.5',
        lg: 'size-3',
        xl: 'size-4',
        '2xl': 'size-5',
      },
    },
    defaultVariants: {
      status: 'online',
      size: 'md',
    },
  }
);

export type AvatarVariants = VariantProps<typeof avatarRootVariants>;
