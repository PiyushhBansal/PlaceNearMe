import { useState, useEffect, useCallback } from 'react';
import { Coordinates } from '../types';

const useLocation = () => {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setLocationLoading(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLocationLoading(false);
      },
      (error) => {
        setLocationError(
          error.code === 1
            ? 'You denied location access. Please enable it to see places near you.'
            : 'Unable to retrieve your location. Please try again.'
        );
        setLocationLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  // Request location on initial load
  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  return {
    coordinates,
    locationLoading,
    locationError,
    requestLocation,
  };
};

export default useLocation;