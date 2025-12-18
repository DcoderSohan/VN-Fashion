import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const paragraphRef = useRef(null);
  const [showDesignerInfo, setShowDesignerInfo] = useState(false);

  const aboutText = "We specialize in exquisite Aari embroidery, a refined handcraft using a hooked needle to create delicate chain-stitch motifs enhanced with beads, mirrors, metallic zari threads, and intricate embellishments.";

  const designerInfo = {
    name: "Vidisha",
    title: "Master Artisan & Designer",
    bio: "With over a decade of experience in traditional Indian embroidery and contemporary fashion design, Vidisha brings together the best of both worlds. Specializing in Aari embroidery, she creates exquisite pieces that blend traditional craftsmanship with modern aesthetics.",
    expertise: ["Aari Embroidery", "Fabric Painting", "Custom Tailoring", "Traditional & Contemporary Design"],
    achievements: ["10+ Years of Experience", "500+ Custom Designs Created", "Specialized in Bridal Wear"],
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
    <div className="about-section-wrapper" id="about">
      <motion.div 
        ref={aboutRef}
        className="container flex flex-col items-center justify-center w-full min-h-screen mx-auto px-4 md:px-8 py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-full max-w-4xl">
          <h2 
            ref={titleRef}
            className="about-title text-4xl sm:text-5xl md:text-6xl font-bold mb-8 text-center text-gray-900"
          >
            <span className="about-title-line">About Our</span>
            <span className="about-title-line about-title-accent ml-2">Craft</span>
          </h2>

          {/* Animated Paragraph */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p 
              ref={paragraphRef}
              className="about-info-animate text-lg sm:text-xl md:text-2xl leading-relaxed text-center text-gray-800"
            >
              {aboutText}
            </p>
          </motion.div>

          {/* Button to show designer info */}
          <motion.div
            className="flex justify-center mb-8"
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
                className="overflow-hidden"
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
