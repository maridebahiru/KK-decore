import React from 'react';
import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../data/companyData';
import { AnimatedHeadingReveal } from './MotionPrimitives';

export const ProcessSection: React.FC = () => {
  return (
    <section
      id="process"
      className="bg-[#FAF8F4] dark:bg-[#151515] py-20 sm:py-24 border-b border-[#541C2B]/10 dark:border-white/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedHeadingReveal
          eyebrow="Our Process"
          title="Our Working Process From First Consultation to Final Execution"
          subtitle="A transparent six-stage framework guiding every wedding, cultural gathering, and corporate production smoothly from concept to celebration."
          className="max-w-2xl"
        />

        {/* Horizontal Timeline on Desktop (lg+) */}
        <div className="mt-14 hidden lg:block">
          <div className="relative">
            {/* Animated horizontal timeline progression track */}
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-6 h-[1px] bg-[#C5A46D]/20"
            />
            <motion.div
              aria-hidden="true"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 right-0 top-6 h-[1.5px] origin-left bg-gradient-to-r from-[#541C2B] via-[#C5A46D] to-[#541C2B] dark:from-[#C5A46D] dark:via-[#FAF8F4] dark:to-[#C5A46D]"
            />

            <ol className="relative grid grid-cols-6 gap-5">
              {PROCESS_STEPS.map((item, idx) => (
                <motion.li
                  key={item.step}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex flex-col"
                >
                  <motion.div
                    initial={{ scale: 0.85 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full border border-[#C5A46D] bg-white dark:bg-[#222222] font-display text-lg font-semibold text-[#541C2B] dark:text-[#C5A46D] tabular-nums shadow-sm transition-colors duration-200 group-hover:bg-[#541C2B] group-hover:text-white dark:group-hover:bg-[#C5A46D] dark:group-hover:text-[#151515]"
                  >
                    {item.step}
                  </motion.div>
                  <div className="mt-6 flex-1 rounded-xl border border-[#541C2B]/12 dark:border-white/10 bg-white dark:bg-[#222222] p-5 transition-all duration-200 group-hover:-translate-y-1 group-hover:border-[#C5A46D]">
                    <h3 className="font-display text-lg font-semibold leading-snug text-[#202020] dark:text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-[#202020]/75 dark:text-white/75">
                      {item.description}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>

        {/* Vertical Timeline on Mobile & Tablet (<lg) */}
        <div className="mt-12 lg:hidden">
          <ol className="relative space-y-6">
            {PROCESS_STEPS.map((item, idx) => (
              <motion.li
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="relative flex gap-4 sm:gap-6"
              >
                <div className="flex flex-col items-center">
                  <div className="z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C5A46D] bg-white dark:bg-[#222222] font-display text-base font-semibold text-[#541C2B] dark:text-[#C5A46D] tabular-nums">
                    {item.step}
                  </div>
                  {idx < PROCESS_STEPS.length - 1 && (
                    <motion.span
                      aria-hidden="true"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.45, delay: idx * 0.06 + 0.15 }}
                      className="mt-2 w-[1.5px] flex-1 origin-top bg-[#C5A46D]/60"
                    />
                  )}
                </div>

                <div className="flex-1 rounded-xl border border-[#541C2B]/12 dark:border-white/10 bg-white dark:bg-[#222222] p-5 sm:p-6">
                  <h3 className="font-display text-xl font-semibold text-[#202020] dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#202020]/75 dark:text-white/75">
                    {item.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
