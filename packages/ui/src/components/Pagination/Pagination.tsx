'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@timmbr/utils';
import { ChevronLeft, ChevronRight, MoreHorizontal } from '@timmbr/icons';
import { paginationLinkVariants } from './Pagination.styles';
import { Text } from '../Text';
import type {
  PaginationProps,
  PaginationContentProps,
  PaginationItemProps,
  PaginationLinkProps,
  PaginationPreviousProps,
  PaginationNextProps,
  PaginationEllipsisProps,
  PaginationSummaryProps,
  PaginationLinkComponentProps,
} from './Pagination.types';

export const Pagination: React.FC<PaginationProps> = ({ className, ...props }) => (
  <nav
    aria-label="pagination"
    data-slot="pagination"
    className={cn('mx-auto flex w-full justify-center font-sans', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

export const PaginationContent = React.forwardRef<HTMLUListElement, PaginationContentProps>(
  ({ className, ...props }, ref) => (
    <ul
      ref={ref}
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-1.5', className)}
      {...props}
    />
  )
);
PaginationContent.displayName = 'PaginationContent';

export const PaginationItem = React.forwardRef<HTMLLIElement, PaginationItemProps>(
  ({ className, ...props }, ref) => (
    <li ref={ref} data-slot="pagination-item" className={cn('', className)} {...props} />
  )
);
PaginationItem.displayName = 'PaginationItem';

/** A page button, or (with `asChild`) a link such as `next/link`. */
export const PaginationLink = React.forwardRef<HTMLButtonElement, PaginationLinkProps>(
  ({ className, isActive, size = 'default', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        {...(asChild ? {} : { type: 'button' as const })}
        aria-current={isActive ? 'page' : undefined}
        data-slot="pagination-link"
        data-active={isActive}
        className={cn(paginationLinkVariants({ isActive, size }), className)}
        {...props}
      />
    );
  }
);
PaginationLink.displayName = 'PaginationLink';

const DefaultLink = ({ href, children, ...rest }: PaginationLinkComponentProps) => (
  <a href={href} {...rest}>
    {children}
  </a>
);

/**
 * Previous / Next: a link when `href` is given (rendered with `linkComponent`,
 * e.g. next/link), otherwise a button (`onClick`). Without `href` and with
 * `disabled`, it shows as unavailable at the first / last page.
 */
function StepLink({
  direction,
  href,
  linkComponent: LinkComponent = DefaultLink,
  label,
  ariaLabel,
  disabled,
  className,
  children,
  ...props
}: (PaginationPreviousProps | PaginationNextProps) & { direction: 'previous' | 'next' }) {
  const icon =
    direction === 'previous' ? (
      <ChevronLeft className="size-4" aria-hidden="true" />
    ) : (
      <ChevronRight className="size-4" aria-hidden="true" />
    );
  const content = (
    <>
      {direction === 'previous' && icon}
      <span>{children ?? label}</span>
      {direction === 'next' && icon}
    </>
  );
  const classes = cn('gap-1', direction === 'previous' ? 'pl-2.5' : 'pr-2.5', className);

  if (href && !disabled) {
    return (
      <PaginationLink asChild aria-label={ariaLabel} className={classes} {...props}>
        <LinkComponent href={href}>{content}</LinkComponent>
      </PaginationLink>
    );
  }
  return (
    <PaginationLink aria-label={ariaLabel} disabled={disabled} className={classes} {...props}>
      {content}
    </PaginationLink>
  );
}

export const PaginationPrevious = ({
  label = 'Previous',
  ariaLabel = 'Go to previous page',
  ...props
}: PaginationPreviousProps) => <StepLink direction="previous" label={label} ariaLabel={ariaLabel} {...props} />;
PaginationPrevious.displayName = 'PaginationPrevious';

export const PaginationNext = ({
  label = 'Next',
  ariaLabel = 'Go to next page',
  ...props
}: PaginationNextProps) => <StepLink direction="next" label={label} ariaLabel={ariaLabel} {...props} />;
PaginationNext.displayName = 'PaginationNext';

/** "Page 2 of 5" between the step links (announced politely when it changes). */
export const PaginationSummary = ({ className, ...props }: PaginationSummaryProps) => (
  <Text
    as="span"
    variant="body-2"
    foreground="muted"
    aria-live="polite"
    data-slot="pagination-summary"
    className={cn('px-2', className)}
    {...props}
  />
);
PaginationSummary.displayName = 'PaginationSummary';

export const PaginationEllipsis = ({
  className,
  ...props
}: PaginationEllipsisProps) => (
  <span
    aria-hidden
    data-slot="pagination-ellipsis"
    className={cn('flex size-9 items-center justify-center text-muted-foreground', className)}
    {...props}
  >
    <MoreHorizontal className="size-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';
