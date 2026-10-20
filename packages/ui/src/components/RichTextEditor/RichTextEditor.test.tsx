import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { RichTextContent } from './RichTextContent';
import { RichTextJsonContent } from './RichTextJsonContent';
import type { JSONContent } from '@tiptap/core';

// TipTap's useEditor requires a DOM environment and ProseMirror internals
// that are difficult to initialise in jsdom. The viewer components are pure
// functions and can be tested without any mocking.
// The interactive RichTextEditor is covered by the Storybook visual suite
// (see RichTextEditor.stories.tsx — Default, Controlled, etc.).

describe('RichTextContent', () => {
  it('renders HTML content into the DOM', () => {
    render(<RichTextContent content="<p>Hello <strong>world</strong></p>" />);
    expect(screen.getByText('world')).toBeInTheDocument();
  });

  it('sets data-slot="rte-content"', () => {
    const { container } = render(<RichTextContent content="<p>test</p>" />);
    expect(container.querySelector('[data-slot="rte-content"]')).toBeTruthy();
  });

  it('renders nothing when content is empty', () => {
    const { container } = render(<RichTextContent content="" />);
    expect(container.firstChild).toBeNull();
  });

  it('applies additional className', () => {
    const { container } = render(
      <RichTextContent content="<p>hi</p>" className="custom-class" />,
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

describe('RichTextJsonContent', () => {
  const validJson: JSONContent = {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [{ type: 'text', text: 'Hello from JSON' }],
      },
    ],
  };

  it('renders JSON content as HTML', () => {
    render(<RichTextJsonContent content={validJson} />);
    expect(screen.getByText('Hello from JSON')).toBeInTheDocument();
  });

  it('sets data-slot="rte-json-content"', () => {
    const { container } = render(<RichTextJsonContent content={validJson} />);
    expect(container.querySelector('[data-slot="rte-json-content"]')).toBeTruthy();
  });

  it('renders nothing when content is falsy', () => {
    // @ts-expect-error — intentional null test
    const { container } = render(<RichTextJsonContent content={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when generateHTML throws on malformed input', () => {
    const malformed = { type: 'unknown_node_xyz' } as unknown as JSONContent;
    const { container } = render(<RichTextJsonContent content={malformed} />);
    expect(container.firstChild).toBeNull();
  });

  it('applies additional className', () => {
    const { container } = render(
      <RichTextJsonContent content={validJson} className="viewer-class" />,
    );
    expect(container.firstChild).toHaveClass('viewer-class');
  });
});
