import type * as React from 'react';

/**
 * Root container for pagination navigation.
 */
export interface PaginationProps extends React.ComponentProps<'nav'> {
  /**
   * Additional CSS class names.
   */
  className?: string;
  /**
   * Accessible label for the navigation landmark.
   * @default "pagination"
   */
  'aria-label'?: string;
  /**
   * Children components representing pagination structure.
   */
  children?: React.ReactNode;
}

/**
 * Ordered list container holding individual pagination items.
 */
export interface PaginationContentProps extends React.ComponentProps<'ul'> {
  /**
   * Additional CSS class names.
   */
  className?: string;
  /**
   * Child list items.
   */
  children?: React.ReactNode;
}

/**
 * Wrapper for an individual pagination item link or indicator.
 */
export interface PaginationItemProps extends React.ComponentProps<'li'> {
  /**
   * Additional CSS class names.
   */
  className?: string;
  /**
   * Child link or button element.
   */
  children?: React.ReactNode;
}

/**
 * Clickable pagination button or anchor link.
 */
export interface PaginationLinkProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Size variant of the pagination control.
   * @default 'default'
   */
  size?: 'default' | 'sm' | 'lg';
  /**
   * Whether this page is the currently active page.
   * Sets aria-current="page" when true.
   * @default false
   */
  isActive?: boolean;
  /**
   * When true, delegates rendering to the immediate child component via Radix Slot.
   * @default false
   */
  asChild?: boolean;
  /**
   * Content inside the pagination button.
   */
  children?: React.ReactNode;
}

/** Props of the link component used by Previous / Next (e.g. next/link). */
export interface PaginationLinkComponentProps {
  href: string;
  children?: React.ReactNode;
  className?: string;
}

interface PaginationStepProps extends Omit<PaginationLinkProps, 'asChild'> {
  /** Page URL: renders a link (URL-based paging) instead of a button. */
  href?: string;
  /** Link to render `href` with (e.g. next/link). Defaults to `<a>`. */
  linkComponent?: React.ComponentType<PaginationLinkComponentProps>;
  /** Visible text (localise it). */
  label?: React.ReactNode;
  /** Accessible name (localise it). */
  ariaLabel?: string;
}

/**
 * Previous page action (link with `href`, otherwise a button).
 */
export type PaginationPreviousProps = PaginationStepProps;

/**
 * Next page action (link with `href`, otherwise a button).
 */
export type PaginationNextProps = PaginationStepProps;

/** "Page x of y" text. */
export type PaginationSummaryProps = React.ComponentProps<'span'>;

/**
 * Decorative ellipsis indicator representing omitted pages in the range.
 */
export interface PaginationEllipsisProps extends React.ComponentProps<'span'> {
  /**
   * Additional CSS class names.
   */
  className?: string;
}
