import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { Buffer } from 'buffer';

// Only configure Cloudinary if credentials are provided
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

// Helper function to upload buffer to Cloudinary
export const uploadToCloudinary = async (buffer, mimetype = 'image/jpeg', folder = 'vn-fashion/admin-avatars', options = {}) => {
  // Check if Cloudinary is configured
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary is not configured. Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to your .env file');
  }

  try {
    // Ensure buffer is a proper Buffer instance
    let bufferData;
    if (Buffer.isBuffer(buffer)) {
      bufferData = buffer;
    } else if (buffer instanceof Uint8Array || Array.isArray(buffer)) {
      bufferData = Buffer.from(buffer);
    } else if (buffer && typeof buffer === 'object' && buffer.data) {
      bufferData = Buffer.from(buffer.data);
    } else {
      throw new Error('Invalid buffer type: ' + typeof buffer);
    }

    if (!bufferData || bufferData.length === 0) {
      throw new Error('Empty buffer provided');
    }

    // Convert buffer to base64 data URI for Cloudinary
    const base64Data = bufferData.toString('base64');
    const dataUri = `data:${mimetype};base64,${base64Data}`;

    console.log('Uploading to Cloudinary with mimetype:', mimetype);
    console.log('Buffer size:', bufferData.length, 'bytes');
    console.log('Folder:', folder);

    // Determine transformation based on folder/content type
    let transformation = [];
    
    if (folder.includes('admin-avatars') || folder.includes('designer')) {
      // For avatars and designer images - square crop with face detection
      transformation = [
        {
          width: 800,
          height: 800,
          crop: 'fill',
          gravity: 'face',
          quality: 'auto',
        },
      ];
    } else if (folder.includes('gallery')) {
      // For gallery images - maintain aspect ratio, max width
      transformation = [
        {
          width: 1200,
          height: 1200,
          crop: 'limit',
          quality: 'auto',
        },
      ];
    } else {
      // Default transformation - auto optimize
      transformation = [
        {
          quality: 'auto',
          fetch_format: 'auto',
        },
      ];
    }

    // Merge with custom options if provided
    if (options.transformation) {
      transformation = options.transformation;
    }

    // Use Cloudinary's upload method with data URI
    const uploadOptions = {
      folder: folder,
      transformation: transformation,
      format: 'auto',
      resource_type: 'image',
      ...options, // Allow overriding any options
    };

    const result = await cloudinary.uploader.upload(dataUri, uploadOptions);

    console.log('✅ Cloudinary upload successful');
    console.log('Public ID:', result.public_id);
    console.log('URL:', result.secure_url);
    
    return result;
  } catch (error) {
    console.error('❌ Cloudinary upload error:', error);
    console.error('Error details:', {
      message: error.message,
      http_code: error.http_code,
      name: error.name
    });
    throw error;
  }
};

// Helper function to delete from Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  // Check if Cloudinary is configured
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary is not configured');
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image'
    });
    console.log('Cloudinary delete result:', result);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
};

export default cloudinary;
