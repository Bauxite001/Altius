import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, MessageCircle } from 'lucide-react';
import logoImg from '../imports/WhatsApp_Image_2026-07-21_at_09.43.42-removebg-preview.png';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  {
    label: 'Properties',
    path: '/properties',
    children: [
      { label: 'All Properties', path: '/properties' },
      { label: 'Luxury Short Lets', path: '/short-lets' },
      { label: 'Featured Listings', path: '/properties?filter=featured' },
      { label: 'Off-Plan Projects', path: '/properties?filter=offplan' },
    ],
  },
  {
    label: 'Services',
    path: '#',
    children: [
      { label: 'Property Development', path: '/development' },
      { label: 'Construction', path: '/construction' },
      { label: 'Investment', path: '/investment' },
      { label: 'Client Advisory', path: '/advisory' },
    ],
  },
  { label: 'News', path: '/news' },
  { label: 'FAQs', path: '/faqs' },
  { label: 'Contact', path: '/contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';
  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  if (isAdminPage) return null;

  const navBg = isHomePage && !scrolled
    ? 'bg-transparent'
    : 'bg-white shadow-md';

  const textColor = isHomePage && !scrolled ? 'text-white' : 'text-gray-800';
  const logoFilter = isHomePage && !scrolled ? 'brightness(0) invert(1)' : 'none';

  return (
    <>
      {/* Scroll Progress Bar */}
      <div id="scroll-progress" style={{ width: '0%' }} />

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${navBg}`}
        style={{ transition: 'background 0.4s ease, box-shadow 0.4s ease' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img
                src={logoImg}
                alt="Altius Group — Developing Spaces, Building Value, Delivering Trust"
                className="h-14 w-auto object-contain"
                style={{ filter: logoFilter, transition: 'filter 0.4s ease' }}
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map(item => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.children ? (
                    <button
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${textColor} hover:bg-white/10`}
                    >
                      {item.label}
                      <ChevronDown size={14} className={`transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                  ) : (
                    <Link
                      to={item.path}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors animated-link ${textColor} hover:bg-white/10 ${location.pathname === item.path ? 'text-amber-500' : ''}`}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown */}
                  {item.children && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 w-56 card-elevated rounded-xl overflow-hidden py-2">
                      {item.children.map(child => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-800 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+2341234567890"
                className={`flex items-center gap-1.5 text-sm font-medium ${textColor} hover:text-amber-500 transition-colors`}
              >
                <Phone size={15} />
                <span>+234 123 456 7890</span>
              </a>
              <button
                onClick={() => navigate('/booking')}
                className="btn-gold px-4 py-2 text-sm rounded-lg font-semibold"
              >
                Book Now
              </button>
              <button
                onClick={() => navigate('/login')}
                className={`px-4 py-2 text-sm font-semibold border-2 rounded-lg transition-all ${
                  isHomePage && !scrolled
                    ? 'border-white text-white hover:bg-white hover:text-emerald-800'
                    : 'btn-outline'
                }`}
              >
                Login
              </button>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 rounded-lg ${textColor}`}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-screen' : 'max-h-0'}`}
          style={{ background: 'white' }}
        >
          <div className="px-4 py-4 space-y-1">
            {navItems.map(item => (
              <div key={item.label}>
                {item.children ? (
                  <div>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-gray-800 font-medium hover:bg-emerald-50"
                    >
                      {item.label}
                      <ChevronDown size={16} className={`transition-transform ${activeDropdown === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    {activeDropdown === item.label && (
                      <div className="pl-4 mt-1 space-y-1">
                        {item.children.map(child => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block px-4 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-800"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className="block px-4 py-3 rounded-lg text-gray-800 font-medium hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-4 border-t border-gray-100 space-y-2">
              <button onClick={() => navigate('/booking')} className="w-full btn-gold py-3 rounded-xl text-center font-semibold">
                Book Now
              </button>
              <button onClick={() => navigate('/login')} className="w-full btn-outline py-3 rounded-xl text-center font-semibold">
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
