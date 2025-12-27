/**
 * Application Constants and Configuration
 * Centralized configuration for base URLs and environment variables
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  SERVER_BASE_URL: import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:5000',
  TIMEOUT: 30000, // 30 seconds
};

// API Endpoints
export const API_ENDPOINTS = {
  // Public endpoints
  ABOUT: '/content/public/about',
  ACHIEVEMENTS: '/content/public/achievements',
  GALLERY: '/content/public/gallery',
  SERVICES: '/content/public/services',
  CATEGORIES: '/content/public/categories',
  CERTIFICATES: '/content/public/certificates',
  TIMELINE: '/content/public/timeline',
  TESTIMONIALS: '/content/public/testimonials',
  BOOKINGS: '/content/public/bookings',
  CONTACTS: '/content/public/contacts',
  SETTINGS: '/content/public/settings',
};

// Default fallback data
export const DEFAULT_DATA = {
  ABOUT: {
    aboutText: "We specialize in exquisite Aari embroidery, a refined handcraft using a hooked needle to create delicate chain-stitch motifs enhanced with beads, mirrors, metallic zari threads, and intricate embellishments.",
    designerName: "Vidisha",
    designerTitle: "Master Artisan & Designer",
    designerBio: "With over a decade of experience in traditional Indian embroidery and contemporary fashion design, Vidisha brings together the best of both worlds. Specializing in Aari embroidery, she creates exquisite pieces that blend traditional craftsmanship with modern aesthetics.",
    designerImage: "/vidisha.jpg"
  },
  ACHIEVEMENTS: [
    "10+ Years of Experience",
    "500+ Custom Designs Created",
    "Specialized in Bridal Wear"
  ],
};

// Performance constants
export const PERFORMANCE = {
  DEBOUNCE_DELAY: 300,
  THROTTLE_DELAY: 100,
  IMAGE_LAZY_LOAD_THRESHOLD: 0.1,
  ANIMATION_DURATION: 300,
};

export default {
  API_CONFIG,
  API_ENDPOINTS,
  DEFAULT_DATA,
  PERFORMANCE,
};

