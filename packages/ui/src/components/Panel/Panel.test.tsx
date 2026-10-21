import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  Panel,
  PanelHeader,
  PanelTitle,
  PanelDescription,
  PanelBody,
  PanelFooter,
} from '.';

describe('Panel', () => {
  it('renders with all sub-components and correct data-slot attributes', () => {
    render(
      <Panel data-testid="panel">
        <PanelHeader data-testid="header">
          <PanelTitle>Title</PanelTitle>
          <PanelDescription>Description</PanelDescription>
        </PanelHeader>
        <PanelBody data-testid="body">Body content</PanelBody>
        <PanelFooter data-testid="footer">Footer</PanelFooter>
      </Panel>
    );

    const panel = screen.getByTestId('panel');
    expect(panel).toHaveAttribute('data-slot', 'panel');
    expect(screen.getByTestId('header')).toHaveAttribute('data-slot', 'panel-header');
    expect(screen.getByTestId('body')).toHaveAttribute('data-slot', 'panel-body');
    expect(screen.getByTestId('footer')).toHaveAttribute('data-slot', 'panel-footer');
    expect(screen.getByText('Title')).toHaveAttribute('data-slot', 'panel-title');
    expect(screen.getByText('Description')).toHaveAttribute('data-slot', 'panel-description');
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  it('renders with zero configuration (no TimmbrConfigProvider)', () => {
    render(
      <Panel>
        <PanelBody>Content</PanelBody>
      </Panel>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('supports asChild composition on Panel root', () => {
    render(
      <Panel asChild>
        <section data-testid="section-panel">Content</section>
      </Panel>
    );
    expect(screen.getByTestId('section-panel').tagName).toBe('SECTION');
  });

  it('applies variant, padding, and custom className', () => {
    render(
      <Panel
        variant="elevated"
        padding="sm"
        data-testid="panel"
        className="custom-panel"
      >
        Content
      </Panel>
    );
    const panel = screen.getByTestId('panel');
    expect(panel).toHaveClass('custom-panel');
    expect(panel.className).toContain('shadow-md');
    expect(panel.className).toContain('p-4');
  });

  it('sectioned: padding moves to sub-parts and divider runs edge to edge', () => {
    render(
      <Panel sectioned padding="sm" data-testid="panel">
        <PanelHeader divider data-testid="header">
          <PanelTitle>Title</PanelTitle>
        </PanelHeader>
        <PanelBody data-testid="body">Body</PanelBody>
        <PanelFooter justify="start" data-testid="footer">Footer</PanelFooter>
      </Panel>
    );
    expect(screen.getByTestId('panel').className).toContain('p-0');
    expect(screen.getByTestId('header').className).toContain('p-4');
    expect(screen.getByTestId('header').className).toContain('border-b');
    expect(screen.getByTestId('body').className).toContain('p-4');
    expect(screen.getByTestId('footer').className).toContain('justify-start');
  });

  it('renders header actions slot with correct layout', () => {
    render(
      <Panel>
        <PanelHeader actions={<button type="button">Act</button>}>
          <PanelTitle>Title</PanelTitle>
        </PanelHeader>
      </Panel>
    );
    const actionsSlot = document.querySelector('[data-slot="panel-header-actions"]');
    expect(actionsSlot).toBeInTheDocument();
    expect(actionsSlot).toHaveTextContent('Act');
  });

  describe('collapsible', () => {
    it('renders collapse toggle button with correct aria attributes', () => {
      render(
        <Panel collapsible>
          <PanelHeader>
            <PanelTitle>Title</PanelTitle>
          </PanelHeader>
          <PanelBody>Body</PanelBody>
        </Panel>
      );
      const toggle = screen.getByRole('button', { name: /collapse panel/i });
      expect(toggle).toHaveAttribute('aria-expanded', 'true');
      expect(toggle).toHaveAttribute('data-slot', 'panel-collapse-toggle');
    });

    it('hides body content when defaultCollapsed=true', () => {
      render(
        <Panel collapsible defaultCollapsed>
          <PanelHeader>
            <PanelTitle>Title</PanelTitle>
          </PanelHeader>
          <PanelBody>Hidden body</PanelBody>
        </Panel>
      );
      expect(screen.queryByText('Hidden body')).not.toBeInTheDocument();
      const toggle = screen.getByRole('button', { name: /expand panel/i });
      expect(toggle).toHaveAttribute('aria-expanded', 'false');
    });

    it('toggles collapse on button click (uncontrolled)', () => {
      render(
        <Panel collapsible defaultCollapsed={false} motion={false}>
          <PanelHeader>
            <PanelTitle>Title</PanelTitle>
          </PanelHeader>
          <PanelBody>Body content</PanelBody>
        </Panel>
      );
      expect(screen.getByText('Body content')).toBeInTheDocument();
      const toggle = screen.getByRole('button', { name: /collapse panel/i });
      fireEvent.click(toggle);
      expect(screen.queryByText('Body content')).not.toBeInTheDocument();
    });

    it('fires onCollapsedChange with the new state', () => {
      const onChange = vi.fn();
      render(
        <Panel collapsible defaultCollapsed={false} onCollapsedChange={onChange} motion={false}>
          <PanelHeader>
            <PanelTitle>Title</PanelTitle>
          </PanelHeader>
          <PanelBody>Body</PanelBody>
        </Panel>
      );
      fireEvent.click(screen.getByRole('button', { name: /collapse panel/i }));
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('respects controlled collapsed prop', () => {
      const { rerender } = render(
        <Panel collapsible collapsed={false} motion={false}>
          <PanelHeader>
            <PanelTitle>Title</PanelTitle>
          </PanelHeader>
          <PanelBody>Body</PanelBody>
        </Panel>
      );
      expect(screen.getByText('Body')).toBeInTheDocument();
      rerender(
        <Panel collapsible collapsed={true} motion={false}>
          <PanelHeader>
            <PanelTitle>Title</PanelTitle>
          </PanelHeader>
          <PanelBody>Body</PanelBody>
        </Panel>
      );
      expect(screen.queryByText('Body')).not.toBeInTheDocument();
    });

    it('hides footer when collapsed', () => {
      render(
        <Panel collapsible collapsed={true} motion={false}>
          <PanelHeader>
            <PanelTitle>Title</PanelTitle>
          </PanelHeader>
          <PanelBody>Body</PanelBody>
          <PanelFooter>Footer</PanelFooter>
        </Panel>
      );
      expect(screen.queryByText('Footer')).not.toBeInTheDocument();
    });
  });

  describe('resizable', () => {
    it('renders resize handle when resizable is set', () => {
      render(
        <Panel resizable="horizontal">
          <PanelBody>Content</PanelBody>
        </Panel>
      );
      const handle = document.querySelector('[data-slot="panel-resize-handle"]');
      expect(handle).toBeInTheDocument();
      expect(handle).toHaveAttribute('aria-label', 'Resize panel width');
    });

    it('does not render resize handle when resizable is false', () => {
      render(
        <Panel>
          <PanelBody>Content</PanelBody>
        </Panel>
      );
      expect(document.querySelector('[data-slot="panel-resize-handle"]')).not.toBeInTheDocument();
    });

    it('fires onResize after a pointer drag cycle', () => {
      const onResize = vi.fn();
      render(
        <Panel
          resizable="horizontal"
          defaultSize={300}
          minSize={150}
          maxSize={500}
          onResize={onResize}
          motion={false}
        >
          <PanelBody>Content</PanelBody>
        </Panel>
      );
      const handle = document.querySelector('[data-slot="panel-resize-handle"]') as HTMLElement;
      expect(handle).toBeInTheDocument();

      // jsdom doesn't implement setPointerCapture — stub it out.
      handle.setPointerCapture = vi.fn();

      // Simulate drag: pointerdown, pointermove, pointerup.
      fireEvent.pointerDown(handle, { clientX: 300, buttons: 1 });
      fireEvent.pointerMove(handle, { clientX: 350, buttons: 1 });
      fireEvent.pointerUp(handle, { clientX: 350 });

      expect(onResize).toHaveBeenCalledTimes(1);
      // Size should be within bounds.
      const [newSize] = onResize.mock.calls[0] as [number];
      expect(newSize).toBeGreaterThanOrEqual(150);
      expect(newSize).toBeLessThanOrEqual(500);
    });
  });

  describe('motion disabled', () => {
    it('adds transition-none class when motion={false}', () => {
      render(
        <Panel motion={false} data-testid="panel">
          <PanelBody>Content</PanelBody>
        </Panel>
      );
      expect(screen.getByTestId('panel').className).toContain('transition-none');
    });
  });
});
