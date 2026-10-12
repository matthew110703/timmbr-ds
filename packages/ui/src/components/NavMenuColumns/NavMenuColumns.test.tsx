import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { NavMenuColumns, NavMenuPromo, NavMenuTiles, packNavMenuGroups } from './NavMenuColumns';
import { NavHeaderContext, type NavHeaderContextValue } from '../NavHeader/NavHeader.context';
import type { NavMenuGroup } from './NavMenuColumns.types';

const links = (...labels: string[]) =>
  labels.map((label) => ({
    id: label,
    label,
    href: `/c/${label.toLowerCase().replace(/\s+/g, '-')}`,
  }));

const groups: NavMenuGroup[] = [
  { id: 'all', title: 'All Living', href: '/c/living' },
  {
    id: 'sofas',
    title: 'Sofas',
    href: '/c/sofas',
    links: links('3 Seater', '2 Seater'),
    more: { label: 'View all', href: '/c/sofas' },
  },
  { id: 'chairs', title: 'Chairs', links: links('Arm Chairs') },
];

const CustomLink = ({ href, children, ...rest }: { href: string; children: React.ReactNode }) => (
  <a href={href} data-custom="yes" {...rest}>
    {children}
  </a>
);

describe('packNavMenuGroups', () => {
  const group = (id: string, n: number): NavMenuGroup => ({
    id,
    title: id,
    links: links(...Array.from({ length: n }, (_, i) => `${id} ${i}`)),
  });

  it('keeps reading order and never exceeds the column limit', () => {
    const input = ['a', 'b', 'c', 'd', 'e', 'f'].map((id) => group(id, 3));
    const packed = packNavMenuGroups(input, 3);
    expect(packed).toHaveLength(3);
    expect(packed.flat().map((g) => g.id)).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
  });

  it('treats a bad column count (0, negative, NaN) as one column', () => {
    const input = [group('a', 1), group('b', 1)];
    for (const bad of [0, -3, Number.NaN]) expect(packNavMenuGroups(input, bad)).toHaveLength(1);
  });

  it('uses fewer columns when there are fewer groups', () => {
    expect(packNavMenuGroups([group('a', 2)], 6)).toHaveLength(1);
    expect(packNavMenuGroups([], 6)).toEqual([]);
  });

  it('minimises the tallest column (Figma: Sofa | Sofa Cum Bed + Recliners | Seating)', () => {
    const packed = packNavMenuGroups(
      [group('sofa', 11), group('cum-bed', 3), group('recliners', 4), group('seating', 8)],
      3
    );
    expect(packed.map((column) => column.map((g) => g.id))).toEqual([['sofa'], ['cum-bed', 'recliners'], ['seating']]);
  });
});

describe('NavMenuColumns', () => {
  it('renders group headings (linked or plain) and their links', () => {
    render(<NavMenuColumns aria-label="Living room" groups={groups} />);
    expect(screen.getByRole('navigation', { name: 'Living room' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'All Living' })).toHaveAttribute('href', '/c/living');
    expect(screen.getByRole('link', { name: 'Sofas' })).toHaveAttribute('href', '/c/sofas');
    expect(screen.getByRole('link', { name: '3 Seater' })).toHaveAttribute('href', '/c/3-seater');
    expect(screen.getByRole('link', { name: 'View all' })).toBeInTheDocument();
    // A heading without href is plain text
    expect(screen.getByText('Chairs').tagName).toBe('SPAN');
  });

  it('renders through a custom link component', () => {
    render(<NavMenuColumns groups={groups} linkComponent={CustomLink} />);
    expect(screen.getByRole('link', { name: '3 Seater' })).toHaveAttribute('data-custom', 'yes');
  });

  it('uses plain anchors when crossZone is set, even with a link component', () => {
    render(<NavMenuColumns groups={groups} linkComponent={CustomLink} crossZone />);
    expect(screen.getByRole('link', { name: '3 Seater' })).not.toHaveAttribute('data-custom');
  });

  it("uses the header's link component and closes its popover on click", () => {
    const setActiveItemId = vi.fn();
    const ctx = {
      setActiveItemId,
      linkComponent: CustomLink,
    } as unknown as NavHeaderContextValue;
    render(
      <NavHeaderContext.Provider value={ctx}>
        <NavMenuColumns groups={groups} />
      </NavHeaderContext.Provider>
    );
    const link = screen.getByRole('link', { name: '2 Seater' });
    expect(link).toHaveAttribute('data-custom', 'yes');
    // Prevent jsdom's (unimplemented) navigation; the handler still runs.
    const click = createEvent.click(link);
    click.preventDefault();
    fireEvent(link, click);
    expect(setActiveItemId).toHaveBeenCalledWith(null);
  });

  it('renders an aside after the link columns', () => {
    render(<NavMenuColumns groups={groups} aside={<p>Promo here</p>} />);
    const aside = screen.getByText('Promo here').closest('[data-slot="nav-menu-aside"]');
    expect(aside).not.toBeNull();
  });
});

