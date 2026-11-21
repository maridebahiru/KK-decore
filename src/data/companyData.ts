export interface NavItem {
  label: string;
  href: string;
}

export interface CoreValue {
  number: string;
  title: string;
  description: string;
}

export interface ServiceItem {
  number: string;
  title: string;
  summary: string;
  deliverables: string[];
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

export type PortfolioCategory =
  | 'All'
  | 'Weddings'
  | 'Engagements'
  | 'Corporate Events'
  | 'Birthdays'
  | 'Traditional Events'
  | 'Venue Decorations';

export interface PortfolioProject {
  id: string;
  title: string;
  category: Exclude<PortfolioCategory, 'All'>;
  subtitle: string;
  summary: string;
  designBrief: string;
  architecturalElements: string[];
  colorStory: { name: string; hex: string }[];
  motif:
    | 'cathedral-arch'
    | 'interlocking-rings'
    | 'executive-monolith'
    | 'celestial-starburst'
    | 'heritage-lattice'
    | 'vaulted-chandelier';
}

export interface TikTokVideoItem {
  id: string;
  videoId: string;
  url: string;
  title: string;
  caption: string;
}

export interface WhyChooseItem {
  number: string;
  title: string;
  description: string;
  iconKey: 'award' | 'palette' | 'eye' | 'compass' | 'shield' | 'smile';
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  clientName: string;
  eventContext: string;
  isDemonstrationSample: boolean;
}

export interface EditableContactInfo {
  phone: {
    value: string;
    isConfigured: boolean;
    placeholderNotice: string;
  };
  email: {
    value: string;
    isConfigured: boolean;
    placeholderNotice: string;
  };
  officeLocation: {
    value: string;
    isConfigured: boolean;
    placeholderNotice: string;
  };
  tiktok: {
    handle: string;
    url: string;
  };
  additionalSocials: {
    platform: string;
    status: string;
    url?: string;
  }[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '#home' },
  { label: 'About Us', href: '#about' },
  { label: 'Our Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'TikTok Showcase', href: '#tiktok-showcase' },
  { label: 'Our Process', href: '#process' },
  { label: 'Contact Us', href: '#contact' },
];

export const COMPANY_ABOUT = {
  overview:
    'KK Decor and Event is a dedicated event planning and bespoke decoration firm built on architectural precision, refined aesthetics, and disciplined execution. From intimate family milestones to formal corporate gatherings, our team coordinates every spatial detail—draping, floral styling, stage architecture, lighting choreography, and day-of logistics—so hosts and guests experience seamless elegance.',
  vision:
    'To be recognized as a premier standard in luxury event design and structured celebration management, admired for timeless visual compositions and unwavering reliability.',
  mission:
    'To translate each client’s distinct occasion into a thoughtfully planned, tastefully decorated, and impeccably executed experience delivered with integrity and care.',
};

export const CORE_VALUES: CoreValue[] = [
  {
    number: '01',
    title: 'Creativity',
    description:
      'Original spatial concepts, tailored palettes, and sculptural floral forms crafted specifically for each venue and occasion.',
  },
  {
    number: '02',
    title: 'Professionalism',
    description:
      'Formal communication, disciplined timelines, and poised on-site coordination from initial consultation through final breakdown.',
  },
  {
    number: '03',
    title: 'Quality',
    description:
      'Carefully selected linens, structural stage framing, fresh botanicals, and cohesive finishing across every guest touchpoint.',
  },
  {
    number: '04',
    title: 'Reliability',
    description:
      'Structured scheduling, vetted vendor alignment, and contingency readiness that give hosts complete peace of mind.',
  },
  {
    number: '05',
    title: 'Innovation',
    description:
      'Contemporary styling sensibilities combined with respectful appreciation for classic ceremony traditions and architectural form.',
  },
  {
    number: '06',
    title: 'Customer Satisfaction',
    description:
      'Attentive listening and transparent collaboration ensuring the finished celebration fulfills and surpasses client expectations.',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'Wedding Planning & Decoration',
    summary:
      'Comprehensive ceremony and reception design combining bespoke aisle architecture, sweetheart stage styling, floral installations, and full event-day orchestration.',
    deliverables: ['Ceremony & reception styling', 'Custom floral & table scaping', 'Full day-of timeline control'],
    iconKey: 'rings',
  },
  {
    number: '02',
    title: 'Engagement Ceremonies',
    summary:
      'Intimate, luminous environments tailored to celebrate formal commitments with refined backdrops, curated seating, and graceful welcome displays.',
    deliverables: ['Signature photo backdrop', 'Curated guest seating layout', 'Romantic candlelight & floral styling'],
    iconKey: 'heart',
  },
  {
    number: '03',
    title: 'Corporate Events',
    summary:
      'Polished spatial branding, gala dinners, conferences, and executive milestone receptions engineered for institutional prestige and smooth guest flow.',
    deliverables: ['Executive stage & podium framing', 'Brand-aligned table styling', 'Schedule & vendor management'],
    iconKey: 'briefcase',
  },
  {
    number: '04',
    title: 'Birthday Celebrations',
    summary:
      'Thoughtfully composed milestone gatherings featuring sculptural focal walls, coordinated dining tables, and cohesive ambient lighting for any age.',
    deliverables: ['Themed architectural focal walls', 'Dessert & dining table styling', 'Coordinated lighting & accents'],
    iconKey: 'sparkles',
  },
  {
    number: '05',
    title: 'Traditional & Cultural Events',
    summary:
      'Respectful, richly layered ceremonial decor honoring cultural heritage through authentic textures, ceremonial seating, and celebratory color harmonies.',
    deliverables: ['Heritage textile & motif styling', 'Ceremonial dais arrangement', 'Family hospitality zones'],
    iconKey: 'crown',
  },
  {
    number: '06',
    title: 'Stage Decoration',
    summary:
      'Commanding architectural focal stages built with balanced symmetry, layered drapery, custom paneling, and dramatic floral framing.',
    deliverables: ['Custom paneled stage backdrops', 'Elevated dais & lounge seating', 'Targeted stage lighting balance'],
    iconKey: 'layers',
  },
  {
    number: '07',
    title: 'Venue Decoration',
    summary:
      'Full-hall spatial transformations uniting ceiling treatments, entrance arches, aisle columns, and perimeter drapery into one cohesive atmosphere.',
    deliverables: ['Grand entrance & foyer styling', 'Ceiling drapery & vertical accents', 'Unified hall floor-plan styling'],
    iconKey: 'building',
  },
  {
    number: '08',
    title: 'Floral Arrangements',
    summary:
      'Artisanal botanical compositions spanning elevated table centerpieces, ceremony arches, cascading aisle runners, and welcoming pedestal arrangements.',
    deliverables: ['Elevated & low centerpieces', 'Arch & column floristry', 'Custom color-matched botanicals'],
    iconKey: 'flower',
  },
  {
    number: '09',
    title: 'Event Planning & Coordination',
    summary:
      'End-to-end project administration covering concept budgeting, vendor synchronization, site walkthroughs, production schedules, and on-site supervision.',
    deliverables: ['Concept-to-execution roadmap', 'Vendor briefing & alignment', 'Dedicated on-site direction'],
    iconKey: 'calendar',
  },
];

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  'All',
  'Weddings',
  'Engagements',
  'Corporate Events',
  'Birthdays',
  'Traditional Events',
  'Venue Decorations',
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'imperial-burgundy-wedding',
    title: 'The Grand Ivory & Burgundy Reception',
    category: 'Weddings',
    subtitle: 'Architectural Stage & Botanical Reception Styling',
    summary:
      'A classic ballroom transformation anchored by twin arched ivory colonnades, deep burgundy velvet framing, and tiered champagne-gold table centerpieces.',
    designBrief:
      'Designed to bring architectural warmth and formal proportion to a sweeping reception hall. Structured ivory arches created an intimate focal point for the couple’s dais while warm metallic accents united 24 guest tables in balanced symmetry.',
    architecturalElements: [
      'Double-height arched focal backdrop with concealed warm perimeter lighting',
      'Burgundy and ivory pleated drapery framing the main entrance foyer',
      'Alternating tall gold floral stands and candlelit low centerpieces',
    ],
    colorStory: [
      { name: 'Deep Burgundy', hex: '#541C2B' },
      { name: 'Champagne Gold', hex: '#C5A46D' },
      { name: 'Warm Ivory', hex: '#FAF8F4' },
    ],
    motif: 'cathedral-arch',
  },
  {
    id: 'champagne-engagement-salon',
    title: 'Luminous Champagne Engagement Salon',
    category: 'Engagements',
    subtitle: 'Intimate Ceremonial Backdrop & Lounge Composition',
    summary:
      'An understated engagement reception uniting concentric brushed-gold ring geometry, cascading ivory florals, and tailored linen lounge groupings.',
    designBrief:
      'Crafted for an intimate evening engagement celebration where conversational warmth met quiet luxury. The geometric ring motif served as both a ceremonial focal backdrop and an intentional portrait setting for family moments.',
    architecturalElements: [
      'Concentric champagne-gold circular arch with asymmetrical botanical clusters',
      'Custom ivory linen sofa seating framed by glass pillar candle risers',
      'Coordinated welcome easel and satin-draped gift presentation table',
    ],
    colorStory: [
      { name: 'Champagne Gold', hex: '#C5A46D' },
      { name: 'Warm Ivory', hex: '#FAF8F4' },
      { name: 'Charcoal Accent', hex: '#202020' },
    ],
    motif: 'interlocking-rings',
  },
  {
    id: 'executive-gala-symposium',
    title: 'Annual Leadership & Recognition Gala',
    category: 'Corporate Events',
    subtitle: 'Structured Executive Stage & Formal Dining Layout',
    summary:
      'A disciplined corporate gala design featuring clean vertical architectural monoliths, centered podium lighting, and formal monochrome-and-gold banquet tables.',
    designBrief:
      'Engineered to convey institutional authority and hospitality for an annual executive awards evening. Clean geometric sightlines preserved unobstructed views of the main stage across the entire dining floor.',
    architecturalElements: [
      'Tri-panel architectural stage backdrop with precision warm-white key lighting',
      'Structured registration desk with understated metallic signage framing',
      'Uniform round banquet arrangements with tailored charcoal napkins and gold flatware',
    ],
    colorStory: [
      { name: 'Charcoal Black', hex: '#202020' },
      { name: 'Champagne Gold', hex: '#C5A46D' },
      { name: 'Pure White', hex: '#FFFFFF' },
    ],
    motif: 'executive-monolith',
  },
  {
    id: 'milestone-soiree-birthday',
    title: 'Golden Milestone Evening Soirée',
    category: 'Birthdays',
    subtitle: 'Sculptural Focal Wall & Candlelit Celebration Dining',
    summary:
      'A refined milestone birthday setting defined by radiating gold linework, sculpted pedestal displays, and warm ambient uplighting.',
    designBrief:
      'Conceived as an adult, black-tie celebration that favored architectural geometry over novelty props. Layered textured panels and metallic framing gave the cake presentation and dining tables a cohesive gallery feel.',
    architecturalElements: [
      'Fluted matte focal wall accented by radial gold brass trim lines',
      'Graduated acrylic and gold display plinths for cake and floral sculptures',
      'Long estate dining table dressed in ivory runners and taper candles',
    ],
    colorStory: [
      { name: 'Deep Burgundy', hex: '#541C2B' },
      { name: 'Champagne Gold', hex: '#C5A46D' },
      { name: 'Charcoal Black', hex: '#202020' },
    ],
    motif: 'celestial-starburst',
  },
  {
    id: 'heritage-ceremonial-court',
    title: 'Cultural Heritage Ceremonial Gathering',
    category: 'Traditional Events',
    subtitle: 'Textured Heritage Motifs & Ceremonial Dais Styling',
    summary:
      'A dignified traditional celebration weaving geometric diamond latticework, rich burgundy drapery, and elevated ceremonial seating for elders and families.',
    designBrief:
      'Honored multi-generational traditions through purposeful spatial arrangement. Deep burgundy textiles and woven gold geometric motifs established ceremonial reverence while ensuring comfortable hospitality flow for large family groups.',
    architecturalElements: [
      'Hand-pleated burgundy canopy anchored by geometric gold lattice dividers',
      'Elevated ceremonial seating platform with embroidered bolster cushions',
      'Dedicated welcome corridor lined with brass lanterns and fresh foliage',
    ],
    colorStory: [
      { name: 'Deep Burgundy', hex: '#541C2B' },
      { name: 'Champagne Gold', hex: '#C5A46D' },
      { name: 'Warm Ivory', hex: '#FAF8F4' },
    ],
    motif: 'heritage-lattice',
  },
  {
    id: 'vaulted-pavilion-transformation',
    title: 'Grand Pavilion Full-Venue Transformation',
    category: 'Venue Decorations',
    subtitle: 'Vaulted Ceiling Draping & Aisle Illumination',
    summary:
      'Complete architectural dressing of an expansive hall using sweeping ivory ceiling canopies, symmetrical floral columns, and warm chandelier framing.',
    designBrief:
      'Transformed a raw open-span venue into a serene, intimate sanctuary. Continuous overhead fabric swags softened acoustics and ceiling height, guiding guest attention naturally toward the central stage and dance floor.',
    architecturalElements: [
      'Radiating ivory chiffon ceiling canopy converging at a central floral ring',
      'Eight symmetrical aisle pedestals topped with cascading white and burgundy blooms',
      'Perimeter pipe-and-drape enclosure concealing service corridors seamlessly',
    ],
    colorStory: [
      { name: 'Warm Ivory', hex: '#FAF8F4' },
      { name: 'Champagne Gold', hex: '#C5A46D' },
      { name: 'Deep Burgundy', hex: '#541C2B' },
    ],
    motif: 'vaulted-chandelier',
  },
];

