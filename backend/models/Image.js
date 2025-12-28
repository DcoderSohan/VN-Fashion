import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  folder: {
    type: String,
    required: true,
    default: 'content',
    index: true, // Index for faster folder queries
  },
  // Store image as Buffer in MongoDB (optional, for backup)
  data: {
    type: Buffer,
    required: false,
  },
  // Store URL from Cloudinary
  cloudinaryUrl: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    default: null,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// Index for faster queries
imageSchema.index({ folder: 1, timestamp: -1 });
imageSchema.index({ uploadedBy: 1 });

const Image = mongoose.model("Image", imageSchema);

export default Image;
