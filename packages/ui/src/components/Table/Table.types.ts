import type * as React from 'react';
import type { TableVariants } from './Table.styles';

export interface TableProps
  extends React.TableHTMLAttributes<HTMLTableElement>,
    TableVariants {
  containerClassName?: string;
}

export interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableBodyProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {}

export interface TableRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {}

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {}

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {}

export interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement> {}

export interface TablePaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Current active page (1-indexed).
   * @default 1
   */
  page?: number;
  /**
   * Total number of pages.
   * @default 1
   */
  totalPages?: number;
  /**
   * Total number of records across all pages.
   */
  totalItems?: number;
  /**
   * Number of rows per page.
   * @default 10
   */
  pageSize?: number;
  /**
   * Page size options for the rows-per-page selector.
   */
  pageSizeOptions?: number[];
  /**
   * Callback fired when page index changes.
   */
  onPageChange?: (page: number) => void;
  /**
   * Callback fired when page size changes.
   */
  onPageSizeChange?: (pageSize: number) => void;
  /**
   * Optional custom label generator for current results range.
   */
  formatResultsText?: (start: number, end: number, total: number) => React.ReactNode;
}
