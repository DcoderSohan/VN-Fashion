/**
 * Backend Application Constants
 * Centralized configuration for backend
 */

// Server Configuration
export const SERVER_CONFIG = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
};

// CORS Configuration
export const CORS_CONFIG = {
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// JWT Configuration
export const JWT_CONFIG = {
  SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
};

// File Upload Configuration
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
  UPLOAD_PATH: 'uploads',
};

// Database Configuration
export const DB_CONFIG = {
  URI: process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/vnfashion',
  // Note: useNewUrlParser and useUnifiedTopology are deprecated in Mongoose v6+
  // They are enabled by default, so we don't need to specify them
};

// Pagination Configuration
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

// Rate Limiting Configuration
export const RATE_LIMIT = {
  WINDOW_MS: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS: 100, // Limit each IP to 100 requests per windowMs
};

export default {
  SERVER_CONFIG,
  CORS_CONFIG,
  JWT_CONFIG,
  UPLOAD_CONFIG,
  DB_CONFIG,
  PAGINATION,
  RATE_LIMIT,
};

