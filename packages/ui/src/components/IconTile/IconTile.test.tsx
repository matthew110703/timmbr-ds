import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { IconTile } from './IconTile';

describe('IconTile', () => {
  it('is decorative by default and sized / toned by props', () => {
    const { container } = render(
      <IconTile size="lg" tone="destructive">
        <svg />
      </IconTile>
    );
    const tile = container.firstElementChild as HTMLElement;
    expect(tile).toHaveAttribute('aria-hidden', 'true');
    expect(tile.className).toContain('size-12');
    expect(tile.className).toContain('text-destructive');
  });

  it('becomes an image with a label', () => {
    render(
      <IconTile label="Orders">
        <svg />
      </IconTile>
    );
    expect(screen.getByRole('img', { name: 'Orders' })).toBeInTheDocument();
  });
});
