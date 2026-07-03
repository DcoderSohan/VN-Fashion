import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Clock, CheckCircle, ArrowRight, Scissors } from 'lucide-react';
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
  const [focused, setFocused] = useState('');
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
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
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

  const serif = { fontFamily: "'Cormorant Garamond', serif" };

  const css = `
    .bpage {
      background: #fbfbfa;
      color: #1a1a1a;
      font-family: 'Inter', sans-serif;
      min-height: 100vh;
      overflow-x: hidden;
      position: relative;
    }
    .bpage::before {
      content: '';
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
      opacity: 0.022;
      mix-blend-mode: multiply;
    }
    .bwm {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      background-image: url('/VN-3.jpg');
      background-size: cover;
      background-position: center;
      opacity: 0.04;
      filter: grayscale(1);
    }
    .bbody { position: relative; z-index: 1; }
    .b-left-panel {
      background: #1a1a1a;
      color: #fbfbfa;
      padding: clamp(48px, 8vw, 80px) clamp(28px, 5vw, 56px);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: 520px;
    }
    .bfield {
      position: relative;
      border-bottom: 1px solid #d4cfc8;
      transition: border-color 0.3s;
      padding-bottom: 10px;
      margin-bottom: 0;
    }
    .bfield.focused { border-bottom-color: #b8860b; }
    .bfield label {
      display: block;
      font-size: 0.58rem;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      font-weight: 600;
      color: #999;
      margin-bottom: 6px;
      transition: color 0.3s;
    }
    .bfield.focused label { color: #b8860b; }
    .bfield input,
    .bfield select,
    .bfield textarea {
      width: 100%;
      background: transparent;
      border: none;
      outline: none;
      font-size: 0.9rem;
      color: #1a1a1a;
      font-weight: 300;
      font-family: 'Inter', sans-serif;
      resize: none;
      cursor: pointer;
    }
    .bfield select option { background: #fff; color: #1a1a1a; }
    .bfield textarea { min-height: 80px; }
    .bsub-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      width: 100%;
      background: #1a1a1a;
      color: #fbfbfa;
      font-size: 0.62rem;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      font-weight: 600;
      padding: 18px 32px;
      border: none;
      cursor: pointer;
      transition: background 0.28s, color 0.28s;
      margin-top: 6px;
    }
    .bsub-btn:hover { background: #b8860b; }
    .b-info-item {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      padding: 20px 0;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .b-info-item:last-child { border-bottom: none; }
    .b-info-icon {
      width: 34px;
      height: 34px;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: #b8860b;
      margin-top: 2px;
    }
    .b-info-label {
      font-size: 0.56rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      font-weight: 600;
      color: rgba(255,255,255,0.45);
      margin-bottom: 5px;
    }
    .b-info-value {
      font-size: 0.85rem;
      color: rgba(255,255,255,0.88);
      font-weight: 300;
      line-height: 1.55;
    }
    .gold-bar-b { width: 40px; height: 1.5px; background: #b8860b; }
    .b-design-preview {
      position: relative;
      overflow: hidden;
      border: 1px solid rgba(255,255,255,0.12);
      margin-bottom: 20px;
    }
    .b-design-preview img {
      width: 100%;
      object-fit: cover;
      display: block;
      filter: grayscale(0.3);
      transition: transform 0.7s ease;
      aspect-ratio: 3/4;
    }
    .b-design-preview:hover img { transform: scale(1.04); }
    .b-success {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 18px;
      padding: 48px 0;
    }
    .booking-main-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      min-height: 700px;
    }
    @media (max-width: 900px) {
      .booking-main-grid { grid-template-columns: 1fr !important; }
    }
  `;

  const atelierInfo = [
    { icon: <Scissors size={14} />, label: 'Atelier Service', value: 'Bespoke Tailoring & Fittings' },
    { icon: <Clock size={14} />, label: 'Working Hours', value: <span>Mon – Sat&nbsp;|&nbsp;10:00 AM – 07:00 PM<br />Sunday: Closed</span> },
    { icon: <Calendar size={14} />, label: 'Booking Window', value: 'Up to 3 months in advance' },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="bpage">
      <style>{css}</style>
      <div className="bwm" />
      <Navbar />

      <div className="bbody" style={{ paddingTop: '128px', paddingBottom: '0' }}>

        {/* ── Hero headline ── */}
        <div style={{ padding: '0 clamp(20px,5vw,80px) 56px', maxWidth: '1380px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <p style={{ fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, color: '#b8860b', marginBottom: '16px' }}>
              Appointments &amp; Consultations
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '20px' }}>
              <h1 style={{ ...serif, fontSize: 'clamp(2.8rem, 7vw, 6.5rem)', fontWeight: 300, lineHeight: 0.94, letterSpacing: '-0.02em', color: '#1a1a1a', margin: 0 }}>
                Request a<br /><em style={{ fontStyle: 'italic' }}>Consultation.</em>
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '8px' }}>
                <div className="gold-bar-b" />
                <p style={{ fontSize: '0.78rem', color: '#888', fontWeight: 300, maxWidth: '280px', lineHeight: 1.65, margin: 0 }}>
                  Reserve your fitting session with our master artisans at the VN Fashion Atelier.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Main grid ── */}
        <div className="booking-main-grid">

          {/* Left — Dark Info Panel */}
          <motion.div
            className="b-left-panel"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {formData.designImage && formData.designTitle ? (
              <div className="b-design-preview">
                <img
                  src={getImageUrl(formData.designImage)}
                  alt={formData.designTitle}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }} />
                <div style={{ position: 'absolute', bottom: '14px', left: '14px' }}>
                  <span style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, color: '#b8860b' }}>
                    {formData.designCategory}
                  </span>
                </div>
              </div>
            ) : (
              <div style={{ marginBottom: '40px' }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Scissors size={20} color="#b8860b" strokeWidth={1.5} />
                </div>
                <p style={{ ...serif, fontSize: '1.5rem', fontWeight: 300, color: 'rgba(255,255,255,0.9)', lineHeight: 1.3, marginBottom: '8px' }}>
                  "Crafted for those who<br />dare to be distinct."
                </p>
              </div>
            )}

            {(formData.designTitle || formData.serviceTitle) && (
              <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <p style={{ fontSize: '0.56rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', fontWeight: 600, marginBottom: '12px' }}>
                  Selected Items
                </p>
                {formData.designTitle && (
                  <div style={{ marginBottom: formData.serviceTitle ? '16px' : '0' }}>
                    <span style={{ fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '2px' }}>Design</span>
                    <p style={{ ...serif, fontSize: '1.2rem', fontWeight: 300, color: 'rgba(255,255,255,0.9)', marginBottom: '4px' }}>
                      {formData.designTitle}
                    </p>
                    {formData.designPrice && (
                      <p style={{ fontSize: '0.75rem', color: '#b8860b', fontWeight: 500, letterSpacing: '0.1em' }}>
                        {formatPrice(formData.designPrice)}
                      </p>
                    )}
                  </div>
                )}
                {formData.serviceTitle && (
                  <div>
                    <span style={{ fontSize: '0.55rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: '2px' }}>Service</span>
                    <p style={{ ...serif, fontSize: '1.2rem', fontWeight: 300, color: 'rgba(255,255,255,0.9)', marginBottom: '4px' }}>
                      {formData.serviceTitle}
                    </p>
                    {formData.servicePrice && (
                      <p style={{ fontSize: '0.75rem', color: '#b8860b', fontWeight: 500, letterSpacing: '0.1em' }}>
                        {formatPrice(formData.servicePrice)}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}

            <div>
              {atelierInfo.map((item, i) => (
                <div key={i} className="b-info-item">
                  <div className="b-info-icon">{item.icon}</div>
                  <div>
                    <p className="b-info-label">{item.label}</p>
                    <p className="b-info-value">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Booking Form */}
          <motion.div
            style={{ background: '#fbfbfa', padding: 'clamp(40px,6vw,72px) clamp(24px,5vw,56px)' }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 0.61, 0.36, 1], delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  className="b-success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div style={{ width: '52px', height: '52px', borderRadius: '50%', border: '1.5px solid #b8860b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle size={22} color="#b8860b" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p style={{ fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, color: '#b8860b', marginBottom: '10px' }}>
                      Booking Confirmed
                    </p>
                    <h3 style={{ ...serif, fontSize: '2.5rem', fontWeight: 300, color: '#1a1a1a', lineHeight: 1.1, marginBottom: '12px' }}>
                      Booking Placed.
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: '#888', lineHeight: 1.75, fontWeight: 300, maxWidth: '340px', marginBottom: '24px' }}>
                      Thank you! We will review your consultation request and contact you shortly at your email or phone number.
                    </p>

                    {bookingDetails && (
                      <div style={{ borderTop: '1px solid #e0dbd3', borderBottom: '1px solid #e0dbd3', padding: '20px 0', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '360px' }}>
                        {[
                          { label: 'Order ID', value: bookingDetails.bookingId },
                          { label: 'Item', value: bookingDetails.serviceName },
                          { label: 'Date', value: bookingDetails.date },
                          { label: 'Time', value: bookingDetails.time },
                        ].map((row) => (
                          <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, color: '#aaa' }}>{row.label}</span>
                            <span style={{ fontSize: '0.8rem', fontWeight: 400, color: '#1a1a1a' }}>{row.value}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <button
                      onClick={handleReset}
                      style={{ fontSize: '0.62rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600, color: '#fbfbfa', background: '#1a1a1a', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 24px' }}
                    >
                      Book Another <ArrowRight size={14} />
                    </button>
                    <button
                      onClick={() => navigate('/')}
                      style={{ fontSize: '0.62rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600, color: '#1a1a1a', background: 'transparent', border: '1px solid #d4cfc8', cursor: 'pointer', padding: '14px 24px' }}
                    >
                      Back Home
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <p style={{ fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, color: '#b8860b', marginBottom: '32px' }}>
                    Appointment Details
                  </p>

                  {/* Service Select */}
                  <div style={{ marginBottom: '28px' }}>
                    <div className={`bfield${focused === 'serviceId' ? ' focused' : ''}`}>
                      <label htmlFor="serviceId">Select Service {!formData.designTitle ? '*' : '(optional)'}</label>
                      <select
                        id="serviceId"
                        name="serviceId"
                        value={formData.serviceId}
                        onChange={(e) => {
                          const selectedService = services.find(s => s._id === e.target.value);
                          setFormData(prev => ({
                            ...prev,
                            serviceId: e.target.value,
                            serviceTitle: selectedService?.title || '',
                            servicePrice: selectedService?.price || '',
                            serviceCategory: selectedService?.category || '',
                          }));
                        }}
                        required={!formData.serviceTitle && !formData.designTitle}
                        onFocus={() => setFocused('serviceId')}
                        onBlur={() => setFocused('')}
                        disabled={loading}
                      >
                        {loading ? (
                          <option value="">Loading services...</option>
                        ) : services.length === 0 ? (
                          <option value="">No services available</option>
                        ) : (
                          <>
                            <option value="">{formData.designTitle ? 'Add a service (optional)...' : 'Choose a service...'}</option>
                            {services.map((service) => (
                              <option key={service._id} value={service._id}>
                                {service.title} {service.price ? `— ${formatPrice(service.price)}` : ''}
                              </option>
                            ))}
                          </>
                        )}
                      </select>
                    </div>
                    {formData.designTitle && !formData.serviceId && (
                      <p style={{ fontSize: '0.58rem', color: '#b8860b', marginTop: '6px', letterSpacing: '0.1em' }}>
                        A design is already selected. You may optionally add a service.
                      </p>
                    )}
                  </div>

                  {/* Date & Time */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
                    <div className={`bfield${focused === 'date' ? ' focused' : ''}`}>
                      <label htmlFor="date">Date *</label>
                      <input
                        id="date"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        min={today}
                        max={maxDateStr}
                        required
                        onFocus={() => setFocused('date')}
                        onBlur={() => setFocused('')}
                      />
                    </div>
                    <div className={`bfield${focused === 'time' ? ' focused' : ''}`}>
                      <label htmlFor="time">Time Slot *</label>
                      <select
                        id="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        onFocus={() => setFocused('time')}
                        onBlur={() => setFocused('')}
                      >
                        <option value="">Choose a time...</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Personal Info */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
                    <div className={`bfield${focused === 'firstName' ? ' focused' : ''}`}>
                      <label htmlFor="firstName">First Name *</label>
                      <input
                        id="firstName"
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        onFocus={() => setFocused('firstName')}
                        onBlur={() => setFocused('')}
                        placeholder="Vidisha"
                      />
                    </div>
                    <div className={`bfield${focused === 'lastName' ? ' focused' : ''}`}>
                      <label htmlFor="lastName">Last Name *</label>
                      <input
                        id="lastName"
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        onFocus={() => setFocused('lastName')}
                        onBlur={() => setFocused('')}
                        placeholder="Natekar"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
                    <div className={`bfield${focused === 'email' ? ' focused' : ''}`}>
                      <label htmlFor="email">Email Address *</label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocused('email')}
                        onBlur={() => setFocused('')}
                        placeholder="hello@gmail.com"
                      />
                    </div>
                    <div className={`bfield${focused === 'phone' ? ' focused' : ''}`}>
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocused('phone')}
                        onBlur={() => setFocused('')}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div className={`bfield${focused === 'notes' ? ' focused' : ''}`} style={{ marginBottom: '36px' }}>
                    <label htmlFor="notes">Additional Notes</label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      value={formData.notes}
                      onChange={handleChange}
                      onFocus={() => setFocused('notes')}
                      onBlur={() => setFocused('')}
                      placeholder="Tell us about your vision, specific requirements, or preferred fabric..."
                    />
                  </div>

                  <button type="submit" className="bsub-btn">
                    Place Appointment Request <ArrowRight size={15} />
                  </button>

                  <p style={{ fontSize: '0.62rem', color: '#aaa', marginTop: '16px', fontWeight: 300, textAlign: 'center', lineHeight: 1.6 }}>
                    We typically respond within 1–2 business days to confirm your slot.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── Bottom strip ── */}
        <motion.div
          style={{
            borderTop: '1px solid #e0dbd3',
            padding: '28px clamp(20px,5vw,80px)',
            display: 'flex', flexWrap: 'wrap', alignItems: 'center',
            justifyContent: 'space-between', gap: '18px',
            background: '#fbfbfa', position: 'relative', zIndex: 1,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div className="gold-bar-b" />
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, color: '#888' }}>
              VN Fashion — Mumbai Atelier
            </span>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Instagram', 'Pinterest', 'Behance'].map((s) => (
              <a key={s} href="#"
                style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontWeight: 600, color: '#888', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#b8860b'}
                onMouseLeave={e => e.target.style.color = '#888'}
              >
                {s}
              </a>
            ))}
          </div>
        </motion.div>

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

