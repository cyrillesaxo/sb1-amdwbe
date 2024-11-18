import React from 'react';
import type { User } from '../../types';

interface ProfileHistoryProps {
  user: User;
}

export default function ProfileHistory({ user }: ProfileHistoryProps) {
  return (
    <div className="space-y-4">
      {user.deliveryHistory?.map((delivery) => (
        <div key={delivery.id} className="bg-gray-50 p-4 rounded-lg">
          <div className="flex justify-between items-start">
            <div>
              <p className="font-medium text-gray-900">
                {delivery.from} → {delivery.to}
              </p>
              <p className="text-sm text-gray-500">{delivery.date}</p>
            </div>
            <span className={`px-2 py-1 text-xs font-medium rounded ${
              delivery.status === 'completed' 
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {delivery.status}
            </span>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700">Items:</p>
            <div className="mt-2 space-y-2">
              {delivery.items.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} ({item.weight})
                  </span>
                  <span className="text-gray-600">x{item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}