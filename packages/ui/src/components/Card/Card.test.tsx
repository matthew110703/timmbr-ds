import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './Card';

describe('Card Component', () => {
  it('renders card with composite subcomponents', () => {
    render(
      <Card data-testid="test-card">
        <CardHeader>
          <CardTitle>Rustic Coffee Table</CardTitle>
          <CardDescription>Handmade with reclaimed oak</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Dimensions: 120cm x 60cm</p>
        </CardContent>
        <CardFooter>
          <span>Footer Actions</span>
        </CardFooter>
      </Card>
    );

    expect(screen.getByTestId('test-card')).toBeInTheDocument();
    expect(screen.getByText('Rustic Coffee Table')).toBeInTheDocument();
    expect(
      screen.getByText('Handmade with reclaimed oak')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Dimensions: 120cm x 60cm')
    ).toBeInTheDocument();
    expect(screen.getByText('Footer Actions')).toBeInTheDocument();
  });

  it('supports asChild composition on Card', () => {
    render(
      <Card asChild>
        <section data-testid="section-card">Section Card</section>
      </Card>
    );
    const elem = screen.getByTestId('section-card');
    expect(elem.tagName).toBe('SECTION');
  });

  it('applies custom className and style', () => {
    render(
      <Card
        className="custom-card-class"
        style={{ padding: '24px' }}
        data-testid="custom-card"
      >
        Custom Content
      </Card>
    );
    const card = screen.getByTestId('custom-card');
    expect(card).toHaveClass('custom-card-class');
    expect(card).toHaveStyle({ padding: '24px' });
  });

  it('sectioned: padding moves to the parts, dividers run edge to edge', () => {
    render(
      <Card sectioned padding="sm" data-testid="card">
        <CardHeader divider data-testid="header" actions={<button type="button">Act</button>}>
          <CardTitle>Order #1</CardTitle>
        </CardHeader>
        <CardContent data-testid="content">Body</CardContent>
        <CardFooter justify="start" data-testid="footer">Footer</CardFooter>
      </Card>
    );
    expect(screen.getByTestId('card').className).toContain('p-0');
    const header = screen.getByTestId('header');
    expect(header.className).toContain('p-4');
    expect(header.className).toContain('border-b');
    expect(header.className).not.toContain('mb-4');
    expect(header.querySelector('[data-slot=card-header-actions]')).toHaveTextContent('Act');
    expect(screen.getByTestId('content').className).toContain('p-4');
    const footer = screen.getByTestId('footer');
    expect(footer.className).toContain('px-4');
    expect(footer.className).toContain('justify-start');
    expect(footer.className).not.toContain('mt-4');
  });

  it('supports selected, inset and a readable description', () => {
    render(
      <>
        <Card selected data-testid="selected" />
        <Card variant="inset" data-testid="inset" />
        <CardDescription>Desc</CardDescription>
      </>
    );
    expect(screen.getByTestId('selected').className).toContain('border-primary/50');
    expect(screen.getByTestId('selected')).toHaveAttribute('data-selected');
    expect(screen.getByTestId('inset').className).toContain('bg-bg-subtle');
    expect(screen.getByText('Desc').className).toContain('text-muted-foreground');
  });
});
