import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GoldGradientFallback } from './MediaPrimitives';

export interface FlexCarouselItem {
  id?: string;
  src: string;
  webpSrc?: string;
  alt: string;
  title: string;
  subtitle?: string;
  category?: string;
  width?: number;
  height?: number;
  icon?: React.ReactNode;
}

export interface FlexCarouselProps {
  items: FlexCarouselItem[];
  preset?: 'liquid' | 'smooth' | 'snappy';
  intro?: 'rise' | 'fade' | 'none';
  cardHeight?: number;
  gap?: number;
  squeeze?: number;
  focusOnClick?: boolean;
  captions?: boolean;
  initialActiveIndex?: number;
  className?: string;
}

const PRESET_SPRINGS = {
  liquid: { type: 'spring' as const, stiffness: 210, damping: 26, mass: 0.9 },
  smooth: { type: 'spring' as const, stiffness: 170, damping: 28, mass: 1.0 },
  snappy: { type: 'spring' as const, stiffness: 320, damping: 30, mass: 0.75 },
};

interface CarouselCardMediaProps {
  item: FlexCarouselItem;
  isActive: boolean;
}

const CarouselCardMedia: React.FC<CarouselCardMediaProps> = ({ item, isActive }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !item.src) {
    return (
      <div role="img" aria-label={item.alt} className="h-full w-full">
        <GoldGradientFallback title={item.title} category={item.category} />
      </div>
    );
  }

  return (
    <picture className="block h-full w-full">
      {item.webpSrc && <source srcSet={item.webpSrc} type="image/webp" />}
      <img
        src={item.src}
        alt={item.alt}
        width={item.width ?? 1200}
        height={item.height ?? 900}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={`h-full w-full object-cover transition-transform duration-700 ease-out ${
          isActive ? 'scale-[1.03]' : 'scale-100 group-hover:scale-[1.05]'
        }`}
      />
    </picture>
  );
};

