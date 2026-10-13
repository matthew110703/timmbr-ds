import { cva } from 'class-variance-authority';

export const breadcrumbListVariants = cva('flex flex-wrap items-center gap-1.5 font-sans text-body-3 text-grey-600');

export const breadcrumbItemVariants = cva('inline-flex min-w-0 items-center gap-1.5', {
  variants: {
    /** Middle items hidden on small screens when the trail is long. */
    collapsible: {
      true: 'hidden sm:inline-flex',
      false: '',
    },
  },
  defaultVariants: { collapsible: false },
});

export const breadcrumbLinkVariants = cva(
  'truncate rounded-sm transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
);

export const breadcrumbCurrentVariants = cva('truncate font-medium text-grey-950');

export const breadcrumbSeparatorVariants = cva('size-3.5 shrink-0 text-grey-400');
