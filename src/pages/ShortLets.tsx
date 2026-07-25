import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Wifi, Waves, Dumbbell, Check, Star, Calendar, ArrowRight } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { shortLetProperties } from '../data';

export default function ShortLets() {
  const [selectedProperty, setSelectedProperty] = useState(shortLetProperties[0]);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [stayType, setStayType] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const totalNights = () => {
    if (!checkIn || !checkOut) return 0;
    const diff = (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24);
    return Math.max(0, Math.round(diff));
  };

  const totalCost = () => {
    const nights = totalNights();
    if (!nights) return 0;
    const rate = stayType === 'monthly' ? selectedProperty.monthlyRate : stayType === 'weekly' ? selectedProperty.weeklyRate : selectedProperty.dailyRate;
    if (stayType === 'monthly') return rate || 0;
    if (stayType === 'weekly') return Math.ceil(nights / 7) * (rate || 0);
    return nights * (rate || 0);
  };

  return (
    <main className="pt-20 min-h-screen" style={{ background: '#FAF8F3' }}>
      {/* Header */}
      <section className="relative py-20" style={{ background: 'linear-gradient(135deg, #0a3d24, #0F5132)' }}>
        <div className="hero-pattern absolute inset-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <Breadcrumb crumbs={[{ label: 'Luxury Short Lets' }]} />
          <h1 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4">Luxury Short Lets</h1>
          <p className="text-emerald-100 text-lg max-w-2xl">
            Premium furnished apartments for discerning guests in Lagos's finest neighborhoods. Hotel amenities, home comfort.
          </p>
        </div>
      </section>

      {/* Quick Answer */}
      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="bg-emerald-50 border-l-4 border-emerald-700 rounded-r-xl p-5 mb-8">
          <p className="text-gray-700 text-sm leading-relaxed">
            Altius Group manages a curated portfolio of fully-furnished luxury apartments available for short-term rental in Ikoyi, Victoria Island, and Lekki Phase 1. All apartments include WiFi, air conditioning, generator backup, daily housekeeping (on request), swimming pool access, and 24-hour security. Rates start from ₦80,000 per night. Instant booking available with secure online payment.
          </p>
        </div>
      </section>

      {/* Properties Grid + Booking */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Listings */}
          <div className="lg:col-span-2 space-y-6">
            {shortLetProperties.map(property => (
              <div
                key={property.id}
                className={`card-elevated rounded-2xl overflow-hidden cursor-pointer transition-all ${selectedProperty.id === property.id ? 'ring-2 ring-emerald-700' : ''}`}
                onClick={() => setSelectedProperty(property)}
              >
                <div className="grid md:grid-cols-5">
                  <div className="md:col-span-2 img-zoom h-64 md:h-full">
                    <img src={property.image} alt={property.title} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="md:col-span-3 p-6">
                    <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
                      <div>
                        <div className="flex gap-2 mb-2">
                          {property.luxury && <span className="badge-luxury">Luxury</span>}
                          <span className="badge-available">Available</span>
                        </div>
                        <h2 className="font-display text-xl font-bold text-gray-900">{property.title}</h2>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 mb-3"><MapPin size={14} className="text-amber-500" /><span className="text-sm text-gray-500">{property.location}</span></div>
                    <div className="flex gap-4 mb-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1"><Bed size={14} />{property.bedrooms} Beds</span>
                      <span className="flex items-center gap-1"><Bath size={14} />{property.bathrooms} Baths</span>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={12} fill="#C8A24D" color="#C8A24D" />)}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {property.amenities.slice(0, 4).map(a => (
                        <span key={a} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full">{a}</span>
                      ))}
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      <div className="text-center p-2.5 rounded-xl bg-amber-50 border border-amber-100">
                        <p className="text-xs text-gray-500 mb-0.5">Daily</p>
                        <p className="font-bold text-amber-700 text-sm">₦{property.dailyRate?.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                        <p className="text-xs text-gray-500 mb-0.5">Weekly</p>
                        <p className="font-bold text-emerald-700 text-sm">₦{property.weeklyRate?.toLocaleString()}</p>
                      </div>
                      <div className="text-center p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                        <p className="text-xs text-gray-500 mb-0.5">Monthly</p>
                        <p className="font-bold text-emerald-700 text-sm">₦{(property.monthlyRate || 0) >= 1000000 ? `${((property.monthlyRate || 0)/1000000).toFixed(1)}M` : `${property.monthlyRate?.toLocaleString()}`}</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Link to={`/properties/${property.id}`} className="btn-outline flex-1 py-2.5 rounded-xl text-sm text-center">View Details</Link>
                      <Link to={`/booking?property=${property.id}`} className="btn-primary flex-1 py-2.5 rounded-xl text-sm text-center">Book Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Booking Widget */}
          <div className="lg:sticky lg:top-28 self-start">
            <div className="card-elevated rounded-2xl p-6">
              <h3 className="font-display font-bold text-gray-900 mb-1">{selectedProperty.title}</h3>
              <p className="text-sm text-gray-500 mb-5">Complete your booking below</p>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Stay Type</label>
                  <div className="grid grid-cols-3 gap-1 p-1 rounded-xl border border-gray-200 bg-gray-50">
                    {(['daily', 'weekly', 'monthly'] as const).map(t => (
                      <button key={t} onClick={() => setStayType(t)} className={`py-2 rounded-lg text-xs font-semibold transition-all capitalize ${stayType === t ? 'bg-emerald-800 text-white shadow-sm' : 'text-gray-500'}`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Check-in</label>
                  <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Check-out</label>
                  <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} min={checkIn || new Date().toISOString().split('T')[0]} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm" />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Guests</label>
                  <select value={guests} onChange={e => setGuests(+e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm">
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                  </select>
                </div>

                {totalNights() > 0 && (
                  <div className="p-4 rounded-xl" style={{ background: '#FAF8F3', border: '1px solid rgba(200,162,77,0.3)' }}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">{totalNights()} night{totalNights() > 1 ? 's' : ''}</span>
                      <span>₦{totalCost().toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Service fee (5%)</span>
                      <span>₦{Math.round(totalCost() * 0.05).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 border-t border-amber-200">
                      <span>Total</span>
                      <span className="text-emerald-800">₦{Math.round(totalCost() * 1.05).toLocaleString()}</span>
                    </div>
                  </div>
                )}

                <Link
                  to={`/booking?property=${selectedProperty.id}&checkin=${checkIn}&checkout=${checkOut}&guests=${guests}`}
                  className="w-full btn-primary py-3.5 rounded-xl text-sm font-semibold text-center block"
                >
                  <Calendar size={16} className="inline mr-2" />
                  {totalNights() > 0 ? 'Proceed to Book' : 'Check Availability'}
                </Link>
              </div>

              <div className="mt-5 space-y-2">
                {['Free cancellation up to 48 hours', 'Instant confirmation', 'Secure payment'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-xs text-gray-500">
                    <Check size={13} className="text-emerald-600" />{item}
                  </div>
                ))}
              </div>
            </div>

            {/* House Rules */}
            <div className="card-elevated rounded-2xl p-6 mt-5">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">House Rules</h3>
              <ul className="space-y-2 text-xs text-gray-600">
                <li>✓ Check-in from 2:00 PM</li>
                <li>✓ Check-out by 12:00 PM</li>
                <li>✓ No smoking indoors</li>
                <li>✓ Pets by arrangement only</li>
                <li>✓ No parties or events without prior approval</li>
                <li>✓ Quiet hours: 10 PM – 7 AM</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
