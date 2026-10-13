import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { OptionPicker } from './OptionPicker';
import type { OptionPickerOption } from './OptionPicker.types';

const finishes: OptionPickerOption[] = [
  { value: 'walnut', label: 'Walnut', swatchHex: '#5C3A21' },
  { value: 'honey', label: 'Honey', swatchHex: '#B5753A', state: 'out-of-stock' },
  { value: 'white', label: 'White', swatchHex: '#F7F6F2', state: 'unavailable' },
  { value: 'teak', label: 'Teak', swatchHex: '#8B5A2B' },
];

describe('OptionPicker', () => {
  it('is a radio group named by its label, showing the selected option', () => {
    render(<OptionPicker label="Finish" display="swatch" options={finishes} value="walnut" onChange={() => {}} />);
    expect(screen.getByRole('radiogroup', { name: 'Finish: Walnut' })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: 'Walnut' })).toHaveAttribute('aria-checked', 'true');
  });

  it('keeps sold-out options selectable and disables combinations that do not exist', () => {
    const onChange = vi.fn();
    render(<OptionPicker label="Finish" display="swatch" options={finishes} value="walnut" onChange={onChange} />);

    fireEvent.click(screen.getByRole('radio', { name: 'Honey, Out of stock' }));
    expect(onChange).toHaveBeenCalledWith('honey');
    expect(screen.getByRole('radio', { name: 'White, Unavailable' })).toBeDisabled();
  });

  it('says when the selected option is sold out', () => {
    render(<OptionPicker label="Finish" options={finishes} value="honey" onChange={() => {}} />);
    expect(screen.getByText('· Out of stock', { exact: false })).toBeInTheDocument();
  });

  it('moves with the arrow keys, skipping disabled options, with one tab stop', () => {
    const onChange = vi.fn();
    render(<OptionPicker label="Finish" options={finishes} value="honey" onChange={onChange} />);
    const radios = screen.getAllByRole('radio');
    expect(radios.map((r) => r.tabIndex)).toEqual([-1, 0, -1, -1]);

    fireEvent.keyDown(radios[1], { key: 'ArrowRight' });
    expect(onChange).toHaveBeenLastCalledWith('teak');
    fireEvent.keyDown(radios[0], { key: 'ArrowLeft' });
    expect(onChange).toHaveBeenLastCalledWith('teak');
  });

  it('renders pills for options without a swatch colour', () => {
    render(
      <OptionPicker
        label="Size"
        display="swatch"
        options={[{ value: 'king', label: 'King' }]}
        value="king"
        onChange={() => {}}
      />
    );
    expect(screen.getByRole('radio', { name: 'King' })).toHaveTextContent('King');
  });

  it('becomes a dropdown past maxVisible', () => {
    render(<OptionPicker label="Finish" options={finishes} value="walnut" maxVisible={3} onChange={() => {}} />);
    expect(screen.queryByRole('radiogroup')).not.toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Finish' })).toBeInTheDocument();
  });
});
