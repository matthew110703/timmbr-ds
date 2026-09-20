import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { EmptyState } from './EmptyState';

describe('EmptyState Component', () => {
  it('renders title and description properly', () => {
    render(
      <EmptyState
        title="Empty Project"
        description="No timber boards allocated."
        action={<button>Add Timber</button>}
      />
    );

    expect(screen.getByText('Empty Project')).toBeInTheDocument();
    expect(screen.getByText('No timber boards allocated.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Timber' })).toBeInTheDocument();
  });
});
