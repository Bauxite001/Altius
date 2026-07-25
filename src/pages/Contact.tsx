import { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, Send, CheckCircle } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { useToast } from '../components/Toast';

export default function Contact() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '', type: 'general' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast('Your enquiry has been sent! We\'ll respond within 24 hours.', 'success');
    }, 1500);
  };

  return (
    <main className="pt-20 min-h-screen" style={{ background: '#FAF8F3' }}>
      <section className="relative py-20" style={{ background: 'linear-gradient(135deg, #0a3d24, #0F5132)' }}>
        <div className="hero-pattern absolute inset-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <Breadcrumb crumbs={[{ label: 'Contact' }]} />
          <h1 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-emerald-100 text-lg max-w-2xl">
            Our team of property experts is ready to assist you. Reach out today.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-6">
            <address className="not-italic card-elevated rounded-2xl p-6">
              <h2 className="font-display font-bold text-gray-900 mb-5">Office Information</h2>
              <div className="space-y-5">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-emerald-800" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm mb-0.5">Head Office</p>
                    <p className="text-gray-600 text-sm">15 Altius Tower, Admiralty Way,<br />Lekki Phase 1, Lagos, Nigeria.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-emerald-800" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm mb-0.5">Phone</p>
                    <a href="tel:+2341234567890" className="text-emerald-700 text-sm block hover:underline">+234 123 456 7890</a>
                    <a href="tel:+2349012345678" className="text-emerald-700 text-sm block hover:underline">+234 901 234 5678</a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-emerald-800" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm mb-0.5">Email</p>
                    <a href="mailto:info@altiusgroup.ng" className="text-emerald-700 text-sm block hover:underline">info@altiusgroup.ng</a>
                    <a href="mailto:invest@altiusgroup.ng" className="text-emerald-700 text-sm block hover:underline">invest@altiusgroup.ng</a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                    <MessageCircle size={18} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm mb-0.5">WhatsApp</p>
                    <a href="https://wa.me/2341234567890" target="_blank" rel="noopener noreferrer" className="text-green-600 text-sm block hover:underline">+234 123 456 7890</a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm mb-0.5">Business Hours</p>
                    <p className="text-gray-600 text-sm">Mon – Fri: 8:00 AM – 6:00 PM</p>
                    <p className="text-gray-600 text-sm">Saturday: 9:00 AM – 4:00 PM</p>
                    <p className="text-gray-500 text-xs mt-1">Sunday: Closed (emergencies via WhatsApp)</p>
                  </div>
                </div>
              </div>
            </address>

            {/* WhatsApp CTA */}
            <a href="https://wa.me/2341234567890?text=Hello%20Altius%20Group" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl text-white font-semibold transition-all hover:shadow-xl hover:-translate-y-0.5"
              style={{ background: '#25D366' }}
            >
              <MessageCircle size={24} fill="white" />
              <div>
                <p className="text-sm font-bold">Chat on WhatsApp</p>
                <p className="text-xs text-green-100">Instant response during business hours</p>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="card-elevated rounded-2xl p-8">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={40} className="text-green-600" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
                  <p className="text-gray-600 mb-6">Thank you for reaching out. Our team will respond within 24 business hours.</p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '', type: 'general' }); }} className="btn-primary px-6 py-3 rounded-xl text-sm">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl font-bold text-gray-900 mb-2">Send Us a Message</h2>
                  <p className="text-gray-500 text-sm mb-6">Fill out the form below and a member of our team will be in touch shortly.</p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Enquiry Type */}
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Enquiry Type</label>
                      <div className="flex flex-wrap gap-2">
                        {['General', 'Property Purchase', 'Short Let Booking', 'Investment', 'Construction', 'Advisory'].map(t => (
                          <button key={t} type="button" onClick={() => setForm(f => ({ ...f, type: t.toLowerCase() }))}
                            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${form.type === t.toLowerCase() ? 'bg-emerald-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                          >{t}</button>
                        ))}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Full Name *</label>
                        <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Adebayo Okonkwo" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email Address *</label>
                        <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="your@email.com" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Phone Number</label>
                        <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="+234 xxx xxx xxxx" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 mb-1.5 block">Subject *</label>
                        <input required value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} placeholder="Brief subject of your enquiry" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1.5 block">Message *</label>
                      <textarea required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={5} placeholder="Tell us about your property needs, budget, preferred location, timeline..." className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm bg-gray-50 resize-none" />
                    </div>
                    <button type="submit" disabled={loading} className="w-full btn-primary py-4 rounded-xl font-semibold flex items-center justify-center gap-2 disabled:opacity-70">
                      {loading ? (
                        <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                      ) : (
                        <><Send size={16} /> Send Message</>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-10 card-elevated rounded-2xl overflow-hidden h-72 flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #e8f5ee, #f0faf4)' }}>
          <div className="text-center">
            <MapPin size={48} className="text-emerald-700 mx-auto mb-3" />
            <p className="font-display font-bold text-emerald-800 text-lg">Altius Tower, Lekki Phase 1</p>
            <p className="text-gray-500 text-sm">15 Admiralty Way, Lekki, Lagos</p>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn-primary mt-4 px-5 py-2 rounded-xl text-sm inline-block">Open in Google Maps</a>
          </div>
        </div>
      </section>
    </main>
  );
}
