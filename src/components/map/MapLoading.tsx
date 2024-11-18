import React from 'react';
import { Loader2 } from 'lucide-react';

export const MapLoading: React.FC = () => {
  return (
    <div className="w-full h-[500px] rounded-lg bg-gray-50 flex flex-col items-center justify-center space-y-4">
      <Loader2 className="w-12 h-12 text-indigo-500 animate-spin" />
      <p className="text-gray-600 font-medium">Loading map...</p>
    </div>
  );
};