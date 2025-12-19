import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Phone, MessageSquare, ArrowRight } from "lucide-react";

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 sm:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-100" id="contact">
      <motion.div
        className="text-center max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {/* Title Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center text-center gap-2 sm:gap-6 mb-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            Let's
          </h1>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-blue-600">
            Connect
          </h1>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Have questions or want to discuss your design ideas? We'd love to hear from you! Get in touch with us and let's bring your fashion vision to life.
        </p>

        {/* Quick Contact Info */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
            <Phone className="text-blue-600 sm:w-5 sm:h-5 flex-shrink-0" size={18} />
            <a href="tel:+917798370430" className="font-medium text-sm sm:text-base hover:text-blue-600 transition-colors">
              +91 7798370430
            </a>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-gray-700">
            <Mail className="text-blue-600 sm:w-5 sm:h-5 flex-shrink-0" size={18} />
            <a href="mailto:info@vnfashion.com" className="font-medium text-sm sm:text-base hover:text-blue-600 transition-colors break-all">
              info@vnfashion.com
            </a>
          </div>
        </div>

        {/* CTA Button */}
        <Link to="/contact">
          <motion.button
            className="inline-flex items-center gap-2 sm:gap-3 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageSquare size={18} className="sm:w-5 sm:h-5" />
            Get In Touch
            <ArrowRight size={18} className="sm:w-5 sm:h-5" />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Contact;
