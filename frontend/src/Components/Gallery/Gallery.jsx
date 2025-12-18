// Gallery.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Gallery.css";

const Gallery = () => {
  return (
    <div id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Explore Our <span className="text-blue-600">Gallery</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Discover our complete collection of handcrafted designs, custom creations, and exquisite fashion pieces
          </p>
          <Link
            to="/gallery"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            View Full Gallery →
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;
