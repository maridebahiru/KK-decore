import React from 'react';
import { motion } from 'motion/react';
import { HERO_METRICS } from '../data/companyData';
import { AnimatedCounter, AnimatedHeadingReveal } from './MotionPrimitives';

export const StatsSection: React.FC = () => {
  return (
    <section
      id="stats"
      className="kk-section border-b border-[var(--border)] bg-[var(--bg)]"
    >
      <div className="kk-container">
        <AnimatedHeadingReveal
          eyebrow="Track Record"
          title="In Numbers"
          align="center"
        />

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {HERO_METRICS.map((metric, idx) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="border border-[var(--border-strong)] bg-[var(--surface)]/85 backdrop-blur-md p-8 text-center shadow-[var(--shadow)]"
              style={{ borderRadius: 'var(--radius)' }}
            >
              <p
                className="font-display font-semibold text-[var(--accent)]"
                style={{ fontSize: 'clamp(2.5rem, 4.5vw, 3.75rem)' }}
              >
                <AnimatedCounter target={metric.target} suffix={metric.suffix} />
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
