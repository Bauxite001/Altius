import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface Crumb { label: string; path?: string }

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-gray-500 py-4">
      <Link to="/" className="flex items-center gap-1 hover:text-emerald-700 transition-colors">
        <Home size={14} />
        <span>Home</span>
      </Link>
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <ChevronRight size={14} className="text-gray-300" />
          {crumb.path && i < crumbs.length - 1 ? (
            <Link to={crumb.path} className="hover:text-emerald-700 transition-colors">{crumb.label}</Link>
          ) : (
            <span className={i === crumbs.length - 1 ? 'text-emerald-800 font-medium' : ''}>{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
