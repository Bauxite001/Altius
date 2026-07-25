import { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp, Bot } from 'lucide-react';

interface Props {
  onOpenChat: () => void;
}

export default function FloatingButtons({ onOpenChat }: Props) {
  const [showBack, setShowBack] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (scrolled / total) * 100 : 0;
      setScrollPct(pct);
      setShowBack(scrolled > 400);

      // Update scroll progress bar
      const bar = document.getElementById('scroll-progress');
      if (bar) bar.style.width = pct + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      {/* WhatsApp */}
      <a
        href="https://wa.me/2341234567890?text=Hello%20Altius%20Group%2C%20I%20am%20interested%20in%20your%20properties."
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl group"
        style={{ background: '#25D366' }}
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} color="white" fill="white" />
        <span className="absolute right-16 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat on WhatsApp
        </span>
      </a>

      {/* AI Chatbot */}
      <button
        onClick={onOpenChat}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl group"
        style={{ background: 'linear-gradient(135deg, #0F5132, #1a6b40)' }}
        aria-label="Open AI Assistant"
      >
        <Bot size={24} color="white" />
        <span className="absolute right-16 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          AI Property Assistant
        </span>
      </button>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 relative ${
          showBack ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        style={{ background: 'white', border: '2px solid #0F5132' }}
        aria-label="Back to top"
      >
        {/* Circular progress */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="21" fill="none" stroke="#e8f5ee" strokeWidth="3" />
          <circle
            cx="24" cy="24" r="21" fill="none"
            stroke="#0F5132" strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${2 * Math.PI * 21}`}
            strokeDashoffset={`${2 * Math.PI * 21 * (1 - scrollPct / 100)}`}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
        </svg>
        <ArrowUp size={18} color="#0F5132" className="relative z-10" />
      </button>
    </div>
  );
}
