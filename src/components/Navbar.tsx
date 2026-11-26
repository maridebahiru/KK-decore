import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { NAV_ITEMS } from '../data/companyData';
import { useTheme } from '../context/ThemeContext';
import { BrandMark } from './BrandMark';
import { ScrollProgressBar } from './MotionPrimitives';

export const Navbar: React.FC = () => {
  const { mode, toggleMode } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState<string>('#home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.replace('#', ''));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0 && visible[0].target.id) {
          setActiveHref(`#${visible[0].target.id}`);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.35, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
      }
    };
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (href?: string) => {
    if (href) setActiveHref(href);
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${
          scrolled
            ? 'border-[var(--border-strong)] bg-[var(--bg)]/92 backdrop-blur-md'
            : 'border-[var(--border)] bg-[var(--bg)]'
        }`}
      >
        <div className="kk-container flex h-16 items-center justify-between gap-4 sm:gap-6">
          {/* Zone 1: Brand Wordmark & Crest */}
          <a
            href="#home"
            onClick={() => handleNavClick('#home')}
            className="min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] rounded-sm"
            aria-label="KK Decor and Event — Home"
          >
            <BrandMark />
          </a>

          {/* Zone 2: Desktop Navigation Links */}
          <nav aria-label="Primary Navigation" className="hidden lg:flex items-center gap-6">
            {NAV_ITEMS.map((item) => {
              const isActive = activeHref === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={`group relative py-1 text-[13px] font-medium tracking-[0.02em] transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)] rounded-sm ${
                    isActive
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--accent)]'
                  }`}
                >
                  {item.label}
                  {isActive ? (
                    <motion.span
                      layoutId="activeNavUnderline"
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-[var(--accent)]"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left scale-x-0 bg-[var(--accent-2)] transition-transform duration-200 group-hover:scale-x-100"
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Theme Toggle & Mobile Menu Trigger (44px+ tap targets) */}
          <div className="flex items-center gap-2 shrink-0">
            <motion.button
              type="button"
              whileTap={{ scale: 0.94 }}
              onClick={toggleMode}
              aria-label={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="inline-flex h-11 w-11 items-center justify-center border border-[var(--border)] bg-[var(--surface)] text-[var(--accent)] hover:border-[var(--accent-2)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] cursor-pointer overflow-hidden"
              style={{ borderRadius: 'var(--radius-btn)' }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mode}
                  initial={{ opacity: 0, rotate: -35, scale: 0.75 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 35, scale: 0.75 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-flex items-center justify-center"
                >
                  {mode === 'dark' ? (
                    <Sun className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Moon className="h-4 w-4" aria-hidden="true" />
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-fullscreen-menu"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              className="inline-flex lg:hidden h-11 w-11 items-center justify-center border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--accent-2)] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] cursor-pointer"
              style={{ borderRadius: 'var(--radius-btn)' }}
            >
              {mobileOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Scroll Progress Indicator */}
        <ScrollProgressBar />
      </header>

      {/* Full-Screen Animated Mobile Menu with Staggered Links */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-fullscreen-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex flex-col justify-between bg-[var(--bg)] px-5 py-4 lg:hidden overflow-y-auto"
          >
            <div className="flex h-16 items-center justify-between border-b border-[var(--border)] pb-3">
              <a
                href="#home"
                onClick={() => handleNavClick('#home')}
                className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent)]"
              >
                <BrandMark />
              </a>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                className="inline-flex h-11 w-11 items-center justify-center border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-[var(--accent)] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                style={{ borderRadius: 'var(--radius-btn)' }}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Full-screen Mobile Navigation" className="my-auto py-8">
              <ul className="space-y-2">
                {NAV_ITEMS.map((item, idx) => {
                  const isActive = activeHref === item.href;
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -18 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{
                        duration: 0.28,
                        delay: 0.04 + idx * 0.045,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    >
                      <a
                        href={item.href}
                        onClick={() => handleNavClick(item.href)}
                        className={`flex min-h-[48px] items-center justify-between border px-4 py-3 font-display text-2xl font-semibold transition-colors ${
                          isActive
                            ? 'border-[var(--accent)] bg-[var(--surface-alt)] text-[var(--accent)]'
                            : 'border-transparent text-[var(--text)] hover:border-[var(--border)] hover:bg-[var(--surface)]'
                        }`}
                        style={{ borderRadius: 'calc(var(--radius) * 0.65)' }}
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-xs font-sans font-semibold text-[var(--accent-2)] tabular-nums">
                            {String(idx + 1).padStart(2, '0')}
                          </span>
                          <span>{item.label}</span>
                        </span>
                        <span className="text-base text-[var(--accent-2)]" aria-hidden="true">
                          →
                        </span>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center justify-between border-t border-[var(--border)] pt-4 text-xs text-[var(--text-muted)]">
              <span>KK Decor and Event</span>
              <button
                type="button"
                onClick={toggleMode}
                className="inline-flex min-h-[44px] items-center gap-2 border border-[var(--border)] bg-[var(--surface)] px-4 py-2 font-semibold text-[var(--text)] cursor-pointer"
                style={{ borderRadius: 'var(--radius-btn)' }}
              >
                {mode === 'dark' ? (
                  <>
                    <Sun className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4 text-[var(--accent)]" aria-hidden="true" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
