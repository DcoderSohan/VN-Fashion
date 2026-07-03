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
      setErrorMessage('Failed to upload image. Please try again.');
      setShowErrorModal(true);
    } finally {
      setUploading(false);
    }
  };

  const handleAdd = () => {
    setFormData({
      title: '', image: '', category: categories[1] || 'Bridal',
      description: '', materials: '', price: '', featured: false
    });
    setEditingItem('new');
  };

  const handleEdit = (item) => {
    setEditingItem(item._id);
    setFormData({
      title: item.title || '', image: item.image || '', category: item.category || '',
      description: item.description || '', materials: item.materials || '',
      price: item.price || '', featured: item.featured || false
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      if (editingItem === 'new') {
        await galleryApi.create(formData);
      } else {
        await galleryApi.update(editingItem, formData);
      }
      await fetchGallery();
      handleCancel();
    } catch (error) {
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
        <Loader2 className="animate-spin text-black" size={36} />
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1
            className="text-4xl sm:text-5xl font-light text-black mb-1"
            style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
          >
            Gallery
          </h1>
          <p className="text-[10px] text-gray-400 tracking-widest uppercase">Manage gallery images and categories</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-xs font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors"
        >
          <Plus size={14} />
          Add Image
        </button>
      </div>

      {galleryImages.length === 0 ? (
        <div className="text-center py-24 border border-gray-200 bg-white">
          <Image size={40} className="text-gray-300 mx-auto mb-4" />
          <p className="text-xs text-gray-400 tracking-widest uppercase mb-1">No gallery images yet</p>
          <p className="text-xs text-gray-300">Click "Add Image" to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {galleryImages.map((item) => (
            <div
              key={item._id}
              className="group bg-white border border-gray-200 hover:border-black transition-colors duration-200 overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-gray-100">
                <img
                  src={getImageUrl(item.image)}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => { e.target.src = "/VN-1.jpg"; }}
                />
                {item.featured && (
                  <div className="absolute top-3 left-3">
                    <span className="bg-black text-white text-[9px] font-medium tracking-widest uppercase px-2 py-1 flex items-center gap-1">
                      <Star size={9} className="fill-white" />
                      Featured
                    </span>
                  </div>
                )}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="bg-white border border-gray-200 text-black text-[9px] font-medium tracking-widest uppercase px-2 py-1">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-sm font-medium text-black mb-1 truncate">{item.title}</h3>
                <p className="text-xs text-gray-400 mb-1 line-clamp-2">{item.description}</p>
                <p className="text-xs font-medium text-black mb-4">{item.price || 'Contact for pricing'}</p>

                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-black text-black text-[10px] font-medium tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-200"
                  >
                    <Edit size={12} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-gray-300 text-gray-500 text-[10px] font-medium tracking-widest uppercase hover:bg-black hover:text-white hover:border-black transition-all duration-200"
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

      {/* Modal for Add/Edit */}
      <Modal
        isOpen={editingItem !== null}
        onClose={handleCancel}
        title={editingItem === 'new' ? 'Add Gallery Item' : 'Edit Gallery Item'}
        maxWidth="max-w-2xl"
      >
        <div className="space-y-5">
          <div>
            <label className="block text-[10px] font-medium tracking-widest uppercase text-gray-500 mb-2">Title *</label>
            <input
              type="text" name="title" placeholder="Enter title"
              value={formData.title || ''} onChange={handleChange} required
              className="w-full px-4 py-3 border border-gray-300 bg-white text-sm focus:outline-none focus:border-black transition-colors"
            />
          </div>

          <div>
            <label className="block text-[10px] font-medium tracking-widest uppercase text-gray-500 mb-2">Image *</label>
            <div className="flex gap-2">
              <input
                type="text" name="image" placeholder="Enter image URL or upload"
                value={formData.image || ''} onChange={handleChange} required
                className="flex-1 px-4 py-3 border border-gray-300 bg-white text-sm focus:outline-none focus:border-black transition-colors"
              />
              <label className="px-4 py-3 bg-black text-white text-xs font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors flex items-center gap-2 cursor-pointer whitespace-nowrap">
                <Upload size={13} />
                {uploading ? 'Uploading...' : 'Upload'}
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
              </label>
            </div>
            {formData.image && (
              <img
                src={getImageUrl(formData.image)} alt="Preview"
                className="w-full h-40 object-cover mt-3 border border-gray-200"
                onError={(e) => { e.target.src = "/VN-1.jpg"; }}
              />
            )}
          </div>

          <div>
            <label className="block text-[10px] font-medium tracking-widest uppercase text-gray-500 mb-2">Category *</label>
            <select
              name="category" value={formData.category || ''} onChange={handleChange} required
              className="w-full px-4 py-3 border border-gray-300 bg-white text-sm focus:outline-none focus:border-black transition-colors"
            >
              <option value="">Select a category</option>
              {categories.filter(cat => cat !== 'All').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-medium tracking-widest uppercase text-gray-500 mb-2">Description</label>
            <textarea
              name="description" placeholder="Enter description"
              value={formData.description || ''} onChange={handleChange} rows={3}
              className="w-full px-4 py-3 border border-gray-300 bg-white text-sm focus:outline-none focus:border-black transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-gray-500 mb-2">Materials</label>
              <input
                type="text" name="materials" placeholder="Materials used"
                value={formData.materials || ''} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 bg-white text-sm focus:outline-none focus:border-black transition-colors"
              />
            </div>
            <div>
              <label className="block text-[10px] font-medium tracking-widest uppercase text-gray-500 mb-2">Price</label>
              <input
                type="text" name="price" placeholder="e.g. Starting from ₹50,000"
                value={formData.price || ''} onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 bg-white text-sm focus:outline-none focus:border-black transition-colors"
              />
            </div>
          </div>

          <div className="border border-gray-200 bg-gray-50 p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox" name="featured"
                checked={formData.featured || false}
                onChange={(e) => {
                  const isFeatured = e.target.checked;
                  if (isFeatured) {
                    const currentFeatured = galleryImages.find(img => img.featured && img._id !== editingItem);
                    if (currentFeatured) {
                      setConfirmMessage(`Setting this as featured will remove the tag from "${currentFeatured.title}". Continue?`);
                      setConfirmAction(() => () => setFormData({ ...formData, featured: isFeatured }));
                      setShowConfirmModal(true);
                      return;
                    }
                  }
                  setFormData({ ...formData, featured: isFeatured });
                }}
                className="w-4 h-4 cursor-pointer"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <Star size={13} className="text-black fill-black" />
                  <span className="text-xs font-medium text-black tracking-wide">Mark as Featured</span>
                </div>
                <p className="text-[10px] text-gray-400 mt-0.5">Only one item can be featured at a time.</p>
              </div>
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave} disabled={saving || uploading}
              className="flex-1 py-3 bg-black text-white text-xs font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {saving ? <><Loader2 className="animate-spin" size={13} />Saving...</> : <><Save size={13} />Save</>}
            </button>
            <button
              onClick={handleCancel} disabled={saving || uploading}
              className="flex-1 py-3 border border-gray-300 text-gray-600 text-xs font-medium tracking-widest uppercase hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <X size={13} />
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmationModal
        isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}
        onConfirm={() => { if (confirmAction) confirmAction(); }}
        title="Confirm Action" message={confirmMessage}
        confirmText="Confirm" cancelText="Cancel" type="warning"
      />
      <ErrorModal
        isOpen={showErrorModal} onClose={() => setShowErrorModal(false)}
        title="Error" message={errorMessage}
      />
    </div>
  );
};

export default GalleryManagement;
