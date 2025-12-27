import axios from 'axios';

// Get base URL for API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL || 'http://localhost:5000';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Helper function to get full image URL (handles both local and external URLs)
export const getImageUrl = (url) => {
  if (!url) return '';
  // If it's already a full URL (http/https), return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  // If it's a local upload path, prepend server base URL
  if (url.startsWith('/api/uploads/')) {
    return `${SERVER_BASE_URL}${url}`;
  }
  // Otherwise return as is
  return url;
};

// Content API functions
export const contentApi = {
  // Get About content (public endpoint)
  getAbout: async () => {
    try {
      const response = await api.get('/content/public/about');
      return response.data;
    } catch (error) {
      console.error('Error fetching about content:', error);
      // Return default values if API fails
      return {
        aboutText: "We specialize in exquisite Aari embroidery, a refined handcraft using a hooked needle to create delicate chain-stitch motifs enhanced with beads, mirrors, metallic zari threads, and intricate embellishments.",
        designerName: "Vidisha",
        designerTitle: "Master Artisan & Designer",
        designerBio: "With over a decade of experience in traditional Indian embroidery and contemporary fashion design, Vidisha brings together the best of both worlds. Specializing in Aari embroidery, she creates exquisite pieces that blend traditional craftsmanship with modern aesthetics.",
        designerImage: "/vidisha.jpg"
      };
    }
  },
  
  // Get Achievements (public endpoint)
  getAchievements: async () => {
    try {
      const response = await api.get('/content/public/achievements');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching achievements:', error);
      // Return default values if API fails
      return [
        "10+ Years of Experience",
        "500+ Custom Designs Created",
        "Specialized in Bridal Wear"
      ];
    }
  },

  // Get Gallery items (public endpoint)
  getGallery: async () => {
    try {
      const response = await api.get('/content/public/gallery');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching gallery:', error);
      return [];
    }
  },

  // Get Services (public endpoint)
  getServices: async () => {
    try {
      const response = await api.get('/content/public/services');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  },

  // Get Categories (public endpoint)
  getCategories: async () => {
    try {
      const response = await api.get('/content/public/categories');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  },

  // Get Certificates (public endpoint)
  getCertificates: async () => {
    try {
      const response = await api.get('/content/public/certificates');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching certificates:', error);
      return [];
    }
  },

  // Get Timeline (public endpoint)
  getTimeline: async () => {
    try {
      const response = await api.get('/content/public/timeline');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching timeline:', error);
      return [];
    }
  },

  // Get Testimonials (public endpoint)
  getTestimonials: async () => {
    try {
      const response = await api.get('/content/public/testimonials');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
  },

  // Get Services (public endpoint)
  getServices: async () => {
    try {
      const response = await api.get('/content/public/services');
      return response.data || [];
    } catch (error) {
      console.error('Error fetching services:', error);
      return [];
    }
  },

  // Create Booking (public endpoint - no auth required)
  createBooking: async (bookingData) => {
    try {
      const response = await api.post('/content/public/bookings', bookingData);
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Create Contact (public endpoint - no auth required)
  createContact: async (contactData) => {
    try {
      const response = await api.post('/content/public/contacts', contactData);
      return response.data;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  },

  // Get Settings (public endpoint)
  getSettings: async () => {
    try {
      const response = await api.get('/content/public/settings');
      return response;
    } catch (error) {
      console.error('Error fetching settings:', error);
      throw error;
    }
  },
};

export default api;
