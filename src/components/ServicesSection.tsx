import React from 'react';
import { motion } from 'motion/react';
import {
  Briefcase,
  Building2,
  CalendarCheck,
  Crown,
  Flower2,
  Gem,
  Heart,
  Layers,
  Sparkles,
} from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/companyData';
import { AnimatedHeadingReveal } from './MotionPrimitives';

function renderServiceIcon(iconKey: ServiceItem['iconKey']) {
  const iconClass = 'h-5 w-5 text-[#541C2B] dark:text-[#C5A46D]';
  switch (iconKey) {
    case 'rings':
      return <Gem className={iconClass} aria-hidden="true" />;
    case 'heart':
      return <Heart className={iconClass} aria-hidden="true" />;
    case 'briefcase':
      return <Briefcase className={iconClass} aria-hidden="true" />;
    case 'sparkles':
      return <Sparkles className={iconClass} aria-hidden="true" />;
    case 'crown':
      return <Crown className={iconClass} aria-hidden="true" />;
    case 'layers':
      return <Layers className={iconClass} aria-hidden="true" />;
    case 'building':
      return <Building2 className={iconClass} aria-hidden="true" />;
    case 'flower':
      return <Flower2 className={iconClass} aria-hidden="true" />;
    case 'calendar':
      return <CalendarCheck className={iconClass} aria-hidden="true" />;
  }
}

export const ServicesSection: React.FC = () => {
  return (
    <section
      id="services"
      className="bg-[#FAF8F4] dark:bg-[#151515] py-20 sm:py-24 border-b border-[#541C2B]/10 dark:border-white/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <AnimatedHeadingReveal
            eyebrow="Our Services"
            title="Comprehensive Event Planning & Bespoke Styling"
            className="max-w-2xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md text-sm sm:text-base leading-relaxed text-[#202020]/75 dark:text-white/75 dark:tracking-[0.01em]"
          >
            Every celebration receives tailored structural design, botanical artistry, and
            disciplined coordination calibrated to your venue and guests.
          </motion.p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, idx) => (
            <motion.article
              key={service.number}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: 0.45,
                delay: (idx % 3) * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -5 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-[#541C2B]/12 dark:border-white/10 bg-white dark:bg-[#222222] p-7 shadow-[0_8px_28px_-20px_rgba(84,28,43,0.12)] transition-all duration-200 hover:border-[#C5A46D] hover:shadow-[0_18px_40px_-20px_rgba(197,164,109,0.28)]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(197,164,109,0.1),transparent_60%)]"
              />
              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#C5A46D]/40 bg-[#FAF8F4] dark:bg-[#1a1a1a] transition-transform duration-200 group-hover:scale-105 group-hover:border-[#C5A46D]">
                    {renderServiceIcon(service.iconKey)}
                  </div>
                  <span className="font-display text-xl font-medium text-[#C5A46D] tabular-nums">
                    {service.number}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-2xl font-semibold leading-snug text-[#202020] dark:text-white group-hover:text-[#541C2B] dark:group-hover:text-[#C5A46D] transition-colors">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-[#202020]/75 dark:text-white/75 dark:tracking-[0.01em]">
                  {service.summary}
                </p>
              </div>

              <ul className="mt-6 space-y-2 border-t border-[#541C2B]/10 dark:border-white/10 pt-5">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-xs font-medium text-[#202020]/80 dark:text-white/80"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#C5A46D]"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
