import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Progress } from './Progress';

describe('Progress Component', () => {
  it('renders with correct aria attributes', () => {
    render(<Progress value={40} label="Uploading blueprint" showValue />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).toHaveAttribute('aria-valuenow', '40');
    expect(progressbar).toHaveAttribute('aria-valuemax', '100');
    expect(screen.getByText('Uploading blueprint')).toBeInTheDocument();
    expect(screen.getByText('40%')).toBeInTheDocument();
  });

  it('renders indeterminate state properly', () => {
    render(<Progress indeterminate label="Processing" />);
    const progressbar = screen.getByRole('progressbar');
    expect(progressbar).not.toHaveAttribute('aria-valuenow');
  });
});
