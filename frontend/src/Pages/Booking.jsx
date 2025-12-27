import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle } from 'lucide-react';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { contentApi } from '../utils/api';
import { getImageUrl, formatPrice } from '../utils/helpers';
import ErrorModal from '../Components/Modal/ErrorModal';

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM'
];

const Booking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    serviceId: location.state?.serviceId || '',
    serviceTitle: location.state?.serviceTitle || '',
    servicePrice: location.state?.servicePrice || '',
    serviceCategory: location.state?.serviceCategory || '',
    designId: location.state?.designId || '',
    designTitle: location.state?.designTitle || '',
    designCategory: location.state?.designCategory || '',
    designPrice: location.state?.designPrice || '',
    designImage: location.state?.designImage || '',
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    contactNumber: '',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await contentApi.getServices();
        setServices(data || []);
      } catch (error) {
        console.error('Error fetching services:', error);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Update formData when location.state changes (when navigating from gallery or services)
  useEffect(() => {
    if (location.state) {
      setFormData(prev => ({
        ...prev,
        serviceId: location.state?.serviceId || prev.serviceId,
        serviceTitle: location.state?.serviceTitle || prev.serviceTitle,
        servicePrice: location.state?.servicePrice || prev.servicePrice,
        serviceCategory: location.state?.serviceCategory || prev.serviceCategory,
        designId: location.state?.designId || prev.designId,
        designTitle: location.state?.designTitle || prev.designTitle,
        designCategory: location.state?.designCategory || prev.designCategory,
        designPrice: location.state?.designPrice || prev.designPrice,
        designImage: location.state?.designImage || prev.designImage,
      }));
    }
  }, [location.state]);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  
  // Get date 3 months from now
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      // Validation - either serviceId or designId must be present
    if ((!formData.serviceId && !formData.designId) || !formData.date || !formData.time || !formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setErrorMessage('Please fill in all required fields to place your order');
      setShowErrorModal(true);
      return;
    }

    try {
      // Prepare booking data for API
      const bookingData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        contactNumber: formData.contactNumber || formData.phone,
        serviceId: formData.serviceId || '',
        serviceTitle: formData.serviceTitle || '',
        servicePrice: formData.servicePrice || '',
        serviceCategory: formData.serviceCategory || '',
        designId: formData.designId || '',
        designTitle: formData.designTitle || '',
        designCategory: formData.designCategory || '',
        designPrice: formData.designPrice || '',
        designImage: formData.designImage || '',
        date: formData.date,
        time: formData.time,
        notes: formData.notes || '',
        status: 'pending',
      };

      // Submit to API
      const response = await contentApi.createBooking(bookingData);
      
      // Create booking details for display
      const booking = {
        ...bookingData,
        _id: response._id,
        name: `${formData.firstName} ${formData.lastName}`,
        serviceName: formData.serviceTitle || formData.designTitle || 'Custom Service',
        bookingId: `BK${response._id}`,
        submittedAt: new Date().toLocaleString(),
      };

      setBookingDetails(booking);
      setIsSubmitted(true);
      
      // Scroll to top of page to show success message
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      console.log('Order submitted successfully:', booking);
    } catch (error) {
      console.error('Error submitting order:', error);
      setErrorMessage('Failed to submit order. Please try again.');
      setShowErrorModal(true);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setBookingDetails(null);
    setFormData({
      serviceId: '',
      serviceTitle: '',
      servicePrice: '',
      serviceCategory: '',
      designId: '',
      designTitle: '',
      designCategory: '',
      designPrice: '',
      designImage: '',
      date: '',
      time: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      contactNumber: '',
      notes: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navbar />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4">
              Book Your <span className="text-blue-600">Order</span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-2">
              Fill in the details below to place your order
            </p>
          </motion.div>

          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 lg:p-10 space-y-6 sm:space-y-8">
                {/* Selected Service Info (if coming from services page) */}
                {formData.serviceTitle && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-4 sm:p-6 mb-6"
                  >
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Selected Service</h3>
                    <div className="space-y-2">
                      <p className="text-base sm:text-lg font-bold text-blue-600">{formData.serviceTitle}</p>
                      {formData.serviceCategory && (
                        <p className="text-sm sm:text-base text-gray-600">Category: <span className="font-semibold">{formData.serviceCategory}</span></p>
                      )}
                      {formData.servicePrice && (
                        <p className="text-sm sm:text-base text-gray-600">Price: <span className="font-semibold text-green-600">{formatPrice(formData.servicePrice)}</span></p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, serviceId: '', serviceTitle: '', servicePrice: '', serviceCategory: '' });
                      }}
                      className="mt-3 text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      Change Service
                    </button>
                  </motion.div>
                )}

                {/* Selected Design Info (if coming from gallery) */}
                {formData.designTitle && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-lg p-4 sm:p-6 mb-6"
                  >
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">Selected Design</h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {formData.designImage && (
                        <div className="w-full sm:w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden border-2 border-blue-200">
                          <img
                            src={getImageUrl(formData.designImage)}
                            alt={formData.designTitle}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <div className="flex-1 space-y-2">
                        <p className="text-base sm:text-lg font-bold text-blue-600">{formData.designTitle}</p>
                        {formData.designCategory && (
                          <p className="text-sm sm:text-base text-gray-600">Category: <span className="font-semibold">{formData.designCategory}</span></p>
                        )}
                        {formData.designPrice && (
                          <p className="text-sm sm:text-base text-gray-600">Price: <span className="font-semibold text-green-600">{formatPrice(formData.designPrice)}</span></p>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, designId: '', designTitle: '', designCategory: '', designPrice: '', designImage: '' });
                      }}
                      className="mt-3 text-sm text-blue-600 hover:text-blue-800 underline"
                    >
                      Change Design
                    </button>
                  </motion.div>
                )}

                {/* Service Selection */}
                <div>
                  <label className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                    <Calendar className="text-blue-600 sm:w-5 sm:h-5" size={18} />
                    {formData.serviceTitle || formData.designTitle ? 'Select Service (Optional)' : 'Select Service *'}
                  </label>
                  {loading ? (
                    <div className="w-full px-4 py-3 border border-gray-300 rounded-lg flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                    </div>
                  ) : (
                    <select
                      name="serviceId"
                      value={formData.serviceId}
                      onChange={(e) => {
                        const selectedService = services.find(s => s._id === e.target.value);
                        setFormData({
                          ...formData,
                          serviceId: e.target.value,
                          serviceTitle: selectedService?.title || '',
                          servicePrice: selectedService?.price || '',
                          serviceCategory: selectedService?.category || '',
                          // Clear design data when selecting a service
                          designId: e.target.value ? '' : formData.designId,
                          designTitle: e.target.value ? '' : formData.designTitle,
                          designCategory: e.target.value ? '' : formData.designCategory,
                          designPrice: e.target.value ? '' : formData.designPrice,
                        });
                      }}
                      required={!formData.serviceTitle && !formData.designTitle}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Choose a service...</option>
                      {services.map((service) => (
                        <option key={service._id} value={service._id}>
                          {service.title} {service.price ? `- ${formatPrice(service.price)}` : ''}
                        </option>
                      ))}
                    </select>
                  )}
                  {(formData.serviceTitle || formData.designTitle) && (
                    <p className="mt-2 text-xs sm:text-sm text-gray-500">You can select a different service or proceed with the selected item</p>
                  )}
                </div>

                {/* Date & Time Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                      <Calendar className="text-blue-600 sm:w-5 sm:h-5" size={18} />
                      Select Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={today}
                      max={maxDateStr}
                      required
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
                      <Clock className="text-blue-600 sm:w-5 sm:h-5" size={18} />
                      Select Time *
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Choose a time...</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="border-t pt-6 sm:pt-8">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Personal Information</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <User className="text-blue-600" size={16} />
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <User className="text-blue-600" size={16} />
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Mail className="text-blue-600" size={16} />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                        <Phone className="text-blue-600" size={16} />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        placeholder="+91 1234567890"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                      <Phone className="text-blue-600" size={16} />
                      Contact Number (Optional)
                    </label>
                    <input
                      type="tel"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Alternative contact number"
                    />
                    <p className="mt-1 text-xs text-gray-500">Additional contact number for admin to reach you</p>
                  </div>
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <MessageSquare className="text-blue-600" size={16} />
                    Additional Notes
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Any specific requirements, style preferences, measurements, or special requests..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Place Order
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 lg:p-10"
            >
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
                >
                  <CheckCircle className="text-green-600 sm:w-12 sm:h-12" size={36} />
                </motion.div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Thank You for Your Order!</h2>
                <p className="text-gray-600 mb-2 sm:mb-3 text-base sm:text-lg px-2 font-medium">Thanks for ordering! We will get back to you soon and contact you soon.</p>
                <p className="text-gray-500 mb-6 sm:mb-8 text-sm sm:text-base px-2">Your order has been successfully placed. Our team will reach out to you shortly to confirm the details.</p>

                {/* Booking Details */}
                {bookingDetails && (
                  <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 text-left">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">Order Details</h3>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                        <span className="text-gray-600 text-sm sm:text-base">Order ID:</span>
                        <span className="font-semibold text-gray-900 text-sm sm:text-base break-all">{bookingDetails.bookingId}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                        <span className="text-gray-600 text-sm sm:text-base">{bookingDetails.serviceCategory ? 'Design' : 'Service'}:</span>
                        <span className="font-semibold text-gray-900 text-sm sm:text-base">{bookingDetails.serviceName}</span>
                      </div>
                      {bookingDetails.serviceCategory && (
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                          <span className="text-gray-600 text-sm sm:text-base">Category:</span>
                          <span className="font-semibold text-gray-900 text-sm sm:text-base">{bookingDetails.serviceCategory}</span>
                        </div>
                      )}
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                        <span className="text-gray-600 text-sm sm:text-base">Date:</span>
                        <span className="font-semibold text-gray-900 text-sm sm:text-base">
                          {new Date(bookingDetails.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                        <span className="text-gray-600 text-sm sm:text-base">Time:</span>
                        <span className="font-semibold text-gray-900 text-sm sm:text-base">{bookingDetails.time}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                        <span className="text-gray-600 text-sm sm:text-base">Name:</span>
                        <span className="font-semibold text-gray-900 text-sm sm:text-base">{bookingDetails.firstName} {bookingDetails.lastName}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                        <span className="text-gray-600 text-sm sm:text-base">Email:</span>
                        <span className="font-semibold text-gray-900 text-sm sm:text-base break-all">{bookingDetails.email}</span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0">
                        <span className="text-gray-600 text-sm sm:text-base">Phone:</span>
                        <span className="font-semibold text-gray-900 text-sm sm:text-base">{bookingDetails.phone}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <motion.button
                    onClick={handleReset}
                    className="px-5 py-2.5 sm:px-6 sm:py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm sm:text-base"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Place Another Order
                  </motion.button>
                  <motion.button
                    onClick={() => navigate('/')}
                    className="px-5 py-2.5 sm:px-6 sm:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Back to Home
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />

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

export default Booking;
