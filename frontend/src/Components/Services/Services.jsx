import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const services = [
  { 
    id: 1,
    title: 'Designer Blouses', 
    img: '/aariWork.jpg', 
    icon: '👗',
    description: 'Custom-designed blouses tailored to perfection with intricate detailing and premium fabrics. Each piece is crafted with attention to detail and personalized to match your style.',
    features: ['Custom Fitting', 'Premium Fabrics', 'Intricate Detailing', 'Personalized Design']
  },
  { 
    id: 2,
    title: 'Aari Embroidery', 
    img: '/VN-1.jpg', 
    icon: '✨',
    description: 'Traditional Aari embroidery work on blouses and dresses, showcasing exquisite craftsmanship. Our skilled artisans create beautiful patterns using age-old techniques.',
    features: ['Traditional Techniques', 'Handcrafted', 'Intricate Patterns', 'Premium Quality']
  },   
  { 
    id: 3,
    title: 'Fabric Painting', 
    img: '/VN-2.jpg', 
    icon: '🎨',
    description: 'Hand-painted designs on blouses and dresses, creating unique and artistic pieces. Transform your garments into wearable art with our custom painting services.',
    features: ['Hand Painted', 'Unique Designs', 'Artistic Expression', 'Custom Patterns']
  },      
  { 
    id: 4,
    title: 'Stitching Services', 
    img: '/VN-3.jpg', 
    icon: '✂️',
    description: 'Professional stitching services for all types of garments with precision and care. From alterations to complete garment construction, we handle it all.',
    features: ['All Garment Types', 'Precision Work', 'Quick Turnaround', 'Expert Tailoring']
  },  
  { 
    id: 5,
    title: 'Costume Rental', 
    img: '/VN-4.jpg', 
    icon: '👑',
    description: 'Premium costume rental service for special occasions and events. Choose from our extensive collection of designer outfits for your special day.',
    features: ['Designer Collection', 'Various Sizes', 'Event Ready', 'Affordable Rates']
  },  
];

const Services = () => {
  // Show only first 3 services on home page
  const displayedServices = services.slice(0, 3);

  return (
    <section
      className='py-20 px-4 sm:px-6 md:px-10 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100'
      id='services'
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Our <span className="text-blue-600">Services</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our comprehensive range of fashion and design services
          </p>
        </motion.div>

        {/* Unique 3-Image Layout - Masonry Style */}
        <motion.div
          className="services-unique-layout mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          <div className="services-masonry-grid">
            {/* First Service - Large Left */}
            <motion.div
              className="service-card-large"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.02, y: -10 }}
            >
              <div className="service-card-image" style={{ backgroundImage: `url(${displayedServices[0].img})` }}>
                <div className="service-card-overlay"></div>
                <div className="service-title-bottom">
                  {displayedServices[0].title}
                </div>
              </div>
            </motion.div>

            {/* Second and Third Services - Stacked Right */}
            <div className="services-stacked">
              <motion.div
                className="service-card-medium"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02, y: -10 }}
              >
                <div className="service-card-image" style={{ backgroundImage: `url(${displayedServices[1].img})` }}>
                  <div className="service-card-overlay"></div>
                  <div className="service-title-bottom">
                    {displayedServices[1].title}
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="service-card-medium"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.02, y: -10 }}
              >
                <div className="service-card-image" style={{ backgroundImage: `url(${displayedServices[2].img})` }}>
                  <div className="service-card-overlay"></div>
                  <div className="service-title-bottom">
                    {displayedServices[2].title}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-8"
        >
          <Link to="/services">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View All Services
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <style>{`
        /* Unique 3-Image Masonry Layout */
        .services-unique-layout {
          width: 100%;
        }
        
        .services-masonry-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }
        
        .services-stacked {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .service-card-large,
        .service-card-medium {
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12);
          transition: all 0.3s ease;
          background: white;
        }
        
        .service-card-large {
          height: 350px;
        }
        
        .service-card-medium {
          height: 200px;
        }
        
        .service-card-image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          position: relative;
        }
        
        .service-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.85) 100%);
          z-index: 1;
        }
        
        .service-title-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 24px;
          background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, transparent 100%);
          color: #fff;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: 0.5px;
          z-index: 2;
          transition: all 0.3s ease;
        }
        
        .service-card-large:hover,
        .service-card-medium:hover {
          box-shadow: 0 12px 48px rgba(0,0,0,0.2);
        }
        
        .service-card-large:hover .service-title-bottom,
        .service-card-medium:hover .service-title-bottom {
          padding-bottom: 28px;
        }
        
        /* Tablet and up */
        @media (min-width: 640px) {
          .service-card-large {
            height: 400px;
          }
          
          .service-card-medium {
            height: 220px;
          }
          
          .service-title-bottom {
            font-size: 18px;
            padding: 20px;
          }
        }

        @media (min-width: 768px) {
          .services-masonry-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          
          .service-card-large {
            height: 500px;
            grid-row: span 2;
          }
          
          .service-card-medium {
            height: 240px;
          }
          
          .service-title-bottom {
            font-size: 20px;
            padding: 24px;
          }
        }
        
        /* Desktop */
        @media (min-width: 1024px) {
          .services-masonry-grid {
            gap: 2.5rem;
          }
          
          .service-card-large {
            height: 700px;
            border-radius: 32px;
          }
          
          .service-card-medium {
            height: 335px;
            border-radius: 28px;
          }
          
          .service-title-bottom {
            font-size: 24px;
            padding: 32px;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;