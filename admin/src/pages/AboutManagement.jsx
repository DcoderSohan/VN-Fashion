import React, { useState, useEffect } from 'react';
import { Save, Upload } from 'lucide-react';
import { aboutApi, uploadImage } from '../utils/contentApi';
import { getImageUrl } from '../utils/helpers';

const AboutManagement = () => {
  const [formData, setFormData] = useState({
    aboutText: '',
    designerName: '',
    designerTitle: '',
    designerBio: '',
    designerImage: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  // Fetch about content on component mount
  useEffect(() => {
    const fetchAbout = async () => {
      setLoading(true);
      setError('');
      try {
        console.log('Fetching about content...');
        const response = await aboutApi.get();
        console.log('About content response:', response.data);
        
        if (response.data) {
          setFormData({
            aboutText: response.data.aboutText || '',
            designerName: response.data.designerName || '',
            designerTitle: response.data.designerTitle || '',
            designerBio: response.data.designerBio || '',
            designerImage: response.data.designerImage || ''
          });
          console.log('Form data set:', {
            aboutText: response.data.aboutText || '',
            designerName: response.data.designerName || '',
            designerTitle: response.data.designerTitle || '',
            designerBio: response.data.designerBio || '',
            designerImage: response.data.designerImage || ''
          });
        }
      } catch (err) {
        console.error('Error fetching about content:', err);
        setError('Failed to load about content. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
    setSuccess('');
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setError('Image size must be less than 2MB');
      return;
    }

    // Preview image
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    setUploadingImage(true);
    setError('');
    setSuccess('');

    try {
      console.log('Uploading image...');
      const response = await uploadImage(file, 'designer-images');
      console.log('Image upload response:', response.data);

      if (response.data && response.data.url) {
        setFormData(prev => ({
          ...prev,
          designerImage: response.data.url
        }));
        setSuccess('Image uploaded successfully!');
        setImagePreview('');
      }
    } catch (err) {
      console.error('Error uploading image:', err);
      setError(err.response?.data?.message || 'Failed to upload image');
      setImagePreview('');
    } finally {
      setUploadingImage(false);
      e.target.value = '';
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');
    
    try {
      console.log('Saving about content...');
      console.log('Form data being sent:', formData);
      
      const response = await aboutApi.update(formData);
      console.log('Save response:', response.data);
      
      if (response.data) {
        // Update form data with response from server
        setFormData({
          aboutText: response.data.aboutText || '',
          designerName: response.data.designerName || '',
          designerTitle: response.data.designerTitle || '',
          designerBio: response.data.designerBio || '',
          designerImage: response.data.designerImage || ''
        });
        
        setSuccess('About content saved successfully!');
        
        // Verify by fetching again after a short delay
        setTimeout(async () => {
          try {
            const verifyResponse = await aboutApi.get();
            console.log('Verification fetch:', verifyResponse.data);
            if (verifyResponse.data) {
              setFormData({
                aboutText: verifyResponse.data.aboutText || '',
                designerName: verifyResponse.data.designerName || '',
                designerTitle: verifyResponse.data.designerTitle || '',
                designerBio: verifyResponse.data.designerBio || '',
                designerImage: verifyResponse.data.designerImage || ''
              });
            }
          } catch (err) {
            console.error('Error verifying save:', err);
          }
        }, 1000);
      }
    } catch (err) {
      console.error('Error saving about content:', err);
      console.error('Error response:', err.response);
      setError(err.response?.data?.message || err.message || 'Failed to save about content. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-gray-600">Loading about content...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">About Page Management</h2>
          <p className="text-gray-600">Edit the About page content and designer information</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={20} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
          {success}
        </div>
      )}

      <div className="space-y-6 max-w-4xl">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
          <label className="block mb-3 font-semibold text-gray-900 text-lg">About Text</label>
          <textarea
            name="aboutText"
            value={formData.aboutText}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
            placeholder="Enter about text..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <label className="block mb-3 font-semibold text-gray-900">Designer Name</label>
            <input
              type="text"
              name="designerName"
              value={formData.designerName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Designer name"
            />
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
            <label className="block mb-3 font-semibold text-gray-900">Designer Title</label>
            <input
              type="text"
              name="designerTitle"
              value={formData.designerTitle}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Designer title"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <label className="block mb-3 font-semibold text-gray-900 text-lg">Designer Bio</label>
          <textarea
            name="designerBio"
            value={formData.designerBio}
            onChange={handleChange}
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            placeholder="Designer biography"
          />
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <label className="block mb-3 font-semibold text-gray-900 text-lg">Designer Image</label>
          
          {/* Image Upload */}
          <div className="mb-4">
            <label
              htmlFor="designer-image-upload"
              className={`inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg cursor-pointer transition-all duration-300 font-semibold hover:shadow-lg ${uploadingImage ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <Upload size={20} />
              {uploadingImage ? 'Uploading...' : 'Upload Image'}
            </label>
            <input
              type="file"
              id="designer-image-upload"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploadingImage}
              className="hidden"
            />
            <p className="mt-2 text-sm text-gray-500">Max size: 2MB</p>
          </div>

          {/* Image Preview or Current Image */}
          {imagePreview ? (
            <div className="mt-3 relative inline-block">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-32 h-32 object-cover rounded-lg shadow-md border-2 border-gray-200" 
              />
            </div>
          ) : formData.designerImage ? (
            <div className="mt-3 relative inline-block">
              <img 
                src={getImageUrl(formData.designerImage)} 
                alt="Designer" 
                className="w-32 h-32 object-cover rounded-lg shadow-md border-2 border-gray-200" 
                onError={(e) => {
                  console.error('Image load error:', formData.designerImage);
                  e.target.style.display = 'none';
                }}
              />
            </div>
          ) : null}

          {/* Manual URL Input (optional) */}
          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">Or enter image URL manually</label>
            <input
              type="text"
              name="designerImage"
              value={formData.designerImage}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="/vidisha.jpg or https://..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutManagement;
