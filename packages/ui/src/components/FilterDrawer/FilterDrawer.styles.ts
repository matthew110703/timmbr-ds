import { cva } from 'class-variance-authority';

export const filterDrawerHeaderVariants = cva(
  'flex shrink-0 items-center justify-between gap-2 border-b border-grey-200 px-4 py-3'
);

export const filterDrawerPanesVariants = cva('flex min-h-0 flex-1');

/** Left pane: the list of groups. */
export const filterDrawerNavVariants = cva(
  'w-36 shrink-0 overflow-y-auto overscroll-contain border-r border-grey-200 bg-grey-100'
);

export const filterDrawerNavItemVariants = cva(
  'flex w-full items-center justify-between gap-2 border-l-4 px-3 py-4 text-left text-body-3 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
  {
    variants: {
      active: {
        true: 'border-primary bg-grey-50 text-grey-950',
        false: 'border-transparent text-grey-700 hover:text-grey-950',
      },
    },
    defaultVariants: { active: false },
  }
);

export const filterDrawerBadgeVariants = cva(
  'inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-caption font-semibold text-primary-foreground'
);

/** Right pane: the active group's options. */
export const filterDrawerContentVariants = cva('min-w-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4');

export const filterDrawerFooterVariants = cva(
  'flex shrink-0 items-center gap-3 border-t border-grey-200 bg-grey-50 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]'
);
