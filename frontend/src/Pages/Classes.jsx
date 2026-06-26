import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Users, Tag, ChevronRight, Scissors, ArrowRight, X } from 'lucide-react';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { contentApi } from '../utils/api';
import { getImageUrl, formatPrice } from '../utils/helpers';
import { useNavigate } from 'react-router-dom';

const SERIF = { fontFamily: "'Cormorant Garamond', serif" };

const CATEGORIES = ['All', 'Aari Work', 'Embroidery', 'Blouse Design', 'Bridal', 'General'];

const Classes = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedBanner, setSelectedBanner] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanners = async () => {
      setLoading(true);
      const data = await contentApi.getClassBanners();
      setBanners(Array.isArray(data) ? data.filter(b => b.isActive !== false) : []);
      setLoading(false);
    };
    fetchBanners();
  }, []);

  const categories = ['All', ...new Set(banners.map(b => b.category).filter(Boolean))];
  const filtered = activeCategory === 'All'
    ? banners
    : banners.filter(b => b.category === activeCategory);

  const featured = banners.find(b => b.isFeatured);

  const css = `
    .cp-root {
      background: #fbfbfa;
      color: #1a1a1a;
      font-family: 'Inter', sans-serif;
      min-height: 100vh;
      overflow-x: hidden;
      position: relative;
    }
    .cp-wm {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      background-image: url('/VN-3.jpg');
      background-size: cover;
      background-position: center;
      opacity: 0.035;
      filter: grayscale(1);
    }
    .cp-grain {
      position: fixed;
      inset: 0;
      z-index: 0;
      pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
      opacity: 0.022;
      mix-blend-mode: multiply;
    }
    .cp-body { position: relative; z-index: 1; }

    /* Hero strip */
    .cp-hero {
      padding: 140px clamp(20px,5vw,80px) 48px;
      max-width: 1380px;
      margin: 0 auto;
    }
    .gold-bar { width: 40px; height: 1.5px; background: #b8860b; display: inline-block; }

    /* Featured banner */
    .cp-featured {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      background: #ffffff;
      border: 1px solid #eaeae5;
      margin: 0 clamp(20px, 5vw, 80px) 64px;
      overflow: hidden;
      height: 480px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.02);
      cursor: pointer;
      position: relative;
    }
    .cp-featured-content {
      padding: clamp(32px, 6vw, 64px);
      display: flex;
      flex-direction: column;
      justify-content: center;
      background: #faf9f6;
    }
    .cp-featured-img-wrap {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 360px;
      overflow: hidden;
      background: #1a1a1a;
    }
    .cp-featured-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .cp-featured:hover .cp-featured-img { transform: scale(1.04); }
    @media (max-width: 960px) {
      .cp-featured {
        grid-template-columns: 1fr !important;
      }
      .cp-featured-img-wrap {
        height: 320px;
        min-height: 320px;
      }
    }

    /* Category tabs */
    .cp-tabs {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 40px;
      padding: 0 clamp(20px,5vw,80px);
    }
    .cp-tab {
      padding: 10px 20px;
      font-size: 0.65rem;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      font-weight: 600;
      color: #666;
      background: #faf9f6;
      border: 1px solid #e5e2db;
      border-radius: 30px;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .cp-tab:hover {
      color: #1a1a1a;
      border-color: #1a1a1a;
    }
    .cp-tab.active {
      color: #ffffff;
      background: #1a1a1a;
      border-color: #1a1a1a;
    }

    /* Editorial List */
    .cp-list {
      display: flex;
      flex-direction: column;
      gap: 48px;
      margin: 0 clamp(20px,5vw,80px) 80px;
    }
    .cp-row-card {
      display: grid;
      grid-template-columns: 1fr 1fr;
      background: #ffffff;
      border: 1px solid #eaeae5;
      overflow: hidden;
      height: 420px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
      transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
      cursor: pointer;
    }
    .cp-row-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 36px rgba(0, 0, 0, 0.05);
    }
    .cp-row-card.alternate {
      direction: rtl;
    }
    .cp-row-card.alternate > * {
      direction: ltr;
    }
    .cp-row-img-wrap {
      position: relative;
      width: 100%;
      height: 100%;
      min-height: 380px;
      overflow: hidden;
      background: #f5f4f0;
    }
    .cp-row-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .cp-row-card:hover .cp-row-img {
      transform: scale(1.04);
    }
    .cp-row-body {
      padding: clamp(24px, 4vw, 48px);
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    .cp-card-cat {
      font-size: 0.58rem;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      font-weight: 700;
      color: #b8860b;
    }
    .cp-card-title {
      font-size: 1.6rem;
      font-weight: 300;
      color: #1a1a1a;
      line-height: 1.25;
      margin-bottom: 12px;
    }
    .cp-card-desc {
      font-size: 0.82rem;
      color: #666;
      font-weight: 300;
      line-height: 1.65;
      margin-bottom: 20px;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .cp-card-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;
      border-top: 1px solid #f0ede9;
      padding-top: 16px;
    }
    .cp-meta-pill {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 0.65rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 500;
      color: #777;
    }
    .cp-card-price {
      font-size: 1rem;
      font-weight: 600;
      color: #b8860b;
      font-family: 'Cormorant Garamond', serif;
    }
    .cp-badge {
      position: absolute;
      top: 14px;
      left: 14px;
      background: rgba(255, 255, 255, 0.92);
      backdrop-filter: blur(4px);
      color: #b8860b;
      border: 1px solid rgba(184, 134, 11, 0.15);
      font-size: 0.55rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 4px;
      z-index: 2;
    }
    @media (max-width: 768px) {
      .cp-row-card {
        grid-template-columns: 1fr;
        height: auto !important;
      }
      .cp-row-card.alternate {
        direction: ltr;
      }
      .cp-row-img-wrap {
        height: 280px;
        min-height: 280px;
      }
    }

    /* Lightbox / Detail Modal */
    .cp-modal-bg {
      position: fixed;
      inset: 0;
      z-index: 1000;
      background: rgba(10,10,10,0.88);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .cp-modal {
      background: #fbfbfa;
      max-width: 900px;
      width: 100%;
      height: min(600px, 80vh);
      display: grid;
      grid-template-columns: 1fr 1fr;
      position: relative;
      overflow: hidden;
    }
    @media (max-width: 640px) {
      .cp-modal {
        grid-template-columns: 1fr;
        height: auto;
        max-height: 90vh;
        overflow-y: auto;
      }
      .cp-modal-img {
        height: 260px;
        min-height: 260px;
      }
      .cp-modal-body {
        height: auto !important;
        overflow-y: visible !important;
      }
    }
    .cp-modal-img-wrap {
      width: 100%;
      height: 100%;
      overflow: hidden;
      position: relative;
      background: #faf9f6;
    }
    .cp-modal-img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      display: block;
      filter: grayscale(0.1);
    }
    .cp-modal-body {
      padding: 40px 36px;
      display: flex;
      flex-direction: column;
      gap: 20px;
      overflow-y: auto;
      height: 100%;
    }
    .cp-modal-close {
      position: absolute;
      top: 14px;
      right: 14px;
      background: rgba(10,10,10,0.7);
      border: none;
      color: #fff;
      cursor: pointer;
      width: 34px;
      height: 34px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10;
      transition: background 0.2s;
    }
    .cp-modal-close:hover { background: #b8860b; }
    .cp-modal-enroll {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background: #1a1a1a;
      color: #fbfbfa;
      font-size: 0.62rem;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      font-weight: 600;
      padding: 16px 28px;
      border: none;
      cursor: pointer;
      transition: background 0.28s;
      margin-top: auto;
    }
    .cp-modal-enroll:hover { background: #b8860b; }
    .cp-detail-row {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      padding: 12px 0;
      border-bottom: 1px solid #e0dbd3;
    }
    .cp-detail-row:last-of-type { border-bottom: none; }
    .cp-detail-icon {
      width: 30px; height: 30px;
      border: 1px solid #e0dbd3;
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
      color: #b8860b;
    }

    /* Empty state */
    .cp-empty {
      text-align: center;
      padding: 100px 20px;
      color: #aaa;
    }

    /* Skeleton */
    .cp-skel {
      background: linear-gradient(90deg, #f0ede9 25%, #e8e4df 50%, #f0ede9 75%);
      background-size: 200% 100%;
      animation: cp-shimmer 1.4s infinite;
      border-radius: 2px;
    }
    @keyframes cp-shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `;

  return (
    <div className="cp-root">
      <style>{css}</style>
      <div className="cp-wm" />
      <div className="cp-grain" />
      <Navbar />

      <div className="cp-body">
        {/* ── Hero ── */}
        <div className="cp-hero">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <p style={{ fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', fontWeight: 600, color: '#b8860b', marginBottom: '16px' }}>
              VN Fashion — Atelier Sessions
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '20px' }}>
              <h1 style={{ ...SERIF, fontSize: 'clamp(2.8rem, 7vw, 6.5rem)', fontWeight: 300, lineHeight: 0.94, letterSpacing: '-0.02em', color: '#1a1a1a', margin: 0 }}>
                Our <em style={{ fontStyle: 'italic' }}>Classes.</em>
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingBottom: '8px' }}>
                <span className="gold-bar" />
                <p style={{ fontSize: '0.78rem', color: '#888', fontWeight: 300, maxWidth: '300px', lineHeight: 1.65, margin: 0 }}>
                  Learn the art of Aari embroidery and bespoke fashion design from master artisans.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Featured Banner ── */}
        {!loading && featured && (
          <motion.div
            className="cp-featured"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            onClick={() => setSelectedBanner(featured)}
          >
            <div className="cp-featured-content">
              <p style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 700, color: '#b8860b', marginBottom: '16px' }}>
                ✦ Featured Masterclass
              </p>
              <h2 style={{ ...SERIF, fontSize: 'clamp(1.8rem, 3.2vw, 3rem)', fontWeight: 300, color: '#1a1a1a', lineHeight: 1.15, marginBottom: '18px' }}>
                {featured.title}
              </h2>
              {featured.description && (
                <p style={{ fontSize: '0.85rem', color: '#666', fontWeight: 300, lineHeight: 1.75, marginBottom: '28px' }}>
                  {featured.description}
                </p>
              )}
              
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center', marginTop: 'auto', paddingTop: '20px' }}>
                {featured.price && (
                  <span style={{ fontSize: '1.25rem', fontWeight: 500, color: '#b8860b', letterSpacing: '0.02em', fontFamily: "'Cormorant Garamond', serif" }}>
                    {featured.price}
                  </span>
                )}
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, color: '#1a1a1a' }}>
                  Explore Details <ArrowRight size={14} style={{ color: '#b8860b' }} />
                </span>
              </div>
            </div>
            <div className="cp-featured-img-wrap">
              <img
                src={getImageUrl(featured.image)}
                alt={featured.title}
                className="cp-featured-img"
                onError={e => { e.target.parentElement.style.display = 'none'; e.target.style.display = 'none'; }}
              />
            </div>
          </motion.div>
        )}

        {/* ── Category Tabs ── */}
        <div className="cp-tabs">
          {categories.map(cat => (
            <button
              key={cat}
              className={`cp-tab${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Grid ── */}
        {loading ? (
          <div className="cp-list">
            {[1, 2].map((i) => (
              <div key={i} className={`cp-row-card${i % 2 === 1 ? ' alternate' : ''}`} style={{ cursor: 'default' }}>
                <div className="cp-row-img-wrap">
                  <div className="cp-skel" style={{ width: '100%', height: '100%', borderRadius: 0 }} />
                </div>
                <div className="cp-row-body" style={{ width: '100%' }}>
                  <div className="cp-skel" style={{ width: '80px', height: '10px', marginBottom: '16px' }} />
                  <div className="cp-skel" style={{ width: '60%', height: '28px', marginBottom: '14px' }} />
                  <div className="cp-skel" style={{ width: '90%', height: '12px', marginBottom: '8px' }} />
                  <div className="cp-skel" style={{ width: '80%', height: '12px', marginBottom: '24px' }} />
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <div className="cp-skel" style={{ width: '80px', height: '14px' }} />
                    <div className="cp-skel" style={{ width: '80px', height: '14px' }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="cp-empty">
            <Scissors size={40} color="#e0dbd3" strokeWidth={1} style={{ marginBottom: '20px' }} />
            <p style={{ fontSize: '0.8rem', fontWeight: 300 }}>
              {banners.length === 0 ? 'No classes available yet. Check back soon!' : 'No classes in this category.'}
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="cp-list"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((banner, i) => (
                <motion.div
                  key={banner._id}
                  layout
                  className={`cp-row-card${i % 2 === 1 ? ' alternate' : ''}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 0.61, 0.36, 1] }}
                  onClick={() => setSelectedBanner(banner)}
                >
                  <div className="cp-row-img-wrap">
                    {banner.isFeatured && (
                      <span className="cp-badge">Featured</span>
                    )}
                    <img
                      src={getImageUrl(banner.image)}
                      alt={banner.title}
                      className="cp-row-img"
                      loading="lazy"
                      onError={e => { e.target.parentElement.style.background = '#2a2a2a'; e.target.style.display = 'none'; }}
                    />
                  </div>
                  <div className="cp-row-body">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
                      {banner.category && <span className="cp-card-cat">{banner.category}</span>}
                      {banner.price && <span className="cp-card-price">{banner.price}</span>}
                    </div>
                    <h3 className="cp-card-title" style={SERIF}>
                      {banner.title}
                    </h3>
                    {banner.description && (
                      <p className="cp-card-desc" style={{ WebkitLineClamp: 3 }}>
                        {banner.description}
                      </p>
                    )}
                    <div className="cp-card-meta">
                      {banner.duration && (
                        <span className="cp-meta-pill">
                          <Clock size={12} /> {banner.duration}
                        </span>
                      )}
                      {banner.schedule && (
                        <span className="cp-meta-pill">
                          <Calendar size={12} /> {banner.schedule}
                        </span>
                      )}
                      {banner.seats && (
                        <span className="cp-meta-pill">
                          <Users size={12} /> {banner.seats} seats
                        </span>
                      )}
                    </div>
                    <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600, color: '#1a1a1a' }}>
                      View Details & Enroll <ArrowRight size={13} style={{ color: '#b8860b' }} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── Bottom strip ── */}
        <motion.div
          style={{
            borderTop: '1px solid #e0dbd3',
            padding: '28px clamp(20px,5vw,80px)',
            display: 'flex', flexWrap: 'wrap', alignItems: 'center',
            justifyContent: 'space-between', gap: '18px',
            background: '#fbfbfa',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span className="gold-bar" />
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, color: '#888' }}>
              Interested in joining a class?
            </span>
          </div>
          <button
            onClick={() => navigate('/booking')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#1a1a1a', color: '#fbfbfa', border: 'none', cursor: 'pointer', padding: '13px 24px', fontSize: '0.62rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600, transition: 'background 0.28s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#b8860b'}
            onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}
          >
            Book a Consultation <ArrowRight size={13} />
          </button>
        </motion.div>
      </div>

      <Footer />

      {/* ── Detail Modal ── */}
      <AnimatePresence>
        {selectedBanner && (
          <motion.div
            className="cp-modal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={e => { if (e.target === e.currentTarget) setSelectedBanner(null); }}
          >
            <motion.div
              className="cp-modal"
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.35, ease: [0.22, 0.61, 0.36, 1] }}
            >
              {selectedBanner.image && (
                <div className="cp-modal-img-wrap">
                  <img
                    src={getImageUrl(selectedBanner.image)}
                    alt={selectedBanner.title}
                    className="cp-modal-img"
                    onError={e => { e.target.parentElement.style.display = 'none'; e.target.style.display = 'none'; }}
                  />
                </div>
              )}

              <div className="cp-modal-body">
                {selectedBanner.category && (
                  <p style={{ fontSize: '0.56rem', letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 700, color: '#b8860b' }}>
                    {selectedBanner.category}
                  </p>
                )}
                <h2 style={{ ...SERIF, fontSize: '2rem', fontWeight: 300, color: '#1a1a1a', lineHeight: 1.1, margin: 0 }}>
                  {selectedBanner.title}
                </h2>
                {selectedBanner.subtitle && (
                  <p style={{ fontSize: '0.85rem', color: '#666', fontWeight: 300 }}>
                    {selectedBanner.subtitle}
                  </p>
                )}
                {selectedBanner.description && (
                  <p style={{ fontSize: '0.82rem', color: '#777', lineHeight: 1.75, fontWeight: 300 }}>
                    {selectedBanner.description}
                  </p>
                )}

                <div>
                  {selectedBanner.instructor && (
                    <div className="cp-detail-row">
                      <div className="cp-detail-icon"><Tag size={12} /></div>
                      <div>
                        <p style={{ fontSize: '0.52rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#aaa', fontWeight: 600, marginBottom: '3px' }}>Instructor</p>
                        <p style={{ fontSize: '0.85rem', color: '#1a1a1a', fontWeight: 300 }}>{selectedBanner.instructor}</p>
                      </div>
                    </div>
                  )}
                  {selectedBanner.duration && (
                    <div className="cp-detail-row">
                      <div className="cp-detail-icon"><Clock size={12} /></div>
                      <div>
                        <p style={{ fontSize: '0.52rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#aaa', fontWeight: 600, marginBottom: '3px' }}>Duration</p>
                        <p style={{ fontSize: '0.85rem', color: '#1a1a1a', fontWeight: 300 }}>{selectedBanner.duration}</p>
                      </div>
                    </div>
                  )}
                  {selectedBanner.schedule && (
                    <div className="cp-detail-row">
                      <div className="cp-detail-icon"><Calendar size={12} /></div>
                      <div>
                        <p style={{ fontSize: '0.52rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#aaa', fontWeight: 600, marginBottom: '3px' }}>Schedule</p>
                        <p style={{ fontSize: '0.85rem', color: '#1a1a1a', fontWeight: 300 }}>{selectedBanner.schedule}</p>
                      </div>
                    </div>
                  )}
                  {selectedBanner.seats && (
                    <div className="cp-detail-row">
                      <div className="cp-detail-icon"><Users size={12} /></div>
                      <div>
                        <p style={{ fontSize: '0.52rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#aaa', fontWeight: 600, marginBottom: '3px' }}>Availability</p>
                        <p style={{ fontSize: '0.85rem', color: '#1a1a1a', fontWeight: 300 }}>{selectedBanner.seats} seats available</p>
                      </div>
                    </div>
                  )}
                  {selectedBanner.price && (
                    <div style={{ padding: '16px 0', marginTop: '4px' }}>
                      <p style={{ fontSize: '0.52rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#aaa', fontWeight: 600, marginBottom: '6px' }}>Investment</p>
                      <p style={{ fontSize: '1.5rem', fontWeight: 600, color: '#b8860b', ...SERIF }}>{selectedBanner.price}</p>
                    </div>
                  )}
                </div>

                <button
                  className="cp-modal-enroll"
                  onClick={() => { setSelectedBanner(null); navigate('/booking'); }}
                >
                  Enroll / Book Now <ArrowRight size={13} />
                </button>
              </div>

              <button className="cp-modal-close" onClick={() => setSelectedBanner(null)}>
                <X size={15} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Classes;
