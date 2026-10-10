import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './Card';
import { Button } from '../Button';
import { Badge } from '../Badge';

const meta: Meta<typeof Card> = {
  title: 'Data Display/Card',
  component: Card,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-md">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'elevated', 'subtle', 'interactive'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'default', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Solid Teak Dining Table</CardTitle>
        <CardDescription>
          Artisanal sustainably-sourced teak wood dining piece crafted by master carpenters.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Dimensions</span>
          <span className="font-medium">180cm × 90cm × 76cm</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Weight</span>
          <span className="font-medium">42 kg</span>
        </div>
      </CardContent>
      <CardFooter>
        <span className="text-lg font-bold text-primary">₹45,999</span>
        <Button variant="primary" size="sm">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <Card variant="elevated" className="w-96 overflow-hidden">
      <div className="relative h-48 w-full bg-grey-100 dark:bg-grey-800 flex items-center justify-center">
        <span className="text-muted font-mono text-xs">[Product Wood Asset]</span>
        <Badge
          variant="brand"
          size="sm"
          className="absolute top-3 right-3 shadow"
        >
          New Arrival
        </Badge>
      </div>
      <div className="p-6">
        <CardHeader className="p-0 mb-3">
          <CardTitle>Handcrafted Oak Armchair</CardTitle>
          <CardDescription>
            Curved ergonomics wrapped in breathable textured linen.
          </CardDescription>
        </CardHeader>
        <CardFooter className="p-0 pt-4 mt-4 border-t border-grey-100 dark:border-grey-800">
          <div className="flex flex-col">
            <span className="text-xs text-muted">Price</span>
            <span className="text-lg font-bold text-foreground">₹24,500</span>
          </div>
          <Button variant="primary" size="default">
            Configure Now
          </Button>
        </CardFooter>
      </div>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card variant="outline">
        <CardHeader>
          <CardTitle>Outline</CardTitle>
          <CardDescription>Crisp 1px border with light shadow</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="elevated">
        <CardHeader>
          <CardTitle>Elevated</CardTitle>
          <CardDescription>Deep ambient elevation shadow</CardDescription>
        </CardHeader>
      </Card>
      <Card variant="subtle">
        <CardHeader>
          <CardTitle>Subtle</CardTitle>
          <CardDescription>Soft background tint for cards</CardDescription>
        </CardHeader>
      </Card>
    </div>
  ),
};

/** `sectioned`: the card's padding goes to its parts, so header and footer lines run edge to edge. */
export const Sectioned: Story = {
  render: () => (
    <div className="max-w-md">
      <Card sectioned padding="sm" selected>
        <CardHeader divider actions={<Badge variant="success" size="sm">Delivered</Badge>}>
          <CardTitle>Order #8F2A91C3</CardTitle>
          <CardDescription>Placed 4 Oct 2026 · 2 items</CardDescription>
        </CardHeader>
        <CardContent>Shipped to Chennai.</CardContent>
        <CardFooter justify="start">
          <Button variant="ghost" size="sm">View details</Button>
        </CardFooter>
      </Card>
    </div>
  ),
};

/** `inset`: a flat panel inside forms and dialogs. */
export const Inset: Story = {
  render: () => (
    <Card variant="inset" padding="sm" className="max-w-sm">
      Pin your location so our delivery partner can find you.
    </Card>
  ),
};
