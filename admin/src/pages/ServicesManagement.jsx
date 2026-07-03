import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Loader2, ShoppingBag } from 'lucide-react';
import Modal from '../components/Modal';
import ConfirmationModal from '../components/ConfirmationModal';
import ErrorModal from '../components/ErrorModal';
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
  const [errorMessage, setErrorMessage] = useState('');
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
      setCategories([]);
    }
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await servicesApi.getAll();
      setServices(response.data || []);
    } catch (error) {
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
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
    try {
      setUploading(true);
      const response = await uploadImage(file, 'services');
      const imageUrl = response.data.url;
      setFormData({ ...formData, image: imageUrl, imageId: response.data.imageId });
      setImagePreview(getImageUrl(imageUrl));
    } catch (error) {
      setErrorMessage('Failed to upload image. Please try again.');
      setShowErrorModal(true);
    } finally {
      setUploading(false);
    }
  };

  const handleAdd = () => {
    setFormData({ title: '', description: '', image: '', price: '', category: '' });
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

  const formatPrice = (price) => {
    if (!price) return '';
    const trimmed = price.toString().trim();
    if (trimmed.startsWith('₹')) return trimmed;
    return `₹ ${trimmed}`;
  };

  const labelClass = 'block text-[10px] font-medium tracking-widest uppercase text-gray-500 mb-2';
  const inputClass = 'w-full px-4 py-3 border border-gray-200 bg-white text-sm focus:outline-none focus:border-black transition-colors font-light';

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1
            className="text-4xl sm:text-5xl font-light text-black mb-1"
            style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
          >
            Services
          </h1>
          <p className="text-[10px] text-gray-400 tracking-widest uppercase">Manage your services and pricing</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 bg-black text-white text-[10px] font-medium tracking-widest uppercase hover:bg-gray-800 transition-all duration-200"
        >
          <Plus size={14} />
          Add Service
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="animate-spin text-black" size={36} />
        </div>
      ) : services.length === 0 ? (
        <div className="text-center py-24 border border-gray-200 bg-white">
          <ShoppingBag size={40} className="text-gray-300 mx-auto mb-4" />
          <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">No services yet</p>
          <p className="text-xs text-gray-300 mb-6">Add your first service to get started</p>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-[10px] font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors"
          >
            <Plus size={13} /> Add Service
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item) => (
            <div
              key={item._id}
              className="group bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              {item.image ? (
                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ) : (
                <div className="h-52 bg-gray-50 border-b border-gray-100 flex items-center justify-center">
                  <ShoppingBag size={32} className="text-gray-200" />
                </div>
              )}

              {/* Content */}
              <div className="p-5">
                {/* Category tag */}
                {item.category && (
                  <span className="inline-block mb-3 px-2 py-0.5 border border-[#b8860b]/30 text-[9px] font-medium tracking-widest uppercase text-[#b8860b]">
                    {item.category}
                  </span>
                )}

                {/* Title */}
                <h3
                  className="text-lg font-light text-black mb-2 leading-snug"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {item.title}
                </h3>

                {/* Description */}
                {item.description && (
                  <p className="text-[11px] text-gray-500 mb-3 line-clamp-2 leading-relaxed font-light">
                    {item.description}
                  </p>
                )}

                {/* Price */}
                {item.price && (
                  <p className="text-xs font-medium text-black tracking-wider mb-4">
                    {formatPrice(item.price)}
                  </p>
                )}

                {/* Actions */}
                <div className="flex gap-2 border-t border-gray-100 pt-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-black text-black text-[10px] font-medium tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-200"
                  >
                    <Edit size={12} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-300 text-gray-600 text-[10px] font-medium tracking-widest uppercase hover:bg-black hover:text-white hover:border-black transition-all duration-200"
                  >
                    <Trash2 size={12} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={editingItem !== null}
        onClose={handleCancel}
        title={editingItem === 'new' ? 'Add Service' : 'Edit Service'}
        maxWidth="max-w-2xl"
      >
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Service Title *</label>
            <input
              type="text"
              name="title"
              placeholder="Enter service title"
              value={formData.title || ''}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              name="description"
              placeholder="Enter service description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={4}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Price</label>
              <input
                type="text"
                name="price"
                placeholder="e.g. 5000 or Starting from ₹8,000"
                value={formData.price || ''}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Category</label>
              <select
                name="category"
                value={formData.category || ''}
                onChange={handleChange}
                className={inputClass}
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
            <label className={labelClass}>Image</label>
            <div className="space-y-3">
              <label className="flex items-center justify-center gap-2 px-4 py-3 border border-dashed border-gray-300 cursor-pointer hover:border-black transition-colors bg-gray-50">
                <Upload size={16} className="text-gray-400" />
                <span className="text-[10px] tracking-widest uppercase text-gray-400">
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
              {(imagePreview || formData.image) ? (
                <div className="relative border border-gray-200 overflow-hidden">
                  <img
                    src={imagePreview || getImageUrl(formData.image)}
                    alt="Preview"
                    className="w-full h-48 object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  {uploading && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="bg-white px-4 py-2 flex items-center gap-2">
                        <Loader2 className="animate-spin text-black" size={16} />
                        <span className="text-xs text-gray-700">Uploading...</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-36 border border-dashed border-gray-200 flex flex-col items-center justify-center bg-gray-50 text-gray-300">
                  <Upload size={28} className="mb-2" />
                  <p className="text-[10px] tracking-widest uppercase">No image selected</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving || uploading}
              className="flex-1 py-3 bg-black text-white text-[10px] font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {saving ? (
                <><Loader2 className="animate-spin" size={13} />Saving...</>
              ) : (
                <><Save size={13} />Save Service</>
              )}
            </button>
            <button
              onClick={handleCancel}
              disabled={saving || uploading}
              className="flex-1 py-3 border border-gray-300 text-gray-600 text-[10px] font-medium tracking-widest uppercase hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <X size={13} />Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => { if (confirmAction) confirmAction(); }}
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
