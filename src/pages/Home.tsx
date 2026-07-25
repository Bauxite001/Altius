import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, Building2, Home as HomeIcon, TrendingUp, Users, Shield, Star,
  ChevronLeft, ChevronRight, Play, Check, Award, Landmark, MapPin,
  Bed, Bath, Search, Phone
} from 'lucide-react';
import AnimatedCounter from '../components/AnimatedCounter';
import PropertyCard from '../components/PropertyCard';
import { properties, testimonials, newsArticles, stats, investmentPlans } from '../data';

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.15 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&h=1080&fit=crop&auto=format',
    headline: 'Building Wealth Through Exceptional Real Estate',
    sub: 'Property Development, Luxury Apartments, Construction & Real Estate Investments Across Nigeria.',
  },
  {
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&h=1080&fit=crop&auto=format',
    headline: "Nigeria's Most Trusted Luxury Developer",
    sub: 'From Lekki to Eko Atlantic — premium properties crafted for discerning clients.',
  },
  {
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop&auto=format',
    headline: 'Invest in Prime Lagos Real Estate',
    sub: 'Up to 40% ROI on curated property investments across Lagos\'s most desirable addresses.',
  },
];

const services = [
  { icon: Building2, title: 'Property Development', desc: 'World-class residential and commercial developments across Lagos.', path: '/development', color: '#0F5132' },
  { icon: Landmark, title: 'Construction', desc: 'Full-service construction from foundation to finishing.', path: '/construction', color: '#C8A24D' },
  { icon: HomeIcon, title: 'Luxury Short Lets', desc: 'Premium furnished apartments for short and long-term stays.', path: '/short-lets', color: '#0F5132' },
  { icon: TrendingUp, title: 'Investment', desc: 'Structured investment portfolios with proven ROI.', path: '/investment', color: '#C8A24D' },
  { icon: Users, title: 'Client Advisory', desc: 'Expert guidance for buying, selling, and portfolio management.', path: '/advisory', color: '#0F5132' },
  { icon: Shield, title: 'Project Management', desc: 'End-to-end construction and development project oversight.', path: '/construction', color: '#C8A24D' },
];

const whyChoose = [
  { title: 'Experienced Team', desc: '15+ years of expertise in Nigerian real estate.', icon: Award },
  { title: 'Trusted Developers', desc: 'REDAN registered with proven delivery track record.', icon: Shield },
  { title: 'Prime Locations', desc: 'Exclusive properties in Lagos\'s most desirable areas.', icon: MapPin },
  { title: 'Luxury Standards', desc: 'Every property built to international quality benchmarks.', icon: Star },
  { title: 'Transparent Process', desc: 'Clear documentation, legal due diligence at every step.', icon: Check },
  { title: 'Excellent Client Service', desc: 'Dedicated support from discovery to key handover.', icon: Users },
];

