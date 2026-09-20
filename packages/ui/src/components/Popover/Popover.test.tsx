import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Popover, PopoverTrigger, PopoverContent } from './Popover';

describe('Popover Component', () => {
  it('renders trigger button', () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover Details</PopoverContent>
      </Popover>
    );
    expect(screen.getByRole('button', { name: 'Open Popover' })).toBeInTheDocument();
  });

  it('renders popover content when open is true', () => {
    render(
      <Popover open>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover Details</PopoverContent>
      </Popover>
    );
    expect(screen.getByText('Popover Details')).toBeInTheDocument();
  });
});
