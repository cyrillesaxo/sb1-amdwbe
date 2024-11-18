import { Platform } from '../types';

export const SUPPORTED_PLATFORMS: Platform[] = [
  {
    id: 'shopify',
    name: 'Shopify',
    icon: 'shopping-bag',
    apiVersion: '2024-01',
    scopes: ['read_orders', 'write_orders', 'read_shipping'],
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    icon: 'shopping-cart',
    apiVersion: 'wc/v3',
    scopes: ['read_write'],
  },
  {
    id: 'wix',
    name: 'Wix',
    icon: 'grid',
    apiVersion: 'v1',
    scopes: ['orders.read_write', 'shipping.read_write'],
  },
];

export const POSTAL_SERVICES = [
  {
    id: 'usps',
    name: 'USPS',
    country: 'US',
    trackingUrlPattern: 'https://tools.usps.com/go/TrackConfirmAction?tLabels={tracking}',
    apiEndpoint: 'https://secure.shippingapis.com/ShippingAPI.dll',
  },
  {
    id: 'royal-mail',
    name: 'Royal Mail',
    country: 'GB',
    trackingUrlPattern: 'https://www.royalmail.com/track-your-item#{tracking}',
    apiEndpoint: 'https://api.royalmail.net/shipping/v3',
  },
  {
    id: 'australia-post',
    name: 'Australia Post',
    country: 'AU',
    trackingUrlPattern: 'https://auspost.com.au/mypost/track/#/details/{tracking}',
    apiEndpoint: 'https://digitalapi.auspost.com.au/shipping/v1',
  },
];

export const DEFAULT_CURRENCY = 'USD';
export const SUPPORTED_CURRENCIES = ['USD', 'EUR', 'GBP', 'AUD', 'CAD', 'JPY'];