import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { RadioGroup, RadioItem } from './Radio';

const sampleOptions = [
  { value: 'opt1', label: 'Option 1' },
  { value: 'opt2', label: 'Option 2' },
];

describe('Radio Component', () => {
  it('renders radio group with options', () => {
    render(<RadioGroup label="Test Group" options={sampleOptions} />);
    expect(screen.getByText('Test Group')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('selects option on click', async () => {
    const handleValueChange = vi.fn();
    render(
      <RadioGroup
        options={sampleOptions}
        defaultValue="opt1"
        onValueChange={handleValueChange}
      />
    );
    const radio2 = screen.getByRole('radio', { name: /option 2/i });
    await userEvent.click(radio2);
    expect(handleValueChange).toHaveBeenCalledWith('opt2');
  });

  it('renders error state correctly', () => {
    render(<RadioGroup options={sampleOptions} error="Please choose an option" />);
    expect(screen.getByText('Please choose an option')).toBeInTheDocument();
  });
});
