/**
 * Helper Utility Functions
 * Reusable utility functions for the application
 */
import { API_CONFIG } from '../config/constants';

/**
 * Get full image URL (handles both local and external URLs)
 * @param {string} url - Image URL
 * @returns {string} Full image URL
 */
export const getImageUrl = (url) => {
  if (!url) return '';
  
  // If it's already a full URL (http/https), return as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  
  // If it's a local upload path, prepend server base URL
  if (url.startsWith('/api/uploads/')) {
    return `${API_CONFIG.SERVER_BASE_URL}${url}`;
  }
  
  // Otherwise return as is
  return url;
};

/**
 * Format price with rupee symbol
 * @param {string|number} price - Price value
 * @returns {string} Formatted price
 */
export const formatPrice = (price) => {
  if (!price) return '';
  const priceStr = String(price).trim();
  if (priceStr.startsWith('₹')) {
    return priceStr;
  }
  return `₹ ${priceStr}`;
};

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
};

/**
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit = 100) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean} True if valid
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate Gmail format
 * @param {string} email - Email address
 * @returns {boolean} True if valid Gmail
 */
export const validateGmail = (email) => {
  return email.includes('@gmail.com') && validateEmail(email);
};

/**
 * Format phone number
 * @param {string} phone - Phone number
 * @returns {string} Formatted phone number
 */
export const formatPhone = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned}`;
  }
  return phone;
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Scroll to element smoothly
 * @param {string|HTMLElement} element - Element selector or element
 * @param {object} options - Scroll options
 */
export const scrollToElement = (element, options = {}) => {
  const el = typeof element === 'string' 
    ? document.querySelector(element) 
    : element;
  
  if (el) {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      ...options,
    });
  }
};

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @param {number} threshold - Threshold (0-1)
 * @returns {boolean} True if in viewport
 */
export const isInViewport = (element, threshold = 0) => {
  if (!element) return false;
  
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  
  return (
    rect.top >= -threshold * rect.height &&
    rect.left >= -threshold * rect.width &&
    rect.bottom <= windowHeight + threshold * rect.height &&
    rect.right <= windowWidth + threshold * rect.width
  );
};

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Deep clone object
 * @param {any} obj - Object to clone
 * @returns {any} Cloned object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Sleep/delay function
 * @param {number} ms - Milliseconds to sleep
 * @returns {Promise} Promise that resolves after delay
 */
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

