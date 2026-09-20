import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Tooltip } from './Tooltip';

describe('Tooltip Component', () => {
  it('renders trigger element', () => {
    render(
      <Tooltip content="Tooltip message">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
  });

  it('renders tooltip content when open is true', () => {
    render(
      <Tooltip content="Tooltip message" open>
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByText('Tooltip message')).toBeInTheDocument();
  });
});
