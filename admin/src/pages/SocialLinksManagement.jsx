import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Loader2, ArrowLeft, Share2, Link2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import ConfirmationModal from '../components/ConfirmationModal';
import ErrorModal from '../components/ErrorModal';
import { settingsApi } from '../utils/contentApi';
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  MessageCircle,
  Linkedin,
  Github,
  Globe,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

/* ── Icon registry ── */
const availableIcons = {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  WhatsApp: MessageCircle,
  LinkedIn: Linkedin,
  GitHub: Github,
  Globe,
  Mail,
  Phone,
  MapPin,
  Share2,
};

/* ── Shared style tokens (matching the admin theme) ── */
const labelClass =
  'block text-[10px] font-medium tracking-widest uppercase text-gray-500 mb-2';
const inputClass =
  'w-full px-4 py-3 border border-gray-200 bg-white text-sm focus:outline-none focus:border-black transition-colors font-light';

const SocialLinksManagement = () => {
  const navigate = useNavigate();
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({ name: '', url: '', icon: 'Globe' });
  const [saving, setSaving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await settingsApi.get();
      const settings = response.data || {};
      let links = settings.socialLinks || [];

      // Migrate old individual URL fields if they exist
      if (settings.instagramUrl && !links.find((l) => l.name === 'Instagram')) {
        links.push({ name: 'Instagram', url: settings.instagramUrl, icon: 'Instagram', order: links.length });
      }
      if (settings.whatsappUrl && !links.find((l) => l.name === 'WhatsApp')) {
        links.push({ name: 'WhatsApp', url: settings.whatsappUrl, icon: 'WhatsApp', order: links.length });
      }

      links.sort((a, b) => (a.order || 0) - (b.order || 0));
      setSocialLinks(links);
    } catch {
      setErrorMessage('Failed to load social links. Please try again.');
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setFormData({ name: '', url: '', icon: 'Globe' });
    setEditingIndex('new');
  };

  const handleEdit = (index) => {
    const link = socialLinks[index];
    setFormData({ name: link.name || '', url: link.url || '', icon: link.icon || 'Globe' });
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (deleteIndex === null) return;
    try {
      const newLinks = socialLinks
        .filter((_, i) => i !== deleteIndex)
        .map((link, i) => ({ ...link, order: i }));
      await settingsApi.update({ socialLinks: newLinks });
      await fetchSettings();
      setShowConfirmModal(false);
      setDeleteIndex(null);
    } catch {
      setErrorMessage('Failed to delete social link. Please try again.');
      setShowErrorModal(true);
    }
  };

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.url.trim()) {
      setErrorMessage('Please fill in both name and URL.');
      setShowErrorModal(true);
      return;
    }
    try {
      setSaving(true);
      let updatedLinks = [...socialLinks];
      if (editingIndex === 'new') {
        updatedLinks.push({ ...formData, order: updatedLinks.length });
      } else {
        updatedLinks[editingIndex] = {
          ...formData,
          order: updatedLinks[editingIndex].order ?? editingIndex,
        };
      }
      await settingsApi.update({ socialLinks: updatedLinks });
      await fetchSettings();
      setEditingIndex(null);
      setFormData({ name: '', url: '', icon: 'Globe' });
    } catch {
      setErrorMessage('Failed to save social link. Please try again.');
      setShowErrorModal(true);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setFormData({ name: '', url: '', icon: 'Globe' });
  };

  const handleMove = async (index, dir) => {
    const newLinks = [...socialLinks];
    const swapIdx = dir === 'up' ? index - 1 : index + 1;
    if (swapIdx < 0 || swapIdx >= newLinks.length) return;
    [newLinks[index], newLinks[swapIdx]] = [newLinks[swapIdx], newLinks[index]];
    const updated = newLinks.map((l, i) => ({ ...l, order: i }));
    try {
      await settingsApi.update({ socialLinks: updated });
      await fetchSettings();
    } catch {
      setErrorMessage('Failed to reorder links. Please try again.');
      setShowErrorModal(true);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-32">
        <Loader2 className="w-8 h-8 animate-spin text-black" />
      </div>
    );
  }

  return (
    <div>
      {/* ── BACK BREADCRUMB ── */}
      <button
        onClick={() => navigate('/settings')}
        className="flex items-center gap-2 text-[10px] font-medium tracking-widest uppercase text-gray-400 hover:text-black transition-colors mb-8 group"
      >
        <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform duration-150" />
        Settings
      </button>

      {/* ── PAGE HEADER ── */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-10 pb-8 border-b border-gray-200">
        <div className="flex items-start gap-4">
          <div
            className="w-14 h-14 border border-gray-200 flex items-center justify-center flex-shrink-0"
            style={{ background: '#f9f8f6' }}
          >
            <Share2 className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1
              className="text-4xl sm:text-5xl font-light text-black mb-1 leading-none"
              style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
            >
              Social Links
            </h1>
            <p className="text-[10px] text-gray-400 tracking-widest uppercase mt-2">
              {socialLinks.length} link{socialLinks.length !== 1 ? 's' : ''} configured
            </p>
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 bg-black text-white text-[10px] font-medium tracking-widest uppercase hover:bg-gray-800 transition-all duration-200 flex-shrink-0"
        >
          <Plus size={14} />
          Add Social Link
        </button>
      </div>

      {/* ── CONTENT ── */}
      {socialLinks.length === 0 ? (
        <div className="text-center py-28 border border-dashed border-gray-200 bg-white">
          <div className="w-16 h-16 border border-gray-200 flex items-center justify-center mx-auto mb-5">
            <Share2 size={28} className="text-gray-300" />
          </div>
          <p className="text-[10px] font-medium tracking-widest uppercase text-gray-400 mb-1">
            No social links yet
          </p>
          <p className="text-xs text-gray-300 font-light mb-7">
            Add your first link to connect with visitors
          </p>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-[10px] font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors"
          >
            <Plus size={13} />
            Add Social Link
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {socialLinks.map((link, index) => {
            const IconComponent = availableIcons[link.icon] || Globe;
            return (
              <div
                key={index}
                className="group bg-white border border-gray-200 hover:border-gray-400 transition-all duration-300"
              >
                {/* Card top: icon + name/url */}
                <div className="p-5 border-b border-gray-100">
                  <div className="flex items-start gap-4">
                    {/* Icon box */}
                    <div className="w-12 h-12 border border-gray-200 flex items-center justify-center flex-shrink-0 bg-[#f9f8f6] group-hover:bg-black group-hover:border-black transition-all duration-300">
                      <IconComponent className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                    </div>

                    {/* Name + URL */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-base font-light text-black leading-tight mb-1"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {link.name}
                      </h3>
                      <div className="flex items-center gap-1.5">
                        <Link2 size={9} className="text-gray-300 flex-shrink-0" />
                        <p className="text-[10px] text-gray-400 truncate font-light">
                          {link.url}
                        </p>
                      </div>
                    </div>

                    {/* Order badge */}
                    <span className="text-[9px] font-medium tracking-widest text-gray-300 border border-gray-100 px-1.5 py-0.5 flex-shrink-0">
                      #{index + 1}
                    </span>
                  </div>
                </div>

                {/* Card actions */}
                <div className="px-5 py-3 flex items-center gap-2">
                  {/* Reorder */}
                  <button
                    onClick={() => handleMove(index, 'up')}
                    disabled={index === 0}
                    title="Move up"
                    className="w-7 h-7 border border-gray-200 flex items-center justify-center text-gray-400 text-xs disabled:opacity-20 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-300 transition-colors"
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => handleMove(index, 'down')}
                    disabled={index === socialLinks.length - 1}
                    title="Move down"
                    className="w-7 h-7 border border-gray-200 flex items-center justify-center text-gray-400 text-xs disabled:opacity-20 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-300 transition-colors"
                  >
                    ↓
                  </button>

                  <div className="flex-1" />

                  {/* Edit */}
                  <button
                    onClick={() => handleEdit(index)}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-black text-black text-[10px] font-medium tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-200"
                  >
                    <Edit size={11} />
                    Edit
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(index)}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-500 text-[10px] font-medium tracking-widest uppercase hover:bg-black hover:text-white hover:border-black transition-all duration-200"
                  >
                    <Trash2 size={11} />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── ADD / EDIT MODAL ── */}
      <Modal
        isOpen={editingIndex !== null}
        onClose={handleCancel}
        title={editingIndex === 'new' ? 'Add Social Link' : 'Edit Social Link'}
        maxWidth="max-w-xl"
      >
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className={labelClass}>Link Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Instagram, Facebook, Pinterest"
              className={inputClass}
            />
          </div>

          {/* URL */}
          <div>
            <label className={labelClass}>URL *</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://instagram.com/yourusername"
              className={inputClass}
            />
          </div>

          {/* Icon Grid */}
          <div>
            <label className={labelClass}>Choose Icon *</label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {Object.entries(availableIcons).map(([iconName, IconComponent]) => {
                const selected = formData.icon === iconName;
                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon: iconName })}
                    className={`flex flex-col items-center justify-center gap-1.5 py-3 px-1 border transition-all duration-150 ${
                      selected
                        ? 'border-black bg-black text-white'
                        : 'border-gray-200 hover:border-gray-400 text-gray-400 hover:text-black bg-white'
                    }`}
                  >
                    <IconComponent size={18} />
                    <span
                      className={`text-[8px] tracking-wider uppercase leading-none text-center w-full truncate ${
                        selected ? 'text-white' : 'text-gray-400'
                      }`}
                    >
                      {iconName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100" />

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving || !formData.name.trim() || !formData.url.trim()}
              className="flex-1 py-3 bg-black text-white text-[10px] font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <Save size={13} />
                  Save Link
                </>
              )}
            </button>
            <button
              onClick={handleCancel}
              disabled={saving}
              className="flex-1 py-3 border border-gray-200 text-gray-500 text-[10px] font-medium tracking-widest uppercase hover:bg-gray-50 hover:text-black transition-colors flex items-center justify-center gap-2 disabled:opacity-40"
            >
              <X size={13} />
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* ── CONFIRMATION MODAL ── */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          setDeleteIndex(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Social Link"
        message="Are you sure you want to remove this social link? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="warning"
      />

      {/* ── ERROR MODAL ── */}
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Something went wrong"
        message={errorMessage}
      />
    </div>
  );
};

export default SocialLinksManagement;
