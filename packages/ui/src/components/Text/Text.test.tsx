import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Text } from './Text';

describe('Text Component', () => {
  it('renders paragraph by default', () => {
    render(<Text>Paragraph content</Text>);
    const el = screen.getByText(/paragraph content/i);
    expect(el.tagName).toBe('P');
    expect(el).toHaveAttribute('data-slot', 'text');
  });

  it('renders span element when as="span" is passed', () => {
    render(<Text as="span">Inline span</Text>);
    const el = screen.getByText(/inline span/i);
    expect(el.tagName).toBe('SPAN');
  });

  it('applies weight and italic styles', () => {
    render(
      <Text weight="bold" italic>
        Bold Italic
      </Text>
    );
    const el = screen.getByText(/bold italic/i);
    expect(el).toHaveClass('font-bold');
    expect(el).toHaveClass('italic');
  });

  it('applies foreground color classes', () => {
    render(<Text foreground="primary">Primary colored</Text>);
    const el = screen.getByText(/primary colored/i);
    expect(el).toHaveClass('text-primary');
  });

  it('accepts custom style and className', () => {
    render(
      <Text className="my-text-class" style={{ letterSpacing: '1px' }}>
        Custom styling
      </Text>
    );
    const el = screen.getByText(/custom styling/i);
    expect(el).toHaveClass('my-text-class');
    expect(el).toHaveStyle({ letterSpacing: '1px' });
  });
});
