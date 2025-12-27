import Gallery from "../models/Gallery.js";
import About from "../models/About.js";
import Achievement from "../models/Achievement.js";
import Timeline from "../models/Timeline.js";
import Service from "../models/Service.js";
import Category from "../models/Category.js";
import Booking from "../models/Booking.js";
import Contact from "../models/Contact.js";
import Certificate from "../models/Certificate.js";
import Testimonial from "../models/Testimonial.js";
import Settings from "../models/Settings.js";

// ================= GALLERY =================
export const getGallery = async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ timestamp: -1 });
    res.json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createGallery = async (req, res) => {
  try {
    console.log('=== Create Gallery ===');
    console.log('Request body:', req.body);
    
    // If setting as featured, unset all other featured items
    if (req.body.featured === true) {
      await Gallery.updateMany({}, { $set: { featured: false } });
    }
    
    const galleryData = {
      title: req.body.title || '',
      image: req.body.image || req.body.imageId || '',
      category: req.body.category || 'Uncategorized',
      description: req.body.description || '',
      materials: req.body.materials || '',
      price: req.body.price || '',
      featured: req.body.featured === true || false,
    };
    
    const gallery = await Gallery.create(galleryData);
    console.log('✅ Gallery item created:', gallery._id);
    res.status(201).json(gallery);
  } catch (error) {
    console.error('Error creating gallery item:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateGallery = async (req, res) => {
  try {
    console.log('=== Update Gallery ===');
    console.log('Gallery ID:', req.params.id);
    console.log('Request body:', req.body);
    
    // If setting as featured, unset all other featured items
    if (req.body.featured === true) {
      await Gallery.updateMany(
        { _id: { $ne: req.params.id } },
        { $set: { featured: false } }
      );
    }
    
    const updateData = {
      title: req.body.title || '',
      category: req.body.category || 'Uncategorized',
      description: req.body.description || '',
      materials: req.body.materials || '',
      price: req.body.price || '',
      featured: req.body.featured === true || false,
    };
    
    // Handle image upload
    if (req.body.image) {
      updateData.image = req.body.image;
    } else if (req.file) {
      updateData.image = req.file.path || req.file.filename;
    }
    
    const gallery = await Gallery.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!gallery) {
      return res.status(404).json({ message: "Gallery item not found" });
    }
    console.log('✅ Gallery item updated:', gallery._id);
    res.json(gallery);
  } catch (error) {
    console.error('Error updating gallery item:', error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteGallery = async (req, res) => {
  try {
    const gallery = await Gallery.findByIdAndDelete(req.params.id);
    if (!gallery) {
      return res.status(404).json({ message: "Gallery item not found" });
    }
    res.json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= ABOUT =================
export const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      // Create default about document if none exists
      about = await About.create({
        aboutText: '',
        designerName: '',
        designerTitle: '',
        designerBio: '',
        designerImage: ''
      });
    }
    res.json(about);
  } catch (error) {
    console.error('Error getting about:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateAbout = async (req, res) => {
  try {
    console.log('=== Update About Request ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));
    console.log('Admin ID:', req.admin?._id);
    
    // Find existing about document
    let about = await About.findOne();
    
    if (!about) {
      // Create new document if it doesn't exist
      console.log('Creating new about document');
      about = await About.create({
        aboutText: req.body.aboutText || '',
        designerName: req.body.designerName || '',
        designerTitle: req.body.designerTitle || '',
        designerBio: req.body.designerBio || '',
        designerImage: req.body.designerImage || ''
      });
      console.log('Created new about:', about);
    } else {
      // Update existing document
      console.log('Updating existing about document:', about._id);
      console.log('Current values:', {
        aboutText: about.aboutText,
        designerName: about.designerName,
        designerTitle: about.designerTitle,
        designerBio: about.designerBio,
        designerImage: about.designerImage
      });
      
      // Update fields
      if (req.body.aboutText !== undefined) {
        about.aboutText = req.body.aboutText;
      }
      if (req.body.designerName !== undefined) {
        about.designerName = req.body.designerName;
      }
      if (req.body.designerTitle !== undefined) {
        about.designerTitle = req.body.designerTitle;
      }
      if (req.body.designerBio !== undefined) {
        about.designerBio = req.body.designerBio;
      }
      if (req.body.designerImage !== undefined) {
        about.designerImage = req.body.designerImage;
      }
      
      // Save the document
      await about.save();
      console.log('Updated about:', about);
      
      // Verify the save worked
      const verify = await About.findById(about._id);
      console.log('Verified saved values:', {
        aboutText: verify.aboutText,
        designerName: verify.designerName,
        designerTitle: verify.designerTitle,
        designerBio: verify.designerBio,
        designerImage: verify.designerImage
      });
    }
    
    // Return the updated document
    res.json({
      _id: about._id,
      aboutText: about.aboutText || '',
      designerName: about.designerName || '',
      designerTitle: about.designerTitle || '',
      designerBio: about.designerBio || '',
      designerImage: about.designerImage || '',
      message: "About content updated successfully"
    });
  } catch (error) {
    console.error('Error updating about:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      message: error.message || 'Failed to update about content',
      error: process.env.NODE_ENV !== 'production' ? error.stack : undefined
    });
  }
};

// ================= ACHIEVEMENTS =================
export const getAchievements = async (req, res) => {
  try {
    const achievements = await Achievement.find().sort({ timestamp: -1 });
    res.json(achievements);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAchievement = async (req, res) => {
  try {
    console.log('=== Create Achievement ===');
    console.log('Request body:', req.body);
    
    const achievement = await Achievement.create(req.body);
    console.log('✅ Achievement created:', achievement._id);
    
    res.status(201).json(achievement);
  } catch (error) {
    console.error('Error creating achievement:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message || 'Failed to create achievement' });
  }
};

export const updateAchievement = async (req, res) => {
  try {
    console.log('=== Update Achievement ===');
    console.log('Achievement ID:', req.params.id);
    console.log('Request body:', req.body);
    
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }
    
    console.log('✅ Achievement updated:', achievement._id);
    res.json(achievement);
  } catch (error) {
    console.error('Error updating achievement:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message || 'Failed to update achievement' });
  }
};

export const deleteAchievement = async (req, res) => {
  try {
    console.log('=== Delete Achievement ===');
    console.log('Achievement ID:', req.params.id);
    
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    
    if (!achievement) {
      return res.status(404).json({ message: "Achievement not found" });
    }
    
    console.log('✅ Achievement deleted:', req.params.id);
    res.json({ message: "Achievement deleted successfully" });
  } catch (error) {
    console.error('Error deleting achievement:', error);
    res.status(500).json({ message: error.message || 'Failed to delete achievement' });
  }
};

// ================= TIMELINE =================
export const getTimeline = async (req, res) => {
  try {
    const timeline = await Timeline.find().sort({ year: -1, timestamp: -1 });
    res.json(timeline);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTimeline = async (req, res) => {
  try {
    console.log('=== Create Timeline ===');
    console.log('Request body:', req.body);
    
    // If imageId is provided, fetch the image URL
    let imageUrl = req.body.image || '';
    if (req.body.imageId) {
      const Image = (await import("../models/Image.js")).default;
      const imageDoc = await Image.findById(req.body.imageId);
      if (imageDoc) {
        imageUrl = imageDoc.cloudinaryUrl || '';
        if (imageDoc.localPath && !imageUrl) {
          const path = (await import('path')).default;
          const { fileURLToPath } = await import('url');
          const __filename = fileURLToPath(import.meta.url);
          const __dirname = path.dirname(__filename);
          const backendDir = path.join(__dirname, '..');
          const uploadsBaseDir = path.join(backendDir, 'uploads');
          const relativePath = path.relative(uploadsBaseDir, imageDoc.localPath);
          imageUrl = `/api/uploads/${relativePath.replace(/\\/g, '/')}`;
        }
      }
    }
    
    // Ensure title is set (required field)
    const title = req.body.title || req.body.event || 'Untitled Event';
    const event = req.body.event || req.body.title || title;
    
    const timelineData = {
      year: req.body.year || '',
      title: title,
      event: event,
      description: req.body.description || '',
      image: imageUrl || '',
      eventDate: req.body.eventDate || '',
      place: req.body.place || '',
      creationDate: req.body.creationDate || '',
    };
    
    const timeline = await Timeline.create(timelineData);
    console.log('✅ Timeline created:', timeline._id);
    res.status(201).json(timeline);
  } catch (error) {
    console.error('Error creating timeline:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateTimeline = async (req, res) => {
  try {
    console.log('=== Update Timeline ===');
    console.log('Timeline ID:', req.params.id);
    console.log('Request body:', req.body);
    
    // If imageId is provided, fetch the image URL
    if (req.body.imageId) {
      const Image = (await import("../models/Image.js")).default;
      const imageDoc = await Image.findById(req.body.imageId);
      if (imageDoc) {
        let imageUrl = imageDoc.cloudinaryUrl || '';
        if (imageDoc.localPath && !imageUrl) {
          const path = (await import('path')).default;
          const { fileURLToPath } = await import('url');
          const __filename = fileURLToPath(import.meta.url);
          const __dirname = path.dirname(__filename);
          const backendDir = path.join(__dirname, '..');
          const uploadsBaseDir = path.join(backendDir, 'uploads');
          const relativePath = path.relative(uploadsBaseDir, imageDoc.localPath);
          imageUrl = `/api/uploads/${relativePath.replace(/\\/g, '/')}`;
        }
        req.body.image = imageUrl;
      }
    }
    
    // Ensure title and event are synced (title is required)
    if (!req.body.title && !req.body.event) {
      return res.status(400).json({ message: "Title or event is required" });
    }
    
    if (req.body.event && !req.body.title) {
      req.body.title = req.body.event;
    }
    if (req.body.title && !req.body.event) {
      req.body.event = req.body.title;
    }
    
    const timeline = await Timeline.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!timeline) {
      return res.status(404).json({ message: "Timeline item not found" });
    }
    console.log('✅ Timeline updated:', timeline._id);
    res.json(timeline);
  } catch (error) {
    console.error('Error updating timeline:', error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteTimeline = async (req, res) => {
  try {
    const timeline = await Timeline.findByIdAndDelete(req.params.id);
    if (!timeline) {
      return res.status(404).json({ message: "Timeline item not found" });
    }
    res.json({ message: "Timeline item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= SERVICES =================
export const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ timestamp: -1 });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    console.log('=== Create Service ===');
    console.log('Request body:', req.body);
    
    // If imageId is provided, fetch the image URL
    let imageUrl = req.body.image || '';
    if (req.body.imageId) {
      const Image = (await import("../models/Image.js")).default;
      const imageDoc = await Image.findById(req.body.imageId);
      if (imageDoc) {
        imageUrl = imageDoc.cloudinaryUrl || '';
        if (imageDoc.localPath && !imageUrl) {
          const path = (await import('path')).default;
          const { fileURLToPath } = await import('url');
          const __filename = fileURLToPath(import.meta.url);
          const __dirname = path.dirname(__filename);
          const backendDir = path.join(__dirname, '..');
          const uploadsBaseDir = path.join(backendDir, 'uploads');
          const relativePath = path.relative(uploadsBaseDir, imageDoc.localPath);
          imageUrl = `/api/uploads/${relativePath.replace(/\\/g, '/')}`;
        }
      }
    }
    
    const serviceData = {
      title: req.body.title || '',
      description: req.body.description || '',
      image: imageUrl || '',
      price: req.body.price || '',
      category: req.body.category || '',
    };
    
    const service = await Service.create(serviceData);
    console.log('✅ Service created:', service._id);
    res.status(201).json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    console.log('=== Update Service ===');
    console.log('Service ID:', req.params.id);
    console.log('Request body:', req.body);
    
    // If imageId is provided, fetch the image URL
    if (req.body.imageId) {
      const Image = (await import("../models/Image.js")).default;
      const imageDoc = await Image.findById(req.body.imageId);
      if (imageDoc) {
        let imageUrl = imageDoc.cloudinaryUrl || '';
        if (imageDoc.localPath && !imageUrl) {
          const path = (await import('path')).default;
          const { fileURLToPath } = await import('url');
          const __filename = fileURLToPath(import.meta.url);
          const __dirname = path.dirname(__filename);
          const backendDir = path.join(__dirname, '..');
          const uploadsBaseDir = path.join(backendDir, 'uploads');
          const relativePath = path.relative(uploadsBaseDir, imageDoc.localPath);
          imageUrl = `/api/uploads/${relativePath.replace(/\\/g, '/')}`;
        }
        req.body.image = imageUrl;
      }
    }
    
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    console.log('✅ Service updated:', service._id);
    res.json(service);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= CATEGORIES =================
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Category already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Category name already exists" });
    }
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= BOOKINGS =================
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ timestamp: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBooking = async (req, res) => {
  try {
    console.log('=== Create Booking ===');
    console.log('Request body:', req.body);
    
    const bookingData = {
      firstName: req.body.firstName || '',
      lastName: req.body.lastName || '',
      email: req.body.email || '',
      phone: req.body.phone || '',
      contactNumber: req.body.contactNumber || req.body.phone || '',
      serviceId: req.body.serviceId || '',
      serviceTitle: req.body.serviceTitle || '',
      servicePrice: req.body.servicePrice || '',
      serviceCategory: req.body.serviceCategory || '',
      designId: req.body.designId || '',
      designTitle: req.body.designTitle || '',
      designCategory: req.body.designCategory || '',
      designPrice: req.body.designPrice || '',
      designImage: req.body.designImage || '',
      date: req.body.date || '',
      time: req.body.time || '',
      notes: req.body.notes || '',
      status: req.body.status || 'pending',
    };
    
    const booking = await Booking.create(bookingData);
    console.log('✅ Booking created:', booking._id);
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateBooking = async (req, res) => {
  try {
    console.log('=== Update Booking ===');
    console.log('Booking ID:', req.params.id);
    console.log('Request body:', req.body);
    
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    console.log('✅ Booking updated:', booking._id);
    res.json(booking);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= CONTACTS =================
export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ timestamp: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createContact = async (req, res) => {
  try {
    console.log('=== Create Contact ===');
    console.log('Request body:', req.body);
    
    const contactData = {
      firstName: req.body.firstName || '',
      lastName: req.body.lastName || '',
      email: req.body.email || '',
      phone: req.body.phone || '',
      contactNumber: req.body.contactNumber || req.body.phone || '',
      message: req.body.message || '',
      read: false,
    };
    
    const contact = await Contact.create(contactData);
    console.log('✅ Contact created:', contact._id);
    res.status(201).json(contact);
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= CERTIFICATES =================
export const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ timestamp: -1 });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCertificate = async (req, res) => {
  try {
    console.log('=== Create Certificate ===');
    console.log('Request body:', req.body);
    console.log('File present:', !!req.file);
    
    // Image URL should be provided in req.body.image (uploaded via separate endpoint)
    // If imageId is provided, fetch the image URL
    let imageUrl = req.body.image || '';
    if (!imageUrl && req.body.imageId) {
      const Image = (await import("../models/Image.js")).default;
      const imageDoc = await Image.findById(req.body.imageId);
      if (imageDoc) {
        imageUrl = imageDoc.cloudinaryUrl || '';
        if (imageDoc.localPath && !imageUrl) {
          const path = (await import('path')).default;
          const { fileURLToPath } = await import('url');
          const __filename = fileURLToPath(import.meta.url);
          const __dirname = path.dirname(__filename);
          const backendDir = path.join(__dirname, '..');
          const uploadsBaseDir = path.join(backendDir, 'uploads');
          const relativePath = path.relative(uploadsBaseDir, imageDoc.localPath);
          imageUrl = `/api/uploads/${relativePath.replace(/\\/g, '/')}`;
        }
      }
    }
    
    const certificateData = {
      title: req.body.title || '',
      image: imageUrl || '',
      description: req.body.description || '',
      issuedBy: req.body.issuedBy || '',
      issueDate: req.body.issueDate || '',
      category: req.body.category || '',
      year: req.body.year || req.body.issueDate || '',
    };
    
    const certificate = await Certificate.create(certificateData);
    console.log('✅ Certificate created:', certificate._id);
    res.status(201).json(certificate);
  } catch (error) {
    console.error('Error creating certificate:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateCertificate = async (req, res) => {
  try {
    console.log('=== Update Certificate ===');
    console.log('Certificate ID:', req.params.id);
    console.log('Request body:', req.body);
    
    // If file is uploaded, use the uploaded image URL
    if (req.body.imageId) {
      const Image = (await import("../models/Image.js")).default;
      const imageDoc = await Image.findById(req.body.imageId);
      if (imageDoc) {
        let imageUrl = imageDoc.cloudinaryUrl || '';
        if (imageDoc.localPath && !imageUrl) {
          const path = (await import('path')).default;
          const { fileURLToPath } = await import('url');
          const __filename = fileURLToPath(import.meta.url);
          const __dirname = path.dirname(__filename);
          const backendDir = path.join(__dirname, '..');
          const uploadsBaseDir = path.join(backendDir, 'uploads');
          const relativePath = path.relative(uploadsBaseDir, imageDoc.localPath);
          imageUrl = `/api/uploads/${relativePath.replace(/\\/g, '/')}`;
        }
        req.body.image = imageUrl;
      }
    }
    
    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    console.log('✅ Certificate updated:', certificate._id);
    res.json(certificate);
  } catch (error) {
    console.error('Error updating certificate:', error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }
    res.json({ message: "Certificate deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= TESTIMONIALS =================
export const getTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ timestamp: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTestimonial = async (req, res) => {
  try {
    console.log('=== Create Testimonial ===');
    console.log('Request body:', req.body);
    
    // If imageId is provided, fetch the image URL
    let imageUrl = req.body.image || '';
    if (req.body.imageId) {
      const Image = (await import("../models/Image.js")).default;
      const imageDoc = await Image.findById(req.body.imageId);
      if (imageDoc) {
        imageUrl = imageDoc.cloudinaryUrl || '';
        if (imageDoc.localPath && !imageUrl) {
          const path = (await import('path')).default;
          const { fileURLToPath } = await import('url');
          const __filename = fileURLToPath(import.meta.url);
          const __dirname = path.dirname(__filename);
          const backendDir = path.join(__dirname, '..');
          const uploadsBaseDir = path.join(backendDir, 'uploads');
          const relativePath = path.relative(uploadsBaseDir, imageDoc.localPath);
          imageUrl = `/api/uploads/${relativePath.replace(/\\/g, '/')}`;
        }
      }
    }
    
    const testimonialData = {
      name: req.body.name || '',
      role: req.body.role || '',
      quote: req.body.quote || '',
      image: imageUrl || '',
      rating: req.body.rating ? parseInt(req.body.rating) : 5,
    };
    
    const testimonial = await Testimonial.create(testimonialData);
    console.log('✅ Testimonial created:', testimonial._id);
    res.status(201).json(testimonial);
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateTestimonial = async (req, res) => {
  try {
    console.log('=== Update Testimonial ===');
    console.log('Testimonial ID:', req.params.id);
    console.log('Request body:', req.body);
    
    // If imageId is provided, fetch the image URL
    if (req.body.imageId) {
      const Image = (await import("../models/Image.js")).default;
      const imageDoc = await Image.findById(req.body.imageId);
      if (imageDoc) {
        let imageUrl = imageDoc.cloudinaryUrl || '';
        if (imageDoc.localPath && !imageUrl) {
          const path = (await import('path')).default;
          const { fileURLToPath } = await import('url');
          const __filename = fileURLToPath(import.meta.url);
          const __dirname = path.dirname(__filename);
          const backendDir = path.join(__dirname, '..');
          const uploadsBaseDir = path.join(backendDir, 'uploads');
          const relativePath = path.relative(uploadsBaseDir, imageDoc.localPath);
          imageUrl = `/api/uploads/${relativePath.replace(/\\/g, '/')}`;
        }
        req.body.image = imageUrl;
      }
    }
    
    // Ensure rating is a number
    if (req.body.rating) {
      req.body.rating = parseInt(req.body.rating);
    }
    
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    console.log('✅ Testimonial updated:', testimonial._id);
    res.json(testimonial);
  } catch (error) {
    console.error('Error updating testimonial:', error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    res.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= SETTINGS =================
export const getSettings = async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({
        socialLinks: req.body.socialLinks || [],
        instagramUrl: req.body.instagramUrl || "",
        whatsappUrl: req.body.whatsappUrl || "",
      });
    } else {
      if (req.body.socialLinks !== undefined) {
        settings.socialLinks = req.body.socialLinks;
      }
      // Keep backward compatibility
      if (req.body.instagramUrl !== undefined) {
        settings.instagramUrl = req.body.instagramUrl;
      }
      if (req.body.whatsappUrl !== undefined) {
        settings.whatsappUrl = req.body.whatsappUrl;
      }
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
