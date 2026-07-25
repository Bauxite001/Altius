import { Link } from 'react-router-dom';
import { ArrowRight, Check, Building2, HardHat, Users, FileText } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';

function ServiceHero({ title, subtitle, image, breadcrumb }: { title: string; subtitle: string; image: string; breadcrumb: string }) {
  return (
    <section className="relative py-24" style={{ background: 'linear-gradient(135deg, #0a3d24, #0F5132)' }}>
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover opacity-20" loading="lazy" />
      <div className="hero-pattern absolute inset-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <Breadcrumb crumbs={[{ label: breadcrumb }]} />
        <h1 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4">{title}</h1>
        <p className="text-emerald-100 text-lg max-w-2xl">{subtitle}</p>
      </div>
    </section>
  );
}

export function Development() {
  const projects = [
    { name: 'Altius Atlantic Towers', location: 'Eko Atlantic City', units: 120, status: 'Under Construction', completion: '2027 Q2', image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&h=400&fit=crop&auto=format', progress: 45 },
    { name: 'Banana Island Residences', location: 'Banana Island, Ikoyi', units: 24, status: 'Off-Plan', completion: '2026 Q4', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&h=400&fit=crop&auto=format', progress: 20 },
    { name: 'Lekki Gardens Phase 3', location: 'Lekki Phase 1', units: 56, status: 'Completed', completion: '2025 Q1', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&h=400&fit=crop&auto=format', progress: 100 },
  ];

  return (
    <main className="pt-20 min-h-screen" style={{ background: '#FAF8F3' }}>
      <ServiceHero
        title="Property Development"
        subtitle="From concept to completion — Altius Group develops landmark residential and mixed-use properties across Lagos's most prestigious addresses."
        image="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&h=600&fit=crop&auto=format"
        breadcrumb="Property Development"
      />
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-emerald-50 border-l-4 border-emerald-700 rounded-r-xl p-5 mb-12">
          <p className="text-gray-700 text-sm leading-relaxed">Altius Group manages ₦50B+ in active development across Lagos. Our projects range from luxury apartment towers to mixed-use estates and off-plan residential communities. Each development delivers international design standards with authentic Nigerian character.</p>
        </div>
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-8">Current & Recent Projects</h2>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {projects.map(p => (
            <div key={p.name} className="card-elevated rounded-2xl overflow-hidden">
              <div className="img-zoom h-48">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${p.status === 'Completed' ? 'bg-green-100 text-green-700' : p.status === 'Off-Plan' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700'}`}>{p.status}</span>
                  <span className="text-xs text-gray-400">Est. {p.completion}</span>
                </div>
                <h3 className="font-display font-bold text-gray-900 mb-1">{p.name}</h3>
                <p className="text-gray-500 text-xs mb-3">{p.location} · {p.units} units</p>
                <div className="mb-1 flex justify-between text-xs text-gray-500"><span>Construction Progress</span><span className="font-semibold text-emerald-700">{p.progress}%</span></div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${p.progress}%`, background: 'linear-gradient(90deg, #0F5132, #C8A24D)' }} />
                </div>
                <Link to="/contact" className="block mt-4 btn-outline py-2 rounded-xl text-xs text-center">Download Brochure</Link>
              </div>
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-10 text-center" style={{ background: 'linear-gradient(135deg, #0F5132, #1a6b40)' }}>
          <h2 className="font-display text-2xl font-bold text-white mb-3">Invest in Our Next Development</h2>
          <p className="text-emerald-200 mb-6">Off-plan investment opportunities available from ₦25M with projected 22–30% ROI.</p>
          <Link to="/investment" className="btn-gold px-8 py-3 rounded-xl font-semibold text-sm inline-flex items-center gap-2">Learn About Investment <ArrowRight size={16} /></Link>
        </div>
      </section>
    </main>
  );
}

export function Construction() {
  const services = [
    { title: 'Commercial Construction', desc: 'Office towers, retail centers, mixed-use developments.', icon: Building2 },
    { title: 'Residential Projects', desc: 'Luxury homes, apartment complexes, estate developments.', icon: Building2 },
    { title: 'Renovation & Refurbishment', desc: 'Premium renovations to international standards.', icon: HardHat },
    { title: 'Civil Engineering', desc: 'Infrastructure, roads, drainage, utility works.', icon: HardHat },
    { title: 'Architecture & Design', desc: 'Award-winning architectural and interior design.', icon: FileText },
    { title: 'Project Management', desc: 'End-to-end construction supervision and delivery.', icon: Users },
  ];

  return (
    <main className="pt-20 min-h-screen" style={{ background: '#FAF8F3' }}>
      <ServiceHero
        title="Construction Services"
        subtitle="Full-service construction from architectural design through to final handover — delivered to international quality standards."
        image="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&h=600&fit=crop&auto=format"
        breadcrumb="Construction"
      />
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-5 mb-12">
          <p className="text-gray-700 text-sm leading-relaxed">Altius Construction provides turnkey construction services across commercial, residential, industrial, and renovation sectors. Our COREN-registered engineers and architects have delivered 120+ projects valued at over ₦50B across Lagos, Abuja, and Port Harcourt since 2009.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map(s => (
            <div key={s.title} className="card-elevated rounded-2xl p-6 group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 group-hover:bg-emerald-800 transition-colors">
                <s.icon size={22} className="text-emerald-800 group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display font-semibold text-gray-900 mb-2">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="card-elevated rounded-2xl p-8">
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Request a Construction Quote</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Project Type</label><select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50"><option>Commercial</option><option>Residential</option><option>Renovation</option><option>Industrial</option></select></div>
              <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Project Location</label><input placeholder="Lagos, Abuja, etc." className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50" /></div>
              <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Estimated Budget</label><select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50"><option>Under ₦50M</option><option>₦50M – ₦200M</option><option>₦200M – ₦1B</option><option>Above ₦1B</option></select></div>
              <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Project Description</label><textarea rows={4} placeholder="Describe your project..." className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 resize-none" /></div>
              <button className="w-full btn-primary py-3.5 rounded-xl font-semibold text-sm">Submit Quote Request</button>
            </div>
            <div className="space-y-4">
              {['COREN-registered engineers', 'NIA member architects', 'ISO 9001:2015 certified quality management', '15+ years track record', '120+ completed projects', 'Full insurance and bonding', 'Detailed project timelines', 'Transparent cost reporting'].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <Check size={16} className="text-emerald-700 shrink-0" />
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export function Advisory() {
  return (
    <main className="pt-20 min-h-screen" style={{ background: '#FAF8F3' }}>
      <ServiceHero
        title="Client Advisory Services"
        subtitle="Expert property advisory — from first-time buyers to seasoned investors. We guide you through every decision with clarity and expertise."
        image="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=600&fit=crop&auto=format"
        breadcrumb="Client Advisory"
      />
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {[
            { title: 'Buying Guide', id: 'buying', desc: 'Step-by-step guidance for purchasing property in Nigeria. From search through legal completion.', items: ['Property search & shortlisting', 'Due diligence & title verification', 'Negotiation support', 'Legal documentation', 'Title registration & handover'] },
            { title: 'Selling Guide', id: 'selling', desc: 'Maximize the value of your property with expert marketing and negotiation support.', items: ['Property valuation', 'Marketing strategy', 'Buyer qualification', 'Price negotiation', 'Legal conveyancing'] },
            { title: 'Investment Advisory', id: 'investment', desc: 'Structured advice on property investment to maximize returns and minimize risk.', items: ['Portfolio assessment', 'Market analysis', 'ROI modelling', 'Risk management', 'Exit strategy planning'] },
            { title: 'Legal Assistance', id: 'legal', desc: 'End-to-end legal support for all property transactions.', items: ['Title search & verification', 'Survey & valuation', 'Contract review', 'Governor\'s Consent processing', 'Deed of Assignment preparation'] },
          ].map(service => (
            <div key={service.id} id={service.id} className="card-elevated rounded-2xl p-7">
              <h2 className="font-display text-xl font-bold text-gray-900 mb-3">{service.title}</h2>
              <p className="text-gray-500 text-sm mb-5 leading-relaxed">{service.desc}</p>
              <ul className="space-y-2.5 mb-6">
                {service.items.map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <Check size={15} className="text-emerald-700 shrink-0" />{item}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 w-fit">
                Book Consultation <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>
        <div className="rounded-2xl p-10 text-center" style={{ background: 'linear-gradient(135deg, #1E1E1E, #2a2a2a)' }}>
          <h2 className="font-display text-2xl font-bold text-white mb-3">Free Initial Consultation</h2>
          <p className="text-gray-300 mb-6">Speak with a senior property advisor — no obligation, no pressure. Just expert guidance.</p>
          <Link to="/contact" className="btn-gold px-8 py-3 rounded-xl font-semibold text-sm inline-flex items-center gap-2">Book Free Consultation <ArrowRight size={16} /></Link>
        </div>
      </section>
    </main>
  );
}