describe('NavMenuPromo', () => {
  it('renders the headline lines, subtitle and badge over the image', () => {
    render(
      <NavMenuPromo
        imageSrc="/promo.png"
        imageAlt="Sofa in a living room"
        title={['Cherish Moments', 'Create Memories']}
        subtitle="with Affordable Sofa Sets"
        badge="UP TO 55% OFF"
      />
    );
    expect(screen.getByAltText('Sofa in a living room')).toHaveAttribute('src', '/promo.png');
    expect(screen.getByText('Create Memories')).toBeInTheDocument();
    expect(screen.getByText('with Affordable Sofa Sets')).toBeInTheDocument();
    expect(screen.getByText('UP TO 55% OFF')).toBeInTheDocument();
  });

  it('becomes a link when href is set, keeping ref and props on the wrapper', () => {
    const ref = React.createRef<HTMLElement>();
    render(<NavMenuPromo ref={ref} data-testid="promo" imageSrc="/p.png" title="Sale" href="/category/sofas" />);
    expect(screen.getByRole('link')).toHaveAttribute('href', '/category/sofas');
    expect(ref.current).toBe(screen.getByTestId('promo'));
    expect(ref.current).toHaveAttribute('data-slot', 'nav-menu-promo');
  });
});

describe('NavMenuTiles', () => {
  const tiles = [
    { id: 'sofas', label: 'Sofas & Seating', href: '/c/sofas', imageSrc: '/sofas.jpg' },
    { id: 'beds', label: 'Beds', href: '/c/beds' },
  ];

  it('renders image tiles as links, with an initial when there is no image', () => {
    render(<NavMenuTiles aria-label="Bedroom" items={tiles} />);
    expect(screen.getByRole('navigation', { name: 'Bedroom' })).toBeInTheDocument();
    const sofas = screen.getByRole('link', { name: /Sofas & Seating/ });
    expect(sofas).toHaveAttribute('href', '/c/sofas');
    expect(sofas.querySelector('img')).toHaveAttribute('src', '/sofas.jpg');
    const beds = screen.getByRole('link', { name: /Beds/ });
    expect(beds.querySelector('img')).toBeNull();
    expect(beds).toHaveTextContent('B');
  });

  it('fills row by row: columns = ceil(items / rows)', () => {
    const many = Array.from({ length: 5 }, (_, i) => ({ id: `t${i}`, label: `T${i}`, href: `/c/${i}` }));
    render(<NavMenuTiles aria-label="Many" items={many} />);
    expect(screen.getByRole('navigation', { name: 'Many' }).style.gridTemplateColumns).toBe('repeat(3, 88px)');
  });

  it('renders nothing without items', () => {
    const { container } = render(<NavMenuTiles items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('closes both header menus when a tile is followed', () => {
    const closeMenus = vi.fn();
    const ctx = { closeMenus, setActiveItemId: vi.fn() } as unknown as NavHeaderContextValue;
    render(
      <NavHeaderContext.Provider value={ctx}>
        <NavMenuTiles items={tiles} />
      </NavHeaderContext.Provider>
    );
    const link = screen.getByRole('link', { name: /Beds/ });
    const click = createEvent.click(link);
    click.preventDefault();
    fireEvent(link, click);
    expect(closeMenus).toHaveBeenCalled();
  });
});
