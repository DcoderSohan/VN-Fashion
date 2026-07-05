import React, { useState, useEffect, useRef } from 'react';
import { Camera, Save, Loader2, CheckCircle, AlertCircle, User } from 'lucide-react';
import { aboutApi, uploadImage } from '../utils/contentApi';
import { getImageUrl } from '../utils/helpers';

const AboutManagement = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [designerImage, setDesignerImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await aboutApi.get();
        const data = res.data;
        const fullName = data.designerName || '';
        const nameParts = fullName.trim().split(/\s+/);
        setFirstName(nameParts[0] || '');
        setLastName(nameParts.slice(1).join(' ') || '');
        setDesignerImage(data.designerImage || '');
      } catch (err) {
        showToast('error', 'Failed to load about data.');
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  const handleImageSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
      showToast('error', 'Only JPG, PNG or WebP images are allowed.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('error', 'Image must be smaller than 5 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    try {
      setUploading(true);
      const res = await uploadImage(file, 'about');
      const url = res.data.imageUrl || res.data.url || res.data.path || '';
      setDesignerImage(url);
      showToast('success', 'Photo uploaded! Click Save Changes to apply.');
    } catch {
      setImagePreview('');
      showToast('error', 'Photo upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!firstName.trim()) {
      showToast('error', 'First name cannot be empty.');
      return;
    }
    try {
      setSaving(true);
      const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
      await aboutApi.update({ 
        designerName: fullName, 
        designerImage,
        designerTitle: '' // Clear any "DOE" placeholder text
      });
      showToast('success', 'About page updated successfully!');
    } catch {
      showToast('error', 'Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const displayImage = imagePreview || getImageUrl(designerImage);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={28} className="animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div>

      {/* Toast notification */}
      {toast && (
        <div
          className={`fixed top-20 right-4 z-50 flex items-center gap-3 px-5 py-3 shadow-lg text-sm font-medium tracking-wide transition-all duration-300 ${
            toast.type === 'success' ? 'bg-black text-white' : 'bg-red-600 text-white'
          }`}
        >
          {toast.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
          {toast.msg}
        </div>
      )}

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black tracking-tight">About Page</h1>
        <p className="text-sm text-gray-500 mt-1 tracking-wide">
          Update the designer name and photo shown on the public about page.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white border border-gray-200 max-w-xl">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="text-xs font-semibold text-black tracking-widest uppercase">
            Designer Profile
          </h2>
        </div>

        <div className="p-6 space-y-8">

          {/* Photo upload */}
          <div className="flex flex-col items-center gap-4">
            <div
              className="relative group cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-50 flex items-center justify-center">
                {displayImage ? (
                  <img
                    src={displayImage}
                    alt="Designer"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <User size={48} className="text-gray-300" />
                )}
              </div>
              <div className="absolute inset-0 rounded-full flex flex-col items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {uploading ? (
                  <Loader2 size={22} className="text-white animate-spin" />
                ) : (
                  <>
                    <Camera size={22} className="text-white" />
                    <span className="text-white text-[10px] mt-1 tracking-widest uppercase">Change</span>
                  </>
                )}
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="hidden"
              onChange={handleImageSelect}
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-black transition-colors tracking-wider uppercase disabled:opacity-50"
            >
              <Camera size={14} />
              {uploading ? 'Uploading…' : 'Upload Photo'}
            </button>

            <p className="text-[11px] text-gray-400 text-center">
              JPG, PNG or WebP · Max 5 MB
            </p>
          </div>

          {/* First Name & Last Name fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="block text-[11px] font-semibold text-gray-600 tracking-widest uppercase"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className="w-full px-4 py-3 border border-gray-200 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                style={{ fontFamily: "'Raleway', system-ui, sans-serif", fontSize: '15px', letterSpacing: '0.01em' }}
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="block text-[11px] font-semibold text-gray-600 tracking-widest uppercase"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className="w-full px-4 py-3 border border-gray-200 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                style={{ fontFamily: "'Raleway', system-ui, sans-serif", fontSize: '15px', letterSpacing: '0.01em' }}
              />
            </div>
          </div>

          {/* Save button */}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || uploading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-black text-white text-xs font-semibold tracking-widest uppercase hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {saving ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                Saving…
              </>
            ) : (
              <>
                <Save size={15} />
                Save Changes
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  );
};

export default AboutManagement;
