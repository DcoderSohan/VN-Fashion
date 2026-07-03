import React, { useState, useEffect } from 'react';
import { Edit, Trash2, CheckCircle, XCircle, Clock, Loader2, Phone, Mail, Calendar, User, Save, X } from 'lucide-react';
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
    const interval = setInterval(fetchBookings, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingsApi.getAll();
      setBookings(response.data || []);
    } catch (error) {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleEdit = (booking) => {
    setFormData({
      _id: booking._id, firstName: booking.firstName || '', lastName: booking.lastName || '',
      email: booking.email || '', phone: booking.phone || '', contactNumber: booking.contactNumber || '',
      serviceId: booking.serviceId || '', serviceTitle: booking.serviceTitle || '',
      servicePrice: booking.servicePrice || '', serviceCategory: booking.serviceCategory || '',
      designId: booking.designId || '', designTitle: booking.designTitle || '',
      designCategory: booking.designCategory || '', designPrice: booking.designPrice || '',
      date: booking.date || '', time: booking.time || '', notes: booking.notes || '',
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
      window.dispatchEvent(new CustomEvent('bookingUpdated'));
    } catch (error) {
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
      await bookingsApi.update(bookingId, { ...booking, status: newStatus });
      await fetchBookings();
      window.dispatchEvent(new CustomEvent('bookingUpdated'));
    } catch (error) {
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
        setErrorMessage('Failed to delete booking. Please try again.');
        setShowErrorModal(true);
      }
    });
    setShowConfirmModal(true);
  };

  const handleCancel = () => { setEditingBooking(null); setFormData({}); };

  const getStatusStyle = (status) => {
    const styles = {
      confirmed: 'border border-black text-black bg-white',
      cancelled: 'border border-red-200 text-red-600 bg-red-50',
      completed: 'border border-gray-700 text-white bg-gray-800',
      pending: 'border border-gray-300 text-gray-700 bg-gray-50',
    };
    return styles[status] || styles.pending;
  };

  const labelClass = "block text-[10px] font-medium tracking-widest uppercase text-gray-500 mb-2";
  const inputClass = "w-full px-4 py-3 border border-gray-300 bg-white text-sm focus:outline-none focus:border-black transition-colors";

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1
            className="text-4xl sm:text-5xl font-light text-black mb-1"
            style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
          >
            Bookings
          </h1>
          <p className="text-[10px] text-gray-400 tracking-widest uppercase">View and manage customer bookings</p>
        </div>
        <span className="text-xs text-gray-400 tracking-widest">
          Total: <strong className="text-black">{bookings.length}</strong>
        </span>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="animate-spin text-black" size={36} />
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-24 border border-gray-200 bg-white">
          <Calendar size={40} className="text-gray-300 mx-auto mb-4" />
          <p className="text-xs text-gray-400 tracking-widest uppercase mb-1">No bookings found</p>
          <p className="text-xs text-gray-300">Bookings appear here when customers submit orders</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white border border-gray-200 hover:border-gray-400 transition-colors overflow-hidden">
              <div className="p-5">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`px-2.5 py-1 text-[10px] font-medium tracking-widest uppercase capitalize ${getStatusStyle(booking.status)}`}>
                      {booking.status || 'pending'}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(booking.timestamp).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <select
                      value={booking.status || 'pending'}
                      onChange={(e) => handleQuickStatusUpdate(booking._id, e.target.value)}
                      className="px-3 py-1.5 border border-gray-300 bg-white text-xs font-medium tracking-wider focus:outline-none focus:border-black transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <button
                      onClick={() => handleEdit(booking)}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-black text-black text-[10px] font-medium tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-200"
                    >
                      <Edit size={11} /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 border border-red-200 text-red-500 text-[10px] font-medium tracking-widest uppercase hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200"
                    >
                      <Trash2 size={11} /> Delete
                    </button>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-start gap-2">
                    <User size={14} className="text-gray-300 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-0.5">Customer</p>
                      <p className="text-xs font-medium text-black">{booking.firstName} {booking.lastName}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail size={14} className="text-gray-300 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-0.5">Email</p>
                      <p className="text-xs font-medium text-black break-all">{booking.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone size={14} className="text-gray-300 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-0.5">Phone</p>
                      <p className="text-xs font-medium text-black">{booking.phone || '—'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar size={14} className="text-gray-300 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-0.5">Date / Time</p>
                      <p className="text-xs font-medium text-black">{booking.date || '—'} {booking.time && `· ${booking.time}`}</p>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {(booking.serviceTitle || booking.designTitle) && (
                      <div>
                        <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-0.5">Service / Design</p>
                        <p className="text-xs font-medium text-black">{booking.serviceTitle || booking.designTitle}</p>
                      </div>
                    )}
                    {(booking.serviceCategory || booking.designCategory) && (
                      <div>
                        <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-0.5">Category</p>
                        <span className="inline-block mt-0.5 px-2 py-0.5 border border-gray-200 text-[9px] font-medium tracking-widest uppercase text-gray-600">
                          {booking.serviceCategory || booking.designCategory}
                        </span>
                      </div>
                    )}
                    {(booking.servicePrice || booking.designPrice) && (
                      <div>
                        <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-0.5">Price</p>
                        <p className="text-xs font-medium text-black">{booking.servicePrice || booking.designPrice}</p>
                      </div>
                    )}
                    {booking.notes && (
                      <div className="col-span-2 sm:col-span-4">
                        <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-0.5">Notes</p>
                        <p className="text-xs text-gray-600">{booking.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
      <Modal isOpen={editingBooking !== null} onClose={handleCancel} title="Edit Booking" maxWidth="max-w-3xl">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>First Name *</label>
              <input type="text" name="firstName" value={formData.firstName || ''} onChange={handleChange} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Last Name *</label>
              <input type="text" name="lastName" value={formData.lastName || ''} onChange={handleChange} className={inputClass} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Email *</label>
              <input type="email" name="email" value={formData.email || ''} onChange={handleChange} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Phone *</label>
              <input type="tel" name="phone" value={formData.phone || ''} onChange={handleChange} className={inputClass} required />
            </div>
          </div>
          <div>
            <label className={labelClass}>Contact Number (Optional)</label>
            <input type="tel" name="contactNumber" value={formData.contactNumber || ''} onChange={handleChange} className={inputClass} placeholder="Alternative contact number" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Date *</label>
              <input type="date" name="date" value={formData.date || ''} onChange={handleChange} className={inputClass} required />
            </div>
            <div>
              <label className={labelClass}>Time *</label>
              <input type="text" name="time" value={formData.time || ''} onChange={handleChange} className={inputClass} required />
            </div>
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select name="status" value={formData.status || 'pending'} onChange={handleChange} className={inputClass}>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Service / Design Title</label>
            <input type="text" name="serviceTitle" value={formData.serviceTitle || formData.designTitle || ''} onChange={handleChange} className={inputClass} readOnly />
          </div>
          <div>
            <label className={labelClass}>Notes</label>
            <textarea name="notes" value={formData.notes || ''} onChange={handleChange} rows={3} className={`${inputClass} resize-none`} />
          </div>
          <div className="flex gap-3 pt-2">
            <button onClick={handleSave} disabled={saving}
              className="flex-1 py-3 bg-black text-white text-xs font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
              {saving ? <><Loader2 className="animate-spin" size={13} />Saving...</> : <><Save size={13} />Save Changes</>}
            </button>
            <button onClick={handleCancel} disabled={saving}
              className="flex-1 py-3 border border-gray-300 text-gray-600 text-xs font-medium tracking-widest uppercase hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
              <X size={13} />Cancel
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmationModal
        isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}
        onConfirm={() => { if (confirmAction) confirmAction(); }}
        title="Confirm Action" message={confirmMessage} confirmText="Confirm" cancelText="Cancel" type="error"
      />
      <ErrorModal isOpen={showErrorModal} onClose={() => setShowErrorModal(false)} title="Error" message={errorMessage} />
    </div>
  );
};

export default BookingsManagement;
