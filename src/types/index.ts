export interface Place {
  id: string;
  name: string;
  address: string;
  distance: number; // in meters
  rating: number;
  category: PlaceCategory;
  photos: string[];
  priceLevel?: number; // 1-4, where 1 is least expensive
  openNow?: boolean;
  vicinity?: string;
}

export type PlaceCategory = 
  | 'restaurant' 
  | 'cafe' 
  | 'bar' 
  | 'shopping' 
  | 'attraction' 
  | 'hotel' 
  | 'park' 
  | 'gym' 
  | 'other';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LocationContextType {
  coordinates: Coordinates | null;
  locationLoading: boolean;
  locationError: string | null;
  requestLocation: () => void;
}

export interface PlacesContextType {
  places: Place[];
  filteredPlaces: Place[];
  loading: boolean;
  error: string | null;
  selectedCategory: PlaceCategory | 'all';
  searchQuery: string;
  fetchNearbyPlaces: (coords: Coordinates) => Promise<void>;
  setSelectedCategory: (category: PlaceCategory | 'all') => void;
  setSearchQuery: (query: string) => void;
  toggleFavorite: (placeId: string) => void;
  favorites: Set<string>;
}