import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Select } from './Select';

const sampleOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
];

describe('Select Component', () => {
  it('renders select trigger with placeholder', () => {
    render(<Select placeholder="Select item" options={sampleOptions} />);
    expect(screen.getByText('Select item')).toBeInTheDocument();
  });

  it('renders with label and helper text', () => {
    render(
      <Select
        label="Category"
        helperText="Choose category"
        options={sampleOptions}
      />
    );
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Choose category')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    render(
      <Select
        error="Selection required"
        options={sampleOptions}
      />
    );
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Selection required')).toBeInTheDocument();
  });

  it('disables trigger when disabled prop is true', () => {
    render(<Select disabled placeholder="Disabled select" options={sampleOptions} />);
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeDisabled();
  });
});
