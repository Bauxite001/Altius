import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Home, Calendar, Building2, Users, TrendingUp, FileText, BarChart3,
  Settings, Bell, Search, ChevronDown, LogOut, ExternalLink, X, Menu, Plus, Edit,
  Trash2, Eye, Check, AlertCircle, Filter, Download, Upload, Star, MapPin,
  DollarSign, Activity, UserCheck, MessageSquare, PieChart
} from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as ReChartPie, Pie, Cell } from 'recharts';
import { properties, newsArticles } from '../data';
import logoImg from '../imports/WhatsApp_Image_2026-07-21_at_09.43.42-removebg-preview.png';
import { useToast } from '../components/Toast';

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'properties', label: 'Properties', icon: Home },
  { id: 'shortlets', label: 'Short Lets', icon: Building2 },
  { id: 'bookings', label: 'Bookings', icon: Calendar },
  { id: 'clients', label: 'Clients', icon: Users },
  { id: 'leads', label: 'Leads', icon: UserCheck },
  { id: 'investments', label: 'Investments', icon: TrendingUp },
  { id: 'news', label: 'News', icon: FileText },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const revenueData = [
  { month: 'Jan', revenue: 18400000, bookings: 24 },
  { month: 'Feb', revenue: 22100000, bookings: 31 },
  { month: 'Mar', revenue: 19800000, bookings: 28 },
  { month: 'Apr', revenue: 28500000, bookings: 38 },
  { month: 'May', revenue: 31200000, bookings: 42 },
  { month: 'Jun', revenue: 26700000, bookings: 36 },
  { month: 'Jul', revenue: 35100000, bookings: 47 },
];

const pieData = [
  { name: 'Short Let', value: 42, color: '#0F5132' },
  { name: 'Property Sales', value: 35, color: '#C8A24D' },
  { name: 'Investment', value: 15, color: '#1E1E1E' },
  { name: 'Construction', value: 8, color: '#6b7280' },
];

const mockBookings = [
  { id: 'ALT-001', guest: 'Dr. Ngozi Eze', property: 'Altius Penthouse — Ikoyi', checkin: '2026-08-01', status: 'confirmed', amount: 2500000 },
  { id: 'ALT-002', guest: 'Emeka Okafor', property: 'Victoria Crown Residence', checkin: '2026-08-05', status: 'pending', amount: 1200000 },
  { id: 'ALT-003', guest: 'Adaeze Nwosu', property: 'Lekki Pearl Estate', checkin: '2026-08-10', status: 'confirmed', amount: 850000 },
  { id: 'ALT-004', guest: 'Alhaji Musa Ibrahim', property: 'Banana Island Grand Villa', checkin: '2026-07-28', status: 'cancelled', amount: 5000000 },
];

const mockLeads = [
  { name: 'Chukwudi Obi', type: 'Buyer', property: 'Ikoyi Penthouse', date: '2026-07-20', status: 'hot', agent: 'Fatima B.' },
  { name: 'Mrs. Akinlade', type: 'Investor', property: 'Eko Atlantic', date: '2026-07-19', status: 'warm', agent: 'Emeka O.' },
  { name: 'Dr. Babatunde', type: 'Buyer', property: 'Lekki Duplex', date: '2026-07-18', status: 'warm', agent: 'Chidi N.' },
  { name: 'Ngozi Williams', type: 'Renter', property: 'VI Apartment', date: '2026-07-17', status: 'cold', agent: 'Fatima B.' },
];

const notifications = [
  { icon: '📅', message: 'New booking: Dr. Ngozi Eze — Ikoyi Penthouse', time: '5 min ago', type: 'booking' },
  { icon: '💰', message: 'Payment received: ₦2,500,000 — ALT-001', time: '12 min ago', type: 'payment' },
  { icon: '👤', message: 'New lead: Chukwudi Obi — interested in Ikoyi', time: '1 hr ago', type: 'lead' },
  { icon: '🏠', message: 'Inspection scheduled: Emeka Okafor — August 5', time: '2 hr ago', type: 'inspection' },
];

