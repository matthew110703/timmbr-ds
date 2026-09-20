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

/**
 * Previous page action button.
 */
export interface PaginationPreviousProps extends PaginationLinkProps {
  /**
   * Custom label or override text for Previous button.
   */
  children?: React.ReactNode;
}

/**
 * Next page action button.
 */
export interface PaginationNextProps extends PaginationLinkProps {
  /**
   * Custom label or override text for Next button.
   */
  children?: React.ReactNode;
}

/**
 * Decorative ellipsis indicator representing omitted pages in the range.
 */
export interface PaginationEllipsisProps extends React.ComponentProps<'span'> {
  /**
   * Additional CSS class names.
   */
  className?: string;
}
