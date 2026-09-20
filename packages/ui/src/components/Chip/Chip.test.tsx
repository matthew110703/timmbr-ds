import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Chip } from './Chip';

describe('Chip Component', () => {
  it('renders children correctly', () => {
    render(<Chip>FSC Certified</Chip>);
    expect(screen.getByText('FSC Certified')).toBeInTheDocument();
  });

  it('triggers onRemove callback when remove button clicked', () => {
    const handleRemove = vi.fn();
    render(<Chip onRemove={handleRemove}>Removable Chip</Chip>);
    const removeBtn = screen.getByLabelText('Remove');
    fireEvent.click(removeBtn);
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });
});
