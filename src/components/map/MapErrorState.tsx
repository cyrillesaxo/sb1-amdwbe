import React from 'react';
import { AlertCircle } from 'lucide-react';

interface MapErrorStateProps {
  error: Error | string;
}

export function MapErrorState({ error }: MapErrorStateProps) {
  const errorMessage = error instanceof Error ? error.message : error;

  return (
    <div className="w-full h-[500px] rounded-lg bg-red-50 flex flex-col items-center justify-center space-y-4">
      <AlertCircle className="w-12 h-12 text-red-500" />
      <div className="text-center px-4">
        <h3 className="text-lg font-medium text-red-800 mb-2">Failed to load map</h3>
        <p className="text-sm text-red-600">{errorMessage}</p>
      </div>
    </div>
  );
}