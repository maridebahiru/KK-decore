import React, { useState } from 'react';
import { MARQUEE_ROW_ONE, MARQUEE_ROW_TWO } from '../data/companyData';

interface MarqueeBandProps {
  items: string[];
  direction: 'rtl' | 'ltr';
  label: string;
}

const MarqueeBand: React.FC<MarqueeBandProps> = ({ items, direction, label }) => {
  const [paused, setPaused] = useState(false);
  const trackClass = direction === 'rtl' ? 'kk-marquee-track-rtl' : 'kk-marquee-track-ltr';

  return (
    <div
      role="region"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
      className="kk-marquee-hover-pause relative overflow-hidden py-2.5 select-none"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 sm:w-20"
        style={{ background: 'linear-gradient(to right, var(--surface) 0%, transparent 100%)' }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 sm:w-20"
        style={{ background: 'linear-gradient(to left, var(--surface) 0%, transparent 100%)' }}
      />

      <div
        className={`flex w-max ${trackClass} ${
          paused ? 'kk-marquee-paused' : ''
        } motion-reduce:flex-wrap motion-reduce:w-full motion-reduce:justify-center motion-reduce:gap-x-6 motion-reduce:gap-y-2`}
      >
        {[0, 1, 2, 3].map((copyIdx) => (
          <div
            key={copyIdx}
            aria-hidden={copyIdx > 0}
            className={`flex shrink-0 items-center gap-7 pr-7 ${
              copyIdx > 0 ? 'motion-reduce:hidden' : ''
            }`}
          >
            {items.map((item) => (
              <span
                key={`${copyIdx}-${item}`}
                className="inline-flex items-center gap-3 font-display text-base sm:text-lg font-medium tracking-[0.06em] text-[var(--text)] whitespace-nowrap"
              >
                <span className="h-1.5 w-1.5 rotate-45 bg-[var(--accent-2)]" aria-hidden="true" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export const EventMarqueeSection: React.FC = () => {
  return (
    <section
      id="marquee"
      aria-label="Event Specialties"
      className="border-b border-[var(--border)] bg-[var(--surface)] py-3"
    >
      <MarqueeBand
        items={MARQUEE_ROW_ONE}
        direction="rtl"
        label="Featured celebration styles row one"
      />
      <div className="h-[1px] w-full bg-[var(--border)] opacity-60" aria-hidden="true" />
      <MarqueeBand
        items={MARQUEE_ROW_TWO}
        direction="ltr"
        label="Featured decor elements row two"
      />
    </section>
  );
};
