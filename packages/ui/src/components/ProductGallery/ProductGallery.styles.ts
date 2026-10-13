import { cva } from 'class-variance-authority';

export const productGalleryVariants = cva('flex min-w-0 flex-col gap-3 font-sans', {
  variants: {
    /** `left`: a vertical thumbnail column beside the image from lg up (a row below it on phones). */
    thumbnails: {
      bottom: 'lg:gap-6',
      left: 'lg:grid lg:grid-cols-[4.5rem_minmax(0,1fr)] lg:gap-4',
    },
  },
  defaultVariants: { thumbnails: 'bottom' },
});

/** Holds the frame and, beside it, the hover zoom pane. */
export const productGalleryStageVariants = cva('relative min-w-0');

/** Main image frame: a scroll-snap track (swipe on touch, arrows on desktop). */
export const productGalleryFrameVariants = cva('relative overflow-hidden rounded-sm bg-grey-100');

export const productGalleryTrackVariants = cva(
  'flex size-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
);

/** The button filling a slide (opens the fullscreen viewer). */
export const productGallerySlideVariants = cva(
  'relative block size-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring'
);

/** Figma: 40px translucent circles with a light shadow. */
export const productGalleryArrowVariants = cva(
  'absolute top-1/2 z-10 hidden size-10 -translate-y-1/2 items-center justify-center rounded-full bg-grey-50/70 text-grey-950 shadow-sm backdrop-blur-sm transition-colors hover:bg-grey-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-0 md:flex',
  {
    variants: {
      side: {
        left: 'left-3',
        right: 'right-3',
      },
    },
  }
);

export const productGalleryCounterVariants = cva(
  'pointer-events-none absolute bottom-3 left-3 rounded-full bg-grey-950/70 px-2.5 py-1 text-caption font-semibold text-grey-50 tabular-nums md:hidden'
);

export const productGalleryThumbsVariants = cva('relative', {
  variants: {
    thumbnails: {
      bottom: '',
      // The column takes the frame's height (its row) and scrolls inside it.
      left: 'lg:order-first',
    },
  },
  defaultVariants: { thumbnails: 'bottom' },
});

export const productGalleryThumbListVariants = cva(
  'flex snap-x gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
  {
    variants: {
      thumbnails: {
        bottom: 'lg:gap-3',
        left: 'lg:absolute lg:inset-0 lg:snap-y lg:flex-col lg:gap-3 lg:overflow-y-auto lg:overflow-x-visible lg:p-0.5',
      },
    },
    defaultVariants: { thumbnails: 'bottom' },
  }
);

export const productGalleryThumbVariants = cva(
  'relative aspect-square w-[calc((100%-1.5rem)/4.5)] shrink-0 snap-start overflow-hidden rounded-sm bg-grey-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
  {
    variants: {
      thumbnails: {
        bottom: 'lg:w-[calc((100%-2.25rem)/4)]',
        left: 'lg:w-full',
      },
      active: {
        true: 'border-2 border-primary',
        false: 'border border-grey-200 opacity-85 hover:border-grey-400 hover:opacity-100',
      },
    },
    defaultVariants: { active: false, thumbnails: 'bottom' },
  }
);

/** The square that follows the pointer over the image (what the zoom pane magnifies). */
export const productGalleryLensVariants = cva(
  'pointer-events-none absolute z-10 border border-grey-50/80 bg-grey-50/25 shadow-sm'
);

/** Desktop hover zoom: a pane beside the image, over the content next to it. */
export const productGalleryZoomPaneVariants = cva(
  'pointer-events-none absolute left-[calc(100%+1.5rem)] top-0 z-30 hidden h-full overflow-hidden rounded-sm border border-grey-200 bg-grey-100 shadow-xl lg:block'
);

export const productGalleryLightboxVariants = cva(
  'fixed inset-0 z-[10000] flex flex-col bg-grey-1000/95 text-grey-50 focus:outline-none'
);

export const productGalleryLightboxButtonVariants = cva(
  'flex size-11 items-center justify-center rounded-full bg-grey-50/10 text-grey-50 transition-colors hover:bg-grey-50/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grey-50 disabled:pointer-events-none disabled:opacity-30'
);
