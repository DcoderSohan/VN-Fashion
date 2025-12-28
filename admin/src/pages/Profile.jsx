import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Camera, Save, LogOut, Key } from 'lucide-react';
import api from '../utils/api';
import { getImageUrl } from '../utils/helpers';

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    avatar: '',
  });
  const [avatarPreview, setAvatarPreview] = useState(''); // For local preview before upload
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // 'profile', 'password', 'avatar'
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/admin/profile');
        const adminData = response.data;
        
        setCurrentUser(adminData);
        setFormData({
          email: adminData.email,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
          avatar: adminData.avatar || '',
        });
        setAvatarPreview(''); // Clear preview on load
      } catch (error) {
        console.error('Error fetching profile:', error);
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess('');
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError('Image size must be less than 2MB');
        return;
      }

      // Preview the image locally (for preview only)
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Client-side validation
    if (!formData.email || formData.email.trim() === '') {
      setError('Email is required');
      setLoading(false);
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Check if email changed
    if (formData.email.toLowerCase().trim() === currentUser?.email?.toLowerCase()) {
      setError('New email must be different from current email');
      setLoading(false);
      return;
    }

    try {
      const response = await api.put('/admin/profile/email', {
        email: formData.email.trim(),
      });

      // Update local state from MongoDB response
      setCurrentUser(response.data);
      setFormData(prev => ({
        ...prev,
        email: response.data.email,
        avatar: response.data.avatar || prev.avatar,
      }));

      setSuccess('Email updated successfully!');
      
      // Refresh profile after 2 seconds
      setTimeout(async () => {
        try {
          const freshResponse = await api.get('/admin/profile');
          setCurrentUser(freshResponse.data);
          setFormData(prev => ({
            ...prev,
            email: freshResponse.data.email,
            avatar: freshResponse.data.avatar || prev.avatar,
          }));
        } catch (err) {
          console.error('Error refreshing profile:', err);
        }
      }, 2000);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to update email';
      setError(errorMessage);
      console.error('Email update error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Client-side validation
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError('All password fields are required');
      setLoading(false);
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      setError('New password must be different from current password');
      setLoading(false);
      return;
    }

    try {
      const response = await api.put('/admin/profile/password', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });

      setSuccess('Password changed successfully!');
      
      // Clear password fields
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to change password';
      setError(errorMessage);
      console.error('Password update error:', err);
    } finally {
      setLoading(false);
    }
  };


  const handleAvatarUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Get the file input
      const fileInput = document.getElementById('avatar-upload');
      const file = fileInput?.files[0];

      if (!file) {
        setError('Please select an image file');
        setLoading(false);
        return;
      }

      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('avatar', file);

      const response = await api.put('/admin/profile/avatar', formDataToSend);

      // Verify response has avatar URL
      if (!response.data || !response.data.avatar) {
        throw new Error('Avatar URL not returned from server');
      }

      // Update local state with data from MongoDB (not localStorage)
      setCurrentUser({
        _id: response.data._id,
        email: response.data.email,
        avatar: response.data.avatar,
      });

      // Update form data with new avatar URL from MongoDB
      setFormData({
        ...formData,
        avatar: response.data.avatar,
      });
      
      // Clear preview after successful upload
      setAvatarPreview('');
      
      // Reset file input
      if (fileInput) {
        fileInput.value = '';
      }

      setSuccess('Profile image updated successfully!');
      
      // Force a re-render by fetching fresh data from MongoDB
      setTimeout(async () => {
        try {
          const freshResponse = await api.get('/admin/profile');
          setCurrentUser(freshResponse.data);
          setFormData(prev => ({
            ...prev,
            avatar: freshResponse.data.avatar || '',
          }));
        } catch (err) {
          console.error('Error refreshing profile:', err);
        }
      }, 500);
    } catch (err) {
      console.error('Avatar upload error:', err);
      const errorMessage = err.response?.data?.message || err.response?.data?.error || err.message || 'Failed to update avatar';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('currentAdmin');
    navigate('/login');
  };

  if (!currentUser) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Profile Settings</h1>
            <p className="text-gray-600">Manage your account information and preferences</p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'profile'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <User size={18} className="inline mr-2" />
            Profile
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'password'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Key size={18} className="inline mr-2" />
            Password
          </button>
          <button
            onClick={() => setActiveTab('avatar')}
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'avatar'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Camera size={18} className="inline mr-2" />
            Avatar
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

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <form onSubmit={handleEmailUpdate} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              <Save size={20} />
              {loading ? 'Updating...' : 'Update Email'}
            </button>
          </form>
        )}

        {/* Password Tab */}
        {activeTab === 'password' && (
          <div className="space-y-6">
            <form onSubmit={handlePasswordChange} className="space-y-6">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
              >
                <Save size={20} />
                {loading ? 'Changing...' : 'Change Password'}
              </button>
            </form>
          </div>
        )}

        {/* Avatar Tab */}
        {activeTab === 'avatar' && (
          <form onSubmit={handleAvatarUpdate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Profile Image
              </label>
              
              {/* Current Avatar Preview */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-6">
                <div className="relative">
                  {avatarPreview ? (
                    // Show local preview if available (before upload)
                    <img
                      src={avatarPreview}
                      alt="Profile Preview"
                      className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                    />
                  ) : currentUser?.avatar || formData.avatar ? (
                    // Show actual avatar from MongoDB (Cloudinary or local)
                    <img
                      key={currentUser?.avatar || formData.avatar} // Force re-render when avatar changes
                      src={getImageUrl(currentUser?.avatar || formData.avatar)}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                      onError={(e) => {
                        // Fallback if image fails to load
                        console.error('Image load error:', currentUser?.avatar || formData.avatar);
                        e.target.style.display = 'none';
                      }}
                      onLoad={() => {
                        console.log('Image loaded successfully:', currentUser?.avatar || formData.avatar);
                      }}
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-300">
                      <User size={48} className="text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="avatar-upload"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg cursor-pointer transition-colors"
                  >
                    <Camera size={20} />
                    {formData.avatar ? 'Change Image' : 'Upload Image'}
                  </label>
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Recommended: Square image, max 2MB
                  </p>
                </div>
              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              <Save size={20} />
              {loading ? 'Updating...' : 'Update Avatar'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
