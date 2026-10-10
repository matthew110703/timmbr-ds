import { cva, type VariantProps } from 'class-variance-authority';

export const dataListVariants = cva('font-sans text-foreground', {
  variants: {
    orientation: {
      horizontal: 'flex flex-col',
      vertical: 'flex flex-col',
      justified: 'flex flex-col',
    },
    size: {
      sm: 'text-body-3 gap-1.5',
      default: 'text-body-2 gap-2.5',
      lg: 'text-body-1 gap-3.5',
    },
    divided: {
      true: 'divide-y divide-border',
      false: '',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    size: 'default',
    divided: false,
  },
});

export const dataListItemVariants = cva('flex', {
  variants: {
    orientation: {
      /**
       * Small screens: label and value stacked on the left, an action on the
       * right (a two-column grid). From `sm`: one row.
       */
      horizontal:
        'grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 sm:flex sm:flex-row sm:items-baseline sm:gap-6',
      vertical: 'flex-col gap-1',
      /** Label left, value right on every screen (totals, receipts). */
      justified: 'flex-row items-baseline justify-between gap-4 [&>[data-slot=data-list-value]]:text-right',
    },
    emphasis: {
      none: '',
      /** A total line: label and value in the foreground colour, semibold. */
      total: 'font-semibold [&>[data-slot=data-list-label]]:text-foreground [&>[data-slot=data-list-label]]:font-semibold',
    },
    align: {
      baseline: 'sm:items-baseline',
      center: 'sm:items-center',
      start: 'sm:items-start',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    align: 'baseline',
    emphasis: 'none',
  },
});

/** Item padding when rows run edge to edge (e.g. directly inside a sectioned Card). */
export const dataListInsetPadding = {
  none: '',
  sm: 'px-4 py-3',
  default: 'px-6 py-4',
} as const;

export const dataListActionVariants = cva('flex shrink-0 items-center gap-2 sm:ms-auto', {
  variants: {
    /**
     * Small screens: `end` keeps the action on the right of the label;
     * `below` puts it under the label (wide buttons, long descriptions).
     * From `sm` up it always ends the row.
     */
    placement: {
      end: 'col-start-2 row-span-2 row-start-1 justify-end self-center',
      below: 'col-span-2 col-start-1 mt-2 justify-start sm:mt-0',
    },
  },
  defaultVariants: { placement: 'end' },
});

export const dataListLabelVariants = cva('col-start-1 shrink-0 flex gap-1.5 select-none', {
  variants: {
    tone: {
      muted: 'font-medium text-muted-foreground',
      /** For rows whose label is the main text (settings, sign-in methods). */
      strong: 'font-semibold text-foreground',
    },
    withDescription: {
      true: 'items-start',
      false: 'items-center',
    },
  },
  defaultVariants: { tone: 'muted', withDescription: false },
});

export const dataListValueVariants = cva(
  'col-start-1 font-normal text-foreground flex-1 min-w-0'
);

export type DataListVariants = VariantProps<typeof dataListVariants>;
