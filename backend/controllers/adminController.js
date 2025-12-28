import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { uploadToCloudinary, deleteFromCloudinary, extractPublicIdFromUrl } from "../config/cloudinary.js";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
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

    res.status(201).json({
      _id: admin._id,
      email: admin.email,
      avatar: admin.avatar || '',
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
    
    res.json({
      _id: admin._id,
      email: admin.email,
      avatar: admin.avatar || '',
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

    res.json({
      _id: admin._id,
      email: admin.email,
      avatar: admin.avatar || '',
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
    
    res.json({
      _id: admin._id,
      email: admin.email,
      avatar: admin.avatar || '',
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

    // Validate file type
    if (!req.file.mimetype || !req.file.mimetype.startsWith('image/')) {
      return res.status(400).json({ message: "Invalid file type. Only image files are allowed" });
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (req.file.size > maxSize) {
      return res.status(400).json({ message: "File too large. Maximum size is 5MB" });
    }

    console.log('File validation passed:', {
      size: req.file.size,
      mimetype: req.file.mimetype,
      originalname: req.file.originalname
    });

    // Validate admin
    if (!req.admin || !req.admin._id) {
      return res.status(401).json({ message: "Admin not authenticated" });
    }

    // Get admin
    const admin = await Admin.findById(req.admin._id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Delete old avatar from Cloudinary if it exists
    if (admin.avatar && admin.avatar.includes('cloudinary')) {
      try {
        const publicId = extractPublicIdFromUrl(admin.avatar);
        if (publicId) {
          await deleteFromCloudinary(publicId);
          console.log('✅ Deleted old Cloudinary avatar:', publicId);
        } else {
          console.warn('⚠️  Could not extract public ID from avatar URL:', admin.avatar);
        }
      } catch (error) {
        console.error("Error deleting old avatar:", error.message);
        // Don't fail the upload if deletion fails
      }
    }

    // Upload new avatar to Cloudinary
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

    const avatarUrl = result.secure_url;
    console.log('✅ Cloudinary upload successful:', avatarUrl);

    // Update admin avatar in MongoDB
    admin.avatar = avatarUrl;
    await admin.save();

    // Fetch fresh data from MongoDB
    const updatedAdmin = await Admin.findById(req.admin._id).select("-password");
    
    // Return success response
    res.json({
      _id: updatedAdmin._id,
      email: updatedAdmin.email,
      avatar: updatedAdmin.avatar || avatarUrl,
      message: "Avatar updated successfully"
    });
  } catch (error) {
    console.error('❌ Avatar update error:', error);
    console.error('Error details:', {
      name: error?.name,
      message: error?.message,
      stack: error?.stack,
      http_code: error?.http_code
    });

    // Return appropriate error response
    if (error.name === 'ValidationError' || error.name === 'CastError') {
      return res.status(400).json({ 
        message: error.message || 'Validation error'
      });
    }

    // Cloudinary specific errors
    if (error.http_code) {
      return res.status(500).json({ 
        message: `Cloudinary error: ${error.message || 'Failed to upload image'}`,
        error: process.env.NODE_ENV !== 'production' ? error?.message : undefined
      });
    }

    res.status(500).json({ 
      message: error?.message || 'Internal server error',
      error: process.env.NODE_ENV !== 'production' ? error?.message : undefined
    });
  }
};
