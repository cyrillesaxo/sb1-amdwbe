import React from 'react';
import { Shield } from 'lucide-react';

export function TrustBanner() {
  return (
    <div className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center mb-4">
          <Shield className="h-8 w-8 text-green-400 mr-2" />
          <h2 className="text-2xl font-bold">Trusted by Thousands</h2>
        </div>
        <p className="text-gray-400 mb-6">
          Join our community of satisfied customers who trust us with their deliveries
        </p>
        <div className="grid grid-cols-3 gap-8">
          <div>
            <div className="text-3xl font-bold text-green-400">99.9%</div>
            <div className="text-sm text-gray-400">Delivery Success Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">15K+</div>
            <div className="text-sm text-gray-400">Active Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-400">4.9/5</div>
            <div className="text-sm text-gray-400">Customer Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}