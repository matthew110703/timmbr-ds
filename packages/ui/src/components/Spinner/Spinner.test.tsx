import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spinner } from './Spinner';

describe('Spinner Component', () => {
  it('renders status role with accessible label', () => {
    render(<Spinner label="Calculating lumber yield" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText('Calculating lumber yield')).toBeInTheDocument();
  });

  it('renders companion visible text', () => {
    render(<Spinner>Processing order</Spinner>);
    expect(screen.getByText('Processing order')).toBeInTheDocument();
  });
});
