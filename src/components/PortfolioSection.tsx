import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, PanInfo } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import {
  MediaAsset,
  MediaCategory,
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_MEDIA,
} from '../data/media';
import { AnimatedHeadingReveal } from './MotionPrimitives';
import { ResponsivePicture, ViewportVideo } from './MediaPrimitives';
import DriftWall, { DriftWallItem } from './DriftWall';

export const PortfolioSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<MediaCategory>('All');
  const [activeAsset, setActiveAsset] = useState<MediaAsset | null>(null);
  const [zoomScale, setZoomScale] = useState(1);
  const pinchStartDistance = useRef<number | null>(null);
  const pinchStartScale = useRef<number>(1);

  const filteredMedia = useMemo(
    () =>
      selectedCategory === 'All'
        ? PORTFOLIO_MEDIA
        : PORTFOLIO_MEDIA.filter((item) => item.category === selectedCategory),
    [selectedCategory]
  );

  const driftWallItems = useMemo<DriftWallItem[]>(
    () =>
      filteredMedia.map((asset) => ({
        id: asset.id,
        image: asset.type === 'video' ? asset.poster || '' : asset.src,
        webpSrc: asset.webpSrc,
        alt: asset.alt,
        title: asset.title,
        category: asset.category,
        type: asset.type,
      })),
    [filteredMedia]
  );

  const activeIndex = activeAsset
    ? filteredMedia.findIndex((p) => p.id === activeAsset.id)
    : -1;

  const navigateLightbox = useCallback(
    (dir: 1 | -1) => {
      if (!activeAsset || filteredMedia.length === 0) return;
      const currentIdx = filteredMedia.findIndex((p) => p.id === activeAsset.id);
      const safeIdx = currentIdx === -1 ? 0 : currentIdx;
      const nextIdx = (safeIdx + dir + filteredMedia.length) % filteredMedia.length;
      setZoomScale(1);
      setActiveAsset(filteredMedia[nextIdx]);
    },
    [activeAsset, filteredMedia]
  );

  // Preload adjacent prev/next lightbox assets
  useEffect(() => {
    if (!activeAsset || filteredMedia.length <= 1) return;
    const idx = filteredMedia.findIndex((p) => p.id === activeAsset.id);
    if (idx === -1) return;

    const prevItem = filteredMedia[(idx - 1 + filteredMedia.length) % filteredMedia.length];
    const nextItem = filteredMedia[(idx + 1) % filteredMedia.length];

    [prevItem, nextItem].forEach((neighbor) => {
      const preloadUrl =
        neighbor.type === 'video' ? neighbor.poster : neighbor.webpSrc || neighbor.src;
      if (preloadUrl) {
        const img = new Image();
        img.src = preloadUrl;
      }
    });
  }, [activeAsset, filteredMedia]);

  useEffect(() => {
    if (!activeAsset) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveAsset(null);
        setZoomScale(1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        navigateLightbox(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        navigateLightbox(-1);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeAsset, navigateLightbox]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchStartDistance.current = Math.hypot(dx, dy);
      pinchStartScale.current = zoomScale;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && pinchStartDistance.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const next = Math.min(
        2.5,
        Math.max(1, pinchStartScale.current * (dist / pinchStartDistance.current))
      );
      setZoomScale(Number(next.toFixed(2)));
    }
  };

  const handleTouchEnd = () => {
    pinchStartDistance.current = null;
  };

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (zoomScale > 1.05) return;
    if (info.offset.x < -50 || info.velocity.x < -300) {
      navigateLightbox(1);
    } else if (info.offset.x > 50 || info.velocity.x > 300) {
      navigateLightbox(-1);
    }
  };

  return (
    <section
      id="portfolio"
      className="kk-section border-b border-[var(--border)] bg-[var(--surface)]"
    >
      <div className="kk-container">
        <AnimatedHeadingReveal
          eyebrow="Showcase"
          title="Our Work"
          className="max-w-lg"
        />

        {/* Animated Layout Filter Bar */}
        <div
          role="tablist"
          aria-label="Filter gallery by category"
          className="mt-8 flex flex-wrap items-center gap-2 border-b border-[var(--border)] pb-5"
        >
          {PORTFOLIO_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(category)}
                className={`relative min-h-[44px] px-4 py-2 text-xs sm:text-sm font-medium transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                  isActive
                    ? 'text-[var(--accent-text)]'
                    : 'border border-[var(--border)] bg-[var(--bg)] text-[var(--text-muted)] hover:border-[var(--border-strong)] hover:text-[var(--accent)]'
                }`}
                style={{ borderRadius: 'var(--radius-btn)' }}
              >
                {isActive && (
                  <motion.span
                    layoutId="portfolioCategoryIndicator"
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    aria-hidden="true"
                    className="absolute inset-0 bg-[var(--accent)]"
                    style={{ borderRadius: 'var(--radius-btn)' }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>

        {/* 3D Tilted DriftWall Showcase */}
        <div
          className="relative mt-8 h-[600px] w-full overflow-hidden border border-[var(--border-strong)] shadow-[var(--shadow)]"
          style={{ borderRadius: 'var(--radius)', backgroundColor: '#060010' }}
        >
          <DriftWall
            items={driftWallItems}
            columns={5}
            tileWidth={200}
            tileHeight={132}
            gap={18}
            tilt={16}
            turn={-14}
            perspective={1200}
            depth={120}
            speed={42}
            direction="up"
            variance={0.45}
            parallax={0.6}
            lift={64}
            fade={0.6}
            dim={0.55}
            overlayColor="#060010"
            onSelect={(selected) => {
              const found = filteredMedia.find((item) => item.id === selected.id);
              if (found) {
                setZoomScale(1);
                setActiveAsset(found);
              }
            }}
          />
        </div>
      </div>

      {/* Fullscreen Lightbox with Swipe, Pinch-Zoom, Arrow Keys & Preloading */}
      <AnimatePresence>
        {activeAsset && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => {
              setActiveAsset(null);
              setZoomScale(1);
            }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/92 p-4 sm:p-6 backdrop-blur-md"
          >
            {/* Top Controls */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-between gap-4 text-[#FAF8F4]"
            >
              <div className="min-w-0">
                <p className="text-xs font-medium text-[#C5A46D]">
                  {activeAsset.category} · {String(Math.max(activeIndex, 0) + 1).padStart(2, '0')} /{' '}
                  {String(filteredMedia.length).padStart(2, '0')}
                </p>
                <h3
                  id="lightbox-title"
                  className="truncate font-display text-xl sm:text-2xl font-semibold"
                >
                  {activeAsset.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.94 }}
                  onClick={() => setZoomScale((z) => (z > 1 ? 1 : 2))}
                  aria-label={zoomScale > 1 ? 'Reset zoom' : 'Zoom in'}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#C5A46D]/45 bg-white/10 text-[#FAF8F4] hover:border-[#C5A46D] cursor-pointer"
                >
                  {zoomScale > 1 ? (
                    <ZoomOut className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <ZoomIn className="h-4 w-4" aria-hidden="true" />
                  )}
                </motion.button>

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    setActiveAsset(null);
                    setZoomScale(1);
                  }}
                  aria-label="Close lightbox"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#C5A46D]/45 bg-white/10 text-[#FAF8F4] hover:bg-[#541C2B] cursor-pointer"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </motion.button>
              </div>
            </div>

            {/* Center Media Canvas (Swipe + Pinch-Zoom) */}
            <div
              onClick={(e) => e.stopPropagation()}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="relative my-auto flex max-h-[70vh] w-full items-center justify-center overflow-hidden touch-pan-y"
            >
              <motion.div
                drag={zoomScale === 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.22}
                onDragEnd={handleDragEnd}
                animate={{ scale: zoomScale }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-4xl overflow-hidden border border-[#C5A46D]/40 bg-[#140B0E] shadow-2xl"
                style={{ borderRadius: 'var(--radius)' }}
              >
                <div className="aspect-[16/10] w-full">
                  {activeAsset.type === 'video' ? (
                    <ViewportVideo asset={activeAsset} priority />
                  ) : (
                    <ResponsivePicture asset={activeAsset} sizes="100vw" priority />
                  )}
                </div>
              </motion.div>
            </div>

            {/* Bottom Caption & Prev/Next Bar */}
            <div
              onClick={(e) => e.stopPropagation()}
              className="flex flex-wrap items-center justify-between gap-4 text-[#FAF8F4]"
            >
              <p className="text-xs sm:text-sm text-white/75">{activeAsset.summary}</p>

              {filteredMedia.length > 1 && (
                <div className="flex items-center gap-2">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.94 }}
                    onClick={() => navigateLightbox(-1)}
                    aria-label="Previous item"
                    className="inline-flex h-11 w-11 items-center justify-center border border-[#C5A46D]/45 bg-white/10 text-[#FAF8F4] hover:border-[#C5A46D] cursor-pointer"
                    style={{ borderRadius: 'var(--radius-btn)' }}
                  >
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </motion.button>
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.94 }}
                    onClick={() => navigateLightbox(1)}
                    aria-label="Next item"
                    className="inline-flex h-11 w-11 items-center justify-center border border-[#C5A46D]/45 bg-white/10 text-[#FAF8F4] hover:border-[#C5A46D] cursor-pointer"
                    style={{ borderRadius: 'var(--radius-btn)' }}
                  >
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
