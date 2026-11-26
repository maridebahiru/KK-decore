import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { MoveHorizontal, Pause, Play } from 'lucide-react';
import { BEFORE_AFTER_MEDIA } from '../data/media';
import { AnimatedHeadingReveal, ClipRevealMask } from './MotionPrimitives';
import { ViewportVideo } from './MediaPrimitives';

interface VenueMotionSceneProps {
  variant: 'before' | 'after';
  paused: boolean;
}

const VenueMotionScene: React.FC<VenueMotionSceneProps> = ({ variant, paused }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    const startTime = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const drawScene = (now: number) => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      if (w <= 0 || h <= 0) {
        if (!paused && !prefersReducedMotion && inView) {
          rafId = requestAnimationFrame(drawScene);
        }
        return;
      }

      const dpr = canvas.width / w;
      const t = prefersReducedMotion ? 0.6 : (now - startTime) * 0.001;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Shared architectural vanishing geometry so Before & After align seamlessly
      const cx = w * 0.5;
      const stageW = w * 0.44;
      const stageH = h * 0.38;
      const stageLeft = cx - stageW / 2;
      const stageRight = cx + stageW / 2;
      const stageTop = h * 0.25;
      const stageBottom = stageTop + stageH;

      // 1. Backdrop Wall & Ceiling
      if (variant === 'before') {
        const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
        bgGrad.addColorStop(0, '#16181D');
        bgGrad.addColorStop(0.62, '#252830');
        bgGrad.addColorStop(1, '#121318');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);
      } else {
        const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
        bgGrad.addColorStop(0, '#2B0D16');
        bgGrad.addColorStop(0.55, '#541C2B');
        bgGrad.addColorStop(1, '#17090D');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);

        // Warm ambient golden bloom
        const bloom = ctx.createRadialGradient(cx, h * 0.34, 10, cx, h * 0.34, w * 0.52);
        bloom.addColorStop(0, 'rgba(232, 198, 134, 0.36)');
        bloom.addColorStop(0.55, 'rgba(197, 164, 109, 0.14)');
        bloom.addColorStop(1, 'rgba(84, 28, 43, 0)');
        ctx.fillStyle = bloom;
        ctx.fillRect(0, 0, w, h);
      }

      // 2. Perspective Floor
      ctx.beginPath();
      ctx.moveTo(0, h);
      ctx.lineTo(stageLeft, stageBottom);
      ctx.lineTo(stageRight, stageBottom);
      ctx.lineTo(w, h);
      ctx.closePath();
      const floorGrad = ctx.createLinearGradient(0, stageBottom, 0, h);
      if (variant === 'before') {
        floorGrad.addColorStop(0, '#1C1E24');
        floorGrad.addColorStop(1, '#2D3038');
      } else {
        floorGrad.addColorStop(0, '#271117');
        floorGrad.addColorStop(1, '#12080B');
      }
      ctx.fillStyle = floorGrad;
      ctx.fill();

      // Floor grid / aisle lines
      ctx.strokeStyle =
        variant === 'before' ? 'rgba(255,255,255,0.08)' : 'rgba(197,164,109,0.22)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 6; i++) {
        const frac = i / 6;
        const topX = stageLeft + stageW * frac;
        const botX = w * frac;
        ctx.beginPath();
        ctx.moveTo(topX, stageBottom);
        ctx.lineTo(botX, h);
        ctx.stroke();
      }
      for (let r = 1; r <= 4; r++) {
        const p = r / 5;
        const yLine = stageBottom + (h - stageBottom) * (p * p);
        const inset = (1 - p * p) * stageLeft;
        ctx.beginPath();
        ctx.moveTo(inset, yLine);
        ctx.lineTo(w - inset, yLine);
        ctx.stroke();
      }

      // 3. Perspective Side Walls & Columns
      const colPositions = [
        { x: w * 0.12, scale: 1 },
        { x: w * 0.24, scale: 0.72 },
        { x: w * 0.76, scale: 0.72 },
        { x: w * 0.88, scale: 1 },
      ];

      colPositions.forEach((col) => {
        const colW = w * 0.038 * col.scale;
        const topY = h * (0.14 + (1 - col.scale) * 0.14);
        const botY = h * (0.94 - (1 - col.scale) * 0.26);

        ctx.fillStyle = variant === 'before' ? '#2B2E36' : '#3E1622';
        ctx.fillRect(col.x - colW / 2, topY, colW, botY - topY);

        if (variant === 'after') {
          ctx.strokeStyle = 'rgba(197, 164, 109, 0.55)';
          ctx.lineWidth = 1.2;
          ctx.strokeRect(col.x - colW / 2, topY, colW, botY - topY);
        }
      });

      // 4. Back Stage Wall & Dais
      ctx.fillStyle = variant === 'before' ? '#21242B' : '#31101A';
      ctx.fillRect(stageLeft, stageTop, stageW, stageH);
      ctx.strokeStyle =
        variant === 'before' ? 'rgba(255,255,255,0.12)' : 'rgba(197,164,109,0.5)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(stageLeft, stageTop, stageW, stageH);

      // Dais platform
      ctx.fillStyle = variant === 'before' ? '#313540' : '#FAF3E6';
      ctx.fillRect(stageLeft + stageW * 0.08, stageBottom - h * 0.04, stageW * 0.84, h * 0.04);

      if (variant === 'before') {
        // Sweeping architectural work spotlight beam on empty hall
        const sweepX = cx + Math.sin(t * 0.8) * (w * 0.26);
        const beamGrad = ctx.createRadialGradient(sweepX, h * 0.55, 8, sweepX, h * 0.55, w * 0.28);
        beamGrad.addColorStop(0, 'rgba(215, 224, 240, 0.18)');
        beamGrad.addColorStop(1, 'rgba(215, 224, 240, 0)');
        ctx.fillStyle = beamGrad;
        ctx.fillRect(0, 0, w, h);

        // Exposed bare ceiling rafters
        ctx.strokeStyle = 'rgba(255,255,255,0.1)';
        ctx.lineWidth = 1.5;
        [0.15, 0.35, 0.65, 0.85].forEach((fx) => {
          ctx.beginPath();
          ctx.moveTo(w * fx, 0);
          ctx.lineTo(stageLeft + stageW * fx, stageTop);
          ctx.stroke();
        });
      } else {
        // Sweeping ivory ceiling chiffon canopy drapes (gently swaying)
        const sway = Math.sin(t * 1.1) * 5;
        const drapeAnchors = [0.05, 0.22, 0.38, 0.62, 0.78, 0.95];
        drapeAnchors.forEach((ax, idx) => {
          ctx.beginPath();
          ctx.moveTo(cx, h * 0.05);
          ctx.quadraticCurveTo(
            w * ((0.5 + ax) * 0.5),
            h * 0.18 + sway * (idx % 2 === 0 ? 1 : -1),
            w * ax,
            h * 0.14
          );
          ctx.strokeStyle = 'rgba(250, 244, 232, 0.38)';
          ctx.lineWidth = 2.2;
          ctx.stroke();
        });

        // Illuminated Central Crystal Chandelier
        const chandY = h * 0.14 + Math.sin(t * 1.4) * 1.5;
        const chandGlow = ctx.createRadialGradient(cx, chandY, 4, cx, chandY, w * 0.16);
        chandGlow.addColorStop(0, 'rgba(255, 248, 222, 0.92)');
        chandGlow.addColorStop(0.35, 'rgba(197, 164, 109, 0.45)');
        chandGlow.addColorStop(1, 'rgba(197, 164, 109, 0)');
        ctx.fillStyle = chandGlow;
        ctx.beginPath();
        ctx.arc(cx, chandY, w * 0.16, 0, Math.PI * 2);
        ctx.fill();

        // Chandelier tiers
        ctx.strokeStyle = '#E5C68A';
        ctx.lineWidth = 1.5;
        [0.055, 0.036, 0.02].forEach((rw, tier) => {
          ctx.beginPath();
          ctx.ellipse(cx, chandY + tier * 7, w * rw, 3.5, 0, 0, Math.PI * 2);
          ctx.stroke();
        });

        // Sweetheart Stage Gold Arches
        const archR = stageW * 0.26;
        const archCy = stageBottom - h * 0.04;
        ctx.strokeStyle = '#C5A46D';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(cx, archCy - stageH * 0.28, archR, Math.PI, 0);
        ctx.lineTo(cx + archR, archCy);
        ctx.moveTo(cx - archR, archCy - stageH * 0.28);
        ctx.lineTo(cx - archR, archCy);
        ctx.stroke();

        // Cascading Burgundy & Ivory Floral Clusters on Stage Arch
        const blooms = [
          { x: cx - archR, y: archCy - stageH * 0.32, r: 13, c: '#7D1E38' },
          { x: cx - archR * 0.82, y: archCy - stageH * 0.47, r: 15, c: '#FAF0DA' },
          { x: cx - archR * 0.45, y: archCy - stageH * 0.62, r: 12, c: '#C5A46D' },
          { x: cx, y: archCy - stageH * 0.68, r: 16, c: '#FAF0DA' },
          { x: cx + archR * 0.45, y: archCy - stageH * 0.62, r: 12, c: '#7D1E38' },
          { x: cx + archR * 0.82, y: archCy - stageH * 0.47, r: 15, c: '#FAF0DA' },
          { x: cx + archR, y: archCy - stageH * 0.32, r: 13, c: '#7D1E38' },
        ];
        blooms.forEach((b) => {
          ctx.fillStyle = b.c;
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r * (w / 1000 + 0.55), 0, Math.PI * 2);
          ctx.fill();
        });

        // Glowing Banquet Tables & Flickering Candlelight
        const tablePoints = [
          { x: w * 0.25, y: h * 0.78, r: w * 0.07 },
          { x: w * 0.75, y: h * 0.78, r: w * 0.07 },
          { x: w * 0.33, y: h * 0.69, r: w * 0.05 },
          { x: w * 0.67, y: h * 0.69, r: w * 0.05 },
        ];
        tablePoints.forEach((tb, idx) => {
          ctx.fillStyle = '#F8EFE0';
          ctx.beginPath();
          ctx.ellipse(tb.x, tb.y, tb.r, tb.r * 0.34, 0, 0, Math.PI * 2);
          ctx.fill();

          const flicker = 0.85 + Math.sin(t * 5.2 + idx * 1.7) * 0.15;
          const candleGlow = ctx.createRadialGradient(
            tb.x,
            tb.y - tb.r * 0.45,
            1,
            tb.x,
            tb.y - tb.r * 0.45,
            tb.r * 0.9 * flicker
          );
          candleGlow.addColorStop(0, 'rgba(255, 240, 190, 0.95)');
          candleGlow.addColorStop(0.5, 'rgba(197, 164, 109, 0.35)');
          candleGlow.addColorStop(1, 'rgba(197, 164, 109, 0)');
          ctx.fillStyle = candleGlow;
          ctx.beginPath();
          ctx.arc(tb.x, tb.y - tb.r * 0.45, tb.r * 0.9, 0, Math.PI * 2);
          ctx.fill();
        });

        // Floating Golden Ambient Motes
        for (let m = 0; m < 16; m++) {
          const px = w * ((0.12 + ((m * 0.173) % 0.76)) + Math.sin(t * 0.6 + m) * 0.015);
          const py = h * (1 - (((t * 0.06 + m * 0.09) % 0.85) + 0.08));
          const alpha = 0.25 + 0.45 * Math.abs(Math.sin(t * 1.3 + m));
          ctx.fillStyle = `rgba(229, 198, 138, ${alpha.toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(px, py, 2 + (m % 2), 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();

      if (!paused && !prefersReducedMotion && inView) {
        rafId = requestAnimationFrame(drawScene);
      }
    };

    rafId = requestAnimationFrame(drawScene);
    return () => {
      ro.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [variant, paused, prefersReducedMotion, inView]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="h-full w-full block"
    />
  );
};

export const BeforeAfterSection: React.FC = () => {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateFromClientX = (clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(96, Math.max(4, pct)));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('[data-slider-control]')) return;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateFromClientX(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPosition((p) => Math.max(4, p - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPosition((p) => Math.min(96, p + 5));
    }
  };

  return (
    <section
      id="transformation"
      className="kk-section border-b border-[var(--border)] bg-[var(--bg)]"
    >
      <div className="kk-container">
        <AnimatedHeadingReveal
          eyebrow="Before & After"
          title="Venue Transformation"
          className="max-w-lg"
        />

        <ClipRevealMask className="mt-10">
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative mx-auto aspect-[16/10] max-w-5xl overflow-hidden border border-[var(--border-strong)] bg-[#140B0E] shadow-[var(--shadow)] select-none touch-none cursor-ew-resize"
            style={{ borderRadius: 'var(--radius)' }}
          >
            {/* Base Video Layer: After */}
            <div className="absolute inset-0">
              <ViewportVideo
                asset={BEFORE_AFTER_MEDIA.after}
                paused={isPaused}
                fallbackNode={<VenueMotionScene variant="after" paused={isPaused} />}
              />
            </div>

            {/* Clipped Video Layer: Before */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <ViewportVideo
                asset={BEFORE_AFTER_MEDIA.before}
                paused={isPaused}
                fallbackNode={<VenueMotionScene variant="before" paused={isPaused} />}
              />
            </div>

            {/* Subtle Corner Labels */}
            <span className="pointer-events-none absolute left-4 top-4 border border-white/25 bg-black/55 px-3 py-1 text-xs font-semibold text-[#FAF8F4] backdrop-blur-md">
              Before
            </span>
            <span className="pointer-events-none absolute right-4 top-4 border border-[#C5A46D]/50 bg-[#541C2B]/80 px-3 py-1 text-xs font-semibold text-[#FAF8F4] backdrop-blur-md">
              After
            </span>

            {/* Play / Pause Button */}
            <button
              type="button"
              data-slider-control
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? 'Play transformation video' : 'Pause transformation video'}
              className="absolute bottom-4 right-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#C5A46D]/60 bg-black/60 text-[#FAF8F4] backdrop-blur-md hover:border-[#C5A46D] hover:bg-[#541C2B] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C5A46D]"
            >
              {isPaused ? (
                <Play className="h-4 w-4 ml-0.5 text-[#C5A46D]" aria-hidden="true" />
              ) : (
                <Pause className="h-4 w-4 text-[#C5A46D]" aria-hidden="true" />
              )}
            </button>

            {/* Vertical Divider & Interactive Handle */}
            <div
              role="slider"
              tabIndex={0}
              aria-label="Drag to compare before and after venue styling"
              aria-valuemin={4}
              aria-valuemax={96}
              aria-valuenow={Math.round(position)}
              onKeyDown={handleKeyDown}
              style={{ left: `${position}%` }}
              className="absolute inset-y-0 z-20 -translate-x-1/2 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[#C5A46D]"
            >
              <div className="h-full w-[2px] bg-[#C5A46D]" />
              <div className="absolute flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#C5A46D] bg-[#541C2B] text-[#FAF8F4] shadow-xl">
                <MoveHorizontal className="h-4 w-4" aria-hidden="true" />
              </div>
            </div>
          </div>
        </ClipRevealMask>
      </div>
    </section>
  );
};
