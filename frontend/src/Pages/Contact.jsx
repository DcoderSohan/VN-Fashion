import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { contentApi } from "../utils/api";
import ErrorModal from "../Components/Modal/ErrorModal";

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
  const [emailError, setEmailError] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
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
    
    if (!formData.email.includes("@gmail.com")) {
      setEmailError("Please enter a valid Gmail address (@gmail.com)");
      return;
    }
    
    setEmailError("");
    
    try {
      const contactData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        contactNumber: formData.contactNumber || formData.phone,
        message: formData.message,
      };

      await contentApi.createContact(contactData);
      setIsSubmitted(true);
      
      setFormData({ 
        firstName: "", 
        lastName: "", 
        email: "", 
        phone: "", 
        contactNumber: "",
        message: "" 
      });
    } catch (error) {
      console.error('Error submitting contact message:', error);
      setErrorMessage('Failed to send message. Please try again.');
      setShowErrorModal(true);
    }
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
            <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-2">GET IN TOUCH</p>
            <h1 className="text-[3rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6rem] font-light leading-[0.95] tracking-tight text-gray-950" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Shape the future
              <br />
              of your style.
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full"
            >
              {isSubmitted ? (
                <div className="border-t border-gray-950 pt-8">
                  <h3 className="text-3xl font-light text-gray-955 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Thank you.
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-light mb-8">
                    Your message has been sent successfully. We will contact you soon.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="border border-gray-950 text-gray-955 text-[9px] tracking-[0.25em] uppercase px-8 py-3.5 hover:bg-gray-950 hover:text-white transition-all font-bold"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 border-t border-gray-300 pt-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="border-b border-gray-400 focus-within:border-gray-950 transition-colors pb-2">
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
                    <div className={`border-b focus-within:border-gray-955 transition-colors pb-2 ${emailError ? 'border-red-500' : 'border-gray-400'}`}>
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

                  {emailError && (
                    <p className="text-[10px] tracking-wider text-red-600 font-bold uppercase">
                      {emailError}
                    </p>
                  )}

                  <div className="border-b border-gray-400 focus-within:border-gray-955 transition-colors pb-2">
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-transparent text-[10px] tracking-[0.2em] uppercase text-gray-955 placeholder-gray-400 outline-none resize-none font-semibold"
                      placeholder="YOUR MESSAGE *"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full border border-gray-955 text-gray-955 text-[9px] tracking-[0.25em] uppercase py-4 bg-transparent hover:bg-gray-950 hover:text-white transition-all font-bold"
                  >
                    SEND MESSAGE
                  </button>
                </form>
              )}
            </motion.div>

            {/* Atelier Info Column */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col border-t border-gray-300 pt-8"
            >
              <h2 className="text-2xl font-light text-gray-955 mb-6 animate-pulse" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                Visit the Atelier
              </h2>
              
              {/* Atelier Editorial Image */}
              <div className="w-full bg-gray-100 overflow-hidden mb-8" style={{ aspectRatio: "16/10" }}>
                <img
                  src="/HeroBg.jpg"
                  alt="VN Fashion Atelier"
                  className="w-full h-full object-cover grayscale transition-transform duration-700 hover:scale-105"
                />
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-1">ADDRESS</p>
                  <p className="text-sm font-light text-gray-955">Mumbai Studio, Maharashtra, India</p>
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-1">EMAIL</p>
                  <a href="mailto:info@vnfashion.com" className="text-sm font-light text-gray-955 hover:underline">info@vnfashion.com</a>
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-1">PHONE</p>
                  <a href="tel:+917798370430" className="text-sm font-light text-gray-955 hover:underline">+91 7798370430</a>
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-1">HOURS</p>
                  <p className="text-sm font-light text-gray-955">Mon - Sat: 10:00 AM - 07:00 PM <br/> Sunday: Closed</p>
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

export default Contact;
