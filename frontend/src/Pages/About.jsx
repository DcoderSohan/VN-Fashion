import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const [certificates, setCertificates] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [aboutData, setAboutData] = useState({
    aboutText: "We construct artifacts of intentional identity. VN Fashion serves as a laboratory for sartorial experimentation, where textiles are treated as structural components to redefine the modern silhouette.",
    designerName: "Viktor Nikolai",
    designerTitle: "FOUNDER & CREATIVE DIRECTOR",
    designerBio: "With over a decade of experience in traditional handcrafts and contemporary fashion design, Viktor Nikolai brings together the best of both worlds. He creates exquisite pieces that blend traditional craftsmanship with modern aesthetics.",
    designerImage: "/Me.jpg"
  });
  const [loading, setLoading] = useState(true);

  // Fetch about content, achievements, and timeline from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch about data
        const data = await contentApi.getAbout();
        if (data) {
          setAboutData({
            aboutText: data.aboutText || data.aboutText,
            designerName: data.designerName || "Viktor Nikolai",
            designerTitle: data.designerTitle || "FOUNDER & CREATIVE DIRECTOR",
            designerBio: data.designerBio || data.designerBio,
            designerImage: data.designerImage || "/Me.jpg"
          });
        }

        // Fetch achievements
        const achievementsData = await contentApi.getAchievements();
        if (Array.isArray(achievementsData) && achievementsData.length > 0) {
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
    timeline: timelineData.length > 0 ? timelineData.map(item => ({
      year: item.year || '',
      event: item.event || item.title || '',
      description: item.description || ''
    })) : [
      { 
        year: "2013", 
        event: "Started journey in fashion design", 
        description: "Began apprenticeship with master artisans"
      },
      { 
        year: "2015", 
        event: "Established VN Fashion", 
        description: "Launched custom design studio"
      },
      { 
        year: "2017", 
        event: "First bridal collection", 
        description: "Created exclusive bridal wear line"
      },
      { 
        year: "2019", 
        event: "Award recognition", 
        description: "Received recognition for traditional craftsmanship"
      },
      { 
        year: "2021", 
        event: "500+ designs milestone", 
        description: "Completed 500+ custom designs"
      },
      { 
        year: "2024", 
        event: "Expanding services", 
        description: "Added costume rental and expanded offerings"
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
        setCertificates([]);
      }
    };

    fetchCertificates();
  }, []);

  // Split text into letters for animation
  const splitTextIntoLetters = (text) => {
    if (!text) return "";
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
          duration: 0.05,
          stagger: 0.015,
          ease: "power2.out",
        });
      }
    }, aboutRef);

    return () => ctx.revert();
  }, [loading]);

  return (
    <div className="min-h-screen bg-[#f5f4f2] overflow-x-hidden font-sans text-gray-950">
      <Navbar />
      <div className="pt-28 pb-20 px-8 lg:px-20">
        <div ref={aboutRef} className="max-w-6xl mx-auto w-full">
          {/* Section Header */}
          <motion.div
            className="mb-16 text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[10px] tracking-[0.3em] uppercase text-gray-400 mb-2">ABOUT THE STUDIO</p>
            <h1 ref={titleRef} className="text-4xl sm:text-5xl lg:text-[4.5rem] font-light text-gray-955 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              The Visionary
            </h1>
          </motion.div>

          {/* Designer Bio Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start mb-24">
            {/* Left: Designer Portrait */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full relative overflow-hidden bg-gray-100"
              style={{ aspectRatio: "3/4" }}
            >
              <img
                src={getImageUrl(aboutData.designerImage) || "/Me.jpg"}
                alt={aboutData.designerName || "Viktor Nikolai"}
                className="w-full h-full object-cover grayscale transition-transform duration-700 hover:scale-105"
                onError={(e) => {
                  e.target.src = "/Me.jpg";
                }}
              />
            </motion.div>

            {/* Right: Biography Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex flex-col justify-center"
            >
              <h3 className="text-3xl font-light text-gray-950 mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                {aboutData.designerName || "Viktor Nikolai"}
              </h3>
              <p className="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-6 font-semibold">
                {aboutData.designerTitle || "FOUNDER & CREATIVE DIRECTOR"}
              </p>
              
              <p ref={paragraphRef} className="text-xs text-gray-500 leading-relaxed mb-8 tracking-wide font-light">
                {splitTextIntoLetters(aboutData.designerBio || "With a background in architectural texturing and years of apprenticeship under master artisans, Viktor Nikolai brings together the best of both worlds. He creates exquisite pieces that blend traditional craftsmanship with modern aesthetics.")}
              </p>

              {/* Minimal Metrics */}
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-200">
                <div>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-2">01 EXPERIENCE</p>
                  <p className="text-base font-light text-gray-955" style={{ fontFamily: "'Cormorant Garamond', serif" }}>10+ Years of Craftsmanship</p>
                </div>
                <div>
                  <p className="text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-2">02 MILESTONE</p>
                  <p className="text-base font-light text-gray-955" style={{ fontFamily: "'Cormorant Garamond', serif" }}>500+ Custom Designs</p>
                </div>
              </div>

              {/* Achievements & Certificates */}
              {certificates.length > 0 && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-[9px] tracking-[0.2em] uppercase text-gray-400 mb-3">CERTIFICATIONS</p>
                  <div className="flex flex-wrap gap-x-6 gap-y-2">
                    {certificates.map((cert, idx) => (
                      <span key={cert._id || idx} className="text-[10px] tracking-[0.1em] text-gray-600 uppercase font-semibold">
                        • {cert.title}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Minimal Career Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="pt-16 border-t border-gray-200"
          >
            <h2 className="text-2xl font-light text-gray-950 mb-12" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Career Timeline
            </h2>
            
            <div className="space-y-12">
              {designerInfo.timeline.map((item, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4 md:gap-12 items-start border-b border-gray-100 pb-8 last:border-0">
                  <div className="text-[11px] tracking-[0.25em] uppercase text-gray-400 font-bold md:pt-1">
                    {item.year}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-955 mb-2">{item.event}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed font-light tracking-wide">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
