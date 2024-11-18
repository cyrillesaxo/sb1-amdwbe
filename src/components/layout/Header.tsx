import React from 'react';
import { Package, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <Package className="h-8 w-8 text-blue-600" />
          <span className="ml-2 text-xl font-bold text-gray-900">GoPack</span>
        </div>

        <button
          onClick={() => navigate('/account')}
          className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-full"
        >
          {user?.profileImage ? (
            <img 
              src={user.profileImage} 
              alt={user.name} 
              className="h-8 w-8 rounded-full"
            />
          ) : (
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-blue-600" />
            </div>
          )}
        </button>
      </div>
    </header>
  );
}