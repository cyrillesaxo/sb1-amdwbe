import React from 'react';
import { Home, Package, Clock, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Navigation() {
  const location = useLocation();

  const tabs = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/services', icon: Package, label: 'Services' },
    { path: '/activity', icon: Clock, label: 'Activity' },
    { path: '/account', icon: User, label: 'Account' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="max-w-lg mx-auto">
        <div className="flex justify-around">
          {tabs.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`flex flex-col items-center py-2 px-4 ${
                  isActive 
                    ? 'text-blue-600' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs mt-1">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}