import { cva } from 'class-variance-authority';

/**
 * Offer banner bar styles.
 */
export const offerBannerVariants = cva(
  'w-full bg-surface-dark text-bg-2 font-title! text-body-3 font-semibold uppercase tracking-[0.14em] py-2 px-4 flex items-center justify-center relative transition-all duration-200 z-50 border-b border-grey-1000/20'
);

/**
 * Main header wrapper styles.
 */
export const navHeaderVariants = cva(
  'w-full bg-bg-2 text-grey-800 border-b border-border-warm relative z-40 transition-colors',
  {
    variants: {
      sticky: {
        true: 'sticky top-0 shadow-sm backdrop-blur-md bg-bg-2/95',
        false: 'relative',
      },
    },
    defaultVariants: {
      sticky: false,
    },
  }
);

/**
 * Header inner container styles.
 */
export const navHeaderContainerVariants = cva(
  'mx-auto px-4 sm:px-6 lg:px-8 h-[74px] flex items-center justify-between gap-4 lg:gap-8 transition-all',
  {
    variants: {
      maxWidth: {
        sm: 'max-w-screen-sm',
        md: 'max-w-screen-md',
        lg: 'max-w-screen-lg',
        xl: 'max-w-[1280px]',
        '2xl': 'max-w-[1440px]',
        full: 'max-w-full',
      },
    },
    defaultVariants: {
      maxWidth: '2xl',
    },
  }
);

/**
 * Navigation item link / trigger styles.
 */
export const navHeaderItemVariants = cva(
  'font-bold text-body-2 xl:text-body-2 2xl:text-body-2 text-grey-800 hover:text-primary transition-colors relative py-2 px-1 xl:px-1.5 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded select-none cursor-pointer whitespace-nowrap',
  {
    variants: {
      active: {
        true: 'text-primary',
        false: 'text-grey-800',
      },
      disabled: {
        true: 'opacity-40 cursor-not-allowed pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      active: false,
      disabled: false,
    },
  }
);

/**
 * Action button (Search, Profile, Wishlist, Cart) styles.
 */
export const navActionVariants = cva(
  'group flex flex-col items-center justify-center gap-[3.5px] min-w-[36px] sm:min-w-[40px] lg:min-w-[52px] text-grey-800 hover:text-primary transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded py-1 px-1 lg:px-1.5 select-none cursor-pointer',
  {
    variants: {
      active: {
        true: 'text-primary',
        false: 'text-grey-800',
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

/**
 * Mega menu dropdown container styles.
 */
export const megaMenuCardVariants = cva(
  'w-full max-w-[1216px] mx-auto bg-grey-50 border border-grey-200/80 shadow-2xl rounded-b-xl z-50 overflow-hidden'
);

/**
 * Search popover suggestions card styles.
 */
/** Right-aligned under the input and wider than it, so product suggestions have room. */
export const searchPopoverCardVariants = cva(
  'absolute top-full right-0 mt-2 w-[min(26rem,calc(100vw-2rem))] max-h-[min(32rem,calc(100dvh-8rem))] overflow-y-auto bg-grey-50 border border-grey-200 shadow-2xl rounded-2xl p-3 sm:p-4 z-50 text-left'
);

/** A row of the search panel (recent search, suggested product, "see all"). */
export const searchPanelOptionVariants = cva(
  'flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors',
  {
    variants: {
      active: {
        true: 'bg-grey-100',
        false: 'hover:bg-grey-100',
      },
    },
    defaultVariants: { active: false },
  }
);

export const searchPanelSectionTitleVariants = cva(
  'px-2 text-caption font-semibold uppercase tracking-wider text-grey-500'
);

export const searchPanelTextButtonVariants = cva(
  'rounded-sm px-2 text-body-3 font-semibold text-grey-700 underline underline-offset-4 hover:text-grey-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
);

/**
 * Overflow action menu dropdown popover container.
 */
export const actionOverflowPopoverVariants = cva(
  'absolute top-full right-0 mt-3 w-60 bg-grey-50 border border-border-warm shadow-2xl rounded-2xl p-2 z-50 text-left overflow-hidden divide-y divide-grey-100'
);

/**
 * Overflow action item row.
 */
export const actionOverflowItemVariants = cva(
  'w-full flex items-center justify-between gap-3 px-3 py-2.5 text-body-3 font-semibold text-grey-800 hover:text-primary hover:bg-bg-2/60 rounded-xl transition-colors cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
  {
    variants: {
      disabled: {
        true: 'opacity-40 cursor-not-allowed pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

/**
 * Mobile tab slider scroll container with cross-browser hidden scrollbars.
 */
export const mobileTabSliderVariants = cva(
  'w-full overflow-x-auto flex items-center gap-6 px-4 py-2 border-b border-border-warm bg-bg-2 select-none scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
);

/**
 * Mobile tab slider individual item trigger.
 */
export const mobileTabItemVariants = cva(
  'relative text-body-3 sm:text-body-2 tracking-tight whitespace-nowrap py-1.5 px-1 font-semibold transition-colors cursor-pointer select-none',
  {
    variants: {
      active: {
        true: 'text-primary font-bold',
        false: 'text-grey-600 hover:text-grey-900',
      },
      disabled: {
        true: 'opacity-40 cursor-not-allowed pointer-events-none',
        false: '',
      },
    },
    defaultVariants: {
      active: false,
      disabled: false,
    },
  }
);

/**
 * Mobile expandable tab content panel.
 */
export const mobileTabContentPanelVariants = cva(
  'w-full bg-grey-50 border-b border-border-warm shadow-md overflow-hidden'
);

/**
 * Mobile full-screen search drawer container.
 */
export const mobileSearchDrawerVariants = cva(
  'fixed inset-0 z-[9999] h-[100dvh] w-screen bg-bg-2 flex flex-col overflow-hidden'
);
