import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  DataList,
  DataListItem,
  DataListLabel,
  DataListValue,
} from './DataList';

describe('DataList Component', () => {
  it('renders dl, dt, and dd semantic elements', () => {
    render(
      <DataList>
        <DataListItem>
          <DataListLabel>Species</DataListLabel>
          <DataListValue>Black Walnut</DataListValue>
        </DataListItem>
      </DataList>
    );

    expect(screen.getByRole('term')).toHaveTextContent('Species');
    expect(screen.getByRole('definition')).toHaveTextContent('Black Walnut');
  });

  it('renders with divided prop', () => {
    const { container } = render(
      <DataList divided>
        <DataListItem>
          <DataListLabel>Key</DataListLabel>
          <DataListValue>Value</DataListValue>
        </DataListItem>
      </DataList>
    );

    expect(container.querySelector('dl')).toHaveClass('divide-y');
  });

  it('supports minWidth on DataListLabel', () => {
    render(
      <DataList>
        <DataListItem>
          <DataListLabel minWidth={150}>Fixed Label</DataListLabel>
          <DataListValue>Value</DataListValue>
        </DataListItem>
      </DataList>
    );

    // Horizontal rows stack on small screens: the width applies from `sm` up.
    const dt = screen.getByText('Fixed Label');
    expect(dt.style.getPropertyValue('--data-list-label-min')).toBe('150px');
    expect(dt.className).toContain('sm:min-w-[var(--data-list-label-min)]');
  });

  it('keeps minWidth at every size in vertical lists', () => {
    render(
      <DataList orientation="vertical">
        <DataListItem>
          <DataListLabel minWidth="10rem">Vertical Label</DataListLabel>
          <DataListValue>Value</DataListValue>
        </DataListItem>
      </DataList>
    );
    expect(screen.getByText('Vertical Label')).toHaveStyle({ minWidth: '10rem' });
  });
});
