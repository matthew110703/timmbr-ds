import { cva, type VariantProps } from 'class-variance-authority';

export const imageUploadZoneVariants = cva(
  'relative rounded-xl border-2 border-dashed transition-all duration-200 flex flex-col items-center justify-center text-center select-none font-sans outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:border-primary',
  {
    variants: {
      aspectRatio: {
        square: 'size-32 p-2 aspect-square shrink-0',
        video: 'w-full aspect-[16/10] min-h-[160px] p-5',
        wide: 'w-full aspect-[21/9] min-h-[130px] p-5',
        auto: 'w-full min-h-[130px] p-5',
      },
      size: {
        default: '',
        compact: 'py-3 px-2 min-h-[80px]',
      },
      isDragging: {
        true: 'border-primary bg-primary-50/40 dark:bg-primary-950/20 scale-[0.99] shadow-sm',
        false: '',
      },
      isError: {
        true: 'border-destructive/80 bg-destructive/5 hover:border-destructive',
        false: 'border-grey-300 dark:border-grey-700 bg-grey-50/60 dark:bg-grey-900/40 hover:border-grey-400 hover:bg-grey-50 dark:hover:bg-grey-900/60',
      },
      isDisabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
        false: 'cursor-pointer',
      },
    },
    defaultVariants: {
      aspectRatio: 'auto',
      size: 'default',
      isDragging: false,
      isError: false,
      isDisabled: false,
    },
  }
);

export const imagePreviewContainerVariants = cva(
  'relative group rounded-xl border border-grey-200 dark:border-grey-800 bg-grey-50 dark:bg-grey-900 overflow-hidden flex items-center justify-center transition-all shadow-xs',
  {
    variants: {
      aspectRatio: {
        square: 'size-32 aspect-square shrink-0',
        video: 'w-full aspect-[16/10]',
        wide: 'w-full aspect-[21/9]',
        auto: 'w-full h-44',
      },
    },
    defaultVariants: {
      aspectRatio: 'auto',
    },
  }
);

export const thumbnailCardVariants = cva(
  'relative group rounded-xl border border-grey-200 dark:border-grey-800 bg-grey-100 dark:bg-grey-900 overflow-hidden transition-all shadow-xs hover:shadow-md hover:border-grey-300 dark:hover:border-grey-700',
  {
    variants: {
      aspectRatio: {
        square: 'aspect-square',
        video: 'aspect-[16/10]',
        wide: 'aspect-[21/9]',
        auto: 'aspect-square min-h-[110px]',
      },
    },
    defaultVariants: {
      aspectRatio: 'square',
    },
  }
);

export type ImageUploadZoneVariants = VariantProps<typeof imageUploadZoneVariants>;
export type ImagePreviewContainerVariants = VariantProps<typeof imagePreviewContainerVariants>;
