import '@testing-library/jest-dom/vitest';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { formatAxisGap, formatGap } from './utils/gap';
import { Button } from './components/Button';
import { LinkButton } from './components/LinkButton';
import { Stack } from './components/Stack';
import { Inline } from './components/Inline';
import { Grid, GridItem } from './components/Grid';
import { Text } from './components/Text';
import { Heading } from './components/Heading';
import {
  DataList,
  DataListAction,
  DataListItem,
  DataListLabel,
  DataListValue,
} from './components/DataList';
import { MediaCard } from './components/MediaCard';
import { PageHeader } from './components/PageHeader';
import { EmptyState } from './components/EmptyState';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationSummary,
} from './components/Pagination';

/* Additions made for the storefront DS-compliance pass. */

describe('gap utilities', () => {
  it('maps half steps and responsive objects to literal classes', () => {
    expect(formatGap(0.5)).toBe('gap-0.5');
    expect(formatGap(1.5)).toBe('gap-1.5');
    expect(formatGap({ base: 6, lg: 8 })).toBe('gap-6 lg:gap-8');
    expect(formatAxisGap('x', 3)).toBe('gap-x-3');
    expect(formatAxisGap('y', { base: 1, sm: 2 })).toBe('gap-y-1 sm:gap-y-2');
  });
});

describe('Button / LinkButton', () => {
  it('keeps a link button inline at any size', () => {
    render(
      <Button variant="link" size="sm">
        Resend
      </Button>
    );
    const cls = screen.getByRole('button', { name: 'Resend' }).className;
    expect(cls).toContain('h-auto');
    expect(cls).toContain('px-0');
    expect(cls).not.toContain('h-9');
  });

  it('has a round small icon button and full width', () => {
    render(
      <>
        <Button variant="overlay" size="icon-sm" shape="circle" aria-label="Save" aria-pressed="true">
          <svg />
        </Button>
        <Button fullWidth>Move to cart</Button>
        <LinkButton href="/" variant="back">
          Account
        </LinkButton>
      </>
    );
    const heart = screen.getByRole('button', { name: 'Save' }).className;
    expect(heart).toContain('rounded-full');
    expect(heart).toContain('h-8');
    expect(screen.getByRole('button', { name: 'Move to cart' }).className).toContain('w-full');
    expect(screen.getByRole('link', { name: 'Account' }).className).toContain('min-h-11');
  });
});

describe('Stack / Inline / Grid', () => {
  it('supports responsive direction and gaps, axis gaps, base columns, templates and spans', () => {
    render(
      <>
        <Stack data-testid="stack" direction={{ sm: 'row' }} gap={{ base: 3, lg: 6 }} />
        <Inline data-testid="inline" rowGap={1} colGap={3} />
        <Grid data-testid="grid" cols={{ base: 2, sm: 3 }} template={{ lg: '15rem minmax(0,1fr)' }}>
          <GridItem data-testid="item" span={{ base: 'full', sm: 2 }} />
        </Grid>
      </>
    );
    const stack = screen.getByTestId('stack').className;
    expect(stack).toContain('sm:flex-row');
    expect(stack).toContain('lg:gap-6');
    const inline = screen.getByTestId('inline').className;
    expect(inline).toContain('gap-y-1');
    expect(inline).toContain('gap-x-3');
    const grid = screen.getByTestId('grid');
    expect(grid.className).toContain('grid-cols-2');
    expect(grid.className).toContain('sm:grid-cols-3');
    expect(grid.className).toContain('lg:grid-cols-[var(--grid-template-lg)]');
    expect(grid.style.getPropertyValue('--grid-template-lg')).toBe('15rem minmax(0,1fr)');
    expect(screen.getByTestId('item').className).toContain('col-span-full');
    expect(screen.getByTestId('item').className).toContain('sm:col-span-2');
  });
});

describe('Text / Heading', () => {
  it('has overline, tabular, truncate and success / warning colours', () => {
    render(
      <>
        <Text variant="overline">Home</Text>
        <Text tabular truncate foreground="success">
          12.97160
        </Text>
        <Heading level={6} foreground="warning">
          Heads up
        </Heading>
      </>
    );
    expect(screen.getByText('Home').className).toContain('uppercase');
    const coords = screen.getByText('12.97160').className;
    expect(coords).toContain('tabular-nums');
    expect(coords).toContain('truncate');
    expect(coords).toContain('text-success');
    expect(screen.getByRole('heading', { name: 'Heads up' }).className).toContain('text-warning');
  });
});

