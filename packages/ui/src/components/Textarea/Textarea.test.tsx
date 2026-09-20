import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Textarea } from './Textarea';

describe('Textarea Component', () => {
  it('renders textarea with placeholder', () => {
    render(<Textarea placeholder="Type details..." />);
    expect(screen.getByPlaceholderText('Type details...')).toBeInTheDocument();
  });

  it('renders label, helper text, and character counter', () => {
    render(
      <Textarea
        label="Description"
        helperText="Keep it concise"
        maxLength={100}
        showCount
        defaultValue="Hello world"
      />
    );
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByText('Keep it concise')).toBeInTheDocument();
    expect(screen.getByText('11/100')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    render(<Textarea error="Field is required" placeholder="Feedback" />);
    const textarea = screen.getByPlaceholderText('Feedback');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Field is required')).toBeInTheDocument();
  });

  it('handles user input typing', async () => {
    const handleChange = vi.fn();
    render(<Textarea placeholder="Type notes" onChange={handleChange} />);
    const textarea = screen.getByPlaceholderText('Type notes');
    await userEvent.type(textarea, 'Custom notes');
    expect(handleChange).toHaveBeenCalled();
  });
});
