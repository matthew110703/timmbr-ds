import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { RadioGroup } from '../Radio';
import { RadioCard } from './RadioCard';

const renderGroup = (props: React.ComponentProps<typeof RadioGroup> = {}) =>
  render(
    <RadioGroup aria-label="Payment" {...props}>
      <RadioCard value="upi" label="UPI" description="Pay with any UPI app" icon={<i data-testid="icon" />} />
      <RadioCard value="card" label="Credit card" trailing={<i data-testid="chevron" />} />
      <RadioCard value="cod" label="Cash on delivery" disabled />
    </RadioGroup>
  );

describe('RadioCard', () => {
  it('renders each card as a radio named by its label', () => {
    renderGroup();

    expect(screen.getByRole('radio', { name: /UPI/ })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /Credit card/ })).toBeInTheDocument();
    expect(screen.getByText('Pay with any UPI app')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('selects on click and reports the value through the group', async () => {
    const onValueChange = vi.fn();
    renderGroup({ onValueChange });

    await userEvent.click(screen.getByRole('radio', { name: /Credit card/ }));

    expect(onValueChange).toHaveBeenCalledWith('card');
    expect(screen.getByRole('radio', { name: /Credit card/ })).toBeChecked();
  });

  it('reflects the group value', () => {
    renderGroup({ value: 'upi' });

    expect(screen.getByRole('radio', { name: /UPI/ })).toBeChecked();
    expect(screen.getByRole('radio', { name: /Credit card/ })).not.toBeChecked();
  });

  it('cannot select a disabled card', async () => {
    const onValueChange = vi.fn();
    renderGroup({ onValueChange });

    const cod = screen.getByRole('radio', { name: /Cash on delivery/ });
    expect(cod).toBeDisabled();
    await userEvent.click(cod);

    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('shows a custom trailing element instead of the selection marker', () => {
    renderGroup();

    expect(screen.getByTestId('chevron')).toBeInTheDocument();
  });

  it('is reachable by keyboard: arrow keys move focus along the group', async () => {
    renderGroup({ defaultValue: 'upi' });

    screen.getByRole('radio', { name: /UPI/ }).focus();
    await userEvent.keyboard('{ArrowDown}');

    await waitFor(() => expect(screen.getByRole('radio', { name: /Credit card/ })).toHaveFocus());
  });
});
