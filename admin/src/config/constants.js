/**
 * Admin Application Constants and Configuration
 * Centralized configuration for base URLs and environment variables
 */

// API Configuration
// Using local fallback in development and dynamic relative paths in production to prevent hardcoding issues
export const API_CONFIG = {
  BASE_URL: import.meta.env.DEV
    ? (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api')
    : '/api',
  SERVER_BASE_URL: import.meta.env.DEV
    ? (import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:5000')
    : window.location.origin,
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
  CLASS_BANNERS: '/content/class-banners',
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

