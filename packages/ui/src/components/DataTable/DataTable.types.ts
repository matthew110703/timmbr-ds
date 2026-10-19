import type * as React from 'react';
import type {
  ColumnDef,
  HeaderContext,
  CellContext,
  SortingState,
  RowSelectionState,
  OnChangeFn,
  Row,
  Table as ReactTableInstance,
} from '@tanstack/react-table';
import type { TableProps } from '../Table/Table.types';

import type { MotionProps } from '../../types/motion';

export type {
  ColumnDef,
  HeaderContext,
  CellContext,
  SortingState,
  RowSelectionState,
  OnChangeFn,
  Row,
  ReactTableInstance,
};

export interface DataTableProps<TData, TValue = unknown> extends MotionProps {
  /** The data to display in the table. */
  data: TData[];
  /** Column definitions conforming to TanStack Table's ColumnDef specification. */
  columns: ColumnDef<TData, TValue>[];
  /** Controlled sorting state. */
  sorting?: SortingState;
  /** Callback fired when sorting changes. */
  onSortingChange?: OnChangeFn<SortingState>;
  /** Controlled row selection state (mapping rowId to boolean). */
  rowSelection?: RowSelectionState;
  /** Callback fired when row selection changes. */
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  /** Additional CSS class names for the table element. */
  className?: string;
  /** Additional CSS class names for the table container. */
  containerClassName?: string;
  /** Whether the table should render with borders. */
  bordered?: boolean;
  /** Table visual variant: 'default' | 'striped' | 'bordered'. */
  variant?: TableProps['variant'];
  /** Table row density: 'sm' | 'default'. */
  size?: TableProps['size'];
  /** Custom content to display when there are no records. */
  emptyMessage?: React.ReactNode;
  /** Whether data is loading (renders skeleton or loading indicator). */
  isLoading?: boolean;
  /** Optional function to determine unique ID for each row. */
  getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string;
  /** Optional click handler for table rows. */
  onRowClick?: (row: Row<TData>) => void;
  /** Whether the table header remains sticky while scrolling rows. @default true */
  stickyHeader?: boolean;
  /** Whether to render a smooth motion spring scroll progress indicator. @default true */
  showScrollIndicator?: boolean;
}
