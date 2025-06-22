import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ImageWithPlaceholderProps {
  src: string;
  alt: string;
  className?: string;
  placeholderClassName?: string;
  fallbackSrc?: string;
  lazy?: boolean;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'landscape' | 'auto';
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
}

const ImageWithPlaceholder: React.FC<ImageWithPlaceholderProps> = ({
  src,
  alt,
  className,
  placeholderClassName,
  fallbackSrc = '/placeholder-image.jpg',
  lazy = true,
  aspectRatio = 'auto',
  objectFit = 'cover',
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(!lazy || priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[4/3]',
    auto: '',
  };

  const objectFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy || priority) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazy, priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const imageSrc = hasError ? fallbackSrc : src;

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative overflow-hidden bg-gray-100',
        aspectRatioClasses[aspectRatio],
        className
      )}
    >
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200',
              placeholderClassName
            )}
          >
            {/* Skeleton loader */}
            <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isInView && (
        <motion.img
          ref={imgRef}
          src={imageSrc}
          alt={alt}
          className={cn(
            'w-full h-full transition-opacity duration-300',
            objectFitClasses[objectFit],
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ 
            opacity: isLoaded ? 1 : 0,
            scale: isLoaded ? 1 : 1.1
          }}
          transition={{ 
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        />
      )}
    </div>
  );
};

export default ImageWithPlaceholder;
