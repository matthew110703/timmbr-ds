import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FilterOptionList, FilterPanel, isOptionDisabled } from './FilterPanel';
import type { FilterGroup } from './FilterPanel.types';

const material: FilterGroup = {
  key: 'material',
  label: 'Material',
  display: 'checkbox',
  options: [
    { value: 'teak', label: 'Teak', count: 9, selected: true },
    { value: 'oak', label: 'Oak', count: 3 },
    { value: 'ash', label: 'Ash', count: 0 },
    { value: 'mango', label: 'Mango', count: 2 },
    { value: 'sheesham', label: 'Sheesham', count: 4 },
    { value: 'pine', label: 'Pine', count: 1 },
    { value: 'walnut', label: 'Walnut', count: 5, selected: true },
  ],
};

const finish: FilterGroup = {
  key: 'finish',
  label: 'Finish',
  display: 'swatch',
  options: [{ value: 'walnut', label: 'Walnut', count: 4, swatch: '#5C3A21' }],
};

const fastDelivery: FilterGroup = {
  key: 'fast-delivery',
  label: 'Fast Delivery',
  display: 'toggle',
  options: [{ value: 'yes', label: 'Yes', count: 12 }],
};

describe('isOptionDisabled', () => {
  it('disables options that would show nothing unless already picked', () => {
    expect(isOptionDisabled({ value: 'a', label: 'A', count: 0 })).toBe(true);
    expect(isOptionDisabled({ value: 'a', label: 'A', count: 0, selected: true })).toBe(false);
    expect(isOptionDisabled({ value: 'a', label: 'A', count: 3, disabled: true })).toBe(true);
    expect(isOptionDisabled({ value: 'a', label: 'A' })).toBe(false);
  });
});

describe('FilterOptionList', () => {
  it('shows the first options plus every selected one, the rest behind "Show more"', () => {
    render(<FilterOptionList group={material} onToggle={() => undefined} limit={3} />);
    // Teak, Oak, Ash (first three) + Walnut (selected, beyond the limit).
    expect(screen.getAllByRole('checkbox')).toHaveLength(4);
    expect(screen.getByText('Walnut')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Show more (3)' }));
    expect(screen.getAllByRole('checkbox')).toHaveLength(7);
    expect(screen.getByRole('button', { name: 'Show less' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('reports toggles and disables zero-count options', () => {
    const onToggle = vi.fn();
    render(<FilterOptionList group={material} onToggle={onToggle} limit={10} />);
    fireEvent.click(screen.getByRole('checkbox', { name: /Oak/ }));
    expect(onToggle).toHaveBeenCalledWith('material', 'oak');
    expect(screen.getByRole('checkbox', { name: /Ash/ })).toBeDisabled();
    expect(screen.getByRole('checkbox', { name: /Teak/ })).toHaveAttribute('data-state', 'checked');
  });

  it('adds a search box to long groups', () => {
    render(<FilterOptionList group={material} onToggle={() => undefined} searchThreshold={5} />);
    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'shee' },
    });
    expect(screen.getAllByRole('checkbox')).toHaveLength(1);
    expect(screen.getByText('Sheesham')).toBeInTheDocument();
    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'zzz' },
    });
    expect(screen.getByText('No matches')).toBeInTheDocument();
  });

  it('shows a colour dot for swatch groups', () => {
    const { container } = render(<FilterOptionList group={finish} onToggle={() => undefined} />);
    expect(container.querySelector('[data-slot=swatch]')).toHaveStyle({
      '--swatch': '#5C3A21',
    });
  });
});

describe('FilterPanel', () => {
  const price = {
    min: 0,
    max: 50000,
    step: 1000,
    onApply: vi.fn(),
    onReset: vi.fn(),
  };

  it('puts toggles first, then the price and the groups', () => {
    const onToggle = vi.fn();
    render(<FilterPanel groups={[material, fastDelivery, finish]} onToggle={onToggle} price={price} />);
    const toggle = screen.getByRole('switch');
    fireEvent.click(toggle);
    expect(onToggle).toHaveBeenCalledWith('fast-delivery', 'yes');
    const triggers = screen.getAllByRole('button', { expanded: true }).map((b) => b.textContent);
    expect(triggers[0]).toBe('Price range');
    expect(screen.getByRole('button', { name: 'Material (2)' })).toBeInTheDocument(); // 2 picked
  });

  it('offers "Clear" on groups with a selection', () => {
    const onClearGroup = vi.fn();
    render(<FilterPanel groups={[material]} onToggle={() => undefined} onClearGroup={onClearGroup} />);
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(onClearGroup).toHaveBeenCalledWith('material');
  });

  it('hides the price slider when there is no range to pick from', () => {
    render(<FilterPanel groups={[material]} onToggle={() => undefined} price={{ ...price, max: 0 }} />);
    expect(screen.queryByText('Price range')).not.toBeInTheDocument();
  });

  it('applies the price only on Apply', () => {
    const onApply = vi.fn();
    render(<FilterPanel groups={[]} onToggle={() => undefined} price={{ ...price, onApply, value: [5000, 20000] }} />);
    fireEvent.click(within(screen.getByRole('region')).getByRole('button', { name: 'Apply' }));
    expect(onApply).toHaveBeenCalledWith(5000, 20000);
  });
});
