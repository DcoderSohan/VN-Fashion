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
  // Store image as Buffer in MongoDB
  data: {
    type: Buffer,
    required: true,
  },
  // Store URL if uploaded to Cloudinary
  cloudinaryUrl: {
    type: String,
    default: '',
  },
  publicId: {
    type: String,
    default: '',
  },
  // Store local path if saved locally
  localPath: {
    type: String,
    default: '',
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
