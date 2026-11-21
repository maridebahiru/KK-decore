import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import {
  PORTFOLIO_CATEGORIES,
  PORTFOLIO_PROJECTS,
  PortfolioCategory,
  PortfolioProject,
} from '../data/companyData';
import { AnimatedHeadingReveal } from './MotionPrimitives';

interface MotifVisualProps {
  motif: PortfolioProject['motif'];
  title: string;
}

const PortfolioVisualComposition: React.FC<MotifVisualProps> = ({ motif, title }) => {
  switch (motif) {
    case 'cathedral-arch':
      return (
        <div
          aria-label={`Geometric architectural composition for ${title}`}
          className="relative h-56 w-full overflow-hidden bg-gradient-to-b from-[#541C2B] via-[#3d131f] to-[#260b12] p-5"
        >
          <div className="absolute inset-0 kk-fine-grid opacity-30" />
          <div className="relative flex h-full w-full items-end justify-center">
            <div className="h-[88%] w-[64%] rounded-t-full border border-[#C5A46D]/60 bg-[#FAF8F4]/[0.06] flex items-end justify-center p-3">
              <div className="h-[85%] w-[78%] rounded-t-full border border-[#C5A46D] bg-gradient-to-b from-[#C5A46D]/20 to-transparent flex items-center justify-center">
                <svg viewBox="0 0 80 80" className="h-14 w-14 text-[#C5A46D]" fill="none" aria-hidden="true">
                  <path d="M40 12V68M16 40H64" stroke="currentColor" strokeWidth="0.9" strokeOpacity="0.6" />
                  <circle cx="40" cy="40" r="18" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M40 24L45 35L56 40L45 45L40 56L35 45L24 40L35 35L40 24Z" fill="rgba(250,248,244,0.22)" stroke="currentColor" strokeWidth="1" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-x-6 bottom-0 h-[1px] bg-[#C5A46D]/80" />
          </div>
        </div>
      );

    case 'interlocking-rings':
      return (
        <div
          aria-label={`Geometric architectural composition for ${title}`}
          className="relative h-56 w-full overflow-hidden bg-gradient-to-br from-[#FAF8F4] via-[#F2ECE1] to-[#E8DEC9] dark:from-[#26201c] dark:via-[#1f1a18] dark:to-[#181414] p-5"
        >
          <div className="absolute inset-0 kk-hero-lattice opacity-80" />
          <div className="relative flex h-full w-full items-center justify-center">
            <svg viewBox="0 0 200 140" className="h-full w-full max-w-[220px]" fill="none" aria-hidden="true">
              <circle cx="82" cy="70" r="42" stroke="#C5A46D" strokeWidth="1.6" />
              <circle cx="82" cy="70" r="34" stroke="#541C2B" strokeOpacity="0.45" strokeWidth="0.9" strokeDasharray="3 3" />
              <circle cx="118" cy="70" r="42" stroke="#541C2B" strokeWidth="1.6" className="dark:stroke-[#FAF8F4]" />
              <circle cx="118" cy="70" r="34" stroke="#C5A46D" strokeWidth="0.9" />
              <line x1="26" y1="122" x2="174" y2="122" stroke="#C5A46D" strokeWidth="1" />
            </svg>
          </div>
        </div>
      );

    case 'executive-monolith':
      return (
        <div
          aria-label={`Geometric architectural composition for ${title}`}
          className="relative h-56 w-full overflow-hidden bg-gradient-to-b from-[#202020] via-[#1a1a1a] to-[#111111] p-5"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(197,164,109,0.22),transparent_65%)]" />
          <div className="relative flex h-full w-full items-end justify-center gap-3 pt-4">
            <div className="h-[72%] w-16 rounded-t-sm border border-[#C5A46D]/40 bg-[#262626]" />
            <div className="h-[92%] w-24 rounded-t-sm border border-[#C5A46D] bg-gradient-to-b from-[#541C2B]/70 to-[#202020] flex flex-col items-center justify-center gap-2 p-2">
              <div className="h-8 w-8 rotate-45 border border-[#C5A46D]" />
              <div className="h-[1px] w-12 bg-[#C5A46D]/70" />
            </div>
            <div className="h-[72%] w-16 rounded-t-sm border border-[#C5A46D]/40 bg-[#262626]" />
          </div>
        </div>
      );

    case 'celestial-starburst':
      return (
        <div
          aria-label={`Geometric architectural composition for ${title}`}
          className="relative h-56 w-full overflow-hidden bg-gradient-to-tr from-[#3a121d] via-[#541C2B] to-[#6e2438] p-5"
        >
          <div className="absolute inset-0 kk-diagonal-weave" />
          <div className="relative flex h-full w-full items-center justify-center">
            <svg viewBox="0 0 180 140" className="h-full w-full max-w-[200px]" fill="none" aria-hidden="true">
              <circle cx="90" cy="70" r="48" stroke="#C5A46D" strokeOpacity="0.45" strokeWidth="1" />
              <circle cx="90" cy="70" r="30" stroke="#C5A46D" strokeWidth="1.3" />
              <path
                d="M90 14V126M34 70H146M50 30L130 110M130 30L50 110"
                stroke="#C5A46D"
                strokeOpacity="0.65"
                strokeWidth="0.9"
              />
              <polygon points="90,46 98,62 114,70 98,78 90,94 82,78 66,70 82,62" fill="#C5A46D" fillOpacity="0.35" stroke="#FAF8F4" strokeWidth="1" />
            </svg>
          </div>
        </div>
      );

    case 'heritage-lattice':
      return (
        <div
          aria-label={`Geometric architectural composition for ${title}`}
          className="relative h-56 w-full overflow-hidden bg-[#541C2B] p-5"
        >
          <div className="absolute inset-0 kk-double-weave opacity-95" />
          <div className="relative flex h-full w-full items-center justify-center">
            <div className="flex h-36 w-36 rotate-45 items-center justify-center border border-[#C5A46D] bg-[#2a0c14]/75">
              <div className="flex h-24 w-24 items-center justify-center border border-[#FAF8F4]/70">
                <div className="h-10 w-10 border border-[#C5A46D] bg-[#C5A46D]/25" />
              </div>
            </div>
          </div>
        </div>
      );

    case 'vaulted-chandelier':
      return (
        <div
          aria-label={`Geometric architectural composition for ${title}`}
          className="relative h-56 w-full overflow-hidden bg-gradient-to-b from-[#F5F0E6] via-[#FAF8F4] to-[#EDE5D5] dark:from-[#1f1b18] dark:via-[#222222] dark:to-[#171314] p-5"
        >
          <div className="relative flex h-full w-full items-start justify-center">
            <svg viewBox="0 0 220 140" className="h-full w-full" fill="none" aria-hidden="true">
              <path d="M10 10 Q110 85 210 10" stroke="#C5A46D" strokeWidth="1.2" />
              <path d="M25 10 Q110 105 195 10" stroke="#541C2B" strokeOpacity="0.45" strokeWidth="1" className="dark:stroke-[#C5A46D]/60" />
              <path d="M45 10 Q110 125 175 10" stroke="#C5A46D" strokeOpacity="0.65" strokeWidth="0.9" />
              <line x1="110" y1="0" x2="110" y2="54" stroke="#C5A46D" strokeWidth="1.2" />
              <circle cx="110" cy="70" r="18" stroke="#541C2B" strokeWidth="1.4" className="dark:stroke-[#FAF8F4]" />
              <circle cx="110" cy="70" r="10" stroke="#C5A46D" strokeWidth="1.2" fill="rgba(197,164,109,0.22)" />
            </svg>
          </div>
        </div>
      );
  }
};

