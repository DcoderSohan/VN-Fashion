/**
 * Content API Functions
 * Optimized API calls using centralized axios instance and constants
 */
import axiosInstance from './axiosInstance';
import { API_ENDPOINTS, DEFAULT_DATA } from '../config/constants';

// Helper function to handle API errors with fallback
const handleApiError = (error, fallback) => {
  console.error('API Error:', error);
  return fallback;
};

// Content API functions
export const contentApi = {
  // Get About content (public endpoint)
  getAbout: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ABOUT);
      return response.data;
    } catch (error) {
      return handleApiError(error, DEFAULT_DATA.ABOUT);
    }
  },
  
  // Get Achievements (public endpoint)
  getAchievements: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.ACHIEVEMENTS);
      return response.data || [];
    } catch (error) {
      return handleApiError(error, DEFAULT_DATA.ACHIEVEMENTS);
    }
  },

  // Get Gallery items (public endpoint)
  getGallery: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.GALLERY);
      return response.data || [];
    } catch (error) {
      return handleApiError(error, []);
    }
  },

  // Get Services (public endpoint)
  getServices: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.SERVICES);
      return response.data || [];
    } catch (error) {
      return handleApiError(error, []);
    }
  },

  // Get Categories (public endpoint)
  getCategories: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.CATEGORIES);
      return response.data || [];
    } catch (error) {
      return handleApiError(error, []);
    }
  },

  // Get Certificates (public endpoint)
  getCertificates: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.CERTIFICATES);
      return response.data || [];
    } catch (error) {
      return handleApiError(error, []);
    }
  },

  // Get Timeline (public endpoint)
  getTimeline: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.TIMELINE);
      return response.data || [];
    } catch (error) {
      return handleApiError(error, []);
    }
  },

  // Get Testimonials (public endpoint)
  getTestimonials: async () => {
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.TESTIMONIALS);
      return response.data || [];
    } catch (error) {
      return handleApiError(error, []);
    }
  },

  // Create Booking (public endpoint - no auth required)
  createBooking: async (bookingData) => {
    const response = await axiosInstance.post(API_ENDPOINTS.BOOKINGS, bookingData);
    return response.data;
  },

  // Create Contact (public endpoint - no auth required)
  createContact: async (contactData) => {
    const response = await axiosInstance.post(API_ENDPOINTS.CONTACTS, contactData);
    return response.data;
  },

  // Get Settings (public endpoint)
  getSettings: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.SETTINGS);
    return response;
  },
};

// Re-export axios instance and helpers
export { default as axiosInstance } from './axiosInstance';
export * from './helpers';

export default axiosInstance;
