import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchNearbyPlaces } from '../services/placesAPI';
import { Place, PlaceCategory, Coordinates, PlacesContextType } from '../types';
import { useLocationContext } from './LocationContext';

const PlacesContext = createContext<PlacesContextType | undefined>(undefined);

export const PlacesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { coordinates } = useLocationContext();
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<PlaceCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  
  // Derived state for filtered places
  const filteredPlaces = React.useMemo(() => {
    return places.filter(place => {
      // Filter by category
      const categoryMatch = 
        selectedCategory === 'all' || place.category === selectedCategory;
      
      // Filter by search query
      const searchMatch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         place.address.toLowerCase().includes(searchQuery.toLowerCase());
      
      return categoryMatch && searchMatch;
    });
  }, [places, selectedCategory, searchQuery]);

  const fetchNearbyPlacesHandler = async (coords: Coordinates) => {
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

  // Fetch places when coordinates change
  useEffect(() => {
    if (coordinates) {
      fetchNearbyPlacesHandler(coordinates);
    }
  }, [coordinates]);

  const toggleFavorite = (placeId: string) => {
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

  const value: PlacesContextType = {
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

export const usePlacesContext = (): PlacesContextType => {
  const context = useContext(PlacesContext);
  if (context === undefined) {
    throw new Error('usePlacesContext must be used within a PlacesProvider');
  }
  return context;
};