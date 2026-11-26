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
      className="group relative flex h-24 w-60 sm:w-64 shrink-0 items-center gap-4 border border-[var(--border)] bg-[var(--surface)] px-5 py-4 shadow-[var(--shadow)] transition-colors duration-200 hover:border-[var(--accent-2)] focus-within:border-[var(--accent-2)]"
      style={{ borderRadius: 'var(--radius)' }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          borderRadius: 'inherit',
          background:
            'radial-gradient(circle at top right, var(--glow), transparent 65%)',
        }}
      />

      <div
        className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden border border-[var(--border-strong)] bg-[var(--surface-alt)] transition-colors group-hover:border-[var(--accent)]"
        style={{ borderRadius: 'calc(var(--radius) * 0.65)' }}
      >
        {partner.logoUrl && !imgError ? (
          <img
            src={partner.logoUrl}
            alt={`${partner.name} logo`}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="h-9 w-9 object-contain"
          />
        ) : (
          <span className="font-display text-lg font-semibold tracking-tight text-[var(--accent)]">
            {partner.monogram}
          </span>
        )}
      </div>

      <div className="relative min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate font-display text-lg font-semibold leading-tight text-[var(--text)] group-hover:text-[var(--accent)] transition-colors">
            {partner.name}
          </p>
          {partner.websiteUrl && (
            <ExternalLink
              className="h-3.5 w-3.5 shrink-0 text-[var(--accent-2)] opacity-70 group-hover:opacity-100 transition-opacity"
              aria-hidden="true"
            />
          )}
        </div>
        <p className="mt-1 truncate text-[11px] font-medium text-[var(--text-muted)]">
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
        className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
        style={{ borderRadius: 'var(--radius)' }}
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-24"
        style={{
          background: 'linear-gradient(to right, var(--bg) 0%, transparent 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-24"
        style={{
          background: 'linear-gradient(to left, var(--bg) 0%, transparent 100%)',
        }}
      />

      <div
        className={`flex w-max ${trackAnimationClass} ${
          isPaused ? 'kk-marquee-paused' : ''
        } motion-reduce:flex-wrap motion-reduce:w-full motion-reduce:justify-center motion-reduce:gap-4`}
      >
        <div className="flex shrink-0 items-center gap-5 sm:gap-6 pr-5 sm:pr-6">
          {items.map((partner) => (
            <PartnerLogoCard key={`${partner.id}-a`} partner={partner} />
          ))}
        </div>

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
      className="kk-section relative overflow-hidden border-b border-[var(--border)] bg-[var(--bg)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 kk-hero-lattice opacity-45"
      />

      <div className="kk-container relative">
        <AnimatedHeadingReveal
          eyebrow="Network"
          title="Our Partners"
          align="center"
        />
      </div>

      {/* Dual-Direction Seamless Infinite Carousel */}
      <div className="relative mt-10 space-y-5">
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
