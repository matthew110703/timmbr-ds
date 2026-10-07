'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { Trash2, Eye } from '@timmbr/icons';
import { motion, scaleVariants, getTransition } from '@timmbr/motion';
import { Spinner } from '../../Spinner';
import { thumbnailCardVariants } from '../ImageUpload.styles';
import { PlayIcon } from './ImageUploadIcons';
import { isVideoMedia } from '../ImageUpload.helpers';
import type { ImageUploadItem } from '../ImageUpload.types';

export interface ImageUploadThumbnailCardProps {
  item: ImageUploadItem;
  index: number;
  layout?: 'grid' | 'scroll';
  disabled?: boolean;
  enablePreviewModal?: boolean;
  shouldAnimate?: boolean;
  onPreview: (e: React.MouseEvent) => void;
  onRemove: (e: React.MouseEvent) => void;
}

export const ImageUploadThumbnailCard: React.FC<ImageUploadThumbnailCardProps> = ({
  item,
  index,
  layout = 'grid',
  disabled = false,
  enablePreviewModal = true,
  shouldAnimate = true,
  onPreview,
  onRemove,
}) => {
  const isVideo = isVideoMedia(item);

  return (
    <motion.div
      key={item.key || item.url || index}
      layout={shouldAnimate}
      initial={shouldAnimate ? 'hidden' : false}
      animate={shouldAnimate ? 'visible' : undefined}
      exit={shouldAnimate ? 'exit' : undefined}
      variants={shouldAnimate ? scaleVariants : undefined}
      transition={getTransition('spring')}
      className={cn(
        thumbnailCardVariants({ aspectRatio: 'square' }),
        layout === 'scroll' && 'shrink-0 w-36 sm:w-40 snap-start'
      )}
    >
      {/* Media Preview */}
      {isVideo ? (
        <video
          src={item.url}
          className="w-full h-full object-cover"
          muted
          playsInline
          preload="metadata"
        />
      ) : (
        <img
          src={item.url}
          alt={item.name || `Media #${index + 1}`}
          className="w-full h-full object-cover"
        />
      )}

      {/* Subtle Frosted Badges: Cover & Position */}
      <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 pointer-events-none">
        {index === 0 ? (
          <div className="bg-grey-1000/65 backdrop-blur-md text-grey-50 text-caption font-semibold px-2 py-0.5 rounded-full border border-grey-50/20 shadow-md flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-success shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span>Cover</span>
          </div>
        ) : (
          <div className="bg-grey-1000/55 backdrop-blur-md text-grey-50/90 text-caption font-medium px-2 py-0.5 rounded-full border border-grey-50/10 shadow-sm">
            #{index + 1}
          </div>
        )}
      </div>

      {/* Video Badge (Top Right) */}
      {isVideo && (
        <div className="absolute top-2 right-2 z-10 bg-grey-1000/65 backdrop-blur-md text-grey-50 p-1 rounded-full border border-grey-50/20 shadow-md pointer-events-none">
          <PlayIcon className="size-2.5" />
        </div>
      )}

      {/* Hover Action Overlay */}
      <div className="absolute inset-0 bg-grey-1000/55 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px] z-20">
        {enablePreviewModal && (
          <button
            type="button"
            onClick={onPreview}
            className="size-8 rounded-full bg-grey-50/25 hover:bg-grey-50/40 text-grey-50 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
            title="Preview full size"
          >
            <Eye className="size-4" />
          </button>
        )}
        <button
          type="button"
          disabled={disabled}
          onClick={onRemove}
          className="size-8 rounded-full bg-destructive/90 hover:bg-destructive text-grey-50 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
          title="Remove item"
        >
          <Trash2 className="size-4" />
        </button>
      </div>
    </motion.div>
  );
};

ImageUploadThumbnailCard.displayName = 'ImageUploadThumbnailCard';

export interface ImageUploadTaskCardProps {
  id: string;
  name: string;
  previewUrl: string;
  isVideo: boolean;
  layout?: 'grid' | 'scroll';
  shouldAnimate?: boolean;
}

export const ImageUploadTaskCard: React.FC<ImageUploadTaskCardProps> = ({
  id,
  name,
  previewUrl,
  isVideo,
  layout = 'grid',
  shouldAnimate = true,
}) => {
  return (
    <motion.div
      key={id}
      layout={shouldAnimate}
      initial={shouldAnimate ? 'hidden' : false}
      animate={shouldAnimate ? 'visible' : undefined}
      exit={shouldAnimate ? 'exit' : undefined}
      variants={shouldAnimate ? scaleVariants : undefined}
      transition={getTransition('fast')}
      className={cn(
        thumbnailCardVariants({ aspectRatio: 'square' }),
        'border-primary/50 bg-primary-50/20 dark:bg-primary-950/20',
        layout === 'scroll' && 'shrink-0 w-36 sm:w-40 snap-start'
      )}
    >
      {isVideo ? (
        <video
          src={previewUrl}
          className="w-full h-full object-cover blur-xs scale-105 opacity-60"
          muted
        />
      ) : (
        <img
          src={previewUrl}
          alt={name}
          className="w-full h-full object-cover blur-xs scale-105 opacity-60"
        />
      )}
      <div className="absolute inset-0 bg-grey-1000/50 flex flex-col items-center justify-center gap-1.5 p-2 text-center">
        <Spinner size="sm" className="text-grey-50" />
        <span className="text-caption font-medium text-grey-50 line-clamp-1 max-w-full px-1">
          {name}
        </span>
      </div>
    </motion.div>
  );
};

ImageUploadTaskCard.displayName = 'ImageUploadTaskCard';
