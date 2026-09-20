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

    const dt = screen.getByText('Fixed Label');
    expect(dt).toHaveStyle({ minWidth: '150px' });
  });
});
