import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs';

describe('Tabs Component', () => {
  it('renders triggers and active content', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );
    expect(screen.getByRole('tab', { name: 'Tab 1' })).toBeInTheDocument();
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  it('switches content when tab is clicked', async () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    );
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' });
    await userEvent.click(tab2);
    expect(screen.getByText('Content 2')).toBeInTheDocument();
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('shows round scroll buttons only at edges with more to scroll', async () => {
    const { container } = render(
      <Tabs defaultValue="a" variant="underline">
        <TabsList scrollable scrollLabels={{ previous: 'Earlier', next: 'More' }}>
          <TabsTrigger value="a">All</TabsTrigger>
          <TabsTrigger value="b">Awaiting payment</TabsTrigger>
        </TabsList>
      </Tabs>
    );
    const list = container.querySelector('[data-slot=tabs-list]') as HTMLElement;
    expect(list.className).toContain('overflow-x-auto');
    // jsdom has no layout: fake a 300px row in a 120px viewport, scrolled to the start.
    Object.defineProperty(list, 'scrollWidth', { configurable: true, value: 300 });
    Object.defineProperty(list, 'clientWidth', { configurable: true, value: 120 });
    list.dispatchEvent(new Event('scroll'));
    expect(await screen.findByRole('button', { name: 'More' })).toHaveAttribute('data-slot', 'tabs-scroll-next');
    expect(screen.queryByRole('button', { name: 'Earlier' })).toBeNull();

    list.scrollLeft = 180;
    list.dispatchEvent(new Event('scroll'));
    expect(await screen.findByRole('button', { name: 'Earlier' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'More' })).toBeNull();
  });

  it('does not scroll or add buttons unless scrollable', () => {
    const { container } = render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">All</TabsTrigger>
        </TabsList>
      </Tabs>
    );
    expect(container.querySelector('[data-slot=tabs-scroll]')).toBeNull();
    expect((container.querySelector('[data-slot=tabs-list]') as HTMLElement).className).not.toContain('overflow-x-auto');
  });
});