export const TIKTOK_VIDEOS: TikTokVideoItem[] = [
  {
    id: 'tiktok-1',
    videoId: '7506604206950812950',
    url: 'https://www.tiktok.com/@kk_decorandevent/video/7506604206950812950',
    title: 'Featured Celebration Setup & Decor Detail',
    caption: 'Behind-the-scenes styling, floral composition, and finished venue atmosphere by KK Decor and Event.',
  },
  {
    id: 'tiktok-2',
    videoId: '7506079974999313686',
    url: 'https://www.tiktok.com/@kk_decorandevent/video/7506079974999313686',
    title: 'Signature Event Transformation Showcase',
    caption: 'Stage architecture, lighting balance, and refined reception presentation from our recent showcase.',
  },
];

export const TIKTOK_PROFILE_URL = 'https://www.tiktok.com/@kk_decorandevent';

export const WHY_CHOOSE_ITEMS: WhyChooseItem[] = [
  {
    number: '01',
    title: 'Professional Event Management',
    description:
      'Structured project timelines, clear stakeholder communication, and calm leadership across every phase of your event.',
    iconKey: 'award',
  },
  {
    number: '02',
    title: 'Creative Decoration Concepts',
    description:
      'Original visual direction tailored to your venue proportions, cultural traditions, and preferred palette.',
    iconKey: 'palette',
  },
  {
    number: '03',
    title: 'Attention to Detail',
    description:
      'Every drape fold, floral stem, candle placement, and lighting angle is inspected before the first guest arrives.',
    iconKey: 'eye',
  },
  {
    number: '04',
    title: 'Customized Event Experiences',
    description:
      'No cookie-cutter packages—every layout, backdrop, and table configuration is adapted to your guest count and vision.',
    iconKey: 'compass',
  },
  {
    number: '05',
    title: 'Quality Service Delivery',
    description:
      'Durable staging structures, premium fabrics, fresh botanicals, and disciplined teardown after the celebration concludes.',
    iconKey: 'shield',
  },
  {
    number: '06',
    title: 'Customer Satisfaction',
    description:
      'A collaborative, transparent planning relationship designed to earn lasting trust and heartfelt recommendations.',
    iconKey: 'smile',
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Client Consultation',
    description:
      'An initial structured conversation to understand your celebration date, venue context, guest scale, and priorities.',
  },
  {
    step: '02',
    title: 'Understanding Requirements',
    description:
      'Detailed review of floor plans, cultural customs, technical constraints, and budget parameters.',
  },
  {
    step: '03',
    title: 'Creative Concept Development',
    description:
      'Refining the palette, stage architecture, floral direction, and spatial layout into a cohesive design proposal.',
  },
  {
    step: '04',
    title: 'Planning and Preparation',
    description:
      'Sourcing materials, coordinating production schedules, and aligning venue access and vendor timelines.',
  },
  {
    step: '05',
    title: 'Event Setup and Decoration',
    description:
      'On-site installation of stage structures, drapery, floral arrangements, table settings, and lighting balance.',
  },
  {
    step: '06',
    title: 'Event Execution',
    description:
      'Dedicated floor oversight ensuring seamless transitions throughout the program and orderly post-event wrap-up.',
  },
];

