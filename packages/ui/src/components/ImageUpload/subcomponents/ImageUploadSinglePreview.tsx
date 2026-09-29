'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { Trash2, Eye } from '@timmbr/icons';
import { Button } from '../../Button';
import { imagePreviewContainerVariants } from '../ImageUpload.styles';
import { PlayIcon, UploadCloudIcon } from './ImageUploadIcons';
import { isVideoMedia } from '../ImageUpload.helpers';
import type {
  ImageUploadItem,
  ImageUploadAspectRatio,
} from '../ImageUpload.types';

export interface ImageUploadSinglePreviewProps {
  item: ImageUploadItem;
  aspectRatio: ImageUploadAspectRatio;
  disabled?: boolean;
  isUploading?: boolean;
  enablePreviewModal?: boolean;
  onReplace: () => void;
  onRemove: (e: React.MouseEvent) => void;
  onPreview: (e: React.MouseEvent) => void;
}

export const ImageUploadSinglePreview: React.FC<ImageUploadSinglePreviewProps> = ({
  item,
  aspectRatio,
  disabled = false,
  isUploading = false,
  enablePreviewModal = true,
  onReplace,
  onRemove,
  onPreview,
}) => {
  const isVideo = isVideoMedia(item);

  return (
    <div
      style={
        aspectRatio === 'square'
          ? {
              width: '120px',
              height: '120px',
              minWidth: '120px',
              minHeight: '120px',
              maxWidth: '120px',
              maxHeight: '120px',
            }
          : undefined
      }
      className={cn(imagePreviewContainerVariants({ aspectRatio }))}
    >
      {isVideo ? (
        <video
          src={item.url}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play().catch(() => {})}
          onMouseLeave={(e) => {
            const v = e.currentTarget as HTMLVideoElement;
            v.pause();
            v.currentTime = 0;
          }}
        />
      ) : (
        <img
          src={item.url}
          alt={item.name || 'Uploaded preview'}
          className={cn(
            'w-full h-full',
            aspectRatio === 'square' ? 'object-contain p-2' : 'object-cover'
          )}
        />
      )}

      {/* Video Indicator */}
      {isVideo && (
        <div className="absolute top-2 left-2 z-10 bg-black/65 backdrop-blur-md text-white text-[10px] font-medium px-2 py-0.5 rounded-full border border-white/20 flex items-center gap-1 shadow-sm pointer-events-none">
          <PlayIcon className="size-2.5" />
          <span>Video</span>
        </div>
      )}

      {/* Hover Action Overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-1 backdrop-blur-[2px]">
        {aspectRatio === 'square' ? (
          <>
            {enablePreviewModal && (
              <button
                type="button"
                className="size-8 rounded-lg bg-black/60 hover:bg-black/85 text-white flex items-center justify-center border border-white/20 transition-all cursor-pointer shadow-xs"
                onClick={onPreview}
                title="Preview full size"
              >
                <Eye className="size-3.5" />
              </button>
            )}
            <button
              type="button"
              disabled={disabled || isUploading}
              onClick={onReplace}
              className="size-8 rounded-lg bg-primary hover:bg-primary/90 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs disabled:opacity-50"
              title="Replace image"
            >
              <UploadCloudIcon className="size-3.5" />
            </button>
            <button
              type="button"
              disabled={disabled || isUploading}
              onClick={onRemove}
              className="size-8 rounded-lg bg-destructive hover:bg-destructive/90 text-white flex items-center justify-center transition-all cursor-pointer shadow-xs disabled:opacity-50"
              title="Remove image"
            >
              <Trash2 className="size-3.5" />
            </button>
          </>
        ) : (
          <>
            {enablePreviewModal && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-white/40 bg-black/40 text-white hover:bg-black/60 hover:text-white backdrop-blur-xs"
                onClick={onPreview}
                leftIcon={<Eye className="size-3.5" />}
              >
                Preview
              </Button>
            )}
            <Button
              type="button"
              variant="default"
              size="sm"
              disabled={disabled || isUploading}
              onClick={onReplace}
            >
              Replace
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={disabled || isUploading}
              className="border-destructive/60 bg-destructive/80 text-white hover:bg-destructive hover:text-white"
              onClick={onRemove}
              leftIcon={<Trash2 className="size-3.5" />}
            >
              Remove
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

ImageUploadSinglePreview.displayName = 'ImageUploadSinglePreview';
