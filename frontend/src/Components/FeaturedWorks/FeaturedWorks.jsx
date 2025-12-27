import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";
import { contentApi, getImageUrl } from "../../utils/api";

const FeaturedWorks = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch gallery items from API
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
          description: item.description || "Exquisite handcrafted design",
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
        
        setGalleryItems(sortedWorks);
      } catch (error) {
        console.error('Error fetching gallery:', error);
        // Fallback to default data if API fails
        setGalleryItems([
          {
            id: 1,
            title: "Bridal Lehenga",
            image: "/VN-1.jpg",
            category: "Bridal Collection",
            description: "Exquisite handcrafted bridal wear",
          },
          {
            id: 2,
            title: "Designer Blouse",
            image: "/VN-2.jpg",
            category: "Designer Collection",
            description: "Elegant and sophisticated designs",
          },
          {
            id: 3,
            title: "Aari Work Saree",
            image: "/aariWork.jpg",
            category: "Traditional Wear",
            description: "Traditional craftsmanship meets modern style",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Get first 3 gallery items (featured first), memoized for performance
  const featuredWorks = useMemo(() => {
    // Already sorted by featured status, just take first 3
    return galleryItems.slice(0, 3);
  }, [galleryItems]);

  // Handle click to navigate to gallery page (optimized for smooth transition)
  const handleItemClick = useCallback((work) => {
    // Navigate immediately without delay for instant response
    navigate('/gallery', { 
      state: { scrollToItem: work.id },
      replace: false
    });
  }, [navigate]);

  // Memoize hover handlers to prevent unnecessary re-renders
  const handleHoverStart = useCallback((index) => {
    setHoveredIndex(index);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Featured <span className="text-blue-600">Works</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our handpicked collection of stunning designs and custom creations
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative overflow-hidden rounded-2xl shadow-lg bg-white animate-pulse">
                <div className="h-64 sm:h-72 md:h-80 bg-gray-200"></div>
                <div className="p-4 sm:p-6">
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {featuredWorks.map((work, index) => (
              <motion.div
                key={work.id}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                onHoverStart={() => handleHoverStart(index)}
                onHoverEnd={handleHoverEnd}
                onClick={() => handleItemClick(work)}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-200 bg-white cursor-pointer active:scale-[0.98]"
                style={{ willChange: 'transform' }}
              >
                <div className="relative h-64 sm:h-72 md:h-80 overflow-hidden">
                  <img
                    src={work.image}
                    alt={work.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    style={{ willChange: 'transform' }}
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-white text-sm font-semibold bg-blue-600 px-3 py-1 rounded-full inline-block">
                      {work.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 text-gray-800">{work.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base line-clamp-2">{work.description}</p>
                </div>
                {hoveredIndex === index && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.1 }}
                    className="absolute inset-0 bg-black/5 flex items-center justify-center pointer-events-none"
                    style={{ willChange: 'opacity' }}
                  >
                    <motion.div
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0.95 }}
                      transition={{ duration: 0.1, ease: "easeOut" }}
                      className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl"
                      style={{ willChange: 'transform' }}
                    >
                      <ArrowRight className="w-8 h-8 text-blue-600" />
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link to="/gallery">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View Full Portfolio
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedWorks;
