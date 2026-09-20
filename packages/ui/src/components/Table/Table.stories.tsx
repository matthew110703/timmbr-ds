import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  TablePagination,
} from './index';

const meta: Meta<typeof Table> = {
  title: 'Data/Table',
  component: Table,
  subcomponents: {
    TableHeader: TableHeader as React.ComponentType<any>,
    TableBody: TableBody as React.ComponentType<any>,
    TableFooter: TableFooter as React.ComponentType<any>,
    TableRow: TableRow as React.ComponentType<any>,
    TableHead: TableHead as React.ComponentType<any>,
    TableCell: TableCell as React.ComponentType<any>,
    TableCaption: TableCaption as React.ComponentType<any>,
    TablePagination: TablePagination as React.ComponentType<any>,
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'striped', 'bordered'],
      description: 'Row striping and outer border style',
    },
    size: {
      control: 'select',
      options: ['sm', 'default'],
      description: 'Cell padding density',
    },
    bordered: {
      control: 'boolean',
      description: 'Wraps table container in border',
    },
  },
  args: {
    variant: 'default',
    size: 'default',
    bordered: true,
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const timberInventory = [
  { id: 'OAK-01', species: 'American White Oak', density: '755 kg/m³', grade: 'FAS Prime', stock: '2,400 BF' },
  { id: 'WAL-02', species: 'Black American Walnut', density: '640 kg/m³', grade: 'Select 1', stock: '1,850 BF' },
  { id: 'MAP-03', species: 'Sugar Hard Maple', density: '705 kg/m³', grade: 'FAS #1', stock: '3,100 BF' },
  { id: 'CHE-04', species: 'Black Cherry', density: '560 kg/m³', grade: 'Cabinet Grade', stock: '920 BF' },
  { id: 'ASH-05', species: 'White Ash', density: '670 kg/m³', grade: 'FAS Prime', stock: '1,450 BF' },
  { id: 'BIR-06', species: 'Yellow Birch', density: '690 kg/m³', grade: 'FAS Prime', stock: '1,120 BF' },
  { id: 'HCK-07', species: 'Shagbark Hickory', density: '830 kg/m³', grade: 'Select 1', stock: '2,800 BF' },
  { id: 'TEK-08', species: 'Burmese Teak', density: '660 kg/m³', grade: 'FEQ Marine', stock: '750 BF' },
  { id: 'CED-09', species: 'Western Red Cedar', density: '380 kg/m³', grade: 'Clear Heart', stock: '3,400 BF' },
  { id: 'PIN-10', species: 'Eastern White Pine', density: '400 kg/m³', grade: 'Furniture C', stock: '4,200 BF' },
];

export const Default: Story = {
  render: (args) => (
    <Table {...args}>
      <TableCaption>Active kiln dried timber lot inventory.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Lot ID</TableHead>
          <TableHead>Species</TableHead>
          <TableHead>Density</TableHead>
          <TableHead>Grade</TableHead>
          <TableHead className="text-right">Stock</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {timberInventory.slice(0, 5).map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-mono font-medium text-primary">{row.id}</TableCell>
            <TableCell className="font-medium">{row.species}</TableCell>
            <TableCell>{row.density}</TableCell>
            <TableCell>{row.grade}</TableCell>
            <TableCell className="text-right font-mono">{row.stock}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total Allocated Stock</TableCell>
          <TableCell className="text-right font-mono font-semibold">9,720 BF</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

export const Striped: Story = {
  args: {
    variant: 'striped',
    bordered: true,
  },
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>Species</TableHead>
          <TableHead>Grade</TableHead>
          <TableHead className="text-right">Stock</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {timberInventory.slice(0, 5).map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.species}</TableCell>
            <TableCell>{row.grade}</TableCell>
            <TableCell className="text-right font-mono">{row.stock}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

export const Paginated: Story = {
  render: () => {
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(4);

    const totalItems = timberInventory.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const startIndex = (page - 1) * pageSize;
    const currentRows = timberInventory.slice(startIndex, startIndex + pageSize);

    return (
      <div className="space-y-0 rounded-lg border border-grey-200 dark:border-grey-800 overflow-hidden">
        <Table bordered={false}>
          <TableHeader>
            <TableRow>
              <TableHead>Lot ID</TableHead>
              <TableHead>Species</TableHead>
              <TableHead>Density</TableHead>
              <TableHead>Grade</TableHead>
              <TableHead className="text-right">Stock</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-mono font-medium text-primary">{row.id}</TableCell>
                <TableCell className="font-medium">{row.species}</TableCell>
                <TableCell>{row.density}</TableCell>
                <TableCell>{row.grade}</TableCell>
                <TableCell className="text-right font-mono">{row.stock}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          page={page}
          totalPages={totalPages}
          totalItems={totalItems}
          pageSize={pageSize}
          pageSizeOptions={[3, 4, 6]}
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
