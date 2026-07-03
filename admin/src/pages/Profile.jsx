import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Camera, Save, LogOut, Key, Loader2, X } from 'lucide-react';
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
  const [avatarPreview, setAvatarPreview] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
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
        setAvatarPreview('');
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

    if (!formData.email || formData.email.trim() === '') {
      setError('Email is required');
      setLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (formData.email.toLowerCase().trim() === currentUser?.email?.toLowerCase()) {
      setError('New email must be different from current email');
      setLoading(false);
      return;
    }

    try {
      const response = await api.put('/admin/profile/email', {
        email: formData.email.trim(),
      });

      setCurrentUser(response.data);
      setFormData(prev => ({
        ...prev,
        email: response.data.email,
        avatar: response.data.avatar || prev.avatar,
      }));

      setSuccess('Email updated successfully!');
      
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
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

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
      await api.put('/admin/profile/password', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });

      setSuccess('Password changed successfully!');
      
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to change password';
      setError(errorMessage);
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
      const fileInput = document.getElementById('avatar-upload');
      const file = fileInput?.files[0];

      if (!file) {
        setError('Please select an image file');
        setLoading(false);
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('avatar', file);

      const response = await api.put('/admin/profile/avatar', formDataToSend);

      if (!response.data || !response.data.avatar) {
        throw new Error('Avatar URL not returned from server');
      }

      setCurrentUser({
        _id: response.data._id,
        email: response.data.email,
        avatar: response.data.avatar,
      });

      setFormData({
        ...formData,
        avatar: response.data.avatar,
      });
      
      setAvatarPreview('');
      if (fileInput) {
        fileInput.value = '';
      }

      setSuccess('Profile image updated successfully!');
      
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
    return (
      <div className="flex justify-center items-center py-24">
        <Loader2 className="animate-spin text-black" size={36} />
      </div>
    );
  }

  const labelClass = 'block text-[10px] font-medium tracking-widest uppercase text-gray-500 mb-2';
  const inputClass = 'w-full pl-10 pr-4 py-3 border border-gray-200 bg-white text-sm focus:outline-none focus:border-black transition-colors font-light';

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white border border-gray-200 p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-6 border-b border-gray-100">
          <div>
            <h1 
              className="text-4xl font-light text-black mb-1"
              style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
            >
              Profile Settings
            </h1>
            <p className="text-[10px] text-gray-400 tracking-widest uppercase">Manage account credentials and avatar</p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-600 text-[10px] font-medium tracking-widest uppercase hover:bg-black hover:text-white hover:border-black transition-all duration-200"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-100 pb-3">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'password', label: 'Password', icon: Key },
            { id: 'avatar', label: 'Avatar', icon: Camera },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setError('');
                  setSuccess('');
                }}
                className={`flex items-center gap-2 pb-3 text-[10px] font-medium tracking-widest uppercase border-b-2 transition-all ${
                  active 
                    ? 'border-[#b8860b] text-[#b8860b]' 
                    : 'border-transparent text-gray-400 hover:text-black'
                }`}
              >
                <Icon size={13} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Messages */}
        {error && (
          <div className="border border-gray-300 bg-gray-50 text-black px-4 py-3 text-xs tracking-wide mb-6">
            {error}
          </div>
        )}
        {success && (
          <div className="border border-[#b8860b]/30 bg-[#fbfbfa] text-[#b8860b] px-4 py-3 text-xs tracking-wide mb-6">
            {success}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <form onSubmit={handleEmailUpdate} className="space-y-6">
            <div>
              <label htmlFor="email" className={labelClass}>
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-black text-white text-[10px] font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              <Save size={13} />
              {loading ? 'Updating...' : 'Update Email'}
            </button>
          </form>
        )}

        {/* Password Tab */}
        {activeTab === 'password' && (
          <form onSubmit={handlePasswordChange} className="space-y-6">
            <div>
              <label htmlFor="currentPassword" className={labelClass}>
                Current Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="newPassword" className={labelClass}>
                New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className={labelClass}>
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-black text-white text-[10px] font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              <Save size={13} />
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </form>
        )}

        {/* Avatar Tab */}
        {activeTab === 'avatar' && (
          <form onSubmit={handleAvatarUpdate} className="space-y-6">
            <div>
              <label className={labelClass}>
                Profile Image
              </label>
              
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-6">
                <div className="relative w-32 h-32 border border-gray-200 overflow-hidden bg-gray-50 flex items-center justify-center">
                  {avatarPreview ? (
                    <img
                      src={avatarPreview}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : currentUser?.avatar || formData.avatar ? (
                    <img
                      key={currentUser?.avatar || formData.avatar}
                      src={getImageUrl(currentUser?.avatar || formData.avatar)}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <User size={32} className="text-gray-300" />
                  )}
                </div>

                <div className="flex-1 flex flex-col items-center sm:items-start">
                  <label
                    htmlFor="avatar-upload"
                    className="inline-flex items-center gap-2 px-6 py-3 border border-black text-black text-[10px] font-medium tracking-widest uppercase hover:bg-black hover:text-white transition-colors cursor-pointer"
                  >
                    <Camera size={13} />
                    {formData.avatar ? 'Change Image' : 'Upload Image'}
                  </label>
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <p className="mt-3 text-[10px] text-gray-400 font-light tracking-wide uppercase">
                    Recommended: Square image, max 2MB
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-black text-white text-[10px] font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
              <Save size={13} />
              {loading ? 'Updating...' : 'Update Avatar'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
