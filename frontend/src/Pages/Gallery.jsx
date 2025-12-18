import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Filter } from "lucide-react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

const Gallery = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState(() => {
    const saved = localStorage.getItem('galleryButtonPosition');
    return saved ? JSON.parse(saved) : { x: 20, y: 100 };
  });
  const [isDragging, setIsDragging] = useState(false);
  const buttonRef = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  // Save button position to localStorage
  useEffect(() => {
    localStorage.setItem('galleryButtonPosition', JSON.stringify(buttonPosition));
  }, [buttonPosition]);

  // All work images - this would typically come from an API or database
  const allWorks = [
    { id: 1, title: "Bridal Lehenga", image: "/VN-1.jpg", category: "Bridal" },
    { id: 2, title: "Designer Blouse", image: "/VN-2.jpg", category: "Blouses" },
    { id: 3, title: "Aari Work Saree", image: "/aariWork.jpg", category: "Sarees" },
    { id: 4, title: "Custom Fit Dress", image: "/VN-3.jpg", category: "Dresses" },
    { id: 5, title: "Traditional Outfit", image: "/VN-4.jpg", category: "Traditional" },
    { id: 6, title: "Embroidered Blouse", image: "/VN-5.jpg", category: "Blouses" },
    { id: 7, title: "Elegant Saree", image: "/VN-1.jpg", category: "Sarees" },
    { id: 8, title: "Modern Lehenga", image: "/VN-2.jpg", category: "Bridal" },
    { id: 9, title: "Designer Dress", image: "/VN-3.jpg", category: "Dresses" },
  ];

  const categories = ["All", ...new Set(allWorks.map(work => work.category))];

  const filteredWorks = selectedCategory === "All" 
    ? allWorks 
    : allWorks.filter(work => work.category === selectedCategory);

  // Handle drag for category button
  useEffect(() => {
    if (!isDragging) return;

    const handleMove = (clientX, clientY) => {
      const newX = clientX - dragStartPos.current.x;
      const newY = clientY - dragStartPos.current.y;
      
      const maxX = window.innerWidth - 56;
      const maxY = window.innerHeight - 56;
      
      setButtonPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    };

    const handleMouseMove = (e) => {
      e.preventDefault();
      handleMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: false });
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);

  const handleDragStart = (e) => {
    if (isMenuOpen) return; // Don't drag when menu is open
    
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
      const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
      
      dragStartPos.current = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
      setIsDragging(true);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsMenuOpen(false);
  };


  // Calculate positions for circular menu items
  const getCircularPosition = (index, total, radius = 80) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Navbar />
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Our <span className="text-blue-600">Gallery</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our exquisite collection of handcrafted designs and custom creations
            </p>
          </motion.div>

          {/* Category Filter - Desktop Only */}
          <motion.div
            className="hidden lg:flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Draggable Category Button - Mobile/Tablet Only */}
          <div className="lg:hidden fixed z-50" style={{ left: `${buttonPosition.x}px`, top: `${buttonPosition.y}px` }}>
            {/* Draggable Button */}
            <motion.button
              ref={buttonRef}
              onMouseDown={handleDragStart}
              onTouchStart={handleDragStart}
              onClick={(e) => {
                if (!isDragging) {
                  setIsMenuOpen(!isMenuOpen);
                }
              }}
              className="w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center"
              style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter size={24} />
            </motion.button>
          </div>

          {/* Circular Menu - Separate from button, always centered */}
          <AnimatePresence>
            {isMenuOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMenuOpen(false)}
                />

                {/* Circular Menu Container - Always Centered on Viewport */}
                <div
                  className="fixed z-50 lg:hidden"
                  style={{
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    pointerEvents: 'none',
                  }}
                >
                  <motion.div
                    style={{
                      width: '220px',
                      height: '220px',
                      position: 'relative',
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                  {/* Close Button */}
                  <motion.button
                    onClick={() => setIsMenuOpen(false)}
                    className="absolute -top-2 -right-2 w-10 h-10 bg-red-500 text-white rounded-full shadow-lg flex items-center justify-center z-10 pointer-events-auto"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} />
                  </motion.button>

                  {/* Category Buttons in Circle */}
                  {categories.map((category, index) => {
                    const pos = getCircularPosition(index, categories.length, 75);
                    return (
                      <motion.button
                        key={category}
                        onClick={() => handleCategoryClick(category)}
                        className={`absolute w-16 h-16 rounded-full font-semibold text-xs shadow-lg flex items-center justify-center pointer-events-auto ${
                          selectedCategory === category
                            ? "bg-blue-600 text-white scale-110"
                            : "bg-white text-gray-700"
                        }`}
                        style={{
                          left: `calc(50% + ${pos.x}px)`,
                          top: `calc(50% + ${pos.y}px)`,
                          transform: 'translate(-50%, -50%)',
                        }}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {category.length > 8 ? category.substring(0, 7) + '...' : category}
                      </motion.button>
                    );
                  })}
                  </motion.div>
                </div>
              </>
            )}
          </AnimatePresence>

          {/* Gallery Grid with Fashionable Hover Effects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredWorks.map((work, idx) => (
              <motion.div
                key={work.id}
                className="group relative overflow-hidden rounded-2xl shadow-lg bg-white"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                onMouseEnter={() => setHoveredIndex(work.id)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Image Container */}
                <div className="relative h-[400px] sm:h-[450px] lg:h-[500px] overflow-hidden">
                  <motion.img
                    src={work.image}
                    alt={work.title}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  
                  {/* Gradient Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === work.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Content Overlay */}
                  <motion.div
                    className="absolute inset-0 flex flex-col justify-end p-6 text-white"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{
                      y: hoveredIndex === work.id ? 0 : 20,
                      opacity: hoveredIndex === work.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.h3
                      className="text-2xl font-bold mb-2"
                      initial={{ x: -20 }}
                      animate={{ x: hoveredIndex === work.id ? 0 : -20 }}
                      transition={{ delay: 0.1 }}
                    >
                      {work.title}
                    </motion.h3>
                    <motion.p
                      className="text-sm opacity-90"
                      initial={{ x: -20 }}
                      animate={{ x: hoveredIndex === work.id ? 0 : -20 }}
                      transition={{ delay: 0.15 }}
                    >
                      {work.category}
                    </motion.p>
                  </motion.div>

                  {/* Shine Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    initial={{ x: "-100%", skewX: -20 }}
                    animate={{
                      x: hoveredIndex === work.id ? "200%" : "-100%",
                    }}
                    transition={{
                      duration: 0.8,
                      ease: "easeInOut",
                    }}
                  />
                </div>

                {/* Border Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-2xl border-2 border-blue-500/0"
                  animate={{
                    borderColor: hoveredIndex === work.id ? "rgba(37, 99, 235, 0.5)" : "rgba(37, 99, 235, 0)",
                    boxShadow: hoveredIndex === work.id
                      ? "0 0 30px rgba(37, 99, 235, 0.4)"
                      : "0 0 0px rgba(37, 99, 235, 0)",
                  }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredWorks.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-gray-500 text-lg">No works found in this category.</p>
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;

