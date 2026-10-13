import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NavHeader } from './NavHeader';
import type { NavSearchConfig } from './NavHeader.types';

const results: NavSearchConfig['results'] = {
  items: [
    {
      id: 'p1',
      href: '/products/teak-bed',
      title: 'Teak Bed',
      subtitle: 'Oakline',
      price: '₹24,999',
      imageUrl: 'https://cdn.example/bed.jpg',
    },
    { id: 'p2', href: '/products/teak-chair', title: 'Teak Chair', crossZone: true },
  ],
};

function renderSearch(search: NavSearchConfig, linkComponent?: React.ComponentType<any>) {
  return render(
    <NavHeader
      branding={{ logo: <span>LOGO</span> }}
      search={{ defaultOpen: true, ...search }}
      linkComponent={linkComponent}
      motion={false}
    />
  );
}

const input = () => screen.getByRole('combobox', { name: 'Search store products' });

describe('NavSearch', () => {
  it('shows no popover and no mock suggestions when nothing is configured', () => {
    renderSearch({});
    expect(input()).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    expect(screen.queryByText(/popular searches/i)).not.toBeInTheDocument();
  });

  it('lists recent searches while empty; picking one fills the input and submits it', () => {
    const onSubmit = vi.fn();
    const onChange = vi.fn();
    renderSearch({ recentSearches: ['teak bed', 'sofa'], onSubmit, onChange });

    const listbox = screen.getByRole('listbox', { name: 'Recent searches' });
    // Only options inside the listbox; the remove buttons are hidden from assistive tech.
    expect(within(listbox).getAllByRole('option')).toHaveLength(2);
    expect(within(listbox).queryAllByRole('button')).toHaveLength(0);
    fireEvent.click(within(listbox).getByRole('option', { name: 'sofa' }));

    expect(onChange).toHaveBeenCalledWith('sofa');
    expect(onSubmit).toHaveBeenCalledWith('sofa');
  });

  it('removes one recent search, or clears them all', () => {
    const onRecentSearchRemove = vi.fn();
    const onClearRecentSearches = vi.fn();
    renderSearch({ recentSearches: ['teak bed'], onRecentSearchRemove, onClearRecentSearches });

    fireEvent.click(screen.getByTitle('Remove "teak bed" from recent searches'));
    expect(onRecentSearchRemove).toHaveBeenCalledWith('teak bed');
    fireEvent.click(screen.getByRole('button', { name: 'Clear' }));
    expect(onClearRecentSearches).toHaveBeenCalled();
  });

  it('moves through rows with the arrow keys; Enter picks, Delete removes', () => {
    const onSubmit = vi.fn();
    const onRecentSearchRemove = vi.fn();
    renderSearch({ recentSearches: ['teak bed', 'sofa'], onSubmit, onRecentSearchRemove });

    fireEvent.keyDown(input(), { key: 'ArrowDown' });
    const first = screen.getByRole('option', { name: 'teak bed' });
    expect(input()).toHaveAttribute('aria-activedescendant', first.id);
    expect(first).toHaveAttribute('aria-selected', 'true');

    fireEvent.keyDown(input(), { key: 'ArrowUp' }); // wraps to the last row
    expect(input()).toHaveAttribute('aria-activedescendant', screen.getByRole('option', { name: 'sofa' }).id);

    fireEvent.keyDown(input(), { key: 'Delete' });
    expect(onRecentSearchRemove).toHaveBeenCalledWith('sofa');

    fireEvent.keyDown(input(), { key: 'Enter' });
    expect(onSubmit).toHaveBeenCalledWith('sofa');
  });

  it('submits the typed text with Enter, and ignores an empty submit', () => {
    const onSubmit = vi.fn();
    const { rerender } = renderSearch({ value: '   ', onSubmit });
    fireEvent.keyDown(input(), { key: 'Enter' });
    expect(onSubmit).not.toHaveBeenCalled();

    rerender(
      <NavHeader
        branding={{ logo: <span>LOGO</span> }}
        search={{ defaultOpen: true, value: ' teak ', onSubmit }}
        motion={false}
      />
    );
    fireEvent.keyDown(input(), { key: 'Enter' });
    expect(onSubmit).toHaveBeenCalledWith('teak');
  });

  it('shows suggestions once the query is long enough, with a "see all" row that submits', () => {
    const onSubmit = vi.fn();
    const Link = React.forwardRef<HTMLAnchorElement, any>(({ href, ...props }, ref) => (
      <a ref={ref} href={href} data-router-link="true" {...props} />
    ));
    renderSearch({ value: 'teak', results, recentSearches: ['sofa'], onSubmit }, Link);

    expect(screen.queryByText('Recent searches')).not.toBeInTheDocument();
    const bed = screen.getByRole('option', { name: /Teak Bed/ });
    expect(bed).toHaveAttribute('href', '/products/teak-bed');
    expect(bed).toHaveAttribute('data-router-link', 'true');
    expect(within(bed).getByText('₹24,999')).toBeInTheDocument();
    // Cross-zone results are plain links (full page load).
    const chair = screen.getByRole('option', { name: /Teak Chair/ });
    expect(chair).toHaveAttribute('data-cross-zone', 'true');
    expect(chair).not.toHaveAttribute('data-router-link');

    fireEvent.click(screen.getByRole('option', { name: 'See all results for "teak"' }));
    expect(onSubmit).toHaveBeenCalledWith('teak');
  });

  it('opens the active suggestion with Enter', () => {
    const onResultSelect = vi.fn();
    renderSearch({ value: 'teak', results, onResultSelect });
    const bed = screen.getByRole('option', { name: /Teak Bed/ });
    const click = vi.fn((event: Event) => event.preventDefault());
    bed.addEventListener('click', click);

    fireEvent.keyDown(input(), { key: 'ArrowDown' });
    fireEvent.keyDown(input(), { key: 'Enter' });

    expect(click).toHaveBeenCalled();
    expect(onResultSelect).toHaveBeenCalledWith(results!.items[0]);
  });

  it('shows placeholders while the first answer loads, then an empty message', () => {
    const { rerender } = renderSearch({ value: 'zz', results: { items: [], loading: true } });
    expect(document.querySelector('[data-slot="nav-search-results-loading"]')).toBeInTheDocument();
    expect(screen.queryByText('No products match')).not.toBeInTheDocument();

    rerender(
      <NavHeader
        branding={{ logo: <span>LOGO</span> }}
        search={{ defaultOpen: true, value: 'zz', results: { items: [], emptyLabel: 'Nothing found' } }}
        motion={false}
      />
    );
    expect(screen.getByText('Nothing found')).toBeInTheDocument();
  });

  it('keeps showing recent searches below the minimum query length', () => {
    renderSearch({ value: 't', results, recentSearches: ['sofa'] });
    expect(screen.getByText('Recent searches')).toBeInTheDocument();
    expect(screen.queryByText('Teak Bed')).not.toBeInTheDocument();
  });
});
