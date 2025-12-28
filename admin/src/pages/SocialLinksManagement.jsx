import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Loader2, ExternalLink, GripVertical } from 'lucide-react';
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
  Share2
} from 'lucide-react';

// Available icons mapping
const availableIcons = {
  Instagram: Instagram,
  Facebook: Facebook,
  Twitter: Twitter,
  Youtube: Youtube,
  WhatsApp: MessageCircle,
  LinkedIn: Linkedin,
  GitHub: Github,
  Globe: Globe,
  Mail: Mail,
  Phone: Phone,
  MapPin: MapPin,
  Share2: Share2,
};

const SocialLinksManagement = () => {
  const [socialLinks, setSocialLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    icon: 'Globe',
  });
  const [saving, setSaving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const response = await settingsApi.get();
      const settings = response.data || {};
      
      // Get social links, or convert old format to new format
      let links = settings.socialLinks || [];
      
      // Migrate old Instagram/WhatsApp URLs to new format if they exist
      if (settings.instagramUrl && !links.find(l => l.name === 'Instagram')) {
        links.push({
          name: 'Instagram',
          url: settings.instagramUrl,
          icon: 'Instagram',
          order: links.length,
        });
      }
      if (settings.whatsappUrl && !links.find(l => l.name === 'WhatsApp')) {
        links.push({
          name: 'WhatsApp',
          url: settings.whatsappUrl,
          icon: 'WhatsApp',
          order: links.length,
        });
      }
      
      // Sort by order
      links.sort((a, b) => (a.order || 0) - (b.order || 0));
      setSocialLinks(links);
    } catch (error) {
      console.error('Error fetching settings:', error);
      setErrorMessage('Failed to load social links. Please try again.');
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setFormData({
      name: '',
      url: '',
      icon: 'Globe',
    });
    setEditingIndex('new');
  };

  const handleEdit = (index) => {
    const link = socialLinks[index];
    setFormData({
      name: link.name || '',
      url: link.url || '',
      icon: link.icon || 'Globe',
    });
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setShowConfirmModal(true);
  };

  const confirmDelete = async () => {
    if (deleteIndex === null) return;
    
    try {
      const newLinks = socialLinks.filter((_, index) => index !== deleteIndex);
      // Update order
      const updatedLinks = newLinks.map((link, index) => ({
        ...link,
        order: index,
      }));
      
      await settingsApi.update({ socialLinks: updatedLinks });
      await fetchSettings();
      setShowConfirmModal(false);
      setDeleteIndex(null);
    } catch (error) {
      console.error('Error deleting social link:', error);
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
        // Add new link
        updatedLinks.push({
          ...formData,
          order: updatedLinks.length,
        });
      } else {
        // Update existing link
        updatedLinks[editingIndex] = {
          ...formData,
          order: updatedLinks[editingIndex].order || editingIndex,
        };
      }
      
      await settingsApi.update({ socialLinks: updatedLinks });
      await fetchSettings();
      setEditingIndex(null);
      setFormData({ name: '', url: '', icon: 'Globe' });
    } catch (error) {
      console.error('Error saving social link:', error);
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

  const handleMoveUp = async (index) => {
    if (index === 0) return;
    
    try {
      const newLinks = [...socialLinks];
      [newLinks[index - 1], newLinks[index]] = [newLinks[index], newLinks[index - 1]];
      // Update order
      const updatedLinks = newLinks.map((link, idx) => ({
        ...link,
        order: idx,
      }));
      
      await settingsApi.update({ socialLinks: updatedLinks });
      await fetchSettings();
    } catch (error) {
      console.error('Error reordering links:', error);
      setErrorMessage('Failed to reorder links. Please try again.');
      setShowErrorModal(true);
    }
  };

  const handleMoveDown = async (index) => {
    if (index === socialLinks.length - 1) return;
    
    try {
      const newLinks = [...socialLinks];
      [newLinks[index], newLinks[index + 1]] = [newLinks[index + 1], newLinks[index]];
      // Update order
      const updatedLinks = newLinks.map((link, idx) => ({
        ...link,
        order: idx,
      }));
      
      await settingsApi.update({ socialLinks: updatedLinks });
      await fetchSettings();
    } catch (error) {
      console.error('Error reordering links:', error);
      setErrorMessage('Failed to reorder links. Please try again.');
      setShowErrorModal(true);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Social Media Links</h2>
          <p className="text-gray-600">Manage your social media links and icons</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
        >
          <Plus size={20} />
          <span>Add Social Link</span>
        </button>
      </div>

      {/* Social Links List */}
      {socialLinks.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl shadow-xl">
          <div className="inline-block p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full mb-4">
            <Share2 size={48} className="text-blue-600" />
          </div>
          <p className="text-gray-600 text-lg font-medium">No social links yet</p>
          <p className="text-gray-500 text-sm mt-2">Click "Add Social Link" to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {socialLinks.map((link, index) => {
            const IconComponent = availableIcons[link.icon] || Globe;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{link.name}</h3>
                      <p className="text-xs text-gray-500 truncate max-w-[150px]">{link.url}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Move up"
                  >
                    <GripVertical size={16} className="rotate-90" />
                  </button>
                  <button
                    onClick={() => handleMoveDown(index)}
                    disabled={index === socialLinks.length - 1}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    title="Move down"
                  >
                    <GripVertical size={16} className="-rotate-90" />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        isOpen={editingIndex !== null}
        onClose={handleCancel}
        title={editingIndex === 'new' ? 'Add Social Link' : 'Edit Social Link'}
        maxWidth="max-w-2xl"
      >
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Link Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Instagram, Facebook, WhatsApp"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Icon Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Icon <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
              {Object.entries(availableIcons).map(([iconName, IconComponent]) => (
                <button
                  key={iconName}
                  onClick={() => setFormData({ ...formData, icon: iconName })}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    formData.icon === iconName
                      ? 'border-blue-600 bg-blue-50 scale-105'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent
                    className={`w-6 h-6 mx-auto ${
                      formData.icon === iconName ? 'text-blue-600' : 'text-gray-600'
                    }`}
                  />
                  <p className="text-xs mt-2 text-center text-gray-600">{iconName}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          {formData.name && formData.url && (
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm font-semibold text-gray-700 mb-2">Preview:</p>
              <div className="flex items-center gap-3">
                {(() => {
                  const IconComponent = availableIcons[formData.icon] || Globe;
                  return (
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                  );
                })()}
                <div>
                  <p className="font-semibold text-gray-900">{formData.name}</p>
                  <a
                    href={formData.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                  >
                    {formData.url.length > 40 ? `${formData.url.substring(0, 40)}...` : formData.url}
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={handleSave}
              disabled={saving || !formData.name.trim() || !formData.url.trim()}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
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
              disabled={saving}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false);
          setDeleteIndex(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Social Link"
        message="Are you sure you want to delete this social link? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="warning"
      />

      {/* Error Modal */}
      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Error"
        message={errorMessage}
      />
    </div>
  );
};

export default SocialLinksManagement;

