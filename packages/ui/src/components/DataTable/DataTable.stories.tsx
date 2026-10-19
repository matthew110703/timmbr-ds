import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { DataTable } from './DataTable';
import type { ColumnDef, SortingState } from './DataTable.types';
import { TablePagination } from '../Table/TablePagination';
import { Checkbox } from '../Checkbox/Checkbox';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import { Pencil, Trash2 } from '@timmbr/icons';

interface ProductItem {
  id: string;
  sku: string;
  title: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'draft' | 'archived';
}

const mockProducts: ProductItem[] = [
  { id: '1', sku: 'OAK-CH-01', title: 'Solid White Oak Dining Chair', category: 'Chairs', price: 189.0, stock: 45, status: 'active' },
  { id: '2', sku: 'WAL-TB-02', title: 'American Walnut Coffee Table', category: 'Tables', price: 420.0, stock: 12, status: 'active' },
  { id: '3', sku: 'MAP-DS-03', title: 'Hard Maple Minimalist Desk', category: 'Desks', price: 650.0, stock: 8, status: 'draft' },
  { id: '4', sku: 'CHE-BK-04', title: 'Black Cherry Modular Bookshelf', category: 'Shelving', price: 340.0, stock: 0, status: 'archived' },
  { id: '5', sku: 'ASH-BN-05', title: 'White Ash Upholstered Bench', category: 'Benches', price: 210.0, stock: 19, status: 'active' },
  { id: '6', sku: 'TEK-LO-06', title: 'Burmese Teak Outdoor Lounger', category: 'Outdoor', price: 890.0, stock: 5, status: 'active' },
  { id: '7', sku: 'HCK-ST-07', title: 'Hickory Ergonomic Bar Stool', category: 'Stools', price: 145.0, stock: 28, status: 'active' },
  { id: '8', sku: 'CED-CH-08', title: 'Western Red Cedar Chest', category: 'Storage', price: 520.0, stock: 3, status: 'draft' },
];

const basicColumns: ColumnDef<ProductItem>[] = [
  {
    accessorKey: 'sku',
    header: 'SKU',
    cell: ({ row }) => (
      <span className="font-mono text-xs font-semibold text-primary">
        {row.original.sku}
      </span>
    ),
  },
  {
    accessorKey: 'title',
    header: 'Product Title',
    cell: ({ row }) => (
      <span className="font-medium text-foreground">
        {row.original.title}
      </span>
    ),
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => (
      <span className="font-mono font-medium">
        ${row.original.price.toFixed(2)}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status;
      const variant =
        status === 'active'
          ? 'default'
          : status === 'draft'
            ? 'subtle'
            : 'outline';
      return (
        <Badge variant={variant} size="sm" className="capitalize">
          {status}
        </Badge>
      );
    },
  },
];

const meta: Meta<typeof DataTable<ProductItem>> = {
  title: 'Data Display/DataTable',
  component: DataTable as React.ComponentType<any>,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'striped', 'bordered'],
      description: 'Visual row striping and table border style',
    },
    size: {
      control: 'select',
      options: ['sm', 'default'],
      description: 'Cell padding density',
    },
    bordered: {
      control: 'boolean',
      description: 'Whether the table container renders with an outer border',
    },
    isLoading: {
      control: 'boolean',
      description: 'Renders loading indicator in table body',
    },
    stickyHeader: {
      control: 'boolean',
      description:
        'Keeps column headers pinned while the table body scrolls inside the container',
    },
  },
  args: {
    data: mockProducts,
    columns: basicColumns,
    bordered: true,
    variant: 'default',
    size: 'default',
    isLoading: false,
  },
};

export default meta;
type Story = StoryObj<typeof DataTable<ProductItem>>;

export const Default: Story = {
  render: (args) => <DataTable {...args} />,
};

export const StickyHeaderInScrollRegion: Story = {
  render: () => {
    const manyRows: ProductItem[] = Array.from({ length: 24 }, (_, index) => ({
      id: String(index + 1),
      sku: `SKU-${String(index + 1).padStart(3, '0')}`,
      title: `Catalog Product ${index + 1}`,
      category: index % 2 === 0 ? 'Chairs' : 'Tables',
      price: 120 + index * 15,
      stock: 10 + index,
      status: index % 3 === 0 ? 'draft' : 'active',
    }));

    return (
      <div className="h-80 flex flex-col rounded-lg border border-border bg-card overflow-hidden">
        <DataTable
          data={manyRows}
          columns={basicColumns}
          bordered={false}
          stickyHeader
          showScrollIndicator={false}
          containerClassName="flex-1 min-h-0 overflow-auto"
        />
      </div>
    );
  },
};

