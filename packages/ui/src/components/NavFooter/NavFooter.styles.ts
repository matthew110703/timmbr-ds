import { cva } from 'class-variance-authority';

/**
 * Root footer container styles adhering to Timmbr dark luxury aesthetic.
 */
export const navFooterRootVariants = cva(
  'w-full bg-[#1A1714] text-[#F7F1E6] relative border-t border-black/20 transition-colors select-text',
  {
    variants: {
      tone: {
        dark: 'bg-[#1A1714] text-[#F7F1E6]',
        light: 'bg-[var(--color-bg-2,#F7F1E6)] text-[var(--color-grey-800,#3C3C3C)] border-t border-[#E7DFD3]',
      },
    },
    defaultVariants: {
      tone: 'dark',
    },
  }
);

/**
 * Inner container width and responsive padding variants.
 */
export const navFooterContainerVariants = cva(
  'mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 transition-all',
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
 * Navigation column title styles.
 */
export const footerSectionTitleVariants = cva(
  'font-title text-xs font-semibold text-[#D39375] uppercase tracking-[0.14em] select-none flex items-center justify-between w-full'
);

/**
 * Navigation link item styles.
 */
export const footerNavLinkVariants = cva(
  'font-sans text-sm text-[#F7F1E6]/85 hover:text-[#D39375] hover:opacity-100 transition-colors inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D39375]/60 rounded py-0.5 select-none'
);

/**
 * Social media icon button styles.
 */
export const footerSocialButtonVariants = cva(
  'inline-flex items-center justify-center text-[#D39375] hover:text-[#F7F1E6] hover:bg-white/5 p-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D39375]/60 active:scale-95'
);

/**
 * Registered office block styles.
 */
export const footerOfficeBlockVariants = cva(
  'flex flex-col gap-1.5 text-sm text-[#F7F1E6]/85 font-sans leading-relaxed'
);

/**
 * Legal sub-bar styles.
 */
export const footerLegalBarVariants = cva(
  'border-t border-white/10 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#B7AEA2]'
);

/**
 * Legal policy link styles.
 */
export const footerLegalLinkVariants = cva(
  'text-xs font-sans text-[#B7AEA2] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D39375]/60 rounded px-1'
);
