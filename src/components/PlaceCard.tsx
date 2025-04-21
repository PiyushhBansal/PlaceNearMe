import React from 'react';
import { MapPin, Star, Clock, DollarSign, Heart } from 'lucide-react';
import { Place } from '../types';
import { usePlacesContext } from '../context/PlacesContext';

interface PlaceCardProps {
  place: Place;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place }) => {
  const { toggleFavorite, favorites } = usePlacesContext();
  const isFavorite = favorites.has(place.id);

  // Format distance
  const formatDistance = (meters: number): string => {
    if (meters < 1000) {
      return `${meters} m`;
    }
    return `${(meters / 1000).toFixed(1)} km`;
  };

  // Render price level
  const renderPriceLevel = (level?: number) => {
    if (level === undefined) return null;
    
    const dollars = [];
    for (let i = 0; i < 4; i++) {
      dollars.push(
        <DollarSign 
          key={i} 
          className={`w-3.5 h-3.5 ${i < level ? 'text-gray-700' : 'text-gray-300'}`}
        />
      );
    }
    
    return <div className="flex">{dollars}</div>;
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
      <div className="relative h-48 overflow-hidden">
        {place.photos && place.photos.length > 0 ? (
          <img
            src={place.photos[0]}
            alt={place.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image available</span>
          </div>
        )}
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(place.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors shadow-md"
        >
          <Heart 
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
          />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-2">
          <div className="flex items-center space-x-1.5 text-white">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">{formatDistance(place.distance)}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800 line-clamp-1">{place.name}</h3>
          <div className="flex items-center space-x-1 bg-yellow-100 px-2 py-0.5 rounded text-yellow-700">
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
            <span className="text-sm font-medium">{place.rating?.toFixed(1) || 'N/A'}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mt-1 line-clamp-1">
          {place.address}
        </p>
        
        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm text-gray-500 flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{place.openNow ? 'Open now' : 'Closed'}</span>
          </div>
          
          {renderPriceLevel(place.priceLevel)}
        </div>
        
        <div className="mt-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-medium">
            {place.category.charAt(0).toUpperCase() + place.category.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;