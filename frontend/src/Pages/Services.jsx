import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { Sparkles, Palette, Scissors, Crown, Shirt, Calendar, ArrowRight, X, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import { contentApi } from '../utils/api';
import { getImageUrl } from '../utils/helpers';

// Default icons and colors for services
const serviceIcons = [Shirt, Sparkles, Palette, Scissors, Crown];
const serviceColors = [
  'from-pink-500 to-rose-600',
  'from-purple-500 to-indigo-600',
  'from-blue-500 to-cyan-600',
  'from-green-500 to-emerald-600',
  'from-amber-500 to-orange-600',
];

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showServiceDetails, setShowServiceDetails] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  // Helper function to format price with rupee symbol
  const formatPrice = (price) => {
    if (!price) return '';
    // If price already starts with ₹, return as is
    if (price.trim().startsWith('₹')) {
      return price;
    }
    // Otherwise, add ₹ at the beginning
    return `₹ ${price.trim()}`;
  };

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await contentApi.getServices();
      // Map API data to include icons and colors
      const mappedServices = data.map((service, index) => ({
        ...service,
        id: service._id,
        img: service.image || '',
        icon: serviceIcons[index % serviceIcons.length],
        color: serviceColors[index % serviceColors.length],
        fullDescription: service.description || '',
        process: [],
        benefits: [],
      }));
      setServices(mappedServices);
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  // Reset details panel when service modal closes
  useEffect(() => {
    if (!selectedService) {
      setShowServiceDetails(true);
    }
  }, [selectedService]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

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
              Our <span className="text-blue-600">Services</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our comprehensive range of fashion and design services, each crafted with passion and precision
            </p>
          </motion.div>

          {/* Grid Layout Services */}
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : services.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16"
            >
              {services.map((service, index) => {
                const IconComponent = service.icon;
                const isHovered = hoveredCard === service.id;
              
              return (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  className="group relative"
                  onHoverStart={() => setHoveredCard(service.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  onClick={() => {
                    setSelectedService(selectedService === service.id ? null : service.id);
                    if (selectedService !== service.id) {
                      setShowServiceDetails(true);
                    }
                  }}
                >
                  <motion.div
                    className="service-card-page bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl cursor-pointer flex flex-col h-full"
                    whileHover={{ y: -8, scale: 1.01 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Image Section */}
                    <div className="relative h-48 sm:h-52 overflow-hidden flex-shrink-0">
                      {service.image ? (
                        <motion.img
                          src={getImageUrl(service.image)}
                          alt={service.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                          animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                          transition={{ duration: 0.5 }}
                          onError={(e) => {
                            e.target.src = '/placeholder.jpg';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                          <IconComponent size={40} className="text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Content Section */}
                    <div className="p-4 sm:p-5 flex flex-col flex-grow">
                      <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-2 flex-grow">
                        {service.description}
                      </p>

                      {/* Category and Price Row */}
                      <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                        {service.category && (
                          <span className="inline-block px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold whitespace-nowrap">
                            {service.category}
                          </span>
                        )}
                        {service.price && (
                          <p className="text-sm sm:text-base font-bold text-gray-900 whitespace-nowrap">
                            {formatPrice(service.price)}
                          </p>
                        )}
                      </div>

                      {/* Book Now Button */}
                      <Link 
                        to="/booking" 
                        state={{ 
                          serviceId: service.id,
                          serviceTitle: service.title,
                          serviceDescription: service.description,
                          servicePrice: service.price,
                          serviceCategory: service.category,
                          serviceImage: service.image
                        }} 
                        className="mt-auto"
                        onClick={(e) => {
                          // Stop event propagation to prevent modal from opening
                          e.stopPropagation();
                        }}
                      >
                        <motion.button
                          className={`w-full py-2.5 sm:py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${service.color} shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base`}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={(e) => {
                            // Stop event propagation to prevent modal from opening
                            e.stopPropagation();
                          }}
                        >
                          <Calendar size={16} />
                          Book Now
                          <ArrowRight size={16} />
                        </motion.button>
                      </Link>
                    </div>

                    {/* Hover Border Effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-3xl border-2 border-transparent pointer-events-none`}
                      animate={isHovered ? {
                        borderColor: 'rgba(37, 99, 235, 0.5)',
                        boxShadow: '0 0 40px rgba(37, 99, 235, 0.3)'
                      } : {}}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">No services available at the moment.</p>
            </div>
          )}

          {/* Service Detail Modal - Same Design as Certificate Modal */}
          <AnimatePresence>
            {selectedService !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
                onClick={() => setSelectedService(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full h-full max-w-7xl max-h-[95vh] sm:max-h-[90vh] flex flex-col md:flex-row rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
                >
                  {(() => {
                    const service = services.find(s => s.id === selectedService);
                    if (!service) return null;
                    const IconComponent = service.icon;
                    
                    return (
                      <>
                        {/* Service Image - Full Width */}
                        <div className="relative flex-1 bg-gray-900 flex items-center justify-center overflow-auto min-h-[40vh] md:min-h-0 md:overflow-hidden">
                          {service.image ? (
                            <img
                              src={getImageUrl(service.image)}
                              alt={service.title}
                              className="max-w-full max-h-full w-auto h-auto object-contain p-2 sm:p-4"
                              style={{ 
                                display: 'block',
                                margin: '0 auto'
                              }}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/placeholder.jpg';
                              }}
                            />
                          ) : (
                            <div className="flex flex-col items-center justify-center p-8 text-white/50">
                              <IconComponent size={64} className="mb-4 opacity-50" />
                              <p className="text-lg">No image available</p>
                            </div>
                          )}
                          
                          {/* Title Overlay - Top */}
                          <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 md:p-6 bg-gradient-to-b from-black/70 via-black/40 to-transparent">
                            <div className="flex items-center gap-2 sm:gap-3">
                              <IconComponent className="text-white" size={20} sm:size={22} md:size={24} />
                              <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg line-clamp-2">
                                {service.title}
                              </h2>
                            </div>
                            {service.price && (
                              <p className="text-white/90 text-sm sm:text-base ml-8 sm:ml-10 md:ml-12 mt-1">
                                {formatPrice(service.price)}
                              </p>
                            )}
                          </div>

                          {/* Close Button - Top Right */}
                          <button
                            onClick={() => setSelectedService(null)}
                            className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-50 border border-white/30 hover:scale-110 active:scale-95"
                            aria-label="Close modal"
                          >
                            <X size={16} sm:size={18} md:size={20} className="text-white" />
                          </button>

                          {/* Toggle Details Button - Only Mobile/Tablet (hidden on large devices) */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowServiceDetails(!showServiceDetails);
                            }}
                            className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 active:bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/30 transition-colors duration-150 fixed bottom-4 left-1/2 z-[60] lg:hidden"
                            style={{ 
                              transform: 'translateX(-50%) translateZ(0)',
                            }}
                            aria-label={showServiceDetails ? "Hide details" : "Show details"}
                          >
                            {showServiceDetails ? (
                              <ChevronLeft size={20} className="text-white rotate-90" />
                            ) : (
                              <ChevronRight size={20} className="text-white -rotate-90" />
                            )}
                          </button>
                        </div>

                        {/* Details Panel - Mobile: Bottom Sheet, Desktop: Right Side with Glassmorphism */}
                        <AnimatePresence>
                          {showServiceDetails && (
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
                              className="absolute md:relative md:right-0 md:top-0 md:bottom-0 bottom-0 left-0 right-0 w-full md:w-96 lg:w-[420px] h-[60vh] sm:h-[65vh] md:h-full bg-white/10 backdrop-blur-xl border-t md:border-t-0 md:border-l border-white/20 shadow-2xl overflow-hidden rounded-t-3xl md:rounded-t-none z-50"
                              style={{
                                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.05) 100%)',
                                backdropFilter: 'blur(12px) saturate(120%)',
                                WebkitBackdropFilter: 'blur(12px) saturate(120%)',
                                transform: 'translateZ(0)',
                              }}
                              onClick={(e) => e.stopPropagation()}
                            >
                              {/* Glassmorphism Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent pointer-events-none" />
                              
                              {/* Mobile Drag Handle */}
                              <div className="md:hidden flex justify-center pt-3 pb-2">
                                <div className="w-12 h-1.5 bg-white/30 rounded-full"></div>
                              </div>

                              {/* Content Container */}
                              <div className="relative h-full overflow-y-auto modal-scrollbar-hide p-4 sm:p-5 md:p-6 lg:p-8">
                                {/* Header */}
                                <div className="mb-4 sm:mb-5 md:mb-6 pb-3 sm:pb-4 border-b border-white/20">
                                  <div className="flex items-center gap-2 mb-2">
                                    <Info className="text-white" size={20} sm:size={22} md:size={24} />
                                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-lg">Details</h3>
                                  </div>
                                </div>

                                {/* Description */}
                                {service.description && (
                                  <div className="mb-4 sm:mb-5 md:mb-6">
                                    <h4 className="text-xs sm:text-sm font-semibold text-white/90 mb-2 uppercase tracking-wide">Description</h4>
                                    <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                                      {service.description}
                                    </p>
                                  </div>
                                )}

                                {/* Process */}
                                {service.process && service.process.length > 0 && (
                                  <div className="mb-4 sm:mb-5 md:mb-6">
                                    <h4 className="text-xs sm:text-sm font-semibold text-white/90 mb-2 uppercase tracking-wide">Process</h4>
                                    <div className="space-y-2 sm:space-y-3">
                                      {service.process.map((step, idx) => (
                                        <motion.div
                                          key={idx}
                                          initial={{ opacity: 0, y: 8 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: idx * 0.05, duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                                          className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 shadow-lg"
                                        >
                                          <div className="flex items-start gap-2 sm:gap-3">
                                            <div className={`p-1.5 sm:p-2 bg-white/20 rounded-lg flex-shrink-0 bg-gradient-to-r ${service.color}`}>
                                              <span className="text-white text-xs sm:text-sm font-bold">{idx + 1}</span>
                                            </div>
                                            <p className="text-white text-xs sm:text-sm md:text-base font-medium break-words flex-1">{step}</p>
                                          </div>
                                        </motion.div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Category */}
                                {service.category && (
                                  <div className="mb-4 sm:mb-5 md:mb-6">
                                    <h4 className="text-xs sm:text-sm font-semibold text-white/90 mb-2 uppercase tracking-wide">Category</h4>
                                    <div className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 shadow-lg">
                                      <span className="text-white text-xs sm:text-sm md:text-base font-medium">{service.category}</span>
                                    </div>
                                  </div>
                                )}

                                {/* Benefits */}
                                {service.benefits && service.benefits.length > 0 && (
                                  <div className="mb-4 sm:mb-5 md:mb-6">
                                    <h4 className="text-xs sm:text-sm font-semibold text-white/90 mb-2 uppercase tracking-wide">Why Choose This Service</h4>
                                    <div className="space-y-2 sm:space-y-3">
                                      {service.benefits.map((benefit, idx) => (
                                        <motion.div
                                          key={idx}
                                          initial={{ opacity: 0, y: 8 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{ delay: (service.process?.length || 0) * 0.05 + idx * 0.05, duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                                          className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 shadow-lg"
                                        >
                                          <div className="flex items-start gap-2 sm:gap-3">
                                            <span className="text-green-400 flex-shrink-0 mt-0.5">✓</span>
                                            <p className="text-white text-xs sm:text-sm md:text-base font-medium break-words flex-1">{benefit}</p>
                                          </div>
                                        </motion.div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Book Now Button */}
                                <Link 
                                  to="/booking" 
                                  state={{ 
                                    serviceId: service.id,
                                    serviceTitle: service.title,
                                    serviceDescription: service.description,
                                    servicePrice: service.price,
                                    serviceCategory: service.category,
                                    serviceImage: service.image
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedService(null);
                                  }}
                                >
                                  <motion.button
                                    className={`w-full py-3 sm:py-4 rounded-xl font-semibold text-white bg-gradient-to-r ${service.color} shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg mt-4 sm:mt-6`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <Calendar size={18} className="sm:w-5 sm:h-5" />
                                    Book This Service
                                    <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                                  </motion.button>
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    );
                  })()}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <Footer />

      <style>{`
        .service-card-page {
          transition: all 0.3s ease;
          min-height: 400px;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .modal-scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .modal-scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (min-width: 640px) {
          .service-card-page {
            min-height: 450px;
          }
        }
        @media (min-width: 1024px) {
          .service-card-page {
            min-height: 480px;
          }
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;

