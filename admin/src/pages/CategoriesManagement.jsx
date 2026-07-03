import React, { useState, useEffect } from 'react';
import { Plus, Trash2, X, Save, Loader2, Tag } from 'lucide-react';
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

  useEffect(() => { fetchCategories(); }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoriesApi.getAll();
      setCategories(response.data || []);
    } catch (error) {
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
        setErrorMessage('Failed to delete category. Please try again.');
        setShowErrorModal(true);
      }
    });
    setShowConfirmModal(true);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1
            className="text-4xl sm:text-5xl font-light text-black mb-1"
            style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
          >
            Categories
          </h1>
          <p className="text-[10px] text-gray-400 tracking-widest uppercase">Manage service categories</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-black text-white text-xs font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors"
        >
          <Plus size={14} />
          Add Category
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="animate-spin text-black" size={36} />
        </div>
      ) : categories.length === 0 ? (
        <div className="text-center py-24 border border-gray-200 bg-white">
          <Tag size={40} className="text-gray-300 mx-auto mb-4" />
          <p className="text-xs text-gray-400 tracking-widest uppercase mb-1">No categories yet</p>
          <p className="text-xs text-gray-300">Click "Add Category" to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map((item) => (
            <div
              key={item._id}
              className="group bg-white border border-gray-200 hover:border-black transition-colors duration-200 flex items-center justify-between px-4 py-3 gap-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-black rounded-full" />
                <span className="text-sm font-medium text-black">{item.name}</span>
              </div>
              <button
                onClick={() => handleDelete(item._id)}
                className="p-1.5 text-gray-300 hover:text-black hover:bg-gray-100 transition-all duration-200 opacity-0 group-hover:opacity-100 rounded-sm"
                title="Delete"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setNewCategory(''); }}
        title="Add Category"
        maxWidth="max-w-sm"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-[10px] font-medium tracking-widest uppercase text-gray-500 mb-2">Category Name *</label>
            <input
              type="text" value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !saving && handleAdd()}
              placeholder="Enter category name"
              className="w-full px-4 py-3 border border-gray-300 bg-white text-sm focus:outline-none focus:border-black transition-colors"
              disabled={saving}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAdd} disabled={saving}
              className="flex-1 py-3 bg-black text-white text-xs font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {saving ? <><Loader2 className="animate-spin" size={13} />Adding...</> : <><Plus size={13} />Add</>}
            </button>
            <button
              onClick={() => { setIsModalOpen(false); setNewCategory(''); }} disabled={saving}
              className="flex-1 py-3 border border-gray-300 text-gray-600 text-xs font-medium tracking-widest uppercase hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <X size={13} />Cancel
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmationModal
        isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}
        onConfirm={() => { if (confirmAction) confirmAction(); }}
        title="Delete Category" message="Are you sure you want to delete this category? This action cannot be undone."
        confirmText="Delete" cancelText="Cancel" type="error"
      />
      <ErrorModal isOpen={showErrorModal} onClose={() => setShowErrorModal(false)} title="Error" message={errorMessage} />
    </div>
  );
};

export default CategoriesManagement;