export default function Home() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [searchForm, setSearchForm] = useState({ location: '', type: '', price: '', beds: '' });
  const navigate = useNavigate();
  useReveal();

  useEffect(() => {
    const t = setInterval(() => setHeroIndex(i => (i + 1) % heroSlides.length), 6000);
    return () => clearInterval(t);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchForm).toString();
    navigate(`/properties?${params}`);
  };

  const featuredProperties = properties.filter(p => p.featured).slice(0, 6);

  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        {/* Slides */}
        {heroSlides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === heroIndex ? 1 : 0 }}
          >
            <img
              src={slide.image}
              alt={slide.headline}
              className="w-full h-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
              onLoad={() => i === 0 && setHeroLoaded(true)}
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,61,36,0.85) 0%, rgba(30,30,30,0.6) 100%)' }} />
            <div className="hero-pattern absolute inset-0" />
          </div>
        ))}

        {/* Hero Content */}
        <div className={`relative z-10 max-w-7xl mx-auto px-6 transition-all duration-700 ${heroLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="max-w-3xl">
            {/* Gold accent */}
            <div className="flex items-center gap-3 mb-6">
              <div style={{ width: 40, height: 2, background: '#C8A24D' }} />
              <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Altius Group</span>
            </div>

            <h1
              key={heroIndex}
              className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6"
              style={{ animation: 'countUp 0.7s ease forwards' }}
            >
              {heroSlides[heroIndex].headline}
            </h1>
            <p className="text-gray-200 text-lg lg:text-xl mb-10 max-w-2xl leading-relaxed" style={{ animation: 'countUp 0.9s ease forwards' }}>
              {heroSlides[heroIndex].sub}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/properties" className="btn-gold px-7 py-4 rounded-xl text-base flex items-center gap-2 font-semibold">
                Explore Properties <ArrowRight size={18} />
              </Link>
              <Link to="/short-lets" className="px-7 py-4 rounded-xl text-base font-semibold border-2 border-white text-white hover:bg-white hover:text-emerald-900 transition-all flex items-center gap-2">
                Book Short Let
              </Link>
              <Link to="/advisory" className="px-7 py-4 rounded-xl text-base font-semibold text-white/80 hover:text-white transition-colors flex items-center gap-2">
                <Phone size={18} /> Talk to an Advisor
              </Link>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIndex(i)}
              className={`transition-all duration-300 rounded-full ${i === heroIndex ? 'w-8 bg-amber-400' : 'w-2 bg-white/40'} h-2`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Slide Nav */}
        <button onClick={() => setHeroIndex(i => (i - 1 + heroSlides.length) % heroSlides.length)} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
          <ChevronLeft size={20} />
        </button>
        <button onClick={() => setHeroIndex(i => (i + 1) % heroSlides.length)} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 glass rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform">
          <ChevronRight size={20} />
        </button>

        {/* Bottom scroll hint */}
        <div className="absolute bottom-8 right-6 z-10 text-white/50 text-xs flex items-center gap-2">
          <span className="animate-bounce">↓</span> Scroll to explore
        </div>
      </section>

      {/* ── PROPERTY SEARCH BAR ── */}
      <section className="relative z-20">
        <div className="max-w-6xl mx-auto px-6 -mt-8">
          <div className="card-elevated rounded-2xl p-6 shadow-2xl" style={{ background: 'white' }}>
            <h2 className="font-display font-semibold text-gray-800 mb-4 text-lg">Find Your Perfect Property</h2>
            <form onSubmit={handleSearch} className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <select
                value={searchForm.location}
                onChange={e => setSearchForm(s => ({ ...s, location: e.target.value }))}
                className="col-span-2 md:col-span-1 px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50"
              >
                <option value="">📍 Location</option>
                <option value="ikoyi">Ikoyi</option>
                <option value="victoria-island">Victoria Island</option>
                <option value="lekki">Lekki Phase 1</option>
                <option value="banana-island">Banana Island</option>
                <option value="eko-atlantic">Eko Atlantic</option>
              </select>
              <select
                value={searchForm.type}
                onChange={e => setSearchForm(s => ({ ...s, type: e.target.value }))}
                className="px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50"
              >
                <option value="">🏠 Type</option>
                <option value="apartment">Apartment</option>
                <option value="duplex">Duplex</option>
                <option value="penthouse">Penthouse</option>
                <option value="villa">Villa</option>
                <option value="land">Land</option>
                <option value="commercial">Commercial</option>
              </select>
              <select
                value={searchForm.price}
                onChange={e => setSearchForm(s => ({ ...s, price: e.target.value }))}
                className="px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50"
              >
                <option value="">💰 Price</option>
                <option value="0-100">Under ₦100M</option>
                <option value="100-300">₦100M – ₦300M</option>
                <option value="300-600">₦300M – ₦600M</option>
                <option value="600+">Above ₦600M</option>
              </select>
              <select
                value={searchForm.beds}
                onChange={e => setSearchForm(s => ({ ...s, beds: e.target.value }))}
                className="px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-gray-50"
              >
                <option value="">🛏 Bedrooms</option>
                <option value="1">1 Bedroom</option>
                <option value="2">2 Bedrooms</option>
                <option value="3">3 Bedrooms</option>
                <option value="4">4 Bedrooms</option>
                <option value="5+">5+ Bedrooms</option>
              </select>
              <button type="submit" className="btn-primary py-3 px-5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                <Search size={16} /> Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── COMPANY OVERVIEW + STATS ── */}
      <section className="py-20 lg:py-28" style={{ background: 'linear-gradient(135deg, #0a3d24 0%, #0F5132 100%)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="reveal">
              <div className="flex items-center gap-3 mb-4">
                <div style={{ width: 40, height: 2, background: '#C8A24D' }} />
                <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">About Altius Group</span>
              </div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-6">
                Nigeria's Premier Real Estate & Investment Company
              </h2>
              <p className="text-emerald-100 text-lg leading-relaxed mb-6">
                Established in 2009, Altius Group has grown into Nigeria's most trusted name in luxury property development, construction, and real estate investment. From iconic developments in Banana Island to landmark projects on Eko Atlantic, we craft spaces that redefine premium living.
              </p>
              <p className="text-emerald-200 leading-relaxed mb-8">
                Our portfolio spans luxury residential apartments, luxury short-let management, large-scale construction, and structured investment products — all managed to international standards from our Lekki headquarters.
              </p>
              <Link to="/about" className="btn-gold px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 w-fit">
                Our Story <ArrowRight size={16} />
              </Link>
            </div>
            <div className="reveal grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop&auto=format" alt="Luxury apartment interior" className="rounded-2xl w-full h-48 object-cover" />
              <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop&auto=format" alt="Lagos skyline development" className="rounded-2xl w-full h-48 object-cover mt-8" />
              <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop&auto=format" alt="Luxury villa exterior" className="rounded-2xl w-full h-48 object-cover -mt-4" />
              <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=400&fit=crop&auto=format" alt="Modern apartment building" className="rounded-2xl w-full h-48 object-cover mt-4" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 reveal">
            {stats.map(stat => (
              <AnimatedCounter key={stat.label} end={stat.value} suffix={stat.suffix} label={stat.label} />
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 lg:py-28 pattern-geo" style={{ background: '#FAF8F3' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div style={{ width: 40, height: 2, background: '#C8A24D' }} />
              <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">Our Services</span>
              <div style={{ width: 40, height: 2, background: '#C8A24D' }} />
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Real Estate Solutions
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              From acquisition to completion, investment to advisory — we provide end-to-end real estate services tailored to your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <Link key={svc.title} to={svc.path} className="card-elevated rounded-2xl p-7 group reveal" style={{ animationDelay: `${i * 0.1}s` }}>
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                  style={{ background: `${svc.color}15` }}
                >
                  <svc.icon size={26} color={svc.color} />
                </div>
                <h3 className="font-display text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-800 transition-colors">{svc.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{svc.desc}</p>
                <div className="flex items-center gap-1.5 text-emerald-700 text-sm font-semibold group-hover:gap-3 transition-all">
                  Learn More <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ── */}
      <section className="py-20 lg:py-28" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12 reveal">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div style={{ width: 40, height: 2, background: '#C8A24D' }} />
                <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">Properties</span>
              </div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900">Featured Listings</h2>
            </div>
            <Link to="/properties" className="hidden sm:flex items-center gap-2 text-emerald-800 font-semibold hover:gap-3 transition-all text-sm">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map(p => (
              <div key={p.id} className="reveal">
                <PropertyCard property={p} />
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/properties" className="btn-primary px-8 py-3.5 rounded-xl text-sm font-semibold">
              Browse All Properties
            </Link>
          </div>
        </div>
      </section>

      {/* ── LUXURY SHORT LETS ── */}
      <section className="py-20 lg:py-28 pattern-diagonal" style={{ background: '#FAF8F3' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="reveal">
              <div className="flex items-center gap-3 mb-4">
                <div style={{ width: 40, height: 2, background: '#C8A24D' }} />
                <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">Short Lets</span>
              </div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Hotel-Level Luxury.<br />Home-Level Comfort.
              </h2>
              <p className="text-gray-500 leading-relaxed mb-6">
                Our fully-serviced luxury apartments in Ikoyi, Victoria Island, and Lekki offer the perfect blend of hotel amenities and residential comfort — for business travellers, vacationers, and executives.
              </p>
              <ul className="space-y-3 mb-8">
                {['WiFi & Smart TV', '24hr concierge & security', 'Swimming pool & gym access', 'Daily housekeeping available', 'Airport pickup service', 'Flexible daily, weekly & monthly rates'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-gray-700">
                    <Check size={16} className="text-emerald-700 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex gap-3">
                <Link to="/short-lets" className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">
                  Explore Short Lets <ArrowRight size={16} />
                </Link>
                <Link to="/booking" className="btn-gold px-6 py-3 rounded-xl text-sm font-semibold">
                  Book Now
                </Link>
              </div>
            </div>
            <div className="reveal grid grid-cols-2 gap-4">
              {[
                'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=500&fit=crop&auto=format',
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=500&fit=crop&auto=format',
                'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=500&fit=crop&auto=format',
                'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&h=500&fit=crop&auto=format',
              ].map((img, i) => (
                <div key={i} className={`img-zoom rounded-2xl overflow-hidden ${i % 2 === 1 ? 'mt-6' : ''}`}>
                  <img src={img} alt="Luxury apartment interior" className="w-full h-44 object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── INVESTMENT ── */}
      <section className="py-20 lg:py-28" style={{ background: '#1E1E1E' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div style={{ width: 40, height: 2, background: '#C8A24D' }} />
              <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Investment</span>
              <div style={{ width: 40, height: 2, background: '#C8A24D' }} />
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
              Build Lasting Wealth Through Property
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Structured real estate investment plans delivering consistent, above-market returns across Lagos's most sought-after developments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {investmentPlans.map((plan, i) => (
              <div
                key={plan.id}
                className={`rounded-2xl p-8 relative overflow-hidden reveal transition-transform hover:-translate-y-2 duration-300 ${
                  plan.popular
                    ? 'border-2 border-amber-500'
                    : 'border border-gray-700'
                }`}
                style={{ background: plan.popular ? 'linear-gradient(135deg, #0F5132, #1a6b40)' : '#2a2a2a' }}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 badge-featured rounded-bl-xl rounded-tr-2xl px-3 py-1.5 text-xs">
                    Most Popular
                  </div>
                )}
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-2">{plan.type}</p>
                <h3 className="font-display text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-3xl font-bold text-amber-400 mb-1">{plan.expectedROI}</p>
                <p className="text-gray-400 text-sm mb-1">Expected ROI</p>
                <p className="text-white font-semibold mb-6">From {plan.minInvestment}</p>
                <ul className="space-y-2.5 mb-8">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                      <Check size={14} className="text-amber-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/investment" className={`block text-center py-3 rounded-xl font-semibold text-sm ${plan.popular ? 'btn-gold' : 'btn-outline border-gray-500 text-gray-300 hover:bg-white hover:text-gray-900'}`}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-gray-500 text-xs mt-6">*Based on Altius Group Investment Report 2025. Past performance does not guarantee future results.</p>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="py-20 lg:py-28" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div style={{ width: 40, height: 2, background: '#C8A24D' }} />
              <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">Why Altius</span>
              <div style={{ width: 40, height: 2, background: '#C8A24D' }} />
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900">Why Clients Choose Altius Group</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChoose.map((item, i) => (
              <div key={item.title} className="flex gap-4 p-6 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-md transition-all reveal">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ background: '#e8f5ee' }}>
                  <item.icon size={22} color="#0F5132" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 lg:py-28 pattern-dots" style={{ background: '#FAF8F3' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 reveal">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div style={{ width: 40, height: 2, background: '#C8A24D' }} />
              <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">Testimonials</span>
              <div style={{ width: 40, height: 2, background: '#C8A24D' }} />
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900">What Our Clients Say</h2>
          </div>

          <div className="relative">
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, i) => (
                <div key={t.id} className={`card-elevated rounded-2xl p-7 reveal ${i === 1 ? 'md:scale-105 ring-2 ring-amber-400' : ''}`}>
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={16} fill="#C8A24D" color="#C8A24D" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6 text-sm italic">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover" loading="lazy" />
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                      <p className="text-xs text-amber-600 flex items-center gap-1 mt-0.5"><MapPin size={10} />{t.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LATEST NEWS ── */}
      <section className="py-20 lg:py-24" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12 reveal">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div style={{ width: 40, height: 2, background: '#C8A24D' }} />
                <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">Insights</span>
              </div>
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-gray-900">Latest News & Insights</h2>
            </div>
            <Link to="/news" className="hidden sm:flex items-center gap-2 text-emerald-800 font-semibold text-sm hover:gap-3 transition-all">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newsArticles.map((article, i) => (
              <Link key={article.id} to={`/news/${article.id}`} className="card-elevated rounded-2xl overflow-hidden group reveal">
                <div className="img-zoom h-44">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{article.category}</span>
                    <span className="text-xs text-gray-400">{article.readTime}</span>
                  </div>
                  <h3 className="font-display font-semibold text-gray-900 text-sm leading-snug group-hover:text-emerald-800 transition-colors line-clamp-2">{article.title}</h3>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-24 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&h=600&fit=crop&auto=format"
          alt="Luxury living room background"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,61,36,0.92) 0%, rgba(15,81,50,0.85) 100%)' }} />
        <div className="hero-pattern absolute inset-0" />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div style={{ width: 40, height: 2, background: '#C8A24D' }} />
            <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Get Started</span>
            <div style={{ width: 40, height: 2, background: '#C8A24D' }} />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Invest?<br />Speak with Our Experts Today.
          </h2>
          <p className="text-emerald-100 text-lg mb-10 max-w-xl mx-auto">
            Whether you're buying your first property or expanding your portfolio, our expert team is ready to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-gold px-8 py-4 rounded-xl text-base font-semibold flex items-center justify-center gap-2">
              Book Free Consultation <ArrowRight size={18} />
            </Link>
            <Link to="/properties" className="px-8 py-4 rounded-xl text-base font-semibold border-2 border-white text-white hover:bg-white hover:text-emerald-900 transition-all">
              Browse Properties
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
