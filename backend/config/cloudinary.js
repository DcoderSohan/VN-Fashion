import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import { Buffer } from 'buffer';

// Lazy configuration - only configure when first used
let isConfigured = false;

// Function to ensure Cloudinary is configured
const ensureConfigured = () => {
  if (isConfigured) return;
  
  // Validate Cloudinary configuration
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error('Cloudinary configuration is required. Please add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to your .env file');
  }

  // Configure Cloudinary
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  isConfigured = true;
  console.log('✅ Cloudinary configured successfully');
};

// Helper function to upload buffer to Cloudinary
export const uploadToCloudinary = async (buffer, mimetype = 'image/jpeg', folder = 'vn-fashion/admin-avatars', options = {}) => {
  // Ensure Cloudinary is configured before use
  ensureConfigured();

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
      resource_type: 'image',
      ...options, // Allow overriding any options
    };

    const result = await cloudinary.uploader.upload(dataUri, uploadOptions);

    if (!result || !result.secure_url) {
      throw new Error('Cloudinary upload succeeded but no URL returned');
    }

    console.log('✅ Cloudinary upload successful');
    console.log('Public ID:', result.public_id);
    console.log('URL:', result.secure_url);
    
    return result;
  } catch (error) {
    console.error('❌ Cloudinary upload error:', error);
    console.error('Error details:', {
      message: error.message,
      http_code: error.http_code,
      name: error.name,
      stack: error.stack
    });
    
    // Provide more helpful error messages
    if (error.http_code === 401) {
      throw new Error('Cloudinary authentication failed. Please check your API credentials.');
    } else if (error.http_code === 400) {
      throw new Error(`Cloudinary upload failed: ${error.message || 'Invalid request'}`);
    } else if (error.message) {
      throw new Error(`Cloudinary upload failed: ${error.message}`);
    } else {
      throw new Error('Cloudinary upload failed. Please check your configuration and try again.');
    }
  }
};

// Helper function to extract public ID from Cloudinary URL
export const extractPublicIdFromUrl = (url) => {
  if (!url || !url.includes('cloudinary')) {
    return null;
  }
  
  try {
    // Cloudinary URL formats:
    // https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{folder}/{public_id}.{ext}
    // https://res.cloudinary.com/{cloud_name}/image/upload/{folder}/{public_id}.{ext}
    // https://res.cloudinary.com/{cloud_name}/image/upload/v{version}/{public_id}.{ext}
    
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)(?:\.(jpg|jpeg|png|gif|webp|auto))?(\?|$)/i);
    if (match && match[1]) {
      let publicId = match[1];
      // Remove query parameters if any
      publicId = publicId.split('?')[0];
      return publicId;
    }
    return null;
  } catch (error) {
    console.error('Error extracting public ID:', error);
    return null;
  }
};

// Helper function to delete from Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  // Ensure Cloudinary is configured before use
  ensureConfigured();
  
  if (!publicId) {
    throw new Error('Public ID is required to delete from Cloudinary');
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image'
    });
    console.log('Cloudinary delete result:', result);
    
    // Check if deletion was successful
    if (result.result === 'not found') {
      console.warn('⚠️  Image not found in Cloudinary:', publicId);
    } else if (result.result === 'ok') {
      console.log('✅ Successfully deleted from Cloudinary:', publicId);
    }
    
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
};

export default cloudinary;
