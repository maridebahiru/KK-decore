import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { GoldGradientFallback } from './MediaPrimitives';

export interface InfiniteSpiralItem {
  id?: string;
  src: string;
  webpSrc?: string;
  alt: string;
  title?: string;
  subtitle?: string;
  category?: string;
  width?: number;
  height?: number;
  icon?: React.ReactNode;
}

export interface InfiniteSpiralProps {
  items: InfiniteSpiralItem[];
  animationMode?: 'all' | 'horizontal' | 'vertical' | 'scroll';
  speed?: number;
  radius?: number;
  cardWidth?: number;
  cardHeight?: number;
  verticalSpacing?: number;
  perspective?: number;
  cardRadius?: number;
  centerScale?: number;
  edgeBlur?: number;
  cardsPerTurn?: number;
  pauseOnHover?: boolean;
  className?: string;
}

interface SpiralCardMediaProps {
  item: InfiniteSpiralItem;
}

const SpiralCardMedia: React.FC<SpiralCardMediaProps> = ({ item }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !item.src) {
    return (
      <div role="img" aria-label={item.alt} className="h-full w-full">
        <GoldGradientFallback title={item.title} category={item.category} />
      </div>
    );
  }

  return (
    <picture className="block h-full w-full pointer-events-none">
      {item.webpSrc && <source srcSet={item.webpSrc} type="image/webp" />}
      <img
        src={item.src}
        alt={item.alt}
        width={item.width ?? 1200}
        height={item.height ?? 900}
        loading="lazy"
        decoding="async"
        draggable={false}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="h-full w-full object-cover"
      />
    </picture>
  );
};

