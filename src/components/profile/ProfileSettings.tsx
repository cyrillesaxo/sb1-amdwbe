import React from 'react';
import { ThemeSettings } from '../settings/ThemeSettings';
import { LanguageSettings } from '../settings/LanguageSettings';

export default function ProfileSettings() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <ThemeSettings />
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <LanguageSettings />
      </div>
    </div>
  );
}