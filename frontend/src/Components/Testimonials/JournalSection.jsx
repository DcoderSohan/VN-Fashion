import React from "react";
import { Link } from "react-router-dom";

const SERIF = "'Playfair Display', 'Times New Roman', serif";
const SANS  = "'Raleway', system-ui, sans-serif";

const JournalSection = () => {
  return (
    <section className="js-root" aria-label="Journal — The Geometry of Motion">

      <div className="js-inner">

        {/* ── Top label row ── */}
        <div className="js-label-row">
          <div className="js-label-line" />
          <span className="js-label" style={{ fontFamily: SANS }}>Journal — C01</span>
          <div className="js-label-line js-label-flex" />
        </div>

        {/* ── Two-column grid ── */}
        <div className="js-grid">

          {/* LEFT — Image with overlay */}
          <div className="js-img-wrap">
            <img
              src="/journal_motion_model.png"
              alt="The Geometry of Motion — VN Fashion editorial"
              className="js-img"
              loading="lazy"
              onError={(e) => { e.target.src = "/VN-4.jpg"; }}
            />
            <div className="js-img-overlay" />
            <div className="js-img-tag" style={{ fontFamily: SANS }}>Editorial</div>
          </div>

          {/* RIGHT — Content */}
          <div className="js-content">
            <h2 className="js-heading" style={{ fontFamily: SERIF }}>
              The Geometry<br />
              <em>of Motion</em>
            </h2>

            <p className="js-desc" style={{ fontFamily: SANS }}>
              Exploring the intersection of architectural rigidity and the fluid
              transition of sartorial form. An essay on movement, structure,
              and the human silhouette.
            </p>

            {/* CTA */}
            <Link to="/gallery" className="js-cta" style={{ fontFamily: SANS }}>
              <span className="js-cta-fill" />
              <span className="js-cta-text">Read the Essay</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                strokeLinejoin="round" className="js-cta-arrow" aria-hidden="true">
                <line x1="0" y1="7" x2="12" y2="7" />
                <polyline points="7,2 12,7 7,12" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        .js-root {
          width: 100%;
          background: #ffffff;
          padding: 5rem 0;
        }
        .js-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 3rem;
        }
        @media (max-width: 1023px) { .js-inner { padding: 0 2rem; } }
        @media (max-width: 640px)  { .js-inner { padding: 0 1.25rem; } }

        /* Label row */
        .js-label-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 2.5rem;
        }
        .js-label-line { height: 1px; width: 32px; background: #e5e7eb; flex-shrink: 0; }
        .js-label-flex { flex: 1; }
        .js-label {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #9ca3af;
          white-space: nowrap;
        }

        /* Grid */
        .js-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        @media (max-width: 768px) {
          .js-grid { grid-template-columns: 1fr; gap: 2rem; }
        }

        /* Image */
        .js-img-wrap {
          position: relative;
          overflow: hidden;
          background: #e5e7eb;
          aspect-ratio: 4 / 5;
        }
        .js-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          filter: grayscale(30%);
          transition: filter 0.65s ease, transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .js-img-wrap:hover .js-img {
          filter: grayscale(0%);
          transform: scale(1.04);
        }
        .js-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.35), transparent 50%);
          pointer-events: none;
        }
        .js-img-tag {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: rgba(184, 134, 11, 0.9);
          backdrop-filter: blur(4px);
          color: #ffffff;
          font-size: 0.5rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 0.35rem 0.75rem;
        }

        /* Content */
        .js-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .js-heading {
          font-size: clamp(2rem, 4vw, 3.5rem);
          font-weight: 700;
          line-height: 1.08;
          color: #0a0a0a;
          margin: 0;
        }
        .js-heading em {
          font-style: italic;
          font-weight: 400;
          background: linear-gradient(110deg, #b8860b 0%, #c9a84c 60%, #e4c97e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .js-desc {
          font-size: 0.82rem;
          font-weight: 400;
          line-height: 1.85;
          color: #6b7280;
          margin: 0;
          max-width: 420px;
        }

        /* CTA */
        .js-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          overflow: hidden;
          text-decoration: none;
          border: 1.5px solid #0a0a0a;
          padding: 0.75rem 1.5rem;
          color: #0a0a0a;
          width: fit-content;
          transition: color 0.4s ease;
          margin-top: 0.5rem;
        }
        .js-cta-fill {
          position: absolute;
          inset: 0;
          width: 0;
          background: #0a0a0a;
          transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .js-cta:hover .js-cta-fill { width: 100%; }
        .js-cta:hover { color: #ffffff; }
        .js-cta-text {
          position: relative;
          z-index: 1;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .js-cta-arrow {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }
        .js-cta:hover .js-cta-arrow { transform: translateX(4px); }
      `}</style>
    </section>
  );
};

export default JournalSection;
