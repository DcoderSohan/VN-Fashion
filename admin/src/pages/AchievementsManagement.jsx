import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Award, Loader } from 'lucide-react';
import Modal from '../components/Modal';
import { achievementsApi } from '../utils/contentApi';

const AchievementsManagement = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    year: ''
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch achievements from API
  useEffect(() => {
    const fetchAchievements = async () => {
      setLoading(true);
      setError('');
      try {
        console.log('Fetching achievements...');
        const response = await achievementsApi.getAll();
        console.log('Achievements response:', response.data);
        setAchievements(response.data || []);
      } catch (err) {
        console.error('Error fetching achievements:', err);
        setError('Failed to load achievements. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const handleAdd = () => {
    setFormData({
      title: '',
      year: ''
    });
    setEditingId(null);
    setError('');
    setSuccess('');
    setSaving(false);
    setIsModalOpen(true);
  };

  const handleEdit = (achievement) => {
    setFormData({
      title: achievement.title || '',
      year: achievement.year || ''
    });
    setEditingId(achievement._id);
    setError('');
    setSuccess('');
    setSaving(false);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      if (editingId) {
        // Update existing achievement
        console.log('Updating achievement:', editingId, formData);
        const response = await achievementsApi.update(editingId, formData);
        console.log('Update response:', response.data);
        
        // Update local state
        setAchievements(prev => 
          prev.map(ach => ach._id === editingId ? response.data : ach)
        );
        
        // Close modal immediately
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ title: '', year: '' });
        setError('');
        setSaving(false);
        
        // Show success message
        setSuccess('Achievement updated successfully!');
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      } else {
        // Create new achievement
        console.log('Creating achievement:', formData);
        const response = await achievementsApi.create(formData);
        console.log('Create response:', response.data);
        
        // Add to local state
        setAchievements(prev => [...prev, response.data]);
        
        // Close modal immediately
        setIsModalOpen(false);
        setEditingId(null);
        setFormData({ title: '', year: '' });
        setError('');
        setSaving(false);
        
        // Show success message
        setSuccess('Achievement created successfully!');
        
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Error saving achievement:', err);
      setError(err.response?.data?.message || 'Failed to save achievement');
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this achievement?')) {
      return;
    }

    try {
      await achievementsApi.delete(id);
      setAchievements(prev => prev.filter(ach => ach._id !== id));
      setSuccess('Achievement deleted successfully!');
    } catch (err) {
      console.error('Error deleting achievement:', err);
      setError(err.response?.data?.message || 'Failed to delete achievement');
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({
      title: '',
      year: ''
    });
    setError('');
    setSaving(false);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-3 text-gray-600">
          <Loader className="animate-spin" size={24} />
          <span>Loading achievements...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Achievements Management</h2>
          <p className="text-gray-600">Manage your achievements and milestones</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
        >
          <Plus size={20} />
          <span>Add Achievement</span>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <div 
            key={achievement._id} 
            className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award size={24} className="text-white" />
                </div>
                <h3 className="text-gray-800 font-semibold text-lg group-hover:text-blue-600 transition-colors duration-300 mb-2">
                  {achievement.title || 'Untitled Achievement'}
                </h3>
                {achievement.year && (
                  <p className="text-blue-600 text-sm font-medium mb-2">
                    Year: {achievement.year}
                  </p>
                )}
                {achievement.timestamp && (
                  <p className="text-gray-500 text-xs">
                    {new Date(achievement.timestamp).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(achievement)}
                  className="px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:scale-110 transition-all duration-300"
                  title="Edit"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(achievement._id)}
                  className="px-3 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:shadow-lg hover:scale-110 transition-all duration-300"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {achievements.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-block p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full mb-4">
            <Award size={48} className="text-blue-600" />
          </div>
          <p className="text-gray-600 text-lg font-medium">No achievements yet</p>
          <p className="text-gray-500 text-sm mt-2">Click "Add Achievement" to get started</p>
        </div>
      )}

      {/* Modal for Add/Edit */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCancel}
        title={editingId ? 'Edit Achievement' : 'Add Achievement'}
      >
        <div className="space-y-4">
          {/* Error in Modal */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g., 10+ Years of Experience"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year
            </label>
            <input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g., 2024"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              disabled={saving || !formData.title.trim()}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader className="animate-spin" size={18} />
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
              className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AchievementsManagement;
