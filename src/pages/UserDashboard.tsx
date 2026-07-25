import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Calendar, Heart, Bell, Settings, LogOut, ChevronRight, Download, Star, MapPin } from 'lucide-react';
import { properties } from '../data';

const tabs = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'bookings', label: 'Bookings', icon: Calendar },
  { id: 'saved', label: 'Saved', icon: Heart },
  { id: 'notifications', label: 'Alerts', icon: Bell },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const mockBookings = [
  { id: 'ALT-X7A2B', property: 'The Altius Penthouse — Ikoyi', checkin: '2026-08-01', checkout: '2026-08-05', status: 'confirmed', amount: 2500000 },
  { id: 'ALT-Y8C3D', property: 'Victoria Crown Residence', checkin: '2026-07-10', checkout: '2026-07-14', status: 'completed', amount: 1200000 },
];

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [savedIds] = useState(['altius-penthouse-001', 'altius-vi-001', 'altius-banana-001']);
  const savedProperties = properties.filter(p => savedIds.includes(p.id));

  return (
    <main className="pt-20 min-h-screen" style={{ background: '#FAF8F3' }}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card-elevated rounded-2xl p-6 mb-5 text-center">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&auto=format" alt="User avatar" className="w-20 h-20 rounded-full mx-auto mb-3 object-cover" />
              <h2 className="font-display font-bold text-gray-900">Adebayo Okonkwo</h2>
              <p className="text-gray-500 text-sm">adebayo@email.com</p>
              <span className="inline-block mt-2 text-xs bg-emerald-100 text-emerald-800 font-semibold px-3 py-1 rounded-full">Premium Member</span>
            </div>
            <div className="card-elevated rounded-2xl p-3">
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id ? 'bg-emerald-800 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  <tab.icon size={18} />{tab.label}
                  {activeTab === tab.id && <ChevronRight size={16} className="ml-auto" />}
                </button>
              ))}
              <div className="pt-2 mt-2 border-t border-gray-100">
                <Link to="/" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all">
                  <LogOut size={18} />Logout
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h1 className="font-display text-2xl font-bold text-gray-900">Welcome back, Adebayo! 👋</h1>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Active Bookings', value: '2', color: '#0F5132' },
                    { label: 'Saved Properties', value: savedIds.length.toString(), color: '#C8A24D' },
                    { label: 'Total Spent', value: '₦3.7M', color: '#1E1E1E' },
                  ].map(stat => (
                    <div key={stat.label} className="card-elevated rounded-2xl p-5">
                      <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
                      <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
                <div className="card-elevated rounded-2xl p-6">
                  <h3 className="font-display font-bold text-gray-900 mb-4">Upcoming Bookings</h3>
                  {mockBookings.filter(b => b.status === 'confirmed').map(booking => (
                    <div key={booking.id} className="flex items-center justify-between p-4 rounded-xl bg-emerald-50 border border-emerald-100">
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{booking.property}</p>
                        <p className="text-gray-500 text-xs">{booking.checkin} → {booking.checkout}</p>
                        <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full mt-1 inline-block">Confirmed</span>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-emerald-800">₦{booking.amount.toLocaleString()}</p>
                        <button className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 mt-1"><Download size={12} /> Receipt</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div>
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Booking History</h2>
                <div className="space-y-4">
                  {mockBookings.map(booking => (
                    <div key={booking.id} className="card-elevated rounded-2xl p-6">
                      <div className="flex items-start justify-between flex-wrap gap-4">
                        <div>
                          <p className="font-mono text-xs text-gray-400 mb-1">#{booking.id}</p>
                          <h3 className="font-semibold text-gray-900">{booking.property}</h3>
                          <p className="text-gray-500 text-sm">{booking.checkin} → {booking.checkout}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-emerald-800 text-lg">₦{booking.amount.toLocaleString()}</p>
                          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${booking.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button className="btn-outline px-4 py-2 rounded-xl text-xs flex items-center gap-1"><Download size={12} /> Receipt</button>
                        {booking.status === 'completed' && <button className="px-4 py-2 rounded-xl text-xs bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1"><Star size={12} /> Leave Review</button>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'saved' && (
              <div>
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Saved Properties</h2>
                <div className="grid sm:grid-cols-2 gap-5">
                  {savedProperties.map(p => (
                    <Link key={p.id} to={`/properties/${p.id}`} className="card-elevated rounded-2xl overflow-hidden group">
                      <div className="img-zoom h-44">
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 text-sm group-hover:text-emerald-800 transition-colors">{p.title}</h3>
                        <div className="flex items-center gap-1 mt-1 mb-2"><MapPin size={12} className="text-amber-500" /><span className="text-xs text-gray-500">{p.location}</span></div>
                        <p className="font-bold text-emerald-800">{p.priceLabel}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Profile Settings</h2>
                <div className="card-elevated rounded-2xl p-6">
                  <div className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">First Name</label><input defaultValue="Adebayo" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
                      <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Last Name</label><input defaultValue="Okonkwo" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
                    </div>
                    <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Email</label><input defaultValue="adebayo@email.com" type="email" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
                    <div><label className="text-sm font-medium text-gray-700 mb-1.5 block">Phone</label><input defaultValue="+234 812 345 6789" type="tel" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm" /></div>
                    <button className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold">Save Changes</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">Notifications</h2>
                <div className="space-y-3">
                  {[
                    { icon: '🎉', title: 'Booking Confirmed', body: 'Your booking for The Altius Penthouse is confirmed for August 1–5.', time: '2 hours ago', read: false },
                    { icon: '📊', title: 'New Property Alert', body: 'A new luxury villa matching your saved search is available in Ikoyi.', time: '1 day ago', read: false },
                    { icon: '💌', title: 'Payment Received', body: 'Payment of ₦2,500,000 confirmed for booking ALT-X7A2B.', time: '2 days ago', read: true },
                  ].map((notif, i) => (
                    <div key={i} className={`card-elevated rounded-2xl p-5 flex items-start gap-4 ${!notif.read ? 'border-l-4 border-emerald-700' : ''}`}>
                      <span className="text-2xl">{notif.icon}</span>
                      <div className="flex-1">
                        <p className={`font-semibold text-sm ${!notif.read ? 'text-gray-900' : 'text-gray-600'}`}>{notif.title}</p>
                        <p className="text-gray-500 text-xs mt-0.5">{notif.body}</p>
                        <p className="text-gray-400 text-xs mt-1">{notif.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
