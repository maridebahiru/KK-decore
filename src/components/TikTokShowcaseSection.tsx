import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Play } from 'lucide-react';
import { TIKTOK_PROFILE_URL, TIKTOK_VIDEOS, TikTokVideoItem } from '../data/companyData';
import { AnimatedHeadingReveal } from './MotionPrimitives';

interface TikTokCardProps {
  video: TikTokVideoItem;
  index: number;
}

const TikTokVideoCard: React.FC<TikTokCardProps> = ({ video, index }) => {
  const [embedUnavailable, setEmbedUnavailable] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col rounded-2xl border border-[#541C2B]/14 dark:border-[#C5A46D]/25 bg-white dark:bg-[#222222] p-5 sm:p-6 shadow-[0_16px_44px_-24px_rgba(84,28,43,0.18)] dark:shadow-[0_16px_44px_-24px_rgba(0,0,0,0.65)] transition-colors duration-200 hover:border-[#C5A46D]"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-[#541C2B] dark:text-[#C5A46D]">
            Featured Video 0{index + 1}
            <span aria-hidden="true" className="mx-2 text-[#C5A46D]">·</span>
            <span>@kk_decorandevent</span>
          </p>
          <h3 className="mt-1 font-display text-xl sm:text-2xl font-semibold text-[#202020] dark:text-white">
            {video.title}
          </h3>
        </div>
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${video.title} directly on TikTok`}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#541C2B]/15 bg-[#FAF8F4] text-[#541C2B] hover:border-[#C5A46D] dark:border-white/15 dark:bg-[#1a1a1a] dark:text-[#C5A46D] transition-colors focus-visible:outline-2 focus-visible:outline-[#C5A46D]"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>

      {/* 9:16 Official TikTok Embed Player Container */}
      <div className="relative mx-auto w-full max-w-[360px] overflow-hidden rounded-xl border border-[#541C2B]/12 dark:border-white/10 bg-[#FAF8F4] dark:bg-[#151515]">
        {!embedUnavailable ? (
          <div className="relative aspect-[9/16] w-full">
            <iframe
              src={`https://www.tiktok.com/embed/v2/${video.videoId}`}
              title={video.title}
              className="h-full w-full border-0"
              allow="encrypted-media; fullscreen"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              onError={() => setEmbedUnavailable(true)}
            />
          </div>
        ) : (
          <div className="flex aspect-[9/16] w-full flex-col items-center justify-center bg-gradient-to-b from-[#541C2B] to-[#260b12] p-6 text-center text-white">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#C5A46D] bg-[#C5A46D]/15 text-[#C5A46D]">
              <Play className="h-6 w-6 ml-0.5" aria-hidden="true" />
            </div>
            <h4 className="mt-5 font-display text-2xl font-semibold text-white">
              {video.title}
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-white/80">
              Embedded playback is restricted in this browser environment. View the video directly
              on TikTok.
            </p>
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-[42px] items-center gap-2 rounded-md bg-[#C5A46D] px-5 py-2.5 text-xs font-semibold text-[#151515] hover:bg-[#d4b681] transition-colors"
            >
              <span>Open Original Video</span>
              <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-[#541C2B]/10 dark:border-white/10 pt-4">
        <p className="text-xs leading-relaxed text-[#202020]/75 dark:text-white/75">
          {video.caption}
        </p>
        <div className="flex items-center gap-3 shrink-0">
          {!embedUnavailable && (
            <button
              type="button"
              onClick={() => setEmbedUnavailable(true)}
              className="text-xs font-medium text-[#202020]/65 underline underline-offset-4 hover:text-[#541C2B] dark:text-white/65 dark:hover:text-[#C5A46D] cursor-pointer whitespace-nowrap"
            >
              Direct link view
            </button>
          )}
          {embedUnavailable && (
            <button
              type="button"
              onClick={() => setEmbedUnavailable(false)}
              className="text-xs font-medium text-[#541C2B] underline underline-offset-4 dark:text-[#C5A46D] cursor-pointer whitespace-nowrap"
            >
              Retry player
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
};

export const TikTokShowcaseSection: React.FC = () => {
  return (
    <section
      id="tiktok-showcase"
      className="bg-[#FAF8F4] dark:bg-[#151515] py-20 sm:py-24 border-b border-[#541C2B]/10 dark:border-white/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedHeadingReveal
          eyebrow="TikTok Showcase"
          title="Moments, Creativity & Inspiration"
          subtitle="Discover the creativity, beautiful decorations, and memorable celebrations of KK Decor and Event through our featured TikTok videos."
          align="center"
        />

        {/* Responsive 2-Column Desktop / 1-Column Mobile Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:mx-auto lg:max-w-5xl">
          {TIKTOK_VIDEOS.map((video, index) => (
            <TikTokVideoCard key={video.id} video={video} index={index} />
          ))}
        </div>

        {/* Watch More on TikTok CTA */}
        <div className="mt-12 flex justify-center">
          <motion.a
            href={TIKTOK_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex min-h-[46px] items-center justify-center gap-2.5 rounded-md bg-[#541C2B] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3f1420] dark:bg-[#C5A46D] dark:text-[#151515] dark:hover:bg-[#d4b681] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A46D]"
          >
            <span>Watch More on TikTok</span>
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </motion.a>
        </div>
      </div>
    </section>
  );
};
