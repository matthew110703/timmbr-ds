import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DataTable, type ColumnDef } from './DataTable';
import { Checkbox } from '../Checkbox/Checkbox';

interface ProductTestItem {
  id: string;
  name: string;
  price: number;
}

const data: ProductTestItem[] = [
  { id: '1', name: 'Oak Chair', price: 150 },
  { id: '2', name: 'Walnut Table', price: 400 },
];

const columns: ColumnDef<ProductTestItem>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all"
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
              ? 'indeterminate'
              : false
        }
        onCheckedChange={(val) => table.toggleAllPageRowsSelected(!!val)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label={`Select ${row.original.name}`}
        checked={row.getIsSelected()}
        onCheckedChange={(val) => row.toggleSelected(!!val)}
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'name',
    header: 'Product Name',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
];

describe('DataTable Component', () => {
  it('renders data and headers correctly', () => {
    render(<DataTable data={data} columns={columns} />);

    expect(screen.getByText('Product Name')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Oak Chair')).toBeInTheDocument();
    expect(screen.getByText('Walnut Table')).toBeInTheDocument();
  });

  it('renders empty message when data is empty', () => {
    render(<DataTable data={[]} columns={columns} emptyMessage="No products found" />);

    expect(screen.getByText('No products found')).toBeInTheDocument();
  });

  it('renders loading indicator when isLoading is true', () => {
    render(<DataTable data={[]} columns={columns} isLoading />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('calls onRowSelectionChange when row checkbox is clicked', () => {
    const handleSelectionChange = vi.fn();
    render(
      <DataTable
        data={data}
        columns={columns}
        onRowSelectionChange={handleSelectionChange}
      />
    );

    const rowCheckbox = screen.getByLabelText('Select Oak Chair');
    fireEvent.click(rowCheckbox);
    expect(handleSelectionChange).toHaveBeenCalled();
  });

  it('applies sticky header classes by default', () => {
    const { container } = render(<DataTable data={data} columns={columns} />);

    const table = container.querySelector('[data-slot="table"]');
    expect(table).toHaveClass('border-separate');

    const headerCells = container.querySelectorAll('[data-slot="table-head"]');
    expect(headerCells.length).toBeGreaterThan(0);
    headerCells.forEach((cell) => {
      expect(cell).toHaveClass('sticky');
      expect(cell).toHaveClass('top-0');
    });
  });

  it('uses static header cells when stickyHeader is false', () => {
    const { container } = render(
      <DataTable data={data} columns={columns} stickyHeader={false} />
    );

    const table = container.querySelector('[data-slot="table"]');
    expect(table).not.toHaveClass('border-separate');

    const headerCells = container.querySelectorAll('[data-slot="table-head"]');
    headerCells.forEach((cell) => {
      expect(cell).toHaveClass('static');
      expect(cell).not.toHaveClass('sticky');
    });
  });
});
