import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  animate,
  TargetAndTransition,
} from 'motion/react';
import { useTheme } from '../context/ThemeContext';

/**
 * Returns true only on desktop devices with a fine pointer (mouse/trackpad)
 * when prefers-reduced-motion is NOT enabled.
 */
export function useIsFinePointer(): boolean {
  const prefersReducedMotion = useReducedMotion();
  const [isFine, setIsFine] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReducedMotion) {
      setIsFine(false);
      return;
    }
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setIsFine(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [prefersReducedMotion]);

  return isFine && !prefersReducedMotion;
}

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
      style={{
        scaleX,
        background: 'linear-gradient(90deg, var(--accent), var(--accent-2), var(--accent))',
      }}
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left"
    />
  );
};

interface AnimatedSectionDividerProps {
  className?: string;
}

export const AnimatedSectionDivider: React.FC<AnimatedSectionDividerProps> = ({
  className = '',
}) => {
  const { activeStyleMeta } = useTheme();
  const variant = activeStyleMeta.dividerVariant;

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
        className="h-[1px] flex-1 origin-right"
        style={{
          background: 'linear-gradient(to left, var(--accent-2), transparent)',
          opacity: 0.65,
        }}
      />

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.45, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="mx-3 flex items-center justify-center"
      >
        {variant === 'diamond' && (
          <span className="h-2.5 w-2.5 rotate-45 border border-[var(--accent-2)] bg-[var(--bg)]" />
        )}
        {variant === 'floral' && (
          <svg
            width="22"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            className="text-[var(--accent-2)]"
          >
            <path
              d="M11 2C13 5.5 13 10.5 11 14C9 10.5 9 5.5 11 2Z"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="var(--bg)"
            />
            <path
              d="M3 8C6 6 8.5 7 11 8C8.5 9 6 10 3 8Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />
            <path
              d="M19 8C16 6 13.5 7 11 8C13.5 9 16 10 19 8Z"
              stroke="currentColor"
              strokeWidth="1.1"
            />
          </svg>
        )}
        {variant === 'gala' && (
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            className="text-[var(--accent)]"
          >
            <path
              d="M9 1L10.8 7.2L17 9L10.8 10.8L9 17L7.2 10.8L1 9L7.2 7.2L9 1Z"
              fill="var(--accent-2)"
              fillOpacity="0.25"
              stroke="currentColor"
              strokeWidth="1.1"
            />
          </svg>
        )}
        {variant === 'editorial' && (
          <span className="h-3 w-[2px] bg-[var(--accent)]" />
        )}
      </motion.div>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="h-[1px] flex-1 origin-left"
        style={{
          background: 'linear-gradient(to right, var(--accent-2), transparent)',
          opacity: 0.65,
        }}
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

interface SplitTextRevealProps {
  text: string;
  highlightWords?: string[];
  className?: string;
  delay?: number;
}

export const SplitTextReveal: React.FC<SplitTextRevealProps> = ({
  text,
  highlightWords = [],
  className = '',
  delay = 0.06,
}) => {
  const words = text.split(' ');
  const highlightSet = new Set(highlightWords.map((w) => w.toLowerCase()));

  return (
    <span className={className}>
      {words.map((word, idx) => {
        const clean = word.toLowerCase().replace(/[.,!?:;]/g, '');
        const isHighlighted = highlightSet.has(clean);
        return (
          <span
            key={`${word}-${idx}`}
            className="inline-block overflow-hidden align-bottom pb-[0.06em] -mb-[0.06em]"
          >
            <motion.span
              initial={{ opacity: 0, y: '105%' }}
              animate={{ opacity: 1, y: '0%' }}
              transition={{
                duration: 0.6,
                delay: delay + idx * 0.055,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`inline-block ${
                isHighlighted ? 'italic font-medium text-[var(--accent)]' : ''
              }`}
            >
              {word}
              {idx < words.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        );
      })}
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
        className="flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-[var(--accent)]"
      >
        {align === 'center' && (
          <span className="h-[1px] w-6 bg-[var(--accent-2)] opacity-75" aria-hidden="true" />
        )}
        <span>{eyebrow}</span>
        <span className="h-[1px] w-6 bg-[var(--accent-2)] opacity-75" aria-hidden="true" />
      </motion.div>

      <div className="overflow-hidden">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 font-display font-semibold leading-tight text-[var(--text)] [text-wrap:balance]"
          style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.65rem)' }}
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
          className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-[var(--text-muted)]"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};

interface MagneticLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  strength?: number;
}

export const MagneticLink: React.FC<MagneticLinkProps> = ({
  children,
  strength = 0.22,
  className = '',
  style,
  ...rest
}) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const isFinePointer = useIsFinePointer();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20 });
  const springY = useSpring(y, { stiffness: 260, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isFinePointer || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - (rect.left + rect.width / 2);
    const offsetY = e.clientY - (rect.top + rect.height / 2);
    x.set(offsetX * strength);
    y.set(offsetY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      style={{
        x: isFinePointer ? springX : 0,
        y: isFinePointer ? springY : 0,
        ...style,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={isFinePointer ? { y: -2 } : undefined}
      whileTap={{ scale: 0.97 }}
      className={className}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </motion.a>
  );
};

interface InteractiveTiltCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
}

export const InteractiveTiltCard: React.FC<InteractiveTiltCardProps> = ({
  children,
  className = '',
  style,
  delay = 0,
}) => {
  const cardRef = useRef<HTMLElement>(null);
  const isFinePointer = useIsFinePointer();
  const [hovered, setHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(120);
  const glowY = useMotionValue(120);

  const springRotateX = useSpring(rotateX, { stiffness: 240, damping: 24 });
  const springRotateY = useSpring(rotateY, { stiffness: 240, damping: 24 });
  const springGlowX = useSpring(glowX, { stiffness: 300, damping: 30 });
  const springGlowY = useSpring(glowY, { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!isFinePointer || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const relY = e.clientY - rect.top;
    const px = relX / rect.width - 0.5;
    const py = relY / rect.height - 0.5;
    rotateX.set(-py * 7);
    rotateY.set(px * 8);
    glowX.set(relX);
    glowY.set(relY);
  };

  const handleMouseEnter = () => {
    if (isFinePointer) setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{
        duration: 0.48,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformPerspective: 950,
        rotateX: isFinePointer ? springRotateX : 0,
        rotateY: isFinePointer ? springRotateY : 0,
        ...style,
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Cursor-following gold glow (transform + opacity only, desktop only) */}
      {isFinePointer && (
        <motion.span
          aria-hidden="true"
          style={{
            x: springGlowX,
            y: springGlowY,
            opacity: hovered ? 1 : 0,
            background:
              'radial-gradient(circle, rgba(197, 164, 109, 0.24) 0%, rgba(197, 164, 109, 0.06) 45%, transparent 72%)',
          }}
          transition={{ opacity: { duration: 0.2 } }}
          className="pointer-events-none absolute -left-32 -top-32 h-64 w-64 rounded-full"
        />
      )}
      {children}
    </motion.article>
  );
};

export type SectionRevealVariant = 'fade-up' | 'clip-rise' | 'slide-left' | 'scale-in';

interface SectionRevealProps {
  children: React.ReactNode;
  variant?: SectionRevealVariant;
  className?: string;
}

export const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  variant = 'fade-up',
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const variants: Record<
    SectionRevealVariant,
    { initial: TargetAndTransition; whileInView: TargetAndTransition }
  > = {
    'fade-up': {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
    },
    'clip-rise': {
      initial: { opacity: 0, y: 26, scale: 0.99 },
      whileInView: { opacity: 1, y: 0, scale: 1 },
    },
    'slide-left': {
      initial: { opacity: 0, x: 24 },
      whileInView: { opacity: 1, x: 0 },
    },
    'scale-in': {
      initial: { opacity: 0, scale: 0.97 },
      whileInView: { opacity: 1, scale: 1 },
    },
  };

  const selected = variants[variant];

  return (
    <motion.div
      initial={selected.initial}
      whileInView={selected.whileInView}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const CustomCursor: React.FC = () => {
  const isFinePointer = useIsFinePointer();
  const [visible, setVisible] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const ringX = useSpring(mouseX, { stiffness: 320, damping: 28, mass: 0.5 });
  const ringY = useSpring(mouseY, { stiffness: 320, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (!isFinePointer) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);

      const target = e.target as HTMLElement | null;
      const interactive = Boolean(
        target?.closest('a, button, [role="button"], [role="tab"], input, select, textarea')
      );
      setIsInteractive(interactive);
    };

    const onMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isFinePointer, mouseX, mouseY]);

  if (!isFinePointer) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x: ringX,
        y: ringY,
        opacity: visible ? 1 : 0,
      }}
      className="pointer-events-none fixed left-0 top-0 z-[70] -translate-x-1/2 -translate-y-1/2"
    >
      <motion.div
        animate={{
          scale: isInteractive ? 1.55 : 1,
          opacity: isInteractive ? 0.85 : 0.55,
        }}
        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        className="h-8 w-8 rounded-full border border-[var(--accent-2)] bg-[var(--glow)]/10"
      />
      <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--accent)]" />
    </motion.div>
  );
};

