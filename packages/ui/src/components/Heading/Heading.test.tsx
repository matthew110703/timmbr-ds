import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Heading } from './Heading';

describe('Heading Component', () => {
  it('renders h1 by default', () => {
    render(<Heading>Main Heading</Heading>);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H1');
    expect(heading).toHaveAttribute('data-slot', 'heading');
  });

  it('renders correct tag based on level', () => {
    render(<Heading level={3}>Sub Heading</Heading>);
    const heading = screen.getByRole('heading', { level: 3 });
    expect(heading.tagName).toBe('H3');
  });

  it('allows overriding HTML tag via as prop', () => {
    render(<Heading level={1} as="h2">Semantic H2</Heading>);
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading.tagName).toBe('H2');
  });

  it('applies title font family when font="title" is passed', () => {
    render(<Heading font="title">Page Title</Heading>);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('font-title');
  });

  it('accepts custom style and className', () => {
    render(
      <Heading className="custom-heading" style={{ textTransform: 'uppercase' }}>
        Custom Styled
      </Heading>
    );
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('custom-heading');
    expect(heading).toHaveStyle({ textTransform: 'uppercase' });
  });
});
