import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { FilterDrawer } from './FilterDrawer';
import type { FilterGroup } from '../FilterPanel/FilterPanel.types';

const groups: FilterGroup[] = [
  {
    key: 'clearance',
    label: 'Clearance Sale',
    display: 'toggle',
    options: [{ value: 'yes', label: 'Yes', count: 3 }],
  },
  {
    key: 'material',
    label: 'Material',
    display: 'checkbox',
    options: [
      { value: 'teak', label: 'Teak', count: 4, selected: true },
      { value: 'oak', label: 'Oak', count: 2 },
    ],
  },
  { key: 'size', label: 'Size', display: 'checkbox', options: [{ value: 'king', label: 'King', count: 1 }] },
];

const renderDrawer = (props: Partial<React.ComponentProps<typeof FilterDrawer>> = {}) => {
  const handlers = { onToggle: vi.fn(), onApply: vi.fn(), onClearAll: vi.fn(), onOpenChange: vi.fn() };
  render(<FilterDrawer open groups={groups} total={12} {...handlers} {...props} />);
  return handlers;
};

describe('FilterDrawer', () => {
  it('lists groups with their picked counts and shows the active group', () => {
    renderDrawer();
    const tabs = screen.getAllByRole('tab');
    expect(tabs.map((t) => t.textContent)).toEqual(['Quick filters', 'Material1', 'Size']);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('switch')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('tab', { name: /Material/ }));
    expect(screen.getByRole('checkbox', { name: /Teak/ })).toHaveAttribute('data-state', 'checked');
  });

  it('stages changes through onToggle and applies with the live total', () => {
    const { onToggle, onApply } = renderDrawer();
    fireEvent.click(screen.getByRole('tab', { name: /Size/ }));
    fireEvent.click(screen.getByRole('checkbox', { name: /King/ }));
    expect(onToggle).toHaveBeenCalledWith('size', 'king');
    fireEvent.click(screen.getByRole('button', { name: 'Show 12 results' }));
    expect(onApply).toHaveBeenCalled();
  });

  it('disables Apply when nothing would show, and Clear all when nothing is picked', () => {
    renderDrawer({
      total: 0,
      groups: groups.map((g) => ({ ...g, options: g.options.map((o) => ({ ...o, selected: false })) })),
    });
    expect(screen.getByRole('button', { name: 'Show 0 results' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Clear all' })).toBeDisabled();
  });

  it('counts the price only when it narrows the bounds', () => {
    const price = { min: 0, max: 10000, step: 1000 };
    renderDrawer({ groups: [], price: { ...price, value: [0, 10000] } });
    expect(screen.getByRole('tab', { name: 'Price range' }).textContent).toBe('Price range');
  });

  it('shows "Show results" while the count is unknown', () => {
    renderDrawer({ total: null, loading: true });
    expect(screen.getByRole('button', { name: /Show results/ })).toBeEnabled();
  });
});
