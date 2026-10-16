import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ScrollRail } from './ScrollRail';

const makeItems = (n = 6) =>
  Array.from({ length: n }, (_, i) => (
    <div key={i} className="w-[240px] shrink-0 snap-start">
      Item {i + 1}
    </div>
  ));

const stubGeometry = (
  track: Element,
  {
    scrollLeft = 0,
    clientWidth = 400,
    scrollWidth = 1600,
  }: { scrollLeft?: number; clientWidth?: number; scrollWidth?: number } = {},
) => {
  Object.defineProperty(track, 'scrollLeft', {
    value: scrollLeft,
    configurable: true,
    writable: true,
  });
  Object.defineProperty(track, 'clientWidth', { value: clientWidth, configurable: true });
  Object.defineProperty(track, 'scrollWidth', { value: scrollWidth, configurable: true });
};

describe('ScrollRail', () => {
  it('renders children inside the track slot', () => {
    render(<ScrollRail>{makeItems(3)}</ScrollRail>);
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 3')).toBeInTheDocument();
  });

  it('sets data-slot="scroll-rail" on the outer wrapper', () => {
    const { container } = render(<ScrollRail>{makeItems()}</ScrollRail>);
    expect(container.querySelector('[data-slot="scroll-rail"]')).toBeInTheDocument();
  });

  it('sets data-slot="scroll-rail-track" on the scrollable div', () => {
    const { container } = render(<ScrollRail>{makeItems()}</ScrollRail>);
    expect(container.querySelector('[data-slot="scroll-rail-track"]')).toBeInTheDocument();
  });

  it('merges className onto the outer wrapper', () => {
    const { container } = render(<ScrollRail className="extra">{makeItems()}</ScrollRail>);
    expect(container.querySelector('[data-slot="scroll-rail"]')).toHaveClass('extra');
  });

  it('applies gap-3 for gap="sm"', () => {
    const { container } = render(<ScrollRail gap="sm">{makeItems()}</ScrollRail>);
    expect(container.querySelector('[data-slot="scroll-rail-track"]')!.className).toContain(
      'gap-3',
    );
  });

  it('applies gap-5 by default (md)', () => {
    const { container } = render(<ScrollRail>{makeItems()}</ScrollRail>);
    expect(container.querySelector('[data-slot="scroll-rail-track"]')!.className).toContain(
      'gap-5',
    );
  });

  it('applies gap-6 for gap="lg"', () => {
    const { container } = render(<ScrollRail gap="lg">{makeItems()}</ScrollRail>);
    expect(container.querySelector('[data-slot="scroll-rail-track"]')!.className).toContain(
      'gap-6',
    );
  });

  it('renders no chevrons when hideChevrons is true', () => {
    render(<ScrollRail hideChevrons>{makeItems()}</ScrollRail>);
    expect(screen.queryByLabelText('Scroll left')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Scroll right')).not.toBeInTheDocument();
  });

  it('shows right chevron when track overflows to the right', () => {
    render(<ScrollRail>{makeItems()}</ScrollRail>);
    const track = document.querySelector('[data-slot="scroll-rail-track"]')!;
    stubGeometry(track, { scrollLeft: 0, clientWidth: 400, scrollWidth: 1600 });
    fireEvent.scroll(track);
    expect(screen.getByLabelText('Scroll right')).toBeInTheDocument();
    expect(screen.queryByLabelText('Scroll left')).not.toBeInTheDocument();
  });

  it('shows both chevrons when scrolled into the middle', () => {
    render(<ScrollRail>{makeItems()}</ScrollRail>);
    const track = document.querySelector('[data-slot="scroll-rail-track"]')!;
    stubGeometry(track, { scrollLeft: 600, clientWidth: 400, scrollWidth: 1600 });
    fireEvent.scroll(track);
    expect(screen.getByLabelText('Scroll left')).toBeInTheDocument();
    expect(screen.getByLabelText('Scroll right')).toBeInTheDocument();
  });

  it('hides right chevron when scrolled to the end', () => {
    render(<ScrollRail>{makeItems()}</ScrollRail>);
    const track = document.querySelector('[data-slot="scroll-rail-track"]')!;
    stubGeometry(track, { scrollLeft: 1200, clientWidth: 400, scrollWidth: 1600 });
    fireEvent.scroll(track);
    expect(screen.queryByLabelText('Scroll right')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Scroll left')).toBeInTheDocument();
  });

  it('calls scrollBy with a negative left value on left chevron click', () => {
    render(<ScrollRail>{makeItems()}</ScrollRail>);
    const track = document.querySelector('[data-slot="scroll-rail-track"]')!;
    stubGeometry(track, { scrollLeft: 600, clientWidth: 400, scrollWidth: 1600 });
    const scrollBy = vi.fn();
    (track as HTMLElement).scrollBy = scrollBy;
    fireEvent.scroll(track);
    fireEvent.click(screen.getByLabelText('Scroll left'));
    expect(scrollBy.mock.calls[0][0].left).toBeLessThan(0);
  });

  it('calls scrollBy with a positive left value on right chevron click', () => {
    render(<ScrollRail>{makeItems()}</ScrollRail>);
    const track = document.querySelector('[data-slot="scroll-rail-track"]')!;
    stubGeometry(track, { scrollLeft: 0, clientWidth: 400, scrollWidth: 1600 });
    const scrollBy = vi.fn();
    (track as HTMLElement).scrollBy = scrollBy;
    fireEvent.scroll(track);
    fireEvent.click(screen.getByLabelText('Scroll right'));
    expect(scrollBy.mock.calls[0][0].left).toBeGreaterThan(0);
  });

  it('uses scrollAmount prop exactly', () => {
    render(<ScrollRail scrollAmount={200}>{makeItems()}</ScrollRail>);
    const track = document.querySelector('[data-slot="scroll-rail-track"]')!;
    stubGeometry(track, { scrollLeft: 0, clientWidth: 400, scrollWidth: 1600 });
    const scrollBy = vi.fn();
    (track as HTMLElement).scrollBy = scrollBy;
    fireEvent.scroll(track);
    fireEvent.click(screen.getByLabelText('Scroll right'));
    expect(scrollBy).toHaveBeenCalledWith({ left: 200, behavior: 'smooth' });
  });

  it('accepts custom aria-labels for both chevrons', () => {
    render(
      <ScrollRail labelPrev="Zurück" labelNext="Weiter">
        {makeItems()}
      </ScrollRail>,
    );
    const track = document.querySelector('[data-slot="scroll-rail-track"]')!;
    stubGeometry(track, { scrollLeft: 600, clientWidth: 400, scrollWidth: 1600 });
    fireEvent.scroll(track);
    expect(screen.getByLabelText('Zurück')).toBeInTheDocument();
    expect(screen.getByLabelText('Weiter')).toBeInTheDocument();
  });
});
