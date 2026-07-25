import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Bed, Bath, Maximize2, MapPin, Eye, Calendar } from 'lucide-react';
import type { Property } from '../data';

interface Props {
  property: Property;
  compact?: boolean;
}

export default function PropertyCard({ property, compact }: Props) {
  const [liked, setLiked] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="card-elevated rounded-2xl overflow-hidden group">
      {/* Image */}
      <div className="relative img-zoom" style={{ height: compact ? 200 : 260 }}>
        {!imgLoaded && <div className="skeleton absolute inset-0" />}
        <img
          src={property.image}
          alt={`${property.title} — ${property.location}`}
          className={`w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
        />
        <div className="property-overlay absolute inset-0" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
          {property.featured && <span className="badge-featured">Featured</span>}
          {property.luxury && <span className="badge-luxury">Luxury</span>}
          {property.isNew && <span className="badge-new">New</span>}
          {property.status === 'off-plan' && (
            <span className="text-xs font-bold bg-purple-600 text-white px-2.5 py-1 rounded-full uppercase tracking-wider">Off-Plan</span>
          )}
        </div>

        {/* Favorite */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute top-3 right-3 w-9 h-9 rounded-full glass flex items-center justify-center transition-all hover:scale-110"
          aria-label={liked ? 'Remove from saved' : 'Save property'}
        >
          <Heart size={16} className={liked ? 'fill-red-500 text-red-500' : 'text-white'} />
        </button>

        {/* Price overlay */}
        <div className="absolute bottom-3 left-3">
          <p className="text-white font-display font-bold text-xl leading-none">{property.priceLabel}</p>
          {property.shortLet && property.dailyRate && (
            <p className="text-white/80 text-xs mt-0.5">From ₦{property.dailyRate.toLocaleString()}/night</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-semibold text-gray-900 leading-snug text-[15px] group-hover:text-emerald-800 transition-colors">
            {property.title}
          </h3>
        </div>

        <div className="flex items-center gap-1 mb-3">
          <MapPin size={13} className="text-amber-500 shrink-0" />
          <span className="text-xs text-gray-500">{property.location}</span>
        </div>

        <div className="flex items-center gap-4 py-3 border-y border-gray-100">
          <div className="flex items-center gap-1.5 text-gray-600">
            <Bed size={14} />
            <span className="text-xs">{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <Bath size={14} />
            <span className="text-xs">{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1.5 text-gray-600">
            <Maximize2 size={14} />
            <span className="text-xs">{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>

        {!compact && (
          <div className="mt-4 flex gap-2">
            <Link
              to={`/properties/${property.id}`}
              className="flex-1 btn-primary py-2.5 text-sm rounded-xl text-center flex items-center justify-center gap-1.5"
            >
              <Eye size={14} />
              View Details
            </Link>
            <Link
              to={`/booking?property=${property.id}`}
              className="flex-1 btn-outline py-2.5 text-sm rounded-xl text-center flex items-center justify-center gap-1.5"
            >
              <Calendar size={14} />
              Inspect
            </Link>
          </div>
        )}
        {compact && (
          <Link to={`/properties/${property.id}`} className="block mt-3 btn-primary py-2 text-sm rounded-xl text-center">
            View Property
          </Link>
        )}
      </div>
    </div>
  );
}