export const PortfolioSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory>('All');
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  const filteredProjects =
    selectedCategory === 'All'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((project) => project.category === selectedCategory);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveProject(null);
      }
    };
    if (activeProject) {
      window.addEventListener('keydown', onKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeProject]);

  return (
    <section
      id="portfolio"
      className="bg-white dark:bg-[#191919] py-20 sm:py-24 border-b border-[#541C2B]/10 dark:border-white/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <AnimatedHeadingReveal
            eyebrow="Our Portfolio"
            title="Architectural Design Studies & Curated Event Concepts"
            className="max-w-2xl"
          />
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-md text-sm sm:text-base leading-relaxed text-[#202020]/75 dark:text-white/75 dark:tracking-[0.01em]"
          >
            Explore our geometric spatial compositions across weddings, engagements, corporate
            galas, cultural gatherings, and full-hall transformations.
          </motion.p>
        </div>

        {/* Interactive Category Filter Bar */}
        <div
          role="tablist"
          aria-label="Filter portfolio by event category"
          className="mt-10 flex flex-wrap items-center gap-2 border-b border-[#541C2B]/10 dark:border-white/10 pb-5"
        >
          {PORTFOLIO_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(category)}
                className={`relative min-h-[40px] rounded-md px-4 py-2 text-xs sm:text-sm font-medium transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A46D] ${
                  isActive
                    ? 'text-white dark:text-[#151515]'
                    : 'bg-[#FAF8F4] text-[#202020]/80 hover:text-[#541C2B] border border-[#541C2B]/12 dark:bg-[#222222] dark:text-white/80 dark:border-white/10 dark:hover:text-[#C5A46D]'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="portfolioCategoryIndicator"
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    aria-hidden="true"
                    className="absolute inset-0 rounded-md bg-[#541C2B] dark:bg-[#C5A46D]"
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>

        {/* Portfolio Grid with Animated Filtering */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 8 }}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="group flex flex-col overflow-hidden rounded-xl border border-[#541C2B]/12 dark:border-white/10 bg-[#FAF8F4] dark:bg-[#222222] shadow-[0_8px_28px_-20px_rgba(84,28,43,0.12)] transition-all duration-200 hover:border-[#C5A46D] hover:shadow-[0_18px_40px_-20px_rgba(197,164,109,0.28)]"
              >
                <div className="relative overflow-hidden border-b border-[#541C2B]/10 dark:border-white/10">
                  <div className="transition-transform duration-500 ease-out group-hover:scale-[1.04]">
                    <PortfolioVisualComposition motif={project.motif} title={project.title} />
                  </div>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-tr from-transparent via-[#C5A46D]/10 to-transparent"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <p className="text-xs font-medium text-[#541C2B] dark:text-[#C5A46D]">
                      {project.category}
                      <span aria-hidden="true" className="mx-2 text-[#C5A46D]">·</span>
                      <span className="text-[#202020]/65 dark:text-white/65">{project.subtitle}</span>
                    </p>
                    <h3 className="mt-2.5 font-display text-2xl font-semibold leading-snug text-[#202020] dark:text-white">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#202020]/75 dark:text-white/75 dark:tracking-[0.01em]">
                      {project.summary}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#541C2B]/10 dark:border-white/10 pt-4">
                    <div className="flex items-center gap-1.5" aria-label="Color story palette">
                      {project.colorStory.map((swatch) => (
                        <span
                          key={swatch.name}
                          title={swatch.name}
                          className="h-3.5 w-3.5 rounded-full border border-black/15 dark:border-white/25"
                          style={{ backgroundColor: swatch.hex }}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveProject(project)}
                      className="inline-flex min-h-[40px] items-center gap-1.5 text-xs font-semibold text-[#541C2B] hover:text-[#3f1420] dark:text-[#C5A46D] dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A46D] rounded-sm"
                    >
                      <span>View Details</span>
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Expandable Project Details Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="portfolio-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl border border-[#C5A46D]/50 bg-white dark:bg-[#222222] shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Close project details"
                className="absolute right-4 top-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#202020] hover:bg-[#541C2B] hover:text-white dark:bg-[#151515]/90 dark:text-white dark:hover:bg-[#C5A46D] dark:hover:text-[#151515] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C5A46D]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              <PortfolioVisualComposition
                motif={activeProject.motif}
                title={activeProject.title}
              />

              <div className="p-6 sm:p-8">
                <p className="text-xs font-medium text-[#541C2B] dark:text-[#C5A46D]">
                  {activeProject.category}
                  <span aria-hidden="true" className="mx-2 text-[#C5A46D]">·</span>
                  <span className="text-[#202020]/70 dark:text-white/70">{activeProject.subtitle}</span>
                </p>

                <h3
                  id="portfolio-modal-title"
                  className="mt-2 font-display text-3xl font-semibold text-[#202020] dark:text-white"
                >
                  {activeProject.title}
                </h3>

                <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#202020]/85 dark:text-white/85">
                  {activeProject.designBrief}
                </p>

                <div className="mt-6 border-t border-[#541C2B]/10 dark:border-white/10 pt-5">
                  <h4 className="text-xs font-semibold tracking-[0.12em] text-[#541C2B] dark:text-[#C5A46D]">
                    Architectural &amp; Styling Elements
                  </h4>
                  <ul className="mt-3 space-y-2.5">
                    {activeProject.architecturalElements.map((el) => (
                      <li
                        key={el}
                        className="flex items-start gap-2.5 text-sm text-[#202020]/80 dark:text-white/80"
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#C5A46D]"
                          aria-hidden="true"
                        />
                        <span>{el}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#541C2B]/10 dark:border-white/10 pt-5">
                  <div className="flex flex-wrap items-center gap-4">
                    {activeProject.colorStory.map((swatch) => (
                      <div key={swatch.name} className="flex items-center gap-2 text-xs text-[#202020]/75 dark:text-white/75">
                        <span
                          className="h-4 w-4 rounded-full border border-black/15 dark:border-white/25"
                          style={{ backgroundColor: swatch.hex }}
                        />
                        <span>{swatch.name}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    onClick={() => setActiveProject(null)}
                    className="inline-flex min-h-[42px] items-center justify-center rounded-md bg-[#541C2B] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#3f1420] dark:bg-[#C5A46D] dark:text-[#151515] dark:hover:bg-[#d4b681] transition-colors whitespace-nowrap shrink-0"
                  >
                    Request Similar Concept
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