const kpis = [
  { label: 'Total Revenue', value: '₦181.8M', change: '+18.4%', positive: true, icon: DollarSign, color: '#0F5132' },
  { label: 'Active Listings', value: '38', change: '+5', positive: true, icon: Home, color: '#C8A24D' },
  { label: 'Occupancy Rate', value: '87%', change: '+3.2%', positive: true, icon: Activity, color: '#0F5132' },
  { label: 'Pending Bookings', value: '12', change: '-2', positive: false, icon: Calendar, color: '#1E1E1E' },
  { label: 'New Leads', value: '47', change: '+12', positive: true, icon: UserCheck, color: '#C8A24D' },
  { label: 'Monthly Sales', value: '₦35.1M', change: '+31.5%', positive: true, icon: TrendingUp, color: '#0F5132' },
];

export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notifOpen, setNotifOpen] = useState(false);
  const [propertyModal, setPropertyModal] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleExit = () => {
    showToast('Returning to public website...', 'info');
    setTimeout(() => navigate('/'), 500);
  };

  const statusColor = (s: string) => s === 'confirmed' ? 'bg-green-100 text-green-700' : s === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-600';
  const leadColor = (s: string) => s === 'hot' ? 'bg-red-100 text-red-600' : s === 'warm' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-600';

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#f1f5f1' }}>
      {/* Sidebar */}
      <aside className={`admin-sidebar flex flex-col transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'} shrink-0 overflow-hidden`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
          <img src={logoImg} alt="Altius Group" className={`h-10 w-auto object-contain brightness-0 invert shrink-0 ${sidebarOpen ? '' : 'mx-auto'}`} />
          {sidebarOpen && <span className="font-display font-bold text-white text-sm">Admin Portal</span>}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all relative ${
                activeSection === item.id
                  ? 'bg-white/15 text-white border-r-2 border-amber-400'
                  : 'text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              <item.icon size={18} className="shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
              {sidebarOpen && item.badge && (
                <span className="ml-auto bg-amber-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{item.badge}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="border-t border-white/10 p-3 space-y-1">
          <button onClick={handleExit} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-amber-300 hover:bg-amber-500/20 transition-colors text-sm font-semibold">
            <ExternalLink size={16} className="shrink-0" />
            {sidebarOpen && 'View Public Site'}
          </button>
          <button onClick={() => { navigate('/'); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/60 hover:bg-white/10 transition-colors text-sm">
            <LogOut size={16} className="shrink-0" />
            {sidebarOpen && 'Exit Admin'}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Nav */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4 shrink-0">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Menu size={20} className="text-gray-600" />
          </button>

          <div className="flex-1 relative max-w-xs">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search..." className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50" />
          </div>

          <div className="ml-auto flex items-center gap-3">
            {/* Exit admin buttons — always visible */}
            <button onClick={handleExit} className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors">
              <ExternalLink size={13} /> View Public Site
            </button>
            <button onClick={() => navigate('/')} className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 transition-colors">
              <LogOut size={13} /> Exit Admin
            </button>

            {/* Notifications */}
            <div className="relative">
              <button onClick={() => setNotifOpen(!notifOpen)} className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              {notifOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 card-elevated rounded-2xl overflow-hidden z-50">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                    <p className="font-semibold text-gray-900 text-sm">Notifications</p>
                    <button onClick={() => setNotifOpen(false)}><X size={16} className="text-gray-400" /></button>
                  </div>
                  {notifications.map((n, i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                      <span className="text-xl">{n.icon}</span>
                      <div>
                        <p className="text-xs text-gray-800">{n.message}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                  <div className="px-4 py-3 text-center">
                    <button className="text-xs text-emerald-700 font-semibold">View all notifications</button>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format" alt="Admin" className="w-8 h-8 rounded-full object-cover" />
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-gray-900">Alhaji Adebayo</p>
                <p className="text-xs text-gray-400">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Dashboard Overview */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="font-display text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <div className="flex gap-3">
                  <button onClick={() => setPropertyModal(true)} className="btn-primary px-4 py-2 rounded-xl text-sm flex items-center gap-2"><Plus size={16} />Add Property</button>
                  <button className="btn-outline px-4 py-2 rounded-xl text-sm flex items-center gap-2"><Download size={16} />Export</button>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {kpis.map(kpi => (
                  <div key={kpi.label} className="card-elevated rounded-2xl p-5 hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: `${kpi.color}15` }}>
                        <kpi.icon size={18} style={{ color: kpi.color }} />
                      </div>
                      <span className={`text-xs font-bold ${kpi.positive ? 'text-green-600' : 'text-red-500'}`}>{kpi.change}</span>
                    </div>
                    <p className="font-display text-xl font-bold text-gray-900">{kpi.value}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{kpi.label}</p>
                  </div>
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 card-elevated rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-display font-bold text-gray-900">Revenue Overview</h3>
                    <select className="text-xs border border-gray-200 rounded-lg px-2 py-1 bg-gray-50">
                      <option>Last 7 months</option>
                    </select>
                  </div>
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0F5132" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#0F5132" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `₦${(v/1000000).toFixed(0)}M`} />
                      <Tooltip formatter={(v: number) => [`₦${v.toLocaleString()}`, 'Revenue']} />
                      <Area type="monotone" dataKey="revenue" stroke="#0F5132" strokeWidth={2} fill="url(#colorRevenue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="card-elevated rounded-2xl p-6">
                  <h3 className="font-display font-bold text-gray-900 mb-5">Revenue by Type</h3>
                  <ResponsiveContainer width="100%" height={180}>
                    <ReChartPie>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" strokeWidth={0}>
                        {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                      </Pie>
                      <Tooltip formatter={(v: number) => [`${v}%`, '']} />
                    </ReChartPie>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-2">
                    {pieData.map(d => (
                      <div key={d.name} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                          <span className="text-gray-600">{d.name}</span>
                        </div>
                        <span className="font-semibold text-gray-900">{d.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Bookings */}
              <div className="card-elevated rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-display font-bold text-gray-900">Recent Bookings</h3>
                  <button onClick={() => setActiveSection('bookings')} className="text-xs text-emerald-700 font-semibold hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        {['Booking ID', 'Guest', 'Property', 'Check-in', 'Status', 'Amount', 'Actions'].map(h => (
                          <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider pb-3 pr-4">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockBookings.map(b => (
                        <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="py-3 pr-4 font-mono text-xs text-gray-500">{b.id}</td>
                          <td className="py-3 pr-4 font-medium text-gray-900">{b.guest}</td>
                          <td className="py-3 pr-4 text-gray-600 text-xs">{b.property}</td>
                          <td className="py-3 pr-4 text-gray-600 text-xs">{b.checkin}</td>
                          <td className="py-3 pr-4">
                            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColor(b.status)}`}>{b.status.charAt(0).toUpperCase() + b.status.slice(1)}</span>
                          </td>
                          <td className="py-3 pr-4 font-semibold text-emerald-800">₦{b.amount.toLocaleString()}</td>
                          <td className="py-3">
                            <div className="flex gap-1">
                              <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Eye size={14} /></button>
                              <button className="p-1.5 rounded-lg hover:bg-green-50 text-green-500"><Check size={14} /></button>
                              <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><X size={14} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Properties Section */}
          {activeSection === 'properties' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="font-display text-2xl font-bold text-gray-900">Property Management</h1>
                <button onClick={() => setPropertyModal(true)} className="btn-primary px-4 py-2 rounded-xl text-sm flex items-center gap-2"><Plus size={16} />Add Property</button>
              </div>
              <div className="flex gap-3">
                <div className="relative flex-1"><Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input placeholder="Search properties..." className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-white" /></div>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm bg-white hover:border-emerald-300"><Filter size={15} />Filter</button>
              </div>
              <div className="card-elevated rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead style={{ background: '#f8f9fa' }}>
                    <tr>
                      {['Property', 'Location', 'Type', 'Price', 'Status', 'Featured', 'Actions'].map(h => (
                        <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map(p => (
                      <tr key={p.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <img src={p.image} alt={p.title} className="w-10 h-10 rounded-lg object-cover" />
                            <span className="font-medium text-gray-900 text-xs">{p.title}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-gray-500 text-xs">{p.area}</td>
                        <td className="px-5 py-4 text-gray-500 text-xs capitalize">{p.type}</td>
                        <td className="px-5 py-4 font-semibold text-emerald-800 text-xs">{p.priceLabel}</td>
                        <td className="px-5 py-4">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${p.status === 'available' ? 'bg-green-100 text-green-700' : p.status === 'off-plan' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <button className={`w-10 h-5 rounded-full transition-all ${p.featured ? 'bg-emerald-700' : 'bg-gray-200'}`}>
                            <span className={`block w-4 h-4 rounded-full bg-white shadow-sm transition-all mx-0.5 ${p.featured ? 'translate-x-5' : 'translate-x-0'}`} />
                          </button>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex gap-1">
                            <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Eye size={13} /></button>
                            <button className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500"><Edit size={13} /></button>
                            <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={13} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Bookings */}
          {activeSection === 'bookings' && (
            <div className="space-y-6">
              <h1 className="font-display text-2xl font-bold text-gray-900">Booking Management</h1>
              <div className="grid grid-cols-4 gap-4">
                {[
                  { label: 'Total', value: mockBookings.length, color: 'bg-gray-100 text-gray-700' },
                  { label: 'Confirmed', value: mockBookings.filter(b => b.status === 'confirmed').length, color: 'bg-green-100 text-green-700' },
                  { label: 'Pending', value: mockBookings.filter(b => b.status === 'pending').length, color: 'bg-amber-100 text-amber-700' },
                  { label: 'Cancelled', value: mockBookings.filter(b => b.status === 'cancelled').length, color: 'bg-red-100 text-red-600' },
                ].map(s => (
                  <div key={s.label} className={`rounded-2xl p-5 text-center font-semibold ${s.color}`}>
                    <p className="text-3xl font-bold">{s.value}</p>
                    <p className="text-sm mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="card-elevated rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <span className="font-semibold text-gray-900">All Bookings</span>
                  <button className="text-xs flex items-center gap-1 text-emerald-700"><Download size={13} />Export CSV</button>
                </div>
                <table className="w-full text-sm">
                  <thead style={{ background: '#f8f9fa' }}>
                    <tr>
                      {['ID', 'Guest', 'Property', 'Check-in', 'Status', 'Amount', 'Actions'].map(h => (
                        <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mockBookings.map(b => (
                      <tr key={b.id} className="border-t border-gray-50 hover:bg-gray-50">
                        <td className="px-5 py-4 font-mono text-xs text-gray-500">{b.id}</td>
                        <td className="px-5 py-4 font-medium text-gray-900">{b.guest}</td>
                        <td className="px-5 py-4 text-gray-500 text-xs">{b.property}</td>
                        <td className="px-5 py-4 text-gray-500 text-xs">{b.checkin}</td>
                        <td className="px-5 py-4"><span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusColor(b.status)}`}>{b.status}</span></td>
                        <td className="px-5 py-4 font-semibold text-emerald-800">₦{b.amount.toLocaleString()}</td>
                        <td className="px-5 py-4">
                          <div className="flex gap-1">
                            <button className="p-1.5 rounded-lg hover:bg-green-50 text-green-500 text-xs font-semibold">Approve</button>
                            <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 text-xs">Reject</button>
                            <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500"><Download size={13} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Leads */}
          {activeSection === 'leads' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="font-display text-2xl font-bold text-gray-900">Lead Management</h1>
                <button className="btn-primary px-4 py-2 rounded-xl text-sm flex items-center gap-2"><Plus size={16} />Add Lead</button>
              </div>
              <div className="card-elevated rounded-2xl overflow-hidden">
                <table className="w-full text-sm">
                  <thead style={{ background: '#f8f9fa' }}>
                    <tr>
                      {['Name', 'Type', 'Interested In', 'Date', 'Temperature', 'Agent', 'Actions'].map(h => (
                        <th key={h} className="text-left text-xs font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {mockLeads.map((lead, i) => (
                      <tr key={i} className="border-t border-gray-50 hover:bg-gray-50">
                        <td className="px-5 py-4 font-medium text-gray-900">{lead.name}</td>
                        <td className="px-5 py-4 text-gray-500 text-xs">{lead.type}</td>
                        <td className="px-5 py-4 text-gray-500 text-xs">{lead.property}</td>
                        <td className="px-5 py-4 text-gray-500 text-xs">{lead.date}</td>
                        <td className="px-5 py-4"><span className={`text-xs font-bold px-2.5 py-1 rounded-full capitalize ${leadColor(lead.status)}`}>{lead.status}</span></td>
                        <td className="px-5 py-4 text-gray-600 text-xs">{lead.agent}</td>
                        <td className="px-5 py-4">
                          <div className="flex gap-1">
                            <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Eye size={13} /></button>
                            <button className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500"><Edit size={13} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Analytics */}
          {activeSection === 'analytics' && (
            <div className="space-y-6">
              <h1 className="font-display text-2xl font-bold text-gray-900">Analytics</h1>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="card-elevated rounded-2xl p-6">
                  <h3 className="font-display font-bold text-gray-900 mb-5">Monthly Revenue</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 10 }} tickFormatter={v => `₦${(v/1000000).toFixed(0)}M`} />
                      <Tooltip formatter={(v: number) => [`₦${v.toLocaleString()}`, 'Revenue']} />
                      <Bar dataKey="revenue" fill="#0F5132" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="card-elevated rounded-2xl p-6">
                  <h3 className="font-display font-bold text-gray-900 mb-5">Monthly Bookings</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#C8A24D" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#C8A24D" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} />
                      <Tooltip />
                      <Area type="monotone" dataKey="bookings" stroke="#C8A24D" strokeWidth={2} fill="url(#colorBookings)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* News */}
          {activeSection === 'news' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="font-display text-2xl font-bold text-gray-900">News Management</h1>
                <button className="btn-primary px-4 py-2 rounded-xl text-sm flex items-center gap-2"><Plus size={16} />Create Article</button>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                {newsArticles.map(article => (
                  <div key={article.id} className="card-elevated rounded-2xl overflow-hidden">
                    <img src={article.image} alt={article.title} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{article.category}</span>
                        <span className="text-xs text-gray-400">{article.date}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-3 line-clamp-2">{article.title}</h3>
                      <div className="flex gap-2">
                        <button className="flex-1 py-2 rounded-xl text-xs bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center gap-1"><Edit size={12} />Edit</button>
                        <button className="flex-1 py-2 rounded-xl text-xs bg-green-50 text-green-700 border border-green-200 flex items-center justify-center gap-1"><Eye size={12} />Preview</button>
                        <button className="p-2 rounded-xl text-xs bg-red-50 text-red-500 border border-red-200"><Trash2 size={13} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Settings */}
          {activeSection === 'settings' && (
            <div className="space-y-6 max-w-2xl">
              <h1 className="font-display text-2xl font-bold text-gray-900">Settings</h1>
              <div className="card-elevated rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-5">Company Information</h3>
                <div className="space-y-4">
                  <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Company Name</label><input defaultValue="Altius Group Limited" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
                  <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Contact Email</label><input defaultValue="info@altiusgroup.ng" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
                  <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">WhatsApp Number</label><input defaultValue="+234 123 456 7890" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
                  <button className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold">Save Settings</button>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other sections */}
          {!['dashboard', 'properties', 'bookings', 'leads', 'analytics', 'news', 'settings'].includes(activeSection) && (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                <LayoutDashboard size={32} className="text-emerald-700" />
              </div>
              <h2 className="font-display text-xl font-bold text-gray-900 mb-2 capitalize">{activeSection}</h2>
              <p className="text-gray-500 text-sm">This section is being built. Check back soon.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Property Modal */}
      {propertyModal && (
        <div className="fixed inset-0 z-[200] bg-black/50 flex items-center justify-center p-4" onClick={() => setPropertyModal(false)}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-display font-bold text-gray-900">Add New Property</h3>
              <button onClick={() => setPropertyModal(false)}><X size={20} className="text-gray-400" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Property Title</label><input placeholder="e.g. Luxury Penthouse — Ikoyi" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Property Type</label><select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm"><option>Apartment</option><option>Duplex</option><option>Penthouse</option><option>Villa</option><option>Land</option></select></div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Location</label><select className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm"><option>Ikoyi</option><option>Victoria Island</option><option>Lekki Phase 1</option><option>Banana Island</option><option>Eko Atlantic</option></select></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Price (₦)</label><input type="number" placeholder="e.g. 250000000" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Bedrooms</label><input type="number" min={1} placeholder="e.g. 4" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Bathrooms</label><input type="number" min={1} placeholder="e.g. 4" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
                <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Size (sqft)</label><input type="number" placeholder="e.g. 4500" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
              </div>
              <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Description</label><textarea rows={3} placeholder="Property description..." className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm resize-none" /></div>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-emerald-400 transition-colors cursor-pointer">
                <Upload size={32} className="text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Drag & drop images here, or click to browse</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB each</p>
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="accent-emerald-700" /><span className="text-sm text-gray-700">Mark as Featured</span></label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="accent-emerald-700" /><span className="text-sm text-gray-700">Luxury Property</span></label>
                <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="accent-emerald-700" /><span className="text-sm text-gray-700">Short Let Available</span></label>
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => { setPropertyModal(false); showToast('Property saved as draft', 'info'); }} className="btn-outline px-5 py-3 rounded-xl text-sm">Save Draft</button>
                <button onClick={() => { setPropertyModal(false); showToast('Property published successfully!', 'success'); }} className="flex-1 btn-primary py-3 rounded-xl text-sm font-semibold">Publish Listing</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
