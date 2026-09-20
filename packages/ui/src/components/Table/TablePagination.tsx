'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { ChevronLeft, ChevronRight } from '@timmbr/icons';
import { tablePaginationVariants } from './Table.styles';
import type { TablePaginationProps } from './Table.types';

export const TablePagination = React.forwardRef<HTMLDivElement, TablePaginationProps>(
  (
    {
      className,
      page = 1,
      totalPages = 1,
      totalItems,
      pageSize = 10,
      pageSizeOptions = [10, 20, 50],
      onPageChange,
      onPageSizeChange,
      formatResultsText,
      children,
      ...props
    },
    ref
  ) => {
    const computedTotalPages =
      totalPages || (totalItems ? Math.ceil(totalItems / pageSize) : 1);
    const startItem = totalItems !== undefined ? (page - 1) * pageSize + 1 : 1;
    const endItem =
      totalItems !== undefined
        ? Math.min(page * pageSize, totalItems)
        : page * pageSize;

    return (
      <div
        ref={ref}
        data-slot="table-pagination"
        className={cn(tablePaginationVariants(), className)}
        {...props}
      >
        <div className="flex items-center gap-4">
          {totalItems !== undefined ? (
            formatResultsText ? (
              formatResultsText(startItem, endItem, totalItems)
            ) : (
              <span>
                Showing <span className="font-semibold text-foreground">{startItem}</span> to{' '}
                <span className="font-semibold text-foreground">{endItem}</span> of{' '}
                <span className="font-semibold text-foreground">{totalItems}</span> results
              </span>
            )
          ) : (
            <span>
              Page <span className="font-semibold text-foreground">{page}</span> of{' '}
              <span className="font-semibold text-foreground">{computedTotalPages}</span>
            </span>
          )}

          {pageSizeOptions && pageSizeOptions.length > 0 && onPageSizeChange && (
            <div className="flex items-center gap-1.5 ml-2">
              <span className="text-muted-foreground">Rows per page:</span>
              <select
                aria-label="Rows per page"
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                className="h-7 rounded-[2px] border border-grey-200 dark:border-grey-700 bg-white dark:bg-grey-900 px-2 py-0 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {pageSizeOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {children ? (
          <div>{children}</div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous page"
              disabled={page <= 1}
              onClick={() => onPageChange?.(page - 1)}
              className="inline-flex items-center gap-1 h-8 px-2.5 rounded-[2px] border border-grey-200 dark:border-grey-700 bg-white dark:bg-grey-800 text-xs font-medium text-foreground hover:bg-grey-100 dark:hover:bg-grey-700 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <ChevronLeft className="size-3.5" />
              <span>Previous</span>
            </button>

            <span className="px-2 text-xs font-medium text-muted-foreground">
              {page} / {computedTotalPages}
            </span>

            <button
              type="button"
              aria-label="Next page"
              disabled={page >= computedTotalPages}
              onClick={() => onPageChange?.(page + 1)}
              className="inline-flex items-center gap-1 h-8 px-2.5 rounded-[2px] border border-grey-200 dark:border-grey-700 bg-white dark:bg-grey-800 text-xs font-medium text-foreground hover:bg-grey-100 dark:hover:bg-grey-700 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer"
            >
              <span>Next</span>
              <ChevronRight className="size-3.5" />
            </button>
          </div>
        )}
      </div>
    );
  }
);

TablePagination.displayName = 'TablePagination';
