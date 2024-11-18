import React from 'react';
import type { Location } from '../../types';

interface LocationInputProps {
  label: string;
  value: Location;
  onChange: (location: Location) => void;
}

export function LocationInput({ label, value, onChange }: LocationInputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        value={value.address}
        onChange={(e) => onChange({ ...value, address: e.target.value })}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        placeholder="Enter address"
      />
    </div>
  );
}