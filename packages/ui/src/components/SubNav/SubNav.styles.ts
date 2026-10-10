import { cva, type VariantProps } from 'class-variance-authority';

/** Desktop (lg): a vertical list. Small screens: a scrolling row or wrapped lines. */
export const subNavListVariants = cva('flex gap-1 lg:flex-col lg:flex-nowrap lg:overflow-visible', {
  variants: {
    mobileLayout: {
      scroll: 'overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
      wrap: 'flex-wrap',
    },
  },
  defaultVariants: { mobileLayout: 'scroll' },
});

/**
 * Items and footer actions share this shape so their icons and labels line up.
 * Active: dark brand text on a light brand tint (about 7:1) plus a bar on the
 * inline-start edge on desktop, so the state never relies on colour alone.
 */
export const subNavItemVariants = cva(
  'relative flex w-full items-center gap-3 whitespace-nowrap rounded-md px-3 py-2 lg:py-2.5 text-start font-sans text-body-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      active: {
        true: 'bg-muted font-semibold text-secondary-foreground lg:before:absolute lg:before:inset-y-2 lg:before:start-0 lg:before:w-1 lg:before:rounded-full lg:before:bg-primary',
        false: 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
      },
      tone: {
        default: '',
        destructive: 'text-destructive hover:bg-destructive/10 hover:text-destructive',
      },
    },
    defaultVariants: { active: false, tone: 'default' },
  }
);

export const subNavIconVariants = cva('flex size-5 shrink-0 items-center justify-center [&_svg]:size-[18px]');

export const subNavFooterVariants = cva(
  'flex shrink-0 flex-col lg:mt-2 lg:border-t lg:border-border lg:pt-2'
);

export type SubNavItemVariants = VariantProps<typeof subNavItemVariants>;
