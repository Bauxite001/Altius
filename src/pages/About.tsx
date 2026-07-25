import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Building2, TrendingUp } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { teamMembers, stats } from '../data';
import AnimatedCounter from '../components/AnimatedCounter';

const timeline = [
  { year: '2009', title: 'Altius Group Founded', desc: 'Established in Lekki, Lagos with a vision to redefine Nigerian real estate.' },
  { year: '2012', title: 'First Major Development', desc: 'Completed Altius Gardens Phase 1 — 48 luxury units in Lekki Phase 1.' },
  { year: '2015', title: 'Short Let Division Launched', desc: 'Expanded into premium short-let management across Ikoyi and Victoria Island.' },
  { year: '2018', title: 'Investment Arm Established', desc: 'Launched structured real estate investment products with CSCS registration.' },
  { year: '2020', title: 'REDAN Certification', desc: 'Achieved full Real Estate Developers Association of Nigeria membership.' },
  { year: '2023', title: 'Eko Atlantic Partnership', desc: 'Secured prime development rights in Eko Atlantic City.' },
  { year: '2024', title: 'Best Luxury Developer Award', desc: 'Recognized at the Annual Real Estate Excellence Awards, Lagos.' },
  { year: '2026', title: '₦50B Development Launch', desc: 'Announced landmark mixed-use development at Eko Atlantic City.' },
];

const values = [
  { icon: Award, title: 'Excellence', desc: 'We hold ourselves to international standards in every project we deliver.' },
  { icon: Users, title: 'Integrity', desc: 'Transparent dealings, clear documentation, and honest communication.' },
  { icon: Building2, title: 'Innovation', desc: 'Leveraging modern design and technology to create forward-thinking spaces.' },
  { icon: TrendingUp, title: 'Value Creation', desc: 'Every project is designed to maximize long-term value for clients and investors.' },
];

export default function About() {
  return (
    <main className="pt-20 min-h-screen">
      {/* Header */}
      <section className="relative py-24" style={{ background: 'linear-gradient(135deg, #0a3d24, #0F5132)' }}>
        <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&h=600&fit=crop&auto=format" alt="Lagos skyline" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="hero-pattern absolute inset-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <Breadcrumb crumbs={[{ label: 'About' }]} />
          <h1 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4">About Altius Group</h1>
          <p className="text-emerald-100 text-xl max-w-2xl">
            Nigeria's most trusted name in luxury real estate development, construction, and investment since 2009.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20" style={{ background: '#FAF8F3' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div style={{ width: 40, height: 2, background: '#C8A24D' }} />
                <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">Our Story</span>
              </div>
              <h2 className="font-display text-3xl font-bold text-gray-900 mb-6">Building Nigeria's Future, One Premium Property at a Time</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Altius Group was born from a singular conviction: that Nigerians deserve world-class real estate that combines international design standards with authentic local expertise. Founded in 2009 by a team of seasoned property professionals and investment bankers, we set out to transform the Lagos luxury property market.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Over 15 years, we've grown from a boutique developer into Nigeria's most comprehensive real estate company — delivering landmark developments, managing luxury short-let portfolios, structuring investment products, and advising clients on property acquisitions across Lagos's most sought-after addresses.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Today, with over ₦50 billion in active developments, 850+ luxury units under management, and 2,400+ satisfied clients, Altius Group stands as a testament to what's possible when Nigerian expertise meets global ambition.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl" style={{ background: 'linear-gradient(135deg, #e8f5ee, #f0faf4)' }}>
                  <h3 className="font-display font-bold text-emerald-800 mb-2">Our Mission</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">To develop exceptional real estate that creates enduring value for clients, investors, and communities across Nigeria.</p>
                </div>
                <div className="p-5 rounded-2xl" style={{ background: 'linear-gradient(135deg, #fdf8ed, #fff8e7)' }}>
                  <h3 className="font-display font-bold text-amber-700 mb-2">Our Vision</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">To be Africa's most respected real estate company, recognized for quality, integrity, and transformative urban development.</p>
                </div>
              </div>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=700&fit=crop&auto=format" alt="Altius Group luxury development" className="rounded-2xl w-full h-96 object-cover shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, #0a3d24, #0F5132)' }}>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(stat => <AnimatedCounter key={stat.label} end={stat.value} suffix={stat.suffix} label={stat.label} />)}
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div style={{ width: 40, height: 2, background: '#C8A24D' }} />
              <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">Core Values</span>
              <div style={{ width: 40, height: 2, background: '#C8A24D' }} />
            </div>
            <h2 className="font-display text-3xl font-bold text-gray-900">What We Stand For</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.title} className="card-elevated rounded-2xl p-6 text-center group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 bg-emerald-50 group-hover:bg-emerald-800 transition-colors">
                  <v.icon size={24} className="text-emerald-800 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-display font-bold text-gray-900 mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 pattern-geo" style={{ background: '#FAF8F3' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div style={{ width: 40, height: 2, background: '#C8A24D' }} />
              <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">Our Journey</span>
              <div style={{ width: 40, height: 2, background: '#C8A24D' }} />
            </div>
            <h2 className="font-display text-3xl font-bold text-gray-900">15 Years of Excellence</h2>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-0.5 top-0 bottom-0 w-0.5 bg-emerald-200" />
            {timeline.map((event, i) => (
              <div key={event.year} className={`relative flex items-start gap-8 mb-10 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className={`flex-1 ${i % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className={`card-elevated rounded-2xl p-5 inline-block max-w-xs ${i % 2 === 0 ? 'ml-auto' : ''}`}>
                    <p className="font-display font-bold text-amber-600 text-sm mb-1">{event.year}</p>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">{event.title}</h3>
                    <p className="text-gray-500 text-xs">{event.desc}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-emerald-800 border-4 border-white shadow-md" style={{ top: 20 }} />
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div style={{ width: 40, height: 2, background: '#C8A24D' }} />
              <span className="text-amber-600 text-sm font-semibold tracking-widest uppercase">Leadership</span>
              <div style={{ width: 40, height: 2, background: '#C8A24D' }} />
            </div>
            <h2 className="font-display text-3xl font-bold text-gray-900">Meet the Team</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map(member => (
              <div key={member.id} className="card-elevated rounded-2xl overflow-hidden group">
                <div className="img-zoom h-56">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-amber-600 text-sm font-medium mb-2">{member.role}</p>
                  <p className="text-gray-500 text-xs leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 overflow-hidden">
        <div style={{ background: 'linear-gradient(135deg, #0F5132, #0a3d24)' }} className="absolute inset-0" />
        <div className="hero-pattern absolute inset-0" />
        <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Partner With Altius Group</h2>
          <p className="text-emerald-200 mb-8">Join 2,400+ clients who trust Altius Group with their most significant real estate decisions.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-gold px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2">
              Get in Touch <ArrowRight size={18} />
            </Link>
            <Link to="/properties" className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-emerald-900 transition-all">
              View Properties
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
