import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
} from './Toast';
import { Button } from '../Button';

const meta: Meta<typeof Toast> = {
  title: 'Overlays & Navigation/Toast',
  component: Toast,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const InteractiveDemo: Story = {
  render: () => {
    const [open, setOpen] = React.useState(false);

    return (
      <ToastProvider swipeDirection="right">
        <Button onClick={() => setOpen(true)} variant="primary">
          Trigger Export Toast
        </Button>
        <Toast open={open} onOpenChange={setOpen} variant="success">
          <div className="grid gap-1">
            <ToastTitle>Timber Spec Exported</ToastTitle>
            <ToastDescription>
              Hardwood cut schedule was successfully compiled to PDF.
            </ToastDescription>
          </div>
          <ToastAction altText="View file">View</ToastAction>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );
  },
};

export const Variants: Story = {
  render: () => (
    <ToastProvider>
      <div className="flex flex-col gap-3 w-96">
        <Toast open variant="default">
          <div className="grid gap-1">
            <ToastTitle>Default Notification</ToastTitle>
            <ToastDescription>General system notification event.</ToastDescription>
          </div>
          <ToastClose />
        </Toast>

        <Toast open variant="success">
          <div className="grid gap-1">
            <ToastTitle>Success Notification</ToastTitle>
            <ToastDescription>Timber moisture scan passed verification.</ToastDescription>
          </div>
          <ToastClose />
        </Toast>

        <Toast open variant="destructive">
          <div className="grid gap-1">
            <ToastTitle>Error Notification</ToastTitle>
            <ToastDescription>CNC milling tolerance exceeded 0.05mm limit.</ToastDescription>
          </div>
          <ToastClose />
        </Toast>

        <Toast open variant="warning">
          <div className="grid gap-1">
            <ToastTitle>Warning Notification</ToastTitle>
            <ToastDescription>Kiln humidity low. Inspect drying chambers.</ToastDescription>
          </div>
          <ToastClose />
        </Toast>
      </div>
      <ToastViewport className="static flex flex-col gap-2 p-0 w-full" />
    </ToastProvider>
  ),
};

export const MultiToastStack: Story = {
  render: () => {
    interface ToastItem {
      id: string;
      title: string;
      description: string;
      variant: 'default' | 'success' | 'destructive' | 'warning' | 'info';
    }

    const [toasts, setToasts] = React.useState<ToastItem[]>([
      {
        id: '1',
        title: 'Initial Build Ready',
        description: 'Design tokens compiled successfully.',
        variant: 'info',
      },
    ]);

    const addToast = () => {
      const variants: ToastItem['variant'][] = ['success', 'warning', 'info', 'destructive'];
      const randomVariant = variants[Math.floor(Math.random() * variants.length)];
      const nextId = String(Date.now());
      setToasts((prev) => [
        ...prev,
        {
          id: nextId,
          title: `Task Event #${nextId.slice(-4)}`,
          description: `Telemetry recorded at ${new Date().toLocaleTimeString()}.`,
          variant: randomVariant,
        },
      ]);
    };

    const removeToast = (id: string) => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
      <ToastProvider>
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <Button onClick={addToast} variant="primary">
              Spawn Notification (+1)
            </Button>
            <Button onClick={() => setToasts([])} variant="outline">
              Clear All ({toasts.length})
            </Button>
          </div>
          <p className="text-xs text-grey-500">
            Click multiple times: cards stack neatly behind each other. Hover over the stack to spread them out.
          </p>
        </div>

        {toasts.map((item, i) => {
          const stackIndex = i; // i=0 is the oldest/backmost; newest toast appended last = frontmost
          const totalToasts = toasts.length;
          // Reverse so the last added toast (highest i) is the front (index=0)
          const frontIndex = totalToasts - 1 - i;
          return (
            <Toast
              key={item.id}
              open
              index={frontIndex}
              total={totalToasts}
              onOpenChange={(isOpen) => {
                if (!isOpen) removeToast(item.id);
              }}
              variant={item.variant}
            >
              <div className="grid gap-1">
                <ToastTitle>{item.title}</ToastTitle>
                <ToastDescription>{item.description}</ToastDescription>
              </div>
              <ToastClose />
            </Toast>
          );
        })}

        <ToastViewport stacked className="fixed bottom-6 right-6 z-[100] h-[80px] w-full sm:w-[420px]" />
      </ToastProvider>
    );
  },
};

