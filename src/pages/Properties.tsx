import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, Grid3X3, List, MapPin, X } from 'lucide-react';
import PropertyCard from '../components/PropertyCard';
import Breadcrumb from '../components/Breadcrumb';
import { properties } from '../data';

const locations = ['All', 'Ikoyi', 'Victoria Island', 'Lekki', 'Banana Island', 'Eko Atlantic'];
const types = ['All', 'Apartment', 'Duplex', 'Penthouse', 'Villa', 'Land', 'Commercial'];
const sortOptions = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Featured'];

export default function Properties() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('All');
  const [type, setType] = useState('All');
  const [beds, setBeds] = useState('Any');
  const [sort, setSort] = useState('Featured');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let list = [...properties];
    if (search) list = list.filter(p => p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase()));
    if (location !== 'All') list = list.filter(p => p.area.toLowerCase().includes(location.toLowerCase()));
    if (type !== 'All') list = list.filter(p => p.type === type.toLowerCase());
    if (beds !== 'Any') {
      const n = parseInt(beds);
      list = beds === '5+' ? list.filter(p => p.bedrooms >= 5) : list.filter(p => p.bedrooms === n);
    }
    if (searchParams.get('filter') === 'featured') list = list.filter(p => p.featured);
    if (searchParams.get('filter') === 'offplan') list = list.filter(p => p.status === 'off-plan');
    if (sort === 'Price: Low to High') list.sort((a, b) => a.price - b.price);
    else if (sort === 'Price: High to Low') list.sort((a, b) => b.price - a.price);
    else if (sort === 'Featured') list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    return list;
  }, [search, location, type, beds, sort, searchParams]);

  return (
    <main className="pt-20 min-h-screen" style={{ background: '#FAF8F3' }}>
      {/* Page Header */}
      <section className="relative py-20" style={{ background: 'linear-gradient(135deg, #0a3d24, #0F5132)' }}>
        <div className="hero-pattern absolute inset-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <Breadcrumb crumbs={[{ label: 'Properties' }]} />
          <h1 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4">Property Listings</h1>
          <p className="text-emerald-100 text-lg max-w-2xl">
            Browse our curated portfolio of premium properties across Lagos's most prestigious addresses. Every listing reflects the Altius standard of excellence.
          </p>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="sticky top-20 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap gap-3 items-center">
            {/* Search */}
            <div className="flex-1 min-w-48 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name or location..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50"
              />
            </div>

            {/* Filter Chips */}
            <div className="flex gap-2 flex-wrap">
              {locations.map(l => (
                <button
                  key={l}
                  onClick={() => setLocation(l)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${location === l ? 'bg-emerald-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select value={sort} onChange={e => setSort(e.target.value)} className="px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-gray-50 text-gray-700">
              {sortOptions.map(o => <option key={o}>{o}</option>)}
            </select>

            {/* View Toggle */}
            <div className="flex border border-gray-200 rounded-xl overflow-hidden">
              <button onClick={() => setView('grid')} className={`p-2.5 ${view === 'grid' ? 'bg-emerald-800 text-white' : 'text-gray-500 hover:bg-gray-50'} transition-colors`}>
                <Grid3X3 size={16} />
              </button>
              <button onClick={() => setView('list')} className={`p-2.5 ${view === 'list' ? 'bg-emerald-800 text-white' : 'text-gray-500 hover:bg-gray-50'} transition-colors`}>
                <List size={16} />
              </button>
            </div>
          </div>

          {/* Type and Beds filters */}
          <div className="flex gap-2 flex-wrap mt-3">
            {types.map(t => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${type === t ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {t}
              </button>
            ))}
            <div className="ml-auto flex gap-2">
              {['Any', '1', '2', '3', '4', '5+'].map(b => (
                <button
                  key={b}
                  onClick={() => setBeds(b)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${beds === b ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {b === 'Any' ? '🛏 Any' : `${b} bed`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <p className="text-sm text-gray-500 mb-6">
          Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? 'property' : 'properties'}
          {location !== 'All' && <> in <strong>{location}</strong></>}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Search size={40} className="text-gray-300" />
            </div>
            <h3 className="font-display text-xl font-semibold text-gray-700 mb-2">No properties found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search filters</p>
            <button onClick={() => { setSearch(''); setLocation('All'); setType('All'); setBeds('Any'); }} className="btn-primary px-6 py-3 rounded-xl text-sm">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className={view === 'grid' ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filtered.map(p => (
              <PropertyCard key={p.id} property={p} compact={view === 'list'} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
