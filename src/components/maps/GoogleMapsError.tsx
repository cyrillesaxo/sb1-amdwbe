import React from 'react';
import { AlertCircle } from 'lucide-react';

interface GoogleMapsErrorProps {
  message: string;
}

export function GoogleMapsError({ message }: GoogleMapsErrorProps) {
  return (
    <div className="rounded-lg bg-red-50 p-6">
      <div className="flex items-center">
        <AlertCircle className="h-6 w-6 text-red-500 mr-3" />
        <h3 className="text-lg font-medium text-red-800">Google Maps Error</h3>
      </div>
      <div className="mt-4">
        <p className="text-sm text-red-600">{message}</p>
        <div className="mt-4 text-sm text-red-700">
          Please make sure:
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Google Maps API key is correctly configured</li>
            <li>Required Google Maps APIs are enabled in your project</li>
            <li>Your billing account is set up and active</li>
          </ul>
        </div>
      </div>
    </div>
  );
}