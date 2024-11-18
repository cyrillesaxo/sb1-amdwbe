import React from 'react';

// Helper function to create the 3D card effect container
const IconContainer = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`w-16 h-16 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-3 transform transition-all hover:scale-105 hover:shadow-xl ${className}`}>
    {children}
  </div>
);

export const RideIcon = () => (
  <IconContainer className="from-blue-50 to-white">
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path
        d="M20 10h-2V8a4 4 0 00-4-4H6a4 4 0 00-4 4v8a2 2 0 002 2h1a3 3 0 006 0h4a3 3 0 006 0h1a2 2 0 002-2v-4a2 2 0 00-2-2z"
        fill="#60A5FA"
        filter="url(#shadow)"
      />
      <path
        d="M7 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM17 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        fill="#2563EB"
      />
      <defs>
        <filter id="shadow" x="-2" y="-2" width="28" height="28" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.3" />
        </filter>
      </defs>
    </svg>
  </IconContainer>
);

export const DeliveryIcon = () => (
  <IconContainer className="from-green-50 to-white">
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path
        d="M21 14h-1V8a3 3 0 00-3-3H3a1 1 0 00-1 1v10a2 2 0 002 2h1a3 3 0 006 0h4a3 3 0 006 0h1a1 1 0 001-1v-2a1 1 0 00-1-1z"
        fill="#4ADE80"
        filter="url(#shadow)"
      />
      <path
        d="M8 17a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM18 17a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        fill="#16A34A"
      />
      <defs>
        <filter id="shadow" x="-2" y="-2" width="28" height="28" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.3" />
        </filter>
      </defs>
    </svg>
  </IconContainer>
);

export const TimeIcon = () => (
  <IconContainer className="from-purple-50 to-white">
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <circle
        cx="12"
        cy="12"
        r="9"
        fill="#A78BFA"
        filter="url(#shadow)"
      />
      <path
        d="M12 6v6l4 2"
        stroke="#7C3AED"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <filter id="shadow" x="-2" y="-2" width="28" height="28" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.3" />
        </filter>
      </defs>
    </svg>
  </IconContainer>
);

export const LocationIcon = () => (
  <IconContainer className="from-red-50 to-white">
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        fill="#F87171"
        filter="url(#shadow)"
      />
      <circle
        cx="12"
        cy="9"
        r="2.5"
        fill="#DC2626"
      />
      <defs>
        <filter id="shadow" x="-2" y="-2" width="28" height="28" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.3" />
        </filter>
      </defs>
    </svg>
  </IconContainer>
);

export const GroupIcon = () => (
  <IconContainer className="from-indigo-50 to-white">
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path
        d="M17 7c0 2.76-2.24 5-5 5S7 9.76 7 7s2.24-5 5-5 5 2.24 5 5z"
        fill="#818CF8"
        filter="url(#shadow)"
      />
      <path
        d="M21 19v1a2 2 0 01-2 2H5a2 2 0 01-2-2v-1c0-3.87 3.13-7 7-7h4c3.87 0 7 3.13 7 7z"
        fill="#6366F1"
        filter="url(#shadow)"
      />
      <defs>
        <filter id="shadow" x="-2" y="-2" width="28" height="28" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.3" />
        </filter>
      </defs>
    </svg>
  </IconContainer>
);

export const RentalIcon = () => (
  <IconContainer className="from-amber-50 to-white">
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
      <path
        d="M19 5h-4V3H9v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2z"
        fill="#FCD34D"
        filter="url(#shadow)"
      />
      <path
        d="M12 8v5l4.25 2.52.75-1.28-3.5-2.07V8z"
        fill="#F59E0B"
      />
      <defs>
        <filter id="shadow" x="-2" y="-2" width="28" height="28" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="1" stdDeviation="1" floodOpacity="0.3" />
        </filter>
      </defs>
    </svg>
  </IconContainer>
);