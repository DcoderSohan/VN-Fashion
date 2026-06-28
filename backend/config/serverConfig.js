import dotenv from "dotenv";
dotenv.config();

export const SERVER_CONFIG = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  BACKEND_URL: process.env.BACKEND_URL || `http://localhost:${process.env.PORT || 5000}`,
  FRONTEND_URL: process.env.FRONTEND_URL,
};

export const DB_CONFIG = {
  URI: process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/vnfashion',
};

export const JWT_CONFIG = {
  SECRET: process.env.JWT_SECRET || 'dev-secret-key-change-in-production-' + Date.now(),
  EXPIRES_IN: process.env.JWT_EXPIRE || '7d',
};

export const CORS_CONFIG = {
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

export const CLOUDINARY_CONFIG = {
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  API_KEY: process.env.CLOUDINARY_API_KEY,
  API_SECRET: process.env.CLOUDINARY_API_SECRET,
};
