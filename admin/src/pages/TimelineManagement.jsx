import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Upload, Loader2 } from 'lucide-react';
import Modal from '../components/Modal';
import { timelineApi, uploadImage } from '../utils/contentApi';
import { getImageUrl } from '../utils/helpers';

const TimelineManagement = () => {
  const [timeline, setTimeline] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchTimeline();
  }, []);

  const fetchTimeline = async () => {
    try {
      setLoading(true);
      const response = await timelineApi.getAll();
      setTimeline(response.data || []);
    } catch (error) {
      console.error('Error fetching timeline:', error);
      setTimeline([]);
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
      const response = await uploadImage(file, 'timeline');
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
      year: '',
      title: '',
      event: '',
      description: '',
      image: '',
      eventDate: '',
      place: '',
      creationDate: ''
    });
    setImagePreview(null);
    setEditingItem('new');
  };

  const handleEdit = (item) => {
    setFormData({
      _id: item._id,
      year: item.year || '',
      title: item.title || item.event || '',
      event: item.event || item.title || '',
      description: item.description || '',
      image: item.image || '',
      eventDate: item.eventDate || '',
      place: item.place || '',
      creationDate: item.creationDate || ''
    });
    setImagePreview(item.image ? getImageUrl(item.image) : null);
    setEditingItem(item._id);
  };

  const handleSave = async () => {
    if (!formData.year || (!formData.title && !formData.event)) {
      alert('Please fill in year and title/event');
      return;
    }
    
    // Ensure title is set (required by backend)
    if (!formData.title && formData.event) {
      formData.title = formData.event;
    }
    if (!formData.event && formData.title) {
      formData.event = formData.title;
    }

    try {
      setSaving(true);
      if (editingItem === 'new') {
        await timelineApi.create(formData);
      } else {
        await timelineApi.update(editingItem, formData);
      }
      await fetchTimeline();
      handleCancel();
    } catch (error) {
      console.error('Error saving timeline:', error);
      alert('Failed to save timeline item. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this timeline item?')) {
      return;
    }

    try {
      await timelineApi.delete(id);
      await fetchTimeline();
    } catch (error) {
      console.error('Error deleting timeline:', error);
      alert('Failed to delete timeline item. Please try again.');
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
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Timeline Management</h2>
          <p className="text-gray-600">Manage your career timeline events</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
        >
          <Plus size={20} />
          <span>Add Timeline Item</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="animate-spin text-blue-600" size={48} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {timeline.map((item) => (
            <div 
              key={item._id} 
              className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container if available */}
              {item.image && (
                <div className="relative h-40 sm:h-48 overflow-hidden bg-gray-100">
                  <img 
                    src={getImageUrl(item.image)} 
                    alt={item.event || item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              )}
              
              {/* Content Section */}
              <div className="p-4 sm:p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {item.year}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                    {item.event || item.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.eventDate && (
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 rounded-full text-xs font-semibold">
                      📅 {item.eventDate}
                    </span>
                  )}
                  {item.place && (
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 rounded-full text-xs font-semibold">
                      📍 {item.place}
                    </span>
                  )}
                </div>
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
        title={editingItem === 'new' ? 'Add Timeline Item' : 'Edit Timeline Item'}
        maxWidth="max-w-3xl"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
              <input
                type="text"
                name="year"
                placeholder="Enter year"
                value={formData.year || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
              <input
                type="text"
                name="event"
                placeholder="Enter event title"
                value={formData.event || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
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
                      alt="Timeline Preview" 
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Event Date</label>
              <input
                type="text"
                name="eventDate"
                placeholder="Event date"
                value={formData.eventDate || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Place</label>
              <input
                type="text"
                name="place"
                placeholder="Place"
                value={formData.place || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Creation Date</label>
              <input
                type="text"
                name="creationDate"
                placeholder="Creation date"
                value={formData.creationDate || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
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

      {timeline.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-block p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full mb-4">
            <Plus size={48} className="text-blue-600" />
          </div>
          <p className="text-gray-600 text-lg font-medium">No timeline items yet</p>
          <p className="text-gray-500 text-sm mt-2">Click "Add Timeline Item" to get started</p>
        </div>
      )}
    </div>
  );
};

export default TimelineManagement;
