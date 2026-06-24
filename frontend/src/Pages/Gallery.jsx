import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { contentApi } from "../utils/api";
import { getImageUrl } from "../utils/helpers";

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState(null);
  const [allWorks, setAllWorks] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [loading, setLoading] = useState(true);

  // Fetch gallery data from API
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        const galleryData = await contentApi.getGallery();
        
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
        
        // Sort: featured items first
        const sortedWorks = transformedWorks.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        setAllWorks(sortedWorks);
        
        // Extract unique categories
        const uniqueCategories = ["All", ...new Set(transformedWorks.map(work => work.category).filter(Boolean))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching gallery:', error);
        // Fallback works matching mockups
        const defaultWorks = [
          { id: 1, title: "Noir Voluminous Gown", image: "/VN-1.jpg", category: "Couture", description: "Structured black gown with dynamic pleats." },
          { id: 2, title: "Metallic Wave Texture", image: "/featured_fabric_texture.png", category: "Textile Art", description: "Iridescent fabric manipulation detail." },
          { id: 3, title: "Structured Coat", image: "/hero_fashion_model.png", category: "Couture", description: "Minimalist black coat with architectural shoulders." },
          { id: 4, title: "Couture Concept Sketch", image: "/VN-3.jpg", category: "Sketches", description: "Original design concept drafting." },
          { id: 5, title: "Pleated Gown Detail", image: "/VN-2.jpg", category: "Couture", description: "Volume and texturing experimentation." },
          { id: 6, title: "Trench Coat Silhouette", image: "/VN-4.jpg", category: "Ready-To-Wear", description: "Modern structured silhouette." }
        ];
        setAllWorks(defaultWorks);
        setCategories(["All", "Couture", "Textile Art", "Ready-To-Wear", "Sketches"]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const filteredWorks = useMemo(() => {
    return selectedCategory === "All" 
      ? allWorks 
      : allWorks.filter(work => work.category === selectedCategory);
  }, [allWorks, selectedCategory]);

  const openLightbox = useCallback((work) => {
    setLightboxImage(work);
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
    setLightboxImage(filteredWorks[newIndex]);
  }, [lightboxImage, filteredWorks]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxImage) return;
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        navigateLightbox('prev');
      } else if (e.key === 'ArrowRight') {
        navigateLightbox('next');
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [lightboxImage, navigateLightbox, closeLightbox]);

  // Define alternating crop ratios for grid items to match high-end editorial layout
  const getGridAspect = (index) => {
    const crops = ["aspect-[3/4]", "aspect-[4/3]", "aspect-[3/4]", "aspect-square", "aspect-[4/5]", "aspect-[3/4]"];
    return crops[index % crops.length];
  };

  return (
    <div className="min-h-screen bg-[#f5f4f2] overflow-x-hidden font-sans text-gray-950">
      <Navbar />
      <div className="pt-32 pb-24 px-8 lg:px-20">
        <div className="max-w-6xl mx-auto w-full">
          {/* Header */}
          <motion.div
            className="mb-16 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-gray-400 mb-2 font-bold">COLLECTIONS</p>
            <h1 className="text-[3.5rem] sm:text-[5rem] md:text-[6rem] lg:text-[6.8rem] font-light leading-[0.95] tracking-tight text-gray-950 mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Archive 01
            </h1>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 mt-4 border-b border-gray-300 pb-5">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-xs sm:text-sm tracking-[0.25em] uppercase transition-colors duration-300 pb-1 border-b-2 font-bold ${
                    selectedCategory === category
                      ? "border-gray-900 text-gray-900"
                      : "border-transparent text-gray-400 hover:text-gray-900"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Corrected Grid Layout */}
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12 items-start">
              {filteredWorks.map((work, idx) => (
                <motion.div
                  key={work.id}
                  className="flex flex-col relative overflow-hidden group cursor-pointer"
                  onClick={() => openLightbox(work)}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: Math.min(idx * 0.05, 0.3) }}
                >
                  {/* Image Container with specific uniform crop ratio for alignment */}
                  <div className="w-full overflow-hidden bg-gray-100 aspect-[3/4]">
                    <img
                      src={work.image}
                      alt={work.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = "/VN-1.jpg";
                      }}
                    />
                  </div>
                  
                  {/* Label & Description under image */}
                  <div className="mt-4 flex flex-col items-start gap-1">
                    <span className="text-xs tracking-[0.2em] text-gray-400 uppercase font-bold">
                      {work.category}
                    </span>
                    <span className="text-2xl font-light text-gray-955 hover:text-gray-600 transition-colors" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                      {work.title}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Interested in a Collaboration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-32 pt-20 border-t border-gray-300 text-center flex flex-col items-center"
          >
            <h2 className="text-4xl font-light text-gray-950 mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Interested in a Collaboration?
            </h2>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-md mb-8 font-light tracking-wide">
              We are always looking for fresh perspectives and collaborative endeavors. Let's create something together.
            </p>
            <Link
              to="/contact"
              className="inline-flex flex-col items-start gap-1.5 text-xs tracking-[0.25em] uppercase text-gray-950 font-bold group"
            >
              <span>GET IN TOUCH</span>
              <span className="h-[1.5px] w-12 bg-gray-950 group-hover:w-20 transition-all duration-500" />
            </Link>
          </motion.div>
        </div>
      </div>
      <Footer />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <div 
              className="relative max-w-4xl w-full flex flex-col items-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Container */}
              <div className="relative max-h-[70vh] flex items-center justify-center">
                <img
                  src={lightboxImage.image}
                  alt={lightboxImage.title}
                  className="max-w-full max-h-[70vh] object-contain"
                  onError={(e) => {
                    e.target.src = "/VN-1.jpg";
                  }}
                />

                {/* Navigation */}
                <button
                  onClick={() => navigateLightbox('prev')}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white border border-white/20 transition-colors"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => navigateLightbox('next')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white border border-white/20 transition-colors"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Text Info */}
              <div className="text-center text-white max-w-xl px-4">
                <span className="text-xs tracking-[0.2em] text-gray-400 uppercase font-bold mb-1 block">
                  {lightboxImage.category}
                </span>
                <h3 className="text-4xl font-light mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {lightboxImage.title}
                </h3>
                {lightboxImage.description && (
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-light mb-5">
                    {lightboxImage.description}
                  </p>
                )}
                <Link
                  to="/booking"
                  state={{
                    designId: lightboxImage.id,
                    designTitle: lightboxImage.title,
                    designCategory: lightboxImage.category,
                    designPrice: lightboxImage.price,
                    designImage: lightboxImage.image
                  }}
                  className="inline-block bg-white text-black text-xs tracking-[0.25em] uppercase px-8 py-4 hover:bg-gray-200 transition-colors font-bold"
                >
                  Book This Design
                </Link>
              </div>

              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
