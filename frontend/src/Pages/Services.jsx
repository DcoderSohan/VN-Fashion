import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { Sparkles, Palette, Scissors, Crown, Shirt } from 'lucide-react';

const services = [
  { 
    id: 1,
    title: 'Designer Blouses', 
    img: '/aariWork.jpg',
    description: 'Custom-designed blouses tailored to perfection with intricate detailing and premium fabrics. Each piece is crafted with attention to detail and personalized to match your style.',
    icon: Shirt,
    features: ['Custom Fitting', 'Premium Fabrics', 'Intricate Detailing', 'Personalized Design'],
    color: 'from-pink-500 to-rose-600'
  },
  { 
    id: 2,
    title: 'Aari Embroidery', 
    img: '/VN-1.jpg',
    description: 'Traditional Aari embroidery work on blouses and dresses, showcasing exquisite craftsmanship. Our skilled artisans create beautiful patterns using age-old techniques.',
    icon: Sparkles,
    features: ['Traditional Techniques', 'Handcrafted', 'Intricate Patterns', 'Premium Quality'],
    color: 'from-purple-500 to-indigo-600'
  },   
  { 
    id: 3,
    title: 'Fabric Painting', 
    img: '/VN-2.jpg',
    description: 'Hand-painted designs on blouses and dresses, creating unique and artistic pieces. Transform your garments into wearable art with our custom painting services.',
    icon: Palette,
    features: ['Hand Painted', 'Unique Designs', 'Artistic Expression', 'Custom Patterns'],
    color: 'from-blue-500 to-cyan-600'
  },      
  { 
    id: 4,
    title: 'Stitching Services', 
    img: '/VN-3.jpg',
    description: 'Professional stitching services for all types of garments with precision and care. From alterations to complete garment construction, we handle it all.',
    icon: Scissors,
    features: ['All Garment Types', 'Precision Work', 'Quick Turnaround', 'Expert Tailoring'],
    color: 'from-green-500 to-emerald-600'
  },  
  { 
    id: 5,
    title: 'Costume Rental', 
    img: '/VN-4.jpg',
    description: 'Premium costume rental service for special occasions and events. Choose from our extensive collection of designer outfits for your special day.',
    icon: Crown,
    features: ['Designer Collection', 'Various Sizes', 'Event Ready', 'Affordable Rates'],
    color: 'from-amber-500 to-orange-600'
  },  
];

const ServicesPage = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

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
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
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
                  onClick={() => setSelectedService(selectedService === service.id ? null : service.id)}
                >
                  <motion.div
                    className="service-card-page bg-white rounded-3xl overflow-hidden shadow-xl cursor-pointer"
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                      <motion.img
                        src={service.img}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>

                    {/* Content Section */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {service.description}
                      </p>

                      {/* Features List */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {service.features.slice(0, 2).map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Read More Button */}
                      <motion.button
                        className={`w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${service.color} shadow-lg`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Learn More
                      </motion.button>
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

          {/* Expanded Service Detail Modal */}
          <AnimatePresence>
            {selectedService !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setSelectedService(null)}
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl modal-scrollbar-hide"
                >
                  {(() => {
                    const service = services.find(s => s.id === selectedService);
                    if (!service) return null;
                    const IconComponent = service.icon;
                    
                    return (
                      <div>
                        <div className="relative h-80 overflow-hidden">
                          <img
                            src={service.img}
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                          <button
                            onClick={() => setSelectedService(null)}
                            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors z-10"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="p-8">
                          <h2 className="text-4xl font-bold mb-4 text-gray-800">{service.title}</h2>
                          <p className="text-gray-600 text-lg leading-relaxed mb-6">{service.description}</p>
                          <div className="grid grid-cols-2 gap-4">
                            {service.features.map((feature, idx) => (
                              <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`}></div>
                                <span className="text-gray-700 font-medium">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Additional Info Section */}
          <motion.div
            className="mt-20 grid md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {[
              { icon: '🎯', title: 'Custom Designs', text: 'Tailored to your preferences and style', color: 'from-blue-500 to-purple-600' },
              { icon: '⭐', title: 'Premium Quality', text: 'Finest materials and expert craftsmanship', color: 'from-pink-500 to-rose-600' },
              { icon: '🚀', title: 'Fast Delivery', text: 'Quick turnaround times without compromising quality', color: 'from-green-500 to-emerald-600' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-2xl p-8 shadow-xl text-center relative overflow-hidden"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${item.color}`}></div>
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-3 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <Footer />

      <style>{`
        .service-card-page {
          transition: all 0.3s ease;
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
      `}</style>
    </div>
  );
};

export default ServicesPage;

