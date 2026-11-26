import React, { useMemo } from 'react';
import {
  COMPANY_CONTACT,
  NAV_ITEMS,
  SERVICES,
} from '../data/companyData';
import { ThemeStyle, useTheme } from '../context/ThemeContext';
import BeamWordmarkFooter, {
  FooterColumn,
  FooterCredit,
  FooterSocial,
} from './ui/beam-wordmark-footer';

const FOOTER_PALETTES: Record<
  ThemeStyle,
  {
    background: string;
    ink: string;
    muted: string;
    accent: string;
    wordTop: string;
    wordFoot: string;
    fontSans: string;
  }
> = {
  'royal-gold': {
    background: '#12070B',
    ink: '#FAF8F4',
    muted: '#CFC3BA',
    accent: '#C5A46D',
    wordTop: '#7D283E',
    wordFoot: '#220911',
    fontSans:
      '"Cormorant Garamond", "Plus Jakarta Sans", Georgia, serif',
  },
  'garden-bloom': {
    background: '#0F1A14',
    ink: '#F4F7F3',
    muted: '#B6C7BC',
    accent: '#9EC4A7',
    wordTop: '#2D5A43',
    wordFoot: '#122119',
    fontSans: '"Fraunces", "DM Sans", Georgia, serif',
  },
  'midnight-gala': {
    background: '#06060D',
    ink: '#F7F5FC',
    muted: '#B8B2CC',
    accent: '#E8C55A',
    wordTop: '#563299',
    wordFoot: '#120E24',
    fontSans: '"Cinzel", "Manrope", Georgia, serif',
  },
  'modern-minimal': {
    background: '#090909',
    ink: '#FAFAFA',
    muted: '#A3A3A3',
    accent: '#EF4444',
    wordTop: '#404040',
    wordFoot: '#121212',
    fontSans:
      '"Bricolage Grotesque", "Plus Jakarta Sans", sans-serif',
  },
};

const TikTokGlyph = (
  <path
    d="M17.2 7.3a4.2 4.2 0 0 1-3.3-3.7V3.3h-2.9v11.6a2.5 2.5 0 1 1-1.7-2.4V9.4a5.5 5.5 0 1 0 4.6 5.5V9a6.8 6.8 0 0 0 3.9 1.2V7.3h-.6Z"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinejoin="round"
  />
);

const WhatsAppGlyph = (
  <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3.5a8.5 8.5 0 0 0-7.4 12.6L3.6 20.4l4.4-1a8.5 8.5 0 1 0 4-15.9Z" />
    <path d="M9.5 9.2c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c.4.8 1.1 1.5 1.9 1.9l.6-.5c.2-.1.4-.2.6-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3-.2.7-.6.9-.6.3-1.7.3-3.1-.4-1.4-.7-2.8-2-3.6-3.5-.7-1.4-.7-2.5-.4-3.1Z" />
  </g>
);

const TelegramGlyph = (
  <path
    d="M20.2 4.5 3.6 10.9c-.6.2-.6.8 0 1l4.1 1.4 1.6 4.8c.2.5.7.6 1 .2l2.3-2.3 4.3 3.2c.5.4 1.1.1 1.3-.5l2.7-13.2c.2-.7-.4-1.2-1-.9Zm-9.9 8.7 6.8-4.5-5.3 5.5-.4 2.7-1.1-3.7Z"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinejoin="round"
  />
);

const BackToTopGlyph = (
  <path
    d="M12 18V6M7 11l5-5 5 5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

export const Footer: React.FC = () => {
  const { style } = useTheme();
  const palette = FOOTER_PALETTES[style];

  const socials = useMemo<FooterSocial[]>(
    () => [
      {
        label: 'TikTok',
        href: COMPANY_CONTACT.tiktok.url,
        icon: TikTokGlyph,
      },
      {
        label: 'WhatsApp',
        href: '#contact',
        icon: WhatsAppGlyph,
      },
      {
        label: 'Telegram',
        href: '#contact',
        icon: TelegramGlyph,
      },
      {
        label: 'Back to Top',
        href: '#home',
        icon: BackToTopGlyph,
      },
    ],
    []
  );

  const credits = useMemo<FooterCredit[]>(
    () => [
      {
        lead: 'Bespoke event planning & ',
        label: 'Architectural Styling',
      },
      {
        lead: 'Follow ',
        label: COMPANY_CONTACT.tiktok.handle,
        href: COMPANY_CONTACT.tiktok.url,
        tail: ' · Consultation',
      },
    ],
    []
  );

  const columns = useMemo<FooterColumn[]>(
    () => [
      {
        title: 'Explore',
        links: [
          ...NAV_ITEMS.map((item) => ({ label: item.label, href: item.href })),
          { label: 'Back to Top', href: '#home' },
        ],
      },
      {
        title: 'Services',
        links: SERVICES.slice(0, 6).map((service) => ({
          label: service.title,
          href: '#services',
        })),
      },
    ],
    []
  );

  return (
    <BeamWordmarkFooter
      brand="KK Decor and Event"
      wordmark="KK DECOR"
      company="KK Decor and Event"
      year={new Date().getFullYear()}
      socials={socials}
      credits={credits}
      columns={columns}
      cut={0.14}
      background={palette.background}
      ink={palette.ink}
      muted={palette.muted}
      accent={palette.accent}
      wordTop={palette.wordTop}
      wordFoot={palette.wordFoot}
      fontSans={palette.fontSans}
      wordWeight={600}
      onLinkClick={(_label, href) => {
        if (href === '#home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }}
    />
  );
};
