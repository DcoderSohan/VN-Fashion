import React, { useState, useEffect } from 'react';
import { Trash2, Mail, Phone, User, Loader2, MessageSquare } from 'lucide-react';
import { contactsApi } from '../utils/contentApi';
import ConfirmationModal from '../components/ConfirmationModal';
import ErrorModal from '../components/ErrorModal';

const ContactsManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchContacts();
    const interval = setInterval(fetchContacts, 30000);
    const handleContactUpdate = () => fetchContacts();
    window.addEventListener('contactUpdated', handleContactUpdate);
    return () => {
      clearInterval(interval);
      window.removeEventListener('contactUpdated', handleContactUpdate);
    };
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await contactsApi.getAll();
      setContacts(response.data || []);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setConfirmAction(() => async () => {
      try {
        await contactsApi.delete(id);
        await fetchContacts();
        window.dispatchEvent(new CustomEvent('contactUpdated'));
      } catch (error) {
        setErrorMessage('Failed to delete contact message. Please try again.');
        setShowErrorModal(true);
      }
    });
    setShowConfirmModal(true);
  };

  const unreadCount = contacts.filter(c => !c.read).length;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin text-black" size={36} />
      </div>
    );
  }

  return (
    <div>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-8">
        <div>
          <h1
            className="text-4xl sm:text-5xl font-light text-black mb-1"
            style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
          >
            Contact Messages
          </h1>
          <p className="text-[10px] text-gray-400 tracking-widest uppercase">View and manage customer inquiries</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-400 tracking-widest">Total: <strong className="text-black">{contacts.length}</strong></span>
          {unreadCount > 0 && (
            <span className="px-3 py-1 bg-black text-white text-[10px] font-medium tracking-widest uppercase">
              {unreadCount} Unread
            </span>
          )}
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="text-center py-24 border border-gray-200 bg-white">
          <MessageSquare size={40} className="text-gray-300 mx-auto mb-4" />
          <p className="text-xs text-gray-400 tracking-widest uppercase mb-1">No contact messages yet</p>
          <p className="text-xs text-gray-300">Messages will appear here when customers contact you</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className={`bg-white border-l-4 border border-gray-200 ${
                contact.read ? 'border-l-gray-200' : 'border-l-black'
              } hover:border-gray-400 transition-colors`}
            >
              <div className="p-5">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    {!contact.read && (
                      <span className="bg-black text-white text-[9px] font-medium tracking-widest uppercase px-2 py-1">
                        New
                      </span>
                    )}
                    <span className="text-xs text-gray-400">
                      {new Date(contact.timestamp).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'short', day: 'numeric',
                        hour: '2-digit', minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 border border-red-200 text-red-500 text-[10px] font-medium tracking-widest uppercase hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200"
                  >
                    <Trash2 size={12} />
                    Delete
                  </button>
                </div>

                {/* Contact Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-start gap-2">
                    <User size={14} className="text-gray-300 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-0.5">Name</p>
                      <p className="text-xs font-medium text-black">{contact.firstName} {contact.lastName}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail size={14} className="text-gray-300 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-0.5">Email</p>
                      <p className="text-xs font-medium text-black break-all">{contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone size={14} className="text-gray-300 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-0.5">Phone</p>
                      <p className="text-xs font-medium text-black">{contact.phone || '—'}</p>
                    </div>
                  </div>
                  {contact.contactNumber && (
                    <div className="flex items-start gap-2">
                      <Phone size={14} className="text-gray-300 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-[9px] text-gray-400 tracking-widest uppercase mb-0.5">Alt. Number</p>
                        <p className="text-xs font-medium text-black">{contact.contactNumber}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center gap-1.5 mb-2">
                    <MessageSquare size={12} className="text-gray-400" />
                    <p className="text-[9px] font-medium text-gray-400 tracking-widest uppercase">Message</p>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">{contact.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmationModal
        isOpen={showConfirmModal} onClose={() => setShowConfirmModal(false)}
        onConfirm={() => { if (confirmAction) confirmAction(); }}
        title="Delete Message" message="Are you sure you want to delete this contact message? This action cannot be undone."
        confirmText="Delete" cancelText="Cancel" type="error"
      />
      <ErrorModal
        isOpen={showErrorModal} onClose={() => setShowErrorModal(false)}
        title="Error" message={errorMessage}
      />
    </div>
  );
};

export default ContactsManagement;
