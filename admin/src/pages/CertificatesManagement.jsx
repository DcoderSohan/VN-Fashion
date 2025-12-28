import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Award, Upload, Loader2 } from 'lucide-react';
import Modal from '../components/Modal';
import { certificatesApi, uploadImage } from '../utils/contentApi';
import { getImageUrl } from '../utils/helpers';

const CertificatesManagement = () => {
  const [certificates, setCertificates] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const response = await certificatesApi.getAll();
      setCertificates(response.data || []);
    } catch (error) {
      console.error('Error fetching certificates:', error);
      setCertificates([]);
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
      alert('Please select an image file');
      return;
    }

    // Show immediate preview using FileReader (before upload)
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    try {
      setUploading(true);
      const response = await uploadImage(file, 'certificates');
      const imageUrl = response.data.url;
      setFormData({ ...formData, image: imageUrl, imageId: response.data.imageId });
      // Update preview with uploaded URL
      setImagePreview(getImageUrl(imageUrl));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
      // Keep the local preview even if upload fails
    } finally {
      setUploading(false);
    }
  };

  const handleAdd = () => {
    setFormData({
      title: '',
      image: '',
      description: '',
      issuedBy: '',
      issueDate: '',
      category: '',
      year: ''
    });
    setImagePreview(null);
    setEditingItem('new');
  };

  const handleEdit = (item) => {
    const imageUrl = item.image ? getImageUrl(item.image) : '';
    setFormData({
      _id: item._id,
      title: item.title || '',
      image: item.image || '',
      description: item.description || '',
      issuedBy: item.issuedBy || '',
      issueDate: item.issueDate || '',
      category: item.category || '',
      year: item.year || item.issueDate || ''
    });
    // Set preview with full URL
    setImagePreview(imageUrl);
    setEditingItem(item._id);
  };

  const handleSave = async () => {
    if (!formData.title || !formData.image) {
      alert('Please fill in title and upload an image');
      return;
    }

    try {
      setSaving(true);
      if (editingItem === 'new') {
        // Create new certificate
        await certificatesApi.create(formData);
      } else {
        // Update existing certificate
        await certificatesApi.update(editingItem, formData);
      }
      await fetchCertificates();
      handleCancel();
    } catch (error) {
      console.error('Error saving certificate:', error);
      alert('Failed to save certificate. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this certificate?')) {
      return;
    }

    try {
      await certificatesApi.delete(id);
      await fetchCertificates();
    } catch (error) {
      console.error('Error deleting certificate:', error);
      alert('Failed to delete certificate. Please try again.');
    }
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
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Certificates Management</h2>
          <p className="text-gray-600">Manage your certificates and achievements</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
        >
          <Plus size={20} />
          <span>Add Certificate</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="animate-spin text-blue-600" size={48} />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {certificates.map((item) => (
            <div 
              key={item._id} 
              className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container with Hover Effect */}
              <div className="relative h-32 sm:h-40 overflow-hidden bg-gray-100">
                <img 
                  src={getImageUrl(item.image)} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Award Icon - Appears on Hover */}
              <div className="absolute top-2 right-2 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                <Award className="text-white" size={20} />
              </div>
            </div>

            {/* Content Section */}
            <div className="p-3 sm:p-4">
              <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                {item.title}
              </h3>
              
              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex-1 px-2 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-1 font-semibold text-xs"
                >
                  <Edit size={14} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 px-2 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-1 font-semibold text-xs"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        </div>
      )}

      {certificates.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-block p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full mb-4">
            <Award size={48} className="text-blue-600" />
          </div>
          <p className="text-gray-600 text-lg font-medium">No certificates yet</p>
          <p className="text-gray-500 text-sm mt-2">Click "Add Certificate" to get started</p>
        </div>
      )}

      {/* Modal for Add/Edit */}
      <Modal
        isOpen={editingItem !== null}
        onClose={handleCancel}
        title={editingItem === 'new' ? 'Add Certificate' : 'Edit Certificate'}
        maxWidth="max-w-3xl"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Title *</label>
            <input
              type="text"
              name="title"
              placeholder="Enter certificate title"
              value={formData.title || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Certificate Image *</label>
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
                      alt="Certificate Preview" 
                      className="w-full h-64 sm:h-80 object-contain p-2"
                      onError={(e) => {
                        console.error('Preview image failed to load:', imagePreview || formData.image);
                        e.target.style.display = 'none';
                        const errorDiv = document.createElement('div');
                        errorDiv.className = 'w-full h-64 sm:h-80 flex items-center justify-center text-gray-400';
                        errorDiv.textContent = 'Failed to load image';
                        e.target.parentNode?.appendChild(errorDiv);
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
                  <div className="w-full h-64 sm:h-80 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 text-gray-400">
                    <Upload size={48} className="mb-2 opacity-50" />
                    <p className="text-sm">No image selected</p>
                    <p className="text-xs mt-1">Upload an image to see preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              placeholder="Enter certificate description"
              value={formData.description || ''}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Issued By</label>
              <input
                type="text"
                name="issuedBy"
                placeholder="Organization/Institute name"
                value={formData.issuedBy || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date</label>
              <input
                type="text"
                name="issueDate"
                placeholder="Year or Date"
                value={formData.issueDate || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <input
              type="text"
              name="category"
              placeholder="e.g., Professional, Academic, Award"
              value={formData.category || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
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
    </div>
  );
};

export default CertificatesManagement;
