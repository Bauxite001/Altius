import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowRight, Share2 } from 'lucide-react';
import logoImg from '../imports/WhatsApp_Image_2026-07-21_at_09.43.42-removebg-preview.png';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-gray-300" style={{ background: '#111' }}>
      {/* Gold top divider */}
      <div className="gold-divider" />

      {/* Newsletter CTA */}
      <div style={{ background: 'linear-gradient(135deg, #0F5132, #0a3d24)' }} className="py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl text-white font-bold">Stay Ahead of the Market</h3>
            <p className="text-emerald-200 mt-1">Get exclusive property listings, market insights & investment tips.</p>
          </div>
          <form className="flex gap-3 w-full md:w-auto" onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 md:w-72 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-amber-400 text-sm"
            />
            <button className="btn-gold px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap flex items-center gap-2">
              Subscribe <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16 pattern-geo">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <img src={logoImg} alt="Altius Group" className="h-16 w-auto object-contain brightness-0 invert mb-4" />
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Nigeria's leading luxury real estate developer. Building wealth through exceptional property development, construction, and investment across Lagos.
            </p>
            <div className="flex gap-3">
              {[
                { label: 'IG', href: '#', title: 'Instagram' },
                { label: 'TW', href: '#', title: 'Twitter/X' },
                { label: 'FB', href: '#', title: 'Facebook' },
                { label: 'LI', href: '#', title: 'LinkedIn' },
                { label: 'YT', href: '#', title: 'YouTube' },
              ].map(({ label, href, title }) => (
                <a
                  key={title}
                  href={href}
                  aria-label={title}
                  title={title}
                  className="w-9 h-9 rounded-full flex items-center justify-center border border-gray-700 text-gray-400 hover:border-amber-500 hover:text-amber-500 transition-colors text-xs font-bold"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-white font-semibold mb-5 text-sm uppercase tracking-widest">Company</h4>
            <ul className="space-y-3">
              {[
                ['About Us', '/about'],
                ['Properties', '/properties'],
                ['Luxury Short Lets', '/short-lets'],
                ['Property Development', '/development'],
                ['Construction', '/construction'],
                ['Investment', '/investment'],
                ['Client Advisory', '/advisory'],
              ].map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className="text-sm text-gray-400 hover:text-amber-400 transition-colors animated-link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display text-white font-semibold mb-5 text-sm uppercase tracking-widest">Resources</h4>
            <ul className="space-y-3">
              {[
                ['Latest News', '/news'],
                ['FAQs', '/faqs'],
                ['Buying Guide', '/advisory#buying'],
                ['Investment FAQs', '/faqs#investment'],
                ['Privacy Policy', '/privacy'],
                ['Terms of Service', '/terms'],
                ['Admin Portal', '/admin/login'],
              ].map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className="text-sm text-gray-400 hover:text-amber-400 transition-colors animated-link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-white font-semibold mb-5 text-sm uppercase tracking-widest">Contact</h4>
            <address className="not-italic space-y-4">
              <div className="flex gap-3">
                <MapPin size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <span className="text-sm text-gray-400">
                  15 Altius Tower, Admiralty Way,<br />
                  Lekki Phase 1, Lagos, Nigeria.
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <Phone size={16} className="text-amber-500 shrink-0" />
                <div className="text-sm text-gray-400">
                  <a href="tel:+2341234567890" className="hover:text-amber-400 transition-colors">+234 123 456 7890</a><br />
                  <a href="tel:+2349012345678" className="hover:text-amber-400 transition-colors">+234 901 234 5678</a>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <Mail size={16} className="text-amber-500 shrink-0" />
                <div className="text-sm text-gray-400">
                  <a href="mailto:info@altiusgroup.ng" className="hover:text-amber-400 transition-colors">info@altiusgroup.ng</a><br />
                  <a href="mailto:invest@altiusgroup.ng" className="hover:text-amber-400 transition-colors">invest@altiusgroup.ng</a>
                </div>
              </div>
              <div className="text-sm text-gray-400">
                <p className="font-medium text-gray-300">Business Hours</p>
                <p>Mon – Fri: 8:00 AM – 6:00 PM</p>
                <p>Sat: 9:00 AM – 4:00 PM</p>
              </div>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © 2026 Altius Group Limited. All rights reserved. RC No: 1234567. REDAN Member.
          </p>
          <div className="flex gap-6 text-xs text-gray-500">
            <Link to="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
            <Link to="/sitemap" className="hover:text-amber-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>

      {/* Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": ["Organization", "RealEstateAgent", "LocalBusiness"],
        "name": "Altius Group",
        "description": "Nigeria's premium real estate developer, property manager, and investment firm based in Lekki, Lagos.",
        "url": "https://altiusgroup.ng",
        "logo": "https://altiusgroup.ng/logo.png",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "15 Altius Tower, Admiralty Way, Lekki Phase 1",
          "addressLocality": "Lagos",
          "addressCountry": "NG",
        },
        "telephone": "+2341234567890",
        "email": "info@altiusgroup.ng",
        "openingHours": ["Mo-Fr 08:00-18:00", "Sa 09:00-16:00"],
        "areaServed": ["Lagos", "Abuja", "Nigeria"],
        "sameAs": [
          "https://instagram.com/altiusgroup",
          "https://linkedin.com/company/altius-group-nigeria",
        ],
      })}} />
    </footer>
  );
}
