import { cva, type VariantProps } from 'class-variance-authority';

export const listVariants = cva('w-full font-sans text-foreground', {
  variants: {
    variant: {
      default: '',
      bordered: 'border border-grey-200 dark:border-grey-800 rounded-lg overflow-hidden',
      divided: 'divide-y divide-grey-200 dark:divide-grey-800',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const listItemVariants = cva(
  'relative flex items-center gap-3 transition-colors font-sans select-none',
  {
    variants: {
      density: {
        sm: 'py-2 px-3 text-xs',
        default: 'py-3 px-4 text-sm',
        lg: 'py-4 px-5 text-base',
      },
      interactive: {
        true: 'cursor-pointer hover:bg-grey-100/70 dark:hover:bg-grey-800/60 active:bg-grey-200/50',
        false: '',
      },
    },
    defaultVariants: {
      density: 'default',
      interactive: false,
    },
  }
);

export const listItemIconVariants = cva(
  'flex items-center justify-center shrink-0 text-muted-foreground'
);

export const listItemTextVariants = cva('flex-1 min-w-0');

export const listItemActionVariants = cva('shrink-0 ml-auto flex items-center gap-2');

export type ListVariants = VariantProps<typeof listVariants>;
export type ListItemVariants = VariantProps<typeof listItemVariants>;
