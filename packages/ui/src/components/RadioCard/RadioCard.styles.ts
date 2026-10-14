import { cva, type VariantProps } from 'class-variance-authority';

export const radioCardVariants = cva(
  'group flex w-full items-center gap-3 text-left font-sans text-foreground transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer',
  {
    variants: {
      /**
       * - `row`: no surface of its own, for lists inside a card (divide them with `divide-y` on the group);
       * - `card`: a bordered tile that highlights when selected.
       */
      variant: {
        row: 'py-4',
        card: 'rounded-[8px] border border-grey-200 dark:border-grey-800 bg-card p-4 hover:border-grey-400 data-[state=checked]:border-primary',
      },
    },
    defaultVariants: {
      variant: 'row',
    },
  }
);

/** The round marker at the end of a card (replaced by `trailing`). */
export const radioCardMarkerClass =
  'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-grey-300 dark:border-grey-700 bg-grey-50 dark:bg-grey-900 group-data-[state=checked]:border-primary';

export const radioCardDotClass = 'h-2.5 w-2.5 rounded-full bg-primary';

export type RadioCardVariants = VariantProps<typeof radioCardVariants>;
