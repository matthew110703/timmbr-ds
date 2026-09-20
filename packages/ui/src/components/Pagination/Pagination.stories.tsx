import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from './Pagination';

const meta: Meta<typeof Pagination> = {
  title: 'Data/Pagination',
  component: Pagination,
  subcomponents: {
    PaginationContent: PaginationContent as React.ComponentType<any>,
    PaginationItem: PaginationItem as React.ComponentType<any>,
    PaginationLink: PaginationLink as React.ComponentType<any>,
    PaginationPrevious: PaginationPrevious as React.ComponentType<any>,
    PaginationNext: PaginationNext as React.ComponentType<any>,
    PaginationEllipsis: PaginationEllipsis as React.ComponentType<any>,
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A composable pagination navigation component based on semantic HTML `<nav>`, `<ul>`, and `<li>` elements with accessible ARIA attributes.',
      },
    },
  },
  argTypes: {
    'aria-label': {
      control: 'text',
      description: 'Accessible label for screen readers',
      defaultValue: 'pagination',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class names',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = React.useState(2);

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={() => setPage((p) => Math.max(1, p - 1))} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive={page === 1} onClick={() => setPage(1)}>
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive={page === 2} onClick={() => setPage(2)}>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive={page === 3} onClick={() => setPage(3)}>
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive={page === 10} onClick={() => setPage(10)}>
              10
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={() => setPage((p) => Math.min(10, p + 1))} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    return (
      <div className="flex flex-col gap-6 items-center">
        <div>
          <p className="text-xs text-grey-500 mb-2 text-center">Small (sm)</p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious size="sm" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink size="sm" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink size="sm">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext size="sm" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <div>
          <p className="text-xs text-grey-500 mb-2 text-center">Default</p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious size="default" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink size="default" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink size="default">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext size="default" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <div>
          <p className="text-xs text-grey-500 mb-2 text-center">Large (lg)</p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious size="lg" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink size="lg" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink size="lg">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext size="lg" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    );
  },
};

export const SimplePrevNext: Story = {
  render: () => {
    const [page, setPage] = React.useState(1);
    const totalPages = 5;

    return (
      <div className="flex flex-col items-center gap-2">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              />
            </PaginationItem>
            <PaginationItem>
              <span className="text-xs text-grey-600 dark:text-grey-400 px-3">
                Page {page} of {totalPages}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    );
  },
};
