import { cva } from 'class-variance-authority';

/** Card: white surface, light shadow (Figma PLP filter sidebar). */
export const filterPanelVariants = cva('flex flex-col overflow-hidden rounded-sm bg-grey-50 font-sans shadow-md');

export const filterPanelHeaderVariants = cva(
  'flex shrink-0 items-center justify-between gap-2 border-b border-grey-100 px-5 py-4'
);

/** Everything below the header; scrolls inside the card when the card has a max height. */
export const filterPanelBodyVariants = cva(
  'min-h-0 flex-1 overflow-y-auto [scrollbar-gutter:stable] [scrollbar-width:thin]'
);

export const filterPanelTitleVariants = cva('text-body-1 font-medium tracking-wide text-grey-950');

export const filterToggleListVariants = cva('flex flex-col gap-4 px-5 py-4');

export const filterSectionTriggerVariants = cva(
  'px-4 py-4 text-body-3 font-medium uppercase tracking-wider text-grey-950 hover:no-underline'
);

export const filterSectionContentVariants = cva('px-4');

export const filterOptionRowVariants = cva('min-w-0', {
  variants: {
    disabled: {
      true: 'opacity-50',
      false: '',
    },
  },
  defaultVariants: { disabled: false },
});

export const filterOptionLabelVariants = cva('inline-flex min-w-0 items-center gap-2 text-body-2 text-grey-700');

export const filterOptionCountVariants = cva('text-body-3 text-grey-500');

export const filterLinkButtonVariants = cva(
  'self-start rounded-sm text-body-3 font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50'
);
