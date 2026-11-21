import React from 'react';
import { motion } from 'motion/react';
import { Award, Compass, Eye, Palette, ShieldCheck, Smile } from 'lucide-react';
import { WHY_CHOOSE_ITEMS, WhyChooseItem } from '../data/companyData';
import { AnimatedHeadingReveal } from './MotionPrimitives';

function renderWhyIcon(key: WhyChooseItem['iconKey']) {
  const cls = 'h-5 w-5 text-[#541C2B] dark:text-[#C5A46D]';
  switch (key) {
    case 'award':
      return <Award className={cls} aria-hidden="true" />;
    case 'palette':
      return <Palette className={cls} aria-hidden="true" />;
    case 'eye':
      return <Eye className={cls} aria-hidden="true" />;
    case 'compass':
      return <Compass className={cls} aria-hidden="true" />;
    case 'shield':
      return <ShieldCheck className={cls} aria-hidden="true" />;
    case 'smile':
      return <Smile className={cls} aria-hidden="true" />;
  }
}

export const WhyChooseSection: React.FC = () => {
  return (
    <section
      id="why-choose"
      className="bg-white dark:bg-[#191919] py-20 sm:py-24 border-b border-[#541C2B]/10 dark:border-white/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left Editorial Anchor */}
          <div className="lg:col-span-4">
            <AnimatedHeadingReveal
              eyebrow="Why Choose Us"
              title="Why Choose KK Decor and Event?"
              subtitle="Hosts and corporate organizers partner with us for a calm, structured planning process that treats aesthetic beauty and operational precision with equal discipline."
            />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.45, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 rounded-xl border border-[#C5A46D]/40 bg-[#541C2B] dark:bg-[#222222] p-6 text-white transition-colors hover:border-[#C5A46D]"
            >
              <p className="font-display text-xl font-medium text-[#C5A46D]">
                Dedicated Standards
              </p>
              <p className="mt-2 text-sm leading-relaxed text-white/85">
                Every event is overseen with clear timelines, cohesive material curation, and
                respectful hospitality for you and your guests.
              </p>
            </motion.div>
          </div>

          {/* Right 6-Pillar Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {WHY_CHOOSE_ITEMS.map((item, idx) => (
              <motion.article
                key={item.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                whileHover={{ y: -4 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative overflow-hidden rounded-xl border border-[#541C2B]/12 dark:border-white/10 bg-[#FAF8F4] dark:bg-[#222222] p-6 transition-all duration-200 hover:border-[#C5A46D] hover:shadow-[0_14px_32px_-20px_rgba(197,164,109,0.28)]"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[#C5A46D] transition-transform duration-300 group-hover:scale-x-100"
                />
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#C5A46D]/40 bg-white dark:bg-[#1a1a1a] transition-transform duration-200 group-hover:scale-105 group-hover:border-[#C5A46D]">
                    {renderWhyIcon(item.iconKey)}
                  </div>
                  <span className="font-display text-lg font-medium text-[#C5A46D] tabular-nums">
                    {item.number}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-[#202020] dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#202020]/75 dark:text-white/75 dark:tracking-[0.01em]">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
