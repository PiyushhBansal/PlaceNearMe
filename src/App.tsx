import React from 'react';
import { LocationProvider } from './context/LocationContext';
import { PlacesProvider } from './context/PlacesContext';
import HomePage from './pages/HomePage';

function App() {
  return (
    <LocationProvider>
      <PlacesProvider>
        <HomePage />
      </PlacesProvider>
    </LocationProvider>
  );
}

export default App;