import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { contentApi } from "../../utils/api";
import { getImageUrl } from "../../utils/helpers";

const SERIF = "'Playfair Display', 'Times New Roman', serif";
const SANS = "'Raleway', system-ui, sans-serif";

const FALLBACKS = [
  { id: "f1", title: "Noir Collection", image: "/VN-1.jpg", category: "Bridal", description: "Exquisite handcrafted bridal wear", featured: true },
  { id: "f2", title: "Iridescent Weave", image: "/VN-2.jpg", category: "Textile Art", description: "Structural fabric manipulation", featured: false },
  { id: "f3", title: "Chromatic Portrait", image: "/VN-3.jpg", category: "Avant-Garde", description: "Futuristic couture editorial", featured: false },
  { id: "f4", title: "Artisan Detail", image: "/aariWork.jpg", category: "Aari Work", description: "Hand-embroidered signature pieces", featured: false },
];

const FeaturedWorks = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await contentApi.getGallery();
        const items = data.map((item, i) => ({
          id: item._id || i + 1,
          title: item.title || "Untitled",
          image: getImageUrl(item.image) || FALLBACKS[i % FALLBACKS.length].image,
          category: item.category || "Collection",
          description: item.description || "Exquisite handcrafted design",
          featured: item.featured || false,
        }));
        // Bubble featured to top
        const sorted = [
          ...items.filter(w => w.featured),
          ...items.filter(w => !w.featured),
        ];
        setGalleryItems(sorted);
      } catch (_) {
        setGalleryItems(FALLBACKS);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const works = useMemo(() => {
    const list = galleryItems.slice(0, 4);
    while (list.length < 4) list.push(FALLBACKS[list.length]);
    return list;
  }, [galleryItems]);

  return (
    <section className="fw-root" aria-label="Featured Works">
      <div className="fw-inner">

        {/* ── Header ── */}
        <div className="fw-header">
          <div className="fw-header-left">
            <span className="fw-eyebrow" style={{ fontFamily: SANS }}>
              Selected Works
            </span>
            <h2 className="fw-heading" style={{ fontFamily: SERIF }}>
              Featured <em>Collection</em>
            </h2>
          </div>
          <Link to="/gallery" className="fw-viewall" style={{ fontFamily: SANS }}>
            <span className="fw-viewall-fill" />
            <span className="fw-viewall-text">View All</span>
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"
              stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
              strokeLinejoin="round" aria-hidden="true" className="fw-viewall-arrow">
              <line x1="0" y1="7" x2="12" y2="7" />
              <polyline points="7,2 12,7 7,12" />
            </svg>
          </Link>
        </div>

        {/* ── Checkerboard Layout ── */}
        {loading ? (
          <div className="fw-skeleton">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="fw-skel-row">
                <div className="fw-skel-img" />
                <div className="fw-skel-text" />
              </div>
            ))}
          </div>
        ) : (
          <div className="fw-checkerboard">
            {works.map((work, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={work.id || idx}
                  className={`fw-row ${isEven ? "fw-row-normal" : "fw-row-reverse"}`}
                >
                  {/* Image Column */}
                  <div className="fw-img-col">
                    <div className="fw-img-wrapper">
                      <img
                        src={work.image}
                        alt={work.title}
                        className="fw-img"
                        loading="lazy"
                        onError={(e) => { e.target.src = FALLBACKS[idx % FALLBACKS.length].image; }}
                      />
                      {/* Dark veil – fades out on hover */}
                      <div className="fw-overlay" />
                      {/* Color shimmer – fades IN on hover */}
                      <div className="fw-color-shimmer" />
                      {/* Scanline glint */}
                      <div className="fw-glint" />
                      {work.featured && (
                        <span className="fw-badge" style={{ fontFamily: SANS }}>
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className="fw-content-col">
                    <div className="fw-content-box">
                      <div className="fw-meta-header">
                        <span className="fw-num" style={{ fontFamily: SANS }}>0{idx + 1}</span>
                        <span className="fw-separator">/</span>
                        <span className="fw-cat" style={{ fontFamily: SANS }}>{work.category}</span>
                      </div>
                      <h3 className="fw-title" style={{ fontFamily: SERIF }}>{work.title}</h3>
                      <p className="fw-desc" style={{ fontFamily: SANS }}>{work.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* ── Scoped Styles ── */}
      <style>{`
        /* Root */
        .fw-root {
          width: 100%;
          background: #f8f7f5;
          padding: 5rem 0 5.5rem;
        }

        /* Inner */
        .fw-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 3rem;
        }
        @media (max-width: 1023px) { .fw-inner { padding: 0 2rem; } }
        @media (max-width: 640px)  { .fw-inner { padding: 0 1.25rem; } }

        /* Header */
        .fw-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 3.5rem;
          gap: 1rem;
        }
        .fw-eyebrow {
          display: block;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #9ca3af;
          margin-bottom: 0.6rem;
        }
        .fw-heading {
          font-size: clamp(1.9rem, 3.5vw, 3rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.01em;
          color: #0a0a0a;
          margin: 0;
        }
        .fw-heading em {
          font-style: italic;
          font-weight: 400;
          background: linear-gradient(110deg, #b8860b 0%, #c9a84c 60%, #e4c97e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* View All CTA */
        .fw-viewall {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          overflow: hidden;
          text-decoration: none;
          border: 1.5px solid #0a0a0a;
          padding: 0.65rem 1.3rem;
          color: #0a0a0a;
          flex-shrink: 0;
          transition: color 0.4s ease;
          white-space: nowrap;
        }
        .fw-viewall-fill {
          position: absolute;
          inset: 0;
          width: 0;
          background: #0a0a0a;
          transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .fw-viewall:hover .fw-viewall-fill { width: 100%; }
        .fw-viewall:hover { color: #ffffff; }
        .fw-viewall-text {
          position: relative;
          z-index: 1;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .fw-viewall-arrow {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }
        .fw-viewall:hover .fw-viewall-arrow { transform: translateX(4px); }

        /* Checkerboard grid container */
        .fw-checkerboard {
          display: flex;
          flex-direction: column;
          gap: 4rem;
          width: 100%;
          padding: 2rem 0;
        }

        /* Single row base */
        .fw-row {
          display: flex;
          align-items: center;
          width: 100%;
          gap: 4rem;
          background: #ffffff;
          border: 1px solid rgba(10, 10, 10, 0.03);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.01);
        }

        .fw-row-normal {
          flex-direction: row;
        }

        .fw-row-reverse {
          flex-direction: row-reverse;
        }

        /* Column base */
        .fw-img-col {
          flex: 1;
          width: 50%;
          overflow: hidden;
        }

        .fw-content-col {
          flex: 1;
          width: 50%;
          padding: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fw-content-box {
          max-width: 440px;
          width: 100%;
        }

        /* Image frame wrapper */
        .fw-img-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 11;
          overflow: hidden;
          background: #1c1c1a;
        }

        .fw-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          /* start: fully desaturated + slightly darkened */
          filter: grayscale(100%) brightness(0.75) contrast(1.05);
          transition: transform 1.4s cubic-bezier(0.25, 1, 0.3, 1),
                      filter 0.9s cubic-bezier(0.25, 1, 0.3, 1);
        }

        .fw-row:hover .fw-img,
        .fw-row:active .fw-img {
          /* on hover: full colour, slight warmth, zoom */
          filter: grayscale(0%) brightness(1.05) contrast(1.02) saturate(1.15);
          transform: scale(1.05);
        }

        /* Dark veil – dims the image by default, lifts on hover */
        .fw-overlay {
          position: absolute;
          inset: 0;
          background: rgba(10, 10, 10, 0.30);
          pointer-events: none;
          transition: background 0.7s cubic-bezier(0.25, 1, 0.3, 1);
          z-index: 1;
        }

        .fw-row:hover .fw-overlay {
          background: rgba(10, 10, 10, 0.0);
        }

        /* Gold shimmer overlay – invisible by default, glows on hover */
        .fw-color-shimmer {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(184, 134, 11, 0.0)   0%,
            rgba(201, 168, 76, 0.0)  50%,
            rgba(228, 201, 126, 0.0) 100%
          );
          mix-blend-mode: soft-light;
          pointer-events: none;
          transition: background 0.9s cubic-bezier(0.25, 1, 0.3, 1),
                      opacity 0.9s ease;
          opacity: 0;
          z-index: 2;
        }

        .fw-row:hover .fw-color-shimmer {
          background: linear-gradient(
            135deg,
            rgba(184, 134, 11, 0.55)   0%,
            rgba(201, 168, 76, 0.30)  50%,
            rgba(255, 220, 100, 0.15) 100%
          );
          opacity: 1;
        }

        /* Diagonal glint sweep */
        .fw-glint {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            115deg,
            transparent 0%,
            rgba(255, 230, 140, 0.0) 45%,
            rgba(255, 255, 255, 0.0) 50%,
            rgba(255, 230, 140, 0.0) 55%,
            transparent 100%
          );
          pointer-events: none;
          transition: background 0.5s ease, transform 0.9s ease;
          transform: translateX(-120%) skewX(-20deg);
          z-index: 3;
        }

        .fw-row:hover .fw-glint {
          background: linear-gradient(
            115deg,
            transparent 0%,
            rgba(255, 230, 140, 0.0) 40%,
            rgba(255, 255, 255, 0.18) 50%,
            rgba(255, 230, 140, 0.0) 60%,
            transparent 100%
          );
          transform: translateX(120%) skewX(-20deg);
        }

        /* Badge overlay */
        .fw-badge {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          background: rgba(184, 134, 11, 0.95);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 0.52rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 0.35rem 0.75rem;
          z-index: 2;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        /* Metadata Details */
        .fw-meta-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.6rem;
        }

        .fw-num {
          font-size: 0.65rem;
          font-weight: 700;
          color: #9ca3af;
          letter-spacing: 0.05em;
        }

        .fw-separator {
          font-size: 0.65rem;
          color: #d1d5db;
        }

        .fw-cat {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #c9a84c;
        }

        .fw-title {
          font-size: clamp(1.5rem, 2.2vw, 2.2rem);
          font-weight: 600;
          color: #0a0a0a;
          margin: 0 0 0.8rem;
          line-height: 1.2;
          letter-spacing: -0.015em;
          transition: color 0.4s ease;
        }

        .fw-row:hover .fw-title {
          color: #b8860b;
        }

        .fw-desc {
          font-size: 0.85rem;
          line-height: 1.65;
          color: #4b5563;
          margin: 0;
        }

        /* Mobile adjustments (stacked rows) */
        @media (max-width: 768px) {
          .fw-checkerboard {
            gap: 2.5rem;
          }

          .fw-row {
            flex-direction: column !important;
            gap: 0;
          }

          .fw-img-col, .fw-content-col {
            width: 100% !important;
            flex: none;
          }

          .fw-content-col {
            padding: 2rem 1.5rem;
            justify-content: flex-start;
          }

          .fw-img-wrapper {
            aspect-ratio: 4 / 3 !important;
          }

          .fw-title {
            font-size: 1.5rem;
          }

          .fw-desc {
            font-size: 0.8rem;
          }
        }


        /* Skeleton loading */
        .fw-skeleton {
          display: flex;
          flex-direction: column;
          gap: 4rem;
          width: 100%;
        }

        .fw-skel-row {
          display: flex;
          align-items: center;
          gap: 4rem;
          width: 100%;
          height: 320px;
        }

        .fw-skel-img {
          flex: 1;
          height: 100%;
          background: #e5e7eb;
          animation: fw-pulse 1.5s ease-in-out infinite;
        }

        .fw-skel-text {
          flex: 1;
          height: 80px;
          background: #e5e7eb;
          animation: fw-pulse 1.5s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .fw-skel-row {
            flex-direction: column;
            gap: 1.5rem;
            height: auto;
          }
          .fw-skel-img {
            width: 100%;
            height: 240px;
          }
          .fw-skel-text {
            width: 100%;
            height: 80px;
          }
        }

        @keyframes fw-pulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 0.8; }
        }
      `}</style>
    </section>
  );
};

export default React.memo(FeaturedWorks);


