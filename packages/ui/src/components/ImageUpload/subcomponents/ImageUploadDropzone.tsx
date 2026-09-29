'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { Plus } from '@timmbr/icons';
import { Spinner } from '../../Spinner';
import { imageUploadZoneVariants } from '../ImageUpload.styles';
import {
  UploadCloudIcon,
  ImageIcon,
  FilmIcon,
} from './ImageUploadIcons';
import type {
  ImageUploadAspectRatio,
  ImageUploadMediaType,
} from '../ImageUpload.types';

export interface ImageUploadDropzoneProps {
  disabled?: boolean;
  isUploading?: boolean;
  loadingText?: string;
  isDragging: boolean;
  isError: boolean;
  aspectRatio: ImageUploadAspectRatio;
  size?: 'default' | 'compact';
  mediaType: ImageUploadMediaType;
  maxSizeBytes: number;
  maxFiles?: number;
  multiple?: boolean;
  hasItems?: boolean;
  shouldAnimate?: boolean;
  motionClass?: string;
  onClick: () => void;
  onDragEnter: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

export const ImageUploadDropzone: React.FC<ImageUploadDropzoneProps> = ({
  disabled,
  isUploading,
  loadingText,
  isDragging,
  isError,
  aspectRatio,
  size = 'default',
  mediaType,
  maxSizeBytes,
  maxFiles,
  multiple: _multiple = false,
  hasItems = false,
  shouldAnimate = true,
  motionClass,
  onClick,
  onDragEnter,
  onDragOver,
  onDragLeave,
  onDrop,
}) => {
  const maxMb = Math.round(maxSizeBytes / (1024 * 1024));

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled && !isUploading) {
          onClick();
        }
      }}
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
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
      className={cn(
        imageUploadZoneVariants({
          aspectRatio,
          size,
          isDragging,
          isError,
          isDisabled: disabled,
        }),
        !shouldAnimate && 'transition-none',
        motionClass
      )}
    >
      {isUploading ? (
        <div className="flex flex-col items-center justify-center gap-2">
          <Spinner size="md" />
          <span className="text-xs font-medium text-foreground">{loadingText}</span>
        </div>
      ) : size === 'compact' ? (
        <div className="flex flex-col items-center justify-center gap-1.5 text-center pointer-events-none">
          <div className="size-8 rounded-lg bg-white dark:bg-grey-800 border border-grey-200 dark:border-grey-700 shadow-xs flex items-center justify-center text-primary">
            {isDragging ? (
              <UploadCloudIcon className="size-4 text-primary animate-bounce" />
            ) : (
              <Plus className="size-4 text-primary" />
            )}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-foreground">
              <span className="text-primary underline font-semibold">
                {hasItems ? 'Add more files' : 'Click to upload'}
              </span>{' '}
              or drag & drop
            </span>
            <span className="text-[11px] text-muted">
              {mediaType === 'video'
                ? `MP4, WEBM, MOV (Max ${maxMb}MB)`
                : mediaType === 'all'
                  ? `Images & Videos (Max ${maxMb}MB each)`
                  : `PNG, JPG, WEBP (Max ${maxMb}MB each)`}
              {maxFiles && ` • Up to ${maxFiles} items`}
            </span>
          </div>
        </div>
      ) : aspectRatio === 'square' ? (
        <div className="flex flex-col items-center justify-center gap-1.5 text-center pointer-events-none p-1">
          <div className="size-8 rounded-lg bg-white dark:bg-grey-800 border border-grey-200 dark:border-grey-700 shadow-xs flex items-center justify-center text-primary">
            {isDragging ? (
              <UploadCloudIcon className="size-4 text-primary animate-bounce" />
            ) : (
              <ImageIcon className="size-4 text-primary" />
            )}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold text-primary underline">Upload</span>
            <span className="text-[10px] text-muted">Max {maxMb}MB</span>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 text-center pointer-events-none">
          <div className="size-10 rounded-xl bg-white dark:bg-grey-800 border border-grey-200 dark:border-grey-700 shadow-xs flex items-center justify-center text-primary">
            {isDragging ? (
              <UploadCloudIcon className="size-5 text-primary animate-bounce" />
            ) : mediaType === 'video' ? (
              <FilmIcon className="size-5 text-primary" />
            ) : (
              <ImageIcon className="size-5 text-primary" />
            )}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-medium text-foreground">
              <span className="text-primary underline font-semibold">Click to upload</span> or drag and drop
            </span>
            <span className="text-[11px] text-muted">
              {mediaType === 'video'
                ? `MP4, WEBM, MOV (Max ${maxMb}MB)`
                : mediaType === 'all'
                  ? `PNG, JPG, WEBP, MP4 (Max ${maxMb}MB)`
                  : `PNG, JPG, or WEBP (Max ${maxMb}MB)`}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

ImageUploadDropzone.displayName = 'ImageUploadDropzone';
