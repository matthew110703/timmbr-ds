import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Stack } from './Stack';

describe('Stack Component', () => {
  it('renders children inside flex column container', () => {
    render(
      <Stack>
        <div>First</div>
        <div>Second</div>
      </Stack>
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByTestId('timmbr-stack')).toHaveAttribute('data-slot', 'stack');
    expect(screen.getByTestId('timmbr-stack')).toHaveClass('flex-col');
  });

  it('renders divider between items', () => {
    render(
      <Stack divider={<span data-testid="test-sep">---</span>}>
        <div>One</div>
        <div>Two</div>
        <div>Three</div>
      </Stack>
    );
    expect(screen.getAllByTestId('test-sep')).toHaveLength(2);
  });

  it('accepts custom style and className', () => {
    render(
      <Stack className="custom-stack" style={{ padding: '15px' }}>
        <div>Item</div>
      </Stack>
    );
    const stack = screen.getByTestId('timmbr-stack');
    expect(stack).toHaveClass('custom-stack');
    expect(stack).toHaveStyle({ padding: '15px' });
  });
});
