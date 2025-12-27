import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { contentApi } from "../../utils/api";
import { getImageUrl } from "../../utils/helpers";
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const paragraphRef = useRef(null);
  const [showDesignerInfo, setShowDesignerInfo] = useState(false);
  const [aboutData, setAboutData] = useState({
    aboutText: "We specialize in exquisite Aari embroidery, a refined handcraft using a hooked needle to create delicate chain-stitch motifs enhanced with beads, mirrors, metallic zari threads, and intricate embellishments.",
    designerName: "Vidisha",
    designerTitle: "Master Artisan & Designer",
    designerBio: "With over a decade of experience in traditional Indian embroidery and contemporary fashion design, Vidisha brings together the best of both worlds. Specializing in Aari embroidery, she creates exquisite pieces that blend traditional craftsmanship with modern aesthetics.",
    designerImage: "/vidisha.jpg"
  });
  const [achievements, setAchievements] = useState([]);

  // Fetch about content and achievements from API
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
        if (Array.isArray(achievementsData)) {
          // Convert achievement objects to strings for display
          const achievementStrings = achievementsData.map(ach => 
            typeof ach === 'object' ? (ach.title || String(ach)) : ach
          );
          setAchievements(achievementStrings);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const aboutText = aboutData.aboutText;

  const designerIntro = "I'm a passionate master artisan with over a decade of expertise in traditional Indian embroidery and contemporary fashion design. Her dedication to preserving age-old Aari embroidery techniques while infusing modern aesthetics has made her a sought-after designer for bridal wear and custom creations.";

  const designerInfo = {
    name: aboutData.designerName,
    title: aboutData.designerTitle,
    bio: aboutData.designerBio,
    expertise: ["Aari Embroidery", "Fabric Painting", "Custom Tailoring", "Traditional & Contemporary Design"],
    achievements: achievements.length > 0 ? achievements : ["10+ Years of Experience", "500+ Custom Designs Created", "Specialized in Bridal Wear"],
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

      // Animate paragraph with fade and slide
      if (paragraphRef.current) {
        gsap.fromTo(paragraphRef.current,
          { opacity: 0, y: 30 },
          {
            scrollTrigger: {
              trigger: aboutRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
            delay: 0.3,
          }
        );
      }
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-section-wrapper w-full" id="about">
      <motion.div 
        ref={aboutRef}
        className="w-full min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full">
          <h2 
            ref={titleRef}
            className="about-title text-4xl sm:text-5xl md:text-6xl font-bold mb-12 text-center text-gray-900"
          >
            <span className="about-title-line">About Our</span>
            <span className="about-title-line about-title-accent ml-2">Craft</span>
          </h2>

          {/* About Content with Designer Image on Left, Text on Right */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-center w-full">
              {/* Designer Image - Left Side */}
              <motion.div 
                className="relative w-full flex justify-center md:justify-start order-2 md:order-1"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-[280px] sm:h-[320px] md:h-[400px] lg:h-[450px] rounded-lg overflow-hidden shadow-2xl group">
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
                  {/* Designer Name Tag - Bottom Right Corner */}
                  <motion.div
                    className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg border border-gray-200"
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <p className="text-gray-900 font-bold text-lg md:text-xl">
                      {designerInfo.name}
                    </p>
                    <p className="text-blue-600 text-xs md:text-sm font-medium">
                      {designerInfo.title}
                    </p>
                  </motion.div>
                </div>
              </motion.div>

              {/* Text Content - Right Side */}
              <div className="w-full flex flex-col justify-center space-y-4 sm:space-y-6 order-1 md:order-2">
                <p 
                  ref={paragraphRef}
                  className="about-info-animate text-base sm:text-lg md:text-xl leading-relaxed text-gray-800 text-center md:text-left"
                >
                  {aboutText}
                </p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 sm:p-6 rounded-lg border-l-4 border-blue-600"
                >
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">About the Designer</h3>
                  <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-700">
                    {designerIntro}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Button to show designer info */}
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button
              onClick={() => setShowDesignerInfo(!showDesignerInfo)}
              className="px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {showDesignerInfo ? "Hide" : "Learn About"} Designer & Work Portal
            </button>
          </motion.div>

          {/* Animated Designer Info Section */}
          <AnimatePresence>
            {showDesignerInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-hidden mt-8"
              >
                <motion.div
                  className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 space-y-6"
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Designer Info */}
                  <div className="text-center mb-8">
                    <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                      {designerInfo.name}
                    </h3>
                    <p className="text-xl text-blue-600 font-semibold mb-4">
                      {designerInfo.title}
                    </p>
                    <motion.p
                      className="text-gray-700 leading-relaxed text-lg max-w-2xl mx-auto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {designerInfo.bio}
                    </motion.p>
                  </div>

                  {/* Expertise */}
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">Expertise</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {designerInfo.expertise.map((skill, idx) => (
                        <motion.div
                          key={idx}
                          className="bg-gray-50 p-4 rounded-lg shadow-md text-center font-medium text-gray-800"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                        >
                          {skill}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-4 text-center">Achievements</h4>
                    <div className="space-y-3 max-w-2xl mx-auto">
                      {designerInfo.achievements.map((achievement, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg shadow-md"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + idx * 0.1 }}
                        >
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-700">{achievement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Work Portal Info */}
                  <motion.div
                    className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <h4 className="text-2xl font-bold text-gray-900 mb-3 text-center">Our Work Portal</h4>
                    <p className="text-gray-700 text-center leading-relaxed">
                      Explore our complete portfolio showcasing handcrafted designs, custom creations, and exclusive collections. 
                      Our work portal features detailed galleries of bridal wear, designer blouses, embroidered pieces, and more. 
                      Each piece is a testament to traditional craftsmanship meeting contemporary elegance.
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
