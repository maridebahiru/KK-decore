import React from 'react';
import { motion } from 'motion/react';
import { ArrowUp, ExternalLink } from 'lucide-react';
import { COMPANY_CONTACT, NAV_ITEMS, SERVICES } from '../data/companyData';
import { BrandMark } from './BrandMark';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#202020] text-[#FAF8F4] dark:bg-[#111111] border-t border-[#C5A46D]/25">
      <motion.div
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-x-0 top-0 h-[1px] origin-center bg-gradient-to-r from-transparent via-[#C5A46D] to-transparent"
      />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Logo & Introduction */}
          <div className="lg:col-span-4">
            <a
              href="#home"
              className="inline-block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C5A46D] rounded-sm"
            >
              <span className="inline-flex items-center gap-3">
                <BrandMark compact />
                <span className="font-display text-xl font-semibold tracking-tight text-white">
                  KK Decor and Event
                </span>
              </span>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
              KK Decor and Event is a professional event planning and decoration company
              transforming weddings, cultural gatherings, and corporate occasions into refined,
              memorable celebrations.
            </p>

            <div className="mt-6">
              <a
                href={COMPANY_CONTACT.tiktok.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#C5A46D] hover:text-white transition-colors"
              >
                <span>TikTok: {COMPANY_CONTACT.tiktok.handle}</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-lg font-semibold text-[#C5A46D]">
              Quick Navigation
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-xs font-medium text-white/75 hover:text-[#C5A46D] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-lg font-semibold text-[#C5A46D]">
              Services
            </h3>
            <ul className="mt-4 space-y-2">
              {SERVICES.map((service) => (
                <li key={service.number}>
                  <a
                    href="#services"
                    className="text-xs text-white/75 hover:text-[#C5A46D] transition-colors"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Information & Social Links */}
          <div className="lg:col-span-3">
            <h3 className="font-display text-lg font-semibold text-[#C5A46D]">
              Contact &amp; Social
            </h3>
            <dl className="mt-4 space-y-3 text-xs text-white/75">
              <div>
                <dt className="font-semibold text-white/90">Phone</dt>
                <dd className="mt-0.5">{COMPANY_CONTACT.phone.value}</dd>
              </div>
              <div>
                <dt className="font-semibold text-white/90">Email</dt>
                <dd className="mt-0.5">{COMPANY_CONTACT.email.value}</dd>
              </div>
              <div>
                <dt className="font-semibold text-white/90">Office</dt>
                <dd className="mt-0.5">{COMPANY_CONTACT.officeLocation.value}</dd>
              </div>
              <div>
                <dt className="font-semibold text-white/90">Social Channels</dt>
                <dd className="mt-1 flex flex-wrap gap-x-3 gap-y-1">
                  <a
                    href={COMPANY_CONTACT.tiktok.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C5A46D] hover:underline"
                  >
                    TikTok ({COMPANY_CONTACT.tiktok.handle})
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Bottom Copyright & Back-to-Top Row */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/12 pt-7">
          <p className="text-xs text-white/65 text-center sm:text-left">
            © {new Date().getFullYear()} KK Decor and Event. All rights reserved.
          </p>

          <motion.button
            type="button"
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Back to top"
            className="group inline-flex min-h-[40px] items-center gap-2 rounded-md border border-[#C5A46D]/40 bg-white/5 px-4 py-2 text-xs font-medium text-[#C5A46D] hover:bg-[#C5A46D] hover:text-[#151515] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A46D]"
          >
            <span>Back to Top</span>
            <ArrowUp
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};
