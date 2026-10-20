import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import type { JSONContent } from '@tiptap/core';
import { RichTextEditor } from './RichTextEditor';
import { RichTextContent } from './RichTextContent';
import { RichTextJsonContent } from './RichTextJsonContent';

const meta: Meta<typeof RichTextEditor> = {
  title: 'Forms/RichTextEditor',
  component: RichTextEditor,
  tags: ['autodocs'],
  argTypes: {
    disabled: { control: 'boolean' },
    readOnly: { control: 'boolean' },
    toolbar: { control: 'boolean' },
    showCharacterCount: { control: 'boolean' },
    showWordCount: { control: 'boolean' },
    placeholder: { control: 'text' },
    maxCharacters: { control: 'number' },
    motion: { control: 'boolean' },
  },
  args: {
    placeholder: 'Write your product description…',
    toolbar: true,
    disabled: false,
    readOnly: false,
    showCharacterCount: false,
  },
};
export default meta;
type Story = StoryObj<typeof RichTextEditor>;

export const Default: Story = {};

export const WithDefaultContent: Story = {
  args: {
    defaultValue: '<h2>Premium Cotton T-Shirt</h2><p>Crafted from 100% organic cotton, this <strong>ultra-soft tee</strong> is designed for everyday comfort. Available in a range of <em>seasonal colours</em>.</p><ul><li>100% GOTS-certified organic cotton</li><li>Relaxed unisex fit</li><li>Machine washable at 30°C</li></ul><blockquote>Sustainably made, beautifully worn.</blockquote>',
  },
};

export const Controlled: Story = {
  render: () => {
    const [html, setHtml] = React.useState(
      '<p>Start typing to see the controlled value update below.</p>',
    );
    return (
      <div className="flex flex-col gap-4">
        <RichTextEditor value={html} onChange={setHtml} placeholder="Controlled editor…" />
        <div className="rounded border border-border bg-card p-3">
          <p className="text-caption text-muted-foreground mb-1 uppercase tracking-wider">
            Current HTML value
          </p>
          <pre className="text-body-3 text-foreground whitespace-pre-wrap break-all">{html || '(empty)'}</pre>
        </div>
      </div>
    );
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    toolbar: false,
    defaultValue: '<h2>Read-only product description</h2><p>This editor is in <strong>read-only</strong> mode. The toolbar is hidden and no editing is possible.</p>',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: '<p>This editor is <strong>disabled</strong>.</p>',
  },
};

export const NoToolbar: Story = {
  args: {
    toolbar: false,
    placeholder: 'Minimal editor — no toolbar…',
  },
};

export const WithCharacterCount: Story = {
  args: {
    showCharacterCount: true,
    showWordCount: true,
    placeholder: 'Start typing to see the live character and word count…',
  },
};

export const WithCharacterLimit: Story = {
  args: {
    maxCharacters: 300,
    showCharacterCount: true,
    showWordCount: true,
    placeholder: 'Write up to 300 characters…',
  },
};

export const MotionDisabled: Story = {
  args: {
    motion: false,
    defaultValue: '<p>Animations are disabled for this editor instance.</p>',
  },
};

const sampleHtml = `
<h2>From our Artisan Range</h2>
<p>Each piece in the Artisan Range is hand-finished by skilled craftspeople in our Jaipur workshop. The rich <strong>block-print motifs</strong> are inspired by <em>17th-century Mughal textile traditions</em>, brought to life on 100% linen.</p>
<ul>
  <li>Pure linen — breathes well in warm weather</li>
  <li>Hand-applied natural dyes, colourfast for 50+ washes</li>
  <li>Ships within 3–5 business days</li>
</ul>
<blockquote>Every imperfection is intentional — a signature of handmade craft.</blockquote>
`.trim();

export const HtmlViewer: Story = {
  render: () => (
    <div className="max-w-2xl">
      <p className="text-caption text-muted-foreground mb-3 uppercase tracking-wider">
        RichTextContent — HTML viewer (SSR-safe, no TipTap)
      </p>
      <RichTextContent content={sampleHtml} />
    </div>
  ),
};

const sampleJson: JSONContent = {
  type: 'doc',
  content: [
    {
      type: 'heading',
      attrs: { level: 2 },
      content: [{ type: 'text', text: 'TipTap JSON Viewer' }],
    },
    {
      type: 'paragraph',
      content: [
        { type: 'text', text: 'This is rendered from a ' },
        { type: 'text', marks: [{ type: 'bold' }], text: 'TipTap JSONContent' },
        { type: 'text', text: ' object using ' },
        { type: 'text', marks: [{ type: 'code' }], text: 'generateHTML' },
        { type: 'text', text: ' — SSR-safe, no client JS.' },
      ],
    },
    {
      type: 'bulletList',
      content: [
        { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Server-rendered' }] }] },
        { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'No editor overhead' }] }] },
        { type: 'listItem', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'Same DS typography' }] }] },
      ],
    },
  ],
};

export const JsonViewer: Story = {
  render: () => (
    <div className="max-w-2xl">
      <p className="text-caption text-muted-foreground mb-3 uppercase tracking-wider">
        RichTextJsonContent — TipTap JSON viewer (SSR-safe)
      </p>
      <RichTextJsonContent content={sampleJson} />
    </div>
  ),
};
