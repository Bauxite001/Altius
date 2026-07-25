import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, Heart, Share2, Phone, MessageCircle,
  Bed, Bath, Maximize2, MapPin, Check, Calendar, X, ZoomIn,
  Building2, Wifi, Car, Waves, Dumbbell, Shield
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { properties } from '../data';
import { useToast } from '../components/Toast';

const amenityIcons: Record<string, React.ElementType> = {
  'WiFi': Wifi, 'Pool': Waves, 'Swimming Pool': Waves, 'Private Pool': Waves,
  'Gym': Dumbbell, 'Security': Shield, '24hr Security': Shield,
  'Parking': Car, 'Generator': Building2,
};

export default function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const property = properties.find(p => p.id === id);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [mortgageAmount, setMortgageAmount] = useState(property?.price ? Math.round(property.price * 0.7) : 50000000);
  const [mortgageYears, setMortgageYears] = useState(15);
  const [mortgageRate, setMortgageRate] = useState(18);

  if (!property) {
    return (
      <main className="pt-32 text-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800">Property not found</h1>
        <Link to="/properties" className="btn-primary mt-4 inline-block px-6 py-3 rounded-xl">Back to Listings</Link>
      </main>
    );
  }

  const monthlyPayment = () => {
    const r = mortgageRate / 100 / 12;
    const n = mortgageYears * 12;
    const m = mortgageAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return isNaN(m) || !isFinite(m) ? 0 : Math.round(m);
  };

  const related = properties.filter(p => p.id !== property.id && p.area === property.area).slice(0, 3);

  return (
    <main className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <Breadcrumb crumbs={[{ label: 'Properties', path: '/properties' }, { label: property.title }]} />
      </div>

      {/* Gallery */}
      <section className="max-w-7xl mx-auto px-6 mb-8">
        <div className="grid grid-cols-4 grid-rows-2 gap-3 h-[500px] rounded-2xl overflow-hidden">
          <div className="col-span-3 row-span-2 relative img-zoom cursor-pointer group" onClick={() => setLightboxOpen(true)}>
            <img src={property.images[galleryIdx]} alt={property.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            <button className="absolute top-4 right-4 glass px-3 py-2 rounded-xl flex items-center gap-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              <ZoomIn size={16} /> Full Screen
            </button>
          </div>
          {property.images.slice(1, 3).map((img, i) => (
            <div key={i} className="img-zoom cursor-pointer" onClick={() => { setGalleryIdx(i + 1); setLightboxOpen(true); }}>
              <img src={img} alt={`${property.title} view ${i + 2}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center" onClick={() => setLightboxOpen(false)}>
          <button className="absolute top-4 right-4 text-white hover:text-gray-300 p-2" onClick={() => setLightboxOpen(false)}><X size={28} /></button>
          <button className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 glass-dark rounded-full flex items-center justify-center text-white" onClick={e => { e.stopPropagation(); setGalleryIdx(i => (i - 1 + property.images.length) % property.images.length); }}>
            <ChevronLeft size={24} />
          </button>
          <img src={property.images[galleryIdx]} alt={property.title} className="max-h-[85vh] max-w-[85vw] object-contain rounded-xl" onClick={e => e.stopPropagation()} />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 glass-dark rounded-full flex items-center justify-center text-white" onClick={e => { e.stopPropagation(); setGalleryIdx(i => (i + 1) % property.images.length); }}>
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-4 flex gap-2">
            {property.images.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setGalleryIdx(i); }} className={`w-2 h-2 rounded-full transition-all ${i === galleryIdx ? 'bg-amber-400 w-6' : 'bg-white/40'}`} />
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-8 pb-16">
        {/* Main */}
        <div className="lg:col-span-2 space-y-8">
          {/* Title block */}
          <div className="card-elevated rounded-2xl p-7">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex gap-2 mb-3 flex-wrap">
                  {property.featured && <span className="badge-featured">Featured</span>}
                  {property.luxury && <span className="badge-luxury">Luxury</span>}
                  {property.isNew && <span className="badge-new">New</span>}
                </div>
                <h1 className="font-display text-2xl lg:text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                <div className="flex items-center gap-2 text-gray-500">
                  <MapPin size={16} className="text-amber-500" />
                  <span>{property.location}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-display text-3xl font-bold text-emerald-800">{property.priceLabel}</p>
                {property.shortLet && <p className="text-sm text-gray-500 mt-1">or ₦{property.dailyRate?.toLocaleString()}/night</p>}
              </div>
            </div>

            <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-2"><Bed size={18} className="text-emerald-700" /><span className="font-semibold">{property.bedrooms}</span><span className="text-gray-500 text-sm">Bedrooms</span></div>
              <div className="flex items-center gap-2"><Bath size={18} className="text-emerald-700" /><span className="font-semibold">{property.bathrooms}</span><span className="text-gray-500 text-sm">Bathrooms</span></div>
              <div className="flex items-center gap-2"><Maximize2 size={18} className="text-emerald-700" /><span className="font-semibold">{property.sqft.toLocaleString()}</span><span className="text-gray-500 text-sm">sqft</span></div>
              <div className="flex items-center gap-2"><Building2 size={18} className="text-emerald-700" /><span className="font-semibold capitalize">{property.type}</span><span className="text-gray-500 text-sm">Type</span></div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={() => { setLiked(!liked); showToast(liked ? 'Removed from saved properties' : 'Saved to your list!'); }} className="p-2.5 rounded-xl border border-gray-200 hover:border-red-200 transition-colors">
                <Heart size={20} className={liked ? 'fill-red-500 text-red-500' : 'text-gray-400'} />
              </button>
              <button onClick={() => { navigator.clipboard?.writeText(window.location.href); showToast('Property link copied!'); }} className="p-2.5 rounded-xl border border-gray-200 hover:border-emerald-200 transition-colors">
                <Share2 size={20} className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="card-elevated rounded-2xl p-7">
            <h2 className="font-display text-xl font-bold text-gray-900 mb-4">About This Property</h2>
            <p className="text-gray-600 leading-relaxed">{property.description}</p>
            <p className="text-gray-600 leading-relaxed mt-4">
              This exceptional property offers world-class finishes throughout, with premium imported fittings, high-end kitchen appliances, and smart home automation systems. The property benefits from 24-hour security, reliable power supply with generator backup, and dedicated parking.
            </p>
          </div>

          {/* Amenities */}
          <div className="card-elevated rounded-2xl p-7">
            <h2 className="font-display text-xl font-bold text-gray-900 mb-5">Amenities & Features</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities.map(a => (
                <div key={a} className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50">
                  <Check size={16} className="text-emerald-700 shrink-0" />
                  <span className="text-sm text-gray-700">{a}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="card-elevated rounded-2xl p-7">
            <h2 className="font-display text-xl font-bold text-gray-900 mb-5">Location & Nearby</h2>
            <div className="rounded-xl overflow-hidden h-64 bg-gray-200 mb-5">
              <div className="w-full h-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #e8f5ee, #f0faf4)' }}>
                <div className="text-center">
                  <MapPin size={40} className="text-emerald-700 mx-auto mb-2" />
                  <p className="text-emerald-800 font-semibold">{property.location}</p>
                  <p className="text-gray-500 text-sm">Interactive map available on full site</p>
                </div>
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: 'Nearby Schools', items: ['Corona Secondary, 0.8km', 'LEKKI British Intl, 1.2km'] },
                { label: 'Hospitals', items: ['Reddington Hospital, 1.5km', 'St. Nicholas, 2km'] },
                { label: 'Shopping', items: ['Lekki Mall, 0.9km', 'Palms Shopping, 2.1km'] },
              ].map(cat => (
                <div key={cat.label}>
                  <h3 className="font-semibold text-gray-800 text-sm mb-2">{cat.label}</h3>
                  {cat.items.map(item => <p key={item} className="text-xs text-gray-500 mb-1">📍 {item}</p>)}
                </div>
              ))}
            </div>
          </div>

          {/* Mortgage Calculator */}
          <div className="card-elevated rounded-2xl p-7">
            <h2 className="font-display text-xl font-bold text-gray-900 mb-5">Mortgage Calculator</h2>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Loan Amount (₦)</label>
                <input type="number" value={mortgageAmount} onChange={e => setMortgageAmount(+e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Loan Term (years)</label>
                <input type="number" value={mortgageYears} onChange={e => setMortgageYears(+e.target.value)} min={1} max={30} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm" />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">Interest Rate (%)</label>
                <input type="number" value={mortgageRate} onChange={e => setMortgageRate(+e.target.value)} min={1} max={30} step={0.5} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm" />
              </div>
            </div>
            <div className="p-5 rounded-xl text-center" style={{ background: 'linear-gradient(135deg, #0F5132, #1a6b40)' }}>
              <p className="text-emerald-200 text-sm mb-1">Estimated Monthly Payment</p>
              <p className="font-display text-3xl font-bold text-white">₦{monthlyPayment().toLocaleString()}</p>
              <p className="text-emerald-300 text-xs mt-1">*Indicative only. Contact us for bank mortgage facilitation.</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5 lg:sticky lg:top-28 self-start">
          {/* Book CTA */}
          <div className="card-elevated rounded-2xl p-6">
            <h3 className="font-display font-bold text-gray-900 mb-4">Interested in This Property?</h3>
            <div className="space-y-3">
              <Link to={`/booking?property=${property.id}&type=inspection`} className="w-full btn-primary py-3.5 rounded-xl text-sm font-semibold text-center block">
                <Calendar size={16} className="inline mr-2" /> Schedule Inspection
              </Link>
              {property.shortLet && (
                <Link to={`/booking?property=${property.id}&type=shortlet`} className="w-full btn-gold py-3.5 rounded-xl text-sm font-semibold text-center block">
                  🛎 Book Short Let
                </Link>
              )}
              <a href="https://wa.me/2341234567890" target="_blank" rel="noopener noreferrer" className="w-full py-3.5 rounded-xl text-sm font-semibold text-center flex items-center justify-center gap-2 border-2 border-green-500 text-green-700 hover:bg-green-500 hover:text-white transition-all">
                <MessageCircle size={16} /> WhatsApp Agent
              </a>
              <a href="tel:+2341234567890" className="w-full py-3 rounded-xl text-sm font-semibold text-center flex items-center justify-center gap-2 text-gray-600 hover:text-emerald-800 transition-colors">
                <Phone size={16} /> +234 123 456 7890
              </a>
            </div>
          </div>

          {/* Price breakdown */}
          {property.shortLet && (
            <div className="card-elevated rounded-2xl p-6">
              <h3 className="font-display font-bold text-gray-900 mb-4">Short Let Rates</h3>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">Daily Rate</span>
                  <span className="font-semibold text-emerald-800">₦{property.dailyRate?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 text-sm">Weekly Rate</span>
                  <span className="font-semibold text-emerald-800">₦{property.weeklyRate?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-600 text-sm">Monthly Rate</span>
                  <span className="font-semibold text-emerald-800">₦{property.monthlyRate?.toLocaleString()}</span>
                </div>
              </div>
              <Link to={`/booking?property=${property.id}`} className="w-full btn-gold mt-4 py-3 rounded-xl text-sm text-center block">
                Book Now
              </Link>
            </div>
          )}

          {/* Agent Card */}
          <div className="card-elevated rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format" alt="Property agent" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="font-semibold text-gray-900 text-sm">Chukwuemeka Obi</p>
                <p className="text-xs text-gray-500">Senior Property Consultant</p>
                <div className="flex gap-0.5 mt-0.5">
                  {Array.from({ length: 5 }).map((_, i) => <span key={i} className="text-amber-400 text-xs">★</span>)}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mb-3">Specializes in Ikoyi & Lekki properties. 8 years experience.</p>
            <a href="tel:+2341234567890" className="w-full btn-primary py-2.5 rounded-xl text-sm text-center block">Contact Agent</a>
          </div>
        </div>
      </div>

      {/* Related Properties */}
      {related.length > 0 && (
        <section className="py-12" style={{ background: '#FAF8F3' }}>
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Similar Properties in {property.area}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map(p => <PropertyCard key={p.id} property={p} />)}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
