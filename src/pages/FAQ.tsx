import { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { faqs } from '../data';
import { Link } from 'react-router-dom';

const categories = ['All', 'Buying', 'Investment', 'Booking', 'Documentation', 'Process'];

export default function FAQ() {
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState<number | null>(1);
  const [category, setCategory] = useState('All');

  const filtered = faqs.filter(f =>
    (search === '' || f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className="pt-20 min-h-screen" style={{ background: '#FAF8F3' }}>
      <section className="relative py-20" style={{ background: 'linear-gradient(135deg, #0a3d24, #0F5132)' }}>
        <div className="hero-pattern absolute inset-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <Breadcrumb crumbs={[{ label: 'FAQs' }]} />
          <h1 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mb-8">
            Everything you need to know about working with Altius Group — from property purchase to investment and bookings.
          </p>
          <div className="relative max-w-xl">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-16">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${category === cat ? 'bg-emerald-800 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300'}`}
            >{cat}</button>
          ))}
        </div>

        {/* FAQs */}
        <div className="space-y-3 mb-12">
          {filtered.map(faq => (
            <div key={faq.id} className="card-elevated rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-emerald-50/50 transition-colors"
              >
                <h3 className="font-semibold text-gray-900 pr-4 text-sm leading-snug">{faq.question}</h3>
                {openId === faq.id
                  ? <ChevronUp size={20} className="text-emerald-700 shrink-0" />
                  : <ChevronDown size={20} className="text-gray-400 shrink-0" />
                }
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openId === faq.id ? 'max-h-[400px]' : 'max-h-0'}`}>
                <p className="px-6 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">{faq.answer}</p>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500">No questions found matching your search.</p>
              <button onClick={() => setSearch('')} className="btn-primary mt-4 px-5 py-2 rounded-xl text-sm">Clear Search</button>
            </div>
          )}
        </div>

        {/* Still have questions */}
        <div className="rounded-2xl p-8 text-center" style={{ background: 'linear-gradient(135deg, #0F5132, #1a6b40)' }}>
          <h2 className="font-display text-xl font-bold text-white mb-2">Still Have Questions?</h2>
          <p className="text-emerald-200 text-sm mb-5">Our team is here to help. Reach out directly.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/contact" className="btn-gold px-6 py-3 rounded-xl text-sm font-semibold">Contact Us</Link>
            <a href="https://wa.me/2341234567890" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl text-sm font-semibold border-2 border-white text-white hover:bg-white hover:text-emerald-800 transition-all">
              WhatsApp Us
            </a>
          </div>
        </div>

        {/* Schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": faqs.map(f => ({
            "@type": "Question",
            "name": f.question,
            "acceptedAnswer": { "@type": "Answer", "text": f.answer }
          }))
        })}} />
      </section>
    </main>
  );
}
