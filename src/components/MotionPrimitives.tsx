import React, { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-[#541C2B] via-[#C5A46D] to-[#541C2B] dark:from-[#C5A46D] dark:via-[#FAF8F4] dark:to-[#C5A46D]"
    />
  );
};

interface AnimatedSectionDividerProps {
  className?: string;
}

export const AnimatedSectionDivider: React.FC<AnimatedSectionDividerProps> = ({
  className = '',
}) => {
  return (
    <div
      aria-hidden="true"
      className={`relative mx-auto flex max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="h-[1px] flex-1 origin-right bg-gradient-to-l from-[#C5A46D]/60 to-transparent"
      />
      <motion.div
        initial={{ scale: 0, rotate: 45, opacity: 0 }}
        whileInView={{ scale: 1, rotate: 45, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mx-3 h-2 w-2 border border-[#C5A46D] bg-[#FAF8F4] dark:bg-[#151515]"
      />
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="h-[1px] flex-1 origin-left bg-gradient-to-r from-[#C5A46D]/60 to-transparent"
      />
    </div>
  );
};

interface AnimatedCounterProps {
  target: number;
  padZero?: boolean;
  suffix?: string;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  padZero = false,
  suffix = '',
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<number>(
    prefersReducedMotion ? target : 0
  );

  useEffect(() => {
    if (!isInView) return;
    if (prefersReducedMotion) {
      setDisplayValue(target);
      return;
    }

    const controls = animate(0, target, {
      duration: 1.15,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, target, prefersReducedMotion]);

  const formatted = padZero
    ? String(displayValue).padStart(2, '0')
    : String(displayValue);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {formatted}
      {suffix}
    </span>
  );
};

interface AnimatedHeadingRevealProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const AnimatedHeadingReveal: React.FC<AnimatedHeadingRevealProps> = ({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
}) => {
  const alignClasses = align === 'center' ? 'mx-auto text-center items-center' : 'text-left';

  return (
    <div className={`flex flex-col ${alignClasses} ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-[#541C2B] dark:text-[#C5A46D]"
      >
        {align === 'center' && (
          <span className="h-[1px] w-6 bg-[#C5A46D]/70" aria-hidden="true" />
        )}
        <span>{eyebrow}</span>
        <span className="h-[1px] w-6 bg-[#C5A46D]/70" aria-hidden="true" />
      </motion.div>

      <div className="overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 font-display text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold leading-tight text-[#202020] dark:text-white [text-wrap:balance]"
        >
          {title}
        </motion.h2>
      </div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-[#202020]/75 dark:text-white/75 dark:tracking-[0.01em]"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
