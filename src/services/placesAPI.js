import { mockPlacesData } from './mockData';

const fetchNearbyPlaces = async (coordinates, radius = 1500) => {
  await new Promise(resolve => setTimeout(resolve, 700));

  return mockPlacesData.map(place => ({
    ...place,
    distance: Math.floor(
      100 + Math.random() * 1400 + 
      (Math.abs(coordinates.latitude) + Math.abs(coordinates.longitude)) % 500
    )
  }));
};

export { fetchNearbyPlaces };