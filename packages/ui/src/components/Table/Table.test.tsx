import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from './Table';

describe('Table Component', () => {
  it('renders tabular data correctly', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Wood</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Walnut</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByText('Wood')).toBeInTheDocument();
    expect(screen.getByText('Walnut')).toBeInTheDocument();
  });
});
