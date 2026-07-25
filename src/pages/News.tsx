import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import { newsArticles } from '../data';

const categories = ['All', 'Company Update', 'Market Insights', 'Investment Tips', 'Awards'];

export function NewsList() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = newsArticles.filter(a =>
    (category === 'All' || a.category === category) &&
    (search === '' || a.title.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className="pt-20 min-h-screen" style={{ background: '#FAF8F3' }}>
      <section className="relative py-20" style={{ background: 'linear-gradient(135deg, #0a3d24, #0F5132)' }}>
        <div className="hero-pattern absolute inset-0" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <Breadcrumb crumbs={[{ label: 'News & Insights' }]} />
          <h1 className="font-display text-3xl lg:text-5xl font-bold text-white mb-4">News & Market Insights</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mb-8">
            Stay informed with the latest from Altius Group — company announcements, market analysis, and investment insights.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-12">
        {/* Search and filter */}
        <div className="flex flex-wrap gap-4 items-center mb-10">
          <div className="relative flex-1 min-w-60">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search articles..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl text-sm bg-white" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${category === cat ? 'bg-emerald-800 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300'}`}>{cat}</button>
            ))}
          </div>
        </div>

        {/* Featured Article */}
        {filtered[0] && (
          <Link to={`/news/${filtered[0].id}`} className="block card-elevated rounded-2xl overflow-hidden group mb-8">
            <div className="grid md:grid-cols-2">
              <div className="img-zoom h-72 md:h-full">
                <img src={filtered[0].image} alt={filtered[0].title} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full inline-block mb-4 w-fit">{filtered[0].category}</span>
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-800 transition-colors">{filtered[0].title}</h2>
                <p className="text-gray-600 leading-relaxed mb-4 text-sm">{filtered[0].excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-5">
                  <span className="flex items-center gap-1"><Calendar size={12} />{filtered[0].date}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{filtered[0].readTime}</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-700 font-semibold text-sm group-hover:gap-3 transition-all">
                  Read Article <ArrowRight size={16} />
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Article Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.slice(1).map(article => (
            <Link key={article.id} to={`/news/${article.id}`} className="card-elevated rounded-2xl overflow-hidden group">
              <div className="img-zoom h-52">
                <img src={article.image} alt={article.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">{article.category}</span>
                  <span className="text-xs text-gray-400">{article.readTime}</span>
                </div>
                <h2 className="font-display font-semibold text-gray-900 mb-2 group-hover:text-emerald-800 transition-colors line-clamp-2 text-sm">{article.title}</h2>
                <p className="text-gray-500 text-xs line-clamp-2 mb-4">{article.excerpt}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Calendar size={12} />{article.date}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export function NewsArticle() {
  const { id } = useParams();
  const article = newsArticles.find(a => a.id === id);
  const related = newsArticles.filter(a => a.id !== id).slice(0, 3);

  if (!article) return <main className="pt-32 text-center"><p>Article not found.</p></main>;

  return (
    <main className="pt-20 min-h-screen" style={{ background: '#FAF8F3' }}>
      <div className="max-w-4xl mx-auto px-6 py-8">
        <Breadcrumb crumbs={[{ label: 'News', path: '/news' }, { label: article.title }]} />
      </div>
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="card-elevated rounded-2xl overflow-hidden mb-8">
          <img src={article.image} alt={article.title} className="w-full h-72 object-cover" />
        </div>
        <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">{article.category}</span>
        <h1 className="font-display text-2xl lg:text-4xl font-bold text-gray-900 mt-4 mb-4">{article.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-6 pb-6 border-b border-gray-100">
          <span className="flex items-center gap-1"><Calendar size={14} />{article.date}</span>
          <span className="flex items-center gap-1"><Clock size={14} />{article.readTime}</span>
          <span>By {article.author}</span>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed text-lg mb-4">{article.excerpt}</p>
          <p className="text-gray-600 leading-relaxed">{article.content}</p>
          <p className="text-gray-600 leading-relaxed mt-4">
            The Lagos property market continues to demonstrate resilience and strong fundamentals. With increasing urbanization, growing middle class, and infrastructure improvements, the outlook for premium real estate remains highly positive. Altius Group remains committed to delivering world-class developments that meet this growing demand.
          </p>
          <p className="text-gray-600 leading-relaxed mt-4">
            For investors looking to capitalize on these market conditions, our advisory team is available for confidential consultations. Contact us at invest@altiusgroup.ng or call +234 123 456 7890 to schedule your appointment.
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-8">
          {article.tags.map(tag => (
            <span key={tag} className="flex items-center gap-1.5 text-xs bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full">
              <Tag size={12} />{tag}
            </span>
          ))}
        </div>
      </section>

      {/* Related */}
      <section className="py-12 border-t border-gray-100" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map(a => (
              <Link key={a.id} to={`/news/${a.id}`} className="card-elevated rounded-2xl overflow-hidden group">
                <div className="img-zoom h-44">
                  <img src={a.image} alt={a.title} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-4">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">{a.category}</span>
                  <h3 className="font-display font-semibold text-gray-900 mt-2 text-sm group-hover:text-emerald-800 transition-colors line-clamp-2">{a.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
