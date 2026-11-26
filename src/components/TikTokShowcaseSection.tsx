import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ExternalLink, Play, X } from 'lucide-react';
import {
  TIKTOK_PROFILE_URL,
  TIKTOK_VIDEOS,
  TikTokVideoItem,
} from '../data/companyData';
import { AnimatedHeadingReveal } from './MotionPrimitives';
import { ImageStreamHero, StreamImage } from './ui/image-stream-hero';

export const TikTokShowcaseSection: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState<TikTokVideoItem | null>(null);
  const [embedUnavailable, setEmbedUnavailable] = useState(false);

  useEffect(() => {
    if (!activeVideo) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveVideo(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeVideo]);

  // Repeat the TikTok videos redundantly across all cards in the 3D corridor
  const streamCards = useMemo<StreamImage[]>(() => {
    return TIKTOK_VIDEOS.map((video) => ({
      src: '',
      alt: `${video.title} — @kk_decorandevent on TikTok`,
      title: video.title,
      videoId: video.videoId,
      url: video.url,
      badge: '@kk_decorandevent',
    }));
  }, []);

  const handleCardClick = (card: StreamImage) => {
    const matched =
      TIKTOK_VIDEOS.find((v) => v.videoId === card.videoId) ?? TIKTOK_VIDEOS[0];
    setEmbedUnavailable(false);
    setActiveVideo(matched);
  };

  return (
    <section
      id="tiktok-showcase"
      className="kk-section border-b border-[var(--border)] bg-[var(--bg)]"
    >
      <div className="kk-container">
        <AnimatedHeadingReveal
          eyebrow="Highlights"
          title="On TikTok"
          align="center"
        />

        {/* Template-Sized (560px) ImageStreamHero with Live TikTok Video Covers on Cards */}
        <ImageStreamHero
          images={streamCards}
          cards={9}
          speed={18}
          axis={55}
          path={{
            perspective: 30,
            cardWidth: 16,
            cardHeight: 28,
            cardRadius: 0.65,
            birthHeight: 2.6,
            exitHeight: 46,
            railBirth: -11,
            railExit: 44,
            fan: 3.3,
            turnBirth: 6,
            turnExit: 28,
            stops: 24,
          }}
          onCardClick={handleCardClick}
          className="mt-10 h-[560px] w-full rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] shadow-[var(--shadow)]"
        >
          {/* Clean Template Overlay: Top Headline & Bottom CTA, Open Center Corridor */}
          <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-between py-10 text-center">
            <div className="px-6">
              <h3 className="text-balance font-display text-3xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl">
                Events in motion,
                <br />
                front and centre.
              </h3>
            </div>

            <div className="pointer-events-auto flex flex-col items-center gap-3 px-6">
              <p className="max-w-md text-balance text-xs sm:text-sm text-[var(--text-muted)]">
                Tap any card in the stream to watch @kk_decorandevent reels.
              </p>
              <motion.a
                href={TIKTOK_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className="kk-shimmer-btn inline-flex min-h-[44px] items-center justify-center gap-2 bg-[var(--accent)] px-6 py-2.5 text-xs sm:text-sm font-semibold text-[var(--accent-text)] shadow-[var(--shadow)] hover:opacity-90 transition-opacity whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                style={{ borderRadius: 'var(--radius-btn)' }}
              >
                <span>Follow @kk_decorandevent</span>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </motion.a>
            </div>
          </div>
        </ImageStreamHero>
      </div>

      {/* Live TikTok Video Modal When Any Stream Card Is Clicked */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="tiktok-modal-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative flex w-full max-w-[380px] flex-col border border-[#C5A46D]/50 bg-[#140B0E] p-4 shadow-2xl"
              style={{ borderRadius: 'var(--radius)' }}
            >
              <div className="mb-3 flex items-center justify-between gap-3 text-[#FAF8F4]">
                <div className="min-w-0">
                  <p className="text-[11px] font-medium text-[#C5A46D]">
                    @kk_decorandevent
                  </p>
                  <h4
                    id="tiktok-modal-title"
                    className="truncate font-display text-xl font-semibold"
                  >
                    {activeVideo.title}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  aria-label="Close TikTok player"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#C5A46D]/45 bg-white/10 text-[#FAF8F4] hover:bg-[#541C2B] cursor-pointer"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div
                className="relative mx-auto aspect-[9/16] w-full overflow-hidden border border-[#C5A46D]/30 bg-black"
                style={{ borderRadius: 'calc(var(--radius) * 0.75)' }}
              >
                {!embedUnavailable ? (
                  <iframe
                    key={activeVideo.videoId}
                    src={`https://www.tiktok.com/player/v1/${activeVideo.videoId}?embed_from=oembed&autoplay=1&muted=0&loop=1&controls=1&description=1&music_info=1`}
                    title={activeVideo.title}
                    className="h-full w-full border-0"
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                    onError={() => setEmbedUnavailable(true)}
                  />
                ) : (
                  <div
                    className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-[#FAF8F4]"
                    style={{
                      background: 'linear-gradient(180deg, #541C2B 0%, #16080C 100%)',
                    }}
                  >
                    <Play className="h-10 w-10 text-[#C5A46D]" aria-hidden="true" />
                    <a
                      href={activeVideo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex min-h-[44px] items-center gap-2 bg-[#C5A46D] px-5 py-2.5 text-xs font-semibold text-[#191214]"
                      style={{ borderRadius: 'var(--radius-btn)' }}
                    >
                      <span>Open on TikTok</span>
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </div>
                )}
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-white/75">
                <a
                  href={activeVideo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#C5A46D] hover:underline"
                >
                  <span>Open on TikTok</span>
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
                {embedUnavailable && (
                  <button
                    type="button"
                    onClick={() => setEmbedUnavailable(false)}
                    className="underline cursor-pointer"
                  >
                    Retry Player
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
