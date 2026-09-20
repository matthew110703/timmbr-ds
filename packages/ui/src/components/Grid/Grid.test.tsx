import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Grid } from './Grid';

describe('Grid Component', () => {
  it('renders children correctly', () => {
    render(
      <Grid data-testid="grid-root">
        <div>Child 1</div>
        <div>Child 2</div>
      </Grid>
    );
    expect(screen.getByTestId('grid-root')).toBeInTheDocument();
    expect(screen.getByText('Child 1')).toBeInTheDocument();
  });

  it('applies column classes based on cols prop', () => {
    render(
      <Grid cols={3} data-testid="grid-root">
        <div>Item</div>
      </Grid>
    );
    expect(screen.getByTestId('grid-root')).toHaveClass('grid-cols-3');
  });

  it('supports custom className and style', () => {
    render(
      <Grid className="custom-grid" style={{ minHeight: '100px' }} data-testid="grid-root">
        <div>Item</div>
      </Grid>
    );
    const el = screen.getByTestId('grid-root');
    expect(el).toHaveClass('custom-grid');
    expect(el).toHaveStyle({ minHeight: '100px' });
  });
});
