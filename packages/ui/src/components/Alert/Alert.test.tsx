import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Alert } from './Alert';

describe('Alert Component', () => {
  it('renders title and children properly', () => {
    render(<Alert title="Important Update">Batch dried successfully.</Alert>);
    expect(screen.getByText('Important Update')).toBeInTheDocument();
    expect(screen.getByText('Batch dried successfully.')).toBeInTheDocument();
  });

  it('handles dismiss action', () => {
    const handleClose = vi.fn();
    render(
      <Alert title="Dismissible Alert" dismissible onClose={handleClose}>
        Body content
      </Alert>
    );

    const closeButton = screen.getByLabelText('Dismiss alert');
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByText('Dismissible Alert')).not.toBeInTheDocument();
  });
});
