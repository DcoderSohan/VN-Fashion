import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { contentApi } from '../utils/api';
import { formatPrice } from '../utils/helpers';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await contentApi.getServices();
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  // Default fallback services if none in database
  const fallbackServices = [
    {
      _id: '1',
      title: 'Bespoke Tailoring',
      description: 'Exclusive custom apparel crafted to your precise measurements. Includes fabric consultation, custom pattern drafting, and multiple fittings for perfection.',
      price: '5000',
      category: 'Couture'
    },
    {
      _id: '2',
      title: 'Creative Direction',
      description: 'Consultation and conceptual direction for luxury collections, fashion editorials, and brand styling to define unique aesthetic statements.',
      price: '15000',
      category: 'Consulting'
    },
    {
      _id: '3',
      title: 'Consultancy',
      description: 'One-on-one personal style analysis, wardrobe curations, and textile consultations matching traditional artisan crafts with modern silhouettes.',
      price: '3000',
      category: 'Styling'
    }
  ];

  const displayServices = services.length > 0 ? services : fallbackServices;

  return (
    <div className="min-h-screen bg-[#f5f4f2] overflow-x-hidden font-sans text-gray-950">
      <Navbar />
      <div className="pt-28 pb-20 px-8 lg:px-20">
        <div className="max-w-6xl mx-auto w-full">
          {/* Header */}
          <motion.div
            className="mb-20 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-2">STUDIO OFFERINGS</p>
            <h1 className="text-4xl sm:text-5xl lg:text-[4.5rem] font-light text-gray-955 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              The Studio Services
            </h1>
          </motion.div>

          {/* Services Columns */}
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
              {displayServices.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: index * 0.15 }}
                  className="flex flex-col items-start border-t border-gray-300 pt-8"
                >
                  {/* Service Number */}
                  <span className="text-[10px] tracking-[0.25em] text-gray-400 font-bold mb-4">
                    0{index + 1}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl font-light text-gray-955 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-500 leading-relaxed mb-6 font-light tracking-wide flex-grow">
                    {service.description}
                  </p>

                  {/* Price */}
                  {service.price && (
                    <div className="text-xs text-gray-600 font-semibold tracking-wider mb-4">
                      {formatPrice(service.price)}
                    </div>
                  )}

                  {/* Book Link */}
                  <Link
                    to="/booking"
                    state={{
                      serviceId: service._id,
                      serviceTitle: service.title,
                      serviceDescription: service.description,
                      servicePrice: service.price,
                      serviceCategory: service.category
                    }}
                    className="inline-flex flex-col items-start gap-1 text-[9px] tracking-[0.25em] uppercase text-gray-955 font-bold group mt-auto"
                  >
                    <span>BOOK APPOINTMENT</span>
                    <span className="h-[1.5px] w-12 bg-gray-950 group-hover:w-20 transition-all duration-500" />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
