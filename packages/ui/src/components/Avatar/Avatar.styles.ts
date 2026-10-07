import { cva, type VariantProps } from 'class-variance-authority';

export const avatarRootVariants = cva(
  'relative inline-flex shrink-0 select-none overflow-hidden rounded-full items-center justify-center font-sans font-bold',
  {
    variants: {
      size: {
        xs: 'size-6 text-caption',
        sm: 'size-8 text-body-3',
        md: 'size-10 text-body-2',
        lg: 'size-12 text-body-1',
        xl: 'size-16 text-h5',
        '2xl': 'size-20 text-h4',
      },
      variant: {
        primary: 'bg-primary text-grey-50',
        secondary: 'bg-secondary text-secondary-foreground',
        subtle: 'bg-bg-subtle text-foreground',
        grey: 'bg-grey-700 text-grey-50',
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
        online: 'bg-success',
        offline: 'bg-grey-400',
        busy: 'bg-destructive',
        away: 'bg-warning',
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