export const WithSorting: Story = {
  render: () => {
    const [sorting, setSorting] = React.useState<SortingState>([
      { id: 'price', desc: true },
    ]);

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between text-body-3">
          <span className="text-muted-foreground">
            Current sorting:{' '}
            <strong className="text-foreground">
              {sorting.length > 0
                ? `${sorting[0].id} (${sorting[0].desc ? 'descending' : 'ascending'})`
                : 'None'}
            </strong>
          </span>
          {sorting.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setSorting([])}>
              Reset sorting
            </Button>
          )}
        </div>
        <DataTable
          data={mockProducts}
          columns={basicColumns}
          sorting={sorting}
          onSortingChange={setSorting}
          bordered
        />
      </div>
    );
  },
};

export const WithRowSelection: Story = {
  render: () => {
    const [rowSelection, setRowSelection] = React.useState<Record<string, boolean>>({});

    const columns: ColumnDef<ProductItem>[] = [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected()
                ? true
                : table.getIsSomePageRowsSelected()
                  ? 'indeterminate'
                  : false
            }
            onCheckedChange={(val) => table.toggleAllPageRowsSelected(!!val)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(val) => row.toggleSelected(!!val)}
            aria-label={`Select ${row.original.title}`}
          />
        ),
        enableSorting: false,
      },
      ...basicColumns,
    ];

    const selectedCount = Object.keys(rowSelection).filter((k) => rowSelection[k]).length;

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between text-body-3">
          <span className="text-muted-foreground">
            Selected items: <strong className="text-foreground">{selectedCount}</strong> of {mockProducts.length}
          </span>
          {selectedCount > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setRowSelection({})}>
              Clear selection
            </Button>
          )}
        </div>
        <DataTable
          data={mockProducts}
          columns={columns}
          rowSelection={rowSelection}
          onRowSelectionChange={setRowSelection}
          getRowId={(row) => row.id}
          bordered
        />
      </div>
    );
  },
};

export const WithPagination: Story = {
  render: () => {
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(4);

    const total = mockProducts.length;
    const totalPages = Math.ceil(total / pageSize);
    const startIndex = (page - 1) * pageSize;
    const pageData = mockProducts.slice(startIndex, startIndex + pageSize);

    return (
      <div className="rounded-lg border border-border bg-card overflow-hidden">
        <DataTable data={pageData} columns={basicColumns} bordered={false} />
        <TablePagination
          page={page}
          totalPages={totalPages}
          totalItems={total}
          pageSize={pageSize}
          pageSizeOptions={[2, 4, 8]}
          onPageChange={setPage}
          onPageSizeChange={(newSize) => {
            setPageSize(newSize);
            setPage(1);
          }}
        />
      </div>
    );
  },
};

export const WithActionsAndBadges: Story = {
  render: () => {
    const interactiveColumns: ColumnDef<ProductItem>[] = [
      ...basicColumns,
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label={`Edit ${row.original.title}`}
              onClick={() => alert(`Edit ${row.original.sku}`)}
            >
              <Pencil className="size-3.5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive"
              aria-label={`Delete ${row.original.title}`}
              onClick={() => alert(`Delete ${row.original.sku}`)}
            >
              <Trash2 className="size-3.5" />
            </Button>
          </div>
        ),
        enableSorting: false,
      },
    ];

    return <DataTable data={mockProducts.slice(0, 5)} columns={interactiveColumns} bordered />;
  },
};

export const ClickableRows: Story = {
  render: () => {
    const [selectedProduct, setSelectedProduct] = React.useState<ProductItem | null>(null);

    return (
      <div className="space-y-3">
        {selectedProduct ? (
          <div className="rounded-md border border-border bg-accent/40 p-3 text-body-3 text-foreground flex items-center justify-between">
            <span>
              Clicked Row: <strong>{selectedProduct.title}</strong> ({selectedProduct.sku}) &bull; ${selectedProduct.price.toFixed(2)}
            </span>
            <Button variant="ghost" size="sm" onClick={() => setSelectedProduct(null)}>
              Dismiss
            </Button>
          </div>
        ) : (
          <p className="text-body-3 text-muted-foreground">
            Click on any row to trigger the <code>onRowClick</code> callback.
          </p>
        )}
        <DataTable
          data={mockProducts.slice(0, 5)}
          columns={basicColumns}
          onRowClick={(row) => setSelectedProduct(row.original)}
          bordered
        />
      </div>
    );
  },
};

export const Striped: Story = {
  args: {
    data: mockProducts.slice(0, 5),
    columns: basicColumns,
    variant: 'striped',
    bordered: true,
  },
};

export const Dense: Story = {
  args: {
    data: mockProducts.slice(0, 5),
    columns: basicColumns,
    size: 'sm',
    bordered: true,
  },
};

export const EmptyState: Story = {
  args: {
    data: [],
    columns: basicColumns,
    emptyMessage: 'No catalog products found. Try adjusting your search query.',
    bordered: true,
  },
};

export const LoadingState: Story = {
  args: {
    data: [],
    columns: basicColumns,
    isLoading: true,
    bordered: true,
  },
};
