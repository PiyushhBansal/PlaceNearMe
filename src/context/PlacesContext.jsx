import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchNearbyPlaces } from '../services/placesAPI';
import { useLocationContext } from './LocationContext';

const PlacesContext = createContext();

export const PlacesProvider = ({ children }) => {
  const { coordinates } = useLocationContext();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  
  const filteredPlaces = React.useMemo(() => {
    return places.filter(place => {
      const categoryMatch = selectedCategory === 'all' || place.category === selectedCategory;
      const searchMatch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         place.address.toLowerCase().includes(searchQuery.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [places, selectedCategory, searchQuery]);

  const fetchNearbyPlacesHandler = async (coords) => {
    setLoading(true);
    setError(null);
    
    try {
      const placesData = await fetchNearbyPlaces(coords);
      setPlaces(placesData);
    } catch (err) {
      setError('Failed to fetch nearby places. Please try again.');
      console.error('Error fetching nearby places:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (coordinates) {
      fetchNearbyPlacesHandler(coordinates);
    }
  }, [coordinates]);

  const toggleFavorite = (placeId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(placeId)) {
        newFavorites.delete(placeId);
      } else {
        newFavorites.add(placeId);
      }
      return newFavorites;
    });
  };

  const value = {
    places,
    filteredPlaces,
    loading,
    error,
    selectedCategory,
    searchQuery,
    fetchNearbyPlaces: fetchNearbyPlacesHandler,
    setSelectedCategory,
    setSearchQuery,
    toggleFavorite,
    favorites
  };

  return (
    <PlacesContext.Provider value={value}>
      {children}
    </PlacesContext.Provider>
  );
};

export const usePlacesContext = () => {
  const context = useContext(PlacesContext);
  if (context === undefined) {
    throw new Error('usePlacesContext must be used within a PlacesProvider');
  }
  return context;
};