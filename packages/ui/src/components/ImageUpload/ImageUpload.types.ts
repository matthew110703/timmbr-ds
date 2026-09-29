import type * as React from 'react';
import type { MotionProps } from '../../types/motion';

export type ImageUploadAspectRatio = 'square' | 'video' | 'wide' | 'auto';

export type ImageUploadMediaType = 'image' | 'video' | 'all';

export interface ImageUploadItem {
  url: string;
  key?: string;
  id?: string;
  name?: string;
  size?: number;
  type?: 'image' | 'video' | string;
}

export type ImageUploadValue = string | ImageUploadItem;

export interface ImageUploadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'value'>,
    MotionProps {
  /**
   * Current media URL(s) to display as preview.
   * Single string/object for single mode, array for multiple mode.
   */
  value?: ImageUploadValue | ImageUploadValue[] | null;

  /**
   * Whether multiple media uploads are supported.
   * @default false
   */
  multiple?: boolean;

  /**
   * Media types accepted by the component.
   * @default "image"
   */
  mediaType?: ImageUploadMediaType;

  /**
   * Minimum number of files required (for multiple uploads validation).
   */
  minFiles?: number;

  /**
   * Maximum number of files allowed (for multiple uploads validation).
   */
  maxFiles?: number;

  /**
   * Callback fired when files are selected by the user.
   */
  onChange?: (files: File[] | File | null) => void;

  /**
   * Optional async upload handler.
   */
  onUpload?: (
    file: File
  ) => Promise<{ url: string; key?: string; type?: string } | string>;

  /**
   * Callback fired when an item is removed by the user.
   * In multi mode, receives the index and item being removed.
   */
  onRemove?: (index?: number, item?: ImageUploadItem | string) => void;

  /**
   * Disable the upload zone and actions.
   */
  disabled?: boolean;

  /**
   * Manually control the global loading state.
   */
  loading?: boolean;

  /**
   * Custom loading text displayed during upload.
   */
  loadingText?: string;

  /**
   * Accepted MIME types or extensions.
   * Defaults automatically based on `mediaType`.
   */
  accept?: string;

  /**
   * Maximum allowed file size in bytes per file.
   * @default 5242880 (5MB) for images, 52428800 (50MB) for videos
   */
  maxSizeBytes?: number;

  /**
   * Label rendered above the upload dropzone.
   */
  label?: string;

  /**
   * Subtitle / helper instructions rendered below the dropzone.
   */
  helperText?: string;

  /**
   * Error message to display.
   */
  error?: string;

  /**
   * Aspect ratio of the dropzone / preview cards.
   * @default "auto"
   */
  aspectRatio?: ImageUploadAspectRatio;

  /**
   * Grid columns for multiple image previews.
   * @default 4 (responsive 2-4 columns)
   */
  gridCols?: 2 | 3 | 4 | 5;

  /**
   * Layout mode for multiple image previews.
   * - 'grid': Responsive multi-column wrap grid (default)
   * - 'scroll': Sleek horizontal scroll strip with snap points
   * @default "grid"
   */
  layout?: 'grid' | 'scroll';

  /**
   * Whether to enable the inline full-screen media lightbox popup.
   * @default true
   */
  enablePreviewModal?: boolean;
}
