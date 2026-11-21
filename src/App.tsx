/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MotionConfig, motion } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { TikTokShowcaseSection } from './components/TikTokShowcaseSection';
import { WhyChooseSection } from './components/WhyChooseSection';
import { ProcessSection } from './components/ProcessSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PartnersSection } from './components/PartnersSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AnimatedSectionDivider } from './components/MotionPrimitives';

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen bg-[#FAF8F4] text-[#202020] dark:bg-[#151515] dark:text-white transition-colors duration-300">
          <Navbar />
          <motion.main
            id="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <HeroSection />
            <AnimatedSectionDivider className="-my-px" />
            <AboutSection />
            <ServicesSection />
            <AnimatedSectionDivider className="-my-px" />
            <PortfolioSection />
            <TikTokShowcaseSection />
            <AnimatedSectionDivider className="-my-px" />
            <WhyChooseSection />
            <ProcessSection />
            <AnimatedSectionDivider className="-my-px" />
            <TestimonialsSection />
            <PartnersSection />
            <AnimatedSectionDivider className="-my-px" />
            <ContactSection />
          </motion.main>
          <Footer />
        </div>
      </MotionConfig>
    </ThemeProvider>
  );
}
