import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { useIsFinePointer } from './MotionPrimitives';

export interface MaskedHeadingProps {
  text: string;
  mediaType?: 'video' | 'image';
  src: string;
  poster?: string;
  fillScale?: number;
  parallax?: number;
  reveal?: 'scale' | 'fade' | 'slide';
  trigger?: 'view' | 'mount';
  spotlight?: boolean;
  spotlightRadius?: number;
  outline?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'div';
  className?: string;
  style?: React.CSSProperties;
}

interface WordMetrics {
  word: string;
  x: number;
  y: number;
  font: string;
  fontSize: number;
}

export const MaskedHeading: React.FC<MaskedHeadingProps> = ({
  text,
  mediaType = 'video',
  src,
  poster,
  fillScale = 1.3,
  parallax = 34,
  reveal = 'scale',
  trigger = 'view',
  spotlight = false,
  spotlightRadius = 180,
  outline = false,
  as = 'h1',
  className = '',
  style,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const textLayerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const posterImgRef = useRef<HTMLImageElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const mediaStateRef = useRef({
    videoReady: false,
    videoError: false,
    posterReady: false,
    posterError: false,
    imageReady: false,
    imageError: false,
  });

  const pointerRef = useRef({
    x: 0,
    y: 0,
    active: false,
    intensity: 0,
  });

  const parallaxRef = useRef(0);
  const metricsRef = useRef<{
    width: number;
    height: number;
    words: WordMetrics[];
  }>({ width: 0, height: 0, words: [] });

  const [canvasPainted, setCanvasPainted] = useState(false);
  const canvasPaintedRef = useRef(false);
  const drawOnceRef = useRef<(() => void) | null>(null);
  const [inView, setInView] = useState(true);

  const prefersReducedMotion = useReducedMotion();
  const isFinePointer = useIsFinePointer();
  const words = text.trim().split(/\s+/);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start end', 'end start'],
  });

  const effectiveParallax = prefersReducedMotion ? 0 : parallax;
  const parallaxMotion = useTransform(
    scrollYProgress,
    [0, 1],
    [-effectiveParallax, effectiveParallax]
  );

  useEffect(() => {
    const unsubscribe = parallaxMotion.on('change', (latest) => {
      parallaxRef.current = latest;
    });
    return () => unsubscribe();
  }, [parallaxMotion]);

  // Pause rendering / video playback when scrolled off-screen
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Load media element(s) off-DOM without polluting layout
  useEffect(() => {
    mediaStateRef.current = {
      videoReady: false,
      videoError: false,
      posterReady: false,
      posterError: false,
      imageReady: false,
      imageError: false,
    };

    let videoEl: HTMLVideoElement | null = null;
    let posterEl: HTMLImageElement | null = null;
    let imgEl: HTMLImageElement | null = null;

    if (mediaType === 'video') {
      videoEl = document.createElement('video');
      videoEl.src = src;
      videoEl.muted = true;
      videoEl.loop = true;
      videoEl.playsInline = true;
      videoEl.preload = 'auto';
      videoEl.crossOrigin = 'anonymous';
      if (poster) {
        videoEl.poster = poster;
      }

      const handleCanPlay = () => {
        mediaStateRef.current.videoReady = true;
        if (!prefersReducedMotion && inView) {
          videoEl?.play().catch(() => {
            // Autoplay blocked by policy; poster or fallback still renders cleanly.
          });
        }
      };
      const handleError = () => {
        mediaStateRef.current.videoError = true;
      };

      videoEl.addEventListener('canplay', handleCanPlay);
      videoEl.addEventListener('loadeddata', handleCanPlay);
      videoEl.addEventListener('error', handleError);
      videoRef.current = videoEl;

      if (poster) {
        posterEl = new Image();
        posterEl.crossOrigin = 'anonymous';
        posterEl.onload = () => {
          mediaStateRef.current.posterReady = true;
        };
        posterEl.onerror = () => {
          mediaStateRef.current.posterError = true;
        };
        posterEl.src = poster;
        posterImgRef.current = posterEl;
      }

      return () => {
        if (videoEl) {
          videoEl.removeEventListener('canplay', handleCanPlay);
          videoEl.removeEventListener('loadeddata', handleCanPlay);
          videoEl.removeEventListener('error', handleError);
          videoEl.pause();
          videoEl.removeAttribute('src');
          videoEl.load();
        }
        videoRef.current = null;
        posterImgRef.current = null;
      };
    }

    imgEl = new Image();
    imgEl.crossOrigin = 'anonymous';
    imgEl.onload = () => {
      mediaStateRef.current.imageReady = true;
    };
    imgEl.onerror = () => {
      mediaStateRef.current.imageError = true;
    };
    imgEl.src = src;
    imageRef.current = imgEl;

    return () => {
      imageRef.current = null;
    };
  }, [mediaType, src, poster, prefersReducedMotion]);

  // Play / pause video with intersection visibility
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || mediaStateRef.current.videoError) return;
    if (inView && !prefersReducedMotion) {
      videoEl.play().catch(() => {});
    } else {
      videoEl.pause();
    }
  }, [inView, prefersReducedMotion]);

  // Measure DOM word spans so canvas text matches responsive CSS wrap & typography exactly
  useEffect(() => {
    const measure = () => {
      const textEl = textLayerRef.current;
      const canvas = canvasRef.current;
      if (!textEl || !canvas) return;

      const containerRect = textEl.getBoundingClientRect();
      if (containerRect.width <= 0 || containerRect.height <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.max(1, Math.round(containerRect.width * dpr));
      const targetH = Math.max(1, Math.round(containerRect.height * dpr));

      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
      }

      const nextWords: WordMetrics[] = [];
      wordRefs.current.forEach((span, idx) => {
        if (!span) return;
        const rect = span.getBoundingClientRect();
        const computed = window.getComputedStyle(span);
        const fontSize = parseFloat(computed.fontSize) || 48;
        const font = `${computed.fontStyle} ${computed.fontWeight} ${computed.fontSize} ${computed.fontFamily}`;

        nextWords.push({
          word: words[idx] || '',
          x: rect.left - containerRect.left,
          y: rect.top - containerRect.top + rect.height * 0.52,
          font,
          fontSize,
        });
      });

      metricsRef.current = {
        width: containerRect.width,
        height: containerRect.height,
        words: nextWords,
      };
      drawOnceRef.current?.();
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (textLayerRef.current) {
      ro.observe(textLayerRef.current);
    }

    let cancelled = false;
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) measure();
      });
    }

    window.addEventListener('resize', measure, { passive: true });
    const styleObserver = new MutationObserver(() => {
      requestAnimationFrame(measure);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          if (!cancelled) measure();
        });
      }
    });
    styleObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-style'],
    });

    return () => {
      cancelled = true;
      ro.disconnect();
      styleObserver.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [text]);

  // Render loop for video/image/luxury-gold masked typography + spotlight + outline
  useEffect(() => {
    let rafId = 0;
    let startTime = performance.now();

    const drawFrame = (now: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const { width, height, words: measuredWords } = metricsRef.current;

      if (canvas && ctx && width > 0 && height > 0 && measuredWords.length > 0) {
        const dpr = canvas.width / width;
        const elapsed = (now - startTime) * 0.001;

        ctx.save();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, width, height);

        // Step 1: Draw typography mask shape
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        for (let i = 0; i < measuredWords.length; i++) {
          const item = measuredWords[i];
          ctx.font = item.font;
          ctx.fillText(item.word, item.x, item.y);
        }

        // Step 2: Composite media / fallback inside letterforms
        ctx.globalCompositeOperation = 'source-in';

        const state = mediaStateRef.current;
        const videoEl = videoRef.current;
        const posterEl = posterImgRef.current;
        const imageEl = imageRef.current;

        const hasLiveVideo =
          mediaType === 'video' &&
          videoEl &&
          state.videoReady &&
          !state.videoError &&
          videoEl.readyState >= 2 &&
          videoEl.videoWidth > 0;

        const hasPoster =
          mediaType === 'video' &&
          posterEl &&
          state.posterReady &&
          !state.posterError &&
          posterEl.naturalWidth > 0;

        const hasImage =
          mediaType === 'image' &&
          imageEl &&
          state.imageReady &&
          !state.imageError &&
          imageEl.naturalWidth > 0;

        const yShift = parallaxRef.current;

        if (hasLiveVideo && videoEl) {
          const baseScale =
            Math.max(width / videoEl.videoWidth, height / videoEl.videoHeight) *
            fillScale;
          const drawW = videoEl.videoWidth * baseScale;
          const drawH = videoEl.videoHeight * baseScale;
          const dx = (width - drawW) / 2;
          const dy = (height - drawH) / 2 + yShift;
          ctx.drawImage(videoEl, dx, dy, drawW, drawH);
        } else if (hasPoster && posterEl) {
          const kenBurns = prefersReducedMotion ? 1 : 1 + Math.sin(elapsed * 0.35) * 0.03;
          const baseScale =
            Math.max(width / posterEl.naturalWidth, height / posterEl.naturalHeight) *
            fillScale *
            kenBurns;
          const drawW = posterEl.naturalWidth * baseScale;
          const drawH = posterEl.naturalHeight * baseScale;
          const dx = (width - drawW) / 2;
          const dy = (height - drawH) / 2 + yShift;
          ctx.drawImage(posterEl, dx, dy, drawW, drawH);
        } else if (hasImage && imageEl) {
          const baseScale =
            Math.max(width / imageEl.naturalWidth, height / imageEl.naturalHeight) *
            fillScale;
          const drawW = imageEl.naturalWidth * baseScale;
          const drawH = imageEl.naturalHeight * baseScale;
          const dx = (width - drawW) / 2;
          const dy = (height - drawH) / 2 + yShift;
          ctx.drawImage(imageEl, dx, dy, drawW, drawH);
        } else {
          // Architectural champagne-gold & warm-ivory metallic fallback
          const drift = prefersReducedMotion ? 0 : Math.sin(elapsed * 0.55) * 0.14;
          const grad = ctx.createLinearGradient(
            width * (0.05 + drift),
            -height * 0.2 + yShift,
            width * (0.95 - drift),
            height * 1.2 + yShift
          );
          grad.addColorStop(0, '#DFC48D');
          grad.addColorStop(0.26, '#FAF3E3');
          grad.addColorStop(0.52, '#C5A46D');
          grad.addColorStop(0.76, '#8F4658');
          grad.addColorStop(1, '#E6CEA0');
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, width, height);

          // Soft diagonal luminous highlight sweep inside text
          const sheenX = prefersReducedMotion
            ? width * 0.5
            : ((elapsed * 0.18) % 1.6 - 0.3) * width;
          const sheen = ctx.createRadialGradient(
            sheenX,
            height * 0.45 + yShift * 0.4,
            10,
            sheenX,
            height * 0.45 + yShift * 0.4,
            Math.max(width * 0.45, 220)
          );
          sheen.addColorStop(0, 'rgba(255, 252, 244, 0.42)');
          sheen.addColorStop(1, 'rgba(255, 252, 244, 0)');
          ctx.fillStyle = sheen;
          ctx.fillRect(0, 0, width, height);
        }

        // Step 3: Optional interactive cursor spotlight inside letters
        if (spotlight && isFinePointer) {
          const ptr = pointerRef.current;
          const targetIntensity = ptr.active ? 1 : 0;
          ptr.intensity += (targetIntensity - ptr.intensity) * 0.12;

          if (ptr.intensity > 0.01) {
            const spot = ctx.createRadialGradient(
              ptr.x,
              ptr.y,
              0,
              ptr.x,
              ptr.y,
              spotlightRadius
            );
            spot.addColorStop(0, `rgba(255, 250, 236, ${0.72 * ptr.intensity})`);
            spot.addColorStop(0.45, `rgba(229, 198, 138, ${0.38 * ptr.intensity})`);
            spot.addColorStop(1, 'rgba(197, 164, 109, 0)');
            ctx.globalCompositeOperation = 'source-atop';
            ctx.fillStyle = spot;
            ctx.fillRect(0, 0, width, height);
          }
        }

        // Step 4: Optional crisp champagne-gold outline
        if (outline) {
          ctx.globalCompositeOperation = 'source-over';
          ctx.strokeStyle = 'rgba(216, 184, 122, 0.85)';
          ctx.lineJoin = 'round';
          for (let i = 0; i < measuredWords.length; i++) {
            const item = measuredWords[i];
            ctx.font = item.font;
            ctx.lineWidth = Math.max(0.9, Math.min(1.8, item.fontSize * 0.017));
            ctx.strokeText(item.word, item.x, item.y);
          }
        }

        ctx.restore();

        if (!canvasPaintedRef.current) {
          canvasPaintedRef.current = true;
          setCanvasPainted(true);
        }
      }

      if (inView && !prefersReducedMotion) {
        rafId = requestAnimationFrame(drawFrame);
      }
    };

    drawOnceRef.current = () => drawFrame(performance.now());
    rafId = requestAnimationFrame(drawFrame);
    return () => {
      drawOnceRef.current = null;
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [
    inView,
    prefersReducedMotion,
    mediaType,
    fillScale,
    spotlight,
    spotlightRadius,
    outline,
    isFinePointer,
  ]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!spotlight || !isFinePointer || !textLayerRef.current) return;
    const rect = textLayerRef.current.getBoundingClientRect();
    pointerRef.current.x = e.clientX - rect.left;
    pointerRef.current.y = e.clientY - rect.top;
    pointerRef.current.active = true;
  };

  const handlePointerLeave = () => {
    pointerRef.current.active = false;
  };

  const initialVariant = prefersReducedMotion
    ? { opacity: 1, scale: 1, y: 0 }
    : reveal === 'scale'
      ? { opacity: 0, scale: 0.9 }
      : reveal === 'slide'
        ? { opacity: 0, y: 24 }
        : { opacity: 0 };

  const targetVariant = { opacity: 1, scale: 1, y: 0 };

  const HeadingTag = as;

  return (
    <motion.div
      ref={wrapperRef}
      initial={initialVariant}
      {...(trigger === 'view'
        ? {
            whileInView: targetVariant,
            viewport: { once: true, amount: 0.25 },
          }
        : {
            animate: targetVariant,
          })}
      transition={{ duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative inline-block max-w-full"
    >
      <div ref={textLayerRef} className="relative py-2">
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full"
        />

        <HeadingTag
          className={`relative z-10 select-text transition-colors duration-300 ${
            canvasPainted ? 'text-transparent' : 'text-[#FAF8F4]'
          } ${className}`}
          style={{
            ...style,
            WebkitTextStroke:
              !canvasPainted && outline
                ? '1px rgba(197, 164, 109, 0.85)'
                : undefined,
          }}
        >
          {words.map((word, idx) => (
            <React.Fragment key={`${word}-${idx}`}>
              <span
                ref={(el) => {
                  wordRefs.current[idx] = el;
                }}
                className="inline-block"
              >
                {word}
              </span>
              {idx < words.length - 1 ? ' ' : ''}
            </React.Fragment>
          ))}
        </HeadingTag>
      </div>
    </motion.div>
  );
};

export default MaskedHeading;
