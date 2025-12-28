import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Save, Loader2 } from 'lucide-react';
import Modal from '../components/Modal';
import ConfirmationModal from '../components/ConfirmationModal';
import ErrorModal from '../components/ErrorModal';
import { categoriesApi } from '../utils/contentApi';

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoriesApi.getAll();
      setCategories(response.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!newCategory.trim()) {
      setErrorMessage('Please enter a category name');
      setShowErrorModal(true);
      return;
    }

    // Check if category already exists
    const exists = categories.some(cat => cat.name.toLowerCase() === newCategory.trim().toLowerCase());
    if (exists) {
      setErrorMessage('Category already exists');
      setShowErrorModal(true);
      return;
    }

    try {
      setSaving(true);
      await categoriesApi.create({ name: newCategory.trim() });
      await fetchCategories();
      setNewCategory('');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding category:', error);
      setErrorMessage('Failed to add category. Please try again.');
      setShowErrorModal(true);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    setConfirmAction(() => async () => {
      try {
        await categoriesApi.delete(id);
        await fetchCategories();
      } catch (error) {
        console.error('Error deleting category:', error);
        setErrorMessage('Failed to delete category. Please try again.');
        setShowErrorModal(true);
      }
    });
    setShowConfirmModal(true);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Categories Management</h2>
          <p className="text-gray-600">Manage service categories</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
        >
          <Plus size={20} />
          <span>Add Category</span>
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="animate-spin text-blue-600" size={48} />
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((item) => (
            <div
              key={item._id}
              className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 flex items-center justify-between gap-3"
            >
              <span className="font-semibold text-gray-800 text-sm sm:text-base group-hover:text-blue-600 transition-colors duration-300">
                {item.name}
              </span>
              <button
                onClick={() => handleDelete(item._id)}
                className="px-3 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:shadow-lg hover:scale-110 transition-all duration-300"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {!loading && categories.length === 0 && (
        <div className="text-center py-16">
          <div className="inline-block p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full mb-4">
            <Plus size={48} className="text-blue-600" />
          </div>
          <p className="text-gray-600 text-lg font-medium">No categories yet</p>
          <p className="text-gray-500 text-sm mt-2">Click "Add Category" to get started</p>
        </div>
      )}

      {/* Modal for Add Category */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setNewCategory('');
        }}
        title="Add Category"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category Name *</label>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !saving && handleAdd()}
              placeholder="Enter category name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              disabled={saving}
            />
          </div>
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleAdd}
              disabled={saving}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Adding...
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Add
                </>
              )}
            </button>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setNewCategory('');
              }}
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
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => {
          if (confirmAction) {
            confirmAction();
          }
        }}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
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

export default CategoriesManagement;
