/**
 * Performance Utilities
 * Helper functions for performance optimization
 */

/**
 * Lazy load images with Intersection Observer
 * @param {HTMLElement} img - Image element
 * @param {string} src - Image source URL
 * @param {object} options - Intersection Observer options
 */
export const lazyLoadImage = (img, src, options = {}) => {
  if (!img || !src) return;

  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.01,
  };

  const observerOptions = { ...defaultOptions, ...options };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        img.src = src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  }, observerOptions);

  observer.observe(img);
};

/**
 * Preload critical images
 * @param {string[]} imageUrls - Array of image URLs to preload
 */
export const preloadImages = (imageUrls) => {
  imageUrls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = url;
    document.head.appendChild(link);
  });
};

/**
 * Debounce function for performance
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function for performance
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
export const throttle = (func, limit = 100) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Request Animation Frame wrapper for smooth animations
 * @param {Function} callback - Callback function
 * @returns {number} Animation frame ID
 */
export const requestAnimationFrame = (callback) => {
  if (typeof window !== 'undefined' && window.requestAnimationFrame) {
    return window.requestAnimationFrame(callback);
  }
  return setTimeout(callback, 16); // Fallback to 60fps
};

/**
 * Cancel Animation Frame wrapper
 * @param {number} id - Animation frame ID
 */
export const cancelAnimationFrame = (id) => {
  if (typeof window !== 'undefined' && window.cancelAnimationFrame) {
    window.cancelAnimationFrame(id);
  } else {
    clearTimeout(id);
  }
};

/**
 * Check if device is mobile
 * @returns {boolean} True if mobile device
 */
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Check if device has slow connection
 * @returns {Promise<boolean>} True if slow connection
 */
export const isSlowConnection = async () => {
  if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      // Check effective type (4g, 3g, 2g, slow-2g)
      const effectiveType = connection.effectiveType;
      return effectiveType === 'slow-2g' || effectiveType === '2g';
    }
  }
  return false;
};

/**
 * Optimize image loading based on connection speed
 * @param {string} imageUrl - Image URL
 * @param {string} lowQualityUrl - Low quality placeholder URL
 * @returns {Promise<string>} Optimized image URL
 */
export const getOptimizedImageUrl = async (imageUrl, lowQualityUrl = null) => {
  const slow = await isSlowConnection();
  if (slow && lowQualityUrl) {
    return lowQualityUrl;
  }
  return imageUrl;
};

