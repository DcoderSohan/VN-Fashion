import express from "express";
import protectAdmin from "../middlewares/adminAuthMiddleware.js";
import { uploadSingle } from "../middlewares/uploadMiddleware.js";
import { 
  uploadImage, 
  getImagesByFolder, 
  getImageById, 
  deleteImage,
  getFolders 
} from "../controllers/imageController.js";
import {
  // Gallery
  getGallery,
  createGallery,
  updateGallery,
  deleteGallery,
  // About
  getAbout,
  updateAbout,
  // Achievements
  getAchievements,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  // Timeline
  getTimeline,
  createTimeline,
  updateTimeline,
  deleteTimeline,
  // Services
  getServices,
  createService,
  updateService,
  deleteService,
  // Categories
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  // Bookings
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  // Contacts
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  // Certificates
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  // Testimonials
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  // Settings
  getSettings,
  updateSettings,
} from "../controllers/contentController.js";

const router = express.Router();

// Image upload route (for designer images, gallery images, etc.)
router.post("/upload-image", protectAdmin, uploadSingle('image'), uploadImage);

// Image management routes (stored in MongoDB with folder organization)
router.get("/images/folders", protectAdmin, getFolders);
router.get("/images/folder/:folder", protectAdmin, getImagesByFolder);
router.get("/images/:id", protectAdmin, getImageById);
router.delete("/images/:id", protectAdmin, deleteImage);

// ================= PUBLIC ROUTES (No authentication required) =================
// These routes are for the frontend website to fetch content

// Public About route - no authentication required
router.get("/public/about", getAbout);

// Public Achievements route - no authentication required
router.get("/public/achievements", getAchievements);

// Public Gallery route - no authentication required
router.get("/public/gallery", getGallery);

// Public Services route - no authentication required
router.get("/public/services", getServices);

// Public Categories route - no authentication required
router.get("/public/categories", getCategories);

// Public Certificates route - no authentication required
router.get("/public/certificates", getCertificates);

// Public Timeline route - no authentication required
router.get("/public/timeline", getTimeline);

// Public Testimonials route - no authentication required
router.get("/public/testimonials", getTestimonials);

// Public Bookings route - no authentication required (for customers to submit bookings)
router.post("/public/bookings", createBooking);

// Public Contacts route - no authentication required (for customers to submit contact messages)
router.post("/public/contacts", createContact);

// ================= PROTECTED ROUTES (Admin authentication required) =================
// All content routes below are protected (require admin authentication)
// Gallery routes
router.get("/gallery", protectAdmin, getGallery);
router.post("/gallery", protectAdmin, uploadSingle('image'), createGallery);
router.put("/gallery/:id", protectAdmin, uploadSingle('image'), updateGallery);
router.delete("/gallery/:id", protectAdmin, deleteGallery);

// About routes
router.get("/about", protectAdmin, getAbout);
router.put("/about", protectAdmin, updateAbout);

// Achievements routes
router.get("/achievements", protectAdmin, getAchievements);
router.post("/achievements", protectAdmin, createAchievement);
router.put("/achievements/:id", protectAdmin, updateAchievement);
router.delete("/achievements/:id", protectAdmin, deleteAchievement);

// Timeline routes
router.get("/timeline", protectAdmin, getTimeline);
router.post("/timeline", protectAdmin, uploadSingle('image'), createTimeline);
router.put("/timeline/:id", protectAdmin, uploadSingle('image'), updateTimeline);
router.delete("/timeline/:id", protectAdmin, deleteTimeline);

// Services routes
router.get("/services", protectAdmin, getServices);
router.post("/services", protectAdmin, createService);
router.put("/services/:id", protectAdmin, updateService);
router.delete("/services/:id", protectAdmin, deleteService);

// Categories routes
router.get("/categories", protectAdmin, getCategories);
router.post("/categories", protectAdmin, createCategory);
router.put("/categories/:id", protectAdmin, updateCategory);
router.delete("/categories/:id", protectAdmin, deleteCategory);

// Bookings routes
router.get("/bookings", protectAdmin, getBookings);
router.post("/bookings", protectAdmin, createBooking);
router.put("/bookings/:id", protectAdmin, updateBooking);
router.delete("/bookings/:id", protectAdmin, deleteBooking);

// Contacts routes
router.get("/contacts", protectAdmin, getContacts);
router.post("/contacts", protectAdmin, createContact);
router.put("/contacts/:id", protectAdmin, updateContact);
router.delete("/contacts/:id", protectAdmin, deleteContact);

// Certificates routes
router.get("/certificates", protectAdmin, getCertificates);
router.post("/certificates", protectAdmin, uploadSingle('image'), createCertificate);
router.put("/certificates/:id", protectAdmin, uploadSingle('image'), updateCertificate);
router.delete("/certificates/:id", protectAdmin, deleteCertificate);

// Testimonials routes
router.get("/testimonials", protectAdmin, getTestimonials);
router.post("/testimonials", protectAdmin, createTestimonial);
router.put("/testimonials/:id", protectAdmin, updateTestimonial);
router.delete("/testimonials/:id", protectAdmin, deleteTestimonial);

// Settings routes
router.get("/settings", protectAdmin, getSettings);
router.put("/settings", protectAdmin, updateSettings);
// Public route to get settings
router.get("/public/settings", getSettings);

export default router;
