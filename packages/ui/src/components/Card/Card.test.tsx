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
});
