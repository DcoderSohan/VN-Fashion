import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
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

  // Update formData when location.state changes
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

  const today = new Date().toISOString().split('T')[0];
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
    
    if ((!formData.serviceId && !formData.designId) || !formData.date || !formData.time || !formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setErrorMessage('Please fill in all required fields to place your order');
      setShowErrorModal(true);
      return;
    }

    try {
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

      const response = await contentApi.createBooking(bookingData);
      
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
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
    <div className="min-h-screen bg-[#f5f4f2] overflow-x-hidden font-sans text-gray-955">
      <Navbar />
      <div className="pt-32 pb-24 px-8 lg:px-20">
        <div className="max-w-6xl mx-auto w-full">
          {/* Header */}
          <motion.div
            className="mb-16 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-2">APPOINTMENTS</p>
            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6rem] font-light leading-[0.95] tracking-tight text-gray-950" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Request a
              <br />
              Consultation.
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 lg:gap-24 items-start">
            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full"
            >
              {isSubmitted ? (
                <div className="border-t border-gray-950 pt-8 text-left">
                  <h2 className="text-3xl font-light text-gray-955 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Booking Placed.
                  </h2>
                  <p className="text-xs text-gray-500 leading-relaxed font-light mb-8 max-w-md">
                    Thanks for ordering! We will review your consultation request and contact you soon at your email or phone number.
                  </p>
                  
                  {bookingDetails && (
                    <div className="border-t border-b border-gray-300 py-6 mb-8 max-w-md space-y-3">
                      <div className="flex justify-between text-[11px] font-semibold text-gray-500 tracking-wider">
                        <span>ORDER ID</span>
                        <span className="text-gray-955">{bookingDetails.bookingId}</span>
                      </div>
                      <div className="flex justify-between text-[11px] font-semibold text-gray-500 tracking-wider">
                        <span>ITEM</span>
                        <span className="text-gray-955">{bookingDetails.serviceName}</span>
                      </div>
                      <div className="flex justify-between text-[11px] font-semibold text-gray-500 tracking-wider">
                        <span>DATE</span>
                        <span className="text-gray-955">{bookingDetails.date}</span>
                      </div>
                      <div className="flex justify-between text-[11px] font-semibold text-gray-500 tracking-wider">
                        <span>TIME</span>
                        <span className="text-gray-955">{bookingDetails.time}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      onClick={handleReset}
                      className="border border-gray-950 text-gray-955 text-[9px] tracking-[0.25em] uppercase px-6 py-3.5 hover:bg-gray-950 hover:text-white transition-all font-bold"
                    >
                      Book Another
                    </button>
                    <button
                      onClick={() => navigate('/')}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-955 text-[9px] tracking-[0.25em] uppercase px-6 py-3.5 transition-all font-bold"
                    >
                      Back Home
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 border-t border-gray-300 pt-8">
                  {/* Select Service */}
                  <div className="border-b border-gray-400 focus-within:border-gray-955 transition-colors pb-2">
                    <label className="block text-[8px] tracking-[0.2em] uppercase text-gray-400 font-bold mb-2">SELECT SERVICE *</label>
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
                          designId: e.target.value ? '' : formData.designId,
                          designTitle: e.target.value ? '' : formData.designTitle,
                          designCategory: e.target.value ? '' : formData.designCategory,
                          designPrice: e.target.value ? '' : formData.designPrice,
                        });
                      }}
                      required={!formData.serviceTitle && !formData.designTitle}
                      className="w-full bg-transparent text-[10px] tracking-[0.15em] uppercase text-gray-955 font-bold outline-none cursor-pointer"
                    >
                      <option value="" className="text-gray-400">CHOOSE A SERVICE...</option>
                      {services.map((service) => (
                        <option key={service._id} value={service._id} className="text-gray-955">
                          {service.title.toUpperCase()} {service.price ? `- ${formatPrice(service.price)}` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="border-b border-gray-400 focus-within:border-gray-955 transition-colors pb-2">
                      <label className="block text-[8px] tracking-[0.2em] uppercase text-gray-400 font-bold mb-2">DATE *</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={today}
                        max={maxDateStr}
                        required
                        className="w-full bg-transparent text-[10px] tracking-[0.15em] uppercase text-gray-955 font-bold outline-none"
                      />
                    </div>
                    <div className="border-b border-gray-400 focus-within:border-gray-955 transition-colors pb-2">
                      <label className="block text-[8px] tracking-[0.2em] uppercase text-gray-400 font-bold mb-2">TIME SLOT *</label>
                      <select
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent text-[10px] tracking-[0.15em] uppercase text-gray-955 font-bold outline-none cursor-pointer"
                      >
                        <option value="" className="text-gray-400">CHOOSE A TIME...</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot} className="text-gray-955">
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="border-b border-gray-400 focus-within:border-gray-955 transition-colors pb-2">
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full bg-transparent text-[10px] tracking-[0.2em] uppercase text-gray-955 placeholder-gray-400 outline-none font-semibold"
                        placeholder="FIRST NAME *"
                      />
                    </div>
                    <div className="border-b border-gray-400 focus-within:border-gray-955 transition-colors pb-2">
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full bg-transparent text-[10px] tracking-[0.2em] uppercase text-gray-955 placeholder-gray-400 outline-none font-semibold"
                        placeholder="LAST NAME *"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="border-b border-gray-400 focus-within:border-gray-955 transition-colors pb-2">
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-transparent text-[10px] tracking-[0.2em] uppercase text-gray-955 placeholder-gray-400 outline-none font-semibold"
                        placeholder="EMAIL ADDRESS *"
                      />
                    </div>
                    <div className="border-b border-gray-400 focus-within:border-gray-955 transition-colors pb-2">
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-transparent text-[10px] tracking-[0.2em] uppercase text-gray-955 placeholder-gray-400 outline-none font-semibold"
                        placeholder="PHONE NUMBER *"
                      />
                    </div>
                  </div>

                  <div className="border-b border-gray-400 focus-within:border-gray-955 transition-colors pb-2">
                    <textarea
                      name="notes"
                      rows={4}
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full bg-transparent text-[10px] tracking-[0.2em] uppercase text-gray-955 placeholder-gray-400 outline-none resize-none font-semibold"
                      placeholder="ADDITIONAL NOTES"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full border border-gray-955 text-gray-955 text-[9px] tracking-[0.25em] uppercase py-4 bg-transparent hover:bg-gray-955 hover:text-white transition-all font-bold"
                  >
                    PLACE APPOINTMENT REQUEST
                  </button>
                </form>
              )}
            </motion.div>

            {/* Selected Item Preview (Right Column) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col border-t border-gray-300 pt-8"
            >
              <h2 className="text-2xl font-light text-gray-955 mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Selected Details
              </h2>

              {formData.designTitle ? (
                <div className="mb-8">
                  <div className="w-full bg-gray-100 overflow-hidden mb-4" style={{ aspectRatio: "3/4" }}>
                    <img
                      src={getImageUrl(formData.designImage)}
                      alt={formData.designTitle}
                      className="w-full h-full object-cover grayscale"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] tracking-[0.2em] text-gray-400 uppercase font-bold">{formData.designCategory}</span>
                    <span className="text-2xl font-light text-gray-955" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{formData.designTitle}</span>
                    {formData.designPrice && (
                      <span className="text-xs text-gray-600 font-semibold tracking-wider mt-1">{formatPrice(formData.designPrice)}</span>
                    )}
                  </div>
                </div>
              ) : formData.serviceTitle ? (
                <div className="mb-8">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] tracking-[0.2em] text-gray-400 uppercase font-bold">{formData.serviceCategory || "SERVICE"}</span>
                    <span className="text-2xl font-light text-gray-955" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{formData.serviceTitle}</span>
                    {formData.servicePrice && (
                      <span className="text-xs text-gray-600 font-semibold tracking-wider mt-1">{formatPrice(formData.servicePrice)}</span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mb-8 py-8 border border-dashed border-gray-400 rounded flex flex-col items-center justify-center text-center px-4">
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    No design or service selected. <br/> Use the select option in the form or choose a service directly from the services menu.
                  </p>
                </div>
              )}

              <div className="space-y-4 border-t border-gray-300 pt-6">
                <div>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-1">ATELIER ASSISTANCE</p>
                  <p className="text-xs text-gray-500 leading-relaxed font-light">
                    For custom custom tailoring, alterations and direct fittings, please request a consultation. Our team will verify time availability.
                  </p>
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-1">HOURS</p>
                  <p className="text-xs text-gray-500 font-light">Mon - Sat: 10:00 AM - 07:00 PM <br/> Sunday: Closed</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      <Footer />

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
