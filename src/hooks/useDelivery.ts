import useStore from '../store/useStore';

export const useDelivery = () => {
  const store = useStore();
  
  return {
    deliveries: store.deliveries,
    bids: store.bids,
    addDelivery: store.addDelivery,
    addBid: store.addBid,
    updateDeliveryStatus: store.updateDeliveryStatus,
    updateBidStatus: store.updateBidStatus,
  };
};