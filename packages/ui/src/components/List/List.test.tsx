import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { List, ListItem, ListItemText } from './List';

describe('List Component', () => {
  it('renders list items and responds to clicks', () => {
    const handleClick = vi.fn();
    render(
      <List>
        <ListItem interactive onClick={handleClick}>
          <ListItemText primary="Item One" />
        </ListItem>
      </List>
    );

    const item = screen.getByText('Item One');
    expect(item).toBeInTheDocument();
    fireEvent.click(item);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
