"use client";

import * as React from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

/* ── the corridor ────────────────────────────────────────────────
 * Two rails of cards ride from far behind the screen toward the
 * viewer. Perspective alone does the work that looks like two
 * animations: as a card's z grows it gets bigger *and* its screen x
 * sweeps outward from the vanishing point, because the projection
 * scales position and size by the same factor.
 * ─────────────────────────────────────────────────────────────── */

export type CorridorPath = {
  /** Strength of the projection. Lower is a wider-angle, more dramatic rush. @default 30 */
  perspective?: number;
  /** Card width in world units. @default 18 */
  cardWidth?: number;
  /** Card height in world units. @default 25 */
  cardHeight?: number;
  /** Corner radius applied to each card. @default 0.4 */
  cardRadius?: number;
  /** On-screen card height at the waist, where a card is born. @default 2.6 */
  birthHeight?: number;
  /** On-screen card height as a card leaves the frame. @default 46 */
  exitHeight?: number;
  /**
   * Lateral offset at birth. Negative starts the card across the axis so the
   * centre never opens up. @default -11
   */
  railBirth?: number;
  /** Lateral offset once the rails have finished opening. @default 44 */
  railExit?: number;
  /** How front-loaded the opening is. >1 opens early then holds. @default 3.3 */
  fan?: number;
  /** Y-rotation at birth, degrees. @default 6 */
  turnBirth?: number;
  /** Y-rotation at exit, degrees. @default 28 */
  turnExit?: number;
  /** Keyframe stops used to trace the curve. Raise only if motion looks faceted. @default 24 */
  stops?: number;
};

const PATH: Required<CorridorPath> = {
  perspective: 30,
  cardWidth: 18,
  cardHeight: 25,
  cardRadius: 0.4,
  birthHeight: 2.6,
  exitHeight: 46,
  railBirth: -11,
  railExit: 44,
  fan: 3.3,
  turnBirth: 6,
  turnExit: 28,
  stops: 24,
};

/** Sample the path once so the CSS keyframes trace the real curve. */
function keyframes(dir: 1 | -1, name: string, p: Required<CorridorPath>) {
  const steps: string[] = [];
  for (let s = 0; s <= p.stops; s++) {
    const u = s / p.stops;
    const scale =
      (p.birthHeight / p.cardHeight) *
      Math.pow(p.exitHeight / p.birthHeight, u);
    const z = p.perspective * (1 - 1 / scale);
    const rail =
      p.railExit - (p.railExit - p.railBirth) * Math.pow(1 - u, p.fan);
    const turn = p.turnBirth + (p.turnExit - p.turnBirth) * u;
    steps.push(
      `${(u * 100).toFixed(2)}%{transform:translate3d(${(dir * rail).toFixed(
        2,
      )}cqw,0,${z.toFixed(2)}cqw) rotateY(${(-dir * turn).toFixed(2)}deg)}`,
    );
  }
  return `@keyframes ${name}{${steps.join("")}}`;
}

export type StreamImage = {
  src: string;
  alt?: string;
  title?: string;
  videoId?: string;
  videoSrc?: string;
  url?: string;
  badge?: string;
};

export type ImageStreamHeroProps = {
  images: StreamImage[];
  /** @default 9 */
  cards?: number;
  /** @default 18 */
  speed?: number;
  /** @default 55 */
  axis?: number;
  /** Override any part of the corridor geometry. Merged over the defaults. */
  path?: CorridorPath;
  /** Optional click handler for interactive stream cards. */
  onCardClick?: (item: StreamImage, index: number) => void;
  /** Content rendered above the corridor. */
  children?: React.ReactNode;
  className?: string;
};

