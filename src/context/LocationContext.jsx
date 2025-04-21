import React, { createContext, useContext } from 'react';
import useLocation from '../hooks/useLocation';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const location = useLocation();
  
  return (
    <LocationContext.Provider value={location}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
};