export const FlexCarousel: React.FC<FlexCarouselProps> = ({
  items,
  preset = 'liquid',
  intro = 'rise',
  cardHeight = 0.5,
  gap = 12,
  squeeze = 0.2,
  focusOnClick = true,
  captions = true,
  initialActiveIndex = 0,
  className = '',
}) => {
  const safeInitial =
    items.length > 0 ? Math.min(Math.max(0, initialActiveIndex), items.length - 1) : 0;
  const [activeIndex, setActiveIndex] = useState<number>(safeInitial);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const mobileCardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const springConfig = prefersReducedMotion
    ? { duration: 0.01 }
    : PRESET_SPRINGS[preset];

  const clampedCardHeight = Math.min(0.92, Math.max(0.32, cardHeight));
  const clampedSqueeze = Math.min(0.55, Math.max(0, squeeze));

  const goTo = useCallback(
    (nextIndex: number) => {
      if (items.length === 0) return;
      const wrapped = (nextIndex + items.length) % items.length;
      setActiveIndex(wrapped);

      const mobileEl = mobileCardRefs.current[wrapped];
      if (mobileEl && mobileTrackRef.current && window.innerWidth < 1024) {
        mobileEl.scrollIntoView({
          behavior: prefersReducedMotion ? 'auto' : 'smooth',
          inline: 'center',
          block: 'nearest',
        });
      }
    },
    [items.length, prefersReducedMotion]
  );

  useEffect(() => {
    setActiveIndex((prev) => (items.length === 0 ? 0 : Math.min(prev, items.length - 1)));
  }, [items.length]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(activeIndex + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(activeIndex - 1);
    }
  };

  if (items.length === 0) return null;

  const activeItem = items[activeIndex];
  const restingHeightPct = `${Math.round(clampedCardHeight * 100)}%`;
  const hoveredHeightPct = `${Math.round(Math.min(0.9, clampedCardHeight + 0.16) * 100)}%`;
  const activeHeightPct = '94%';
  const inactiveFlex = Math.max(0.45, Number((1 - clampedSqueeze).toFixed(2)));
  const activeFlex = items.length <= 4 ? 3.2 : 5.2;

  return (
    <div
      onKeyDown={handleKeyDown}
      className={`relative flex h-full w-full flex-col justify-between select-none ${className}`}
    >
      {/* Desktop (lg+): Liquid Flex Stage */}
      <div
        role="listbox"
        aria-label="Interactive showcase carousel"
        className="hidden lg:flex flex-1 min-h-0 w-full items-center overflow-hidden"
        style={{ gap: `${gap}px` }}
      >
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;
          const isHovered = idx === hoveredIndex;
          const targetHeight = isActive
            ? activeHeightPct
            : isHovered
              ? hoveredHeightPct
              : restingHeightPct;

          const targetFlexGrow = isActive
            ? activeFlex
            : isHovered
              ? Number((inactiveFlex + 0.45).toFixed(2))
              : inactiveFlex;

          return (
            <motion.button
              key={item.id ?? `${item.title}-${idx}`}
              type="button"
              role="option"
              aria-selected={isActive}
              aria-label={`${item.subtitle ? `${item.subtitle} ` : ''}${item.title}`}
              onClick={() => {
                if (focusOnClick) goTo(idx);
              }}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => {
                if (focusOnClick) setActiveIndex(idx);
              }}
              initial={
                prefersReducedMotion || intro === 'none'
                  ? { opacity: 1, y: 0 }
                  : intro === 'rise'
                    ? { opacity: 0, y: 44 }
                    : { opacity: 0 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              animate={{
                flexGrow: targetFlexGrow,
                height: targetHeight,
              }}
              transition={{
                ...springConfig,
                opacity: { duration: 0.38, delay: intro === 'none' ? 0 : idx * 0.035 },
                y: { duration: 0.55, delay: intro === 'none' ? 0 : idx * 0.04, ease: [0.16, 1, 0.3, 1] },
              }}
              className={`group relative min-w-[54px] basis-0 overflow-hidden border text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${
                isActive
                  ? 'border-[var(--accent-2)] shadow-[var(--shadow)]'
                  : 'border-[var(--border-strong)] hover:border-[var(--accent-2)]'
              }`}
              style={{ borderRadius: 'var(--radius)' }}
            >
              <CarouselCardMedia item={item} isActive={isActive} />

              {/* Scrim for AA text contrast */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
                  isActive
                    ? 'bg-gradient-to-t from-black/88 via-black/30 to-black/15 opacity-100'
                    : 'bg-gradient-to-t from-black/80 via-black/35 to-black/25 opacity-90 group-hover:opacity-75'
                }`}
              />

              {/* Top Icon & Number Strip */}
              <div className="relative z-10 flex h-full flex-col justify-between p-3.5 sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  {item.icon ? (
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center border backdrop-blur-md transition-colors ${
                        isActive
                          ? 'border-[#C5A46D] bg-[#541C2B]/80 text-[#C5A46D]'
                          : 'border-[#C5A46D]/45 bg-black/45 text-[#C5A46D]'
                      }`}
                      style={{ borderRadius: 'calc(var(--radius) * 0.65)' }}
                    >
                      {item.icon}
                    </span>
                  ) : (
                    <span />
                  )}

                  {item.subtitle && (
                    <span className="font-display text-sm font-semibold text-[#C5A46D] tabular-nums">
                      {item.subtitle}
                    </span>
                  )}
                </div>

                {/* Captions */}
                {captions && (
                  <div className="min-w-0">
                    {isActive ? (
                      <motion.div
                        key={`caption-${idx}`}
                        initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      >
                        {item.subtitle && (
                          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C5A46D]">
                            {item.category ?? item.subtitle}
                          </p>
                        )}
                        <h3 className="mt-1 font-display text-2xl xl:text-3xl font-semibold leading-tight text-[#FAF8F4]">
                          {item.title}
                        </h3>
                      </motion.div>
                    ) : (
                      <p className="truncate font-display text-xs font-medium tracking-wide text-[#FAF8F4]/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        {item.title}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Mobile / Tablet (< lg): Smooth Snap Horizontal Liquid Track */}
      <div
        ref={mobileTrackRef}
        role="listbox"
        aria-label="Interactive showcase carousel"
        className="flex lg:hidden flex-1 min-h-0 w-full items-center overflow-x-auto snap-x snap-mandatory px-1 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ gap: `${gap}px` }}
      >
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;
          const mobileHeight = isActive
            ? '92%'
            : `${Math.round(Math.max(0.7, clampedCardHeight + 0.18) * 100)}%`;

          return (
            <motion.button
              key={`mobile-${item.id ?? item.title}-${idx}`}
              ref={(el) => {
                mobileCardRefs.current[idx] = el;
              }}
              type="button"
              role="option"
              aria-selected={isActive}
              aria-label={`${item.subtitle ? `${item.subtitle} ` : ''}${item.title}`}
              onClick={() => {
                if (focusOnClick) goTo(idx);
              }}
              initial={
                prefersReducedMotion || intro === 'none'
                  ? { opacity: 1, y: 0 }
                  : intro === 'rise'
                    ? { opacity: 0, y: 32 }
                    : { opacity: 0 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              animate={{
                height: mobileHeight,
              }}
              transition={springConfig}
              className={`group relative shrink-0 snap-center overflow-hidden border text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${
                isActive
                  ? 'w-[76vw] sm:w-[48vw] border-[var(--accent-2)] shadow-[var(--shadow)]'
                  : 'w-[60vw] sm:w-[36vw] border-[var(--border-strong)]'
              }`}
              style={{ borderRadius: 'var(--radius)' }}
            >
              <CarouselCardMedia item={item} isActive={isActive} />

              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/88 via-black/30 to-black/15"
              />

              <div className="relative z-10 flex h-full flex-col justify-between p-4 sm:p-5">
                <div className="flex items-center justify-between gap-2">
                  {item.icon ? (
                    <span
                      className="flex h-10 w-10 items-center justify-center border border-[#C5A46D]/50 bg-black/45 text-[#C5A46D] backdrop-blur-md"
                      style={{ borderRadius: 'calc(var(--radius) * 0.65)' }}
                    >
                      {item.icon}
                    </span>
                  ) : (
                    <span />
                  )}

                  {item.subtitle && (
                    <span className="font-display text-base font-semibold text-[#C5A46D] tabular-nums">
                      {item.subtitle}
                    </span>
                  )}
                </div>

                {captions && (
                  <div className="min-w-0">
                    <h3 className="font-display text-xl sm:text-2xl font-semibold leading-tight text-[#FAF8F4]">
                      {item.title}
                    </h3>
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom Controls & Active Indicator */}
      <div className="mt-4 flex items-center justify-between gap-4 pt-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex min-w-0 items-center gap-2.5 text-xs"
          >
            <span className="font-display text-base font-semibold text-[var(--accent)] tabular-nums">
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(items.length).padStart(2, '0')}
            </span>
            <span className="h-3.5 w-[1px] bg-[var(--border-strong)]" aria-hidden="true" />
            <span className="truncate font-medium text-[var(--text)]">
              {activeItem.title}
            </span>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-2 shrink-0">
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous service"
            className="inline-flex h-11 w-11 items-center justify-center border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--accent)] hover:border-[var(--accent-2)] hover:bg-[var(--accent)] hover:text-[var(--accent-text)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            style={{ borderRadius: 'var(--radius-btn)' }}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next service"
            className="inline-flex h-11 w-11 items-center justify-center border border-[var(--border-strong)] bg-[var(--surface)] text-[var(--accent)] hover:border-[var(--accent-2)] hover:bg-[var(--accent)] hover:text-[var(--accent-text)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            style={{ borderRadius: 'var(--radius-btn)' }}
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default FlexCarousel;
