import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ImageUpload } from './ImageUpload';
import type { ImageUploadItem } from './ImageUpload.types';

const SAMPLE_MEDIA: ImageUploadItem[] = [
  {
    url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    name: 'living-room-sofa.jpg',
    type: 'image',
  },
  {
    url: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
    name: 'dining-chair-oak.jpg',
    type: 'image',
  },
  {
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    name: 'product-showcase-video.mp4',
    type: 'video',
  },
  {
    url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
    name: 'work-desk-walnut.jpg',
    type: 'image',
  },
];

const meta: Meta<typeof ImageUpload> = {
  title: 'Forms/ImageUpload',
  component: ImageUpload,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-2xl p-4">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    multiple: { control: 'boolean' },
    mediaType: {
      control: 'select',
      options: ['image', 'video', 'all'],
    },
    minFiles: { control: 'number' },
    maxFiles: { control: 'number' },
    aspectRatio: {
      control: 'select',
      options: ['square', 'video', 'wide', 'auto'],
    },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    loadingText: { control: 'text' },
    label: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'text' },
    enablePreviewModal: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof ImageUpload>;

// ============================================================================
// SINGLE MEDIA STORIES
// ============================================================================

export const SingleImageWithPreview: Story = {
  args: {
    label: 'Category Logo',
    value: SAMPLE_MEDIA[0].url,
    helperText: 'Click the preview icon to inspect full-size in popup.',
    multiple: false,
    mediaType: 'image',
  },
};

export const SingleVideoWithPreview: Story = {
  args: {
    label: 'Product Teaser Video',
    value: SAMPLE_MEDIA[2].url,
    helperText: 'Hover to preview or click preview icon for popup player.',
    multiple: false,
    mediaType: 'video',
  },
};

// ============================================================================
// MULTIPLE MEDIA STORIES
// ============================================================================

export const MultipleWithMixedMedia: Story = {
  args: {
    label: 'Product Gallery (Images & Videos)',
    multiple: true,
    mediaType: 'all',
    minFiles: 2,
    maxFiles: 6,
    value: SAMPLE_MEDIA,
    helperText: 'First item is used as the cover. Click any item to inspect in the popup lightbox.',
  },
};

export const MultipleEmpty: Story = {
  args: {
    label: 'Product Media Collection',
    helperText: 'Supports images and videos. Max 5 files.',
    multiple: true,
    mediaType: 'all',
    minFiles: 1,
    maxFiles: 5,
  },
};

export const MultipleMaxReached: Story = {
  args: {
    label: 'Featured Media (Max 4)',
    multiple: true,
    mediaType: 'all',
    maxFiles: 4,
    value: SAMPLE_MEDIA,
    helperText: 'Maximum limit reached.',
  },
};

export const MultipleMinWarning: Story = {
  args: {
    label: 'Catalog Verification Photos',
    multiple: true,
    minFiles: 3,
    maxFiles: 6,
    value: [SAMPLE_MEDIA[0]],
    helperText: 'Minimum 3 photos required for verification.',
  },
};

export const HorizontalScrollLayout: Story = {
  args: {
    label: 'Compact Media Strip (Horizontal Scroll)',
    multiple: true,
    mediaType: 'all',
    layout: 'scroll',
    maxFiles: 8,
    value: [
      ...SAMPLE_MEDIA,
      {
        url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
        name: 'modern-armchair.jpg',
        type: 'image',
      },
      {
        url: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=800&q=80',
        name: 'conference-room.jpg',
        type: 'image',
      },
    ],
    helperText: 'Scroll horizontally to browse all uploaded thumbnails.',
  },
};

// ============================================================================
// INTERACTIVE SIMULATOR WITH POPUP LIGHTBOX
// ============================================================================

export const InteractiveMediaUpload: Story = {
  render: function MultiMediaStory() {
    const [mediaItems, setMediaItems] = React.useState<ImageUploadItem[]>(SAMPLE_MEDIA.slice(0, 3));

    const handleUpload = async (file: File) => {
      // Simulate async upload
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const objectUrl = URL.createObjectURL(file);
      const isVideo = file.type.startsWith('video/');
      const newItem: ImageUploadItem = {
        url: objectUrl,
        name: file.name,
        key: `media/${Date.now()}-${file.name}`,
        size: file.size,
        type: isVideo ? 'video' : 'image',
      };
      setMediaItems((prev) => [...prev, newItem]);
      return newItem;
    };

    const handleRemove = (index?: number) => {
      if (typeof index === 'number') {
        setMediaItems((prev) => prev.filter((_, i) => i !== index));
      }
    };

    return (
      <div className="flex flex-col gap-4 w-full">
        <ImageUpload
          label="Interactive Media Upload with Lightbox"
          helperText="Select or drop images and videos. Click the Eye icon on any item to open the interactive popup lightbox."
          multiple={true}
          mediaType="all"
          minFiles={1}
          maxFiles={6}
          value={mediaItems}
          onUpload={handleUpload}
          onRemove={handleRemove}
        />
      </div>
    );
  },
};
