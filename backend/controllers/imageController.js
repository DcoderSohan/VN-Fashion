import { uploadToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";
import Image from "../models/Image.js";
import path from "path";

// Upload image for content (designer image, gallery, etc.)
export const uploadImage = async (req, res) => {
  try {
    console.log('=== Image Upload Request ===');
    console.log('File present:', !!req.file);
    console.log('File size:', req.file?.size);
    console.log('File mimetype:', req.file?.mimetype);

    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    if (!req.file.buffer) {
      return res.status(400).json({ message: "File buffer is missing" });
    }

    const folder = req.body.folder || 'content';
    const adminId = req.admin?._id || null;
    
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(req.file.originalname) || '.jpg';
    const name = path.basename(req.file.originalname, ext) || 'image';
    const filename = `${name}-${uniqueSuffix}${ext}`;

    // Upload to Cloudinary
    console.log('=== Uploading to Cloudinary ===');
    const cloudinaryFolder = `vn-fashion/${folder}`;
    
    const result = await uploadToCloudinary(
      req.file.buffer,
      req.file.mimetype,
      cloudinaryFolder
    );

    if (!result || !result.secure_url) {
      throw new Error('Cloudinary upload failed - no URL returned');
    }

    const imageUrl = result.secure_url;
    const publicId = result.public_id;
    console.log('✅ Cloudinary upload successful:', imageUrl);

    // Save image metadata to MongoDB
    const imageDoc = await Image.create({
      filename: filename,
      originalName: req.file.originalname || 'image.jpg',
      mimetype: req.file.mimetype,
      size: req.file.size,
      folder: folder,
      cloudinaryUrl: imageUrl,
      publicId: publicId,
      uploadedBy: adminId,
    });

    console.log('✅ Image saved to MongoDB:', imageDoc._id);

    res.json({
      url: imageUrl,
      imageId: imageDoc._id,
      publicId: publicId,
      message: "Image uploaded and saved to database successfully"
    });
  } catch (error) {
    console.error('❌ Image upload error:', error);
    res.status(500).json({
      message: error?.message || 'Internal server error'
    });
  }
};

// Get images by folder
export const getImagesByFolder = async (req, res) => {
  try {
    const { folder } = req.params;
    const images = await Image.find({ folder: folder })
      .select('-data') // Don't send image data, just metadata
      .sort({ timestamp: -1 })
      .populate('uploadedBy', 'email');

    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get image by ID (returns image URL)
export const getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const { format } = req.query; // Optional: 'json' or 'image'
    
    const image = await Image.findById(id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // If format is 'image', redirect to Cloudinary URL
    if (format === 'image') {
      if (image.cloudinaryUrl) {
        return res.redirect(image.cloudinaryUrl);
      }
      return res.status(404).json({ message: "Image URL not found" });
    }

    // Default: return JSON with URL
    if (image.cloudinaryUrl) {
      return res.json({
        _id: image._id,
        filename: image.filename,
        originalName: image.originalName,
        folder: image.folder,
        url: image.cloudinaryUrl,
        size: image.size,
        mimetype: image.mimetype,
        timestamp: image.timestamp
      });
    }

    res.status(404).json({ message: "Image URL not found" });
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete image
export const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Delete from Cloudinary if publicId exists
    if (image.publicId) {
      try {
        await deleteFromCloudinary(image.publicId);
        console.log('✅ Deleted from Cloudinary:', image.publicId);
      } catch (error) {
        console.error('Error deleting from Cloudinary:', error);
        // Continue with MongoDB deletion even if Cloudinary deletion fails
      }
    }

    // Delete from MongoDB
    await Image.findByIdAndDelete(id);

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all folders
export const getFolders = async (req, res) => {
  try {
    const folders = await Image.distinct('folder');
    res.json(folders);
  } catch (error) {
    console.error('Error fetching folders:', error);
    res.status(500).json({ message: error.message });
  }
};