interface ClipRevealMaskProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const ClipRevealMask: React.FC<ClipRevealMaskProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.4 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.72, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const LoadingIntro: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [showIntro, setShowIntro] = useState(() => !prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      setShowIntro(false);
      return;
    }
    const timer = window.setTimeout(() => {
      setShowIntro(false);
    }, 1050);
    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          aria-hidden="true"
          initial={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
          className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-[var(--bg)] px-6 border-b border-[var(--border-strong)]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-4 text-center"
          >
            {/* Animated Draw-In Monogram Crest */}
            <svg
              width="68"
              height="68"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <motion.rect
                x="2"
                y="2"
                width="36"
                height="36"
                rx="3"
                stroke="var(--accent-2)"
                strokeWidth="1.25"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.rect
                x="5.5"
                y="5.5"
                width="29"
                height="29"
                rx="1.5"
                fill="var(--accent)"
                stroke="var(--accent-2)"
                strokeWidth="0.75"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              />
              <motion.path
                d="M12.5 13V27M12.5 20L18.5 13M14.8 17.5L19 27"
                stroke="var(--accent-text)"
                strokeWidth="1.65"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.55, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.path
                d="M22.5 13V27M22.5 20L28.5 13M24.8 17.5L29 27"
                stroke="var(--accent-2)"
                strokeWidth="1.65"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.55, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>

            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className="font-display text-xl font-semibold tracking-tight text-[var(--text)]"
            >
              KK Decor and Event
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
