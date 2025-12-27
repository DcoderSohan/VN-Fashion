import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";
import { isCloudinaryConfigured } from "../middlewares/uploadMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Helper function to normalize avatar URL (fix duplicate /uploads/uploads/)
const normalizeAvatarUrl = (avatarUrl) => {
  if (!avatarUrl) return '';
  
  // Fix duplicate /uploads/uploads/ paths
  if (avatarUrl.includes('/uploads/uploads/')) {
    return avatarUrl.replace('/uploads/uploads/', '/uploads/');
  }
  
  return avatarUrl;
};

// ================= REGISTER =================
export const registerAdmin = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    // Validation
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create Admin
    const admin = await Admin.create({
      email,
      password: hashedPassword
    });

    // Normalize avatar URL (should be empty for new admin, but normalize anyway)
    const normalizedAvatar = normalizeAvatarUrl(admin.avatar);

    res.status(201).json({
      _id: admin._id,
      email: admin.email,
      avatar: normalizedAvatar || '',
      token: generateToken(admin._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= LOGIN =================
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Normalize avatar URL
    const normalizedAvatar = normalizeAvatarUrl(admin.avatar);
    
    res.json({
      _id: admin._id,
      email: admin.email,
      avatar: normalizedAvatar || '',
      token: generateToken(admin._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= GET PROFILE =================
export const getProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id).select("-password");
    
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Normalize avatar URL to fix any duplicate paths
    const normalizedAvatar = normalizeAvatarUrl(admin.avatar);
    
    // If avatar was fixed, update it in MongoDB
    if (normalizedAvatar !== admin.avatar && normalizedAvatar) {
      admin.avatar = normalizedAvatar;
      await admin.save();
    }

    res.json({
      _id: admin._id,
      email: admin.email,
      avatar: normalizedAvatar || '',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= UPDATE EMAIL =================
export const updateEmail = async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email address" });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if email is already taken by another admin
    const emailExists = await Admin.findOne({ 
      email: normalizedEmail,
      _id: { $ne: req.admin._id }
    });

    if (emailExists) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Check if email is the same as current email
    const currentAdmin = await Admin.findById(req.admin._id);
    if (currentAdmin.email === normalizedEmail) {
      return res.status(400).json({ message: "New email must be different from current email" });
    }

    // Update email
    const admin = await Admin.findByIdAndUpdate(
      req.admin._id,
      { email: normalizedEmail },
      { new: true, runValidators: true }
    ).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Normalize avatar URL
    const normalizedAvatar = normalizeAvatarUrl(admin.avatar);
    
    res.json({
      _id: admin._id,
      email: admin.email,
      avatar: normalizedAvatar || '',
      message: "Email updated successfully"
    });
  } catch (error) {
    console.error('Email update error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message || "Failed to update email" });
  }
};

// ================= UPDATE PASSWORD =================
export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    // Validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: "All password fields are required" });
    }

    // Password length validation
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters long" });
    }

    // Password match validation
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New passwords do not match" });
    }

    // Check if new password is same as current password
    if (currentPassword === newPassword) {
      return res.status(400).json({ message: "New password must be different from current password" });
    }

    // Get admin with password
    const admin = await Admin.findById(req.admin._id);
    
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    admin.password = hashedPassword;
    await admin.save();

    res.json({ 
      message: "Password updated successfully",
      success: true
    });
  } catch (error) {
    console.error('Password update error:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message || "Failed to update password" });
  }
};

// Helper function to delete old local file
const deleteLocalFile = (filePath) => {
  try {
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log('Deleted old local file:', filePath);
    }
  } catch (error) {
    console.error('Error deleting local file:', error.message);
  }
};

// Helper function to save file locally and return URL
const saveFileLocally = (buffer, mimetype, originalname) => {
  try {
    // Ensure uploads directory exists
    const uploadsDir = path.join(__dirname, '../uploads/admin-avatars');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(originalname) || '.jpg';
    const name = path.basename(originalname, ext) || 'avatar';
    const filename = `${name}-${uniqueSuffix}${ext}`;
    const filePath = path.join(uploadsDir, filename);

    // Write buffer to file
    fs.writeFileSync(filePath, buffer);

    // Return URL relative to the uploads directory (not backend directory)
    // Since static files are served from 'backend/uploads', and file is in 'backend/uploads/admin-avatars/filename'
    // The URL should be '/api/uploads/admin-avatars/filename'
    const backendDir = path.join(__dirname, '..');
    const uploadsBaseDir = path.join(backendDir, 'uploads');
    const relativePath = path.relative(uploadsBaseDir, filePath);
    
    // Return the URL path
    return `/api/uploads/${relativePath.replace(/\\/g, '/')}`;
  } catch (error) {
    console.error('Error saving file locally:', error);
    throw error;
  }
};

// ================= UPDATE AVATAR =================
export const updateAvatar = async (req, res) => {
  try {
    console.log('=== Avatar Update Request ===');
    console.log('File present:', !!req.file);
    console.log('Admin ID:', req.admin?._id);

    // Validate file
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    if (!req.file.buffer) {
      return res.status(400).json({ message: "File buffer is missing" });
    }

    // Validate admin
    if (!req.admin || !req.admin._id) {
      return res.status(401).json({ message: "Admin not authenticated" });
    }

    // Get admin
    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Delete old avatar
    if (admin.avatar) {
      try {
        if (admin.avatar.includes('cloudinary')) {
          // Delete from Cloudinary
          const urlMatch = admin.avatar.match(/\/upload\/(?:v\d+\/)?(.+?)\.(jpg|jpeg|png|gif|webp)/i);
          if (urlMatch && urlMatch[1]) {
            const publicId = urlMatch[1];
            await deleteFromCloudinary(publicId);
            console.log('✅ Deleted old Cloudinary avatar:', publicId);
          }
        } else if (admin.avatar.includes('/uploads/')) {
          // Delete local file
          const oldFilePath = path.join(__dirname, '..', admin.avatar.replace(/^\/api\/uploads\//, 'uploads/'));
          deleteLocalFile(oldFilePath);
        }
      } catch (error) {
        console.error("Error deleting old avatar:", error.message);
        // Don't fail the upload if deletion fails
      }
    }

    // Upload new avatar
    let avatarUrl;
    const useCloudinary = isCloudinaryConfigured();

    if (useCloudinary) {
      try {
        console.log('=== Uploading to Cloudinary ===');
        console.log('File size:', req.file.buffer.length, 'bytes');
        console.log('MIME type:', req.file.mimetype);

        const result = await uploadToCloudinary(
          req.file.buffer, 
          req.file.mimetype,
          'vn-fashion/admin-avatars'
        );

        if (!result || !result.secure_url) {
          throw new Error('Cloudinary upload failed - no URL returned');
        }

        avatarUrl = result.secure_url;
        console.log('✅ Cloudinary upload successful:', avatarUrl);
      } catch (error) {
        console.error('❌ Cloudinary upload error:', error);
        // Fall back to local storage if Cloudinary fails
        console.log('Falling back to local storage...');
        avatarUrl = saveFileLocally(
          req.file.buffer,
          req.file.mimetype,
          req.file.originalname || 'avatar.jpg'
        );
        console.log('✅ Saved to local storage:', avatarUrl);
      }
    } else {
      // Use local storage
      console.log('=== Using Local Storage ===');
      avatarUrl = saveFileLocally(
        req.file.buffer,
        req.file.mimetype,
        req.file.originalname || 'avatar.jpg'
      );
      console.log('✅ Saved to local storage:', avatarUrl);
    }

    // Update admin avatar in MongoDB
    admin.avatar = avatarUrl;
    await admin.save();

    // Fetch fresh data from MongoDB to ensure we return the correct avatar URL
    const updatedAdmin = await Admin.findById(req.admin._id).select("-password");
    
    // Normalize avatar URL to fix any duplicate paths
    const normalizedAvatar = normalizeAvatarUrl(updatedAdmin.avatar || avatarUrl);
    
    // Return success response with normalized avatar URL from MongoDB
    res.json({
      _id: updatedAdmin._id,
      email: updatedAdmin.email,
      avatar: normalizedAvatar,
      message: "Avatar updated successfully"
    });
  } catch (error) {
    console.error('❌ Avatar update error:', error);
    console.error('Error details:', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack
    });

    // Return appropriate error response
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({ 
        message: error.message || 'Validation error'
      });
    }

    res.status(500).json({ 
      message: error?.message || 'Internal server error',
      error: process.env.NODE_ENV !== 'production' ? error?.message : undefined
    });
  }
};
