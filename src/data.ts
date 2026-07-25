// Shared data for Altius Group platform

export interface Property {
  id: string;
  title: string;
  type: 'apartment' | 'duplex' | 'penthouse' | 'land' | 'commercial' | 'villa';
  status: 'available' | 'sold' | 'pending' | 'off-plan';
  price: number;
  priceLabel: string;
  location: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  featured: boolean;
  luxury: boolean;
  isNew: boolean;
  image: string;
  images: string[];
  amenities: string[];
  description: string;
  shortLet?: boolean;
  dailyRate?: number;
  weeklyRate?: number;
  monthlyRate?: number;
}

export const properties: Property[] = [
  {
    id: 'altius-penthouse-001',
    title: 'The Altius Penthouse — Ikoyi',
    type: 'penthouse',
    status: 'available',
    price: 650000000,
    priceLabel: '₦650M',
    location: 'Old Ikoyi, Lagos',
    area: 'Ikoyi',
    bedrooms: 5,
    bathrooms: 6,
    sqft: 8200,
    featured: true,
    luxury: true,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop&auto=format',
    ],
    amenities: ['Private Pool', 'Gym', 'Concierge', 'Smart Home', 'Generator', 'Ocean View', 'Wine Cellar', 'Cinema Room'],
    description: 'An exceptional penthouse offering panoramic views of the Lagos Lagoon. Features bespoke finishes, smart home automation, and world-class amenities.',
    shortLet: true,
    dailyRate: 500000,
    weeklyRate: 3000000,
    monthlyRate: 8000000,
  },
  {
    id: 'altius-vi-001',
    title: 'Victoria Crown Residence',
    type: 'apartment',
    status: 'available',
    price: 280000000,
    priceLabel: '₦280M',
    location: 'Victoria Island, Lagos',
    area: 'Victoria Island',
    bedrooms: 4,
    bathrooms: 4,
    sqft: 4800,
    featured: true,
    luxury: true,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=1200&h=800&fit=crop&auto=format',
    ],
    amenities: ['Swimming Pool', 'Gym', '24hr Security', 'Generator', 'Parking', 'Elevator', 'CCTV'],
    description: 'Luxury 4-bedroom apartment in the heart of Victoria Island, Lagos. Impeccable design meets functionality.',
    shortLet: true,
    dailyRate: 250000,
    weeklyRate: 1500000,
    monthlyRate: 4500000,
  },
  {
    id: 'altius-lekki-001',
    title: 'Lekki Pearl Estate',
    type: 'duplex',
    status: 'available',
    price: 185000000,
    priceLabel: '₦185M',
    location: 'Lekki Phase 1, Lagos',
    area: 'Lekki',
    bedrooms: 5,
    bathrooms: 5,
    sqft: 6500,
    featured: true,
    luxury: false,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&auto=format',
    ],
    amenities: ['BQ', 'Swimming Pool', 'Garden', 'Generator', 'Security', 'Smart Lighting'],
    description: 'Stunning 5-bedroom duplex in prime Lekki Phase 1 location. Family-oriented with excellent finishing.',
  },
  {
    id: 'altius-banana-001',
    title: 'Banana Island Grand Villa',
    type: 'villa',
    status: 'available',
    price: 1200000000,
    priceLabel: '₦1.2B',
    location: 'Banana Island, Ikoyi',
    area: 'Banana Island',
    bedrooms: 7,
    bathrooms: 8,
    sqft: 14000,
    featured: true,
    luxury: true,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200&h=800&fit=crop&auto=format',
    ],
    amenities: ['Private Pool', 'Tennis Court', 'Home Theater', 'Smart Home', 'Staff Quarters', 'Waterfront', 'Private Jetty'],
    description: 'An extraordinary 7-bedroom grand villa on prestigious Banana Island. The pinnacle of Nigerian luxury real estate.',
  },
  {
    id: 'altius-eko-001',
    title: 'Eko Atlantic Smart Apartment',
    type: 'apartment',
    status: 'off-plan',
    price: 320000000,
    priceLabel: '₦320M',
    location: 'Eko Atlantic City, Lagos',
    area: 'Eko Atlantic',
    bedrooms: 3,
    bathrooms: 3,
    sqft: 3600,
    featured: false,
    luxury: true,
    isNew: true,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&h=800&fit=crop&auto=format',
    ],
    amenities: ['Ocean View', 'Smart Home', 'Rooftop Pool', 'Concierge', 'Gym', 'Business Center'],
    description: 'Next-generation smart apartment in Africa\'s newest city. Investment-grade off-plan opportunity.',
    shortLet: true,
    dailyRate: 180000,
    weeklyRate: 1000000,
    monthlyRate: 3000000,
  },
  {
    id: 'altius-lekki-002',
    title: 'Lekki Gardens Modern Home',
    type: 'duplex',
    status: 'available',
    price: 95000000,
    priceLabel: '₦95M',
    location: 'Lekki Gardens, Lagos',
    area: 'Lekki',
    bedrooms: 4,
    bathrooms: 4,
    sqft: 4200,
    featured: false,
    luxury: false,
    isNew: false,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop&auto=format',
    images: [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&h=800&fit=crop&auto=format',
    ],
    amenities: ['BQ', 'Generator', 'Security', 'Parking', 'Garden'],
    description: 'Contemporary 4-bedroom duplex in the serene Lekki Gardens estate. Perfect family home.',
  },
];

