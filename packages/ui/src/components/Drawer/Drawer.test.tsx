import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from './Drawer';

describe('Drawer Component', () => {
  it('renders trigger and opens drawer content', async () => {
    render(
      <Drawer>
        <DrawerTrigger>Open Drawer</DrawerTrigger>
        <DrawerContent side="right">
          <DrawerTitle>Drawer Panel</DrawerTitle>
          <DrawerDescription>Drawer body content</DrawerDescription>
        </DrawerContent>
      </Drawer>
    );
    expect(screen.getByRole('button', { name: 'Open Drawer' })).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Open Drawer' }));
    expect(screen.getByText('Drawer Panel')).toBeInTheDocument();
    expect(screen.getByText('Drawer body content')).toBeInTheDocument();
  });
});
