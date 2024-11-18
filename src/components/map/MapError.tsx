import React from 'react';
import { AlertCircle } from 'lucide-react';

interface MapErrorProps {
  message?: string;
}

export const MapError: React.FC<MapErrorProps> = ({ 
  message = 'Failed to load Google Maps' 
}) => {
  return (
    <div className="w-full h-[500px] rounded-lg bg-red-50 flex flex-col items-center justify-center space-y-4">
      <AlertCircle className="w-12 h-12 text-red-500" />
      <p className="text-red-600 font-medium">{message}</p>
      <p className="text-red-500 text-sm">Please check your API key and try again</p>
    </div>
  );
};