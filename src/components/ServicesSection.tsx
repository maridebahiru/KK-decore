import React, { useMemo } from 'react';
import {
  Briefcase,
  Building2,
  CalendarCheck,
  Crown,
  Flower2,
  Gem,
  Heart,
  Layers,
  Sparkles,
} from 'lucide-react';
import { SERVICES, ServiceItem } from '../data/companyData';
import { SERVICE_MEDIA } from '../data/media';
import { AnimatedHeadingReveal } from './MotionPrimitives';
import InfiniteSpiral, { InfiniteSpiralItem } from './InfiniteSpiral';

function renderServiceIcon(iconKey: ServiceItem['iconKey']) {
  const iconClass = 'h-3 w-3 text-[#C5A46D]';
  switch (iconKey) {
    case 'rings':
      return <Gem className={iconClass} aria-hidden="true" />;
    case 'heart':
      return <Heart className={iconClass} aria-hidden="true" />;
    case 'briefcase':
      return <Briefcase className={iconClass} aria-hidden="true" />;
    case 'sparkles':
      return <Sparkles className={iconClass} aria-hidden="true" />;
    case 'crown':
      return <Crown className={iconClass} aria-hidden="true" />;
    case 'layers':
      return <Layers className={iconClass} aria-hidden="true" />;
    case 'building':
      return <Building2 className={iconClass} aria-hidden="true" />;
    case 'flower':
      return <Flower2 className={iconClass} aria-hidden="true" />;
    case 'calendar':
      return <CalendarCheck className={iconClass} aria-hidden="true" />;
  }
}

export const ServicesSection: React.FC = () => {
  const spiralItems = useMemo<InfiniteSpiralItem[]>(
    () =>
      SERVICES.map((service) => {
        const media = SERVICE_MEDIA[service.number];
        return {
          id: service.number,
          src: media.src,
          webpSrc: media.webpSrc,
          alt: media.alt,
          title: service.title,
          subtitle: service.number,
          category: media.category,
          width: media.width,
          height: media.height,
          icon: renderServiceIcon(service.iconKey),
        };
      }),
    []
  );

  return (
    <section
      id="services"
      className="kk-section border-b border-[var(--border)] bg-[var(--bg)]"
    >
      <div className="kk-container">
        <AnimatedHeadingReveal
          eyebrow="Capabilities"
          title="Our Services"
          className="max-w-lg"
        />

        <div className="relative mt-8 h-[600px] w-full overflow-hidden border border-[var(--border)] bg-[var(--surface)]/50" style={{ borderRadius: 'var(--radius)' }}>
          <InfiniteSpiral
            items={spiralItems}
            animationMode="all"
            speed={0.55}
            radius={170}
            cardWidth={100}
            cardHeight={100}
            verticalSpacing={60}
            perspective={1000}
            cardRadius={10}
            centerScale={1.2}
            edgeBlur={6}
            cardsPerTurn={7}
            pauseOnHover
          />
        </div>
      </div>
    </section>
  );
};
