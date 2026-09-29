'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { X, ChevronLeft, ChevronRight } from '@timmbr/icons';
import { motion, AnimatePresence, getTransition } from '@timmbr/motion';
import { isVideoMedia } from '../ImageUpload.helpers';
import type { ImageUploadItem } from '../ImageUpload.types';

export interface ImageUploadModalProps {
  isOpen: boolean;
  activeIndex: number | null;
  items: ImageUploadItem[];
  shouldAnimate?: boolean;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
}

export const ImageUploadModal: React.FC<ImageUploadModalProps> = ({
  isOpen,
  activeIndex,
  items,
  shouldAnimate = true,
  onClose,
  onNavigate,
}) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const activeItem =
    activeIndex !== null && items[activeIndex] ? items[activeIndex] : null;

  // Keyboard navigation
  React.useEffect(() => {
    if (!isOpen || activeIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && items.length > 1) {
        onNavigate(activeIndex > 0 ? activeIndex - 1 : items.length - 1);
      } else if (e.key === 'ArrowRight' && items.length > 1) {
        onNavigate(activeIndex < items.length - 1 ? activeIndex + 1 : 0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, isOpen, items.length, onClose, onNavigate]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && activeItem && activeIndex !== null && (
        <motion.div
          initial={shouldAnimate ? { opacity: 0 } : false}
          animate={shouldAnimate ? { opacity: 1 } : undefined}
          exit={shouldAnimate ? { opacity: 0 } : undefined}
          transition={getTransition('fast')}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs"
          onClick={onClose}
        >
          {/* Modal Card Container */}
          <motion.div
            initial={shouldAnimate ? { scale: 0.95, opacity: 0 } : false}
            animate={shouldAnimate ? { scale: 1, opacity: 1 } : undefined}
            exit={shouldAnimate ? { scale: 0.95, opacity: 0 } : undefined}
            transition={getTransition('spring')}
            className="relative max-w-2xl max-h-[85vh] w-full bg-white dark:bg-grey-950 border border-grey-200 dark:border-grey-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-grey-200 dark:border-grey-800 bg-grey-50/80 dark:bg-grey-900/80 backdrop-blur-xs select-none">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-foreground tracking-wide truncate max-w-xs sm:max-w-md">
                  {activeItem.name || `Media Item #${activeIndex + 1}`}
                </span>
                {activeIndex === 0 && (
                  <span className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                    Cover
                  </span>
                )}
                <span className="text-[11px] text-muted">
                  ({activeIndex + 1} of {items.length})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="size-7 rounded-full bg-grey-200/70 hover:bg-grey-300 dark:bg-grey-800 dark:hover:bg-grey-700 text-foreground flex items-center justify-center transition-colors cursor-pointer"
                  title="Close preview (Esc)"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Modal Content Media Viewer */}
            <div className="relative flex-1 flex items-center justify-center p-4 min-h-[260px] max-h-[70vh] bg-grey-100/50 dark:bg-black/50 overflow-hidden">
              {isVideoMedia(activeItem) ? (
                <video
                  src={activeItem.url}
                  controls
                  autoPlay
                  playsInline
                  className="max-w-full max-h-[65vh] rounded-lg shadow-md"
                />
              ) : (
                <img
                  src={activeItem.url}
                  alt={activeItem.name || 'Preview full size'}
                  className="max-w-full max-h-[65vh] object-contain rounded-lg shadow-md select-none"
                />
              )}

              {/* Navigation Arrows for Multiple Items */}
              {items.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(activeIndex > 0 ? activeIndex - 1 : items.length - 1);
                    }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 size-9 rounded-full bg-white/90 hover:bg-white dark:bg-grey-800/90 dark:hover:bg-grey-800 border border-grey-200 dark:border-grey-700 text-foreground flex items-center justify-center transition-all backdrop-blur-xs cursor-pointer shadow-md"
                    title="Previous (Left Arrow)"
                  >
                    <ChevronLeft className="size-4" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate(activeIndex < items.length - 1 ? activeIndex + 1 : 0);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 size-9 rounded-full bg-white/90 hover:bg-white dark:bg-grey-800/90 dark:hover:bg-grey-800 border border-grey-200 dark:border-grey-700 text-foreground flex items-center justify-center transition-all backdrop-blur-xs cursor-pointer shadow-md"
                    title="Next (Right Arrow)"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

ImageUploadModal.displayName = 'ImageUploadModal';
