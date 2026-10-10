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

  it('renders a link row with asChild and combines bordered + divided', () => {
    const { container } = render(
      <List variant="bordered" divided>
        <ListItem asChild>
          <a href="/orders">
            <ListItemText primary="My orders" secondary="No orders yet" />
          </a>
        </ListItem>
      </List>
    );
    const link = screen.getByRole('link', { name: /My orders/ });
    expect(link).toHaveAttribute('href', '/orders');
    expect(link.className).toContain('hover:bg-grey-100/70');
    expect(link).not.toHaveAttribute('role');
    expect(link.parentElement?.tagName).toBe('LI');
    const list = container.querySelector('ul')!;
    expect(list.className).toContain('border');
    expect(list.className).toContain('divide-y');
  });
});
