import { cva, type VariantProps } from 'class-variance-authority';

export const tableContainerVariants = cva(
  'relative w-full overflow-auto rounded-lg font-sans text-foreground',
  {
    variants: {
      bordered: {
        true: 'border border-grey-200 dark:border-grey-800',
        false: '',
      },
    },
    defaultVariants: {
      bordered: false,
    },
  }
);

export const tableVariants = cva(
  'w-full caption-bottom text-sm border-collapse font-sans text-left',
  {
    variants: {
      variant: {
        default: '',
        striped: '[&_tbody_tr:nth-child(even)]:bg-grey-50/60 dark:[&_tbody_tr:nth-child(even)]:bg-grey-900/40',
        bordered: 'border-collapse border border-grey-200 dark:border-grey-800',
      },
      size: {
        sm: '[&_td]:py-2 [&_td]:px-3 [&_th]:py-2 [&_th]:px-3 text-xs',
        default: '[&_td]:py-3.5 [&_td]:px-4 [&_th]:py-3 [&_th]:px-4 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export const tableRowVariants = cva(
  'border-b border-grey-200 dark:border-grey-800 transition-colors data-[state=selected]:bg-primary/5 hover:bg-grey-50/80 dark:hover:bg-grey-900/60'
);

export const tableHeadVariants = cva(
  'h-10 text-left align-middle font-semibold text-muted-foreground text-xs uppercase tracking-wider select-none bg-grey-100/50 dark:bg-grey-900/30 [&:has([role=checkbox])]:pr-0'
);

export const tableCellVariants = cva(
  'align-middle [&:has([role=checkbox])]:pr-0'
);

export const tableFooterVariants = cva(
  'border-t border-grey-200 dark:border-grey-800 bg-grey-50/50 dark:bg-grey-900/50 font-medium [&>tr]:last:border-b-0'
);

export const tablePaginationVariants = cva(
  'flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-grey-200 dark:border-grey-800 text-xs text-grey-600 dark:text-grey-400 font-sans'
);

export type TableVariants = VariantProps<typeof tableVariants> &
  VariantProps<typeof tableContainerVariants>;
