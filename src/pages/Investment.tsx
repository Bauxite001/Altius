import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Check, ArrowRight, Calculator, ChevronDown, ChevronUp } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { investmentPlans, faqs } from '../data';

const marketStats = [
  { label: 'Avg. Lekki Appreciation', value: '18–24%', subLabel: 'Annual capital growth (2024–2025)' },
  { label: 'VI Rental Yields', value: '8–12%', subLabel: 'Gross annual rental return' },
  { label: 'Ikoyi Premium Growth', value: '22–30%', subLabel: 'Luxury segment, 2024–2025' },
];

export default function Investment() {
  const [roiAmount, setRoiAmount] = useState(25000000);
  const [roiType, setRoiType] = useState('growth');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const selectedPlan = investmentPlans.find(p => p.id === `inv-${roiType === 'starter' ? '001' : roiType === 'growth' ? '002' : '003'}`);
  const [minROI, maxROI] = (selectedPlan?.expectedROI.split('–').map(s => parseFloat(s)) || [0, 0]);
  const projectedMin = roiAmount * (1 + minROI / 100);
  const projectedMax = roiAmount * (1 + maxROI / 100);

  const investmentFaqs = faqs.filter(f => f.question.toLowerCase().includes('invest') || f.question.toLowerCase().includes('roi') || f.question.toLowerCase().includes('secure'));

  return (
    <main className="pt-20 min-h-screen" style={{ background: '#FAF8F3' }}>
      {/* Header */}
      <section className="relative py-20" style={{ background: 'linear-gradient(135deg, #1E1E1E, #2a2a2a)' }}>
        <div className="hero-pattern absolute inset-0 opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <Breadcrumb crumbs={[{ label: 'Investment' }]} />
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: 40, height: 2, background: '#C8A24D' }} />
            <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Investment</span>
          </div>
          <h1 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4">Real Estate Investment</h1>
          <p className="text-gray-300 text-lg max-w-2xl">
            Build lasting wealth through structured real estate investment plans delivering consistent, above-market returns across Lagos's premier locations.
          </p>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-5">
          <p className="text-gray-700 text-sm leading-relaxed">
            Altius Group offers structured property investment plans from ₦5,000,000, covering land banking, off-plan residential development, and mixed-use commercial portfolios. Based on our 2025 investment report, clients have achieved 15–40% ROI depending on investment type and horizon. All investments include legal documentation, title security, and a dedicated investment manager.
          </p>
        </div>
      </section>

      {/* Market Stats */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {marketStats.map(stat => (
            <div key={stat.label} className="card-elevated rounded-2xl p-6 text-center">
              <p className="font-display text-3xl font-bold text-emerald-800 mb-1">{stat.value}</p>
              <p className="font-semibold text-gray-900 text-sm mb-1">{stat.label}</p>
              <p className="text-xs text-gray-500">{stat.subLabel}</p>
            </div>
          ))}
        </div>

        {/* Investment Plans */}
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl font-bold text-gray-900 mb-3">Investment Plans</h2>
          <p className="text-gray-500">Select the plan that aligns with your investment goals</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {investmentPlans.map(plan => (
            <div
              key={plan.id}
              className={`rounded-2xl p-8 relative overflow-hidden transition-all hover:-translate-y-2 duration-300 ${
                plan.popular
                  ? 'border-2 border-amber-500 shadow-xl'
                  : 'card-elevated border border-gray-100'
              }`}
              style={plan.popular ? { background: 'linear-gradient(135deg, #0F5132, #1a6b40)' } : {}}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 badge-featured rounded-bl-xl rounded-tr-2xl px-3 py-1.5 text-xs">Most Popular</div>
              )}
              <p className={`text-xs uppercase tracking-widest mb-2 ${plan.popular ? 'text-emerald-300' : 'text-gray-400'}`}>{plan.type}</p>
              <h3 className={`font-display text-xl font-bold mb-1 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h3>
              <p className="text-3xl font-bold text-amber-400 mb-1">{plan.expectedROI}</p>
              <p className={`text-sm mb-1 ${plan.popular ? 'text-emerald-200' : 'text-gray-500'}`}>Expected ROI</p>
              <p className={`font-semibold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>From {plan.minInvestment}</p>
              <p className={`text-xs mb-6 ${plan.popular ? 'text-emerald-300' : 'text-gray-400'}`}>{plan.duration} horizon</p>
              <ul className="space-y-2.5 mb-8">
                {plan.features.map(f => (
                  <li key={f} className={`flex items-center gap-2.5 text-sm ${plan.popular ? 'text-emerald-100' : 'text-gray-600'}`}>
                    <Check size={14} className="text-amber-400 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className={`block text-center py-3 rounded-xl font-semibold text-sm ${plan.popular ? 'btn-gold' : 'btn-primary'}`}>
                Start Investing
              </Link>
            </div>
          ))}
        </div>

        {/* ROI Calculator */}
        <div className="card-elevated rounded-2xl p-8 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Calculator size={22} className="text-amber-600" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-gray-900">Investment ROI Calculator</h2>
              <p className="text-gray-500 text-sm">Estimate your potential returns</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Investment Amount (₦)</label>
                <input type="number" value={roiAmount} onChange={e => setRoiAmount(+e.target.value)} step={1000000} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" />
                <input type="range" min={5000000} max={500000000} step={5000000} value={roiAmount} onChange={e => setRoiAmount(+e.target.value)} className="w-full mt-2 accent-emerald-700" />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>₦5M</span><span>₦500M</span>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Investment Plan</label>
                <div className="grid grid-cols-3 gap-2">
                  {['starter', 'growth', 'premier'].map(t => (
                    <button key={t} onClick={() => setRoiType(t)} className={`py-2 rounded-xl text-xs font-semibold capitalize transition-all ${roiType === t ? 'bg-emerald-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="rounded-2xl p-6 flex flex-col justify-center" style={{ background: 'linear-gradient(135deg, #0F5132, #1a6b40)' }}>
              <p className="text-emerald-200 text-sm mb-2">Investment Amount</p>
              <p className="font-display text-2xl font-bold text-white mb-4">₦{roiAmount.toLocaleString()}</p>
              <p className="text-emerald-200 text-sm mb-2">Expected Return Range</p>
              <p className="font-display text-3xl font-bold text-amber-400 mb-1">
                ₦{Math.round(projectedMin).toLocaleString()} – ₦{Math.round(projectedMax).toLocaleString()}
              </p>
              <p className="text-emerald-300 text-xs">Based on {selectedPlan?.expectedROI} ROI over {selectedPlan?.duration}</p>
              <p className="text-emerald-400 text-xs mt-4">*Past performance does not guarantee future results. Source: Altius Group Investment Report 2025.</p>
            </div>
          </div>
        </div>

        {/* Investment FAQs */}
        <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Investment FAQs</h2>
        <div className="space-y-3 mb-12">
          {investmentFaqs.map(faq => (
            <div key={faq.id} className="card-elevated rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <h3 className="font-semibold text-gray-900 text-sm pr-4">{faq.question}</h3>
                {openFaq === faq.id ? <ChevronUp size={18} className="text-emerald-700 shrink-0" /> : <ChevronDown size={18} className="text-gray-400 shrink-0" />}
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openFaq === faq.id ? 'max-h-96' : 'max-h-0'}`}>
                <p className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="rounded-2xl p-10 text-center" style={{ background: 'linear-gradient(135deg, #0a3d24, #0F5132)' }}>
          <h2 className="font-display text-2xl font-bold text-white mb-3">Ready to Start Your Investment Journey?</h2>
          <p className="text-emerald-200 mb-6">Book a free 30-minute consultation with our investment advisory team.</p>
          <Link to="/contact" className="btn-gold px-8 py-3.5 rounded-xl font-semibold text-sm inline-flex items-center gap-2">
            Book Consultation <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