export const shortLetProperties = properties.filter(p => p.shortLet);

export const newsArticles = [
  {
    id: 'news-001',
    title: 'Altius Group Launches Landmark ₦50B Development in Eko Atlantic',
    category: 'Company Update',
    date: '2026-07-15',
    author: 'Altius Editorial Team',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=500&fit=crop&auto=format',
    excerpt: 'Altius Group has announced its most ambitious project to date — a mixed-use luxury development at the heart of Eko Atlantic City.',
    content: 'Altius Group is proud to announce the launch of its landmark ₦50 billion integrated development in Eko Atlantic City...',
    tags: ['Eko Atlantic', 'Development', 'Investment'],
  },
  {
    id: 'news-002',
    title: 'Lagos Real Estate Market Insights: Q2 2026 Report',
    category: 'Market Insights',
    date: '2026-07-08',
    author: 'Research & Analytics Team',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=800&h=500&fit=crop&auto=format',
    excerpt: 'Our Q2 2026 analysis reveals strong demand for luxury properties in Ikoyi and Victoria Island, with prices appreciating 18% year-on-year.',
    content: 'The Lagos luxury real estate market continues its upward trajectory...',
    tags: ['Market Analysis', 'Lagos', 'Investment'],
  },
  {
    id: 'news-003',
    title: '5 Reasons Why Lekki Phase 1 Remains Nigeria\'s Prime Investment Zone',
    category: 'Investment Tips',
    date: '2026-06-28',
    author: 'Investment Advisory Desk',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1464082354059-27db6ce50048?w=800&h=500&fit=crop&auto=format',
    excerpt: 'Infrastructure development, improved connectivity, and rising demand continue to make Lekki Phase 1 Nigeria\'s most sought-after address.',
    content: 'Lekki Phase 1 remains the crown jewel of Lagos real estate...',
    tags: ['Lekki', 'Investment', 'Analysis'],
  },
  {
    id: 'news-004',
    title: 'Altius Group Wins Best Luxury Developer Award 2026',
    category: 'Awards',
    date: '2026-06-20',
    author: 'Communications Team',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop&auto=format',
    excerpt: 'Altius Group has been recognized as Nigeria\'s Best Luxury Property Developer at the Annual Real Estate Excellence Awards 2026.',
    content: 'We are honored to receive this prestigious recognition...',
    tags: ['Awards', 'Recognition'],
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Adebayo Okonkwo',
    role: 'CEO, TechNaija Solutions',
    location: 'Ikoyi, Lagos',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format',
    text: 'Altius Group delivered beyond our expectations. The penthouse in Ikoyi is nothing short of spectacular. From the seamless buying process to the exceptional quality of finishes, every detail was perfect.',
  },
  {
    id: 2,
    name: 'Dr. Ngozi Eze',
    role: 'Medical Director, Lagos Medical Centre',
    location: 'Victoria Island',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&auto=format',
    text: 'I\'ve worked with several property firms in Lagos, but Altius Group stands apart. Their transparency, professionalism, and commitment to luxury are unmatched. My Victoria Island apartment is my proudest investment.',
  },
  {
    id: 3,
    name: 'Emeka Okafor',
    role: 'Director, FirstBank Nigeria',
    location: 'Lekki Phase 1',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&auto=format',
    text: 'The ROI on my Lekki investment has exceeded projections by 22%. The Altius team guided me through every step with expertise and genuine care. I\'ve already recommended them to 10 colleagues.',
  },
];

