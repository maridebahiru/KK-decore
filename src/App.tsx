/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EventMarqueeSection } from './components/EventMarqueeSection';
import { StyleSwitcher } from './components/StyleSwitcher';
import { FloatingMobileBookButton } from './components/ContactSection';
import {
  AnimatedSectionDivider,
  CustomCursor,
  LoadingIntro,
  SectionReveal,
} from './components/MotionPrimitives';

const ServicesSection = lazy(() =>
  import('./components/ServicesSection').then((m) => ({ default: m.ServicesSection }))
);
const PortfolioSection = lazy(() =>
  import('./components/PortfolioSection').then((m) => ({ default: m.PortfolioSection }))
);
const BeforeAfterSection = lazy(() =>
  import('./components/BeforeAfterSection').then((m) => ({
    default: m.BeforeAfterSection,
  }))
);
const ProcessSection = lazy(() =>
  import('./components/ProcessSection').then((m) => ({ default: m.ProcessSection }))
);
const StatsSection = lazy(() =>
  import('./components/StatsSection').then((m) => ({ default: m.StatsSection }))
);
const TestimonialsSection = lazy(() =>
  import('./components/TestimonialsSection').then((m) => ({
    default: m.TestimonialsSection,
  }))
);
const TikTokShowcaseSection = lazy(() =>
  import('./components/TikTokShowcaseSection').then((m) => ({
    default: m.TikTokShowcaseSection,
  }))
);
const PartnersSection = lazy(() =>
  import('./components/PartnersSection').then((m) => ({ default: m.PartnersSection }))
);
const ContactSection = lazy(() =>
  import('./components/ContactSection').then((m) => ({ default: m.ContactSection }))
);
const Footer = lazy(() =>
  import('./components/Footer').then((m) => ({ default: m.Footer }))
);

const SectionFallback: React.FC = () => (
  <div
    aria-hidden="true"
    className="min-h-[320px] w-full border-b border-[var(--border)] bg-[var(--bg)]"
  />
);

const AppShell: React.FC = () => {
  const { isSwitchingStyle } = useTheme();

  return (
    <div className="relative min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      {/* Subtle Film Grain Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[65] kk-grain-overlay"
      />

      <LoadingIntro />
      <CustomCursor />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-[var(--accent-text)] shadow-lg"
        style={{ borderRadius: 'var(--radius-btn)' }}
      >
        Skip to content
      </a>

      {/* Smooth Cross-Fade Veil During Template Switch */}
      <AnimatePresence>
        {isSwitchingStyle && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none fixed inset-0 z-[75] bg-[var(--bg)]"
          />
        )}
      </AnimatePresence>

      <Navbar />

      <motion.main
        id="main-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <HeroSection />
        <EventMarqueeSection />

        <Suspense fallback={<SectionFallback />}>
          <SectionReveal variant="clip-rise">
            <ServicesSection />
          </SectionReveal>
          <AnimatedSectionDivider className="-my-px" />

          <SectionReveal variant="scale-in">
            <PortfolioSection />
          </SectionReveal>

          <SectionReveal variant="fade-up">
            <BeforeAfterSection />
          </SectionReveal>
          <AnimatedSectionDivider className="-my-px" />

          <SectionReveal variant="clip-rise">
            <ProcessSection />
          </SectionReveal>
          <AnimatedSectionDivider className="-my-px" />

          <SectionReveal variant="scale-in">
            <TestimonialsSection />
          </SectionReveal>

          <SectionReveal variant="fade-up">
            <StatsSection />
          </SectionReveal>
          <AnimatedSectionDivider className="-my-px" />

          <SectionReveal variant="slide-left">
            <TikTokShowcaseSection />
          </SectionReveal>

          <SectionReveal variant="fade-up">
            <PartnersSection />
          </SectionReveal>
          <AnimatedSectionDivider className="-my-px" />

          <SectionReveal variant="clip-rise">
            <ContactSection />
          </SectionReveal>
        </Suspense>
      </motion.main>

      <Suspense fallback={<div aria-hidden="true" className="min-h-[240px] bg-[var(--footer-bg)]" />}>
        <Footer />
      </Suspense>

      <FloatingMobileBookButton />
      <StyleSwitcher />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <AppShell />
      </MotionConfig>
    </ThemeProvider>
  );
}