// Clearly marked demonstration testimonials until verified client reviews are added.
export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'sample-1',
    quote:
      'KK Decor and Event brought remarkable composure and elegance to our wedding reception. Every floral stand, stage panel, and table setting reflected the exact calm luxury we hoped for, allowing our families to enjoy every moment without worry.',
    clientName: 'Sample Client Review — Wedding Reception',
    eventContext: 'Demonstration Testimonial · Full Wedding Planning & Stage Decor',
    isDemonstrationSample: true,
  },
  {
    id: 'sample-2',
    quote:
      'From our initial walkthrough to the final guest departure, the team operated with genuine professionalism. Their stage symmetry and subtle lighting transformed our annual corporate recognition evening into a distinguished experience.',
    clientName: 'Sample Client Review — Corporate Gala',
    eventContext: 'Demonstration Testimonial · Corporate Event & Venue Styling',
    isDemonstrationSample: true,
  },
  {
    id: 'sample-3',
    quote:
      'They listened attentively to our cultural customs and blended traditional elements seamlessly with contemporary ivory and gold styling. The atmosphere felt welcoming, refined, and deeply personal.',
    clientName: 'Sample Client Review — Traditional & Engagement',
    eventContext: 'Demonstration Testimonial · Cultural Ceremony & Engagement Decor',
    isDemonstrationSample: true,
  },
];

