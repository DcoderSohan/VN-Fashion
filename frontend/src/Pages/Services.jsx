import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { contentApi } from '../utils/api';
import { formatPrice, getImageUrl } from '../utils/helpers';

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
      description: 'One-on-one personal style analysis, wardrobe curations, and wardrobe audits matching traditional artisan crafts with modern silhouettes.',
      price: '3000',
      category: 'Styling'
    }
  ];

  const displayServices = services.length > 0 ? services : fallbackServices;

  return (
    <div className="ab-page-root min-h-screen bg-[#fbfbfa] text-gray-900 overflow-x-hidden relative font-sans">
      {/* Faded background watermark image */}
      <div className="ab-faded-bg" aria-hidden="true">
        <img 
          src="/VN-6.jpg" 
          alt="" 
          onError={(e) => {
            e.target.src = "/HeroBg.jpg";
          }}
        />
      </div>

      {/* Organic film grain texture */}
      <div className="ab-grain" aria-hidden="true" />
      
      <Navbar />

      {/* ── 1. EDITORIAL HERO HEADER & INTRODUCTION ── */}
      <div className="pt-36 pb-12 px-8 lg:px-20 relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          className="mb-16 text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#b8860b] mb-3 font-bold">STUDIO OFFERINGS</p>
          <h1 className="text-5xl sm:text-7xl lg:text-[6.5rem] font-light leading-[0.95] tracking-tight text-gray-955 mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            <em>The</em> Offerings<br />
            <span className="bg-gradient-to-r from-[#b8860b] via-[#8b6914] to-[#c9a84c] bg-clip-text text-transparent italic font-normal">of Couture & Consultancy</span>
          </h1>
          <div className="w-24 h-[1px] bg-[#b8860b] mt-8" />
        </motion.div>

        {/* Spacious centered intro statement */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-4xl mx-auto px-4 sm:px-8 mb-24 text-center"
        >
          <p className="text-lg sm:text-xl lg:text-2xl font-light text-gray-700 leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            "We construct bespoke sartorial experiences. VN Fashion offers intentional tailoring, custom silhouettes, and creative art direction for the modern identity."
          </p>
        </motion.div>
      </div>

      {/* ── 2. SERVICES CATALOG GRID ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-8 lg:px-20 mb-32">
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#b8860b]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 items-stretch">
            {displayServices.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="group bg-white border border-gray-150/70 p-8 rounded-sm shadow-sm hover:shadow-md hover:border-[#b8860b]/25 transition-all duration-500 flex flex-col justify-between min-h-[360px] relative"
              >
                {/* Enormous outline number behind card content */}
                <div className="absolute top-4 right-4 font-light select-none pointer-events-none ab-outline-num z-0" style={{ fontFamily: "'Playfair Display', serif" }}>
                  0{index + 1}
                </div>

                <div className="relative z-10 flex-grow flex flex-col items-start">
                  {/* Category Tag */}
                  <span className="text-[9px] tracking-[0.25em] text-[#b8860b] font-bold block mb-4 uppercase">
                    {service.category || 'Atelier'}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl font-light text-gray-950 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-550 leading-relaxed mb-6 font-light tracking-wide flex-grow">
                    {service.description}
                  </p>

                  {/* Price */}
                  {service.price && (
                    <div className="text-xs text-gray-600 font-semibold tracking-wider mb-8">
                      FROM {formatPrice(service.price)}
                    </div>
                  )}
                </div>

                {/* Signature booking button */}
                <Link
                  to="/booking"
                  state={{
                    serviceId: service._id,
                    serviceTitle: service.title,
                    serviceDescription: service.description,
                    servicePrice: service.price,
                    serviceCategory: service.category
                  }}
                  className="ab-page-btn ab-page-btn-primary mt-auto w-full text-center justify-center relative z-10"
                >
                  <span className="ab-page-btn-fill" />
                  <span className="ab-page-btn-text">Book Appointment</span>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* ── 3. ATELIER CRAFTSMANSHIP SHOWCASE ── */}
      <div className="pt-28 pb-12 px-8 lg:px-20 relative z-10 border-t border-gray-200">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column: Visionary Statement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#b8860b] mb-3 font-bold">ATELIER CRAFT</p>
              <h2 className="text-3xl sm:text-4xl font-light text-gray-955 leading-tight mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                Meticulous Craftsmanship, Tailored Silhouettes
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed font-light mb-4">
                Every garment created at our atelier is treated as a structural work of art. We combine traditional Indian handcrafts and embroidery with modern architectural silhouettes to draft pieces of unique, intentional identity.
              </p>
            </motion.div>

            {/* Right Column: Highlights List */}
            <div className="space-y-6">
              {[
                { title: "Bespoke Fitting Sessions", desc: "Three rigorous fitting stages to ensure absolute anatomical precision and silhouette perfection." },
                { title: "Artisanal Hand Embroidery", desc: "Intricate Aari work and traditional threadwork crafted by generational master artisans." },
                { title: "Sourced Fine Textiles", desc: "Only the finest organic cotton, silks, brocades, and custom woven textiles make it to our cutting boards." }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.15 }}
                  className="flex gap-6 items-start pb-6 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <span className="text-lg font-light text-[#b8860b] italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                    0{idx + 1}
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* ── 4. BOTTOM CALL TO ACTION ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-20 pt-20 border-t border-gray-200 text-center max-w-3xl mx-auto px-8 relative z-10"
      >
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#b8860b] mb-4 font-bold">START YOUR EXPERIENCE</p>
        <h3 className="text-4xl sm:text-5xl font-light text-gray-955 mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
          Define Your Silhouette
        </h3>
        <p className="text-xs text-gray-500 max-w-lg mx-auto mb-10 leading-relaxed font-light">
          Collaborate with us to draft a unique garment tailored specifically to your silhouette. Book a styling consultation.
        </p>
        <div className="flex justify-center gap-4 flex-wrap pb-16">
          <Link to="/booking" className="ab-page-btn ab-page-btn-primary">
            <span className="ab-page-btn-fill" />
            <span className="ab-page-btn-text">Book Appointment</span>
          </Link>
          <Link to="/gallery" className="ab-page-btn ab-page-btn-ghost">
            <span className="ab-page-btn-fill" />
            <span className="ab-page-btn-text">Explore Collection</span>
          </Link>
        </div>
      </motion.div>

      <Footer />

      {/* Scoped styles */}
      <style>{`
        /* Luxury film grain layer */
        .ab-page-root .ab-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.022;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 160px 160px;
          z-index: 5;
        }

        /* Faded background watermark */
        .ab-page-root .ab-faded-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.042;
          filter: grayscale(100%) contrast(1.05);
        }
        .ab-page-root .ab-faded-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        /* Giant outline number behind cards */
        .ab-page-root .ab-outline-num {
          font-size: clamp(5rem, 10vw, 7rem);
          line-height: 1;
          font-style: italic;
          color: transparent;
          -webkit-text-stroke: 1px rgba(184, 134, 11, 0.12);
          opacity: 0.85;
          will-change: transform, opacity;
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), -webkit-text-stroke 0.4s ease;
        }
        .group:hover .ab-outline-num {
          transform: translateY(-8px) scale(1.03);
          -webkit-text-stroke: 1px rgba(184, 134, 11, 0.25);
        }

        /* Scoped signature buttons */
        .ab-page-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          overflow: hidden;
          text-decoration: none;
          font-family: 'Raleway', system-ui, sans-serif;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.85rem 1.8rem;
          transition: color 0.4s ease;
        }
        .ab-page-btn-fill {
          position: absolute;
          inset: 0;
          width: 0;
          transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .ab-page-btn-text {
          position: relative;
          z-index: 1;
        }
        .ab-page-btn-primary {
          background: #1a1a1a;
          color: #ffffff;
          border: 1.5px solid #1a1a1a;
        }
        .ab-page-btn-primary .ab-page-btn-fill {
          background: #b8860b;
        }
        .ab-page-btn-primary:hover .ab-page-btn-fill {
          width: 100%;
        }
        .ab-page-btn-ghost {
          background: transparent;
          color: #1a1a1a;
          border: 1.5px solid #1a1a1a;
        }
        .ab-page-btn-ghost .ab-page-btn-fill {
          background: #1a1a1a;
        }
        .ab-page-btn-ghost:hover {
          color: #ffffff;
        }
        .ab-page-btn-ghost:hover .ab-page-btn-fill {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default ServicesPage;
