import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { HERO_MEDIA } from '../data/media';
import MaskedHeading from './MaskedHeading';
import { MagneticLink, useIsFinePointer } from './MotionPrimitives';
import { ViewportVideo } from './MediaPrimitives';

const GOLD_PETALS = [
  { id: 'p1', left: '10%', top: '20%', size: 12, duration: 7.5, delay: 0.1, type: 'petal' as const },
  { id: 'p2', left: '28%', top: '76%', size: 10, duration: 8.5, delay: 0.5, type: 'sparkle' as const },
  { id: 'p3', left: '52%', top: '16%', size: 13, duration: 9.2, delay: 0.3, type: 'petal' as const },
  { id: 'p4', left: '78%', top: '24%', size: 11, duration: 7.8, delay: 0.8, type: 'sparkle' as const },
  { id: 'p5', left: '88%', top: '66%', size: 12, duration: 8.8, delay: 0.4, type: 'petal' as const },
  { id: 'p6', left: '66%', top: '78%', size: 9, duration: 6.8, delay: 1.0, type: 'sparkle' as const },
];

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isFinePointer = useIsFinePointer();
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[calc(100svh-4rem)] w-full items-center justify-center overflow-hidden border-b border-[var(--border)] bg-[#1B0B10]"
    >
      {/* Parallax Video / Poster Layer with Ken Burns Fallback */}
      <motion.div
        style={{ y: isFinePointer ? bgY : 0 }}
        className="absolute inset-0 -top-6 -bottom-6"
        aria-hidden="true"
      >
        <ViewportVideo asset={HERO_MEDIA} priority />
      </motion.div>

      {/* Dark Burgundy Cinematic Gradient Overlay (AA Contrast) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(145deg, rgba(84,28,43,0.88) 0%, rgba(22,8,12,0.72) 52%, rgba(84,28,43,0.86) 100%)',
        }}
      />

      {/* Subtle Radial Gold Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 42%, rgba(197,164,109,0.22) 0%, transparent 65%)',
        }}
      />

      {/* Floating Gold Petals & Sparkles (Disabled under prefers-reduced-motion) */}
      {!prefersReducedMotion && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {GOLD_PETALS.map((item) => (
            <motion.div
              key={item.id}
              style={{ left: item.left, top: item.top }}
              initial={{ opacity: 0, y: 8 }}
              animate={{
                opacity: [0.25, 0.78, 0.25],
                y: [-12, 16, -12],
                x: [-6, 8, -6],
                rotate: item.type === 'petal' ? [-14, 18, -14] : [0, 45, 0],
              }}
              transition={{
                duration: item.duration,
                delay: item.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute text-[#C5A46D]"
            >
              {item.type === 'petal' ? (
                <svg width={item.size} height={item.size} viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 1C11 4.5 12 9 8 15C4 9 5 4.5 8 1Z" fillOpacity="0.65" />
                </svg>
              ) : (
                <svg width={item.size} height={item.size} viewBox="0 0 16 16" fill="currentColor">
                  <path
                    d="M8 1L9.5 6.5L15 8L9.5 9.5L8 15L6.5 9.5L1 8L6.5 6.5L8 1Z"
                    fillOpacity="0.75"
                  />
                </svg>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Centered Editorial Focal Content */}
      <motion.div
        style={{ y: isFinePointer ? contentY : 0 }}
        className="kk-container relative z-10 flex flex-col items-center text-center py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 flex items-center gap-3 text-xs font-medium tracking-[0.2em] text-[#C5A46D]"
        >
          <span className="h-[1px] w-7 bg-[#C5A46D]/75" aria-hidden="true" />
          <span>KK Decor and Event</span>
          <span className="h-[1px] w-7 bg-[#C5A46D]/75" aria-hidden="true" />
        </motion.div>

        <MaskedHeading
          text="Extraordinary Events, Elegantly Styled"
          mediaType="video"
          src={HERO_MEDIA.src}
          poster={HERO_MEDIA.poster}
          fillScale={1.3}
          parallax={34}
          reveal="scale"
          trigger="view"
          spotlight
          spotlightRadius={180}
          outline
          as="h1"
          className="max-w-4xl font-display font-bold leading-[1.04] tracking-[-0.015em] [text-wrap:balance]"
          style={{ fontSize: 'clamp(2.45rem, 6vw, 5.4rem)' }}
        />

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticLink
            href="#services"
            className="kk-shimmer-btn group relative inline-flex min-h-[48px] items-center justify-center gap-2.5 bg-[#C5A46D] px-7 py-3 text-sm font-semibold text-[#191214] shadow-[0_18px_40px_-14px_rgba(0,0,0,0.6)] hover:bg-[#d3b37d] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A46D]"
            style={{ borderRadius: 'var(--radius-btn)' }}
          >
            <span className="relative z-10">Explore Services</span>
            <ArrowRight
              className="relative z-10 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </MagneticLink>

          <MagneticLink
            href="#portfolio"
            className="kk-shimmer-btn inline-flex min-h-[48px] items-center justify-center gap-2 border border-[#C5A46D]/60 bg-white/10 px-7 py-3 text-sm font-semibold text-[#FAF8F4] backdrop-blur-md hover:border-[#C5A46D] hover:bg-white/15 transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A46D]"
            style={{ borderRadius: 'var(--radius-btn)' }}
          >
            <span className="relative z-10">View Portfolio</span>
          </MagneticLink>
        </motion.div>
      </motion.div>

      {/* Bottom Scroll Cue */}
      <motion.a
        href="#marquee"
        aria-label="Scroll to explore event specialties"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.58 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 inline-flex min-h-[44px] flex-col items-center justify-center gap-1.5 px-3 text-[11px] font-medium tracking-[0.18em] text-[#FAF8F4]/80 hover:text-[#C5A46D] transition-colors focus-visible:outline-2 focus-visible:outline-[#C5A46D] rounded-sm"
      >
        <span>Scroll</span>
        <motion.span
          animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ArrowDown className="h-3.5 w-3.5 text-[#C5A46D]" aria-hidden="true" />
        </motion.span>
      </motion.a>
    </section>
  );
};
