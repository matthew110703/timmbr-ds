import { cva, type VariantProps } from 'class-variance-authority';

export const scrollRailWrapperVariants = cva('relative w-full');

export const scrollRailVariants = cva(
  'w-full overflow-x-auto pb-4 pt-1 px-1 flex snap-x snap-mandatory scroll-smooth focus:outline-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
  {
    variants: {
      gap: {
        sm: 'gap-3',
        md: 'gap-5 sm:gap-6',
        lg: 'gap-6 sm:gap-8',
      },
    },
    defaultVariants: {
      gap: 'md',
    },
  },
);

export const scrollRailChevronVariants = cva(
  'absolute top-1/2 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-grey-50/70 text-grey-950 shadow-sm backdrop-blur-sm transition-colors hover:bg-grey-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:flex',
  {
    variants: {
      side: {
        left: 'left-2',
        right: 'right-2',
      },
    },
  },
);

export type ScrollRailVariants = VariantProps<typeof scrollRailVariants>;
