import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * The @timmbr/theme typography scale (text-h1 … text-caption). Registered as
 * font sizes so tailwind-merge doesn't mistake them for text colours and drop
 * one of `text-body-2 text-primary`.
 */
export const THEME_TEXT_STYLES = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'page-title',
  'subtitle-1',
  'subtitle-2',
  'body-1',
  'body-2',
  'body-2-medium',
  'body-2-semibold',
  'body-2-light',
  'body-3',
  'body-3-light',
  'caption-lg',
  'caption',
] as const;

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: [...THEME_TEXT_STYLES] }],
    },
  },
});

/**
 * Merges class names cleanly using clsx and resolves Tailwind CSS class conflicts using tailwind-merge.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
