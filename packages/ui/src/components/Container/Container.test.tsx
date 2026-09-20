import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Container } from './Container';

describe('Container Component', () => {
  it('renders children with responsive container classes', () => {
    render(<Container>Container content</Container>);
    const el = screen.getByText('Container content');
    expect(el).toBeInTheDocument();
    expect(el).toHaveAttribute('data-slot', 'container');
    expect(el).toHaveClass('max-w-screen-lg');
  });

  it('supports asChild composition', () => {
    render(
      <Container asChild>
        <section data-testid="custom-section">Section content</section>
      </Container>
    );
    const section = screen.getByTestId('custom-section');
    expect(section.tagName).toBe('SECTION');
    expect(section).toHaveClass('max-w-screen-lg');
  });

  it('accepts custom style and className', () => {
    render(
      <Container className="custom-container" style={{ marginTop: '20px' }}>
        Content
      </Container>
    );
    const el = screen.getByTestId('timmbr-container');
    expect(el).toHaveClass('custom-container');
    expect(el).toHaveStyle({ marginTop: '20px' });
  });
});
