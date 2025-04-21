import React from 'react';
import { MapPin, Star, DollarSign, Heart } from 'lucide-react';
import { usePlacesContext } from '../context/PlacesContext';

const PlaceCard = ({ place }) => {
  const { toggleFavorite, favorites } = usePlacesContext();
  const isFavorite = favorites.has(place.id);

  const formatDistance = (meters) => {
    return meters < 1000 ? `${meters} m` : `${(meters / 1000).toFixed(1)} km`;
  };

  const renderPriceLevel = (level) => {
    if (!level) return null;
    return (
      <div className="flex">
        {[...Array(4)].map((_, i) => (
          <DollarSign 
            key={i} 
            className={`w-3.5 h-3.5 ${i < level ? 'text-gray-700' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all">
      <div className="relative h-48">
        {place.photos?.[0] ? (
          <img
            src={place.photos[0]}
            alt={place.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">No image</span>
          </div>
        )}
        <button 
          onClick={() => toggleFavorite(place.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <div className="flex items-center text-white">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">{formatDistance(place.distance)}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800 truncate">{place.name}</h3>
          <div className="flex items-center bg-yellow-100 px-2 py-0.5 rounded">
            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500 mr-1" />
            <span className="text-sm font-medium text-yellow-700">
              {place.rating?.toFixed(1) || 'N/A'}
            </span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mt-1 truncate">{place.address}</p>
        
        <div className="mt-4 flex items-center justify-between">
          {renderPriceLevel(place.priceLevel)}
          <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-medium">
            {place.category.charAt(0).toUpperCase() + place.category.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;