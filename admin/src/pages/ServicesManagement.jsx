import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Loader2 } from 'lucide-react';
import Modal from '../components/Modal';
import { servicesApi, categoriesApi, uploadImage } from '../utils/contentApi';
import { getImageUrl } from '../utils/helpers';

const ServicesManagement = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchServices();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await categoriesApi.getAll();
      setCategories(response.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await servicesApi.getAll();
      setServices(response.data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select an image file');
      setShowErrorModal(true);
      return;
    }

    // Show immediate preview using FileReader
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    try {
      setUploading(true);
      const response = await uploadImage(file, 'services');
      const imageUrl = response.data.url;
      setFormData({ ...formData, image: imageUrl, imageId: response.data.imageId });
      setImagePreview(getImageUrl(imageUrl));
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
      description: '',
      image: '',
      price: '',
      category: '',
    });
    setImagePreview(null);
    setEditingItem('new');
  };

  const handleEdit = (item) => {
    setFormData({
      _id: item._id,
      title: item.title || '',
      description: item.description || '',
      image: item.image || '',
      price: item.price || '',
      category: item.category || '',
    });
    setImagePreview(item.image ? getImageUrl(item.image) : null);
    setEditingItem(item._id);
  };

  const handleSave = async () => {
    if (!formData.title) {
      setErrorMessage('Please fill in service title');
      setShowErrorModal(true);
      return;
    }

    try {
      setSaving(true);
      if (editingItem === 'new') {
        await servicesApi.create(formData);
      } else {
        await servicesApi.update(editingItem, formData);
      }
      await fetchServices();
      handleCancel();
    } catch (error) {
      console.error('Error saving service:', error);
      setErrorMessage('Failed to save service. Please try again.');
      setShowErrorModal(true);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setConfirmAction(() => async () => {
      try {
        await servicesApi.delete(id);
        await fetchServices();
      } catch (error) {
        console.error('Error deleting service:', error);
        setErrorMessage('Failed to delete service. Please try again.');
        setShowErrorModal(true);
      }
    });
    setShowConfirmModal(true);
  };

  const handleCancel = () => {
    setEditingItem(null);
    setFormData({});
    setImagePreview(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Services Management</h2>
          <p className="text-gray-600">Manage your services and pricing</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
        >
          <Plus size={20} />
          <span>Add Service</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="animate-spin text-blue-600" size={48} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item) => (
            <div 
              key={item._id} 
              className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container with Hover Effect */}
              {item.image && (
                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-100">
                  <img 
                    src={getImageUrl(item.image)} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              )}
              
              {/* Content Section */}
              <div className="p-4 sm:p-5">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                {item.category && (
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold mb-2">
                    {item.category}
                  </span>
                )}
                {item.price && (
                  <p className="text-base font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    {item.price.trim().startsWith('₹') ? item.price : `₹ ${item.price.trim()}`}
                  </p>
                )}
                
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

      {!loading && services.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-block p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full mb-4">
            <Plus size={48} className="text-blue-600" />
          </div>
          <p className="text-gray-600 text-lg font-medium">No services yet</p>
          <p className="text-gray-500 text-sm mt-2">Click "Add Service" to get started</p>
        </div>
      )}

      {/* Modal for Add/Edit */}
      <Modal
        isOpen={editingItem !== null}
        onClose={handleCancel}
        title={editingItem === 'new' ? 'Add Service' : 'Edit Service'}
        maxWidth="max-w-3xl"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service Title *</label>
            <input
              type="text"
              name="title"
              placeholder="Enter service title"
              value={formData.title || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Enter service description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
              <input
                type="text"
                name="price"
                placeholder="Enter price (e.g., Starting from ₹8,000)"
                value={formData.price || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                name="category"
                value={formData.category || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
            <div className="flex flex-col gap-3">
              <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors bg-gray-50 hover:bg-gray-100">
                <Upload size={20} className="text-gray-500" />
                <span className="text-sm text-gray-600">
                  {uploading ? 'Uploading...' : 'Click to upload image'}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </label>
              {/* Preview Section */}
              <div className="relative">
                {imagePreview || formData.image ? (
                  <div className="relative w-full border-2 border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                    <div className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-gray-700 flex items-center gap-1">
                      <span>📷</span>
                      <span>Preview</span>
                    </div>
                    <img 
                      src={imagePreview || getImageUrl(formData.image)} 
                      alt="Service Preview" 
                      className="w-full h-48 sm:h-64 object-contain p-2"
                      onError={(e) => {
                        console.error('Preview image failed to load:', imagePreview || formData.image);
                        e.target.style.display = 'none';
                      }}
                    />
                    {uploading && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-4 flex items-center gap-2">
                          <Loader2 className="animate-spin text-blue-600" size={20} />
                          <span className="text-sm text-gray-700">Uploading...</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-48 sm:h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 text-gray-400">
                    <Upload size={48} className="mb-2 opacity-50" />
                    <p className="text-sm">No image selected</p>
                    <p className="text-xs mt-1">Upload an image to see preview</p>
                  </div>
                )}
              </div>
            </div>
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
        title="Delete Service"
        message="Are you sure you want to delete this service? This action cannot be undone."
        confirmText="Delete"
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

export default ServicesManagement;
