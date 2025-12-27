import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if Cloudinary is configured (check at runtime, not module load time)
const isCloudinaryConfigured = () => {
  return !!(process.env.CLOUDINARY_CLOUD_NAME && 
            process.env.CLOUDINARY_API_KEY && 
            process.env.CLOUDINARY_API_SECRET);
};

// Configure multer storage - always use memory storage for flexibility
// We can handle both Cloudinary and local storage from memory buffer
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit
  },
  fileFilter: (req, file, cb) => {
    // Check if file is an image
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  },
});

// Middleware to handle file upload
export const uploadSingle = (fieldName = 'avatar') => {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err) {
        console.error('Multer error:', err);
        if (err instanceof multer.MulterError) {
          if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File too large. Maximum size is 2MB.' });
          }
          if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({ message: `Unexpected file field. Use "${fieldName}" as the field name.` });
          }
          return res.status(400).json({ message: err.message, code: err.code });
        }
        return res.status(400).json({ message: err.message });
      }
      next();
    });
  };
};

// Error handling middleware for multer
export const handleMulterError = (err, req, res, next) => {
  console.log('Multer error handler called:', err);
  if (err instanceof multer.MulterError) {
    console.error('Multer error:', err.code, err.message);
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large. Maximum size is 2MB.' });
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ message: 'Unexpected file field. Use "avatar" as the field name.' });
    }
    return res.status(400).json({ message: err.message, code: err.code });
  }
  if (err) {
    console.error('File filter error:', err.message);
    return res.status(400).json({ message: err.message });
  }
  next();
};

export default upload;
export { isCloudinaryConfigured };
