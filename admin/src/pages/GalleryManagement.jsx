import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Image, Loader2, Upload, Star } from 'lucide-react';
import Modal from '../components/Modal';
import ConfirmationModal from '../components/ConfirmationModal';
import ErrorModal from '../components/ErrorModal';
import { galleryApi, categoriesApi, uploadImage } from '../utils/contentApi';
import { getImageUrl } from '../utils/helpers';

const GalleryManagement = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchGallery();
    fetchCategories();
  }, []);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const response = await galleryApi.getAll();
      setGalleryImages(response.data || []);
    } catch (error) {
      console.error('Error fetching gallery:', error);
      setGalleryImages([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.getAll();
      const categoriesData = response.data || [];
      setCategories(['All', ...categoriesData.map(cat => cat.name)]);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories(['All', 'Bridal', 'Blouses', 'Sarees', 'Dresses', 'Traditional']);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const response = await uploadImage(file, 'gallery');
      const imageUrl = response.data.imageUrl || response.data.url || response.data.path;
      setFormData({ ...formData, image: imageUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
      setErrorMessage('Failed to upload image. Please try again.');
      setShowErrorModal(true);
    } finally {
      setUploading(false);
    }
  };

  const handleAdd = () => {
    setFormData({
      title: '',
      image: '',
      category: categories[1] || 'Bridal',
      description: '',
      materials: '',
      price: '',
      featured: false
    });
    setEditingItem('new');
  };

  const handleEdit = (item) => {
    setEditingItem(item._id);
    setFormData({
      title: item.title || '',
      image: item.image || '',
      category: item.category || '',
      description: item.description || '',
      materials: item.materials || '',
      price: item.price || '',
      featured: item.featured || false
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      
      if (editingItem === 'new') {
        // Create new gallery item
        await galleryApi.create(formData);
      } else {
        // Update existing gallery item
        await galleryApi.update(editingItem, formData);
      }
      
      await fetchGallery();
      handleCancel();
    } catch (error) {
      console.error('Error saving gallery item:', error);
      setErrorMessage('Failed to save gallery item. Please try again.');
      setShowErrorModal(true);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setConfirmMessage('Are you sure you want to delete this gallery item?');
    setConfirmAction(() => async () => {
      try {
        await galleryApi.delete(id);
        await fetchGallery();
      } catch (error) {
        console.error('Error deleting gallery item:', error);
        setErrorMessage('Failed to delete gallery item. Please try again.');
        setShowErrorModal(true);
      }
    });
    setShowConfirmModal(true);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setFormData({});
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Gallery Management</h2>
          <p className="text-gray-600">Manage your gallery images and categories</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
        >
          <Plus size={20} />
          <span>Add Image</span>
        </button>
      </div>

      {galleryImages.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-block p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full mb-4">
            <Image size={48} className="text-blue-600" />
          </div>
          <p className="text-gray-600 text-lg font-medium">No gallery images yet</p>
          <p className="text-gray-500 text-sm mt-2">Click "Add Image" to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((item) => (
            <div 
              key={item._id} 
              className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container with Hover Effect */}
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100">
                <img 
                  src={getImageUrl(item.image)} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    e.target.src = "/VN-1.jpg";
                  }}
                />
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Featured Badge */}
                {item.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full blur-sm opacity-75 animate-pulse"></div>
                      <div className="relative bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border-2 border-yellow-300">
                        <Star className="w-4 h-4 fill-white" />
                        <span className="text-xs font-bold uppercase tracking-wide">Featured</span>
                      </div>
                    </div>
                  </div>
                )}
                {/* Category Badge - Appears on Hover */}
                <div className="absolute top-4 right-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-xs font-bold shadow-lg">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                <p className="text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  {item.price || 'Contact for pricing'}
                </p>
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Add/Edit */}
      <Modal
        isOpen={editingItem !== null}
        onClose={handleCancel}
        title={editingItem === 'new' ? 'Add Gallery Item' : 'Edit Gallery Item'}
        maxWidth="max-w-2xl"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
            <input
              type="text"
              name="title"
              placeholder="Enter title"
              value={formData.title || ''}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image *</label>
            <div className="space-y-3">
              <div className="flex gap-3">
                <input
                  type="text"
                  name="image"
                  placeholder="Enter image URL or upload image"
                  value={formData.image || ''}
                  onChange={handleChange}
                  required
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
                <label className="px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 font-semibold cursor-pointer">
                  <Upload size={18} />
                  {uploading ? 'Uploading...' : 'Upload'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>
              {formData.image && (
                <div className="mt-3">
                  <img 
                    src={getImageUrl(formData.image)} 
                    alt="Preview" 
                    className="w-full h-48 object-cover rounded-lg border border-gray-200"
                    onError={(e) => {
                      e.target.src = "/VN-1.jpg";
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
            <select
              name="category"
              value={formData.category || ''}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              <option value="">Select a category</option>
              {categories.filter(cat => cat !== 'All').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Enter description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Materials</label>
            <input
              type="text"
              name="materials"
              placeholder="Enter materials used"
              value={formData.materials || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
            <input
              type="text"
              name="price"
              placeholder="Enter price (e.g., Starting from ₹50,000)"
              value={formData.price || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-lg p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured || false}
                onChange={(e) => {
                  const isFeatured = e.target.checked;
                  if (isFeatured) {
                    // Warn user that only one item can be featured
                    const currentFeatured = galleryImages.find(img => img.featured && img._id !== editingItem);
                    if (currentFeatured) {
                      setConfirmMessage(`Setting this item as featured will remove the featured tag from "${currentFeatured.title}". Continue?`);
                      setConfirmAction(() => () => {
                        setFormData({ ...formData, featured: isFeatured });
                      });
                      setShowConfirmModal(true);
                      return;
                    }
                  }
                  setFormData({ ...formData, featured: isFeatured });
                }}
                className="w-5 h-5 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500 focus:ring-2 cursor-pointer"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-600 fill-yellow-600" />
                  <span className="text-sm font-semibold text-gray-900">Mark as Featured</span>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Only one item can be featured at a time. Featured items appear first on the home page and gallery.
                </p>
              </div>
            </label>
          </div>
          
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              disabled={saving || uploading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save
                </>
              )}
            </button>
            <button
              onClick={handleCancel}
              disabled={saving || uploading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => {
          if (confirmAction) {
            confirmAction();
          }
        }}
        title="Confirm Action"
        message={confirmMessage}
        confirmText="Confirm"
        cancelText="Cancel"
        type="warning"
      />

      {/* Error Modal */}
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Error"
        message={errorMessage}
      />
    </div>
  );
};

export default GalleryManagement;
