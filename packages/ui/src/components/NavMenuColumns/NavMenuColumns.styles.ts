import { cva } from 'class-variance-authority';

/**
 * Phones (the header's tab panel): one stacked column. Large screens:
 * `--nav-menu-cols` equal link columns, plus an auto-width aside when present.
 */
export const navMenuColumnsGridVariants = cva('grid grid-cols-1 bg-grey-50 sm:grid-cols-2', {
  variants: {
    aside: {
      true: 'lg:[grid-template-columns:repeat(var(--nav-menu-cols),minmax(0,1fr))_auto]',
      false: 'lg:[grid-template-columns:repeat(var(--nav-menu-cols),minmax(0,1fr))]',
    },
  },
  defaultVariants: { aside: false },
});

/** Thin dividers between link columns (Figma: 1px #E5E5E5 → `border`). */
export const navMenuColumnVariants = cva(
  'flex min-w-0 flex-col gap-6 px-5 py-4 lg:px-7 lg:py-7 lg:first:pl-8 lg:border-border lg:[&:not(:first-child)]:border-l'
);

export const navMenuTitleVariants = cva(
  'block font-sans text-body-2 font-bold text-grey-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm',
  {
    variants: {
      link: {
        true: 'hover:text-primary transition-colors',
        false: '',
      },
    },
    defaultVariants: { link: false },
  }
);

export const navMenuLinkVariants = cva(
  'block font-sans text-body-3 font-medium text-grey-700 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm'
);

export const navMenuMoreVariants = cva(
  'block font-sans text-body-3 font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm'
);

export const navMenuAsideVariants = cva('hidden lg:flex flex-col items-end justify-center py-7 pl-5 pr-8');

/** Figma promo card: 312×270, ~10px radius, 20px padding, 15% dark overlay. */
export const navMenuPromoVariants = cva(
  'relative isolate flex w-[312px] aspect-[312/270] flex-col items-start gap-1.5 overflow-hidden rounded-[10px] p-5 text-grey-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
);

export const navMenuPromoTitleVariants = cva(
  'font-sans text-[20px] leading-[1.3] [&_em]:font-display [&_em]:not-italic'
);

/** Mobile tiles: fixed 88px tiles in rows that scroll sideways (columns set inline, see NAV_MENU_TILE_PX). */
export const navMenuTilesVariants = cva(
  'grid gap-x-3 gap-y-4 overflow-x-auto bg-grey-50 px-5 py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
);

export const navMenuTileVariants = cva(
  'group flex flex-col items-center gap-2 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
);

export const navMenuTileImageVariants = cva(
  'flex size-[88px] items-center justify-center overflow-hidden rounded-xl bg-muted transition-transform group-hover:scale-[1.02]'
);

export const navMenuTileLabelVariants = cva(
  'w-full truncate text-center font-sans text-body-2 font-semibold leading-tight text-grey-800'
);
