import multer from 'multer';

// Configure multer storage - use memory storage for Cloudinary uploads
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit (increased for better quality images)
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
            return res.status(400).json({ message: 'File too large. Maximum size is 5MB.' });
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
      return res.status(400).json({ message: 'File too large. Maximum size is 5MB.' });
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
