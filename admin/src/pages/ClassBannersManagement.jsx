import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Image as ImageIcon, Upload, Loader2, Eye, EyeOff, Star, GripVertical } from 'lucide-react';
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
  instructor: '',
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
      instructor: item.instructor || '',
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

  return (
    <div style={{ padding: '32px 24px', minHeight: '100vh', background: '#f8f9fa', fontFamily: 'Inter, sans-serif', position: 'relative' }}>
      {/* Toast */}
      {toast && (
        <div style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999,
          background: toast.type === 'error' ? '#dc2626' : '#16a34a',
          color: '#fff', padding: '12px 20px', borderRadius: '6px',
          fontSize: '0.82rem', fontWeight: 500, boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          display: 'flex', alignItems: 'center', gap: '8px',
        }}>
          {toast.type === 'error' ? <X size={14} /> : '✓'} {toast.msg}
        </div>
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', borderRadius: '8px', padding: '28px 32px', maxWidth: '380px', width: '100%', textAlign: 'center' }}>
            <Trash2 size={32} color="#dc2626" style={{ marginBottom: '14px' }} />
            <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#111', marginBottom: '8px' }}>Delete Banner?</h3>
            <p style={{ fontSize: '0.82rem', color: '#666', marginBottom: '24px' }}>This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => setDeleteConfirm(null)} style={{ padding: '9px 20px', border: '1px solid #e5e7eb', borderRadius: '6px', background: '#fff', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 500 }}>Cancel</button>
              <button onClick={() => handleDelete(deleteConfirm)} style={{ padding: '9px 20px', border: 'none', borderRadius: '6px', background: '#dc2626', color: '#fff', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 500 }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111', marginBottom: '4px' }}>Class Banners</h1>
          <p style={{ fontSize: '0.82rem', color: '#666', fontWeight: 400 }}>Manage class announcements and banners displayed on the website.</p>
        </div>
        <button
          onClick={handleAdd}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#111', color: '#fff', border: 'none', borderRadius: '6px', padding: '10px 18px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, transition: 'background 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.background = '#b8860b'}
          onMouseLeave={e => e.currentTarget.style.background = '#111'}
        >
          <Plus size={16} /> Add New Banner
        </button>
      </div>

      {/* Stats bar */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '28px', flexWrap: 'wrap' }}>
        {[
          { label: 'Total', value: banners.length, color: '#3b82f6' },
          { label: 'Active', value: banners.filter(b => b.isActive !== false).length, color: '#16a34a' },
          { label: 'Inactive', value: banners.filter(b => b.isActive === false).length, color: '#9ca3af' },
          { label: 'Featured', value: banners.filter(b => b.isFeatured).length, color: '#b8860b' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '14px 20px', display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: 700, color: s.color }}>{s.value}</span>
            <span style={{ fontSize: '0.72rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Table / Grid */}
      {loading ? (
        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '60px', textAlign: 'center', color: '#aaa' }}>
          <Loader2 size={28} style={{ animation: 'spin 1s linear infinite', marginBottom: '12px' }} />
          <p style={{ fontSize: '0.85rem' }}>Loading banners…</p>
        </div>
      ) : banners.length === 0 ? (
        <div style={{ background: '#fff', borderRadius: '8px', border: '2px dashed #e5e7eb', padding: '80px', textAlign: 'center' }}>
          <ImageIcon size={40} color="#d1d5db" style={{ marginBottom: '16px' }} />
          <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>No class banners yet</p>
          <p style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '20px' }}>Click "Add New Banner" to create your first class announcement.</p>
          <button onClick={handleAdd} style={{ background: '#111', color: '#fff', border: 'none', borderRadius: '6px', padding: '10px 20px', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}>
            Add Banner
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
          {banners.map(banner => (
            <div key={banner._id} style={{
              background: '#fff',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              overflow: 'hidden',
              opacity: banner.isActive === false ? 0.6 : 1,
              transition: 'box-shadow 0.2s',
              position: 'relative',
            }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              {/* Image */}
              <div style={{ position: 'relative', aspectRatio: '16/9', background: '#f3f4f6', overflow: 'hidden' }}>
                {banner.image ? (
                  <img
                    src={getImageUrl(banner.image)}
                    alt={banner.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ImageIcon size={32} color="#d1d5db" />
                  </div>
                )}
                {/* Badges */}
                <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {banner.isFeatured && (
                    <span style={{ background: '#b8860b', color: '#fff', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, padding: '3px 8px', borderRadius: '3px' }}>
                      ✦ Featured
                    </span>
                  )}
                  {banner.isActive === false && (
                    <span style={{ background: '#6b7280', color: '#fff', fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, padding: '3px 8px', borderRadius: '3px' }}>
                      Inactive
                    </span>
                  )}
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '16px' }}>
                {banner.category && (
                  <p style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#b8860b', fontWeight: 700, marginBottom: '6px' }}>
                    {banner.category}
                  </p>
                )}
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#111', marginBottom: '6px', lineHeight: 1.3 }}>{banner.title}</h3>
                {banner.description && (
                  <p style={{ fontSize: '0.76rem', color: '#666', lineHeight: 1.55, marginBottom: '10px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {banner.description}
                  </p>
                )}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '0.72rem', color: '#888', marginBottom: '14px' }}>
                  {banner.price && <span style={{ fontWeight: 600, color: '#111' }}>{banner.price}</span>}
                  {banner.schedule && <span>{banner.schedule}</span>}
                  {banner.seats && <span>{banner.seats} seats</span>}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #f3f4f6', paddingTop: '12px' }}>
                  <button
                    onClick={() => handleEdit(banner)}
                    style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '5px', padding: '8px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#e5e7eb'}
                    onMouseLeave={e => e.currentTarget.style.background = '#f3f4f6'}
                  >
                    <Edit size={13} /> Edit
                  </button>
                  <button
                    onClick={() => handleToggleActive(banner)}
                    title={banner.isActive === false ? 'Activate' : 'Deactivate'}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: banner.isActive === false ? '#dcfce7' : '#fef3c7', color: banner.isActive === false ? '#16a34a' : '#92400e', border: 'none', borderRadius: '5px', padding: '8px 10px', cursor: 'pointer', transition: 'background 0.2s' }}
                  >
                    {banner.isActive === false ? <Eye size={13} /> : <EyeOff size={13} />}
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(banner._id)}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '5px', padding: '8px 10px', cursor: 'pointer', transition: 'background 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#fca5a5'}
                    onMouseLeave={e => e.currentTarget.style.background = '#fee2e2'}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Slide-in Form Panel ── */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 5000, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '100%', maxWidth: '560px', background: '#fff', height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {/* Panel Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, background: '#fff', zIndex: 1 }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#111' }}>
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
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '8px', letterSpacing: '0.04em' }}>
                  Banner Image *
                </label>
                <div style={{ border: '2px dashed #e5e7eb', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                  {imagePreview ? (
                    <div style={{ position: 'relative' }}>
                      <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }} />
                      <label style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {uploading ? <Loader2 size={12} style={{ animation: 'spin 1s linear infinite' }} /> : <Upload size={12} />}
                        {uploading ? 'Uploading…' : 'Change Image'}
                        <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} disabled={uploading} />
                      </label>
                    </div>
                  ) : (
                    <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', cursor: 'pointer', gap: '10px' }}>
                      {uploading ? (
                        <>
                          <Loader2 size={28} color="#b8860b" style={{ animation: 'spin 1s linear infinite' }} />
                          <p style={{ fontSize: '0.8rem', color: '#666' }}>Uploading…</p>
                        </>
                      ) : (
                        <>
                          <Upload size={28} color="#9ca3af" />
                          <p style={{ fontSize: '0.8rem', color: '#666', textAlign: 'center' }}>Click to upload an image<br /><span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>JPG, PNG, WEBP up to 10MB</span></p>
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
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '6px', letterSpacing: '0.04em' }}>{f.label}</label>
                  <input
                    type={f.type || 'text'}
                    name={f.name}
                    value={formData[f.name] ?? ''}
                    onChange={handleChange}
                    placeholder={f.placeholder}
                    style={{ width: '100%', padding: '9px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '0.85rem', color: '#111', outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}
                    onFocus={e => e.target.style.borderColor = '#b8860b'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                  />
                </div>
              ))}

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#374151', marginBottom: '6px', letterSpacing: '0.04em' }}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe what students will learn, materials needed, etc."
                  style={{ width: '100%', padding: '9px 12px', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '0.85rem', color: '#111', outline: 'none', resize: 'vertical', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif' }}
                  onFocus={e => e.target.style.borderColor = '#b8860b'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
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
                    <span style={{ fontSize: '0.8rem', color: '#374151', fontWeight: 500 }}>{toggle.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Panel Footer */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid #e5e7eb', display: 'flex', gap: '12px', position: 'sticky', bottom: 0, background: '#fff' }}>
              <button
                onClick={handleClose}
                style={{ flex: 1, padding: '10px', border: '1px solid #e5e7eb', borderRadius: '6px', background: '#fff', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, color: '#374151' }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || uploading}
                style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', background: saving ? '#9ca3af' : '#111', color: '#fff', border: 'none', borderRadius: '6px', cursor: saving ? 'not-allowed' : 'pointer', fontSize: '0.82rem', fontWeight: 600, transition: 'background 0.2s' }}
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
