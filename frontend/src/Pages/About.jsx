import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
  const [timelineData, setTimelineData] = useState([]);
  const [aboutData, setAboutData] = useState({
    aboutText: "We construct artifacts of intentional identity. VN Fashion serves as a laboratory for sartorial experimentation, where textiles are treated as structural components to redefine the modern silhouette.",
    designerName: "VIDISHA NATEKAR",
    designerTitle: "FOUNDER & CREATIVE DIRECTOR",
    designerBio: "With over a decade of experience in traditional handcrafts and contemporary fashion design, Vidisha Natekar brings together the best of both worlds. She creates exquisite pieces that blend traditional craftsmanship with modern aesthetics.",
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
            aboutText: data.aboutText || "We construct artifacts of intentional identity. VN Fashion serves as a laboratory for sartorial experimentation, where textiles are treated as structural components to redefine the modern silhouette.",
            designerName: data.designerName || "VIDISHA NATEKAR",
            designerTitle: data.designerTitle || "FOUNDER & CREATIVE DIRECTOR",
            designerBio: data.designerBio || "With a background in architectural texturing and years of apprenticeship under master artisans, Vidisha Natekar brings together the best of both worlds. She creates exquisite pieces that blend traditional craftsmanship with modern aesthetics.",
            designerImage: data.designerImage || "/Me.jpg"
          });
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
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          }
        );
      }

      // Smooth paragraph fade-in and slide-up animation
      if (paragraphRef.current) {
        gsap.fromTo(paragraphRef.current,
          { opacity: 0, y: 15 },
          {
            scrollTrigger: {
              trigger: paragraphRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse",
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          }
        );
      }
    }, aboutRef);

    return () => ctx.revert();
  }, [loading]);

  return (
    <div className="ab-page-root min-h-screen bg-[#fbfbfa] text-gray-900 overflow-x-hidden relative font-sans">
      {/* Faded background watermark image */}
      <div className="ab-faded-bg" aria-hidden="true">
        <img
          src="/VN-5.jpg"
          alt=""
          onError={(e) => {
            e.target.src = getImageUrl(aboutData.designerImage) || "/HeroBg.jpg";
            e.target.onerror = (err) => { err.target.src = "/HeroBg.jpg"; };
          }}
        />
      </div>

      {/* Organic film grain texture */}
      <div className="ab-grain" aria-hidden="true" />

      <Navbar />

      {/* ── 1. EDITORIAL HEADER & PHILOSOPHY ── */}
      <div ref={aboutRef} className="pt-36 pb-12 px-8 lg:px-20 relative z-10 max-w-6xl mx-auto w-full">
        <motion.div
          className="mb-16 text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#b8860b] mb-3 font-bold">OUR HERITAGE — EST. 2024</p>
          <h1 ref={titleRef} className="text-5xl sm:text-7xl lg:text-[6.5rem] font-light leading-[0.95] tracking-tight text-gray-955 mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            <em>The</em> Art<br />
            <span className="bg-gradient-to-r from-[#b8860b] via-[#8b6914] to-[#c9a84c] bg-clip-text text-transparent italic font-normal">of Sartorial Identity</span>
          </h1>
          <div className="w-24 h-[1px] bg-[#b8860b] mt-8" />
        </motion.div>

        {/* Spacious Philosophy Block Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="max-w-4xl mx-auto px-4 sm:px-8 mb-20 text-center"
        >
          <p className="text-lg sm:text-xl lg:text-2xl font-light text-gray-700 leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
            "{aboutData.aboutText}"
          </p>
        </motion.div>
      </div>

      {/* ── 2. THE GRID MOSAIC (Asymmetrical 3-Column Columnar) ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto px-8 lg:px-20 mb-32 relative z-10">

        {/* Left Column: Portrait featuring vidisha.jpg */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative group w-full col-span-1"
        >
          {/* Decorative offset gold frame */}
          <div className="absolute -inset-3 border border-[#b8860b] opacity-25 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none" />

          {/* Portrait Container */}
          <div className="w-full relative overflow-hidden bg-gray-100 aspect-[3/4] border border-gray-200/50 shadow-md">
            <img
              src={getImageUrl(aboutData.designerImage) || "/vidisha.jpg"}
              alt={aboutData.designerName || "Vidisha"}
              className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              onError={(e) => {
                e.target.src = "/vidisha.jpg";
                e.target.onerror = (err) => { err.target.src = "/Me.jpg"; };
              }}
            />
            {/* Warm amber overlay multiply */}
            <div className="absolute inset-0 bg-[rgba(212,175,55,0.04)] mix-blend-multiply opacity-100 group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
          </div>
        </motion.div>

        {/* Center Column: Biography & Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-white border border-gray-150/70 p-8 rounded-sm shadow-sm flex flex-col justify-between"
        >
          <div>
            <p className="text-[9px] tracking-[0.25em] uppercase text-[#b8860b] mb-2 font-bold">THE DESIGNER</p>
            <h3 className="text-3xl font-light text-gray-950 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              {aboutData.designerName || "Vidisha"}
            </h3>
            {(() => {
              const cleanTitle = aboutData.designerTitle && aboutData.designerTitle.toUpperCase() !== 'DOE'
                ? aboutData.designerTitle
                : "FOUNDER & CREATIVE DIRECTOR";
              return (
                <p className="text-[8px] tracking-[0.2em] uppercase text-gray-400 mb-6 font-semibold">
                  {cleanTitle}
                </p>
              );
            })()}

            {/* Bio with smooth scroll-triggered text reveal */}
            <p
              ref={paragraphRef}
              className="text-xs text-gray-650 leading-relaxed tracking-wide font-light mb-8"
              style={{ opacity: 0 }}
            >
              {aboutData.designerBio || "With a background in architectural texturing and years of apprenticeship under master artisans, Vidisha Natekar brings together the best of both worlds. She creates exquisite pieces that blend traditional craftsmanship with modern aesthetics."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
            <div className="flex flex-col gap-0.5">
              <span className="text-[8px] tracking-[0.15em] uppercase text-[#b8860b] font-bold">EXPERIENCE</span>
              <span className="text-base font-light text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>10+ Years</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[8px] tracking-[0.15em] uppercase text-[#b8860b] font-bold">MILESTONE</span>
              <span className="text-base font-light text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>500+ Designs</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Brand Ribbon & Accreditations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col justify-between items-stretch bg-[#faf9f7] border border-gray-150/70 p-8 rounded-sm shadow-sm"
        >
          {/* Brand Ribbon Banner */}
          <div className="flex justify-between items-center pb-6 border-b border-gray-200/60">
            <span className="text-[9px] tracking-[0.3em] uppercase text-[#b8860b] font-bold">VN STUDIO</span>
            <span className="text-[9px] tracking-[0.2em] uppercase text-gray-400">EST. 2024</span>
          </div>

          {/* Certifications Badge Layout */}
          <div className="py-6 flex-grow flex flex-col justify-center">
            <p className="text-[8px] tracking-[0.2em] uppercase text-gray-400 font-bold mb-4">ACCREDITATIONS</p>
            {certificates.length > 0 ? (
              <div className="flex flex-col gap-2.5">
                {certificates.map((cert, idx) => (
                  <div key={cert._id || idx} className="text-[10px] tracking-[0.1em] text-gray-850 uppercase bg-white border border-gray-200/80 px-4 py-2.5 rounded-sm hover:border-[#b8860b] transition-all duration-300 shadow-xs hover:shadow-sm">
                    • {cert.title}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-2.5">
                {["Traditional Textile Craft", "Contemporary Silhouette Design", "Artisanal Draping"].map((item, idx) => (
                  <div key={idx} className="text-[10px] tracking-[0.1em] text-gray-850 uppercase bg-white border border-gray-200/80 px-4 py-2.5 rounded-sm hover:border-[#b8860b] transition-all duration-300 shadow-xs hover:shadow-sm">
                    • {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Vertical brand decorative tag */}
          <div className="pt-6 border-t border-gray-200/60 text-center">
            <p className="text-[8px] tracking-[0.4em] uppercase text-gray-450">COUTURE ATELIER</p>
          </div>
        </motion.div>

      </div>

      {/* ── 3. CHRONOLOGICAL GALLERY GRID (Horizontal Milestone Row) ── */}
      <div className="pt-28 border-t border-gray-200">
        <div className="max-w-6xl mx-auto w-full px-8 lg:px-20 mb-16">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#b8860b] mb-3 font-bold">CHRONOLOGY</p>
          <h2 className="text-4xl lg:text-5xl font-light text-gray-950 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            Career Gallery
          </h2>
          <div className="w-16 h-[1px] bg-[#b8860b] mt-6" />
        </div>

        {/* Chronology Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto px-8 lg:px-20 mb-32 relative z-10">
          {designerInfo.timeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: idx * 0.05 }}
              className="group bg-white border border-gray-150/70 p-8 rounded-sm hover:border-[#b8860b]/35 hover:shadow-md transition-all duration-500 flex flex-col justify-between min-h-[220px]"
            >
              <div>
                {/* Gold Year Tag */}
                <span className="text-2xl font-light text-[#b8860b] italic block mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {item.year}
                </span>
                {/* Minimalist divider rule */}
                <div className="w-6 h-[1.5px] bg-[#b8860b] mb-4 transform scale-x-100 group-hover:scale-x-150 transition-transform duration-500 origin-left" />

                <h4 className="text-sm font-semibold text-gray-900 mb-2">{item.event}</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-light tracking-wide">{item.description}</p>
              </div>

              {/* Bottom count badge */}
              <span className="text-[8px] tracking-[0.15em] text-gray-400 uppercase mt-6 block">
                PHASE 0{idx + 1}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── BOTTOM CALL TO ACTION ── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-20 pt-20 border-t border-gray-200 text-center max-w-3xl mx-auto px-8 relative z-10"
      >
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#b8860b] mb-4 font-bold">START YOUR EXPERIENCE</p>
        <h3 className="text-4xl sm:text-5xl font-light text-gray-955 mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
          Begin Your Sartorial Journey
        </h3>
        <p className="text-xs text-gray-500 max-w-lg mx-auto mb-10 leading-relaxed font-light">
          Let us construct an artifact of intentional identity tailored specifically to your silhouette. Book an appointment at our atelier.
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

export default About;
