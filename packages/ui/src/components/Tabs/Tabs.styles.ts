import { cva, type VariantProps } from 'class-variance-authority';

export const tabsListVariants = cva(
  'inline-flex items-center justify-center font-sans select-none',
  {
    variants: {
      variant: {
        pills:
          'rounded-md bg-grey-100 dark:bg-grey-800 p-1 text-muted-foreground',
        underline:
          'border-b border-grey-200 dark:border-grey-700 bg-transparent p-0 gap-6 w-full justify-start',
        outline:
          'rounded-md border border-grey-200 dark:border-grey-700 bg-transparent p-1 gap-1',
      },
      size: {
        sm: 'h-8 text-xs',
        default: 'h-10 text-sm',
        md: 'h-10 text-sm',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'pills',
      size: 'default',
    },
  }
);

export const tabsTriggerVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        pills:
          'rounded-sm px-3 py-1.5 data-[state=inactive]:text-muted-foreground hover:text-foreground',
        underline:
          'pb-3 pt-2 px-1 rounded-none data-[state=inactive]:text-muted-foreground hover:text-foreground',
        outline:
          'rounded-sm px-3 py-1.5 data-[state=inactive]:text-muted-foreground hover:text-foreground',
      },
      size: {
        sm: 'px-2.5 py-1 text-xs',
        default: 'px-3 py-1.5 text-sm',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
      },
    },
    defaultVariants: {
      variant: 'pills',
      size: 'default',
    },
  }
);

export const tabsContentVariants = cva(
  'mt-3 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary font-sans text-foreground data-[state=active]:animate-tab-slide'
);

export type TabsListVariants = VariantProps<typeof tabsListVariants>;
export type TabsTriggerVariants = VariantProps<typeof tabsTriggerVariants>;
