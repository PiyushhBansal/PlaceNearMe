import React from 'react';
import { AlertTriangle, MapPin } from 'lucide-react';
import { useLocationContext } from '../context/LocationContext';

const LocationError: React.FC = () => {
  const { locationError, requestLocation } = useLocationContext();
  
  if (!locationError) return null;
  
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <AlertTriangle className="w-12 h-12 text-amber-500 mb-4" />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Location Access Required</h2>
      <p className="text-gray-600 max-w-md mb-6">
        {locationError}
      </p>
      <button
        onClick={requestLocation}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-colors duration-200 flex items-center space-x-2"
      >
        <MapPin className="w-5 h-5" />
        <span>Enable Location Access</span>
      </button>
      <p className="mt-4 text-sm text-gray-500 max-w-md">
        This app uses your location to find nearby places. Your location data is only used within this app and is never stored or shared.
      </p>
    </div>
  );
};

export default LocationError;