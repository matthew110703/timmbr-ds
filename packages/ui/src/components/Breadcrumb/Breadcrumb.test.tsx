import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Breadcrumb } from './Breadcrumb';
import type { BreadcrumbLinkProps } from './Breadcrumb.types';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Living', href: '/category/living' },
  { label: 'Sofas', href: '/category/sofas' },
  { label: '3 Seater', href: '/category/3-seater' },
];

describe('Breadcrumb', () => {
  it('links every item but the last, which is the current page', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
    expect(screen.getAllByRole('link').map((a) => a.getAttribute('href'))).toEqual([
      '/',
      '/category/living',
      '/category/sofas',
    ]);
    expect(screen.getByText('3 Seater')).toHaveAttribute('aria-current', 'page');
  });

  it('collapses the middle of long trails on small screens', () => {
    const { container } = render(<Breadcrumb items={items} collapseAfter={3} />);
    // "Living" (between the first and the last two) hides below sm; an ellipsis stands in.
    expect(screen.getByText('Living').closest('li')).toHaveClass('hidden', 'sm:inline-flex');
    expect(screen.getByText('Sofas').closest('li')).not.toHaveClass('hidden');
    expect(container.querySelector('li[aria-hidden="true"]')).toHaveTextContent('…');
  });

  it('uses the given link component', () => {
    const Custom = ({ href, children, className }: BreadcrumbLinkProps) => (
      <a href={href} className={className} data-custom="">
        {children}
      </a>
    );
    render(<Breadcrumb items={items.slice(0, 2)} linkComponent={Custom} />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('data-custom');
  });

  it('renders cross-zone items as plain anchors, not the link component', () => {
    const Custom = ({ href, children, className }: BreadcrumbLinkProps) => (
      <a href={href} className={className} data-custom="">
        {children}
      </a>
    );
    render(
      <Breadcrumb
        items={[
          { label: 'Home', href: '/', crossZone: true },
          { label: 'Beds', href: '/category/beds' },
          { label: 'Now' },
        ]}
        linkComponent={Custom}
      />
    );
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('data-custom');
    expect(screen.getByRole('link', { name: 'Beds' })).toHaveAttribute('data-custom');
  });

  it('renders nothing without items', () => {
    const { container } = render(<Breadcrumb items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
