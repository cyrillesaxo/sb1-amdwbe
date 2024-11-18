import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/layout/Header';
import { Navigation } from './components/layout/Navigation';
import Home from './components/pages/Home';
import Services from './components/pages/Services';
import Activity from './components/pages/Activity';
import Account from './components/pages/Account';
import DeliveryRequestForm from './components/delivery/DeliveryRequestForm';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 pb-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/account" element={<Account />} />
          <Route path="/delivery/new" element={<DeliveryRequestForm />} />
        </Routes>
      </main>
      <Navigation />
      <Toaster />
    </div>
  );
}