import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, MessageCircle, Calendar, Home, TrendingUp, PhoneCall } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: number;
  from: 'bot' | 'user';
  text: string;
  buttons?: { label: string; action: string }[];
}

const initialMessages: Message[] = [
  {
    id: 1,
    from: 'bot',
    text: "Hello! I'm Altius AI, your personal property assistant. 👋\n\nI can help you with:",
    buttons: [
      { label: '🏠 Browse Properties', action: 'properties' },
      { label: '📅 Book Inspection', action: 'inspection' },
      { label: '💰 Investment Info', action: 'investment' },
      { label: '🛎 Book Short Let', action: 'shortlet' },
    ],
  },
];

const responses: Record<string, { text: string; buttons?: { label: string; action: string }[] }> = {
  properties: {
    text: 'We have premium properties across Lagos:\n\n• **Ikoyi** – Luxury penthouses from ₦250M\n• **Victoria Island** – Smart apartments from ₦120M\n• **Lekki Phase 1** – Family duplexes from ₦85M\n• **Banana Island** – Ultra-luxury villas from ₦800M\n• **Eko Atlantic** – Off-plan investments from ₦180M\n\nWhich area interests you?',
    buttons: [
      { label: '📍 Ikoyi', action: 'ikoyi' },
      { label: '📍 Lekki', action: 'lekki' },
      { label: '📍 Victoria Island', action: 'vi' },
      { label: '🔍 View All', action: 'viewall' },
    ],
  },
  inspection: {
    text: 'Great! I can schedule a property inspection for you. 📅\n\nOur inspections are:\n• Free of charge\n• Available Mon–Sat\n• Conducted by a senior agent\n\nWould you like to schedule now?',
    buttons: [
      { label: '📅 Schedule Now', action: 'schedule' },
      { label: '💬 Talk to Agent', action: 'agent' },
    ],
  },
  investment: {
    text: 'Altius Group offers structured investment opportunities:\n\n📈 **Starter** – From ₦5M | 15–20% ROI\n📈 **Growth** – From ₦25M | 22–30% ROI\n📈 **Premier** – From ₦100M | 28–40% ROI\n\n*Based on Altius Group Investment Report 2025*\n\nWhich plan interests you?',
    buttons: [
      { label: '💼 Starter Plan', action: 'starter' },
      { label: '💼 Growth Plan', action: 'growth' },
      { label: '💼 Premier Plan', action: 'premier' },
      { label: '📞 Book Consultation', action: 'agent' },
    ],
  },
  shortlet: {
    text: 'Our luxury short-let apartments are perfect for your stay! 🛎\n\nAvailable in:\n• Ikoyi – from ₦150,000/night\n• Victoria Island – from ₦100,000/night\n• Lekki – from ₦80,000/night\n\nAll apartments include: WiFi, AC, Generator, Security, and Concierge.',
    buttons: [
      { label: '🛏 Book Apartment', action: 'bookshortlet' },
      { label: '📅 Check Availability', action: 'availability' },
    ],
  },
  agent: {
    text: "I'll connect you with one of our senior property consultants right away. 🤝\n\nYou can reach them via:",
    buttons: [
      { label: '💬 Continue on WhatsApp', action: 'whatsapp' },
      { label: '📞 Request Callback', action: 'callback' },
    ],
  },
  ikoyi: { text: 'Ikoyi is our most prestigious address. Current listings:\n\n🏙 **The Altius Penthouse** – 5 bed, ₦650M\n🏙 **Banana Island Villa** – 7 bed, ₦1.2B\n\nWould you like a viewing?' },
  lekki: { text: 'Lekki Phase 1 is our most popular area. Current listings:\n\n🏘 **Lekki Pearl Estate** – 5 bed duplex, ₦185M\n🏘 **Lekki Gardens Modern Home** – 4 bed, ₦95M\n\nFantastic investment potential!' },
  vi: { text: 'Victoria Island offers central Lagos luxury:\n\n🏢 **Victoria Crown Residence** – 4 bed, ₦280M\n🏢 **Short-let from ₦100K/night**\n\nWould you like a viewing?' },
  default: {
    text: "I'd be happy to help with that! For detailed assistance, let me connect you with one of our expert consultants.",
    buttons: [
      { label: '💬 WhatsApp Agent', action: 'whatsapp' },
      { label: '🏠 Browse Properties', action: 'properties' },
      { label: '📞 Call Us', action: 'callback' },
    ],
  },
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ChatBot({ open, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const addBotMessage = (response: typeof responses[string]) => {
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [
        ...prev,
        { id: Date.now(), from: 'bot', text: response.text, buttons: response.buttons },
      ]);
    }, 1000);
  };

  const handleButton = (action: string) => {
    if (action === 'whatsapp') {
      window.open('https://wa.me/2341234567890?text=Hello%20Altius%20Group', '_blank');
      return;
    }
    if (action === 'viewall') { onClose(); navigate('/properties'); return; }
    if (action === 'bookshortlet' || action === 'schedule') { onClose(); navigate('/booking'); return; }
    if (action === 'availability') { onClose(); navigate('/short-lets'); return; }

    const res = responses[action] || responses.default;
    addBotMessage(res);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const text = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now(), from: 'user', text }]);

    const lower = text.toLowerCase();
    let res = responses.default;
    if (lower.includes('property') || lower.includes('properties') || lower.includes('buy') || lower.includes('house')) res = responses.properties;
    else if (lower.includes('inspection') || lower.includes('visit') || lower.includes('viewing')) res = responses.inspection;
    else if (lower.includes('invest') || lower.includes('roi') || lower.includes('return')) res = responses.investment;
    else if (lower.includes('short') || lower.includes('rent') || lower.includes('stay') || lower.includes('hotel')) res = responses.shortlet;
    else if (lower.includes('agent') || lower.includes('speak') || lower.includes('call') || lower.includes('human')) res = responses.agent;

    addBotMessage(res);
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-28 right-6 w-80 sm:w-96 z-50 shadow-2xl rounded-2xl overflow-hidden flex flex-col" style={{ height: '520px', background: 'white', border: '1px solid rgba(15,81,50,0.12)' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3" style={{ background: 'linear-gradient(135deg, #0F5132, #1a6b40)' }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
            <Bot size={20} color="white" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Altius AI Assistant</p>
            <p className="text-emerald-200 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Online now
            </p>
          </div>
        </div>
        <button onClick={onClose} className="text-white/70 hover:text-white transition-colors p-1">
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ background: '#f8faf9' }}>
        {messages.map(msg => (
          <div key={msg.id} className={`flex gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${msg.from === 'bot' ? 'bg-emerald-800' : 'bg-amber-500'}`}>
              {msg.from === 'bot' ? <Bot size={14} color="white" /> : <User size={14} color="white" />}
            </div>
            <div className="max-w-[80%] space-y-2">
              <div
                className={`px-3 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                  msg.from === 'bot'
                    ? 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-sm'
                    : 'text-white rounded-tr-sm'
                }`}
                style={msg.from === 'user' ? { background: 'linear-gradient(135deg, #0F5132, #1a6b40)' } : {}}
              >
                {msg.text}
              </div>
              {msg.buttons && (
                <div className="flex flex-wrap gap-1.5">
                  {msg.buttons.map(btn => (
                    <button
                      key={btn.action}
                      onClick={() => handleButton(btn.action)}
                      className="text-xs px-3 py-1.5 rounded-full border border-emerald-700 text-emerald-800 hover:bg-emerald-800 hover:text-white transition-all"
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-800 flex items-center justify-center">
              <Bot size={14} color="white" />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100 flex gap-1 items-center">
              {[0, 1, 2].map(i => (
                <span key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 p-3 flex gap-2 bg-white">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder="Ask about properties, bookings..."
          className="flex-1 text-sm px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-600"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim()}
          className="w-9 h-9 rounded-xl btn-primary flex items-center justify-center disabled:opacity-40"
        >
          <Send size={16} />
        </button>
      </div>

      {/* WhatsApp escalation */}
      <div className="bg-gray-50 px-4 py-2.5 border-t border-gray-100 flex items-center justify-center gap-2">
        <a
          href="https://wa.me/2341234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-500 hover:text-green-600 transition-colors flex items-center gap-1.5"
        >
          <MessageCircle size={13} />
          Continue conversation on WhatsApp
        </a>
      </div>
    </div>
  );
}
