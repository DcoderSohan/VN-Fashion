import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  Facebook,
  Instagram,
  Twitter,
  X,
  CheckCircle,
  AlertCircle,
  Linkedin,
  Github,
  Globe,
  Youtube,
  MessageCircle,
  Share2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { contentApi } from "../utils/api";
import ErrorModal from "../Components/Modal/ErrorModal";

// Icon mapping for dynamic icon rendering
const iconMap = {
  Instagram: Instagram,
  Facebook: Facebook,
  Twitter: Twitter,
  Youtube: Youtube,
  WhatsApp: MessageCircle,
  LinkedIn: Linkedin,
  GitHub: Github,
  Globe: Globe,
  Mail: Mail,
  Phone: Phone,
  MapPin: MapPin,
  Share2: Share2,
};

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    contactNumber: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [socialLinks, setSocialLinks] = useState([]);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await contentApi.getSettings();
        if (response.data) {
          const links = response.data.socialLinks || [];
          // Sort by order
          const sortedLinks = links.sort((a, b) => (a.order || 0) - (b.order || 0));
          setSocialLinks(sortedLinks);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Validate email in real-time
    if (name === "email") {
      if (value && !value.includes("@gmail.com")) {
        setEmailError("Please enter a valid Gmail address (@gmail.com)");
      } else {
        setEmailError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email before submission
    if (!formData.email.includes("@gmail.com")) {
      setEmailError("Please enter a valid Gmail address (@gmail.com)");
      return;
    }
    
    setEmailError("");
    
    try {
      // Prepare contact data for API
      const contactData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        contactNumber: formData.contactNumber || formData.phone,
        message: formData.message,
      };

      // Submit to API
      await contentApi.createContact(contactData);
      
      // Show success modal
      setShowSuccessModal(true);
      
      // Reset form data
      setFormData({ 
        firstName: "", 
        lastName: "", 
        email: "", 
        phone: "", 
        contactNumber: "",
        message: "" 
      });
      
      console.log('Contact message submitted successfully');
    } catch (error) {
      console.error('Error submitting contact message:', error);
      setErrorMessage('Failed to send message. Please try again.');
      setShowErrorModal(true);
    }
  };

  const faqs = [
    {
      question: "How long does it take to complete a custom design?",
      answer:
        "The timeline varies depending on the complexity of the design. Typically, custom blouses take 2-3 weeks, while bridal wear can take 4-6 weeks. We'll provide an exact timeline during your consultation.",
    },
    {
      question: "Do you offer alterations?",
      answer:
        "Yes, we offer professional alteration services for all types of garments. We can adjust sizing, hemming, and make other modifications to ensure the perfect fit.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "We understand plans can change. Please contact us at least 48 hours before your appointment to cancel or reschedule. For bookings, cancellation policies vary by service type.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Currently, we primarily serve customers in India. However, we can discuss international shipping options for special orders. Please contact us for more details.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept cash, bank transfers, UPI, and major credit/debit cards. For bookings, a deposit may be required to secure your appointment.",
    },
    {
      question: "Can I see samples of your work before booking?",
      answer:
        "Absolutely! Visit our Gallery page to see our portfolio, or schedule a consultation to view samples in person at our studio.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navbar />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Let's <span className="text-blue-600">Connect</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Have questions or want to discuss your design ideas? We'd love to
              hear from you!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {/* Contact Form */}
            <motion.div
              className="lg:col-span-2 bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Your First Name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Your Last Name"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition-all ${
                        emailError 
                          ? "border-red-500 focus:ring-red-500" 
                          : "border-gray-300 focus:ring-blue-500"
                      }`}
                      placeholder="your.email@gmail.com"
                    />
                    {emailError && (
                      <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-2 text-sm text-red-600 flex items-center gap-2"
                      >
                        <AlertCircle size={16} />
                        {emailError}
                      </motion.p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="+91 1234567890"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="contactNumber"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Contact Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    placeholder="Alternative contact number"
                  />
                  <p className="mt-1 text-xs text-gray-500">Additional contact number for admin to reach you</p>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                    placeholder="Tell us about your design ideas, questions, or requirements..."
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={!!emailError}
                  className="w-full py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-sm sm:text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: emailError ? 1 : 1.02 }}
                  whileTap={{ scale: emailError ? 1 : 0.98 }}
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Send Message</span>
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                Contact Information
              </h2>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone
                      className="text-blue-600 sm:w-5 sm:h-5"
                      size={18}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                      Phone
                    </h3>
                    <a
                      href="tel:+917798370430"
                      className="text-gray-600 hover:text-blue-600 transition-colors text-sm sm:text-base break-all"
                    >
                      +91 7798370430
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail
                      className="text-blue-600 sm:w-5 sm:h-5"
                      size={18}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                      Email
                    </h3>
                    <a
                      href="mailto:info@vnfashion.com"
                      className="text-gray-600 hover:text-blue-600 transition-colors text-sm sm:text-base break-all"
                    >
                      info@vnfashion.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin
                      className="text-blue-600 sm:w-5 sm:h-5"
                      size={18}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">
                      Location
                    </h3>
                    <p className="text-gray-600 text-sm sm:text-base">
                      Visit our studio for consultations and fittings
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              {socialLinks.length > 0 && (
                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t">
                  <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">
                    Follow Us
                  </h3>
                  <div className="flex gap-3 sm:gap-4 flex-wrap">
                    {socialLinks.map((link) => {
                      const IconComponent = iconMap[link.icon] || Globe;
                      return (
                        <motion.a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center hover:shadow-lg transition-all"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          aria-label={link.name}
                        >
                          <IconComponent size={18} className="sm:w-5 sm:h-5 text-white" />
                        </motion.a>
                      );
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Google Map */}
          <motion.div
            className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="h-64 sm:h-80 md:h-96 w-full relative">
              <iframe
                src={`https://www.google.com/maps?q=16.990480,73.318521&hl=en&z=15&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl sm:rounded-2xl"
                title="VN Fashion Location"
              />
              <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 sm:p-4 z-10">
                <div className="flex items-center gap-2 sm:gap-3">
                  <MapPin className="text-blue-600 sm:w-5 sm:h-5" size={18} />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-xs sm:text-sm">
                      Our Location
                    </h3>
                    <p className="text-gray-600 text-xs">
                      Visit our studio
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            className="bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 md:p-8 lg:p-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Find answers to common questions about our services
              </p>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <motion.div
                    key={index}
                    className={`group relative rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? "bg-white shadow-lg border-2 border-blue-200"
                        : "bg-white/80 hover:bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md"
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    {/* Decorative gradient bar when open */}
                    {isOpen && (
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                        className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                      />
                    )}

                    {/* Question Header - Clickable */}
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className={`w-full p-4 sm:p-5 md:p-6 flex items-center justify-between gap-3 sm:gap-4 text-left transition-all duration-300 relative ${
                        isOpen
                          ? "bg-gradient-to-r from-blue-50/50 to-purple-50/50"
                          : "hover:bg-gradient-to-r hover:from-blue-50/30 hover:to-purple-50/30"
                      } focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-xl sm:rounded-2xl`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
                        <motion.div
                          animate={{
                            scale: isOpen ? 1.1 : 1,
                            rotate: isOpen ? [0, -10, 10, 0] : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                            isOpen
                              ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg"
                              : "bg-blue-100 text-blue-600 group-hover:bg-blue-200"
                          }`}
                        >
                          <MessageSquare
                            className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300 ${
                              isOpen ? "text-white" : "text-blue-600"
                            }`}
                          />
                        </motion.div>
                        <h3
                          className={`font-semibold text-sm sm:text-base md:text-lg flex-1 transition-colors duration-300 ${
                            isOpen
                              ? "text-gray-900"
                              : "text-gray-800 group-hover:text-blue-600"
                          }`}
                        >
                          {faq.question}
                        </h3>
                      </div>
                      <motion.div
                        animate={{
                          rotate: isOpen ? 180 : 0,
                          scale: isOpen ? 1.1 : 1,
                        }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                        className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isOpen
                            ? "bg-blue-100 text-blue-600"
                            : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                        }`}
                      >
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
                        ) : (
                          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                        )}
                      </motion.div>
                    </button>

                    {/* Answer Content - Animated */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          id={`faq-answer-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6 pt-2">
                            <motion.div
                              initial={{ x: -20, opacity: 0 }}
                              animate={{ x: 0, opacity: 1 }}
                              transition={{ delay: 0.1, duration: 0.3 }}
                              className="pl-6 sm:pl-8 md:pl-10 border-l-3 border-gradient-to-b from-blue-400 to-purple-400 bg-gradient-to-r from-blue-50/50 to-transparent rounded-r-lg py-3 sm:py-4"
                              style={{
                                borderImage: "linear-gradient(to bottom, #3b82f6, #a855f7) 1",
                                borderLeftWidth: "3px",
                                borderLeftStyle: "solid",
                                borderLeftColor: "#3b82f6",
                              }}
                            >
                              <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed pr-2">
                                {faq.answer}
                              </p>
                            </motion.div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowSuccessModal(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} className="text-gray-500" />
              </button>

              {/* Success Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle size={40} className="text-green-600" />
                </div>
              </div>

              {/* Success Message */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-gray-600 mb-6">
                  Thank you for contacting us. We'll get back to you soon at your Gmail address.
                </p>
                <motion.button
                  onClick={() => setShowSuccessModal(false)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

export default Contact;
