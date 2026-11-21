import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import {
  PARTNER_COMPANIES_ROW_ONE,
  PARTNER_COMPANIES_ROW_TWO,
  PartnerCompany,
} from '../data/companyData';
import { AnimatedHeadingReveal } from './MotionPrimitives';

interface PartnerLogoCardProps {
  partner: PartnerCompany;
}

export const PartnerLogoCard: React.FC<PartnerLogoCardProps> = ({ partner }) => {
  const [imgError, setImgError] = useState(false);

  const cardInner = (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex h-24 w-60 sm:w-64 shrink-0 items-center gap-4 rounded-xl border border-[#541C2B]/12 dark:border-white/10 bg-white dark:bg-[#222222] px-5 py-4 shadow-[0_6px_24px_-16px_rgba(84,28,43,0.16)] dark:shadow-[0_8px_24px_-14px_rgba(0,0,0,0.55)] transition-colors duration-200 hover:border-[#C5A46D] focus-within:border-[#C5A46D]"
    >
      {/* Subtle gold sheen highlight on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(197,164,109,0.12),transparent_65%)]"
      />

      {/* Consistent Logo Container */}
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#C5A46D]/40 bg-[#FAF8F4] dark:bg-[#181818] transition-colors group-hover:border-[#C5A46D]">
        {partner.logoUrl && !imgError ? (
          <img
            src={partner.logoUrl}
            alt={`${partner.name} logo`}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="h-9 w-9 object-contain"
          />
        ) : (
          <span className="font-display text-lg font-semibold tracking-tight text-[#541C2B] dark:text-[#C5A46D]">
            {partner.monogram}
          </span>
        )}
      </div>

      {/* Partner Name & Discipline */}
      <div className="relative min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate font-display text-lg font-semibold leading-tight text-[#202020] dark:text-white group-hover:text-[#541C2B] dark:group-hover:text-[#C5A46D] transition-colors">
            {partner.name}
          </p>
          {partner.websiteUrl && (
            <ExternalLink
              className="h-3.5 w-3.5 shrink-0 text-[#C5A46D] opacity-70 group-hover:opacity-100 transition-opacity"
              aria-hidden="true"
            />
          )}
        </div>
        <p className="mt-1 truncate text-[11px] font-medium text-[#202020]/65 dark:text-white/65">
          {partner.discipline}
        </p>
      </div>
    </motion.div>
  );

  if (partner.websiteUrl) {
    return (
      <a
        href={partner.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${partner.name}`}
        className="shrink-0 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A46D]"
      >
        {cardInner}
      </a>
    );
  }

  return cardInner;
};

interface MarqueeRowProps {
  items: PartnerCompany[];
  direction: 'rtl' | 'ltr';
  rowLabel: string;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ items, direction, rowLabel }) => {
  const [isPaused, setIsPaused] = useState(false);

  const trackAnimationClass =
    direction === 'rtl' ? 'kk-marquee-track-rtl' : 'kk-marquee-track-ltr';

  return (
    <div
      role="region"
      aria-label={rowLabel}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      onTouchCancel={() => setIsPaused(false)}
      className="relative overflow-hidden py-1.5 select-none"
    >
      {/* Left & Right Gradient Fade Masks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-24 bg-gradient-to-r from-[#FAF8F4] via-[#FAF8F4]/80 to-transparent dark:from-[#151515] dark:via-[#151515]/80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-24 bg-gradient-to-l from-[#FAF8F4] via-[#FAF8F4]/80 to-transparent dark:from-[#151515] dark:via-[#151515]/80"
      />

      {/* Seamless Duplicated Flex Track */}
      <div
        className={`flex w-max ${trackAnimationClass} ${
          isPaused ? 'kk-marquee-paused' : ''
        } motion-reduce:flex-wrap motion-reduce:w-full motion-reduce:justify-center motion-reduce:gap-4`}
      >
        {/* First Copy */}
        <div className="flex shrink-0 items-center gap-5 sm:gap-6 pr-5 sm:pr-6">
          {items.map((partner) => (
            <PartnerLogoCard key={`${partner.id}-a`} partner={partner} />
          ))}
        </div>

        {/* Second Identical Copy for Uninterrupted Infinite Loop */}
        <div
          aria-hidden="true"
          className="flex shrink-0 items-center gap-5 sm:gap-6 pr-5 sm:pr-6 motion-reduce:hidden"
        >
          {items.map((partner) => (
            <PartnerLogoCard key={`${partner.id}-b`} partner={partner} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const PartnersSection: React.FC = () => {
  return (
    <section
      id="partners"
      className="relative overflow-hidden bg-[#FAF8F4] dark:bg-[#151515] py-20 sm:py-24 border-b border-[#541C2B]/10 dark:border-white/10"
    >
      {/* Subtle CSS ambient lattice */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 kk-hero-lattice opacity-45"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedHeadingReveal
          eyebrow="Collaborative Network"
          title="Our Trusted Partners"
          subtitle="Building exceptional experiences through trusted partnerships and professional collaboration."
          align="center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="mt-3 text-center text-xs text-[#202020]/60 dark:text-white/60"
        >
          Placeholder partner slots ready for official company logos and links · Hover or touch to
          pause
        </motion.p>
      </div>

      {/* Dual-Direction Seamless Infinite Carousel */}
      <div className="relative mt-11 space-y-5">
        <MarqueeRow
          items={PARTNER_COMPANIES_ROW_ONE}
          direction="rtl"
          rowLabel="Partner companies showcase row one"
        />
        <MarqueeRow
          items={PARTNER_COMPANIES_ROW_TWO}
          direction="ltr"
          rowLabel="Partner companies showcase row two"
        />
      </div>
    </section>
  );
};
