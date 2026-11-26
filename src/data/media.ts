export type MediaCategory =
  | 'All'
  | 'Weddings'
  | 'Engagements'
  | 'Corporate'
  | 'Birthdays'
  | 'Cultural'
  | 'Stage'
  | 'Venue'
  | 'Floral';

export interface MediaAsset {
  id: string;
  title: string;
  summary: string;
  src: string;
  webpSrc?: string;
  srcSet?: string;
  type: 'image' | 'video';
  category: Exclude<MediaCategory, 'All'>;
  alt: string;
  poster?: string;
  width: number;
  height: number;
  aspectClass?: string;
}

export const HERO_MEDIA: MediaAsset = {
  id: 'hero-showcase',
  title: 'KK Decor Signature Showcase',
  summary: 'Cinematic luxury ballroom and floral venue decor.',
  src: '/media/hero.mp4',
  poster: '/media/hero-poster.jpg',
  webpSrc: '/media/hero-poster.webp',
  type: 'video',
  category: 'Weddings',
  alt: 'Grand event ballroom illuminated with gold chandeliers, ivory draping, and floral arches',
  width: 1920,
  height: 1080,
};

export const SERVICE_MEDIA: Record<string, MediaAsset> = {
  '01': {
    id: 'service-weddings',
    title: 'Wedding Planning',
    summary: 'Ceremony aisles, stage florals, and coordination.',
    src: '/media/gallery/weddings-service.jpg',
    webpSrc: '/media/gallery/weddings-service.webp',
    type: 'image',
    category: 'Weddings',
    alt: 'Luxury wedding reception stage with ivory draping and burgundy florals',
    width: 1200,
    height: 900,
  },
  '02': {
    id: 'service-engagements',
    title: 'Engagement Styling',
    summary: 'Luminous backdrops and romantic candlelit seating.',
    src: '/media/gallery/engagements-service.jpg',
    webpSrc: '/media/gallery/engagements-service.webp',
    type: 'image',
    category: 'Engagements',
    alt: 'Circular gold engagement arch surrounded by cream roses and candlelight',
    width: 1200,
    height: 900,
  },
  '03': {
    id: 'service-corporate',
    title: 'Corporate Galas',
    summary: 'Executive stage design and formal dining.',
    src: '/media/gallery/corporate-service.jpg',
    webpSrc: '/media/gallery/corporate-service.webp',
    type: 'image',
    category: 'Corporate',
    alt: 'Formal corporate gala stage with warm spotlights and gold table accents',
    width: 1200,
    height: 900,
  },
  '04': {
    id: 'service-birthdays',
    title: 'Birthday Soirées',
    summary: 'Sculptural focal walls and candlelit dining.',
    src: '/media/gallery/birthdays-service.jpg',
    webpSrc: '/media/gallery/birthdays-service.webp',
    type: 'image',
    category: 'Birthdays',
    alt: 'Milestone birthday dinner table with tapered gold candles and fluted backdrop',
    width: 1200,
    height: 900,
  },
  '05': {
    id: 'service-cultural',
    title: 'Cultural Ceremonies',
    summary: 'Heritage textiles and dignified ceremonial seating.',
    src: '/media/gallery/cultural-service.jpg',
    webpSrc: '/media/gallery/cultural-service.webp',
    type: 'image',
    category: 'Cultural',
    alt: 'Traditional cultural ceremony canopy styled with deep burgundy and gold textiles',
    width: 1200,
    height: 900,
  },
  '06': {
    id: 'service-stage',
    title: 'Stage Design',
    summary: 'Commanding focal stages with layered florals.',
    src: '/media/gallery/stage-service.jpg',
    webpSrc: '/media/gallery/stage-service.webp',
    type: 'image',
    category: 'Stage',
    alt: 'Architectural wedding stage framed by arched columns and suspended botanicals',
    width: 1200,
    height: 900,
  },
  '07': {
    id: 'service-venue',
    title: 'Venue Draping',
    summary: 'Full-hall ceiling canopies and lit aisles.',
    src: '/media/gallery/venue-service.jpg',
    webpSrc: '/media/gallery/venue-service.webp',
    type: 'image',
    category: 'Venue',
    alt: 'Expansive banquet hall transformed with flowing ivory ceiling drapes',
    width: 1200,
    height: 900,
  },
  '08': {
    id: 'service-floral',
    title: 'Floral Artistry',
    summary: 'Elevated centerpieces and custom botanical arches.',
    src: '/media/gallery/floral-service.jpg',
    webpSrc: '/media/gallery/floral-service.webp',
    type: 'image',
    category: 'Floral',
    alt: 'Elevated gold floral centerpiece overflowing with ivory and burgundy blooms',
    width: 1200,
    height: 900,
  },
  '09': {
    id: 'service-planning',
    title: 'Event Direction',
    summary: 'Timelines, vendor alignment, and floor control.',
    src: '/media/gallery/planning-service.jpg',
    webpSrc: '/media/gallery/planning-service.webp',
    type: 'image',
    category: 'Venue',
    alt: 'Coordinated luxury banquet room prepared prior to guest arrival',
    width: 1200,
    height: 900,
  },
};