export const InfiniteSpiral: React.FC<InfiniteSpiralProps> = ({
  items,
  animationMode = 'all',
  speed = 0.55,
  radius = 170,
  cardWidth = 100,
  cardHeight = 100,
  verticalSpacing = 60,
  perspective = 1000,
  cardRadius = 10,
  centerScale = 1.2,
  edgeBlur = 6,
  cardsPerTurn = 7,
  pauseOnHover = true,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();

  const [isHovered, setIsHovered] = useState(false);
  const [inView, setInView] = useState(true);
  const [activeItemIdx, setActiveItemIdx] = useState(0);

  const phaseRef = useRef(0);
  const targetPhaseRef = useRef<number | null>(null);
  const dragRef = useRef({ active: false, startX: 0, startY: 0, startPhase: 0 });
  const stageSizeRef = useRef({ width: 640, height: 600 });
  const activeIdxRef = useRef(0);

  // Build enough virtual slots to fill vertical bounds seamlessly without wrap pops
  const virtualSlots = useMemo(() => {
    if (items.length === 0) return [];
    const minSlots = Math.max(items.length * 2, 18);
    const repeats = Math.ceil(minSlots / items.length);
    const result: { item: InfiniteSpiralItem; itemIndex: number; slotIndex: number }[] = [];
    let slotIndex = 0;
    for (let r = 0; r < repeats; r++) {
      for (let i = 0; i < items.length; i++) {
        result.push({ item: items[i], itemIndex: i, slotIndex });
        slotIndex++;
      }
    }
    return result;
  }, [items]);

  const totalSlots = virtualSlots.length;
  const angleStep = (Math.PI * 2) / Math.max(1, cardsPerTurn);

  // Track stage size for responsive radius clamping on mobile viewports
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      stageSizeRef.current = {
        width: rect.width || 640,
        height: rect.height || 600,
      };
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Pause animation loop when scrolled off-screen
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stepBy = useCallback(
    (delta: number) => {
      const current = targetPhaseRef.current ?? phaseRef.current;
      targetPhaseRef.current = Math.round(current) + delta;
    },
    []
  );

  // Direct DOM 60fps spiral transform loop (zero React re-renders per frame)
  useEffect(() => {
    if (totalSlots === 0) return;

    let rafId = 0;
    let lastTime = performance.now();

    const updatePositions = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      const shouldAutoRun =
        !prefersReducedMotion &&
        inView &&
        !(pauseOnHover && isHovered) &&
        !dragRef.current.active &&
        animationMode !== 'scroll';

      if (targetPhaseRef.current !== null) {
        const diff = targetPhaseRef.current - phaseRef.current;
        if (Math.abs(diff) < 0.004) {
          phaseRef.current = targetPhaseRef.current;
          targetPhaseRef.current = null;
        } else {
          phaseRef.current += diff * Math.min(1, dt * 8);
        }
      } else if (shouldAutoRun) {
        phaseRef.current += dt * speed;
      }

      const { width: stageW, height: stageH } = stageSizeRef.current;
      const maxMobileRadius = Math.max(72, (stageW - cardWidth) * 0.44);
      const effectiveRadius = Math.min(radius, maxMobileRadius);

      let closestSlotDist = Infinity;
      let closestItemIndex = activeIdxRef.current;

      for (let i = 0; i < totalSlots; i++) {
        const el = slotRefs.current[i];
        if (!el) continue;

        let rel = ((i - phaseRef.current) % totalSlots + totalSlots) % totalSlots;
        if (rel > totalSlots / 2) rel -= totalSlots;

        const theta =
          animationMode === 'vertical' ? 0 : rel * angleStep;

        const x =
          animationMode === 'vertical' ? 0 : Math.sin(theta) * effectiveRadius;
        const y =
          animationMode === 'horizontal'
            ? Math.sin(theta * 0.5) * (verticalSpacing * 0.25)
            : rel * verticalSpacing;
        const z =
          animationMode === 'vertical' ? 0 : Math.cos(theta) * effectiveRadius;

        const depthNorm = (Math.cos(theta) + 1) * 0.5; // 0 = back, 1 = front
        const vDist = Math.min(1, Math.abs(y) / Math.max(160, stageH * 0.54));

        // Track front-center card
        const centerProximity = Math.abs(rel);
        if (centerProximity < closestSlotDist) {
          closestSlotDist = centerProximity;
          closestItemIndex = virtualSlots[i].itemIndex;
        }

        const frontCenterWeight = Math.max(0, depthNorm - 0.45) / 0.55;
        const scale =
          0.66 +
          depthNorm * 0.34 +
          frontCenterWeight * (1 - vDist * 0.75) * Math.max(0, centerScale - 1);

        const blurPx =
          (1 - depthNorm * (1 - vDist * 0.55)) * Math.max(0, edgeBlur);

        const edgeFade = vDist > 0.75 ? Math.max(0, 1 - (vDist - 0.75) / 0.25) : 1;
        const opacity = (0.35 + depthNorm * 0.65) * edgeFade;

        const rotateY = animationMode === 'vertical' ? 0 : -Math.sin(theta) * 20;

        el.style.transform = `translate3d(calc(-50% + ${x.toFixed(2)}px), calc(-50% + ${y.toFixed(2)}px), ${z.toFixed(2)}px) rotateY(${rotateY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        el.style.opacity = opacity.toFixed(3);
        el.style.filter = blurPx > 0.15 ? `blur(${blurPx.toFixed(2)}px)` : 'none';
        el.style.zIndex = String(Math.round(depthNorm * 100));
        el.style.pointerEvents = edgeFade < 0.08 ? 'none' : 'auto';
      }

      if (closestItemIndex !== activeIdxRef.current) {
        activeIdxRef.current = closestItemIndex;
        setActiveItemIdx(closestItemIndex);
      }

      if (inView && !prefersReducedMotion) {
        rafId = requestAnimationFrame(updatePositions);
      }
    };

    rafId = requestAnimationFrame(updatePositions);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [
    totalSlots,
    virtualSlots,
    angleStep,
    animationMode,
    speed,
    radius,
    cardWidth,
    verticalSpacing,
    centerScale,
    edgeBlur,
    pauseOnHover,
    isHovered,
    inView,
    prefersReducedMotion,
  ]);

  // Support scroll-linked mode if requested
  useEffect(() => {
    if (animationMode !== 'scroll') return;
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      phaseRef.current = progress * items.length;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [animationMode, items.length]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('[data-spiral-control]')) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startY: e.clientY,
      startPhase: phaseRef.current,
    };
    targetPhaseRef.current = null;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    phaseRef.current = dragRef.current.startPhase - (dy * 0.015 + dx * 0.012);
  };

  const handlePointerUp = () => {
    dragRef.current.active = false;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      stepBy(1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      stepBy(-1);
    }
  };

  if (items.length === 0) return null;

  const activeItem = items[activeItemIdx] ?? items[0];

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      role="region"
      aria-label="Interactive 3D services spiral"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => {
        if (pauseOnHover) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (pauseOnHover) setIsHovered(false);
        handlePointerUp();
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`relative h-full w-full overflow-hidden select-none touch-pan-y cursor-grab active:cursor-grabbing focus-visible:outline-2 focus-visible:outline-[var(--accent)] ${className}`}
      style={{ perspective: `${perspective}px` }}
    >
      {/* Subtle Radial Champagne Spotlight Behind Spiral Core */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, color-mix(in srgb, var(--accent-2) 18%, transparent) 0%, transparent 62%)',
        }}
      />

      {/* 3D Cylindrical Helix Axis */}
      <div
        className="relative h-full w-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {virtualSlots.map(({ item, slotIndex }) => (
          <button
            key={`${item.id ?? item.title ?? 'item'}-${slotIndex}`}
            ref={(el) => {
              slotRefs.current[slotIndex] = el;
            }}
            type="button"
            onClick={() => {
              let rel =
                ((slotIndex - phaseRef.current) % totalSlots + totalSlots) % totalSlots;
              if (rel > totalSlots / 2) rel -= totalSlots;
              targetPhaseRef.current = phaseRef.current + rel;
            }}
            aria-label={item.title ? `${item.subtitle ? `${item.subtitle} ` : ''}${item.title}` : item.alt}
            className="group absolute left-1/2 top-1/2 overflow-hidden border border-[var(--accent-2)]/65 bg-[#1A0D12] shadow-[var(--shadow)] transition-colors hover:border-[var(--accent-2)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent-2)]"
            style={{
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,
              borderRadius: `${cardRadius}px`,
              willChange: 'transform, opacity, filter',
            }}
          >
            <SpiralCardMedia item={item} />

            {/* Subtle Dark Gradient & Icon Overlay */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent"
            />
            {(item.icon || item.subtitle) && (
              <div className="pointer-events-none absolute inset-x-1.5 bottom-1.5 flex items-center justify-between gap-1 text-[#FAF8F4]">
                {item.icon && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/55 backdrop-blur-sm">
                    {item.icon}
                  </span>
                )}
                {item.subtitle && (
                  <span className="font-display text-[11px] font-semibold text-[#C5A46D] tabular-nums">
                    {item.subtitle}
                  </span>
                )}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Bottom Glassmorphic Active Service Readout & Prev/Next Controls */}
      <div
        data-spiral-control
        className="pointer-events-none absolute inset-x-0 bottom-4 z-[120] flex items-center justify-between gap-3 px-3 sm:px-6"
      >
        <motion.div
          key={activeItemIdx}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24 }}
          className="pointer-events-auto flex min-w-0 items-center gap-3 border border-[var(--border-strong)] bg-[var(--surface)]/88 px-4 py-2.5 backdrop-blur-md shadow-[var(--shadow)]"
          style={{ borderRadius: 'var(--radius-btn)' }}
        >
          {activeItem.subtitle && (
            <span className="font-display text-sm font-semibold text-[var(--accent)] tabular-nums shrink-0">
              {activeItem.subtitle}
            </span>
          )}
          <span className="h-3.5 w-[1px] bg-[var(--border-strong)] shrink-0" aria-hidden="true" />
          <span className="truncate font-display text-base sm:text-lg font-semibold text-[var(--text)]">
            {activeItem.title ?? activeItem.alt}
          </span>
        </motion.div>

        <div className="pointer-events-auto flex items-center gap-2 shrink-0">
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => stepBy(-1)}
            aria-label="Previous service"
            className="inline-flex h-11 w-11 items-center justify-center border border-[var(--border-strong)] bg-[var(--surface)]/90 text-[var(--accent)] backdrop-blur-md hover:border-[var(--accent-2)] hover:bg-[var(--accent)] hover:text-[var(--accent-text)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            style={{ borderRadius: 'var(--radius-btn)' }}
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </motion.button>
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => stepBy(1)}
            aria-label="Next service"
            className="inline-flex h-11 w-11 items-center justify-center border border-[var(--border-strong)] bg-[var(--surface)]/90 text-[var(--accent)] backdrop-blur-md hover:border-[var(--accent-2)] hover:bg-[var(--accent)] hover:text-[var(--accent-text)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
            style={{ borderRadius: 'var(--radius-btn)' }}
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default InfiniteSpiral;