// Editable Company Contact Configuration
// Update these fields once official company phone, email, and office address are finalized.
export const COMPANY_CONTACT: EditableContactInfo = {
  phone: {
    value: 'Official Phone Number — To Be Updated',
    isConfigured: false,
    placeholderNotice: 'Configurable in company profile data; inquiries are accepted immediately via the contact form.',
  },
  email: {
    value: 'Official Email Address — To Be Updated',
    isConfigured: false,
    placeholderNotice: 'Configurable in company profile data; use the inquiry form to send your event brief.',
  },
  officeLocation: {
    value: 'Office Location — Available Upon Consultation',
    isConfigured: false,
    placeholderNotice: 'Update with your official studio or office street address when ready.',
  },
  tiktok: {
    handle: '@kk_decorandevent',
    url: 'https://www.tiktok.com/@kk_decorandevent',
  },
  additionalSocials: [
    {
      platform: 'TikTok',
      status: '@kk_decorandevent (Active)',
      url: 'https://www.tiktok.com/@kk_decorandevent',
    },
    {
      platform: 'Instagram',
      status: 'Profile link configurable upon update',
    },
    {
      platform: 'Facebook',
      status: 'Profile link configurable upon update',
    },
  ],
};

export interface PartnerCompany {
  id: string;
  name: string;
  monogram: string;
  discipline: string;
  logoUrl?: string;
  websiteUrl?: string;
  isPlaceholder?: boolean;
}

