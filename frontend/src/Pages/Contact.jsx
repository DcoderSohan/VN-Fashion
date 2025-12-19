import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to a backend API
    console.log("Contact form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
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
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Your Name"
                    />
                  </div>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
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
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Send size={20} />
                  {isSubmitted ? "Message Sent!" : "Send Message"}
                </motion.button>
                {isSubmitted && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-600 text-center font-medium"
                  >
                    Thank you! We'll get back to you soon.
                  </motion.p>
                )}
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
              <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t">
                <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">
                  Follow Us
                </h3>
                <div className="flex gap-3 sm:gap-4">
                  <a
                    href="#"
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <Facebook size={18} className="sm:w-5 sm:h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <Instagram size={18} className="sm:w-5 sm:h-5" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <Twitter size={18} className="sm:w-5 sm:h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Google Map */}
          <motion.div
            className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="h-64 sm:h-80 md:h-96 bg-gray-200 flex items-center justify-center">
              <div className="text-center px-4">
                <MapPin
                  className="text-gray-400 mx-auto mb-2 sm:w-12 sm:h-12"
                  size={36}
                />
                <p className="text-gray-600 text-sm sm:text-base">
                  Google Map Integration
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  Embed your Google Map here
                </p>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 lg:p-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3 sm:space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-start gap-2 text-sm sm:text-base">
                    <MessageSquare
                      className="text-blue-600 sm:w-5 sm:h-5 mt-0.5 sm:mt-1 flex-shrink-0"
                      size={18}
                    />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 ml-6 sm:ml-7 text-sm sm:text-base">
                    {faq.answer}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