export const teamMembers = [
  {
    id: 1,
    name: 'Alhaji Suleiman Adebayo',
    role: 'Group Managing Director',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&auto=format',
    bio: '25+ years of experience in Nigerian real estate development and investment banking.',
  },
  {
    id: 2,
    name: 'Mrs. Amara Obi',
    role: 'Chief Operating Officer',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&auto=format',
    bio: 'Former VP at Julius Berger, specializing in large-scale construction project management.',
  },
  {
    id: 3,
    name: 'Mr. Chidi Nwachukwu',
    role: 'Head of Investment',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&auto=format',
    bio: 'CFA charterholder with 18 years in real estate investment structuring across West Africa.',
  },
  {
    id: 4,
    name: 'Arc. Fatimah Bello',
    role: 'Chief Architect & Design Director',
    image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop&auto=format',
    bio: 'Harvard-trained architect, multiple award winner for sustainable luxury design.',
  },
];

export const stats = [
  { label: 'Years Experience', value: 15, suffix: '+' },
  { label: 'Projects Completed', value: 120, suffix: '+' },
  { label: 'Luxury Units Managed', value: 850, suffix: '+' },
  { label: 'Satisfied Clients', value: 2400, suffix: '+' },
];

export const investmentPlans = [
  {
    id: 'inv-001',
    name: 'Starter Portfolio',
    minInvestment: '₦5,000,000',
    expectedROI: '15–20%',
    duration: '24 months',
    type: 'Land Banking',
    features: ['Prime land acquisition', 'Legal documentation', 'Regular updates', 'Exit strategy support'],
  },
  {
    id: 'inv-002',
    name: 'Growth Portfolio',
    minInvestment: '₦25,000,000',
    expectedROI: '22–30%',
    duration: '36 months',
    type: 'Residential Development',
    popular: true,
    features: ['Off-plan investment', 'Construction monitoring', 'Rental management', 'Capital appreciation', 'Priority exit'],
  },
  {
    id: 'inv-003',
    name: 'Premier Portfolio',
    minInvestment: '₦100,000,000',
    expectedROI: '28–40%',
    duration: '48 months',
    type: 'Mixed-Use Development',
    features: ['Joint venture opportunity', 'Board representation', 'Commercial & residential mix', 'Full management', 'Quarterly dividends', 'VIP advisory access'],
  },
];

export const faqs = [
  {
    id: 1,
    question: 'How do I schedule a property inspection?',
    answer: 'You can schedule a property inspection directly through our website by clicking "Schedule Inspection" on any property listing. You can also call our office, send us a WhatsApp message, or fill out the contact form. Our team will confirm your appointment within 24 hours.',
  },
  {
    id: 2,
    question: 'What documents do I need to purchase a property?',
    answer: 'For property purchase, you will need: Valid government-issued ID (National ID, Driver\'s License, or International Passport), Tax Identification Number (TIN), Proof of income or bank statement, Two passport photographs, and your utility bill for address verification. Our legal team will guide you through the full documentation process.',
  },
  {
    id: 3,
    question: 'How do I book a luxury short-let apartment?',
    answer: 'Booking is easy — select your preferred apartment, choose your check-in and check-out dates, select the number of guests, and complete your payment online. You\'ll receive an instant booking confirmation via email and WhatsApp. We accept card payments, bank transfer, and USSD.',
  },
  {
    id: 4,
    question: 'What is the expected ROI on Altius Group investment properties?',
    answer: 'Based on our internal performance data and market analysis (Altius Group Investment Report 2025), our residential properties have delivered between 15%–40% ROI depending on the investment type and location. Lekki and Ikoyi properties have historically achieved the highest capital appreciation. Past performance is not a guarantee of future results.',
  },
  {
    id: 5,
    question: 'Do you offer mortgage or payment plan options?',
    answer: 'Yes. We offer flexible payment plans for off-plan and new developments, typically spread over 12–48 months. We also work with leading mortgage providers including Union Bank, FirstBank, and Stanbic IBTC to facilitate competitive mortgage financing.',
  },
  {
    id: 6,
    question: 'How long does the property purchase process take?',
    answer: 'The timeline varies by property type. For completed properties: 30–60 days from offer to title transfer. For off-plan investments: construction timelines typically range from 18–36 months. We provide detailed project timelines during consultation.',
  },
  {
    id: 7,
    question: 'Is my investment secure with Altius Group?',
    answer: 'Absolutely. All Altius Group developments comply with Lagos State real estate regulations. We hold a valid Real Estate Developers License, all properties have clear title documentation (C of O or Governor\'s Consent), and transactions are handled through a licensed escrow system. We are also registered with the Real Estate Developers Association of Nigeria (REDAN).',
  },
  {
    id: 8,
    question: 'Can foreign nationals invest in Nigerian real estate?',
    answer: 'Yes, foreign nationals and diaspora Nigerians can invest in Nigerian real estate. Our legal team specializes in facilitating cross-border property transactions and can assist with all regulatory requirements, including FIRS registration and CBN forex compliance.',
  },
];
