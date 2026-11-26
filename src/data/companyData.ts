export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  iconKey:
    | 'rings'
    | 'heart'
    | 'briefcase'
    | 'sparkles'
    | 'crown'
    | 'layers'
    | 'building'
    | 'flower'
    | 'calendar';
}

export interface ProcessStep {
  step: string;
  title: string;
  iconKey:
    | 'message'
    | 'clipboard'
    | 'sparkles'
    | 'package'
    | 'layers'
    | 'check';
}

export interface TestimonialItem {
  id: string;
  quote: string;
  clientName: string;
  eventContext: string;
}

export interface CompanyMetric {
  id: string;
  target: number;
  suffix?: string;
  label: string;
}

export interface PartnerCompany {
  id: string;
  name: string;
  monogram: string;
  discipline: string;
  logoUrl?: string;
  websiteUrl?: string;
}

export interface TikTokVideoItem {
  id: string;
  videoId: string;
  url: string;
  title: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Process', href: '#process' },
  { label: 'TikTok', href: '#tiktok-showcase' },
  { label: 'Contact', href: '#contact' },
];

export const MARQUEE_ROW_ONE: string[] = [
  'Weddings',
  'Engagements',
  'Corporate Galas',
  'Birthdays',
  'Cultural Ceremonies',
  'Stage Decor',
  'Floral Artistry',
];

export const MARQUEE_ROW_TWO: string[] = [
  'Ceiling Draping',
  'Aisle Styling',
  'Sweetheart Stages',
  'Candlelight Tables',
  'Grand Entrances',
  'Custom Florals',
  'Full Direction',
];

export const SERVICES: ServiceItem[] = [
  { number: '01', title: 'Wedding Planning', iconKey: 'rings' },
  { number: '02', title: 'Engagement Styling', iconKey: 'heart' },
  { number: '03', title: 'Corporate Galas', iconKey: 'briefcase' },
  { number: '04', title: 'Birthday Soirées', iconKey: 'sparkles' },
  { number: '05', title: 'Cultural Ceremonies', iconKey: 'crown' },
  { number: '06', title: 'Stage Design', iconKey: 'layers' },
  { number: '07', title: 'Venue Draping', iconKey: 'building' },
  { number: '08', title: 'Floral Artistry', iconKey: 'flower' },
  { number: '09', title: 'Event Direction', iconKey: 'calendar' },
];

export const PROCESS_STEPS: ProcessStep[] = [
  { step: '01', title: 'First Consult', iconKey: 'message' },
  { step: '02', title: 'Space Review', iconKey: 'clipboard' },
  { step: '03', title: 'Concept Design', iconKey: 'sparkles' },
  { step: '04', title: 'Material Prep', iconKey: 'package' },
  { step: '05', title: 'Venue Build', iconKey: 'layers' },
  { step: '06', title: 'Live Direction', iconKey: 'check' },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'sample-1',
    quote:
      'Every floral stand, stage panel, and table setting delivered the exact calm luxury we hoped for.',
    clientName: 'Wedding Reception',
    eventContext: 'Sample Review',
  },
  {
    id: 'sample-2',
    quote:
      'Their stage symmetry and warm lighting transformed our annual corporate gala into a distinguished evening.',
    clientName: 'Corporate Gala',
    eventContext: 'Sample Review',
  },
  {
    id: 'sample-3',
    quote:
      'They blended our cultural customs seamlessly with refined ivory and gold styling throughout the hall.',
    clientName: 'Cultural Ceremony',
    eventContext: 'Sample Review',
  },
];

export const HERO_METRICS: CompanyMetric[] = [
  { id: 'events', target: 150, suffix: '+', label: 'Events' },
  { id: 'clients', target: 120, suffix: '+', label: 'Clients' },
  { id: 'years', target: 8, suffix: '+', label: 'Years' },
];

export const TIKTOK_VIDEOS: TikTokVideoItem[] = [
  {
    id: 'tiktok-1',
    videoId: '7506604206950812950',
    url: 'https://www.tiktok.com/@kk_decorandevent/video/7506604206950812950',
    title: 'Decor Setup',
  },
  {
    id: 'tiktok-2',
    videoId: '7506079974999313686',
    url: 'https://www.tiktok.com/@kk_decorandevent/video/7506079974999313686',
    title: 'Venue Reveal',
  },
];

export const TIKTOK_PROFILE_URL = 'https://www.tiktok.com/@kk_decorandevent';

export const COMPANY_CONTACT = {
  phone: 'Pending official update',
  email: 'Pending official update',
  studio: 'By consultation',
  tiktok: {
    handle: '@kk_decorandevent',
    url: 'https://www.tiktok.com/@kk_decorandevent',
  },
  channels: [
    {
      id: 'whatsapp',
      label: 'WhatsApp',
      href: '#contact',
    },
    {
      id: 'telegram',
      label: 'Telegram',
      href: '#contact',
    },
    {
      id: 'tiktok',
      label: 'TikTok',
      href: 'https://www.tiktok.com/@kk_decorandevent',
      external: true,
    },
  ],
};

export const PARTNER_COMPANIES_ROW_ONE: PartnerCompany[] = [
  { id: 'p1', name: 'Partner Studio 01', monogram: 'P1', discipline: 'Hospitality' },
  { id: 'p2', name: 'Partner Studio 02', monogram: 'P2', discipline: 'Floristry' },
  { id: 'p3', name: 'Partner Studio 03', monogram: 'P3', discipline: 'Lighting' },
  { id: 'p4', name: 'Partner Studio 04', monogram: 'P4', discipline: 'Catering' },
  { id: 'p5', name: 'Partner Studio 05', monogram: 'P5', discipline: 'Cinema' },
  { id: 'p6', name: 'Partner Studio 06', monogram: 'P6', discipline: 'Linens' },
];

export const PARTNER_COMPANIES_ROW_TWO: PartnerCompany[] = [
  { id: 'p7', name: 'Partner Studio 07', monogram: 'P7', discipline: 'Fabrication' },
  { id: 'p8', name: 'Partner Studio 08', monogram: 'P8', discipline: 'Logistics' },
  { id: 'p9', name: 'Partner Studio 09', monogram: 'P9', discipline: 'Stationery' },
  { id: 'p10', name: 'Partner Studio 10', monogram: 'P10', discipline: 'Sound' },
  { id: 'p11', name: 'Partner Studio 11', monogram: 'P11', discipline: 'Valet' },
  { id: 'p12', name: 'Partner Studio 12', monogram: 'P12', discipline: 'Couture' },
];
