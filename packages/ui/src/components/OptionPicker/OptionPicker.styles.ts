import { cva } from 'class-variance-authority';

export const optionPickerVariants = cva('flex flex-col gap-3 font-sans');

export const optionPickerLegendVariants = cva('text-body-2 font-semibold text-grey-950');

/** Swatch button: the dot sits inside a ring that shows the selection. */
export const optionSwatchVariants = cva(
  'relative flex size-10 items-center justify-center rounded-full border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed',
  {
    variants: {
      selected: {
        true: 'border-primary',
        false: 'border-transparent hover:border-grey-300',
      },
      state: {
        available: '',
        'out-of-stock': 'opacity-60',
        unavailable: 'opacity-30',
      },
    },
    defaultVariants: { selected: false, state: 'available' },
  }
);

/** Compact chip; the selected one takes the brand accent (border + tint), like the filters. */
export const optionPillVariants = cva(
  'relative inline-flex h-9 min-w-11 items-center justify-center gap-2 rounded-sm border px-3.5 text-body-3 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed',
  {
    variants: {
      selected: {
        true: 'border-primary bg-primary/10 font-semibold text-grey-950 shadow-[inset_0_0_0_1px_var(--color-primary)]',
        false: 'border-grey-300 bg-grey-50 text-grey-700 hover:border-grey-500 hover:text-grey-950',
      },
      state: {
        available: '',
        'out-of-stock': 'text-grey-500 line-through decoration-grey-500',
        unavailable: 'border-dashed text-grey-400 line-through',
      },
    },
    defaultVariants: { selected: false, state: 'available' },
  }
);

/** Photo tile of the option (e.g. the chair in that fabric); the label is in the legend. */
export const optionImageVariants = cva(
  'relative size-16 overflow-hidden rounded-sm border-2 bg-grey-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed',
  {
    variants: {
      selected: {
        true: 'border-primary',
        false: 'border-grey-200 hover:border-grey-400',
      },
      state: {
        available: '',
        'out-of-stock': 'opacity-60',
        unavailable: 'opacity-30',
      },
    },
    defaultVariants: { selected: false, state: 'available' },
  }
);

/** Diagonal line across a sold-out swatch. */
export const optionStrikeVariants = cva(
  'pointer-events-none absolute inset-1 rounded-full bg-[linear-gradient(to_top_right,transparent_calc(50%-1px),var(--color-grey-700)_calc(50%-1px),var(--color-grey-700)_calc(50%+1px),transparent_calc(50%+1px))]'
);
