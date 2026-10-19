'use client';

import * as React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  type SortingState,
  type RowSelectionState,
  type ColumnDef,
} from '@tanstack/react-table';
import { ChevronUp, ChevronDown, ChevronsUpDown } from '@timmbr/icons';
import { cn } from '@timmbr/utils';
import { motion } from '@timmbr/motion';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../Table/Table';
import type { DataTableProps } from './DataTable.types';

export function DataTable<TData, TValue = unknown>({
  data,
  columns,
  sorting,
  onSortingChange,
  rowSelection,
  onRowSelectionChange,
  className,
  containerClassName,
  bordered,
  variant,
  size,
  emptyMessage = 'No results found.',
  isLoading = false,
  getRowId,
  onRowClick,
  stickyHeader = true,
  showScrollIndicator = true,
  motion: motionProp,
}: DataTableProps<TData, TValue>) {
  const [internalSorting, setInternalSorting] = React.useState<SortingState>([]);
  const [internalRowSelection, setInternalRowSelection] =
    React.useState<RowSelectionState>({});

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const globalMotion = useGlobalAnimation();
  const { shouldAnimate } = resolveMotion(motionProp, globalMotion);

  const [scrollProgress, setScrollProgress] = React.useState(0);

  React.useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const updateProgress = () => {
      const maxScroll = el.scrollHeight - el.clientHeight;
      setScrollProgress(maxScroll > 0 ? el.scrollTop / maxScroll : 0);
    };

    updateProgress();
    el.addEventListener('scroll', updateProgress, { passive: true });

    const resizeObserver = new ResizeObserver(updateProgress);
    resizeObserver.observe(el);

    return () => {
      el.removeEventListener('scroll', updateProgress);
      resizeObserver.disconnect();
    };
  }, [data]);

  // Smooth scroll back to top on data/page change
  React.useEffect(() => {
    if (typeof scrollContainerRef.current?.scrollTo === 'function') {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [data]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sorting !== undefined ? sorting : internalSorting,
      rowSelection: rowSelection !== undefined ? rowSelection : internalRowSelection,
    },
    onSortingChange: onSortingChange ?? setInternalSorting,
    onRowSelectionChange: onRowSelectionChange ?? setInternalRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableRowSelection: true,
    getRowId,
  });

  const resolvedContainerClassName = cn(
    stickyHeader && 'min-h-0 h-full',
    containerClassName
  );

  return (
    <Table
      className={cn(stickyHeader && 'border-separate border-spacing-0', className)}
      containerClassName={resolvedContainerClassName}
      containerRef={scrollContainerRef}
      bordered={bordered}
      variant={variant}
      size={size}
    >
      {showScrollIndicator && shouldAnimate && (
        <caption className="p-0 caption-top">
          <motion.div
            style={{ scaleX: scrollProgress }}
            className="sticky top-0 z-30 h-0.5 w-full bg-primary origin-left pointer-events-none transition-transform duration-150 ease-out"
          />
        </caption>
      )}
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="border-b border-border hover:bg-transparent">
            {headerGroup.headers.map((header) => {
              const canSort = header.column.getCanSort();
              const isSorted = header.column.getIsSorted();

              return (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  className={cn(
                    stickyHeader
                      ? 'sticky top-0 z-20 bg-card border-b border-border'
                      : 'static shadow-none',
                    canSort && 'cursor-pointer select-none'
                  )}
                  onClick={canSort ? header.column.getToggleSortingHandler() : undefined}
                >
                  {header.isPlaceholder ? null : (
                    <div className="flex items-center gap-1.5">
                      <span>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </span>
                      {canSort && (
                        <span className="inline-flex items-center text-muted-foreground">
                          {isSorted === 'asc' ? (
                            <ChevronUp className="size-3.5 text-foreground" />
                          ) : isSorted === 'desc' ? (
                            <ChevronDown className="size-3.5 text-foreground" />
                          ) : (
                            <ChevronsUpDown className="size-3.5 opacity-40 hover:opacity-100 transition-opacity" />
                          )}
                        </span>
                      )}
                    </div>
                  )}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {isLoading ? (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-28 text-center text-muted-foreground"
            >
              <div className="flex items-center justify-center gap-2">
                <span className="inline-block size-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span>Loading...</span>
              </div>
            </TableCell>
          </TableRow>
        ) : table.getRowModel().rows.length > 0 ? (
          table.getRowModel().rows.map((row, index) => {
            const isSelected = row.getIsSelected();
            const cells = row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ));

            if (shouldAnimate) {
              return (
                <motion.tr
                  key={row.id}
                  data-state={isSelected ? 'selected' : undefined}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                    delay: Math.min(index * 0.015, 0.15),
                  }}
                  className={cn(
                    'border-b border-grey-200 dark:border-grey-800 transition-colors data-[state=selected]:bg-primary/5 hover:bg-grey-50/80 dark:hover:bg-grey-900/60',
                    onRowClick && 'cursor-pointer'
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {cells}
                </motion.tr>
              );
            }

            return (
              <TableRow
                key={row.id}
                data-state={isSelected ? 'selected' : undefined}
                className={cn(onRowClick && 'cursor-pointer')}
                onClick={() => onRowClick?.(row)}
              >
                {cells}
              </TableRow>
            );
          })
        ) : (
          <TableRow>
            <TableCell
              colSpan={columns.length}
              className="h-28 text-center text-muted-foreground"
            >
              {emptyMessage}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

DataTable.displayName = 'DataTable';

export { flexRender };
export type { ColumnDef };
