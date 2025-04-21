import React from 'react';

const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] py-16">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-blue-500 rounded-full animate-spin absolute top-0 left-0 border-t-transparent"></div>
      </div>
      <p className="text-gray-600 mt-6 text-lg">Finding places near you...</p>
      <div className="space-y-2 mt-8 w-full max-w-md px-4">
        <div className="h-2 bg-blue-100 rounded animate-pulse"></div>
        <div className="h-2 bg-blue-100 rounded animate-pulse w-5/6"></div>
        <div className="h-2 bg-blue-100 rounded animate-pulse w-4/6"></div>
      </div>
    </div>
  );
};

export default LoadingState;