import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import {
  CheckCircle2,
  ClipboardList,
  Layers,
  MessageSquare,
  PackageCheck,
  Sparkles,
} from 'lucide-react';
import { PROCESS_STEPS, ProcessStep } from '../data/companyData';
import { AnimatedHeadingReveal } from './MotionPrimitives';

function renderStepIcon(iconKey: ProcessStep['iconKey']) {
  const cls = 'h-5 w-5 text-[var(--accent)] group-hover:text-[var(--accent-text)] transition-colors';
  switch (iconKey) {
    case 'message':
      return <MessageSquare className={cls} aria-hidden="true" />;
    case 'clipboard':
      return <ClipboardList className={cls} aria-hidden="true" />;
    case 'sparkles':
      return <Sparkles className={cls} aria-hidden="true" />;
    case 'package':
      return <PackageCheck className={cls} aria-hidden="true" />;
    case 'layers':
      return <Layers className={cls} aria-hidden="true" />;
    case 'check':
      return <CheckCircle2 className={cls} aria-hidden="true" />;
  }
}

export const ProcessSection: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 75%'],
  });

  const progressSpring = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 26,
    restDelta: 0.001,
  });

  return (
    <section
      id="process"
      className="kk-section border-b border-[var(--border)] bg-[var(--bg)]"
    >
      <div className="kk-container">
        <AnimatedHeadingReveal
          eyebrow="Workflow"
          title="How We Work"
          className="max-w-lg"
        />

        {/* 6 Icon Steps with Scroll-Drawn Progress Line & 2-Word Labels */}
        <div ref={timelineRef} className="relative mt-12">
          {/* Desktop Horizontal Drawn Line */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute left-8 right-8 top-7 h-[2px] bg-[var(--border)]"
          />
          <motion.div
            aria-hidden="true"
            style={{
              scaleX: prefersReducedMotion ? 1 : progressSpring,
              background:
                'linear-gradient(90deg, var(--accent) 0%, var(--accent-2) 50%, var(--accent) 100%)',
            }}
            className="hidden lg:block absolute left-8 right-8 top-7 h-[2px] origin-left"
          />

          {/* Mobile/Tablet Vertical Drawn Line */}
          <div
            aria-hidden="true"
            className="lg:hidden absolute top-6 bottom-6 left-[27px] w-[2px] bg-[var(--border)]"
          />
          <motion.div
            aria-hidden="true"
            style={{
              scaleY: prefersReducedMotion ? 1 : progressSpring,
              background:
                'linear-gradient(180deg, var(--accent) 0%, var(--accent-2) 50%, var(--accent) 100%)',
            }}
            className="lg:hidden absolute top-6 bottom-6 left-[27px] w-[2px] origin-top"
          />

          <ol className="relative grid grid-cols-1 gap-6 lg:grid-cols-6 lg:gap-4">
            {PROCESS_STEPS.map((item, idx) => (
              <motion.li
                key={item.step}
                initial={{ opacity: 0, y: 16, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative flex lg:flex-col items-center lg:items-center gap-4 lg:gap-4 text-left lg:text-center"
              >
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 18, delay: idx * 0.05 }}
                  className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 border-[var(--accent-2)] bg-[var(--surface)]/95 backdrop-blur-md shadow-[var(--shadow)] transition-colors duration-200 group-hover:bg-[var(--accent)]"
                >
                  {renderStepIcon(item.iconKey)}
                </motion.div>

                <div
                  className="flex-1 lg:w-full border border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-md px-4 py-4 shadow-[var(--shadow)] transition-colors group-hover:border-[var(--accent-2)]"
                  style={{ borderRadius: 'var(--radius)' }}
                >
                  <span className="font-display text-sm font-semibold text-[var(--accent-2)] tabular-nums">
                    {item.step}
                  </span>
                  <h3 className="mt-1 font-display text-lg sm:text-xl font-semibold text-[var(--text)]">
                    {item.title}
                  </h3>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
