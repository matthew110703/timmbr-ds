import { cva, type VariantProps } from 'class-variance-authority';

export const chipVariants = cva(
  'inline-flex items-center gap-1.5 font-sans font-medium rounded-full transition-all duration-150 select-none outline-none',
  {
    variants: {
      variant: {
        subtle: 'bg-grey-100 dark:bg-grey-800 text-foreground border border-transparent',
        filled: 'bg-primary text-white border border-transparent shadow-xs',
        outlined: 'bg-transparent border border-grey-300 dark:border-grey-700 text-foreground',
      },
      color: {
        default: '',
        primary: 'bg-primary/10 text-primary border-primary/20',
        success: 'bg-success/10 text-success border-success/20',
        warning: 'bg-warning/10 text-warning border-warning/20',
        destructive: 'bg-destructive/10 text-destructive border-destructive/20',
      },
      size: {
        sm: 'h-6 px-2.5 text-[11px]',
        default: 'h-8 px-3 text-xs',
        lg: 'h-9 px-4 text-sm',
      },
      clickable: {
        true: 'cursor-pointer hover:brightness-95 active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1',
        false: '',
      },
      selected: {
        true: 'bg-primary text-white border-primary shadow-xs',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'subtle',
      color: 'default',
      size: 'default',
      clickable: false,
      selected: false,
    },
  }
);

export type ChipVariants = VariantProps<typeof chipVariants>;
