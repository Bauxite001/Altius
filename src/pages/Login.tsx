import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, User, Lock, CheckCircle } from 'lucide-react';
import { useToast } from '../components/Toast';
import logoImg from '../imports/WhatsApp_Image_2026-07-21_at_09.43.42-removebg-preview.png';

export default function Login() {
  const [mode, setMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (mode === 'login') {
        if (email === 'admin@altius.ng' && password === 'admin123') {
          navigate('/admin');
        } else {
          showToast('Welcome back! Logged in successfully.', 'success');
          navigate('/dashboard');
        }
      } else if (mode === 'register') {
        showToast('Account created! Welcome to Altius Group.', 'success');
        navigate('/dashboard');
      } else {
        showToast('Reset link sent to your email.', 'success');
        setMode('login');
      }
    }, 1500);
  };

  return (
    <main className="min-h-screen flex" style={{ background: '#FAF8F3' }}>
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&h=1200&fit=crop&auto=format"
          alt="Luxury Altius property"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10,61,36,0.90) 0%, rgba(15,81,50,0.80) 100%)' }} />
        <div className="hero-pattern absolute inset-0" />
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <Link to="/">
            <img src={logoImg} alt="Altius Group" className="h-16 w-auto object-contain brightness-0 invert" />
          </Link>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div style={{ width: 40, height: 2, background: '#C8A24D' }} />
              <span className="text-amber-400 text-sm font-semibold tracking-widest uppercase">Member Portal</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-white mb-4">Manage Your Real Estate Portfolio</h2>
            <p className="text-emerald-200 leading-relaxed mb-8">
              Access your bookings, saved properties, investment portfolio, and exclusive listings — all in one place.
            </p>
            {['Saved Properties & Wishlist', 'Booking History & Receipts', 'Investment Portfolio Tracker', 'Exclusive Member Listings', 'Direct Agent Communication'].map(item => (
              <div key={item} className="flex items-center gap-3 mb-3">
                <CheckCircle size={18} className="text-amber-400 shrink-0" />
                <span className="text-emerald-100 text-sm">{item}</span>
              </div>
            ))}
          </div>
          <p className="text-emerald-300 text-xs">© 2026 Altius Group Limited. REDAN Member.</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/"><img src={logoImg} alt="Altius Group" className="h-14 mx-auto" /></Link>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 rounded-xl border border-gray-200 mb-8 bg-white">
            {(['login', 'register'] as const).map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all ${mode === m ? 'bg-emerald-800 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >{m === 'login' ? 'Sign In' : 'Create Account'}</button>
            ))}
          </div>

          {/* Admin hint */}
          {mode === 'login' && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6 text-xs text-amber-700">
              <strong>Admin access:</strong> email: admin@altius.ng | password: admin123
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5 block">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input value={name} onChange={e => setName(e.target.value)} placeholder="Your full name" className="w-full pl-10 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm bg-gray-50" required />
                </div>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email Address</label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">✉</span>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" className="w-full pl-10 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm bg-gray-50" required />
              </div>
            </div>
            {mode !== 'forgot' && (
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="text-sm font-medium text-gray-700">Password</label>
                  {mode === 'login' && <button type="button" onClick={() => setMode('forgot')} className="text-xs text-emerald-700 hover:underline">Forgot Password?</button>}
                </div>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-12 py-3.5 border border-gray-200 rounded-xl text-sm bg-gray-50" required />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            )}
            {mode === 'register' && (
              <div className="flex items-start gap-2">
                <input type="checkbox" required className="mt-1" />
                <p className="text-xs text-gray-500">I agree to Altius Group's <Link to="/terms" className="text-emerald-700 underline">Terms of Service</Link> and <Link to="/privacy" className="text-emerald-700 underline">Privacy Policy</Link></p>
              </div>
            )}
            <button type="submit" disabled={loading} className="w-full btn-primary py-4 rounded-xl font-semibold flex items-center justify-center gap-2 mt-2 disabled:opacity-70">
              {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
              {mode === 'login' ? 'Sign In' : mode === 'register' ? 'Create Account' : 'Send Reset Link'}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-emerald-700 font-semibold hover:underline">
              {mode === 'login' ? 'Sign up free' : 'Sign in'}
            </button>
          </p>

          <div className="text-center mt-4">
            <Link to="/" className="text-xs text-gray-400 hover:text-gray-600">← Back to website</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