const StreamCardMedia: React.FC<{ img: StreamImage; isNearViewport: boolean }> = ({
  img,
  isNearViewport,
}) => {
  const [imgError, setImgError] = React.useState(false);
  const [videoError, setVideoError] = React.useState(false);
  const [iframeLoaded, setIframeLoaded] = React.useState(false);
  const [iframeError, setIframeError] = React.useState(false);

  React.useEffect(() => {
    setImgError(false);
  }, [img.src]);

  React.useEffect(() => {
    setVideoError(false);
  }, [img.videoSrc]);

  React.useEffect(() => {
    setIframeLoaded(false);
    setIframeError(false);
  }, [img.videoId]);

  const hasImage = Boolean(img.src) && !imgError;
  const hasLocalVideo = Boolean(img.videoSrc) && !videoError;
  const hasTikTokPlayer = Boolean(img.videoId) && !iframeError && isNearViewport;

  const tikTokPlayerSrc = img.videoId
    ? `https://www.tiktok.com/player/v1/${img.videoId}?embed_from=oembed&autoplay=1&muted=1&loop=1&controls=0&description=0&music_info=0&rel=0`
    : undefined;

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#1D0B11] border border-[#C5A46D]/45 shadow-lg">
      {/* Base Fallback / Poster Cover */}
      {hasLocalVideo ? (
        <video
          src={img.videoSrc}
          poster={hasImage ? img.src : undefined}
          muted
          loop
          autoPlay
          playsInline
          preload="metadata"
          onError={() => setVideoError(true)}
          className="h-full w-full object-cover"
        />
      ) : hasImage ? (
        <img
          src={img.src}
          alt={img.alt ?? ""}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="h-full w-full object-cover"
          draggable={false}
        />
      ) : (
        <div
          className="relative flex h-full w-full flex-col items-center justify-between p-3 text-center"
          style={{
            background:
              "linear-gradient(155deg, #541C2B 0%, #260B13 55%, #12060A 100%)",
          }}
        >
          <span className="text-[8px] font-semibold uppercase tracking-[0.14em] text-[#C5A46D] truncate max-w-full">
            {img.badge ?? "@kk_decorandevent"}
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C5A46D]/75 bg-black/40 text-[#C5A46D]">
            <Play className="h-3.5 w-3.5 ml-0.5 fill-current" aria-hidden="true" />
          </span>
          <span className="font-display text-xs font-semibold leading-tight text-[#FAF8F4] line-clamp-2">
            {img.title ?? img.alt ?? "TikTok Reel"}
          </span>
        </div>
      )}

      {/* Live Muted TikTok Video Entering Cover */}
      {hasTikTokPlayer && tikTokPlayerSrc && (
        <iframe
          src={tikTokPlayerSrc}
          title={img.title ?? img.alt ?? "TikTok Reel"}
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setIframeLoaded(true)}
          onError={() => setIframeError(true)}
          className={cn(
            "pointer-events-none absolute inset-0 h-full w-full border-0 transition-opacity duration-500",
            iframeLoaded ? "opacity-100" : "opacity-0",
          )}
        />
      )}

      {/* Subtle Bottom Label & Play Corner Badge Over Card Cover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-[#C5A46D]/75 bg-black/55 text-[#FAF8F4] backdrop-blur-sm"
      >
        <Play className="h-3 w-3 ml-0.5 fill-current text-[#C5A46D]" />
      </span>
      <div className="pointer-events-none absolute inset-x-2 bottom-2 text-left">
        {img.badge && (
          <p className="truncate text-[8px] font-semibold uppercase tracking-[0.12em] text-[#C5A46D]">
            {img.badge}
          </p>
        )}
        {img.title && (
          <p className="truncate font-display text-xs font-semibold text-[#FAF8F4]">
            {img.title}
          </p>
        )}
      </div>
    </div>
  );
};

export function ImageStreamHero({
  images,
  cards = 9,
  speed = 18,
  axis = 55,
  path,
  onCardClick,
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & ImageStreamHeroProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = React.useState(false);

  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const right = `ish-r-${id}`;
  const left = `ish-l-${id}`;
  const card = `ish-c-${id}`;

  const p = React.useMemo(() => ({ ...PATH, ...path }), [path]);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
        }
      },
      { rootMargin: "320px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const css = React.useMemo(
    () =>
      `${keyframes(1, right, p)}${keyframes(-1, left, p)}` +
      `@media(prefers-reduced-motion:reduce){.${card}{animation-play-state:paused}}`,
    [right, left, card, p],
  );

  return (
    <div
      ref={rootRef}
      className={cn("relative overflow-hidden", className)}
      {...props}
      style={{ containerType: "inline-size", ...props.style }}
    >
      <style>{css}</style>

      <div
        aria-hidden={!onCardClick}
        className="pointer-events-none absolute inset-0"
        style={{
          perspective: `${p.perspective}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {[right, left].map((name) =>
            Array.from({ length: cards }, (_, i) => {
              const img = images[i % Math.max(images.length, 1)];
              const cardStyle: React.CSSProperties = {
                left: "50%",
                top: `${axis}%`,
                width: `${p.cardWidth}cqw`,
                height: `${p.cardHeight}cqw`,
                marginLeft: `${-p.cardWidth / 2}cqw`,
                marginTop: `${-p.cardHeight / 2}cqw`,
                borderRadius: `${p.cardRadius}cqw`,
                animation: `${name} ${speed}s linear infinite`,
                animationDelay: `${-(i * speed) / cards}s`,
                backfaceVisibility: "hidden",
              };

              if (onCardClick && img) {
                return (
                  <button
                    key={`${name}-${i}`}
                    type="button"
                    onClick={() => onCardClick(img, i)}
                    aria-label={`Play ${img.title ?? img.alt ?? "TikTok video"}`}
                    className={cn(
                      card,
                      "pointer-events-auto absolute overflow-hidden p-0 border-0 bg-transparent cursor-pointer focus-visible:outline-2 focus-visible:outline-[#C5A46D]",
                    )}
                    style={cardStyle}
                  >
                    <StreamCardMedia img={img} isNearViewport={isNearViewport} />
                  </button>
                );
              }

              return (
                <div
                  key={`${name}-${i}`}
                  className={cn(card, "absolute overflow-hidden")}
                  style={cardStyle}
                >
                  {img ? <StreamCardMedia img={img} isNearViewport={isNearViewport} /> : null}
                </div>
              );
            }),
          )}
        </div>
      </div>

      {children}
    </div>
  );
}

export default ImageStreamHero;
