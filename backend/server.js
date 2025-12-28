import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { SERVER_CONFIG, CORS_CONFIG } from "./config/constants.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

// Validate required environment variables (with fallbacks for development)
if (!process.env.JWT_SECRET) {
  console.warn("⚠️  WARNING: JWT_SECRET is not defined in .env file");
  console.warn("   Using default secret for development. Please add JWT_SECRET to .env for production!");
  process.env.JWT_SECRET = 'dev-secret-key-change-in-production-' + Date.now();
}

if (!process.env.MONGO_URI) {
  console.warn("⚠️  WARNING: MONGO_URI is not defined in .env file");
  console.warn("   Using default MongoDB URI. Please add MONGO_URI to .env!");
  process.env.MONGO_URI = 'mongodb://localhost:27017/vnfashion';
}

// Validate Cloudinary configuration (required)
// Note: Cloudinary will be configured lazily when first used, but we validate here to fail fast
if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error("❌ ERROR: Cloudinary configuration is required!");
  console.error("   Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to your .env file");
  process.exit(1);
}

connectDB();

const app = express();

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware - Optimized
app.use(cors(CORS_CONFIG));
app.use(express.json({ limit: '10mb' })); // Limit JSON payload size
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Limit URL-encoded payload size

// Static file serving removed - all images are served from Cloudinary

//Routes - MUST be registered BEFORE static file serving
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/content", contentRoutes);

// -------- SERVE FRONTENDS (Production) --------
// Only serve static files in production
if (process.env.NODE_ENV === 'production') {
  // Get the root directory (parent of backend folder)
  const rootDir = path.resolve(__dirname, '..');
  
  // Serve frontend (client) - root path
  app.use(express.static(path.join(rootDir, 'frontend/dist')));
  
  // Serve admin - /admin path
  app.use('/admin', express.static(path.join(rootDir, 'admin/dist')));
  
  // Admin routing fix - handle all /admin/* routes (must be before catch-all)
  app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(rootDir, 'admin/dist/index.html'));
  });
  
  // Client routing fix - handle all other routes (SPA routing)
  // This must be LAST to catch all non-API routes
  app.get('*', (req, res) => {
    // Don't serve index.html for API routes (shouldn't reach here, but safety check)
    if (req.path.startsWith('/api')) {
      return res.status(404).json({ message: 'API route not found' });
    }
    res.sendFile(path.join(rootDir, 'frontend/dist/index.html'));
  });
} else {
  // Development: Just show API status
  app.get("/", (req, res) => {
    res.json({ 
      message: "API is running",
      environment: "development",
      note: "Frontends are served separately in development mode"
    });
  });
}

// Debug: Log registered routes (only in development)
if (process.env.NODE_ENV !== 'production') {
  console.log("\n✅ Routes registered:");
  console.log("   Admin: /api/admin/*");
  console.log("   Content: /api/content/* (protected)\n");
}

// Global error handler (must be after routes)
app.use((err, req, res, next) => {
  console.error('❌ Global error handler triggered:');
  console.error('Error:', err);
  console.error('Error message:', err?.message);
  console.error('Error stack:', err?.stack);
  res.status(err?.status || 500).json({
    message: err?.message || 'Internal server error',
    error: process.env.NODE_ENV !== 'production' ? err?.stack : undefined
  });
});

// Start server
const PORT = SERVER_CONFIG.PORT;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📦 Environment: ${SERVER_CONFIG.NODE_ENV}`);
});


