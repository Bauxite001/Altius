import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Check, CreditCard, Smartphone, Building, Apple, ArrowRight, ArrowLeft, Calendar, User, Home, CheckCircle, Download } from 'lucide-react';
import { properties } from '../data';
import { useToast } from '../components/Toast';

const steps = ['Select Dates', 'Guest Details', 'Review', 'Payment', 'Confirmation'];

export default function Booking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const propertyId = searchParams.get('property');
  const bookingType = searchParams.get('type') || 'shortlet';
  const property = properties.find(p => p.id === propertyId) || properties[0];

  const [step, setStep] = useState(0);
  const [checkIn, setCheckIn] = useState(searchParams.get('checkin') || '');
  const [checkOut, setCheckOut] = useState(searchParams.get('checkout') || '');
  const [guests, setGuests] = useState(parseInt(searchParams.get('guests') || '2'));
  const [guestDetails, setGuestDetails] = useState({ firstName: '', lastName: '', email: '', phone: '', id: '' });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'ussd' | 'apple' | 'google'>('card');
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [processing, setProcessing] = useState(false);
  const [bookingRef] = useState(`ALT-${Date.now().toString(36).toUpperCase()}`);

  const nights = () => {
    if (!checkIn || !checkOut) return 0;
    return Math.max(0, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000));
  };

  const subtotal = nights() * (property.dailyRate || 150000);
  const serviceFee = Math.round(subtotal * 0.05);
  const total = subtotal + serviceFee;

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setStep(4);
      showToast('🎉 Booking confirmed! Check your email for details.', 'success');
    }, 2500);
  };

  return (
    <main className="pt-20 min-h-screen" style={{ background: '#FAF8F3' }}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Progress */}
        {step < 4 && (
          <div className="mb-10">
            <div className="flex items-center justify-between">
              {steps.map((s, i) => (
                <div key={s} className="flex-1 flex items-center">
                  <div className="flex flex-col items-center">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${i < step ? 'bg-emerald-800 text-white' : i === step ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-400'}`}>
                      {i < step ? <Check size={16} /> : i + 1}
                    </div>
                    <span className={`text-xs mt-1 hidden sm:block ${i === step ? 'text-amber-600 font-semibold' : 'text-gray-400'}`}>{s}</span>
                  </div>
                  {i < steps.length - 1 && <div className={`flex-1 h-0.5 mx-2 ${i < step ? 'bg-emerald-800' : 'bg-gray-200'}`} />}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className={`grid ${step < 4 ? 'lg:grid-cols-3' : ''} gap-8`}>
          {/* Main */}
          <div className={step < 4 ? 'lg:col-span-2' : 'col-span-full'}>
            {/* Step 0: Dates */}
            {step === 0 && (
              <div className="card-elevated rounded-2xl p-8">
                <h1 className="font-display text-2xl font-bold text-gray-900 mb-6">
                  {bookingType === 'inspection' ? 'Schedule Inspection' : 'Book Your Stay'}
                </h1>
                <div className="space-y-5">
                  <div>
                    <p className="font-semibold text-gray-800 mb-3">{property.title}</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block"><Calendar size={14} className="inline mr-1" />{bookingType === 'inspection' ? 'Inspection Date' : 'Check-in Date'}</label>
                      <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} min={new Date().toISOString().split('T')[0]} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50" required />
                    </div>
                    {bookingType !== 'inspection' && (
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block"><Calendar size={14} className="inline mr-1" />Check-out Date</label>
                        <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} min={checkIn} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50" required />
                      </div>
                    )}
                  </div>
                  {bookingType !== 'inspection' && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block"><User size={14} className="inline mr-1" />Number of Guests</label>
                      <select value={guests} onChange={e => setGuests(+e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50">
                        {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                      </select>
                    </div>
                  )}
                  {nights() > 0 && (
                    <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                      <p className="text-emerald-800 font-semibold text-sm">{nights()} night{nights() > 1 ? 's' : ''} selected</p>
                    </div>
                  )}
                  <button onClick={() => { if (!checkIn || (bookingType !== 'inspection' && !checkOut)) { showToast('Please select your dates', 'error'); return; } setStep(1); }} className="w-full btn-primary py-4 rounded-xl font-semibold flex items-center justify-center gap-2">
                    Continue <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 1: Guest Details */}
            {step === 1 && (
              <div className="card-elevated rounded-2xl p-8">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Guest Details</h2>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">First Name *</label>
                      <input value={guestDetails.firstName} onChange={e => setGuestDetails(d => ({ ...d, firstName: e.target.value }))} placeholder="Adebayo" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Last Name *</label>
                      <input value={guestDetails.lastName} onChange={e => setGuestDetails(d => ({ ...d, lastName: e.target.value }))} placeholder="Okonkwo" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email Address *</label>
                    <input type="email" value={guestDetails.email} onChange={e => setGuestDetails(d => ({ ...d, email: e.target.value }))} placeholder="your@email.com" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">Phone Number *</label>
                    <input type="tel" value={guestDetails.phone} onChange={e => setGuestDetails(d => ({ ...d, phone: e.target.value }))} placeholder="+234 xxx xxx xxxx" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">National ID / Passport Number *</label>
                    <input value={guestDetails.id} onChange={e => setGuestDetails(d => ({ ...d, id: e.target.value }))} placeholder="For verification purposes" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50" />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setStep(0)} className="btn-outline px-6 py-3 rounded-xl text-sm flex items-center gap-2"><ArrowLeft size={16} /> Back</button>
                    <button onClick={() => { if (!guestDetails.firstName || !guestDetails.email || !guestDetails.phone) { showToast('Please fill all required fields', 'error'); return; } setStep(2); }} className="flex-1 btn-primary py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                      Review Booking <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <div className="card-elevated rounded-2xl p-8">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Review Your Booking</h2>
                <div className="space-y-4">
                  <div className="flex gap-4 p-4 rounded-xl bg-gray-50">
                    <img src={property.image} alt={property.title} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{property.title}</h3>
                      <p className="text-gray-500 text-sm">{property.location}</p>
                      <p className="text-emerald-700 font-semibold text-sm mt-1">{property.priceLabel}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-emerald-50">
                      <p className="text-xs text-gray-500 mb-0.5">Check-in</p>
                      <p className="font-semibold text-gray-900 text-sm">{checkIn}</p>
                    </div>
                    {bookingType !== 'inspection' && (
                      <div className="p-4 rounded-xl bg-emerald-50">
                        <p className="text-xs text-gray-500 mb-0.5">Check-out</p>
                        <p className="font-semibold text-gray-900 text-sm">{checkOut}</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4 rounded-xl border border-gray-100">
                    <p className="font-semibold text-gray-800 mb-2 text-sm">Guest</p>
                    <p className="text-gray-600 text-sm">{guestDetails.firstName} {guestDetails.lastName}</p>
                    <p className="text-gray-500 text-xs">{guestDetails.email} · {guestDetails.phone}</p>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setStep(1)} className="btn-outline px-6 py-3 rounded-xl text-sm flex items-center gap-2"><ArrowLeft size={16} /> Back</button>
                    <button onClick={() => setStep(3)} className="flex-1 btn-primary py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                      Proceed to Payment <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="card-elevated rounded-2xl p-8">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Payment</h2>

                {/* Payment methods */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
                  {[
                    { id: 'card', Icon: CreditCard, label: 'Card' },
                    { id: 'transfer', Icon: Building, label: 'Transfer' },
                    { id: 'ussd', Icon: Smartphone, label: 'USSD' },
                    { id: 'apple', Icon: Apple, label: 'Apple Pay' },
                    { id: 'google', Icon: Smartphone, label: 'Google Pay' },
                  ].map(({ id, Icon, label }) => (
                    <button key={id} onClick={() => setPaymentMethod(id as any)}
                      className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 transition-all text-xs font-semibold ${paymentMethod === id ? 'border-emerald-700 bg-emerald-50 text-emerald-800' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
                    >
                      <Icon size={20} /> {label}
                    </button>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Card Number</label>
                      <input value={cardDetails.number} onChange={e => setCardDetails(d => ({ ...d, number: e.target.value }))} placeholder="5399 9999 9999 9999" maxLength={19} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-mono bg-gray-50" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Cardholder Name</label>
                      <input value={cardDetails.name} onChange={e => setCardDetails(d => ({ ...d, name: e.target.value }))} placeholder="Name on card" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Expiry Date</label>
                        <input value={cardDetails.expiry} onChange={e => setCardDetails(d => ({ ...d, expiry: e.target.value }))} placeholder="MM/YY" maxLength={5} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">CVV</label>
                        <input type="password" value={cardDetails.cvv} onChange={e => setCardDetails(d => ({ ...d, cvv: e.target.value }))} placeholder="•••" maxLength={3} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50" />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'transfer' && (
                  <div className="p-5 rounded-xl bg-blue-50 border border-blue-100 mb-6">
                    <p className="font-semibold text-gray-900 mb-3 text-sm">Bank Transfer Details</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500">Bank</span><span className="font-semibold">FirstBank Nigeria</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Account Name</span><span className="font-semibold">Altius Group Limited</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Account Number</span><span className="font-semibold font-mono">0123456789</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Reference</span><span className="font-semibold text-emerald-800">{bookingRef}</span></div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'ussd' && (
                  <div className="p-5 rounded-xl bg-purple-50 border border-purple-100 mb-6 text-center">
                    <p className="font-display text-3xl font-bold text-purple-800 mb-2">*770*{total}#</p>
                    <p className="text-sm text-purple-600">Dial this USSD code on your phone to complete payment</p>
                    <p className="text-xs text-gray-500 mt-2">Works with all major Nigerian networks</p>
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="btn-outline px-6 py-3 rounded-xl text-sm flex items-center gap-2"><ArrowLeft size={16} /> Back</button>
                  <button onClick={handlePayment} disabled={processing} className="flex-1 btn-primary py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-70">
                    {processing ? (
                      <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Processing...</>
                    ) : (
                      <>Pay ₦{total.toLocaleString()} <ArrowRight size={16} /></>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-400 text-center mt-3 flex items-center justify-center gap-1">🔒 Secured by 256-bit SSL encryption</p>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <div className="card-elevated rounded-2xl p-10 text-center max-w-2xl mx-auto">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5" style={{ animation: 'countUp 0.5s ease' }}>
                  <CheckCircle size={44} className="text-green-600" />
                </div>
                <h1 className="font-display text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
                <p className="text-gray-500 mb-8">Your booking has been confirmed. Details sent to {guestDetails.email || 'your email'}.</p>

                <div className="text-left p-6 rounded-2xl mb-6" style={{ background: '#FAF8F3', border: '1px solid rgba(200,162,77,0.2)' }}>
                  <div className="flex justify-between mb-1"><span className="text-gray-500 text-sm">Booking ID</span><span className="font-mono font-bold text-emerald-800">{bookingRef}</span></div>
                  <div className="flex justify-between mb-1"><span className="text-gray-500 text-sm">Property</span><span className="font-semibold text-gray-900 text-sm">{property.title}</span></div>
                  <div className="flex justify-between mb-1"><span className="text-gray-500 text-sm">Guest</span><span className="font-semibold text-gray-900 text-sm">{guestDetails.firstName} {guestDetails.lastName}</span></div>
                  {checkIn && <div className="flex justify-between mb-1"><span className="text-gray-500 text-sm">Check-in</span><span className="font-semibold text-gray-900 text-sm">{checkIn}</span></div>}
                  {checkOut && <div className="flex justify-between mb-1"><span className="text-gray-500 text-sm">Check-out</span><span className="font-semibold text-gray-900 text-sm">{checkOut}</span></div>}
                  <div className="flex justify-between pt-3 mt-2 border-t border-amber-100"><span className="font-semibold text-gray-800">Amount Paid</span><span className="font-bold text-emerald-800 text-lg">₦{total.toLocaleString()}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500 text-xs">Payment Status</span><span className="text-xs font-bold text-green-600">✓ CONFIRMED</span></div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 justify-center">
                    <Download size={16} /> Download Receipt
                  </button>
                  <a href="https://wa.me/2341234567890" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-xl text-sm font-semibold border-2 border-green-500 text-green-700 hover:bg-green-500 hover:text-white transition-all flex items-center gap-2 justify-center">
                    WhatsApp Confirmation
                  </a>
                  <button onClick={() => navigate('/dashboard')} className="btn-outline px-6 py-3 rounded-xl text-sm">View Dashboard</button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Summary */}
          {step < 4 && (
            <div className="card-elevated rounded-2xl p-6 self-start sticky top-28">
              <h3 className="font-display font-bold text-gray-900 mb-4">Booking Summary</h3>
              <div className="img-zoom rounded-xl overflow-hidden h-36 mb-4">
                <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">{property.title}</h4>
              <p className="text-gray-500 text-xs mb-4">{property.location}</p>
              {nights() > 0 && (
                <>
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex justify-between text-gray-600">
                      <span>₦{(property.dailyRate || 0).toLocaleString()} × {nights()} nights</span>
                      <span>₦{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Service fee (5%)</span>
                      <span>₦{serviceFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between font-bold pt-2 border-t border-gray-100 text-gray-900">
                      <span>Total</span>
                      <span className="text-emerald-800">₦{total.toLocaleString()}</span>
                    </div>
                  </div>
                </>
              )}
              <div className="space-y-2 mt-4">
                {['Free cancellation (48hr)', 'Instant confirmation', 'Secure payment'].map(item => (
                  <div key={item} className="flex items-center gap-2 text-xs text-gray-500">
                    <Check size={12} className="text-emerald-600" />{item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
