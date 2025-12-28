import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Loader2, Star } from 'lucide-react';
import Modal from '../components/Modal';
import { testimonialsApi, uploadImage } from '../utils/contentApi';
import { getImageUrl } from '../utils/helpers';

const TestimonialManagement = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const response = await testimonialsApi.getAll();
      setTestimonials(response.data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setTestimonials([]);
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

    // Show immediate preview using FileReader
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    try {
      setUploading(true);
      const response = await uploadImage(file, 'testimonials');
      const imageUrl = response.data.url;
      setFormData({ ...formData, image: imageUrl, imageId: response.data.imageId });
      setImagePreview(getImageUrl(imageUrl));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleAdd = () => {
    setFormData({
      name: '',
      role: '',
      quote: '',
      image: '',
      rating: 5,
    });
    setImagePreview(null);
    setEditingItem('new');
  };

  const handleEdit = (item) => {
    setFormData({
      _id: item._id,
      name: item.name || '',
      role: item.role || '',
      quote: item.quote || '',
      image: item.image || '',
      rating: item.rating || 5,
    });
    setImagePreview(item.image ? getImageUrl(item.image) : null);
    setEditingItem(item._id);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.quote) {
      alert('Please fill in name and quote');
      return;
    }

    try {
      setSaving(true);
      if (editingItem === 'new') {
        await testimonialsApi.create(formData);
      } else {
        await testimonialsApi.update(editingItem, formData);
      }
      await fetchTestimonials();
      handleCancel();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Failed to save testimonial. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this testimonial?')) {
      return;
    }

    try {
      await testimonialsApi.delete(id);
      await fetchTestimonials();
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      alert('Failed to delete testimonial. Please try again.');
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
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Testimonial Management</h2>
          <p className="text-gray-600">Manage client testimonials</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
        >
          <Plus size={20} />
          <span>Add Testimonial</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="animate-spin text-blue-600" size={48} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div 
              key={item._id} 
              className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container if available */}
              {item.image && (
                <div className="relative h-40 sm:h-48 overflow-hidden bg-gray-100">
                  <img 
                    src={getImageUrl(item.image)} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              )}
              
              {/* Content Section */}
              <div className="p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-3">
                  {item.image ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-100 flex-shrink-0">
                      <img 
                        src={getImageUrl(item.image)} 
                        alt={item.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {item.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 truncate">
                      {item.name}
                    </h3>
                    {item.role && (
                      <p className="text-xs sm:text-sm text-gray-600 truncate">{item.role}</p>
                    )}
                  </div>
                </div>
                
                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < (item.rating || 5)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-gray-200 text-gray-200'
                      }`}
                    />
                  ))}
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-3 italic">"{item.quote}"</p>
                
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
        title={editingItem === 'new' ? 'Add Testimonial' : 'Edit Testimonial'}
        maxWidth="max-w-3xl"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
              <input
                type="text"
                name="name"
                placeholder="Enter client name"
                value={formData.name || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <input
                type="text"
                name="role"
                placeholder="Enter client role (e.g., Bride, Client)"
                value={formData.role || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quote/Testimonial *</label>
            <textarea
              name="quote"
              placeholder="Enter testimonial quote"
              value={formData.quote || ''}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <select
              name="rating"
              value={formData.rating || 5}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              <option value={1}>1 Star</option>
              <option value={2}>2 Stars</option>
              <option value={3}>3 Stars</option>
              <option value={4}>4 Stars</option>
              <option value={5}>5 Stars</option>
            </select>
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
                      alt="Testimonial Preview" 
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

      {!loading && testimonials.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-block p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full mb-4">
            <Plus size={48} className="text-blue-600" />
          </div>
          <p className="text-gray-600 text-lg font-medium">No testimonials yet</p>
          <p className="text-gray-500 text-sm mt-2">Click "Add Testimonial" to get started</p>
        </div>
      )}
    </div>
  );
};

export default TestimonialManagement;

