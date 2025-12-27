import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, Calendar, MapPin, Clock, Award, Info, ChevronRight, ChevronLeft } from "lucide-react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { contentApi } from "../utils/api";
import { getImageUrl } from "../utils/helpers";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const lettersRef = useRef([]);
  const [selectedTimelineItem, setSelectedTimelineItem] = useState(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [showCertificateDetails, setShowCertificateDetails] = useState(true);
  const [showTimelineDetails, setShowTimelineDetails] = useState(true);
  const [certificates, setCertificates] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [aboutData, setAboutData] = useState({
    aboutText: "We specialize in exquisite Aari embroidery, a refined handcraft using a hooked needle to create delicate chain-stitch motifs enhanced with beads, mirrors, metallic zari threads, and intricate embellishments.",
    designerName: "Vidisha",
    designerTitle: "Master Artisan & Designer",
    designerBio: "With over a decade of experience in traditional Indian embroidery and contemporary fashion design, Vidisha brings together the best of both worlds. Specializing in Aari embroidery, she creates exquisite pieces that blend traditional craftsmanship with modern aesthetics.",
    designerImage: "/vidisha.jpg"
  });
  const [loading, setLoading] = useState(true);

  // Fetch about content, achievements, and timeline from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch about data
        const aboutData = await contentApi.getAbout();
        if (aboutData) {
          setAboutData({
            aboutText: aboutData.aboutText || aboutData.aboutText,
            designerName: aboutData.designerName || aboutData.designerName,
            designerTitle: aboutData.designerTitle || aboutData.designerTitle,
            designerBio: aboutData.designerBio || aboutData.designerBio,
            designerImage: aboutData.designerImage || aboutData.designerImage
          });
        }

        // Fetch achievements
        const achievementsData = await contentApi.getAchievements();
        if (Array.isArray(achievementsData) && achievementsData.length > 0) {
          // Convert achievement objects to strings for display
          const achievementStrings = achievementsData.map(ach => {
            if (typeof ach === 'object' && ach !== null) {
              return ach.title || String(ach);
            }
            return String(ach);
          });
          setAchievements(achievementStrings);
        }

        // Fetch timeline
        const timelineData = await contentApi.getTimeline();
        if (Array.isArray(timelineData) && timelineData.length > 0) {
          setTimelineData(timelineData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const aboutText = aboutData.aboutText;

  const designerInfo = {
    name: aboutData.designerName,
    title: aboutData.designerTitle,
    bio: aboutData.designerBio,
    fullBiography: "Vidisha's journey in fashion design began over a decade ago when she discovered her passion for traditional Indian embroidery techniques. With a background in textile design and years of apprenticeship under master artisans, she has honed her skills in Aari embroidery, fabric painting, and custom tailoring. Her work has been featured in numerous fashion shows and has earned her recognition as a master artisan. Vidisha believes in preserving traditional craftsmanship while adapting to contemporary fashion trends, creating pieces that are both timeless and modern.",
    education: "Textile Design Degree, Fashion Institute",
    expertise: ["Aari Embroidery", "Fabric Painting", "Custom Tailoring", "Traditional & Contemporary Design"],
    achievements: achievements.length > 0 ? achievements : ["10+ Years of Experience", "500+ Custom Designs Created", "Specialized in Bridal Wear"],
    designPhilosophy: "Fashion is not just about clothing; it's about storytelling, preserving heritage, and celebrating individuality. My design philosophy centers on three core principles: authenticity, craftsmanship, and personalization. I believe every piece should tell a story, reflect the wearer's personality, and honor the rich traditions of Indian textile art while embracing contemporary aesthetics.",
    timeline: timelineData.length > 0 ? timelineData.map(item => ({
      year: item.year || '',
      event: item.event || item.title || '',
      description: item.description || '',
      image: item.image || '',
      eventDate: item.eventDate || '',
      place: item.place || '',
      creationDate: item.creationDate || ''
    })) : [
      { 
        year: "2013", 
        event: "Started journey in fashion design", 
        description: "Began apprenticeship with master artisans",
        image: "/VN-1.jpg",
        eventDate: "March 15, 2013",
        place: "Mumbai, Maharashtra",
        creationDate: "March 10, 2013"
      },
      { 
        year: "2015", 
        event: "Established VN Fashion", 
        description: "Launched custom design studio",
        image: "/VN-2.jpg",
        eventDate: "June 20, 2015",
        place: "Mumbai, Maharashtra",
        creationDate: "June 15, 2015"
      },
      { 
        year: "2017", 
        event: "First bridal collection", 
        description: "Created exclusive bridal wear line",
        image: "/VN-3.jpg",
        eventDate: "October 5, 2017",
        place: "Mumbai, Maharashtra",
        creationDate: "September 28, 2017"
      },
      { 
        year: "2019", 
        event: "Award recognition", 
        description: "Received recognition for traditional craftsmanship",
        image: "/VN-4.jpg",
        eventDate: "December 12, 2019",
        place: "New Delhi, India",
        creationDate: "December 1, 2019"
      },
      { 
        year: "2021", 
        event: "500+ designs milestone", 
        description: "Completed 500+ custom designs",
        image: "/aariWork.jpg",
        eventDate: "August 25, 2021",
        place: "Mumbai, Maharashtra",
        creationDate: "August 20, 2021"
      },
      { 
        year: "2024", 
        event: "Expanding services", 
        description: "Added costume rental and expanded offerings",
        image: "/VN-5.jpg",
        eventDate: "January 10, 2024",
        place: "Mumbai, Maharashtra",
        creationDate: "January 5, 2024"
      },
    ]
  };

  // Fetch certificates from API
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const certificatesData = await contentApi.getCertificates();
        if (Array.isArray(certificatesData) && certificatesData.length > 0) {
          setCertificates(certificatesData);
        }
      } catch (error) {
        console.error('Error fetching certificates:', error);
        // Keep empty array if API fails
        setCertificates([]);
      }
    };

    fetchCertificates();
  }, []);

  // Reset details panel when certificate modal closes
  useEffect(() => {
    if (!selectedCertificate) {
      setShowCertificateDetails(true);
    }
  }, [selectedCertificate]);

  // Reset details panel when timeline modal closes
  useEffect(() => {
    if (!selectedTimelineItem) {
      setShowTimelineDetails(true);
    }
  }, [selectedTimelineItem]);

  // Split text into letters for animation
  const splitTextIntoLetters = (text) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        ref={(el) => (lettersRef.current[index] = el)}
        className="inline-block"
        style={{ opacity: 0 }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      if (titleRef.current) {
        gsap.fromTo(titleRef.current, 
          { opacity: 0, y: 50 },
          {
            scrollTrigger: {
              trigger: aboutRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          }
        );
      }

      // Letter-by-letter reveal animation
      if (lettersRef.current.length > 0) {
        gsap.to(lettersRef.current, {
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          duration: 0.1,
          stagger: 0.03,
          ease: "power2.out",
        });
      }
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div ref={aboutRef} className="max-w-6xl mx-auto w-full">
          {/* Title */}
          <h1 
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-12 text-center text-gray-900"
          >
            About <span className="text-blue-600">Our Craft</span>
          </h1>

          {/* Animated Paragraph with Letter-by-Letter Reveal */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p 
              ref={paragraphRef}
              className="text-lg sm:text-xl md:text-2xl leading-relaxed text-center text-gray-800 max-w-4xl mx-auto"
            >
              {splitTextIntoLetters(aboutText)}
            </p>
          </motion.div>

          {/* Designer Section */}
          <motion.section
            className="mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 lg:p-10 overflow-hidden">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
                About the <span className="text-blue-600">Designer</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center mb-6 sm:mb-8">
                {/* Image Section */}
                <motion.div 
                  className="relative w-full"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="aspect-square rounded-lg overflow-hidden shadow-2xl max-w-xs sm:max-w-sm md:max-w-full mx-auto group">
                    <img
                      src={getImageUrl(aboutData.designerImage)}
                      alt={designerInfo.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        // Fallback to default image if API image fails
                        e.target.src = "/vidisha.jpg";
                      }}
                    />
                  </div>
                </motion.div>

                {/* Info Section */}
                <motion.div 
                  className="space-y-6"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div>
                    <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                      {designerInfo.name}
                    </h3>
                    <p className="text-xl text-blue-600 font-semibold mb-6">
                      {designerInfo.title}
                    </p>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {designerInfo.bio}
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Expertise */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">Expertise</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {designerInfo.expertise.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-gray-50 p-3 sm:p-4 rounded-lg shadow-md text-center font-medium text-gray-800 cursor-pointer group relative overflow-hidden text-xs sm:text-sm"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <span className="relative z-10">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Achievements & Certificates */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">Achievements & Certificates</h3>
                
                {/* Text Achievements */}
                <div className="space-y-2 sm:space-y-3 max-w-2xl mx-auto mb-6">
                  {achievements.length > 0 ? (
                    achievements.map((achievement, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center gap-2 sm:gap-3 bg-gray-50 p-3 sm:p-4 rounded-lg shadow-md group relative overflow-hidden"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <motion.div
                          className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"
                          whileHover={{ scale: 1.5 }}
                        />
                        <span className="text-gray-700 relative z-10 text-sm sm:text-base">{achievement}</span>
                      </motion.div>
                    ))
                  ) : (
                    designerInfo.achievements.map((achievement, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center gap-2 sm:gap-3 bg-gray-50 p-3 sm:p-4 rounded-lg shadow-md group relative overflow-hidden"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        />
                        <motion.div
                          className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"
                          whileHover={{ scale: 1.5 }}
                        />
                        <span className="text-gray-700 relative z-10 text-sm sm:text-base">{achievement}</span>
                      </motion.div>
                    ))
                  )}
                </div>

                {/* Certificates Tags */}
                {certificates.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
                    {certificates.map((cert, idx) => (
                      <motion.button
                        key={cert._id || idx}
                        className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 font-semibold text-sm sm:text-base flex items-center gap-2"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
          setSelectedCertificate(cert);
          setShowCertificateDetails(true);
        }}
                      >
                        <Award size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                        <span>{cert.title}</span>
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.section>

          {/* Timeline - Vertical with Horizontal Cards */}
          <motion.section
            className="mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 lg:p-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
                Career Timeline
              </h2>
              <div className="max-w-5xl mx-auto">
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 sm:left-12 md:left-16 top-0 bottom-0 w-0.5 bg-blue-200 hidden sm:block"></div>
                  
                  {designerInfo.timeline.map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="relative mb-6 sm:mb-8"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-4 sm:left-8 md:left-12 w-4 h-4 sm:w-5 sm:h-5 bg-blue-600 rounded-full border-4 border-white shadow-lg z-10 flex-shrink-0 top-6 sm:top-8"></div>
                      
                      {/* Horizontal Card - Image Left, Content Right */}
                      <div 
                        className="ml-12 sm:ml-16 md:ml-20 bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden cursor-pointer group hover:shadow-2xl transition-all duration-300"
                        onClick={() => {
                          setSelectedTimelineItem(item);
                          setShowTimelineDetails(true);
                        }}
                      >
                        <div className="flex flex-col sm:flex-row">
                          {/* Image Section - Left Side */}
                          {item.image && (
                            <div className="relative w-full sm:w-48 md:w-56 h-36 sm:h-[220px] md:h-[240px] flex-shrink-0 overflow-hidden">
                              <img
                                src={getImageUrl(item.image)}
                                alt={item.event}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                onError={(e) => {
                                  e.target.src = item.image;
                                }}
                              />
                              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-blue-600 text-white px-2 py-1 sm:px-3 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                                {item.year}
                              </div>
                              <div className="absolute inset-0 bg-gradient-to-r from-black/0 group-hover:from-black/10 transition-colors"></div>
                            </div>
                          )}
                          
                          {/* Content Section - Right Side */}
                          <div className="flex-1 p-3 sm:p-5 md:p-6 flex flex-col justify-between min-h-[140px] sm:min-h-0 sm:h-[220px] md:h-[240px]">
                            <div className="flex-1">
                              <h3 className="text-sm sm:text-lg md:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                                {item.event}
                              </h3>
                              <p className="text-gray-600 text-xs sm:text-sm md:text-base line-clamp-2 sm:line-clamp-3 mb-2">
                                {item.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 text-blue-600 text-xs sm:text-sm font-semibold mt-2">
                              <span>Click to view details</span>
                              <span>→</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

        </div>
      </div>
      <Footer />

      {/* Timeline Item Modal - Same Design as Certificate Modal */}
      <AnimatePresence>
        {selectedTimelineItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={() => setSelectedTimelineItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full max-w-7xl max-h-[95vh] sm:max-h-[90vh] flex flex-col md:flex-row rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Timeline Image - Full Width */}
              <div className="relative flex-1 bg-gray-900 flex items-center justify-center overflow-auto min-h-[40vh] md:min-h-0 md:overflow-hidden">
                {selectedTimelineItem.image ? (
                  <img
                    src={getImageUrl(selectedTimelineItem.image)}
                    alt={selectedTimelineItem.event || selectedTimelineItem.title}
                    className="max-w-full max-h-full w-auto h-auto object-contain p-2 sm:p-4"
                    style={{ 
                      display: 'block',
                      margin: '0 auto'
                    }}
                    onError={(e) => {
                      console.error('Image failed to load:', selectedTimelineItem.image);
                      e.target.onerror = null;
                      e.target.src = selectedTimelineItem.image;
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-white/50">
                    <Calendar size={64} className="mb-4 opacity-50" />
                    <p className="text-lg">No image available</p>
                  </div>
                )}
                
                {/* Title Overlay - Top */}
                <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 md:p-6 bg-gradient-to-b from-black/70 via-black/40 to-transparent">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Calendar className="text-white" size={20} sm:size={22} md:size={24} />
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg line-clamp-2">
                      {selectedTimelineItem.event || selectedTimelineItem.title}
                    </h2>
                  </div>
                  {selectedTimelineItem.year && (
                    <p className="text-white/90 text-sm sm:text-base ml-8 sm:ml-10 md:ml-12 mt-1">
                      {selectedTimelineItem.year}
                    </p>
                  )}
                </div>

                {/* Close Button - Top Right */}
                <button
                  onClick={() => setSelectedTimelineItem(null)}
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-50 border border-white/30 hover:scale-110 active:scale-95"
                  aria-label="Close modal"
                >
                  <X size={16} sm:size={18} md:size={20} className="text-white" />
                </button>

                {/* Toggle Details Button - Only Mobile/Tablet (hidden on large devices) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTimelineDetails(!showTimelineDetails);
                  }}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 active:bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/30 transition-colors duration-150 fixed bottom-4 left-1/2 z-[60] lg:hidden"
                  style={{ 
                    transform: 'translateX(-50%) translateZ(0)',
                  }}
                  aria-label={showTimelineDetails ? "Hide details" : "Show details"}
                >
                  {showTimelineDetails ? (
                    <ChevronLeft size={20} className="text-white rotate-90" />
                  ) : (
                    <ChevronRight size={20} className="text-white -rotate-90" />
                  )}
                </button>
              </div>

              {/* Details Panel - Mobile: Bottom Sheet, Desktop: Right Side with Glassmorphism */}
              <AnimatePresence>
                {showTimelineDetails && (
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
                      {selectedTimelineItem.description && (
                        <div className="mb-4 sm:mb-5 md:mb-6">
                          <h4 className="text-xs sm:text-sm font-semibold text-white/90 mb-2 uppercase tracking-wide">Description</h4>
                          <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed">
                            {selectedTimelineItem.description}
                          </p>
                        </div>
                      )}

                      {/* Details Cards */}
                      <div className="space-y-3 sm:space-y-4">
                        {/* Year */}
                        {selectedTimelineItem.year && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05, duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 shadow-lg"
                          >
                            <div className="flex items-start gap-2 sm:gap-3">
                              <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg flex-shrink-0">
                                <Calendar className="text-white" size={16} sm:size={18} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-[10px] sm:text-xs font-semibold text-white/70 mb-1 uppercase tracking-wide">Year</h4>
                                <p className="text-white text-xs sm:text-sm md:text-base font-medium break-words">{selectedTimelineItem.year}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Event Date */}
                        {selectedTimelineItem.eventDate && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 shadow-lg"
                          >
                            <div className="flex items-start gap-2 sm:gap-3">
                              <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg flex-shrink-0">
                                <Calendar className="text-white" size={16} sm:size={18} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-[10px] sm:text-xs font-semibold text-white/70 mb-1 uppercase tracking-wide">Event Date</h4>
                                <p className="text-white text-xs sm:text-sm md:text-base font-medium break-words">{selectedTimelineItem.eventDate}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Place */}
                        {selectedTimelineItem.place && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 shadow-lg"
                          >
                            <div className="flex items-start gap-2 sm:gap-3">
                              <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg flex-shrink-0">
                                <MapPin className="text-white" size={16} sm:size={18} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-[10px] sm:text-xs font-semibold text-white/70 mb-1 uppercase tracking-wide">Place</h4>
                                <p className="text-white text-xs sm:text-sm md:text-base font-medium break-words">{selectedTimelineItem.place}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Creation Date */}
                        {selectedTimelineItem.creationDate && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 shadow-lg"
                          >
                            <div className="flex items-start gap-2 sm:gap-3">
                              <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg flex-shrink-0">
                                <Clock className="text-white" size={16} sm:size={18} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-[10px] sm:text-xs font-semibold text-white/70 mb-1 uppercase tracking-wide">Creation Date</h4>
                                <p className="text-white text-xs sm:text-sm md:text-base font-medium break-words">{selectedTimelineItem.creationDate}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .modal-scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .modal-scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
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
      `}</style>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={() => setSelectedCertificate(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full max-w-7xl max-h-[95vh] sm:max-h-[90vh] flex flex-col md:flex-row rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Certificate Image - Full Width */}
              <div className="relative flex-1 bg-gray-900 flex items-center justify-center overflow-auto min-h-[40vh] md:min-h-0 md:overflow-hidden">
                {selectedCertificate.image ? (
                  <img
                    src={getImageUrl(selectedCertificate.image)}
                    alt={selectedCertificate.title}
                    className="max-w-full max-h-full w-auto h-auto object-contain p-2 sm:p-4"
                    style={{ 
                      display: 'block',
                      margin: '0 auto'
                    }}
                    onError={(e) => {
                      console.error('Image failed to load:', selectedCertificate.image, 'Full URL:', getImageUrl(selectedCertificate.image));
                      e.target.onerror = null; // Prevent infinite loop
                      e.target.src = selectedCertificate.image; // Try original URL
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-8 text-white/50">
                    <Award size={64} className="mb-4 opacity-50" />
                    <p className="text-lg">No image available</p>
                  </div>
                )}
                
                {/* Title Overlay - Top */}
                <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 md:p-6 bg-gradient-to-b from-black/70 via-black/40 to-transparent">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Award className="text-white" size={20} sm:size={22} md:size={24} />
                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white drop-shadow-lg line-clamp-2">
                      {selectedCertificate.title}
                    </h2>
                  </div>
                </div>

                {/* Close Button - Top Right */}
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 w-8 h-8 sm:w-9 sm:h-9 md:w-11 md:h-11 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-50 border border-white/30 hover:scale-110 active:scale-95"
                  aria-label="Close modal"
                >
                  <X size={16} sm:size={18} md:size={20} className="text-white" />
                </button>

                {/* Toggle Details Button - Only Mobile/Tablet (hidden on large devices) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCertificateDetails(!showCertificateDetails);
                  }}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 active:bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border border-white/30 transition-colors duration-150 fixed bottom-4 left-1/2 z-[60] lg:hidden"
                  style={{ 
                    transform: 'translateX(-50%) translateZ(0)',
                  }}
                  aria-label={showCertificateDetails ? "Hide details" : "Show details"}
                >
                  {showCertificateDetails ? (
                    <ChevronLeft size={20} className="text-white rotate-90" />
                  ) : (
                    <ChevronRight size={20} className="text-white -rotate-90" />
                  )}
                </button>
              </div>

              {/* Details Panel - Mobile: Bottom Sheet, Desktop: Right Side with Glassmorphism */}
              <AnimatePresence>
                {showCertificateDetails && (
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
                      duration: 0.3,
                      opacity: { duration: 0.2 }
                    }}
                    className="absolute md:relative md:right-0 md:top-0 md:bottom-0 bottom-0 left-0 right-0 w-full md:w-96 lg:w-[420px] h-[60vh] sm:h-[65vh] md:h-full bg-white/10 backdrop-blur-xl border-t md:border-t-0 md:border-l border-white/20 shadow-2xl overflow-hidden rounded-t-3xl md:rounded-t-none z-50"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 50%, rgba(255, 255, 255, 0.05) 100%)',
                      backdropFilter: 'blur(16px) saturate(150%)',
                      WebkitBackdropFilter: 'blur(16px) saturate(150%)',
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Glassmorphism Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent pointer-events-none" style={{ willChange: 'opacity' }} />
                    
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
                      {selectedCertificate.description && (
                        <div className="mb-4 sm:mb-5 md:mb-6">
                          <h4 className="text-xs sm:text-sm font-semibold text-white/90 mb-2 uppercase tracking-wide">Description</h4>
                          <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed">
                            {selectedCertificate.description}
                          </p>
                        </div>
                      )}

                      {/* Details Cards */}
                      <div className="space-y-3 sm:space-y-4">
                        {/* Issued By */}
                        {selectedCertificate.issuedBy && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05, duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 shadow-lg"
                          >
                            <div className="flex items-start gap-2 sm:gap-3">
                              <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg flex-shrink-0">
                                <Award className="text-white" size={16} sm:size={18} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-[10px] sm:text-xs font-semibold text-white/70 mb-1 uppercase tracking-wide">Issued By</h4>
                                <p className="text-white text-xs sm:text-sm md:text-base font-medium break-words">{selectedCertificate.issuedBy}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Issue Date */}
                        {selectedCertificate.issueDate && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 shadow-lg"
                          >
                            <div className="flex items-start gap-2 sm:gap-3">
                              <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg flex-shrink-0">
                                <Calendar className="text-white" size={16} sm:size={18} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-[10px] sm:text-xs font-semibold text-white/70 mb-1 uppercase tracking-wide">Issue Date</h4>
                                <p className="text-white text-xs sm:text-sm md:text-base font-medium break-words">{selectedCertificate.issueDate}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Category */}
                        {selectedCertificate.category && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15, duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 shadow-lg"
                          >
                            <div className="flex items-start gap-2 sm:gap-3">
                              <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg flex-shrink-0">
                                <span className="text-white text-base sm:text-lg">🏆</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-[10px] sm:text-xs font-semibold text-white/70 mb-1 uppercase tracking-wide">Category</h4>
                                <p className="text-white text-xs sm:text-sm md:text-base font-medium break-words">{selectedCertificate.category}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Year */}
                        {selectedCertificate.year && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            className="bg-white/10 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 border border-white/20 shadow-lg"
                          >
                            <div className="flex items-start gap-2 sm:gap-3">
                              <div className="p-1.5 sm:p-2 bg-white/20 rounded-lg flex-shrink-0">
                                <Clock className="text-white" size={16} sm:size={18} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-[10px] sm:text-xs font-semibold text-white/70 mb-1 uppercase tracking-wide">Year</h4>
                                <p className="text-white text-xs sm:text-sm md:text-base font-medium break-words">{selectedCertificate.year}</p>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default About;

