'use client';

import * as React from 'react';
import { cn } from '@timmbr/utils';
import { AlertCircle } from '@timmbr/icons';
import { LayoutGroup, AnimatePresence } from '@timmbr/motion';
import { useGlobalAnimation } from '../../providers';
import { resolveMotion } from '../../types/motion';
import {
  DEFAULT_IMAGE_ACCEPT,
  DEFAULT_VIDEO_ACCEPT,
  DEFAULT_ALL_ACCEPT,
  DEFAULT_IMAGE_MAX_SIZE,
  DEFAULT_VIDEO_MAX_SIZE,
  GRID_COLS_MAP,
  isVideoMedia,
  normalizeUploadItems,
  validateUploadFiles,
} from './ImageUpload.helpers';
import {
  ImageUploadDropzone,
  ImageUploadSinglePreview,
  ImageUploadThumbnailCard,
  ImageUploadTaskCard,
  ImageUploadModal,
} from './subcomponents';
import type {
  ImageUploadProps,
  ImageUploadItem,
} from './ImageUpload.types';

interface UploadingTask {
  id: string;
  name: string;
  previewUrl: string;
  isVideo: boolean;
}

export const ImageUpload = React.forwardRef<HTMLDivElement, ImageUploadProps>(
  (
    {
      className,
      style,
      value,
      multiple = false,
      mediaType = 'image',
      minFiles,
      maxFiles,
      onChange,
      onUpload,
      onRemove,
      disabled = false,
      loading = false,
      loadingText,
      accept: customAccept,
      maxSizeBytes: customMaxSize,
      label,
      helperText,
      error: externalError,
      aspectRatio = 'auto',
      gridCols = 4,
      layout = 'grid',
      enablePreviewModal = true,
      motion: motionProp,
      ...props
    },
    ref
  ) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const dragCounterRef = React.useRef(0);
    const globalMotion = useGlobalAnimation();
    const { shouldAnimate, motionClass, dataAttributes } = resolveMotion(
      motionProp,
      globalMotion
    );

    const [isDragging, setIsDragging] = React.useState(false);
    const [uploadingTasks, setUploadingTasks] = React.useState<UploadingTask[]>([]);
    const [localError, setLocalError] = React.useState<string | null>(null);
    const [previewModalIndex, setPreviewModalIndex] = React.useState<number | null>(null);

    // Dynamic defaults based on mediaType
    const accept = React.useMemo(() => {
      if (customAccept) return customAccept;
      if (mediaType === 'video') return DEFAULT_VIDEO_ACCEPT;
      if (mediaType === 'all') return DEFAULT_ALL_ACCEPT;
      return DEFAULT_IMAGE_ACCEPT;
    }, [customAccept, mediaType]);

    const maxSizeBytes = React.useMemo(() => {
      if (customMaxSize) return customMaxSize;
      return mediaType === 'video' || mediaType === 'all'
        ? DEFAULT_VIDEO_MAX_SIZE
        : DEFAULT_IMAGE_MAX_SIZE;
    }, [customMaxSize, mediaType]);

    const defaultLoadingText =
      loadingText || (mediaType === 'video' ? 'Uploading video...' : 'Uploading image...');

    // Normalize value to array of ImageUploadItem
    const items: ImageUploadItem[] = React.useMemo(
      () => normalizeUploadItems(value),
      [value]
    );

    const isGlobalUploading = loading || uploadingTasks.length > 0;
    const currentCount = items.length + uploadingTasks.length;
    const isMaxReached = Boolean(maxFiles && currentCount >= maxFiles);

    // Min files warning
    const minFilesWarning =
      minFiles && items.length > 0 && items.length < minFiles
        ? `At least ${minFiles} items are required (currently ${items.length}).`
        : null;

    const error = externalError || localError;
    const isError = Boolean(error);

    // Cleanup object URLs on unmount
    React.useEffect(() => {
      return () => {
        uploadingTasks.forEach((task) => {
          if (task.previewUrl.startsWith('blob:')) {
            URL.revokeObjectURL(task.previewUrl);
          }
        });
      };
    }, [uploadingTasks]);

    const handleFiles = React.useCallback(
      async (rawFiles: File[]) => {
        setLocalError(null);

        const filesToProcess = multiple ? rawFiles : rawFiles.slice(0, 1);
        const { validFiles, errorMessage } = validateUploadFiles({
          files: filesToProcess,
          accept,
          maxSizeBytes,
          maxFiles,
          currentCount,
        });

        if (errorMessage) {
          setLocalError(errorMessage);
          return;
        }

        if (validFiles.length === 0) return;

        onChange?.(multiple ? validFiles : validFiles[0]);

        if (onUpload) {
          // Process uploads concurrently
          const newTasks: UploadingTask[] = validFiles.map((file) => ({
            id: `${file.name}-${Date.now()}-${Math.random()}`,
            name: file.name,
            previewUrl: URL.createObjectURL(file),
            isVideo: file.type.startsWith('video/') || isVideoMedia(file.name),
          }));

          setUploadingTasks((prev) => [...prev, ...newTasks]);

          await Promise.allSettled(
            validFiles.map(async (file, idx) => {
              const taskId = newTasks[idx].id;
              try {
                await onUpload(file);
              } catch (err: unknown) {
                const msg =
                  err instanceof Error ? err.message : `Failed to upload "${file.name}".`;
                setLocalError(msg);
              } finally {
                setUploadingTasks((prev) => {
                  const task = prev.find((t) => t.id === taskId);
                  if (task?.previewUrl.startsWith('blob:')) {
                    URL.revokeObjectURL(task.previewUrl);
                  }
                  return prev.filter((t) => t.id !== taskId);
                });
              }
            })
          );
        }
      },
      [accept, currentCount, maxFiles, maxSizeBytes, multiple, onChange, onUpload]
    );

    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current += 1;
      if (!disabled && !isGlobalUploading && !isMaxReached) {
        setIsDragging(true);
      }
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current -= 1;
      if (dragCounterRef.current <= 0) {
        dragCounterRef.current = 0;
        setIsDragging(false);
      }
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current = 0;
      setIsDragging(false);

      if (disabled || isGlobalUploading || isMaxReached) return;

      const droppedFiles = Array.from(e.dataTransfer.files || []);
      if (droppedFiles.length > 0) {
        handleFiles(droppedFiles);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);
      if (selectedFiles.length > 0) {
        handleFiles(selectedFiles);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };

    const handleSingleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      setLocalError(null);
      onRemove?.(0, items[0]);
    };

    const handleItemRemove = (e: React.MouseEvent, index: number, item: ImageUploadItem) => {
      e.stopPropagation();
      setLocalError(null);
      if (previewModalIndex === index) {
        setPreviewModalIndex(null);
      }
      onRemove?.(index, item);
    };

    const openPreviewModal = (e: React.MouseEvent, index: number) => {
      e.stopPropagation();
      if (enablePreviewModal) {
        setPreviewModalIndex(index);
      }
    };

    const gridClass = GRID_COLS_MAP[gridCols] || GRID_COLS_MAP[4];

    return (
      <LayoutGroup id="image-upload-group">
        <div
          ref={ref}
          data-slot="image-upload"
          className={cn('flex flex-col gap-2 w-full font-sans', className)}
          style={style}
          {...dataAttributes}
          {...props}
        >
          {/* Header: Label & File Count/Min-Max Badges */}
          {(label || maxFiles || minFiles) && (
            <div className="flex items-center justify-between gap-2 select-none">
              {label && (
                <label className="text-xs font-semibold text-foreground tracking-wide flex items-center gap-1.5">
                  <span>{label}</span>
                  {minFiles && minFiles > 0 && (
                    <span className="text-[11px] text-muted font-normal">
                      (Min {minFiles})
                    </span>
                  )}
                </label>
              )}

              {multiple && (
                <span className="text-[11px] font-medium text-muted">
                  {items.length}
                  {maxFiles ? ` / ${maxFiles}` : ''} uploaded
                </span>
              )}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            className="hidden"
            disabled={disabled || isGlobalUploading || isMaxReached}
            onChange={handleInputChange}
          />

          {/* SINGLE MODE */}
          {!multiple ? (
            items.length > 0 ? (
              <ImageUploadSinglePreview
                item={items[0]}
                aspectRatio={aspectRatio}
                disabled={disabled}
                isUploading={isGlobalUploading}
                enablePreviewModal={enablePreviewModal}
                onReplace={() => fileInputRef.current?.click()}
                onRemove={handleSingleRemove}
                onPreview={(e) => openPreviewModal(e, 0)}
              />
            ) : (
              <ImageUploadDropzone
                disabled={disabled}
                isUploading={isGlobalUploading}
                loadingText={defaultLoadingText}
                isDragging={isDragging}
                isError={isError}
                aspectRatio={aspectRatio}
                mediaType={mediaType}
                maxSizeBytes={maxSizeBytes}
                shouldAnimate={shouldAnimate}
                motionClass={motionClass}
                onClick={() => !disabled && !isGlobalUploading && fileInputRef.current?.click()}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              />
            )
          ) : (
            /* MULTIPLE MODE */
            <div className="flex flex-col gap-3 w-full">
              {/* Dropzone (active if below max limit) */}
              {!isMaxReached ? (
                <ImageUploadDropzone
                  disabled={disabled}
                  isUploading={isGlobalUploading}
                  loadingText={defaultLoadingText}
                  isDragging={isDragging}
                  isError={isError}
                  aspectRatio={items.length > 0 ? 'auto' : aspectRatio}
                  size={items.length > 0 ? 'compact' : 'default'}
                  mediaType={mediaType}
                  maxSizeBytes={maxSizeBytes}
                  maxFiles={maxFiles}
                  multiple={true}
                  hasItems={items.length > 0}
                  shouldAnimate={shouldAnimate}
                  motionClass={motionClass}
                  onClick={() =>
                    !disabled && !isGlobalUploading && fileInputRef.current?.click()
                  }
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                />
              ) : (
                <div className="w-full rounded-xl border border-dashed border-grey-300 dark:border-grey-700 bg-grey-50/50 dark:bg-grey-900/30 p-3 text-center text-xs text-muted">
                  Maximum upload limit reached ({maxFiles}/{maxFiles} items). Remove an item to add another.
                </div>
              )}

              {/* Thumbnails Gallery (Grid or Scroll Strip) */}
              {(items.length > 0 || uploadingTasks.length > 0) && (
                <div
                  className={cn(
                    layout === 'scroll'
                      ? 'flex gap-3 overflow-x-auto pb-2.5 pt-0.5 scrollbar-thin snap-x snap-mandatory scroll-smooth w-full'
                      : 'grid gap-3 w-full',
                    layout === 'grid' && gridClass
                  )}
                >
                  <AnimatePresence initial={false}>
                    {items.map((item, index) => (
                      <ImageUploadThumbnailCard
                        key={item.key || item.url || index}
                        item={item}
                        index={index}
                        layout={layout}
                        disabled={disabled}
                        enablePreviewModal={enablePreviewModal}
                        shouldAnimate={shouldAnimate}
                        onPreview={(e) => openPreviewModal(e, index)}
                        onRemove={(e) => handleItemRemove(e, index, item)}
                      />
                    ))}

                    {uploadingTasks.map((task) => (
                      <ImageUploadTaskCard
                        key={task.id}
                        id={task.id}
                        name={task.name}
                        previewUrl={task.previewUrl}
                        isVideo={task.isVideo}
                        layout={layout}
                        shouldAnimate={shouldAnimate}
                      />
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          )}

          {/* Footer: Error / Warning / Helper text */}
          {(error || minFilesWarning || helperText) && (
            <p
              className={cn(
                'text-xs mt-1 flex items-center gap-1.5 leading-normal',
                isError
                  ? 'text-destructive font-medium'
                  : minFilesWarning
                    ? 'text-amber-600 dark:text-amber-400 font-medium'
                    : 'text-muted'
              )}
            >
              {(isError || minFilesWarning) && (
                <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
              )}
              <span>{error || minFilesWarning || helperText}</span>
            </p>
          )}
        </div>

        {/* INLINE MEDIA LIGHTBOX POPUP MODAL */}
        <ImageUploadModal
          isOpen={enablePreviewModal && previewModalIndex !== null}
          activeIndex={previewModalIndex}
          items={items}
          shouldAnimate={shouldAnimate}
          onClose={() => setPreviewModalIndex(null)}
          onNavigate={(newIndex) => setPreviewModalIndex(newIndex)}
        />
      </LayoutGroup>
    );
  }
);

ImageUpload.displayName = 'ImageUpload';
