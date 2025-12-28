import React, { useState, useEffect } from 'react';
import { Trash2, Mail, Phone, User, Calendar, Loader2, MessageSquare } from 'lucide-react';
import { contactsApi } from '../utils/contentApi';
import ConfirmationModal from '../components/ConfirmationModal';
import ErrorModal from '../components/ErrorModal';

const ContactsManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchContacts();
    // Refresh contacts every 30 seconds
    const interval = setInterval(fetchContacts, 30000);
    
    // Listen for custom contact update events
    const handleContactUpdate = () => {
      fetchContacts();
    };
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
        // Dispatch custom event to notify dashboard of update
        window.dispatchEvent(new CustomEvent('contactUpdated'));
      } catch (error) {
        console.error('Error deleting contact:', error);
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
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Contact Messages</h2>
          <p className="text-gray-600">View and manage customer inquiries and messages</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            Total: <span className="font-semibold text-gray-900">{contacts.length}</span>
          </div>
          {unreadCount > 0 && (
            <div className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-semibold">
              Unread: {unreadCount}
            </div>
          )}
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-block p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full mb-4">
            <MessageSquare className="w-12 h-12 text-blue-600" />
          </div>
          <p className="text-gray-600 text-lg font-medium">No contact messages yet</p>
          <p className="text-gray-500 text-sm mt-2">Messages will appear here when customers contact you</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 ${
                contact.read 
                  ? 'border-gray-300' 
                  : 'border-blue-500'
              } overflow-hidden`}
            >
              <div className="p-4 sm:p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    {!contact.read && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        New
                      </span>
                    )}
                    <span className="text-sm text-gray-500">
                      {new Date(contact.timestamp).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <button
                    onClick={() => handleDelete(contact._id)}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center gap-2 font-semibold text-sm"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <User className="text-blue-600" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Name</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {contact.firstName} {contact.lastName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Mail className="text-green-600" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm font-semibold text-gray-900 break-all">{contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Phone className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="text-sm font-semibold text-gray-900">{contact.phone}</p>
                    </div>
                  </div>
                  {contact.contactNumber && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Phone className="text-orange-600" size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Contact Number</p>
                        <p className="text-sm font-semibold text-gray-900">{contact.contactNumber}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Message */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="text-gray-600" size={18} />
                    <h4 className="text-sm font-semibold text-gray-700">Message</h4>
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => {
          if (confirmAction) {
            confirmAction();
          }
        }}
        title="Delete Contact Message"
        message="Are you sure you want to delete this contact message? This action cannot be undone."
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

export default ContactsManagement;
