import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PageHeader } from './PageHeader';

describe('PageHeader', () => {
  it('renders the title as an h1 by default, with description and actions', () => {
    render(
      <PageHeader
        title="Addresses"
        description="Manage addresses"
        actions={<button type="button">Add</button>}
      />
    );
    expect(screen.getByRole('heading', { level: 1, name: 'Addresses' })).toBeInTheDocument();
    expect(screen.getByText('Manage addresses')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument();
  });

  it('supports a section heading level', () => {
    render(<PageHeader as="h2" title="Password" />);
    expect(screen.getByRole('heading', { level: 2, name: 'Password' })).toBeInTheDocument();
  });

  it('renders a back link', () => {
    render(<PageHeader title="Order" back={{ href: '/account/orders', label: 'All orders' }} />);
    expect(screen.getByRole('link', { name: 'All orders' })).toHaveAttribute('href', '/account/orders');
  });
});
