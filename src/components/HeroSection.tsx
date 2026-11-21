import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { AnimatedCounter } from './MotionPrimitives';

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Subtle GPU-composited parallax transform on the architectural motif
  const archY = useTransform(scrollYProgress, [0, 1], [0, 36]);
  const latticeY = useTransform(scrollYProgress, [0, 1], [0, 20]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#FAF8F4] dark:bg-[#151515] border-b border-[#541C2B]/10 dark:border-white/10"
    >
      {/* Sophisticated CSS Lattice & Drifting Ambient Field */}
      <motion.div
        style={{ y: latticeY }}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 kk-hero-lattice opacity-75"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-[440px] w-[440px] rounded-full kk-ambient-orb bg-[radial-gradient(circle,rgba(197,164,109,0.18)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(197,164,109,0.13)_0%,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-24 h-[380px] w-[380px] rounded-full kk-ambient-orb bg-[radial-gradient(circle,rgba(84,28,43,0.09)_0%,transparent_70%)] dark:bg-[radial-gradient(circle,rgba(84,28,43,0.3)_0%,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Editorial Typography Column */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 flex items-center gap-3 text-xs font-medium tracking-[0.12em] text-[#541C2B] dark:text-[#C5A46D]"
            >
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="h-[1px] w-8 origin-left bg-[#C5A46D]"
                aria-hidden="true"
              />
              <span>KK Decor and Event</span>
              <span aria-hidden="true" className="text-[#C5A46D]">·</span>
              <span>Event Planning &amp; Bespoke Decoration</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.68, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-[2.45rem] sm:text-[3.25rem] lg:text-[3.75rem] font-semibold leading-[1.08] tracking-[-0.015em] text-[#202020] dark:text-white [text-wrap:balance]"
              >
                Creating Extraordinary Experiences Through{' '}
                <span className="italic font-medium text-[#541C2B] dark:text-[#C5A46D]">
                  Elegant Events.
                </span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#202020]/80 dark:text-white/80 dark:tracking-[0.01em]"
            >
              KK Decor and Event specializes in transforming special occasions into beautifully
              planned and professionally executed experiences.
            </motion.p>

            {/* Primary & Secondary Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <motion.a
                href="#services"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="group relative inline-flex min-h-[46px] items-center justify-center gap-2.5 overflow-hidden rounded-md bg-[#541C2B] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#3f1420] dark:bg-[#C5A46D] dark:text-[#151515] dark:hover:bg-[#d4b681] transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A46D]"
              >
                <span className="relative z-10">Explore Our Services</span>
                <ArrowRight
                  className="relative z-10 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </motion.a>

              <motion.a
                href="#portfolio"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-md border border-[#541C2B]/25 bg-white px-6 py-3 text-sm font-semibold text-[#541C2B] hover:border-[#C5A46D] hover:bg-[#FAF8F4] dark:border-[#C5A46D]/40 dark:bg-[#222222] dark:text-white dark:hover:border-[#C5A46D] dark:hover:bg-[#2a2a2a] transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A46D]"
              >
                <span>Discover Our Portfolio</span>
              </motion.a>
            </motion.div>

            {/* Quiet Editorial Discipline Strip with Animated Counters */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
              className="mt-12 grid grid-cols-3 gap-6 border-t border-[#541C2B]/12 dark:border-white/12 pt-7 max-w-xl"
            >
              <div>
                <p className="font-display text-2xl font-semibold text-[#541C2B] dark:text-[#C5A46D]">
                  <AnimatedCounter target={9} padZero />
                </p>
                <p className="mt-1 text-xs text-[#202020]/70 dark:text-white/70">
                  Specialized Service Disciplines
                </p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-[#541C2B] dark:text-[#C5A46D]">
                  <AnimatedCounter target={6} padZero />
                </p>
                <p className="mt-1 text-xs text-[#202020]/70 dark:text-white/70">
                  Structured Execution Phases
                </p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-[#541C2B] dark:text-[#C5A46D]">
                  <AnimatedCounter target={100} suffix="%" />
                </p>
                <p className="mt-1 text-xs text-[#202020]/70 dark:text-white/70">
                  Bespoke Spatial &amp; Floral Design
                </p>
              </div>
            </motion.div>
          </div>

          {/* Sophisticated CSS & Geometric Architectural Composition (Zero Stock/AI Photos) */}
          <motion.div
            style={{ y: archY }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.75, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:col-span-5"
            aria-hidden="true"
          >
            {/* Subtle Floating Geometric Gold Accents */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute -right-2 -top-3 z-20 hidden sm:flex h-10 w-10 rotate-45 items-center justify-center border border-[#C5A46D]/60 bg-[#FAF8F4]/90 dark:bg-[#222222]/90"
            >
              <span className="h-2.5 w-2.5 bg-[#C5A46D]/70" />
            </motion.div>

            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute -left-3 bottom-10 z-20 hidden sm:block h-7 w-7 rounded-full border border-[#C5A46D]/55 bg-[#541C2B]/15 dark:bg-[#C5A46D]/15"
            />

            <div className="relative mx-auto aspect-[4/5] max-w-md rounded-xl border border-[#C5A46D]/40 bg-white dark:bg-[#222222] p-5 sm:p-7 shadow-[0_24px_60px_-28px_rgba(84,28,43,0.18)] dark:shadow-[0_24px_60px_-28px_rgba(0,0,0,0.65)]">
              {/* Inner architectural framing */}
              <div className="relative h-full w-full overflow-hidden rounded-lg border border-[#C5A46D]/30 bg-gradient-to-b from-[#FAF8F4] via-[#FFFFFF] to-[#F3EDE2] dark:from-[#1b1b1b] dark:via-[#222222] dark:to-[#181214]">
                <div className="absolute inset-0 kk-fine-grid opacity-80" />

                {/* Layered Ceremonial Archway Composition */}
                <div className="relative flex h-full flex-col items-center justify-between p-6 sm:p-8">
                  {/* Top Ornament */}
                  <div className="flex w-full items-center justify-between text-[11px] font-medium tracking-[0.14em] text-[#541C2B]/70 dark:text-[#C5A46D]/80">
                    <span>Architectural Styling</span>
                    <span>Est. Signature</span>
                  </div>

                  {/* Nested Cathedral & Filigree Arches */}
                  <div className="relative my-4 flex h-[66%] w-[82%] items-end justify-center">
                    {/* Outer Burgundy Arch */}
                    <div className="absolute inset-0 rounded-t-full border border-[#541C2B]/30 dark:border-[#C5A46D]/40 bg-[#541C2B]/[0.04] dark:bg-[#541C2B]/25" />

                    {/* Middle Champagne Gold Arch */}
                    <div className="absolute inset-x-4 top-4 bottom-0 rounded-t-full border border-[#C5A46D]/70 bg-gradient-to-b from-[#C5A46D]/12 to-transparent" />

                    {/* Inner Recessed Burgundy Plinth */}
                    <div className="relative flex h-[78%] w-[68%] flex-col items-center justify-center rounded-t-full bg-[#541C2B] dark:bg-[#19090d] border border-[#C5A46D]/60 px-4 text-center shadow-inner">
                      <motion.svg
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                        viewBox="0 0 80 80"
                        className="mb-3 h-14 w-14 text-[#C5A46D]"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="0.9" strokeDasharray="3 3" />
                        <circle cx="40" cy="40" r="22" stroke="currentColor" strokeWidth="1.1" />
                        <path
                          d="M40 12V68M12 40H68"
                          stroke="currentColor"
                          strokeWidth="0.7"
                          strokeOpacity="0.45"
                        />
                        <path
                          d="M40 24L45 35L56 40L45 45L40 56L35 45L24 40L35 35L40 24Z"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          fill="rgba(197, 164, 109, 0.14)"
                        />
                      </motion.svg>
                      <span className="font-display text-lg sm:text-xl font-medium tracking-wide text-[#FAF8F4]">
                        Refined Harmony
                      </span>
                      <span className="mt-1 text-[11px] tracking-[0.12em] text-[#C5A46D]">
                        Drapery · Floristry · Stage
                      </span>
                    </div>
                  </div>

                  {/* Stepped Architectural Pedestal Base */}
                  <div className="w-full space-y-2 pt-2">
                    <div className="mx-auto h-[1px] w-4/5 bg-[#C5A46D]/60" />
                    <div className="flex items-center justify-between text-[11px] text-[#202020]/65 dark:text-white/65">
                      <span>Weddings &amp; Galas</span>
                      <span className="text-[#C5A46D]">·</span>
                      <span>Cultural &amp; Corporate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
