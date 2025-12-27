import express from "express";
import { 
  registerAdmin, 
  loginAdmin, 
  getProfile, 
  updateEmail, 
  updatePassword, 
  updateAvatar 
} from "../controllers/adminController.js";
import protectAdmin from "../middlewares/adminAuthMiddleware.js";
import { uploadSingle } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// Test route (no auth required) - to verify router is working
router.get("/test", (req, res) => {
  res.json({ message: "Admin routes are working!", timestamp: new Date().toISOString() });
});

// Protected routes
router.get("/profile", protectAdmin, getProfile);
router.put("/profile/email", protectAdmin, updateEmail);
router.put("/profile/password", protectAdmin, updatePassword);

// Avatar upload route - simplified with uploadSingle middleware
router.put("/profile/avatar", protectAdmin, uploadSingle('avatar'), updateAvatar);

export default router;
