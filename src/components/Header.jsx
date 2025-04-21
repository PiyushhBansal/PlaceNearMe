import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import { useLocationContext } from '../context/LocationContext';
import { usePlacesContext } from '../context/PlacesContext';

const Header = () => {
  const { coordinates, locationLoading, locationError, requestLocation } = useLocationContext();
  const { setSearchQuery } = usePlacesContext();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <MapPin className="w-8 h-8 text-white" />
            <h1 className="text-2xl font-bold">Places Near Me</h1>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative flex-grow">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search places..."
                  className="w-full py-2 pl-10 pr-4 rounded-lg bg-white/10 backdrop-blur-sm text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 placeholder-white/60"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-white/70" />
              </form>
            </div>
            
            <button
              onClick={requestLocation}
              disabled={locationLoading}
              className="flex items-center justify-center px-4 py-2 rounded-lg bg-white/15 hover:bg-white/25 transition-all backdrop-blur-sm text-white"
            >
              {locationLoading ? (
                <span className="flex items-center gap-2">Loading...</span>
              ) : (
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {coordinates ? 'Refresh Location' : 'Get My Location'}
                </span>
              )}
            </button>
          </div>
        </div>
        
        {locationError && (
          <div className="mt-2 px-4 py-2 bg-red-500/70 backdrop-blur-sm rounded-lg text-sm">
            {locationError}
          </div>
        )}
        
        {coordinates && (
          <div className="mt-2 text-sm text-white/70">
            Found you at coordinates: {coordinates.latitude.toFixed(4)}, {coordinates.longitude.toFixed(4)}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;