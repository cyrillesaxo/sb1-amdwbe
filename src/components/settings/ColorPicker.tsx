import React, { useState } from 'react';
import { useThemeStore } from '../../store/themeStore';

interface ColorPickerProps {
  label: string;
  colorKey: keyof ThemeState['customColors'];
  initialColor: string;
}

export function ColorPicker({ label, colorKey, initialColor }: ColorPickerProps) {
  const { setCustomColor } = useThemeStore();
  const [showPicker, setShowPicker] = useState(false);
  const [currentColor, setCurrentColor] = useState(initialColor);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCurrentColor(newColor);
    setCustomColor(colorKey, newColor);
  };

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="mt-1 flex items-center space-x-2">
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="w-10 h-10 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          style={{ backgroundColor: currentColor }}
        />
        <input
          type="text"
          value={currentColor}
          onChange={(e) => handleColorChange({ target: { value: e.target.value } } as any)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          placeholder="#000000"
        />
        {showPicker && (
          <div className="absolute z-10 mt-2 bg-white rounded-lg shadow-lg p-4 dark:bg-gray-800">
            <input
              type="color"
              value={currentColor}
              onChange={handleColorChange}
              className="w-48 h-48"
            />
          </div>
        )}
      </div>
    </div>
  );
}