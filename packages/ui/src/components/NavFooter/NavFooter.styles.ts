import { cva } from 'class-variance-authority';

/**
 * Root footer container styles adhering to Timmbr dark luxury aesthetic.
 */
export const navFooterRootVariants = cva(
  'w-full bg-surface-dark text-bg-2 relative border-t border-grey-1000/20 transition-colors select-text',
  {
    variants: {
      tone: {
        dark: 'bg-surface-dark text-bg-2',
        light: 'bg-bg-2 text-grey-800 border-t border-border-warm',
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
  'font-title! text-body-3 font-semibold text-primary-200 uppercase tracking-[0.14em] select-none flex items-center justify-between w-full'
);

/**
 * Navigation link item styles.
 */
export const footerNavLinkVariants = cva(
  'text-body-2 text-bg-2/85 hover:text-primary-200 hover:opacity-100 transition-colors inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200/60 rounded py-0.5 select-none'
);

/**
 * Social media icon button styles.
 */
export const footerSocialButtonVariants = cva(
  'inline-flex items-center justify-center text-primary-200 hover:text-bg-2 hover:bg-grey-50/5 p-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200/60 active:scale-95'
);

/**
 * Registered office block styles.
 */
export const footerOfficeBlockVariants = cva(
  'flex flex-col gap-1.5 text-body-2 text-bg-2/85 leading-relaxed'
);

/**
 * Legal sub-bar styles.
 */
export const footerLegalBarVariants = cva(
  'border-t border-grey-50/10 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-body-3 text-sand-muted'
);

/**
 * Legal policy link styles.
 */
export const footerLegalLinkVariants = cva(
  'text-body-3 text-sand-muted hover:text-grey-50 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary-200/60 rounded px-1'
);
