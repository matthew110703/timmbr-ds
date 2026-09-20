import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Center } from './Center';

describe('Center Component', () => {
  it('renders children centered', () => {
    render(
      <Center data-testid="center-root">
        <span>Centered Content</span>
      </Center>
    );
    const el = screen.getByTestId('center-root');
    expect(el).toBeInTheDocument();
    expect(el).toHaveClass('flex', 'items-center', 'justify-center');
    expect(screen.getByText('Centered Content')).toBeInTheDocument();
  });

  it('renders inline-flex when inline is true', () => {
    render(
      <Center inline data-testid="center-root">
        <span>Inline Centered</span>
      </Center>
    );
    expect(screen.getByTestId('center-root')).toHaveClass('inline-flex');
  });

  it('supports custom className and style', () => {
    render(
      <Center className="custom-center" style={{ width: '200px' }} data-testid="center-root">
        <span>Test</span>
      </Center>
    );
    const el = screen.getByTestId('center-root');
    expect(el).toHaveClass('custom-center');
    expect(el).toHaveStyle({ width: '200px' });
  });
});
