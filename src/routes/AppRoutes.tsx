import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from '../components/pages/Home';
import { DeliveryRequestForm } from '../components/delivery/DeliveryRequestForm';
import { UserProfile } from '../components/profile/UserProfile';
import { ThemeSettings } from '../components/settings/ThemeSettings';
import { NotificationHistory } from '../components/notifications/NotificationHistory';
import { BusinessHub } from '../components/pages/BusinessHub';
import { EcoHub } from '../components/pages/EcoHub';
import { MarketplaceHub } from '../components/pages/MarketplaceHub';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/delivery/new" element={<DeliveryRequestForm />} />
      <Route path="/profile" element={<UserProfile onClose={() => {}} />} />
      <Route path="/settings" element={<ThemeSettings />} />
      <Route path="/notifications" element={<NotificationHistory />} />
      <Route path="/business" element={<BusinessHub />} />
      <Route path="/eco" element={<EcoHub />} />
      <Route path="/marketplace" element={<MarketplaceHub />} />
    </Routes>
  );
}