import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Filter, ChevronLeft, ChevronRight, Calendar, Info, Star } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { contentApi, getImageUrl } from "../utils/api";

const Gallery = () => {
  const location = useLocation();
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
  const itemRefs = useRef({});
  const currentDragPos = useRef({ x: 0, y: 0 });
  
  // State declarations - must be before useEffect hooks that use them
  const [lightboxImage, setLightboxImage] = useState(null);
  const [showGalleryDetails, setShowGalleryDetails] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [allWorks, setAllWorks] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);

  // Save button position to localStorage
  useEffect(() => {
    localStorage.setItem('galleryButtonPosition', JSON.stringify(buttonPosition));
  }, [buttonPosition]);

  // Reset details panel when gallery modal closes
  useEffect(() => {
    if (!lightboxImage) {
      setShowGalleryDetails(true);
    }
  }, [lightboxImage]);

  // Fetch gallery data from API
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const galleryData = await contentApi.getGallery();
        
        // Transform API data to match component structure
        const transformedWorks = galleryData.map((item, index) => ({
          id: item._id || index + 1,
          title: item.title || "Untitled",
          image: getImageUrl(item.image) || "/VN-1.jpg",
          category: item.category || "Uncategorized",
          description: item.description || "",
          materials: item.materials || "",
          price: item.price || "Contact for pricing",
          featured: item.featured || false,
        }));
        
        // Sort: featured items first, then others
        // Ensure only one featured item (take first if multiple)
        const featuredItems = transformedWorks.filter(w => w.featured);
        const nonFeaturedItems = transformedWorks.filter(w => !w.featured);
        
        // If multiple featured, only keep the first one
        const singleFeatured = featuredItems.length > 0 ? [featuredItems[0]] : [];
        const otherFeatured = featuredItems.slice(1).map(item => ({ ...item, featured: false }));
        
        const sortedWorks = [...singleFeatured, ...otherFeatured, ...nonFeaturedItems];
        
        setAllWorks(sortedWorks);
        
        // Extract unique categories
        const uniqueCategories = ["All", ...new Set(transformedWorks.map(work => work.category).filter(Boolean))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching gallery:', error);
        // Fallback to default data if API fails
        const defaultWorks = [
          { 
            id: 1, 
            title: "Bridal Lehenga", 
            image: "/VN-1.jpg", 
            category: "Bridal",
            description: "Exquisite bridal lehenga with intricate Aari embroidery, featuring traditional motifs enhanced with beads, mirrors, and zari threads.",
            materials: "Silk fabric, Zari threads, Beads, Mirrors",
            price: "Starting from ₹50,000"
          },
          { 
            id: 2, 
            title: "Designer Blouse", 
            image: "/VN-2.jpg", 
            category: "Blouses",
            description: "Custom-designed blouse with hand-painted motifs and premium fabric selection.",
            materials: "Premium cotton, Fabric paint, Embroidery threads",
            price: "Starting from ₹8,000"
          },
        ];
        setAllWorks(defaultWorks);
        setCategories(["All", "Bridal", "Blouses"]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Memoize filtered works for performance (maintain featured first order)
  const filteredWorks = useMemo(() => {
    const filtered = selectedCategory === "All" 
      ? allWorks 
      : allWorks.filter(work => work.category === selectedCategory);
    
    // Ensure featured items stay first even after filtering
    return filtered.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [allWorks, selectedCategory]);

  // Pagination - memoized
  const totalPages = useMemo(() => Math.ceil(filteredWorks.length / itemsPerPage), [filteredWorks.length, itemsPerPage]);
  const paginatedWorks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredWorks.slice(startIndex, endIndex);
  }, [filteredWorks, currentPage, itemsPerPage]);

  // Define callbacks before using them in useEffect
  const openLightbox = useCallback((work) => {
    setLightboxImage(work);
    setShowGalleryDetails(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxImage(null);
  }, []);

  const navigateLightbox = useCallback((direction) => {
    if (!lightboxImage) return;
    const currentIndex = filteredWorks.findIndex(w => w.id === lightboxImage.id);
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % filteredWorks.length;
    } else {
      newIndex = (currentIndex - 1 + filteredWorks.length) % filteredWorks.length;
    }
    // Preload image for smoother transition
    const nextWork = filteredWorks[newIndex];
    if (nextWork?.image) {
      const img = new Image();
      img.src = nextWork.image;
      // Update immediately - browser will handle caching
      setLightboxImage(nextWork);
    }
  }, [lightboxImage, filteredWorks]);

  // Handle navigation from home page - scroll to specific item (optimized)
  useEffect(() => {
    if (location.state?.scrollToItem && !loading && allWorks.length > 0) {
      const itemId = location.state.scrollToItem;
      const item = allWorks.find(w => w.id === itemId);
      
      if (item) {
        // Find which page the item is on
        const itemIndex = filteredWorks.findIndex(w => w.id === itemId);
        if (itemIndex !== -1) {
          const targetPage = Math.floor(itemIndex / itemsPerPage) + 1;
          setCurrentPage(targetPage);
          
          // Use double requestAnimationFrame for smoother transition after page render
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              const element = itemRefs.current[itemId];
              if (element) {
                // Scroll instantly first, then open lightbox
                element.scrollIntoView({ behavior: 'auto', block: 'center' });
                // Open lightbox immediately for instant feedback
                openLightbox(item);
              } else {
                // Fallback: open lightbox even if element not found
                openLightbox(item);
              }
            });
          });
        }
      }
      
      // Clear the state to prevent re-triggering
      window.history.replaceState({}, document.title);
    }
  }, [location.state, loading, allWorks, filteredWorks, itemsPerPage, openLightbox]);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when category changes
  }, [selectedCategory]);

  // Keyboard navigation for lightbox - optimized with useCallback
  useEffect(() => {
    if (!lightboxImage) return;

    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateLightbox('prev');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateLightbox('next');
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [lightboxImage, navigateLightbox, closeLightbox]);

  // Handle drag for category button - optimized for smooth animation
  useEffect(() => {
    if (!isDragging) return;

    let animationFrameId = null;
    let rafScheduled = false;

    const handleMove = (clientX, clientY) => {
      const newX = clientX - dragStartPos.current.x;
      const newY = clientY - dragStartPos.current.y;
      
      const maxX = window.innerWidth - 56;
      const maxY = window.innerHeight - 56;
      
      currentDragPos.current.x = Math.max(0, Math.min(newX, maxX));
      currentDragPos.current.y = Math.max(0, Math.min(newY, maxY));
      
      // Use requestAnimationFrame for smooth updates (only schedule once per frame)
      if (!rafScheduled) {
        rafScheduled = true;
        animationFrameId = requestAnimationFrame(() => {
          setButtonPosition({ 
            x: currentDragPos.current.x, 
            y: currentDragPos.current.y 
          });
          rafScheduled = false;
        });
      }
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
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      rafScheduled = false;
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: false });
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleEnd);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
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
      currentDragPos.current = { ...buttonPosition };
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
          <div 
            className="lg:hidden fixed z-50"
            style={{ 
              left: `${buttonPosition.x}px`, 
              top: `${buttonPosition.y}px`,
              willChange: isDragging ? 'transform' : 'auto',
              transform: 'translateZ(0)',
              transition: isDragging ? 'none' : 'left 0.2s ease-out, top 0.2s ease-out'
            }}
          >
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
              style={{ 
                cursor: isDragging ? 'grabbing' : 'grab',
                willChange: isDragging ? 'transform' : 'auto',
                touchAction: 'none'
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
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

          {/* Loading State */}
          {loading && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Loading gallery...</p>
            </div>
          )}

          {/* Gallery Grid with Fashionable Hover Effects */}
          {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {paginatedWorks.map((work, idx) => (
              <motion.div
                key={work.id}
                ref={(el) => {
                  if (el) itemRefs.current[work.id] = el;
                }}
                className="group relative overflow-hidden rounded-xl sm:rounded-2xl shadow-lg bg-white cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: Math.min(idx * 0.03, 0.3) }}
                onMouseEnter={() => setHoveredIndex(work.id)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => openLightbox(work)}
              >
                {/* Image Container */}
                <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = "/VN-1.jpg";
                    }}
                  />
                  
                  {/* Golden Featured Badge */}
                  {work.featured && (
                    <div className="absolute top-4 left-4 z-10">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full blur-sm opacity-75 animate-pulse"></div>
                        <div className="relative bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg border-2 border-yellow-300">
                          <Star className="w-4 h-4 fill-white" />
                          <span className="text-xs font-bold uppercase tracking-wide">Featured</span>
                        </div>
                      </div>
                    </div>
                  )}
                  
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
                      className="text-lg sm:text-xl md:text-2xl font-bold mb-2"
                      initial={{ x: -20 }}
                      animate={{ x: hoveredIndex === work.id ? 0 : -20 }}
                      transition={{ delay: 0.1 }}
                    >
                      {work.title}
                    </motion.h3>
                    <motion.p
                      className="text-xs sm:text-sm opacity-90 mb-3"
                      initial={{ x: -20 }}
                      animate={{ x: hoveredIndex === work.id ? 0 : -20 }}
                      transition={{ delay: 0.15 }}
                    >
                      {work.category}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: hoveredIndex === work.id ? 1 : 0, y: hoveredIndex === work.id ? 0 : 10 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Link
                        to="/booking"
                        state={{ 
                          designId: work.id,
                          designTitle: work.title,
                          designCategory: work.category,
                          designPrice: work.price,
                          designImage: work.image
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-xs sm:text-sm transition-colors"
                      >
                        <Calendar size={14} className="sm:w-4 sm:h-4" />
                        Book Now
                      </Link>
                    </motion.div>
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
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <motion.div
              className="flex justify-center items-center gap-4 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
              <span className="text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg bg-white border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
              >
                Next
              </button>
            </motion.div>
          )}

          {/* Gallery Lightbox Modal - Same Design as Certificate Modal */}
          <AnimatePresence mode="wait">
            {lightboxImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
                onClick={closeLightbox}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full h-full max-w-7xl max-h-[95vh] sm:max-h-[90vh] flex flex-col md:flex-row rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
                  style={{ willChange: 'opacity' }}
                >
                  {/* Gallery Image - Full Width */}
                  <div className="relative flex-1 bg-gray-900 flex items-center justify-center overflow-hidden min-h-[40vh] md:min-h-0">
                    <AnimatePresence mode="wait">
                      {lightboxImage.image ? (
                        <motion.img
                          key={lightboxImage.id}
                          src={lightboxImage.image}
                          alt={lightboxImage.title}
                          className="w-full h-full object-contain"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ 
                            duration: 0.2,
                            ease: "easeInOut"
                          }}
                          style={{ willChange: 'opacity' }}
                          loading="eager"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/VN-1.jpg";
                          }}
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center p-8 text-white/50">
                          <Filter size={64} className="mb-4 opacity-50" />
                          <p className="text-lg">No image available</p>
                        </div>
                      )}
                    </AnimatePresence>
                    
                    {/* Title Overlay - Top (Clean Design) */}
                    <div className="absolute top-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-b from-black/80 via-black/50 to-transparent">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-white/10 backdrop-blur-sm rounded-lg">
                          <Filter className="text-white" size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1 flex-wrap">
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white drop-shadow-lg">
                              {lightboxImage.title}
                            </h2>
                            {lightboxImage.featured && (
                              <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 rounded-full blur-sm opacity-75 animate-pulse"></div>
                                <div className="relative bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg border-2 border-yellow-300">
                                  <Star className="w-3.5 h-3.5 fill-white" />
                                  <span className="text-[10px] font-bold uppercase tracking-wide">Featured</span>
                                </div>
                              </div>
                            )}
                          </div>
                          {lightboxImage.category && (
                            <p className="text-white/80 text-sm md:text-base font-medium">
                              {lightboxImage.category}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Navigation Buttons - Only show if multiple images */}
                    {filteredWorks.length > 1 && (
                      <>
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateLightbox('prev');
                          }}
                          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/30"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                          <ChevronLeft size={20} className="text-white" />
                        </motion.button>
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigateLightbox('next');
                          }}
                          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/30"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                          <ChevronRight size={20} className="text-white" />
                        </motion.button>
                        {/* Image Counter */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full">
                          <span className="text-white text-xs sm:text-sm font-medium">
                            {filteredWorks.findIndex(w => w.id === lightboxImage.id) + 1} / {filteredWorks.length}
                          </span>
                        </div>
                      </>
                    )}

                    {/* Close Button - Top Right */}
                    <button
                      onClick={closeLightbox}
                      className="absolute top-4 right-4 w-10 h-10 md:w-12 md:h-12 bg-gray-900/80 hover:bg-gray-800/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl transition-all duration-300 z-50 border border-gray-700/50 hover:scale-110 active:scale-95 hover:border-red-500/50"
                      aria-label="Close modal"
                    >
                      <X size={20} md:size={22} className="text-white" />
                    </button>

                    {/* Single Toggle Details Button - Always visible, positioned at top edge of details when open */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowGalleryDetails(!showGalleryDetails);
                      }}
                      className={`fixed left-1/2 -translate-x-1/2 w-12 h-12 bg-gray-900/95 hover:bg-gray-800/95 backdrop-blur-md rounded-full flex items-center justify-center shadow-xl border-2 border-gray-700/70 transition-all duration-300 z-[70] lg:hidden ${
                        showGalleryDetails 
                          ? 'bottom-[calc(60vh-1.5rem)] sm:bottom-[calc(65vh-1.5rem)]' 
                          : 'bottom-4'
                      }`}
                      aria-label={showGalleryDetails ? "Hide details" : "Show details"}
                    >
                      {showGalleryDetails ? (
                        <ChevronLeft size={20} className="text-white rotate-90" />
                      ) : (
                        <ChevronRight size={20} className="text-white -rotate-90" />
                      )}
                    </button>
                  </div>

                  {/* Details Panel - Mobile: Bottom Sheet, Desktop: Right Side with Glassmorphism */}
                  <AnimatePresence>
                    {showGalleryDetails && (
                      <motion.div
                        initial={{ 
                          y: '100%',
                          x: '100%',
                          opacity: 0 
                        }}
                        animate={{ 
                          y: 0,
                          x: 0,
                          opacity: 1 
                        }}
                        exit={{ 
                          y: '100%',
                          x: '100%',
                          opacity: 0 
                        }}
                        transition={{ 
                          type: "tween",
                          ease: [0.4, 0, 0.2, 1],
                          duration: 0.25,
                          opacity: { duration: 0.15 }
                        }}
                        className="absolute md:relative md:right-0 md:top-0 md:bottom-0 bottom-0 left-0 right-0 w-full md:w-96 lg:w-[420px] h-[60vh] sm:h-[65vh] md:h-full bg-gray-900/95 backdrop-blur-xl border-t md:border-t-0 md:border-l border-gray-700/50 shadow-2xl overflow-visible rounded-t-3xl md:rounded-t-none z-50"
                        style={{
                          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.98) 0%, rgba(17, 24, 39, 0.95) 100%)',
                          backdropFilter: 'blur(16px) saturate(180%)',
                          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
                          transform: 'translateZ(0)',
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {/* Mobile Drag Handle */}
                        <div className="md:hidden flex justify-center pt-3 pb-2">
                          <div className="w-12 h-1.5 bg-gray-600 rounded-full"></div>
                        </div>

                        {/* Content Container */}
                        <div className="relative h-full overflow-y-auto modal-scrollbar-hide p-5 sm:p-6 md:p-6 lg:p-8 pb-8">
                          {/* Header */}
                          <div className="mb-6 pb-4 border-b border-gray-700/50">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-blue-600/20 rounded-lg">
                                <Info className="text-blue-400" size={22} />
                              </div>
                              <h3 className="text-xl md:text-2xl font-bold text-white">Details</h3>
                            </div>
                          </div>

                          {/* Description */}
                          {lightboxImage.description && (
                            <div className="mb-6">
                              <h4 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">Description</h4>
                              <p className="text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                                {lightboxImage.description}
                              </p>
                            </div>
                          )}

                          {/* Details Cards */}
                          <div className="space-y-4 mb-6">
                            {/* Materials */}
                            {lightboxImage.materials && (
                              <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05, duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 shadow-lg"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="p-2 bg-purple-600/20 rounded-lg flex-shrink-0">
                                    <Filter className="text-purple-400" size={18} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Materials Used</h4>
                                    <p className="text-white text-sm md:text-base font-medium break-words">{lightboxImage.materials}</p>
                                  </div>
                                </div>
                              </motion.div>
                            )}

                            {/* Price */}
                            {lightboxImage.price && (
                              <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50 shadow-lg"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="p-2 bg-green-600/20 rounded-lg flex-shrink-0">
                                    <Calendar className="text-green-400" size={18} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Price</h4>
                                    <p className="text-white text-sm md:text-base font-semibold break-words">{lightboxImage.price}</p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </div>

                          {/* Book Now Button */}
                          <div className="mt-8 pt-4 border-t border-gray-700/50">
                            <Link
                              to="/booking"
                              state={{ 
                                designId: lightboxImage.id,
                                designTitle: lightboxImage.title,
                                designCategory: lightboxImage.category,
                                designPrice: lightboxImage.price,
                                designImage: lightboxImage.image
                              }}
                              className="w-full block"
                            >
                              <motion.button
                                className="w-full py-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 text-base md:text-lg transition-all duration-300"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Calendar size={20} />
                                Book This Design
                              </motion.button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {!loading && filteredWorks.length === 0 && (
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
      
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .modal-scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .modal-scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        /* GPU acceleration for smooth animations */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        [data-framer-component] {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default Gallery;

