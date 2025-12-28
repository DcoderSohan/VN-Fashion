import React, { useState, useEffect } from 'react';
import { Edit, Trash2, CheckCircle, XCircle, Clock, Loader2, Phone, Mail, Calendar, User } from 'lucide-react';
import Modal from '../components/Modal';
import ConfirmationModal from '../components/ConfirmationModal';
import ErrorModal from '../components/ErrorModal';
import { bookingsApi } from '../utils/contentApi';

const BookingsManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBooking, setEditingBooking] = useState(null);
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchBookings();
    // Refresh bookings every 30 seconds
    const interval = setInterval(fetchBookings, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingsApi.getAll();
      setBookings(response.data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (booking) => {
    setFormData({
      _id: booking._id,
      firstName: booking.firstName || '',
      lastName: booking.lastName || '',
      email: booking.email || '',
      phone: booking.phone || '',
      contactNumber: booking.contactNumber || '',
      serviceId: booking.serviceId || '',
      serviceTitle: booking.serviceTitle || '',
      servicePrice: booking.servicePrice || '',
      serviceCategory: booking.serviceCategory || '',
      designId: booking.designId || '',
      designTitle: booking.designTitle || '',
      designCategory: booking.designCategory || '',
      designPrice: booking.designPrice || '',
      date: booking.date || '',
      time: booking.time || '',
      notes: booking.notes || '',
      status: booking.status || 'pending',
    });
    setEditingBooking(booking._id);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await bookingsApi.update(editingBooking, formData);
      await fetchBookings();
      handleCancel();
      // Dispatch custom event to notify dashboard of update
      window.dispatchEvent(new CustomEvent('bookingUpdated'));
    } catch (error) {
      console.error('Error updating booking:', error);
      setErrorMessage('Failed to update booking. Please try again.');
      setShowErrorModal(true);
    } finally {
      setSaving(false);
    }
  };

  const handleQuickStatusUpdate = async (bookingId, newStatus) => {
    try {
      const booking = bookings.find(b => b._id === bookingId);
      if (!booking) return;

      const updateData = {
        ...booking,
        status: newStatus,
      };

      await bookingsApi.update(bookingId, updateData);
      await fetchBookings();
      // Dispatch custom event to notify dashboard of update
      window.dispatchEvent(new CustomEvent('bookingUpdated'));
    } catch (error) {
      console.error('Error updating booking status:', error);
      setErrorMessage('Failed to update booking status. Please try again.');
      setShowErrorModal(true);
    }
  };

  const handleDelete = async (id) => {
    setConfirmMessage('Are you sure you want to delete this booking? This action cannot be undone.');
    setConfirmAction(() => async () => {
      try {
        await bookingsApi.delete(id);
        await fetchBookings();
      } catch (error) {
        console.error('Error deleting booking:', error);
        setErrorMessage('Failed to delete booking. Please try again.');
        setShowErrorModal(true);
      }
    });
    setShowConfirmModal(true);
  };

  const handleCancel = () => {
    setEditingBooking(null);
    setFormData({});
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      case 'completed':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'cancelled':
        return <XCircle size={16} className="text-red-600" />;
      case 'completed':
        return <CheckCircle size={16} className="text-blue-600" />;
      default:
        return <Clock size={16} className="text-yellow-600" />;
    }
  };

  const filteredBookings = bookings;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Bookings Management</h2>
          <p className="text-gray-600">View and manage all customer bookings</p>
        </div>
        <div className="text-sm text-gray-600">
          Total Bookings: <span className="font-semibold text-gray-900">{bookings.length}</span>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <Loader2 className="animate-spin text-blue-600" size={48} />
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-block p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full mb-4">
            <Calendar size={48} className="text-blue-600" />
          </div>
          <p className="text-gray-600 text-lg font-medium">No bookings found</p>
          <p className="text-gray-500 text-sm mt-2">Bookings will appear here when customers submit orders</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredBookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
            >
              <div className="p-4 sm:p-6">
                {/* Header with Status */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      <span className="capitalize">{booking.status}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(booking.timestamp).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <select
                      value={booking.status || 'pending'}
                      onChange={(e) => handleQuickStatusUpdate(booking._id, e.target.value)}
                      className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() => handleEdit(booking)}
                      className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 font-semibold text-sm"
                    >
                      <Edit size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 font-semibold text-sm"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <User className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Customer Name</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {booking.firstName} {booking.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Mail className="text-green-600" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-semibold text-gray-900 break-all">{booking.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Phone className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-semibold text-gray-900">{booking.phone}</p>
                    </div>
                  </div>
                  {booking.contactNumber && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Phone className="text-orange-600" size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Contact Number</p>
                        <p className="text-sm font-semibold text-gray-900">{booking.contactNumber}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Service/Design Information */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Booking Details</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(booking.serviceTitle || booking.designTitle) && (
                      <div>
                        <p className="text-xs text-gray-500">Service/Design</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {booking.serviceTitle || booking.designTitle}
                        </p>
                        {(booking.serviceCategory || booking.designCategory) && (
                          <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                            {booking.serviceCategory || booking.designCategory}
                          </span>
                        )}
                      </div>
                    )}
                    {(booking.servicePrice || booking.designPrice) && (
                      <div>
                        <p className="text-xs text-gray-500">Price</p>
                        <p className="text-sm font-semibold text-green-600">
                          {booking.servicePrice || booking.designPrice}
                        </p>
                      </div>
                    )}
                    {booking.date && (
                      <div>
                        <p className="text-xs text-gray-500">Date</p>
                        <p className="text-sm font-semibold text-gray-900">{booking.date}</p>
                      </div>
                    )}
                    {booking.time && (
                      <div>
                        <p className="text-xs text-gray-500">Time</p>
                        <p className="text-sm font-semibold text-gray-900">{booking.time}</p>
                      </div>
                    )}
                  </div>
                  {booking.notes && (
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-xs text-gray-500 mb-1">Notes</p>
                      <p className="text-sm text-gray-700">{booking.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <Modal
        isOpen={editingBooking !== null}
        onClose={handleCancel}
        title="Edit Booking"
        maxWidth="max-w-3xl"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number (Optional)</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="Alternative contact number"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
              <input
                type="date"
                name="date"
                value={formData.date || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time *</label>
              <input
                type="text"
                name="time"
                value={formData.time || ''}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              name="status"
              value={formData.status || 'pending'}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Service/Design Title</label>
            <input
              type="text"
              name="serviceTitle"
              value={formData.serviceTitle || formData.designTitle || ''}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
            <textarea
              name="notes"
              value={formData.notes || ''}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle size={18} />
                  Save Changes
                </>
              )}
            </button>
            <button
              onClick={handleCancel}
              disabled={saving}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <XCircle size={18} />
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
        title="Confirm Action"
        message={confirmMessage}
        confirmText="Confirm"
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

export default BookingsManagement;
