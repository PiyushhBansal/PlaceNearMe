import React from 'react';
import Header from '../components/Header';
import CategoryFilter from '../components/CategoryFilter';
import PlacesList from '../components/PlacesList';
import LocationError from '../components/LocationError';
import LoadingState from '../components/LoadingState';
import { useLocationContext } from '../context/LocationContext';

const HomePage = () => {
  const { coordinates, locationLoading, locationError } = useLocationContext();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow container mx-auto">
        {locationLoading ? (
          <LoadingState />
        ) : locationError ? (
          <LocationError />
        ) : !coordinates ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <p className="text-gray-600">Waiting for location permission...</p>
          </div>
        ) : (
          <>
            <CategoryFilter />
            <PlacesList />
          </>
        )}
      </main>
      
      <footer className="bg-white py-4 mt-auto border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Places Near Me | Find the best spots around you</p>
          <p className="mt-1 text-xs text-gray-400">
            Using mock data for demonstration. Connect to a real places API for production.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;