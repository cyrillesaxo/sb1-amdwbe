import React, { createContext, useContext } from 'react';

interface DeliveryContextType {
  deliveries: any[];
  addDelivery: (delivery: any) => void;
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

export function DeliveryProvider({ children }: { children: React.ReactNode }) {
  const [deliveries, setDeliveries] = React.useState<any[]>([]);

  const addDelivery = (delivery: any) => {
    setDeliveries(prev => [...prev, delivery]);
  };

  return (
    <DeliveryContext.Provider value={{ deliveries, addDelivery }}>
      {children}
    </DeliveryContext.Provider>
  );
}

export function useDelivery() {
  const context = useContext(DeliveryContext);
  if (!context) {
    throw new Error('useDelivery must be used within a DeliveryProvider');
  }
  return context;
}