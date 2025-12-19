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
    fullBiography: "Vidisha's journey in fashion design began over a decade ago when she discovered her passion for traditional Indian embroidery techniques. With a background in textile design and years of apprenticeship under master artisans, she has honed her skills in Aari embroidery, fabric painting, and custom tailoring. Her work has been featured in numerous fashion shows and has earned her recognition as a master artisan. Vidisha believes in preserving traditional craftsmanship while adapting to contemporary fashion trends, creating pieces that are both timeless and modern.",
    education: "Textile Design Degree, Fashion Institute",
    expertise: ["Aari Embroidery", "Fabric Painting", "Custom Tailoring", "Traditional & Contemporary Design"],
    achievements: ["10+ Years of Experience", "500+ Custom Designs Created", "Specialized in Bridal Wear"],
    designPhilosophy: "Fashion is not just about clothing; it's about storytelling, preserving heritage, and celebrating individuality. My design philosophy centers on three core principles: authenticity, craftsmanship, and personalization. I believe every piece should tell a story, reflect the wearer's personality, and honor the rich traditions of Indian textile art while embracing contemporary aesthetics.",
    timeline: [
      { year: "2013", event: "Started journey in fashion design", description: "Began apprenticeship with master artisans" },
      { year: "2015", event: "Established VN Fashion", description: "Launched custom design studio" },
      { year: "2017", event: "First bridal collection", description: "Created exclusive bridal wear line" },
      { year: "2019", event: "Award recognition", description: "Received recognition for traditional craftsmanship" },
      { year: "2021", event: "500+ designs milestone", description: "Completed 500+ custom designs" },
      { year: "2024", event: "Expanding services", description: "Added costume rental and expanded offerings" },
    ],
    testimonials: [
      {
        name: "Priya Sharma",
        role: "Bride",
        text: "Vidisha created the most beautiful bridal lehenga for my wedding. The Aari work was exquisite, and the attention to detail was incredible. I felt like a princess!",
        rating: 5
      },
      {
        name: "Anjali Patel",
        role: "Client",
        text: "I've been a client for 3 years now. Every piece is unique and perfectly tailored. Vidisha truly understands her craft and brings your vision to life.",
        rating: 5
      },
      {
        name: "Ravi Kumar",
        role: "Event Organizer",
        text: "We've worked with VN Fashion for multiple events. Their costume rental service is excellent, and the quality is always top-notch. Highly recommended!",
        rating: 5
      },
      {
        name: "Meera Desai",
        role: "Fashion Enthusiast",
        text: "The fabric painting work is absolutely stunning. Each piece is a work of art. Vidisha's creativity and skill are unmatched in the industry.",
        rating: 5
      }
    ]
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
                  <div className="aspect-square rounded-lg overflow-hidden shadow-2xl max-w-xs sm:max-w-sm md:max-w-md mx-auto md:max-w-full group">
                    <img
                      src="/VN.jpg"
                      alt={designerInfo.name}
                      loading="lazy"
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

              {/* Achievements */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">Achievements</h3>
                <div className="space-y-2 sm:space-y-3 max-w-2xl mx-auto">
                  {designerInfo.achievements.map((achievement, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center gap-2 sm:gap-3 bg-gray-50 p-3 sm:p-4 rounded-lg shadow-md cursor-pointer group relative overflow-hidden"
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
                        className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"
                        whileHover={{ scale: 1.5 }}
                      />
                      <span className="text-gray-700 relative z-10 text-sm sm:text-base">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Full Biography */}
          <motion.section
            className="mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 lg:p-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
                Biography
              </h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg mb-4 sm:mb-6">
                  {designerInfo.fullBiography}
                </p>
                <div className="bg-blue-50 p-4 sm:p-6 rounded-lg border-l-4 border-blue-600">
                  <p className="text-gray-700 text-sm sm:text-base">
                    <span className="font-semibold">Education: </span>
                    {designerInfo.education}
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Design Philosophy */}
          <motion.section
            className="mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 lg:p-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
                Design Philosophy
              </h2>
              <div className="max-w-4xl mx-auto">
                <p className="text-gray-700 leading-relaxed text-base sm:text-lg text-center">
                  {designerInfo.designPhilosophy}
                </p>
              </div>
            </div>
          </motion.section>

          {/* Timeline */}
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
              <div className="max-w-4xl mx-auto">
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-4 sm:left-6 md:left-8 top-0 bottom-0 w-0.5 bg-blue-200 hidden sm:block"></div>
                  
                  {designerInfo.timeline.map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="relative mb-6 sm:mb-8 md:flex md:items-start md:gap-6"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-2 sm:left-4 md:relative md:left-0 w-3 h-3 sm:w-4 sm:h-4 bg-blue-600 rounded-full border-2 sm:border-4 border-white shadow-lg z-10 flex-shrink-0"></div>
                      
                      {/* Content */}
                      <div className="ml-8 sm:ml-12 md:ml-0 md:flex-1 bg-gray-50 p-4 sm:p-6 rounded-lg">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                          <span className="text-xl sm:text-2xl font-bold text-blue-600">{item.year}</span>
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{item.event}</h3>
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* Testimonials */}
          <motion.section
            className="mb-12 sm:mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 lg:p-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
                Client Testimonials
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {designerInfo.testimonials.map((testimonial, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-md"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.02, shadow: "lg" }}
                  >
                    <div className="flex items-center gap-1 mb-3 sm:mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-lg sm:text-xl">★</span>
                      ))}
                    </div>
                    <p className="text-gray-700 mb-3 sm:mb-4 italic text-sm sm:text-base">"{testimonial.text}"</p>
                    <div className="border-t pt-3 sm:pt-4">
                      <p className="font-semibold text-gray-900 text-sm sm:text-base">{testimonial.name}</p>
                      <p className="text-xs sm:text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </motion.div>
                ))}
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

