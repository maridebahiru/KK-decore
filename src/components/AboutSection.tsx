import React from 'react';
import { motion } from 'motion/react';
import { COMPANY_ABOUT, CORE_VALUES } from '../data/companyData';
import { AnimatedHeadingReveal } from './MotionPrimitives';

export const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="bg-white dark:bg-[#191919] py-20 sm:py-24 border-b border-[#541C2B]/10 dark:border-white/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <AnimatedHeadingReveal
          eyebrow="About Our Company"
          title="Thoughtful Event Architecture Built on Trust and Craftsmanship"
          className="max-w-3xl"
        />

        {/* Company Overview + Vision & Mission */}
        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-between rounded-xl border border-[#541C2B]/12 dark:border-white/10 bg-[#FAF8F4] dark:bg-[#222222] p-7 sm:p-9 transition-colors duration-200 hover:border-[#C5A46D]/60"
          >
            <div>
              <h3 className="font-display text-2xl font-semibold text-[#541C2B] dark:text-[#C5A46D]">
                Company Overview
              </h3>
              <p className="mt-4 text-base leading-relaxed text-[#202020]/85 dark:text-white/85 dark:tracking-[0.01em]">
                {COMPANY_ABOUT.overview}
              </p>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#541C2B]/10 dark:border-white/10 pt-5 text-xs font-medium text-[#202020]/70 dark:text-white/70">
              <span>Full-Service Planning</span>
              <span aria-hidden="true" className="text-[#C5A46D]">·</span>
              <span>Bespoke Stage &amp; Venue Design</span>
              <span aria-hidden="true" className="text-[#C5A46D]">·</span>
              <span>On-Site Direction</span>
            </div>
          </motion.div>

          <div className="lg:col-span-6 grid grid-cols-1 gap-6">
            <motion.article
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl border border-[#541C2B]/12 dark:border-white/10 bg-[#FAF8F4] dark:bg-[#222222] p-7 transition-colors duration-200 hover:border-[#C5A46D]/60"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-2xl font-semibold text-[#541C2B] dark:text-[#C5A46D]">
                  Our Vision
                </h3>
                <span className="h-[1px] flex-1 bg-[#C5A46D]/40" aria-hidden="true" />
              </div>
              <p className="mt-3 text-base leading-relaxed text-[#202020]/85 dark:text-white/85 dark:tracking-[0.01em]">
                {COMPANY_ABOUT.vision}
              </p>
            </motion.article>

            <motion.article
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl border border-[#541C2B]/12 dark:border-white/10 bg-[#FAF8F4] dark:bg-[#222222] p-7 transition-colors duration-200 hover:border-[#C5A46D]/60"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-display text-2xl font-semibold text-[#541C2B] dark:text-[#C5A46D]">
                  Our Mission
                </h3>
                <span className="h-[1px] flex-1 bg-[#C5A46D]/40" aria-hidden="true" />
              </div>
              <p className="mt-3 text-base leading-relaxed text-[#202020]/85 dark:text-white/85 dark:tracking-[0.01em]">
                {COMPANY_ABOUT.mission}
              </p>
            </motion.article>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-[#541C2B]/12 dark:border-white/10 pb-5">
            <div>
              <p className="text-xs font-semibold tracking-[0.14em] text-[#541C2B] dark:text-[#C5A46D]">
                Guiding Principles
              </p>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl font-semibold text-[#202020] dark:text-white">
                Our Core Values
              </h3>
            </div>
            <p className="text-sm text-[#202020]/70 dark:text-white/70 max-w-md">
              Six foundational standards that govern every creative concept and venue execution.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_VALUES.map((value, idx) => (
              <motion.article
                key={value.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{ y: -4 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative overflow-hidden rounded-xl border border-[#541C2B]/12 dark:border-white/10 bg-[#FAF8F4] dark:bg-[#222222] p-6 transition-colors duration-200 hover:border-[#C5A46D]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[#C5A46D] transition-transform duration-300 group-hover:scale-x-100"
                />
                <div className="flex items-baseline justify-between gap-3">
                  <h4 className="font-display text-xl font-semibold text-[#202020] dark:text-white group-hover:text-[#541C2B] dark:group-hover:text-[#C5A46D] transition-colors">
                    {value.title}
                  </h4>
                  <span className="font-display text-lg font-medium text-[#C5A46D] tabular-nums">
                    {value.number}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#202020]/75 dark:text-white/75 dark:tracking-[0.01em]">
                  {value.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
