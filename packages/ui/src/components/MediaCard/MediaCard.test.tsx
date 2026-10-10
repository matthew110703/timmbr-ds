import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MediaCard } from './MediaCard';

describe('MediaCard', () => {
  it('renders media, title, subtitle, meta, aside and footer slots', () => {
    render(
      <MediaCard
        media={<img src="/x.jpg" alt="Sofa photo" />}
        title="Sofa"
        subtitle="Leather"
        meta="Qty 1"
        aside="₹100"
        footer={<button type="button">Remove</button>}
      />
    );
    expect(screen.getByRole('article')).toHaveAttribute('data-orientation', 'vertical');
    expect(screen.getByRole('img', { name: 'Sofa photo' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: 'Sofa' })).toBeInTheDocument();
    expect(screen.getByText('Leather')).toBeInTheDocument();
    expect(screen.getByText('Qty 1')).toBeInTheDocument();
    expect(screen.getByText('₹100')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Remove' })).toBeInTheDocument();
  });

  it('supports horizontal layout and custom root and title elements', () => {
    render(
      <ul>
        <MediaCard as="li" titleAs="p" orientation="horizontal" title="Line item" />
      </ul>
    );
    expect(screen.getByRole('listitem')).toHaveAttribute('data-orientation', 'horizontal');
    expect(screen.queryByRole('heading')).toBeNull();
    expect(screen.getByText('Line item').tagName).toBe('P');
  });

  it('omits the media slot when no media is given', () => {
    const { container } = render(<MediaCard title="No image" />);
    expect(container.querySelector('[data-slot=media-card-media]')).toBeNull();
  });

  it('renders media overlays, an eyebrow and the hover zoom', () => {
    const { container } = render(
      <MediaCard
        media={<img src="/a.jpg" alt="" />}
        mediaTopStart={<span>Badge</span>}
        mediaTopEnd={<button type="button">Save</button>}
        mediaZoom
        eyebrow="1+ Options"
        title="Bed"
        titleClassName="text-body-2"
      />
    );
    const mediaBox = container.querySelector('[data-slot=media-card-media]')!;
    expect(mediaBox.querySelector('[data-slot=media-card-top-start]')).toHaveTextContent('Badge');
    expect(mediaBox.querySelector('[data-slot=media-card-top-end]')).toContainElement(
      screen.getByRole('button', { name: 'Save' })
    );
    expect(mediaBox.className).toContain('group-hover/media-card:[&>img]:scale-105');
    expect(screen.getByText('1+ Options')).toHaveAttribute('data-slot', 'media-card-eyebrow');
    expect(screen.getByRole('heading', { name: 'Bed' }).className).toContain('text-body-2');
  });

  it('puts the full title in the native title attribute (link or title element)', () => {
    render(
      <>
        <MediaCard title="Søren Mid-Century 3-Seater Sofa" href="/products/soren" />
        <MediaCard title="Oak bed" />
        <MediaCard title={<span>Custom</span>} fullTitle="Custom title" />
      </>
    );
    const link = screen.getByRole('link', { name: 'Søren Mid-Century 3-Seater Sofa' });
    expect(link).toHaveAttribute('title', 'Søren Mid-Century 3-Seater Sofa');
    expect(link.closest('[data-slot=media-card-title]')).not.toHaveAttribute('title');
    expect(screen.getByRole('heading', { name: 'Oak bed' })).toHaveAttribute('title', 'Oak bed');
    expect(screen.getByRole('heading', { name: 'Custom' })).toHaveAttribute('title', 'Custom title');
  });
});
