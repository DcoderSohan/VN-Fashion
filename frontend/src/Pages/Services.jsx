import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { Sparkles, Palette, Scissors, Crown, Shirt, Calendar, ArrowRight } from 'lucide-react';

const services = [
  { 
    id: 1,
    title: 'Designer Blouses', 
    img: '/aariWork.jpg',
    description: 'Custom-designed blouses tailored to perfection with intricate detailing and premium fabrics. Each piece is crafted with attention to detail and personalized to match your style.',
    fullDescription: 'Our designer blouses are meticulously crafted to perfection. We offer custom fitting sessions to ensure the perfect fit, use only premium fabrics, and incorporate intricate detailing that makes each piece unique. The process includes consultation, design selection, measurements, and multiple fitting sessions.',
    icon: Shirt,
    features: ['Custom Fitting', 'Premium Fabrics', 'Intricate Detailing', 'Personalized Design'],
    color: 'from-pink-500 to-rose-600',
    price: 'Starting from ₹8,000',
    process: ['Consultation & Design Selection', 'Fabric Selection', 'Measurements & Fitting', 'Crafting & Detailing', 'Final Fitting & Delivery'],
    benefits: ['Perfect fit guaranteed', 'Premium quality materials', 'Unique personalized designs', 'Expert craftsmanship']
  },
  { 
    id: 2,
    title: 'Aari Embroidery', 
    img: '/VN-1.jpg',
    description: 'Traditional Aari embroidery work on blouses and dresses, showcasing exquisite craftsmanship. Our skilled artisans create beautiful patterns using age-old techniques.',
    fullDescription: 'Experience the beauty of traditional Aari embroidery, a refined handcraft technique using a hooked needle. Our skilled artisans create delicate chain-stitch motifs enhanced with beads, mirrors, metallic zari threads, and intricate embellishments. Each piece is a work of art that preserves traditional craftsmanship.',
    icon: Sparkles,
    features: ['Traditional Techniques', 'Handcrafted', 'Intricate Patterns', 'Premium Quality'],
    color: 'from-purple-500 to-indigo-600',
    price: 'Starting from ₹15,000',
    process: ['Design Consultation', 'Pattern Selection', 'Fabric Preparation', 'Hand Embroidery Work', 'Quality Check & Finishing'],
    benefits: ['Authentic traditional techniques', 'Handcrafted by skilled artisans', 'Unique intricate patterns', 'Premium quality finish']
  },   
  { 
    id: 3,
    title: 'Fabric Painting', 
    img: '/VN-2.jpg',
    description: 'Hand-painted designs on blouses and dresses, creating unique and artistic pieces. Transform your garments into wearable art with our custom painting services.',
    fullDescription: 'Transform your garments into wearable art with our custom fabric painting services. Our artists use high-quality fabric paints to create unique designs that reflect your personality. From subtle patterns to bold artistic expressions, we bring your vision to life on fabric.',
    icon: Palette,
    features: ['Hand Painted', 'Unique Designs', 'Artistic Expression', 'Custom Patterns'],
    color: 'from-blue-500 to-cyan-600',
    price: 'Starting from ₹5,000',
    process: ['Design Consultation', 'Pattern Creation', 'Fabric Preparation', 'Hand Painting', 'Curing & Finishing'],
    benefits: ['One-of-a-kind designs', 'Artistic expression', 'Durable fabric paints', 'Custom patterns']
  },      
  { 
    id: 4,
    title: 'Stitching Services', 
    img: '/VN-3.jpg',
    description: 'Professional stitching services for all types of garments with precision and care. From alterations to complete garment construction, we handle it all.',
    fullDescription: 'Professional stitching services for all types of garments. Whether you need alterations, repairs, or complete garment construction, our expert tailors ensure precision and care in every stitch. We handle everything from simple hemming to complex pattern construction.',
    icon: Scissors,
    features: ['All Garment Types', 'Precision Work', 'Quick Turnaround', 'Expert Tailoring'],
    color: 'from-green-500 to-emerald-600',
    price: 'Starting from ₹2,000',
    process: ['Assessment & Consultation', 'Measurements', 'Pattern Making', 'Stitching', 'Fitting & Adjustments'],
    benefits: ['Expert tailoring', 'Quick turnaround', 'All garment types', 'Precision work']
  },  
  { 
    id: 5,
    title: 'Costume Rental', 
    img: '/VN-4.jpg',
    description: 'Premium costume rental service for special occasions and events. Choose from our extensive collection of designer outfits for your special day.',
    fullDescription: 'Rent premium designer outfits for your special occasions. Our extensive collection includes bridal wear, evening gowns, traditional outfits, and more. All costumes are professionally maintained and available in various sizes. Perfect for events, photoshoots, or special celebrations.',
    icon: Crown,
    features: ['Designer Collection', 'Various Sizes', 'Event Ready', 'Affordable Rates'],
    color: 'from-amber-500 to-orange-600',
    price: 'Starting from ₹3,000',
    process: ['Browse Collection', 'Select Outfit', 'Size Confirmation', 'Rental Agreement', 'Pickup/Delivery'],
    benefits: ['Designer collection', 'Various sizes available', 'Event-ready outfits', 'Affordable rental rates']
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16"
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
                    <div className="relative h-56 sm:h-64 overflow-hidden">
                      <motion.img
                        src={service.img}
                        alt={service.title}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>

                    {/* Content Section */}
                    <div className="p-4 sm:p-6">
                      <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                        {service.description}
                      </p>

                      {/* Features List */}
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                        {service.features.slice(0, 2).map((feature, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 sm:px-3 sm:py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Price */}
                      <div className="mb-3 sm:mb-4">
                        <p className="text-base sm:text-lg font-bold text-gray-900">{service.price}</p>
                      </div>

                      {/* Book Now Button */}
                      <Link to="/booking" state={{ serviceId: service.id }}>
                        <motion.button
                          className={`w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r ${service.color} shadow-lg flex items-center justify-center gap-2`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Calendar size={18} />
                          Book Now
                          <ArrowRight size={18} />
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
                  className="bg-white rounded-xl sm:rounded-2xl md:rounded-3xl max-w-4xl w-full mx-4 max-h-[95vh] sm:max-h-[90vh] overflow-hidden shadow-2xl relative flex flex-col"
                >
                  {(() => {
                    const service = services.find(s => s.id === selectedService);
                    if (!service) return null;
                    const IconComponent = service.icon;
                    
                    return (
                      <>
                        {/* Image Section - Full Width, Prominent Display */}
                        <div className="relative w-full overflow-hidden rounded-t-xl sm:rounded-t-2xl md:rounded-t-3xl bg-gray-100 flex-shrink-0">
                          <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] w-full">
                            <img
                              src={service.img}
                              alt={service.title}
                              loading="lazy"
                              className="w-full h-full object-cover"
                            />
                            {/* Gradient Overlay for better text visibility */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                          </div>
                          {/* Close Button - Overlay on Image */}
                          <button
                            onClick={() => setSelectedService(null)}
                            className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors z-50 backdrop-blur-sm"
                            aria-label="Close modal"
                          >
                            <span className="text-lg sm:text-xl">✕</span>
                          </button>
                          {/* Service Title Overlay on Image */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/60 to-transparent">
                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">{service.title}</h2>
                            <p className="text-white/90 text-sm sm:text-base md:text-lg">{service.price}</p>
                          </div>
                        </div>
                        
                        {/* Content Section - Scrollable */}
                        <div className="overflow-y-auto modal-scrollbar-hide flex-1">
                          <div className="p-4 sm:p-6 md:p-8">
                          <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6">{service.fullDescription || service.description}</p>

                          {/* Process */}
                          <div className="mb-4 sm:mb-6">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Process</h3>
                            <ol className="space-y-2">
                              {service.process.map((step, idx) => (
                                <li key={idx} className="flex items-start gap-2 sm:gap-3">
                                  <span className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-r ${service.color} text-white flex items-center justify-center text-xs sm:text-sm font-bold`}>
                                    {idx + 1}
                                  </span>
                                  <span className="text-gray-700 text-sm sm:text-base">{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>

                          {/* Features */}
                          <div className="mb-4 sm:mb-6">
                            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Features</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                              {service.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 rounded-lg">
                                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color} flex-shrink-0`}></div>
                                  <span className="text-gray-700 font-medium text-sm sm:text-base">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Benefits */}
                          {service.benefits && (
                            <div className="mb-4 sm:mb-6">
                              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">Why Choose This Service</h3>
                              <ul className="space-y-2">
                                {service.benefits.map((benefit, idx) => (
                                  <li key={idx} className="flex items-center gap-2 sm:gap-3 text-gray-700 text-sm sm:text-base">
                                    <span className="text-green-500 flex-shrink-0">✓</span>
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Book Now Button */}
                          <Link to="/booking" state={{ serviceId: service.id }}>
                            <motion.button
                              className={`w-full py-3 sm:py-4 rounded-xl font-semibold text-white bg-gradient-to-r ${service.color} shadow-lg flex items-center justify-center gap-2 text-base sm:text-lg`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Calendar size={18} className="sm:w-5 sm:h-5" />
                              Book This Service
                              <ArrowRight size={18} className="sm:w-5 sm:h-5" />
                            </motion.button>
                          </Link>
                          </div>
                        </div>
                      </>
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

