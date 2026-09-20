import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Label } from './Label';

describe('Label Component', () => {
  it('renders label text', () => {
    render(<Label htmlFor="input-id">Username</Label>);
    const label = screen.getByText('Username');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'input-id');
  });

  it('renders required asterisk when required is true', () => {
    render(<Label required>Password</Label>);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('applies disabled styling', () => {
    render(<Label disabled data-testid="label">Disabled field</Label>);
    expect(screen.getByTestId('label')).toHaveClass('opacity-50', 'cursor-not-allowed');
  });
});
