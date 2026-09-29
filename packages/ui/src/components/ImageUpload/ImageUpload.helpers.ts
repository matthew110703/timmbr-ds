import type {
  ImageUploadItem,
  ImageUploadValue,
} from './ImageUpload.types';

export const DEFAULT_IMAGE_ACCEPT = 'image/png, image/jpeg, image/webp, image/gif';
export const DEFAULT_VIDEO_ACCEPT = 'video/mp4, video/webm, video/quicktime, video/ogg';
export const DEFAULT_ALL_ACCEPT = `${DEFAULT_IMAGE_ACCEPT}, ${DEFAULT_VIDEO_ACCEPT}`;

export const DEFAULT_IMAGE_MAX_SIZE = 5 * 1024 * 1024; // 5MB
export const DEFAULT_VIDEO_MAX_SIZE = 50 * 1024 * 1024; // 50MB

export const VIDEO_EXTENSIONS = /\.(mp4|webm|mov|m4v|ogg|ogv|avi|mkv)$/i;

export const GRID_COLS_MAP: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-2 sm:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4',
  5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5',
};

/**
 * Checks whether an item, URL, or filename corresponds to a video file.
 */
export function isVideoMedia(item?: ImageUploadItem | string | null): boolean {
  if (!item) return false;
  if (typeof item === 'string') {
    return VIDEO_EXTENSIONS.test(item) || item.startsWith('data:video/');
  }
  if (item.type === 'video' || (item.type && item.type.startsWith('video/'))) {
    return true;
  }
  return VIDEO_EXTENSIONS.test(item.url || '') || VIDEO_EXTENSIONS.test(item.name || '');
}

/**
 * Normalizes single or array value props into an array of ImageUploadItem.
 */
export function normalizeUploadItems(
  value?: ImageUploadValue | ImageUploadValue[] | null
): ImageUploadItem[] {
  if (!value) return [];
  const rawArray = Array.isArray(value) ? value : [value];
  return rawArray.map((v) => {
    if (typeof v === 'string') {
      return {
        url: v,
        type: isVideoMedia(v) ? 'video' : 'image',
      };
    }
    return {
      ...v,
      type: v.type || (isVideoMedia(v) ? 'video' : 'image'),
    };
  });
}

/**
 * Validates files against acceptance criteria (MIME/ext, max files, and size).
 */
export function validateUploadFiles({
  files,
  accept,
  maxSizeBytes,
  maxFiles,
  currentCount,
}: {
  files: File[];
  accept: string;
  maxSizeBytes: number;
  maxFiles?: number;
  currentCount: number;
}): { validFiles: File[]; errorMessage: string | null } {
  if (files.length === 0) {
    return { validFiles: [], errorMessage: null };
  }

  // 1. Max files check
  if (maxFiles) {
    const availableSlots = Math.max(0, maxFiles - currentCount);
    if (availableSlots <= 0) {
      return {
        validFiles: [],
        errorMessage: `Maximum limit of ${maxFiles} item${maxFiles > 1 ? 's' : ''} already reached.`,
      };
    }
    if (files.length > availableSlots) {
      return {
        validFiles: [],
        errorMessage: `You can only upload up to ${maxFiles} items. Selected ${files.length} files (${availableSlots} slot${availableSlots > 1 ? 's' : ''} available).`,
      };
    }
  }

  const acceptedTypes = accept.split(',').map((t) => t.trim().toLowerCase());
  const validFiles: File[] = [];

  for (const file of files) {
    // Validate MIME type or file extension
    const fileExt = `.${file.name.split('.').pop()?.toLowerCase()}`;
    const isValidType = acceptedTypes.some((type) => {
      if (type.startsWith('.')) {
        return fileExt === type;
      }
      if (type.endsWith('/*')) {
        return file.type.startsWith(type.replace('/*', ''));
      }
      return file.type.toLowerCase() === type;
    });

    if (!isValidType) {
      return {
        validFiles: [],
        errorMessage: `File "${file.name}" has an unsupported format. Accepted: ${accept}.`,
      };
    }

    // Validate file size
    if (file.size > maxSizeBytes) {
      const maxMb = Math.round(maxSizeBytes / (1024 * 1024));
      return {
        validFiles: [],
        errorMessage: `File "${file.name}" exceeds the ${maxMb}MB size limit.`,
      };
    }

    validFiles.push(file);
  }

  return { validFiles, errorMessage: null };
}
