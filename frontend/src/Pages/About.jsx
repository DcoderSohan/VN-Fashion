import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const aboutRef = useRef(null);
  const titleRef = useRef(null);
  const paragraphRef = useRef(null);
  const lettersRef = useRef([]);

  const aboutText = "We specialize in exquisite Aari embroidery, a refined handcraft using a hooked needle to create delicate chain-stitch motifs enhanced with beads, mirrors, metallic zari threads, and intricate embellishments.";

  const designerInfo = {
    name: "Vidisha",
    title: "Master Artisan & Designer",
    bio: "With over a decade of experience in traditional Indian embroidery and contemporary fashion design, Vidisha brings together the best of both worlds. Specializing in Aari embroidery, she creates exquisite pieces that blend traditional craftsmanship with modern aesthetics.",
    expertise: ["Aari Embroidery", "Fabric Painting", "Custom Tailoring", "Traditional & Contemporary Design"],
    achievements: ["10+ Years of Experience", "500+ Custom Designs Created", "Specialized in Bridal Wear"],
  };


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
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 overflow-hidden">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
                About the <span className="text-blue-600">Designer</span>
              </h2>
              
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center mb-8">
                {/* Image Section */}
                <motion.div 
                  className="relative w-full"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="aspect-square rounded-lg overflow-hidden shadow-2xl max-w-md mx-auto md:max-w-full group">
                    <img
                      src="/VN.jpg"
                      alt={designerInfo.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Expertise</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {designerInfo.expertise.map((skill, idx) => (
                    <motion.div
                      key={idx}
                      className="bg-gray-50 p-4 rounded-lg shadow-md text-center font-medium text-gray-800 cursor-pointer group relative overflow-hidden"
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

              {/* Achievements */}
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Achievements</h3>
                <div className="space-y-3 max-w-2xl mx-auto">
                  {designerInfo.achievements.map((achievement, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg shadow-md cursor-pointer group relative overflow-hidden"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ x: 5, scale: 1.02 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <motion.div
                        className="w-2 h-2 bg-blue-600 rounded-full"
                        whileHover={{ scale: 1.5 }}
                      />
                      <span className="text-gray-700 relative z-10">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;

