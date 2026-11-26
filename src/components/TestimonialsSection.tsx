import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, PanInfo, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/companyData';
import { AnimatedHeadingReveal } from './MotionPrimitives';

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    if (isPaused || isDragging || prefersReducedMotion || TESTIMONIALS.length <= 1) {
      return;
    }
    const timer = window.setInterval(() => {
      handleNext();
    }, 5500);
    return () => window.clearInterval(timer);
  }, [isPaused, isDragging, prefersReducedMotion, handleNext]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);
    const swipeThreshold = 45;
    if (info.offset.x < -swipeThreshold || info.velocity.x < -300) {
      handleNext();
    } else if (info.offset.x > swipeThreshold || info.velocity.x > 300) {
      handlePrev();
    }
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <section
      id="testimonials"
      className="kk-section border-b border-[var(--border)] bg-[var(--surface)]"
    >
      <div className="mx-auto max-w-5xl px-[var(--container-px)]">
        <AnimatedHeadingReveal
          eyebrow="Testimonials"
          title="Client Words"
          align="center"
        />

        {/* Swipeable Autoplay Carousel Card (Pauses on Hover, Focus, or Drag) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={() => setIsPaused(false)}
          className="mt-10 border border-[var(--border-strong)] bg-[var(--bg)]/85 backdrop-blur-md p-6 sm:p-10 shadow-[var(--shadow)]"
          style={{ borderRadius: 'var(--radius)' }}
        >
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
            <Quote className="h-6 w-6 text-[var(--accent-2)]" aria-hidden="true" />
            <span className="text-xs font-semibold text-[var(--accent)] tabular-nums">
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(TESTIMONIALS.length).padStart(2, '0')}
            </span>
          </div>

          <div className="relative min-h-[160px] overflow-hidden py-7 flex items-center touch-pan-y">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={current.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -24 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                drag={prefersReducedMotion ? false : 'x'}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.22}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                className="w-full cursor-grab active:cursor-grabbing select-none"
              >
                <p
                  className="font-display font-medium leading-relaxed text-[var(--text)] italic"
                  style={{ fontSize: 'clamp(1.2rem, 2.2vw, 1.65rem)' }}
                >
                  “{current.quote}”
                </p>
                <footer className="mt-5">
                  <p className="text-sm font-semibold text-[var(--accent)]">
                    {current.clientName}
                  </p>
                  <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                    {current.eventContext}
                  </p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-5">
            <div className="flex items-center gap-1" role="tablist" aria-label="Select testimonial">
              {TESTIMONIALS.map((item, idx) => {
                const selected = idx === activeIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-label={`View testimonial ${idx + 1}`}
                    onClick={() => {
                      setDirection(idx >= activeIndex ? 1 : -1);
                      setActiveIndex(idx);
                    }}
                    className="inline-flex h-11 min-w-[32px] items-center justify-center px-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] rounded-sm"
                  >
                    <span
                      className={`h-2.5 rounded-full transition-all duration-200 ${
                        selected
                          ? 'w-7 bg-[var(--accent)]'
                          : 'w-2.5 bg-[var(--border-strong)] hover:bg-[var(--accent)]/70'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="inline-flex h-11 w-11 items-center justify-center border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)] hover:border-[var(--accent-2)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                style={{ borderRadius: 'var(--radius-btn)' }}
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={handleNext}
                aria-label="Next testimonial"
                className="inline-flex h-11 w-11 items-center justify-center border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)] hover:border-[var(--accent-2)] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
                style={{ borderRadius: 'var(--radius-btn)' }}
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
