import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { MediaAsset } from '../data/media';

interface GoldGradientFallbackProps {
  title?: string;
  category?: string;
  className?: string;
}

export const GoldGradientFallback: React.FC<GoldGradientFallbackProps> = ({
  title,
  category,
  className = '',
}) => {
  return (
    <div
      aria-hidden="true"
      className={`relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}
      style={{
        background:
          'linear-gradient(145deg, #541C2B 0%, #331019 48%, #1d0c11 72%, rgba(197,164,109,0.34) 100%)',
      }}
    >
      {/* Fine Architectural Grid & Warm Gold Radial Bloom */}
      <div className="absolute inset-0 kk-fine-grid opacity-30" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 75% 22%, rgba(197, 164, 109, 0.35), transparent 58%)',
        }}
      />

      {/* Gold Hairline Inner Frame */}
      <div className="relative flex h-[78%] w-[82%] flex-col items-center justify-center rounded-t-full border border-[#C5A46D]/45 bg-black/15 px-4 text-center backdrop-blur-[1px]">
        <svg
          viewBox="0 0 48 48"
          className="h-9 w-9 text-[#C5A46D] opacity-85"
          fill="none"
        >
          <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
          <path
            d="M24 10C26.5 16.5 26.5 20.5 24 24C21.5 20.5 21.5 16.5 24 10ZM24 38C26.5 31.5 26.5 27.5 24 24C21.5 27.5 21.5 31.5 24 38ZM10 24C16.5 21.5 20.5 21.5 24 24C20.5 26.5 16.5 26.5 10 24ZM38 24C31.5 21.5 27.5 21.5 24 24C27.5 26.5 31.5 26.5 38 24Z"
            stroke="currentColor"
            strokeWidth="1"
            fill="currentColor"
            fillOpacity="0.18"
          />
        </svg>
        {category && (
          <span className="mt-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C5A46D]">
            {category}
          </span>
        )}
        {title && (
          <span className="mt-1 font-display text-sm font-medium text-[#FAF8F4]/85 line-clamp-1">
            {title}
          </span>
        )}
      </div>
    </div>
  );
};

interface ResponsivePictureProps {
  asset: MediaAsset;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
  onLoad?: () => void;
  fallbackNode?: React.ReactNode;
}

export const ResponsivePicture: React.FC<ResponsivePictureProps> = ({
  asset,
  className = '',
  imgClassName = '',
  sizes = '(max-width: 768px) 100vw, 50vw',
  priority = false,
  onLoad,
  fallbackNode,
}) => {
  const [hasError, setHasError] = useState(false);
  const srcToUse = asset.type === 'video' ? asset.poster || '' : asset.src;

  if (hasError || !srcToUse) {
    return (
      <div
        role="img"
        aria-label={asset.alt}
        className={`relative h-full w-full overflow-hidden ${className}`}
      >
        {fallbackNode ?? (
          <GoldGradientFallback title={asset.title} category={asset.category} />
        )}
      </div>
    );
  }

  return (
    <picture className={`block h-full w-full ${className}`}>
      {asset.webpSrc && <source srcSet={asset.webpSrc} type="image/webp" sizes={sizes} />}
      <img
        src={srcToUse}
        srcSet={asset.srcSet}
        sizes={sizes}
        alt={asset.alt}
        width={asset.width}
        height={asset.height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        referrerPolicy="no-referrer"
        onLoad={onLoad}
        onError={() => setHasError(true)}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </picture>
  );
};

interface ViewportVideoProps {
  asset: MediaAsset;
  className?: string;
  videoClassName?: string;
  hovered?: boolean;
  priority?: boolean;
  paused?: boolean;
  onVideoReady?: () => void;
  fallbackNode?: React.ReactNode;
}

export const ViewportVideo: React.FC<ViewportVideoProps> = ({
  asset,
  className = '',
  videoClassName = '',
  hovered = false,
  priority = false,
  paused = false,
  onVideoReady,
  fallbackNode,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [inView, setInView] = useState(priority);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoError) return;

    const shouldPlay = !paused && !prefersReducedMotion && (inView || hovered);
    if (shouldPlay) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay may be blocked by browser policy; poster remains visible.
        });
      }
    } else {
      video.pause();
    }
  }, [inView, hovered, paused, prefersReducedMotion, videoError]);

  return (
    <div ref={containerRef} className={`relative h-full w-full overflow-hidden ${className}`}>
      {/* Poster / Ken Burns layer while video loads or on fallback */}
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          videoLoaded && !videoError ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <ResponsivePicture
          asset={asset}
          priority={priority}
          imgClassName={priority && !prefersReducedMotion ? 'kk-ken-burns' : ''}
          fallbackNode={fallbackNode}
        />
      </div>

      {!videoError && (
        <video
          ref={videoRef}
          src={asset.src}
          poster={asset.poster}
          width={asset.width}
          height={asset.height}
          muted
          loop
          playsInline
          preload={priority ? 'auto' : 'metadata'}
          onCanPlay={() => {
            setVideoLoaded(true);
            onVideoReady?.();
          }}
          onError={() => setVideoError(true)}
          aria-label={asset.alt}
          className={`relative h-full w-full object-cover transition-opacity duration-700 ${
            videoLoaded ? 'opacity-100' : 'opacity-0'
          } ${videoClassName}`}
        />
      )}
    </div>
  );
};