// Editable Partner Companies Directory
// Replace placeholder names, disciplines, logoUrl paths, and websiteUrl links with official partner details.
export const PARTNER_COMPANIES_ROW_ONE: PartnerCompany[] = [
  {
    id: 'partner-01',
    name: 'Partner Company 01',
    monogram: 'P1',
    discipline: 'Venue & Hospitality Partner',
    isPlaceholder: true,
  },
  {
    id: 'partner-02',
    name: 'Partner Company 02',
    monogram: 'P2',
    discipline: 'Botanical & Floral Supplier',
    isPlaceholder: true,
  },
  {
    id: 'partner-03',
    name: 'Partner Company 03',
    monogram: 'P3',
    discipline: 'Audio & Stage Lighting',
    isPlaceholder: true,
  },
  {
    id: 'partner-04',
    name: 'Partner Company 04',
    monogram: 'P4',
    discipline: 'Fine Catering & Banquet',
    isPlaceholder: true,
  },
  {
    id: 'partner-05',
    name: 'Partner Company 05',
    monogram: 'P5',
    discipline: 'Photography & Cinema',
    isPlaceholder: true,
  },
  {
    id: 'partner-06',
    name: 'Partner Company 06',
    monogram: 'P6',
    discipline: 'Custom Linen & Tableware',
    isPlaceholder: true,
  },
];

export const PARTNER_COMPANIES_ROW_TWO: PartnerCompany[] = [
  {
    id: 'partner-07',
    name: 'Partner Company 07',
    monogram: 'P7',
    discipline: 'Architectural Fabrication',
    isPlaceholder: true,
  },
  {
    id: 'partner-08',
    name: 'Partner Company 08',
    monogram: 'P8',
    discipline: 'Executive Event Logistics',
    isPlaceholder: true,
  },
  {
    id: 'partner-09',
    name: 'Partner Company 09',
    monogram: 'P9',
    discipline: 'Luxury Stationery & Print',
    isPlaceholder: true,
  },
  {
    id: 'partner-10',
    name: 'Partner Company 10',
    monogram: 'P10',
    discipline: 'Live Entertainment & Sound',
    isPlaceholder: true,
  },
  {
    id: 'partner-11',
    name: 'Partner Company 11',
    monogram: 'P11',
    discipline: 'Valet & Guest Reception',
    isPlaceholder: true,
  },
  {
    id: 'partner-12',
    name: 'Partner Company 12',
    monogram: 'P12',
    discipline: 'Cultural Ceremony Outfitters',
    isPlaceholder: true,
  },
];

