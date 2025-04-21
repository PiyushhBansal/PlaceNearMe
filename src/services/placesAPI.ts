import axios from 'axios';
import { Coordinates, Place, PlaceCategory } from '../types';
import { mockPlacesData } from './mockData';

// In a real application, you would use a real Places API like Google Places API
// This is a mock implementation to demonstrate the structure
const fetchNearbyPlaces = async (
  coordinates: Coordinates,
  radius: number = 1500
): Promise<Place[]> => {
  // This is where you would make an actual API call
  // For example with Google Places API:
  /*
  const API_KEY = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates.latitude},${coordinates.longitude}&radius=${radius}&key=${API_KEY}`
  );
  return response.data.results.map(transformPlaceData);
  */

  // For demonstration, we'll return mock data with adjusted distances
  // In a real app, we would fetch from an actual API
  await new Promise(resolve => setTimeout(resolve, 700)); // Simulate network delay

  return mockPlacesData.map(place => ({
    ...place,
    // Randomize the distance for each place based on coordinates
    distance: Math.floor(
      100 + Math.random() * 1400 + 
      (Math.abs(coordinates.latitude) + Math.abs(coordinates.longitude)) % 500
    )
  }));
};

// This would transform the data from the actual API response
const transformPlaceData = (apiPlace: any): Place => {
  // This function would map API data to our Place interface
  // For example, with Google Places API:
  return {
    id: apiPlace.place_id,
    name: apiPlace.name,
    address: apiPlace.vicinity,
    distance: apiPlace.distance || 0,
    rating: apiPlace.rating || 0,
    category: mapPlaceType(apiPlace.types),
    photos: apiPlace.photos 
      ? apiPlace.photos.map((photo: any) => photo.photo_reference) 
      : [],
    priceLevel: apiPlace.price_level,
    openNow: apiPlace.opening_hours?.open_now,
    vicinity: apiPlace.vicinity
  };
};

// Map API place types to our categories
const mapPlaceType = (types: string[]): PlaceCategory => {
  if (types.includes('restaurant')) return 'restaurant';
  if (types.includes('cafe')) return 'cafe';
  if (types.includes('bar')) return 'bar';
  if (types.includes('store') || types.includes('shopping_mall')) return 'shopping';
  if (types.includes('tourist_attraction') || types.includes('museum')) return 'attraction';
  if (types.includes('lodging') || types.includes('hotel')) return 'hotel';
  if (types.includes('park')) return 'park';
  if (types.includes('gym') || types.includes('health')) return 'gym';
  return 'other';
};

export { fetchNearbyPlaces };