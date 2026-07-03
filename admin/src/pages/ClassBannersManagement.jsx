import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Image as ImageIcon, Upload, Loader2, Eye, EyeOff, Star } from 'lucide-react';
import { uploadImage } from '../utils/contentApi';
import { getImageUrl } from '../utils/helpers';
import api from '../utils/api';

const classBannersApi = {
  getAll: () => api.get('/content/class-banners'),
  create: (data) => api.post('/content/class-banners', data),
  update: (id, data) => api.put(`/content/class-banners/${id}`, data),
  delete: (id) => api.delete(`/content/class-banners/${id}`),
};

const EMPTY_FORM = {
  title: '',
  subtitle: '',
  description: '',
  image: '',
  category: 'General',
  instructor: 'Vidisha Natekar',
  duration: '',
  schedule: '',
  price: '',
  seats: '',
  isActive: true,
  isFeatured: false,
  order: 0,
};

const ClassBannersManagement = () => {
  const [banners, setBanners] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => { fetchBanners(); }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3200);
  };

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const res = await classBannersApi.getAll();
      setBanners(res.data || []);
    } catch (e) {
      console.error(e);
      setBanners([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { showToast('Please select an image file', 'error'); return; }

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    try {
      setUploading(true);
      const res = await uploadImage(file, 'class-banners');
      const url = res.data.url;
      setFormData(prev => ({ ...prev, image: url, imageId: res.data.imageId }));
      setImagePreview(getImageUrl(url));
      showToast('Image uploaded successfully');
    } catch (e) {
      console.error(e);
      showToast('Failed to upload image', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleAdd = () => {
    setFormData(EMPTY_FORM);
    setImagePreview(null);
    setEditingItem('new');
    setShowForm(true);
  };

  const handleEdit = (item) => {
    setFormData({
      _id: item._id,
      title: item.title || '',
      subtitle: item.subtitle || '',
      description: item.description || '',
      image: item.image || '',
      category: item.category || 'General',
      instructor: item.instructor || 'Vidisha Natekar',
      duration: item.duration || '',
      schedule: item.schedule || '',
      price: item.price || '',
      seats: item.seats || '',
      isActive: item.isActive !== false,
      isFeatured: item.isFeatured === true,
      order: item.order || 0,
    });
    setImagePreview(item.image ? getImageUrl(item.image) : null);
    setEditingItem(item._id);
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) { showToast('Title is required', 'error'); return; }
    if (!formData.image && editingItem === 'new') { showToast('Please upload an image', 'error'); return; }

    try {
      setSaving(true);
      const payload = { ...formData };
      if (editingItem === 'new') {
        await classBannersApi.create(payload);
        showToast('Class banner created!');
      } else {
        await classBannersApi.update(editingItem, payload);
        showToast('Class banner updated!');
      }
      await fetchBanners();
      setShowForm(false);
      setEditingItem(null);
    } catch (e) {
      console.error(e);
      showToast(e.response?.data?.message || 'Failed to save', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await classBannersApi.delete(id);
      setBanners(prev => prev.filter(b => b._id !== id));
      showToast('Banner deleted');
      setDeleteConfirm(null);
    } catch (e) {
      showToast('Failed to delete', 'error');
    }
  };

  const handleToggleActive = async (item) => {
    try {
      await classBannersApi.update(item._id, { ...item, isActive: !item.isActive });
      setBanners(prev => prev.map(b => b._id === item._id ? { ...b, isActive: !b.isActive } : b));
    } catch (e) {
      showToast('Failed to update', 'error');
    }
  };

  const handleClose = () => {
    setShowForm(false);
    setEditingItem(null);
    setImagePreview(null);
    setFormData(EMPTY_FORM);
  };

  const labelClass = "block text-[10px] font-medium tracking-widest uppercase text-gray-500 mb-2";
  const inputClass = "w-full px-4 py-3 border border-gray-200 bg-white text-sm focus:outline-none focus:border-black transition-colors font-light box-sizing-border-box";

  return (
    <div style={{ position: 'relative' }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
          background: '#0a0a0a', border: '1px solid #b8860b',
          color: '#fff', padding: '12px 20px',
          fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600,
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          {toast.type === 'error' ? <X size={14} color="#b8860b" /> : '✓'} {toast.msg}
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '28px 32px', maxWidth: '380px', width: '100%', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 500, color: '#111', marginBottom: '8px', fontFamily: "'Cormorant Garamond', serif" }}>Delete Banner?</h3>
            <p style={{ fontSize: '0.78rem', color: '#666', marginBottom: '24px', fontWeight: 300 }}>This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ padding: '10px 20px', border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{ padding: '10px 20px', border: 'none', background: '#0a0a0a', color: '#fff', cursor: 'pointer', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600 }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <div>
          <h1
            className="text-4xl sm:text-5xl font-light text-black mb-1"
            style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
          >
            Class Banners
          </h1>
          <p className="text-[10px] text-gray-400 tracking-widest uppercase">Manage class announcements and banners</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 bg-black text-white text-[10px] font-medium tracking-widest uppercase hover:bg-gray-800 transition-all duration-200"
        >
          <Plus size={14} /> Add New Banner
        </button>
      </div>

      {/* Stats bar */}
      <div className="flex flex-wrap gap-4 mb-8">
        {[
          { label: 'Total', value: banners.length },
          { label: 'Active', value: banners.filter(b => b.isActive !== false).length },
          { label: 'Inactive', value: banners.filter(b => b.isActive === false).length },
          { label: 'Featured', value: banners.filter(b => b.isFeatured).length },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 px-6 py-4 flex gap-3 items-center">
            <span className="text-xl font-light text-black" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{s.value}</span>
            <span className="text-[9px] text-gray-400 tracking-widest uppercase font-semibold">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Table / Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="animate-spin text-black" size={36} />
        </div>
      ) : banners.length === 0 ? (
        <div className="text-center py-24 border border-gray-200 bg-white">
          <ImageIcon size={40} className="text-gray-300 mx-auto mb-4" />
          <p className="text-xs text-gray-400 tracking-widest uppercase mb-2">No class banners yet</p>
          <p className="text-xs text-gray-300 mb-6">Create your first class announcement banner</p>
          <button onClick={handleAdd} className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-[10px] font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors">
            Add Banner
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map(banner => (
            <div key={banner._id} className="group bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300 overflow-hidden" style={{ opacity: banner.isActive === false ? 0.65 : 1 }}>
              {/* Image */}
              <div className="relative h-52 bg-gray-100 overflow-hidden">
                {banner.image ? (
                  <img
                    src={getImageUrl(banner.image)}
                    alt={banner.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon size={32} className="text-gray-200" />
                  </div>
                )}
                {/* Badges */}
                <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                  {banner.isFeatured && (
                    <span className="bg-black text-white text-[9px] font-medium tracking-widest uppercase px-2.5 py-1 border border-[#b8860b]/30">
                      ✦ Featured
                    </span>
                  )}
                  {banner.isActive === false && (
                    <span className="bg-gray-200 text-gray-600 text-[9px] font-medium tracking-widest uppercase px-2.5 py-1">
                      Inactive
                    </span>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                {banner.category && (
                  <p className="inline-block mb-3 px-2 py-0.5 border border-[#b8860b]/30 text-[9px] font-medium tracking-widest uppercase text-[#b8860b]">
                    {banner.category}
                  </p>
                )}
                <h3 className="text-lg font-light text-black mb-2 leading-snug" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{banner.title}</h3>
                {banner.description && (
                  <p className="text-[11px] text-gray-500 mb-3 line-clamp-2 leading-relaxed font-light">
                    {banner.description}
                  </p>
                )}
                <div className="flex gap-4 text-[10px] text-gray-400 font-light mb-4">
                  {banner.price && <span className="font-medium text-black">{banner.price}</span>}
                  {banner.schedule && <span>{banner.schedule}</span>}
                  {banner.seats && <span>{banner.seats} seats</span>}
                </div>

                {/* Actions */}
                <div className="flex gap-2 border-t border-gray-100 pt-4">
                  <button
                    onClick={() => handleEdit(banner)}
                    className="flex-grow flex items-center justify-center gap-1.5 px-3 py-2 border border-black text-black text-[10px] font-medium tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-200"
                  >
                    <Edit size={12} /> Edit
                  </button>
                  <button
                    onClick={() => handleToggleActive(banner)}
                    title={banner.isActive === false ? 'Activate' : 'Deactivate'}
                    className={`flex items-center justify-center px-3 py-2 border transition-all duration-200 ${
                      banner.isActive === false 
                        ? 'border-gray-200 text-gray-400 hover:border-black hover:text-black' 
                        : 'border-[#b8860b] text-[#b8860b] hover:bg-[#b8860b] hover:text-white'
                    }`}
                  >
                    {banner.isActive === false ? <Eye size={12} /> : <EyeOff size={12} />}
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(banner._id)}
                    className="flex items-center justify-center px-3 py-2 border border-gray-300 text-gray-600 hover:bg-black hover:text-white hover:border-black transition-all duration-200"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Slide-in Form Panel ── */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 5000, display: 'flex', justifyContent: 'flex-end', backdropBlur: 'sm' }}>
          <div style={{ width: '100%', maxWidth: '560px', background: '#fff', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {/* Panel Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, background: '#fff', zIndex: 1 }} className="flex justify-between items-center">
              <h2 style={{ fontSize: '1rem', fontWeight: 500, color: '#111', fontFamily: "'Cormorant Garamond', serif" }}>
                {editingItem === 'new' ? 'Add Class Banner' : 'Edit Class Banner'}
              </h2>
              <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', color: '#6b7280' }}>
                <X size={20} />
              </button>
            </div>

            {/* Form Body */}
            <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>

              {/* Image Upload */}
              <div>
                <label className={labelClass}>
                  Banner Image *
                </label>
                <div style={{ border: '1px dashed #e5e7eb', overflow: 'hidden', position: 'relative' }}>
                  {imagePreview ? (
                    <div style={{ position: 'relative' }}>
                      <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                      <label style={{ position: 'absolute', bottom: '10px', right: '10px', background: '#0a0a0a', border: '1px solid #b8860b', color: '#fff', padding: '6px 12px', cursor: 'pointer', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {uploading ? <Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} /> : <Upload size={12} />}
                        {uploading ? 'Uploading…' : 'Change Image'}
                        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} disabled={uploading} />
                      </label>
                    </div>
                  ) : (
                    <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', cursor: 'pointer', gap: '10px', background: '#fbfbfa' }}>
                      {uploading ? (
                        <>
                          <Loader2 size={28} color="#b8860b" style={{ animation: 'spin 1s linear infinite' }} />
                          <p style={{ fontSize: '0.8rem', color: '#666' }}>Uploading…</p>
                        </>
                      ) : (
                        <>
                          <Upload size={28} color="#9ca3af" />
                          <p style={{ fontSize: '0.72rem', color: '#666', textAlign: 'center', letterSpacing: '0.05em' }}>CLICK TO UPLOAD AN IMAGE<br /><span style={{ fontSize: '0.65rem', color: '#9ca3af' }}>JPG, PNG, WEBP UP TO 10MB</span></p>
                        </>
                      )}
                      <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} disabled={uploading} />
                    </label>
                  )}
                </div>
              </div>

              {/* Fields */}
              {[
                { label: 'Title *', name: 'title', placeholder: 'e.g. Advanced Aari Embroidery Class' },
                { label: 'Subtitle', name: 'subtitle', placeholder: 'e.g. 4-Week Intensive Program' },
                { label: 'Category', name: 'category', placeholder: 'e.g. Aari Work, Embroidery, Bridal…' },
                { label: 'Instructor', name: 'instructor', placeholder: 'e.g. Vidisha Natekar' },
                { label: 'Duration', name: 'duration', placeholder: 'e.g. 4 Weeks, 20 Hours' },
                { label: 'Schedule', name: 'schedule', placeholder: 'e.g. Sat & Sun | 10AM – 1PM' },
                { label: 'Price', name: 'price', placeholder: 'e.g. ₹5,000 / ₹2,500 per session' },
                { label: 'Available Seats', name: 'seats', placeholder: 'e.g. 10' },
                { label: 'Display Order', name: 'order', placeholder: '0 = first', type: 'number' },
              ].map(f => (
                <div key={f.name}>
                  <label className={labelClass}>{f.label}</label>
                  <input
                    type={f.type || 'text'}
                    name={f.name}
                    value={formData[f.name] ?? ''}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                    className={inputClass}
                  />
                </div>
              ))}

              {/* Description */}
              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  name="description"
                  value={formData.description || ''}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe what students will learn, materials needed, etc."
                  className={`${inputClass} resize-y`}
                />
              </div>

              {/* Toggles */}
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {[
                  { label: 'Active (visible on website)', name: 'isActive' },
                  { label: 'Featured (shown prominently)', name: 'isFeatured' },
                ].map(toggle => (
                  <label key={toggle.name} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}>
                    <div
                      style={{
                        width: '40px', height: '22px', borderRadius: '11px',
                        background: formData[toggle.name] ? '#b8860b' : '#e5e7eb',
                        position: 'relative', transition: 'background 0.25s', flexShrink: 0,
                      }}
                      onClick={() => setFormData(prev => ({ ...prev, [toggle.name]: !prev[toggle.name] }))}
                    >
                      <div style={{
                        position: 'absolute', top: '3px',
                        left: formData[toggle.name] ? '21px' : '3px',
                        width: '16px', height: '16px', borderRadius: '50%',
                        background: '#fff', transition: 'left 0.25s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                      }} />
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#374151', fontWeight: 400 }}>{toggle.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Panel Footer */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '12px', position: 'sticky', bottom: 0, background: '#fff' }}>
              <button
                onClick={handleClose}
                style={{ flex: 1, padding: '12px', border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, color: '#374151' }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || uploading}
                style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', background: saving ? '#9ca3af' : '#111', color: '#fff', border: 'none', cursor: saving ? 'not-allowed' : 'pointer', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600, transition: 'background 0.2s' }}
                onMouseEnter={e => { if (!saving) e.currentTarget.style.background = '#b8860b'; }}
                onMouseLeave={e => { if (!saving) e.currentTarget.style.background = '#111'; }}
              >
                {saving ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={14} />}
                {saving ? 'Saving…' : editingItem === 'new' ? 'Create Banner' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};

export default ClassBannersManagement;
