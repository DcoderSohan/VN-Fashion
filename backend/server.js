import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { SERVER_CONFIG, CORS_CONFIG } from "./config/constants.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

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
  const frontendDist = path.join(rootDir, 'frontend/dist');
  const adminDist = path.join(rootDir, 'admin/dist');
  
  // Check if dist folders exist
  if (!fs.existsSync(frontendDist)) {
    console.error(`❌ ERROR: Frontend dist folder not found at: ${frontendDist}`);
    console.error('   Make sure frontend/dist is committed to GitHub');
    console.error('   Railway Root Directory should be set to project root (not "backend")');
  } else {
    console.log(`✅ Frontend dist found at: ${frontendDist}`);
  }
  
  if (!fs.existsSync(adminDist)) {
    console.error(`❌ ERROR: Admin dist folder not found at: ${adminDist}`);
    console.error('   Make sure admin/dist is committed to GitHub');
    console.error('   Railway Root Directory should be set to project root (not "backend")');
  } else {
    console.log(`✅ Admin dist found at: ${adminDist}`);
  }
  
  // Serve frontend (client) - root path
  app.use(express.static(frontendDist));
  
  // Serve admin static files - /admin path
  // This must come BEFORE the catch-all middleware to serve JS/CSS files correctly
  app.use('/admin', express.static(adminDist, {
    // Set proper MIME types for JavaScript modules
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      } else if (filePath.endsWith('.mjs')) {
        res.setHeader('Content-Type', 'application/javascript');
      }
    }
  }));
  
  // Client and Admin routing fix - handle all routes (SPA routing)
  // This must be LAST to catch all non-API routes
  // Express 5 compatible: use middleware instead of '*' pattern
  app.use((req, res, next) => {
    // Skip if already handled (static files, API routes, etc.)
    if (req.path.startsWith('/api')) {
      return next(); // Let API routes be handled by their routes
    }
    
    // Skip if request is for a static file (has file extension)
    // This prevents serving index.html for JS/CSS/image files
    const hasFileExtension = /\.\w+$/.test(req.path);
    if (hasFileExtension) {
      return next(); // Let static file middleware handle it (or 404 if not found)
    }
    
    // For GET requests that aren't API routes and aren't static files, serve the appropriate index.html
    if (req.method === 'GET') {
      // Serve admin index.html for /admin routes
      if (req.path.startsWith('/admin')) {
        const adminIndex = path.join(adminDist, 'index.html');
        return res.sendFile(adminIndex, (err) => {
          if (err) {
            console.error(`Error serving admin index.html: ${err.message}`);
            return res.status(500).json({ message: 'Admin panel not available', error: err.message });
          }
        });
      }
      
      // Serve frontend index.html for all other routes
      const frontendIndex = path.join(frontendDist, 'index.html');
      return res.sendFile(frontendIndex, (err) => {
        if (err) {
          console.error(`Error serving frontend index.html: ${err.message}`);
          return res.status(500).json({ message: 'Frontend not available', error: err.message });
        }
      });
    }
    
    next();
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


