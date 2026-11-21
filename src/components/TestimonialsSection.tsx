import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/companyData';
import { AnimatedHeadingReveal } from './MotionPrimitives';

export const TestimonialsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[activeIndex];

  return (
    <section
      id="testimonials"
      className="bg-white dark:bg-[#191919] py-20 sm:py-24 border-b border-[#541C2B]/10 dark:border-white/10"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <AnimatedHeadingReveal
          eyebrow="Client Perspectives"
          title="Client Testimonials"
          subtitle="Sample Showcase Notice — Editable demonstration testimonials displayed below until verified client feedback is published."
          align="center"
        />

        {/* Carousel Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 rounded-xl border border-[#541C2B]/14 dark:border-[#C5A46D]/25 bg-[#FAF8F4] dark:bg-[#222222] p-6 sm:p-10 shadow-[0_12px_36px_-24px_rgba(84,28,43,0.16)]"
        >
          <div className="flex items-center justify-between border-b border-[#541C2B]/10 dark:border-white/10 pb-4">
            <Quote className="h-6 w-6 text-[#C5A46D]" aria-hidden="true" />
            <span className="text-xs font-medium text-[#541C2B] dark:text-[#C5A46D] tabular-nums">
              {String(activeIndex + 1).padStart(2, '0')} /{' '}
              {String(TESTIMONIALS.length).padStart(2, '0')}
            </span>
          </div>

          <div className="relative min-h-[170px] overflow-hidden py-7 flex items-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={current.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <p className="font-display text-xl sm:text-2xl lg:text-[1.65rem] font-medium leading-relaxed text-[#202020] dark:text-white italic">
                  “{current.quote}”
                </p>
                <footer className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-[#541C2B] dark:text-[#C5A46D]">
                      {current.clientName}
                    </p>
                    <p className="mt-0.5 text-xs text-[#202020]/70 dark:text-white/70">
                      {current.eventContext}
                    </p>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between border-t border-[#541C2B]/10 dark:border-white/10 pt-5">
            <div className="flex items-center gap-2" role="tablist" aria-label="Select testimonial">
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
                    className={`h-2.5 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A46D] ${
                      selected
                        ? 'w-7 bg-[#541C2B] dark:bg-[#C5A46D]'
                        : 'w-2.5 bg-[#541C2B]/25 hover:bg-[#541C2B]/50 dark:bg-white/25 dark:hover:bg-white/50'
                    }`}
                  />
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <motion.button
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#541C2B]/15 bg-white text-[#541C2B] hover:border-[#C5A46D] dark:border-white/15 dark:bg-[#1a1a1a] dark:text-[#C5A46D] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C5A46D]"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </motion.button>
              <motion.button
                type="button"
                whileTap={{ scale: 0.94 }}
                onClick={handleNext}
                aria-label="Next testimonial"
                className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#541C2B]/15 bg-white text-[#541C2B] hover:border-[#C5A46D] dark:border-white/15 dark:bg-[#1a1a1a] dark:text-[#C5A46D] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C5A46D]"
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
