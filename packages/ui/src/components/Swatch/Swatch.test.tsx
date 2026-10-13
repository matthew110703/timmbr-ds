import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Swatch, swatchLuminance } from './Swatch';

describe('Swatch', () => {
  it('passes the colour as a CSS variable and is decorative by default', () => {
    const { container } = render(<Swatch color="#5C3A21" />);
    const dot = container.querySelector('[data-slot=swatch]')!;
    expect(dot).toHaveStyle({ '--swatch': '#5C3A21' });
    expect(dot).toHaveAttribute('aria-hidden', 'true');
  });

  it('is an image with a name when labelled', () => {
    render(<Swatch color="#5C3A21" label="Walnut" />);
    expect(screen.getByRole('img', { name: 'Walnut' })).toBeInTheDocument();
  });

  it('borders very light colours and rings the selected one', () => {
    const { container, rerender } = render(<Swatch color="#F7F6F2" />);
    expect(container.firstChild).toHaveClass('border');
    rerender(<Swatch color="#5C3A21" selected />);
    expect(container.firstChild).not.toHaveClass('border');
    expect(container.firstChild).toHaveClass('ring-2');
  });

  it('computes luminance for hex colours only', () => {
    expect(swatchLuminance('#FFFFFF')).toBeCloseTo(1);
    expect(swatchLuminance('#000000')).toBe(0);
    expect(swatchLuminance('red')).toBeNull();
  });
});
