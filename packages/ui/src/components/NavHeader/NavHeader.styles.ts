import { cva } from 'class-variance-authority';

/**
 * Offer banner bar styles.
 */
export const offerBannerVariants = cva(
  'w-full bg-[#1A1714] text-[#F7F1E6] font-title text-xs font-semibold uppercase tracking-[0.14em] py-2 px-4 flex items-center justify-center relative transition-all duration-200 z-50 border-b border-black/20'
);

/**
 * Main header wrapper styles.
 */
export const navHeaderVariants = cva(
  'w-full bg-[var(--color-bg-2,#F7F1E6)] text-[var(--color-grey-800,#3C3C3C)] border-b border-[#E7DFD3] relative z-40 transition-colors',
  {
    variants: {
      sticky: {
        true: 'sticky top-0 shadow-sm backdrop-blur-md bg-[var(--color-bg-2,#F7F1E6)]/95',
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
  'font-sans font-bold text-[13.5px] xl:text-[14.5px] 2xl:text-[15px] text-[#404040] hover:text-[#C0643A] transition-colors relative py-2 px-1 xl:px-1.5 flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded select-none cursor-pointer whitespace-nowrap',
  {
    variants: {
      active: {
        true: 'text-[#C0643A]',
        false: 'text-[#404040]',
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
  'group flex flex-col items-center justify-center gap-[3.5px] min-w-[36px] sm:min-w-[40px] lg:min-w-[52px] text-[#3C3C3C] hover:text-[#C0643A] transition-colors relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded py-1 px-1 lg:px-1.5 select-none cursor-pointer',
  {
    variants: {
      active: {
        true: 'text-[#C0643A]',
        false: 'text-[#3C3C3C]',
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
  'w-full max-w-[1216px] mx-auto bg-[#FFFFFE] border border-grey-200/80 shadow-2xl rounded-b-xl z-50 overflow-hidden'
);

/**
 * Search popover suggestions card styles.
 */
export const searchPopoverCardVariants = cva(
  'absolute top-full left-0 right-0 w-full mt-2 bg-white border border-grey-200 shadow-2xl rounded-2xl p-4 sm:p-5 z-50 text-left'
);

/**
 * Overflow action menu dropdown popover container.
 */
export const actionOverflowPopoverVariants = cva(
  'absolute top-full right-0 mt-3 w-60 bg-white border border-[#E7DFD3] shadow-2xl rounded-2xl p-2 z-50 text-left overflow-hidden divide-y divide-grey-100'
);

/**
 * Overflow action item row.
 */
export const actionOverflowItemVariants = cva(
  'w-full flex items-center justify-between gap-3 px-3 py-2.5 text-xs font-semibold text-[#3C3C3C] hover:text-[#C0643A] hover:bg-[#F7F1E6]/60 rounded-xl transition-colors cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0643A]',
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
  'w-full overflow-x-auto flex items-center gap-6 px-4 py-2 border-b border-[#E7DFD3] bg-[var(--color-bg-2,#F7F1E6)] select-none scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
);

/**
 * Mobile tab slider individual item trigger.
 */
export const mobileTabItemVariants = cva(
  'relative font-sans text-xs sm:text-sm tracking-tight whitespace-nowrap py-1.5 px-1 font-semibold transition-colors cursor-pointer select-none',
  {
    variants: {
      active: {
        true: 'text-[#C0643A] font-bold',
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
  'w-full bg-[#FFFFFE] border-b border-[#E7DFD3] shadow-md overflow-hidden'
);

/**
 * Mobile full-screen search drawer container.
 */
export const mobileSearchDrawerVariants = cva(
  'fixed inset-0 z-[9999] h-[100dvh] w-screen bg-[var(--color-bg-2,#F7F1E6)] flex flex-col overflow-hidden'
);