export const PORTFOLIO_CATEGORIES: MediaCategory[] = [
  'All',
  'Weddings',
  'Engagements',
  'Corporate',
  'Birthdays',
  'Cultural',
  'Stage',
  'Venue',
  'Floral',
];

export const PORTFOLIO_MEDIA: MediaAsset[] = [
  {
    id: 'port-01',
    title: 'Grand Ivory Reception',
    summary: 'Arched colonnades, burgundy velvet, and candlelight.',
    src: '/media/clips/wedding-reveal.mp4',
    poster: '/media/gallery/weddings-01.jpg',
    webpSrc: '/media/gallery/weddings-01.webp',
    type: 'video',
    category: 'Weddings',
    alt: 'Grand ivory and burgundy wedding reception video tour',
    width: 1080,
    height: 1350,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'port-02',
    title: 'Champagne Ring Salon',
    summary: 'Brushed gold circle arch with ivory blooms.',
    src: '/media/gallery/engagements-01.jpg',
    webpSrc: '/media/gallery/engagements-01.webp',
    type: 'image',
    category: 'Engagements',
    alt: 'Brushed champagne gold circular arch styled for an engagement celebration',
    width: 1200,
    height: 900,
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'port-03',
    title: 'Executive Recognition Gala',
    summary: 'Minimalist stage monoliths with warm spotlights.',
    src: '/media/gallery/corporate-01.jpg',
    webpSrc: '/media/gallery/corporate-01.webp',
    type: 'image',
    category: 'Corporate',
    alt: 'Black and gold corporate awards stage and formal round banquet tables',
    width: 1200,
    height: 900,
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'port-04',
    title: 'Vaulted Chandelier Canopy',
    summary: 'Radiating ivory drapes beneath crystal lighting.',
    src: '/media/clips/venue-drape.mp4',
    poster: '/media/gallery/venue-01.jpg',
    webpSrc: '/media/gallery/venue-01.webp',
    type: 'video',
    category: 'Venue',
    alt: 'Full venue ceiling drapery and chandelier lighting walkthrough clip',
    width: 1080,
    height: 1350,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'port-05',
    title: 'Golden Milestone Dinner',
    summary: 'Fluted focal panels with tapered candlelight.',
    src: '/media/gallery/birthdays-01.jpg',
    webpSrc: '/media/gallery/birthdays-01.webp',
    type: 'image',
    category: 'Birthdays',
    alt: 'Refined milestone birthday estate table with brass plinths and florals',
    width: 1200,
    height: 900,
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'port-06',
    title: 'Heritage Ceremonial Canopy',
    summary: 'Burgundy pleating, gold lattice, and brass lanterns.',
    src: '/media/gallery/cultural-01.jpg',
    webpSrc: '/media/gallery/cultural-01.webp',
    type: 'image',
    category: 'Cultural',
    alt: 'Cultural ceremony dais styled with deep burgundy textiles and gold lanterns',
    width: 1200,
    height: 1500,
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'port-07',
    title: 'Sweetheart Stage Architecture',
    summary: 'Layered arches framed by cascading roses.',
    src: '/media/clips/stage-florals.mp4',
    poster: '/media/gallery/stage-01.jpg',
    webpSrc: '/media/gallery/stage-01.webp',
    type: 'video',
    category: 'Stage',
    alt: 'Sweetheart wedding stage floral installation video clip',
    width: 1200,
    height: 900,
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'port-08',
    title: 'Botanical Aisle Runners',
    summary: 'Lush white and burgundy floral arrangements.',
    src: '/media/gallery/floral-01.jpg',
    webpSrc: '/media/gallery/floral-01.webp',
    type: 'image',
    category: 'Floral',
    alt: 'Ceremony aisle lined with elevated floral arrangements on gold stands',
    width: 1200,
    height: 900,
    aspectClass: 'aspect-[4/3]',
  },
];

export const BEFORE_AFTER_MEDIA = {
  before: {
    id: 'transform-before',
    title: 'Empty Banquet Hall',
    summary: 'Unstyled venue prior to architectural installation.',
    src: '/media/clips/venue-before.mp4',
    poster: '/media/gallery/venue-before.jpg',
    webpSrc: '/media/gallery/venue-before.webp',
    type: 'video' as const,
    category: 'Venue' as const,
    alt: 'Unstyled open banquet hall before event decoration installation',
    width: 1600,
    height: 1000,
  },
  after: {
    id: 'transform-after',
    title: 'Styled Grand Ballroom',
    summary: 'Finished stage arches, draping, and floral tables.',
    src: '/media/clips/venue-after.mp4',
    poster: '/media/gallery/venue-after.jpg',
    webpSrc: '/media/gallery/venue-after.webp',
    type: 'video' as const,
    category: 'Venue' as const,
    alt: 'Same banquet hall transformed with ceiling drapes, floral arches, and warm lighting',
    width: 1600,
    height: 1000,
  },
};
