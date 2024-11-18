import React from 'react';
import { Loader2 } from 'lucide-react';

export function MapLoadingState() {
  return (
    <div className="w-full h-[500px] rounded-xl bg-gray-50 flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500/20 animate-ping rounded-full" />
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin relative z-10" />
      </div>
      <div className="text-center">
        <p className="font-medium text-gray-900">Loading map...</p>
        <p className="text-sm text-gray-500">Please wait while we set things up</p>
      </div>
    </div>
  );
}