describe('DataList', () => {
  it('renders settings rows: inset, strong label with description, value and action', () => {
    render(
      <DataList divided inset="sm">
        <DataListItem align="center">
          <DataListLabel tone="strong" icon={<svg />} description="Sign in with your password">
            Password
          </DataListLabel>
          <DataListValue>Set</DataListValue>
          <DataListAction>
            <button type="button">Change</button>
          </DataListAction>
        </DataListItem>
      </DataList>
    );
    const label = screen.getByText('Password').closest('dt')!;
    expect(label.className).toContain('text-foreground');
    expect(label).toHaveTextContent('Sign in with your password');
    expect(label.closest('[data-slot=data-list-item]')!.className).toContain('px-4');
    expect(screen.getByRole('button', { name: 'Change' }).closest('dd')).toHaveAttribute(
      'data-slot',
      'data-list-action'
    );
  });

  it('places an action next to or below the label on small screens', () => {
    render(
      <DataList>
        <DataListItem>
          <DataListLabel>Name</DataListLabel>
          <DataListAction>
            <button type="button">Edit</button>
          </DataListAction>
        </DataListItem>
        <DataListItem>
          <DataListLabel>All devices</DataListLabel>
          <DataListAction placement="below">
            <button type="button">Log out of all devices</button>
          </DataListAction>
        </DataListItem>
      </DataList>
    );
    expect(screen.getByRole('button', { name: 'Edit' }).closest('dd')!.className).toContain('col-start-2');
    const below = screen.getByRole('button', { name: 'Log out of all devices' }).closest('dd')!.className;
    expect(below).toContain('col-span-2');
    expect(below).toContain('sm:ms-auto');
  });

  it('justifies summary rows and emphasises the total', () => {
    render(
      <DataList orientation="justified">
        <DataListItem emphasis="total" data-testid="total">
          <DataListLabel>Total</DataListLabel>
          <DataListValue>₹1,000</DataListValue>
        </DataListItem>
      </DataList>
    );
    const total = screen.getByTestId('total').className;
    expect(total).toContain('justify-between');
    expect(total).toContain('font-semibold');
  });
});

describe('MediaCard', () => {
  it('links the whole card, shows a media fallback and a custom ratio', () => {
    const { container } = render(
      <MediaCard
        title="Sofa"
        href="/products/sofa"
        ratio="171/147"
        mediaFallback={<svg data-testid="fallback" />}
        spacing="relaxed"
        meta="4.5 ★"
      />
    );
    const link = screen.getByRole('link', { name: 'Sofa' });
    expect(link).toHaveAttribute('href', '/products/sofa');
    expect(link.className).toContain('after:inset-0');
    const media = container.querySelector('[data-slot=media-card-media]') as HTMLElement;
    expect(media.style.aspectRatio.replace(/\s/g, '')).toBe('171/147');
    expect(screen.getByTestId('fallback')).toBeInTheDocument();
    expect(container.querySelector('[data-slot=media-card-meta]')!.className).toContain('mt-4');
  });
});

describe('PageHeader / EmptyState', () => {
  it('forwards a title id, renders the back link and fills the width', () => {
    render(
      <>
        <PageHeader title="Addresses" titleId="addr" back={{ href: '/', label: 'Account' }} />
        <EmptyState data-testid="empty" title="Nothing here" fullWidth />
      </>
    );
    expect(screen.getByRole('heading', { name: 'Addresses' })).toHaveAttribute('id', 'addr');
    expect(screen.getByRole('link', { name: 'Account' }).className).toContain('min-h-11');
    expect(screen.getByTestId('empty').className).toContain('max-w-none');
  });
});

describe('Pagination', () => {
  it('pages through links with localised labels and a summary', () => {
    render(
      <Pagination aria-label="Order pages">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="/orders?page=1" label="Zurück" ariaLabel="Vorherige Seite" />
          </PaginationItem>
          <PaginationItem>
            <PaginationSummary>Page 2 of 3</PaginationSummary>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext disabled label="Weiter" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
    const previous = screen.getByRole('link', { name: 'Vorherige Seite' });
    expect(previous).toHaveAttribute('href', '/orders?page=1');
    expect(previous).toHaveTextContent('Zurück');
    expect(screen.getByRole('button', { name: /Weiter|next page/i })).toBeDisabled();
    expect(screen.getByText('Page 2 of 3')).toHaveAttribute('aria-live', 'polite');
  });
});
