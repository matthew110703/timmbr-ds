import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { FormField } from './FormField';

describe('FormField Component', () => {
  it('renders label and input slot', () => {
    render(
      <FormField label="Full Name" required>
        <input placeholder="Enter name" />
      </FormField>
    );
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('*')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
  });

  it('renders helper text and error message', () => {
    const { rerender } = render(
      <FormField helperText="Helper information">
        <input />
      </FormField>
    );
    expect(screen.getByText('Helper information')).toBeInTheDocument();

    rerender(
      <FormField error="Validation failed">
        <input />
      </FormField>
    );
    expect(screen.getByText('Validation failed')).toBeInTheDocument();
  });
});
