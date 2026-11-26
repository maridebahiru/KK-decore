import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { Play } from 'lucide-react';
import { GoldGradientFallback } from './MediaPrimitives';
import { useIsFinePointer } from './MotionPrimitives';

export interface DriftWallItem {
  id?: string;
  image: string;
  webpSrc?: string;
  alt?: string;
  title: string;
  category?: string;
  type?: 'image' | 'video';
  href?: string;
}

export interface DriftWallProps {
  items: DriftWallItem[];
  columns?: number;
  tileWidth?: number;
  tileHeight?: number;
  gap?: number;
  tilt?: number;
  turn?: number;
  perspective?: number;
  depth?: number;
  speed?: number;
  direction?: 'up' | 'down';
  variance?: number;
  parallax?: number;
  lift?: number;
  fade?: number;
  dim?: number;
  overlayColor?: string;
  onSelect?: (item: DriftWallItem) => void;
  className?: string;
}

interface DriftTileMediaProps {
  item: DriftWallItem;
  width: number;
  height: number;
}

const DriftTileMedia: React.FC<DriftTileMediaProps> = ({ item, width, height }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !item.image) {
    return (
      <div role="img" aria-label={item.alt ?? item.title} className="h-full w-full">
        <GoldGradientFallback title={item.title} category={item.category} />
      </div>
    );
  }

  return (
    <picture className="block h-full w-full pointer-events-none">
      {item.webpSrc && <source srcSet={item.webpSrc} type="image/webp" />}
      <img
        src={item.image}
        alt={item.alt ?? item.title}
        width={width}
        height={height}
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

export const DriftWall: React.FC<DriftWallProps> = ({
  items,
  columns = 5,
  tileWidth = 200,
  tileHeight = 132,
  gap = 18,
  tilt = 16,
  turn = -14,
  perspective = 1200,
  depth = 120,
  speed = 42,
  direction = 'up',
  variance = 0.45,
  parallax = 0.6,
  lift = 64,
  fade = 0.6,
  dim = 0.55,
  overlayColor = '#060010',
  onSelect,
  className = '',
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);
  const columnRefs = useRef<(HTMLDivElement | null)[]>([]);

  const prefersReducedMotion = useReducedMotion();
  const isFinePointer = useIsFinePointer();
  const [inView, setInView] = useState(true);
  const [hoveredTileKey, setHoveredTileKey] = useState<string | null>(null);

  const pointerTargetRef = useRef({ x: 0, y: 0 });
  const pointerSmoothRef = useRef({ x: 0, y: 0 });

  // Build deterministic per-column sequences + seamless doubled tracks
  const columnTracks = useMemo(() => {
    if (items.length === 0) return [];
    const safeCols = Math.max(1, columns);
    const minBaseCount = Math.max(7, items.length * 2);

    return Array.from({ length: safeCols }, (_, colIdx) => {
      const baseTiles: DriftWallItem[] = [];
      for (let i = 0; i < minBaseCount; i++) {
        baseTiles.push(items[(i + colIdx * 2) % items.length]);
      }

      const norm = safeCols === 1 ? 0 : colIdx / (safeCols - 1) - 0.5;
      const speedFactor = 1 + norm * variance * (colIdx % 2 === 0 ? 1 : -0.75);
      const colDepthZ = -Math.abs(norm) * depth + (colIdx % 2 === 0 ? depth * 0.25 : -depth * 0.15);
      const halfHeight = baseTiles.length * (tileHeight + gap);

      return {
        colIdx,
        baseTiles,
        doubledTiles: [...baseTiles, ...baseTiles],
        speedFactor: Math.max(0.35, speedFactor),
        colDepthZ,
        halfHeight,
        initialOffset: ((colIdx * 79) % Math.max(1, halfHeight)),
      };
    });
  }, [items, columns, tileHeight, gap, variance, depth]);

  // Pause animation loop when off-screen
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // 60fps direct-DOM vertical column drift + pointer parallax
  useEffect(() => {
    if (columnTracks.length === 0) return;

    const offsets = columnTracks.map((col) => col.initialOffset);
    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Smooth pointer parallax interpolation
      const ptrTarget = pointerTargetRef.current;
      const ptrSmooth = pointerSmoothRef.current;
      ptrSmooth.x += (ptrTarget.x - ptrSmooth.x) * Math.min(1, dt * 6);
      ptrSmooth.y += (ptrTarget.y - ptrSmooth.y) * Math.min(1, dt * 6);

      if (wallRef.current) {
        const pxTilt = prefersReducedMotion ? 0 : ptrSmooth.y * -6 * parallax;
        const pxTurn = prefersReducedMotion ? 0 : ptrSmooth.x * 8 * parallax;
        const pxShiftX = prefersReducedMotion ? 0 : ptrSmooth.x * -18 * parallax;
        const pxShiftY = prefersReducedMotion ? 0 : ptrSmooth.y * -12 * parallax;

        wallRef.current.style.transform = `translate3d(${pxShiftX.toFixed(2)}px, ${pxShiftY.toFixed(2)}px, 0px) rotateX(${(tilt + pxTilt).toFixed(2)}deg) rotateY(${(turn + pxTurn).toFixed(2)}deg) rotateZ(${(turn * 0.28).toFixed(2)}deg)`;
      }

      for (let c = 0; c < columnTracks.length; c++) {
        const track = columnTracks[c];
        const colEl = columnRefs.current[c];
        if (!colEl) continue;

        if (!prefersReducedMotion && inView) {
          offsets[c] =
            (offsets[c] + dt * speed * track.speedFactor) % track.halfHeight;
        }

        const y =
          direction === 'up'
            ? -offsets[c]
            : offsets[c] - track.halfHeight;

        colEl.style.transform = `translate3d(0px, ${y.toFixed(2)}px, ${track.colDepthZ.toFixed(2)}px)`;
      }

      if (inView && !prefersReducedMotion) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [
    columnTracks,
    speed,
    direction,
    tilt,
    turn,
    parallax,
    inView,
    prefersReducedMotion,
  ]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isFinePointer || prefersReducedMotion || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    pointerTargetRef.current = {
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
    };
  };

  const handlePointerLeave = () => {
    pointerTargetRef.current = { x: 0, y: 0 };
    setHoveredTileKey(null);
  };

  if (items.length === 0) return null;

  const clampedFade = Math.min(1, Math.max(0, fade));
  const clampedDim = Math.min(0.85, Math.max(0, dim));

  return (
    <div
      ref={stageRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={`relative h-full w-full overflow-hidden select-none ${className}`}
      style={{
        backgroundColor: overlayColor,
        perspective: `${perspective}px`,
      }}
    >
      {/* 3D Tilted & Turned Drift Wall */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          ref={wallRef}
          className="flex items-start justify-center"
          style={{
            gap: `${gap}px`,
            transformStyle: 'preserve-3d',
            transform: `rotateX(${tilt}deg) rotateY(${turn}deg) rotateZ(${turn * 0.28}deg)`,
            willChange: 'transform',
          }}
        >
          {columnTracks.map((col) => (
            <div
              key={`col-${col.colIdx}`}
              className="relative shrink-0"
              style={{
                width: `${tileWidth}px`,
                height: '1200px',
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                ref={(el) => {
                  columnRefs.current[col.colIdx] = el;
                }}
                className="flex flex-col"
                style={{
                  gap: `${gap}px`,
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                }}
              >
                {col.doubledTiles.map((item, tileIdx) => {
                  const tileKey = `${col.colIdx}-${tileIdx}-${item.id ?? item.title}`;
                  const isHovered = hoveredTileKey === tileKey;

                  const tileContent = (
                    <>
                      <DriftTileMedia
                        item={item}
                        width={tileWidth}
                        height={tileHeight}
                      />

                      {/* Ambient Dim Layer (clears on hover/focus) */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
                        style={{
                          backgroundColor: overlayColor,
                          opacity: isHovered ? 0.08 : clampedDim,
                        }}
                      />

                      {/* Title & Media Badge */}
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"
                      />

                      {item.type === 'video' && (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-[#C5A46D]/60 bg-black/55 text-[#C5A46D]"
                        >
                          <Play className="h-2.5 w-2.5 ml-0.5" />
                        </span>
                      )}

                      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-2.5 text-left">
                        {item.category && (
                          <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-[#C5A46D]">
                            {item.category}
                          </p>
                        )}
                        <p className="truncate font-display text-sm font-semibold leading-tight text-[#FAF8F4]">
                          {item.title}
                        </p>
                      </div>
                    </>
                  );

                  const sharedStyle: React.CSSProperties = {
                    width: `${tileWidth}px`,
                    height: `${tileHeight}px`,
                    borderRadius: 'calc(var(--radius) * 0.75)',
                    transform: isHovered
                      ? `translate3d(0, 0, ${lift}px) scale(1.06)`
                      : 'translate3d(0, 0, 0px) scale(1)',
                    transition:
                      'transform 320ms cubic-bezier(0.16, 1, 0.3, 1), border-color 220ms ease, box-shadow 320ms ease',
                    zIndex: isHovered ? 30 : 1,
                    boxShadow: isHovered
                      ? '0 24px 48px -12px rgba(0, 0, 0, 0.75)'
                      : '0 8px 20px -8px rgba(0, 0, 0, 0.45)',
                  };

                  const sharedClass = `relative block shrink-0 overflow-hidden border cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C5A46D] ${
                    isHovered
                      ? 'border-[#C5A46D]'
                      : 'border-[#C5A46D]/25'
                  }`;

                  if (item.href && !onSelect) {
                    return (
                      <a
                        key={tileKey}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={() => setHoveredTileKey(tileKey)}
                        onMouseLeave={() => setHoveredTileKey(null)}
                        onFocus={() => setHoveredTileKey(tileKey)}
                        onBlur={() => setHoveredTileKey(null)}
                        className={sharedClass}
                        style={sharedStyle}
                      >
                        {tileContent}
                      </a>
                    );
                  }

                  return (
                    <button
                      key={tileKey}
                      type="button"
                      onClick={() => onSelect?.(item)}
                      onMouseEnter={() => setHoveredTileKey(tileKey)}
                      onMouseLeave={() => setHoveredTileKey(null)}
                      onFocus={() => setHoveredTileKey(tileKey)}
                      onBlur={() => setHoveredTileKey(null)}
                      aria-label={`Open ${item.title} in lightbox`}
                      className={sharedClass}
                      style={sharedStyle}
                    >
                      {tileContent}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edge Vignette Fade Overlays (Top, Bottom, Left, Right) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32"
        style={{
          opacity: clampedFade + 0.35,
          background: `linear-gradient(to bottom, ${overlayColor} 0%, transparent 100%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-32"
        style={{
          opacity: clampedFade + 0.35,
          background: `linear-gradient(to top, ${overlayColor} 0%, transparent 100%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 sm:w-28"
        style={{
          opacity: clampedFade + 0.25,
          background: `linear-gradient(to right, ${overlayColor} 0%, transparent 100%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 sm:w-28"
        style={{
          opacity: clampedFade + 0.25,
          background: `linear-gradient(to left, ${overlayColor} 0%, transparent 100%)`,
        }}
      />
    </div>
  );
};

export default DriftWall;
