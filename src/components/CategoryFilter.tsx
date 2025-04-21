import React from 'react';
import { 
  UtensilsCrossed, Coffee, Beer, ShoppingBag, Landmark, 
  Hotel, Trees, Dumbbell, Grid
} from 'lucide-react';
import { PlaceCategory } from '../types';
import { usePlacesContext } from '../context/PlacesContext';

const categories: { id: PlaceCategory | 'all'; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All', icon: <Grid className="w-5 h-5" /> },
  { id: 'restaurant', label: 'Restaurants', icon: <UtensilsCrossed className="w-5 h-5" /> },
  { id: 'cafe', label: 'Cafés', icon: <Coffee className="w-5 h-5" /> },
  { id: 'bar', label: 'Bars', icon: <Beer className="w-5 h-5" /> },
  { id: 'shopping', label: 'Shopping', icon: <ShoppingBag className="w-5 h-5" /> },
  { id: 'attraction', label: 'Attractions', icon: <Landmark className="w-5 h-5" /> },
  { id: 'hotel', label: 'Hotels', icon: <Hotel className="w-5 h-5" /> },
  { id: 'park', label: 'Parks', icon: <Trees className="w-5 h-5" /> },
  { id: 'gym', label: 'Gyms', icon: <Dumbbell className="w-5 h-5" /> }
];

const CategoryFilter: React.FC = () => {
  const { selectedCategory, setSelectedCategory } = usePlacesContext();
  
  return (
    <div className="py-4 overflow-x-auto">
      <div className="flex space-x-2 min-w-max px-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center px-3 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap
              ${selectedCategory === category.id 
                ? 'bg-blue-500 text-white shadow-md' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            <span className="mr-1.5">{category.icon}</span>
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;