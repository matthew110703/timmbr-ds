import { cva } from 'class-variance-authority';

export const paginationLinkVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-[2px] font-sans text-xs font-semibold transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-95',
  {
    variants: {
      isActive: {
        true: 'bg-primary text-white shadow-xs hover:bg-primary-600',
        false:
          'text-foreground hover:bg-grey-100 dark:hover:bg-grey-800 border border-grey-200 dark:border-grey-800',
      },
      size: {
        sm: 'h-8 min-w-8 px-2',
        default: 'h-9 min-w-9 px-3',
        lg: 'h-11 min-w-11 px-4 text-sm',
      },
    },
    defaultVariants: {
      isActive: false,
      size: 'default',
    },
  }
);
