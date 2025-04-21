import React from 'react';
import { usePlacesContext } from '../context/PlacesContext';
import PlaceCard from './PlaceCard';
import { MapPin, Loader } from 'lucide-react';

const PlacesList = () => {
  const { filteredPlaces, loading, error, selectedCategory } = usePlacesContext();
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader className="w-10 h-10 text-blue-500 animate-spin mb-4" />
        <p className="text-gray-600">Finding the best places near you...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center px-4">
        <div className="bg-red-100 p-4 rounded-lg text-red-700 mb-4">
          <p>{error}</p>
          <p className="text-sm mt-2">Please check your internet connection and try again.</p>
        </div>
      </div>
    );
  }
  
  if (filteredPlaces.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center px-4">
        <MapPin className="w-10 h-10 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-700">No places found</h3>
        <p className="text-gray-500 mt-2 max-w-md">
          {selectedCategory !== 'all' 
            ? `We couldn't find any ${selectedCategory}s near your location. Try a different category or expand your search radius.` 
            : 'We couldn\'t find any places matching your search criteria. Try changing your filters or search query.'}
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
      {filteredPlaces.map((place) => (
        <PlaceCard key={place.id} place={place} />
      ))}
    </div>
  );
};

export default PlacesList;