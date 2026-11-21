import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { NAV_ITEMS } from '../data/companyData';
import { useTheme } from '../context/ThemeContext';
import { BrandMark } from './BrandMark';
import { ScrollProgressBar } from './MotionPrimitives';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
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
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleNavClick = (href?: string) => {
    if (href) setActiveHref(href);
    setMobileOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        scrolled
          ? 'bg-[#FAF8F4]/95 dark:bg-[#151515]/95 backdrop-blur-md border-b border-[#541C2B]/12 dark:border-[#C5A46D]/20'
          : 'bg-[#FAF8F4] dark:bg-[#151515] border-b border-[#541C2B]/8 dark:border-white/10'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Brand Wordmark & Crest */}
        <a
          href="#home"
          onClick={() => handleNavClick('#home')}
          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C5A46D] rounded-sm"
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
                className={`group relative py-1 text-[13px] font-medium tracking-[0.02em] transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C5A46D] rounded-sm ${
                  isActive
                    ? 'text-[#541C2B] dark:text-[#C5A46D]'
                    : 'text-[#202020]/85 hover:text-[#541C2B] dark:text-white/85 dark:hover:text-[#C5A46D]'
                }`}
              >
                {item.label}
                {isActive ? (
                  <motion.span
                    layoutId="activeNavUnderline"
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-[#541C2B] dark:bg-[#C5A46D]"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 -bottom-0.5 h-[1.5px] origin-left scale-x-0 bg-[#541C2B]/60 dark:bg-[#C5A46D]/70 transition-transform duration-200 group-hover:scale-x-100"
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Theme Toggle & Mobile Menu Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <motion.button
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#541C2B]/15 bg-white text-[#541C2B] hover:border-[#C5A46D] hover:bg-[#FAF8F4] dark:border-[#C5A46D]/25 dark:bg-[#222222] dark:text-[#C5A46D] dark:hover:border-[#C5A46D]/60 dark:hover:bg-[#2a2a2a] transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A46D] cursor-pointer overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ opacity: 0, rotate: -35, scale: 0.75 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 35, scale: 0.75 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center justify-center"
              >
                {theme === 'dark' ? (
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
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex lg:hidden h-10 w-10 items-center justify-center rounded-md border border-[#541C2B]/15 bg-white text-[#202020] hover:border-[#C5A46D] dark:border-[#C5A46D]/25 dark:bg-[#222222] dark:text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A46D] cursor-pointer"
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Animated Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-navigation-drawer"
            aria-label="Mobile Navigation"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden border-t border-[#541C2B]/10 dark:border-white/10 bg-[#FAF8F4] dark:bg-[#151515] px-4 py-4 shadow-lg"
          >
            <ul className="flex flex-col space-y-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className="flex min-h-[44px] items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-[#202020] hover:bg-[#541C2B]/8 hover:text-[#541C2B] dark:text-white dark:hover:bg-[#222222] dark:hover:text-[#C5A46D] transition-colors"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs text-[#C5A46D]" aria-hidden="true">
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
