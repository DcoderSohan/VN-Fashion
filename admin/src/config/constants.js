/**
 * Admin Application Constants and Configuration
 * Centralized configuration for base URLs and environment variables
 */

// API Configuration
// In production, use relative paths (same domain)
// In development, use localhost
const isProduction = import.meta.env.PROD;
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || (isProduction ? '/api' : 'http://localhost:5000/api'),
  SERVER_BASE_URL: import.meta.env.VITE_SERVER_BASE_URL || (isProduction ? '' : 'http://localhost:5000'),
  TIMEOUT: 30000, // 30 seconds
};

// API Endpoints
export const API_ENDPOINTS = {
  // Admin endpoints
  ADMIN_PROFILE: '/admin/profile',
  ADMIN_LOGIN: '/admin/login',
  ADMIN_REGISTER: '/admin/register',
  
  // Content endpoints
  GALLERY: '/content/gallery',
  ABOUT: '/content/about',
  ACHIEVEMENTS: '/content/achievements',
  TIMELINE: '/content/timeline',
  SERVICES: '/content/services',
  CATEGORIES: '/content/categories',
  BOOKINGS: '/content/bookings',
  CONTACTS: '/content/contacts',
  CERTIFICATES: '/content/certificates',
  TESTIMONIALS: '/content/testimonials',
  SETTINGS: '/content/settings',
  UPLOAD_IMAGE: '/content/upload-image',
};

// Storage keys
export const STORAGE_KEYS = {
  ADMIN_TOKEN: 'adminToken',
  CURRENT_ADMIN: 'currentAdmin',
};

// Performance constants
export const PERFORMANCE = {
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 100,
  REFRESH_INTERVAL: 30000, // 30 seconds
  ANIMATION_DURATION: 300,
};

export default {
  API_CONFIG,
  API_ENDPOINTS,
  STORAGE_KEYS,
  PERFORMANCE,
};

