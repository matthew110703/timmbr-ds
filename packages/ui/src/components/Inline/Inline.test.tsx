import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Inline } from './Inline';

describe('Inline Component', () => {
  it('renders children horizontally', () => {
    render(
      <Inline>
        <span>One</span>
        <span>Two</span>
      </Inline>
    );
    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByTestId('timmbr-inline')).toHaveAttribute('data-slot', 'inline');
    expect(screen.getByTestId('timmbr-inline')).toHaveClass('flex-row');
  });

  it('renders dividers between inline elements', () => {
    render(
      <Inline divider={<span data-testid="inline-dot">•</span>}>
        <span>A</span>
        <span>B</span>
      </Inline>
    );
    expect(screen.getByTestId('inline-dot')).toBeInTheDocument();
  });

  it('accepts custom style and className', () => {
    render(
      <Inline className="custom-inline" style={{ marginTop: '10px' }}>
        <span>Item</span>
      </Inline>
    );
    const inline = screen.getByTestId('timmbr-inline');
    expect(inline).toHaveClass('custom-inline');
    expect(inline).toHaveStyle({ marginTop: '10px' });
  });
});
