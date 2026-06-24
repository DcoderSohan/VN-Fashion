import React from "react";
import { Link } from "react-router-dom";

const SERIF = "'Playfair Display', 'Times New Roman', serif";
const SANS = "'Raleway', system-ui, sans-serif";

const STATS = [
  { value: "5+", label: "Years" },
  { value: "200+", label: "Pieces" },
  { value: "100+", label: "Clients" },
];

const MARQUEE_TEXT = [
  "VN FASHION", "COUTURE", "ARTISAN CRAFT",
  "HANDMADE", "AVANT-GARDE", "ATELIER VN",
];

const HeroSection = () => {
  return (
    <section
      className="hero-root"
      aria-label="VN Fashion — Hero Section"
    >

      {/* ── Main grid ─────────────────────────────────── */}
      <div className="hero-grid">

        {/* LEFT — Editorial copy */}
        <div className="hero-left">

          {/* Main heading */}
          <h1 className="hero-heading" style={{ fontFamily: SERIF }}>
            <span className="hero-heading-line">
              <em>The</em>
            </span>
            <span className="hero-heading-line">Architecture</span>
            <span className="hero-heading-line hero-heading-accent">of Couture</span>
          </h1>

          {/* Divider + subtitle */}
          <div className="hero-subtitle-row">
            <div className="hero-rule" />
            <p className="hero-subtitle">
              A dialogue between structural<br />
              rigidity and fluid motion.
            </p>
          </div>

          {/* CTAs */}
          <div className="hero-ctas">
            <Link to="/gallery" className="hero-btn hero-btn-primary">
              <span className="hero-btn-fill" />
              <span className="hero-btn-text">Explore Collection</span>
            </Link>
            <Link to="/booking" className="hero-btn hero-btn-ghost">
              <span className="hero-btn-fill" />
              <span className="hero-btn-text">Book Appointment</span>
            </Link>
          </div>

          {/* Stats */}
          <div className="hero-stats">
            {STATS.map((s, i) => (
              <React.Fragment key={s.label}>
                <div className="hero-stat">
                  <span className="hero-stat-value" style={{ fontFamily: SERIF }}>{s.value}</span>
                  <span className="hero-stat-label">{s.label}</span>
                </div>
                {i < STATS.length - 1 && <div className="hero-stat-divider" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* RIGHT — Images */}
        <div className="hero-right">

          {/* Primary tall image */}
          <div className="hero-img-primary">
            <img
              src="/VN-1.jpg"
              alt="VN Fashion editorial — main look"
              className="hero-img"
              loading="eager"
              onError={(e) => { e.target.src = "/hero_fashion_model.png"; }}
            />
            {/* Color reveal overlay — fades out on hover to show full color */}
            <div className="hero-img-overlay" aria-hidden="true" />
            {/* Dark gradient at bottom */}
            <div className="hero-img-gradient" />
          </div>

          {/* Floating secondary card */}
          <div className="hero-float-card">
            <img
              src="/VN-2.jpg"
              alt="VN Fashion — secondary editorial"
              className="hero-float-img"
              loading="eager"
              onError={(e) => { e.target.src = "/VN.jpg"; }}
            />
            {/* Color reveal overlay */}
            <div className="hero-float-overlay" aria-hidden="true" />
            <div className="hero-float-label" style={{ fontFamily: SANS }}>
              <span>S/S '24</span>
              <span className="hero-float-arrow">→</span>
            </div>
          </div>

          {/* Side index label */}
          <div className="hero-side-label" style={{ fontFamily: SANS }}>
            01 / COLLECTION
          </div>

        </div>
      </div>

      {/* ── Scrolling ticker ──────────────────────────── */}
      <div className="hero-ticker" aria-hidden="true">
        <div className="hero-ticker-track">
          {[...Array(3)].map((_, i) =>
            MARQUEE_TEXT.map((word, j) => (
              <span key={`${i}-${j}`} className="hero-ticker-item">
                {word}
                <span className="hero-ticker-sep">•</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── Scoped styles ─────────────────────────────── */}
      <style>{`

        /* ---- Section ---- */
        .hero-root {
          width: 100%;
          min-height: 100svh;
          background: #f8f7f5;
          display: flex;
          flex-direction: column;
          padding-top: 64px;
          overflow: hidden;
          position: relative;
        }

        /* ---- Top meta bar ---- */
        .hero-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 3rem 0;
        }
        .hero-meta-label {
          font-family: 'Raleway', system-ui, sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #9ca3af;
        }
        @media (max-width: 640px) {
          .hero-meta { padding: 1rem 1.5rem 0; }
          .hero-meta-right { display: none; }
        }

        /* ---- Main grid ---- */
        .hero-grid {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          padding: 2rem 3rem 2rem;
          align-items: center;
        }
        @media (max-width: 1023px) {
          .hero-grid {
            grid-template-columns: 1fr;
            padding: 1.5rem 1.5rem 2rem;
            gap: 2.5rem;
          }
        }
        @media (max-width: 640px) {
          .hero-grid { padding: 1.25rem 1.25rem 1.5rem; gap: 2rem; }
        }

        /* ── LEFT COLUMN ── */
        .hero-left {
          display: flex;
          flex-direction: column;
          gap: 0;
          padding-right: 3rem;
          animation: heroFadeUp 0.9s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @media (max-width: 1023px) {
          .hero-left { padding-right: 0; order: 2; }
        }

        /* Collection tag */
        .hero-collection-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: 'Raleway', system-ui, sans-serif;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #6b7280;
          margin-bottom: 1.5rem;
        }
        .hero-tag-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #0a0a0a;
          flex-shrink: 0;
          animation: pulseDot 2.5s ease infinite;
        }
        @keyframes pulseDot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50%       { transform: scale(1.5); opacity: 0.6; }
        }

        /* Heading — Playfair Display */
        .hero-heading {
          display: flex;
          flex-direction: column;
          font-family: 'Playfair Display', 'Times New Roman', serif;
          font-size: clamp(3.4rem, 7.5vw, 7rem);
          font-weight: 700;
          line-height: 0.95;
          letter-spacing: -0.01em;
          color: #0a0a0a;
          margin-bottom: 2rem;
        }
        .hero-heading-line {
          display: block;
        }
        .hero-heading-line em {
          font-style: italic;
          font-weight: 400;
          color: #374151;
        }
        .hero-heading-accent {
          font-style: italic;
          font-weight: 400;
          background: linear-gradient(120deg, #b8860b 0%, #8b6914 40%, #c9a84c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Subtitle row */
        .hero-subtitle-row {
          display: flex;
          align-items: flex-start;
          gap: 1.25rem;
          margin-bottom: 2.25rem;
        }
        .hero-rule {
          width: 40px;
          height: 1px;
          background: #0a0a0a;
          margin-top: 0.6rem;
          flex-shrink: 0;
        }
        .hero-subtitle {
          font-family: 'Raleway', system-ui, sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #6b7280;
          line-height: 1.8;
        }

        /* CTAs */
        .hero-ctas {
          display: flex;
          flex-wrap: wrap;
          gap: 0.85rem;
          margin-bottom: 2.5rem;
        }
        .hero-btn {
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
        .hero-btn-fill {
          position: absolute;
          inset: 0;
          width: 0;
          background: #0a0a0a;
          transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .hero-btn-text {
          position: relative;
          z-index: 1;
        }
        /* Primary (filled → white text on hover) */
        .hero-btn-primary {
          background: #0a0a0a;
          color: #ffffff;
          border: 1.5px solid #0a0a0a;
        }
        .hero-btn-primary .hero-btn-fill {
          background: #374151;
        }
        .hero-btn-primary:hover .hero-btn-fill { width: 100%; }
        /* Ghost (outline → fills black on hover) */
        .hero-btn-ghost {
          background: transparent;
          color: #0a0a0a;
          border: 1.5px solid #0a0a0a;
        }
        .hero-btn-ghost:hover { color: #ffffff; }
        .hero-btn-ghost:hover .hero-btn-fill { width: 100%; }

        /* Stats */
        .hero-stats {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }
        .hero-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .hero-stat-value {
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 300;
          color: #0a0a0a;
          line-height: 1;
          letter-spacing: -0.02em;
        }
        .hero-stat-label {
          font-family: 'Raleway', system-ui, sans-serif;
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #9ca3af;
        }
        .hero-stat-divider {
          width: 1px;
          height: 36px;
          background: #e5e7eb;
        }

        /* ── RIGHT COLUMN ── */
        .hero-right {
          position: relative;
          display: flex;
          justify-content: flex-end;
          align-items: stretch;
          height: min(75vh, 680px);
          animation: heroFadeUp 1s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
        }
        @media (max-width: 1023px) {
          .hero-right {
            order: 1;
            height: min(60vw, 420px);
            justify-content: center;
          }
        }
        @media (max-width: 640px) {
          .hero-right { height: 70vw; min-height: 260px; }
        }

        /* Primary image */
        .hero-img-primary {
          position: relative;
          width: 70%;
          height: 100%;
          overflow: hidden;
          border-radius: 2px;
          background: #e5e7eb;
        }
        @media (max-width: 1023px) { .hero-img-primary { width: 65%; } }
        @media (max-width: 640px)  { .hero-img-primary { width: 72%; } }

        /* ---- Image: grayscale → color on hover ---- */
        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          /* Start desaturated (matches the b&w editorial theme) */
          filter: grayscale(100%) contrast(1.05);
          transition: filter 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hero-img-primary:hover .hero-img {
          filter: grayscale(0%) contrast(1.0) saturate(1.1);
          transform: scale(1.04);
        }
        /* Warm amber overlay — fades away on hover revealing true color */
        .hero-img-overlay {
          position: absolute;
          inset: 0;
          background: rgba(212, 175, 55, 0.08);
          mix-blend-mode: multiply;
          opacity: 1;
          transition: opacity 0.7s ease;
          pointer-events: none;
          z-index: 1;
        }
        .hero-img-primary:hover .hero-img-overlay {
          opacity: 0;
        }
        .hero-img-gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 35%;
          background: linear-gradient(to top, rgba(0,0,0,0.3), transparent);
          pointer-events: none;
          z-index: 2;
        }

        /* Floating secondary card */
        .hero-float-card {
          position: absolute;
          bottom: 10%;
          left: 0;
          width: 36%;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s ease;
          border-radius: 2px;
          z-index: 10;
        }
        .hero-float-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 28px 70px rgba(0,0,0,0.16);
        }
        @media (max-width: 1023px) {
          .hero-float-card {
            bottom: 8%;
            left: 4%;
            width: 30%;
          }
        }
        @media (max-width: 640px) {
          .hero-float-card { width: 32%; bottom: 6%; left: 2%; }
        }

        .hero-float-img {
          width: 100%;
          aspect-ratio: 3 / 4;
          object-fit: cover;
          object-position: top;
          display: block;
          /* Also starts grayscale */
          filter: grayscale(100%) contrast(1.05);
          transition: filter 0.65s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.5s ease;
        }
        .hero-float-overlay {
          position: absolute;
          top: 0; left: 0; right: 0;
          /* Height = everything except the label bar */
          bottom: 2.2rem;
          background: rgba(180, 140, 20, 0.07);
          mix-blend-mode: multiply;
          opacity: 1;
          transition: opacity 0.65s ease;
          pointer-events: none;
          z-index: 1;
        }
        .hero-float-card:hover .hero-float-img {
          filter: grayscale(0%) contrast(1.0) saturate(1.15);
          transform: scale(1.06);
        }
        .hero-float-card:hover .hero-float-overlay {
          opacity: 0;
        }
        .hero-float-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 0.75rem;
          font-size: 0.55rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #0a0a0a;
          background: #ffffff;
        }
        .hero-float-arrow {
          font-size: 0.75rem;
          transition: transform 0.25s ease;
        }
        .hero-float-card:hover .hero-float-arrow { transform: translateX(3px); }

        /* Side index label */
        .hero-side-label {
          position: absolute;
          right: -1.5rem;
          top: 50%;
          transform: translateY(-50%) rotate(90deg);
          font-size: 0.55rem;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #d1d5db;
          white-space: nowrap;
          pointer-events: none;
        }
        @media (max-width: 1023px) { .hero-side-label { display: none; } }

        /* ── Ticker ── */
        .hero-ticker {
          border-top: 1px solid #e5e7eb;
          overflow: hidden;
          padding: 0.9rem 0;
          background: #f8f7f5;
        }
        .hero-ticker-track {
          display: flex;
          align-items: center;
          width: max-content;
          animation: tickerScroll 28s linear infinite;
        }
        .hero-ticker-item {
          font-family: 'Raleway', system-ui, sans-serif;
          font-size: 0.6rem;
          font-weight: 600;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #9ca3af;
          white-space: nowrap;
          padding: 0 0.25rem;
        }
        .hero-ticker-sep {
          margin: 0 1.25rem;
          opacity: 0.4;
        }

        /* ── Keyframes ── */
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

      `}</style>
    </section>
  );
};

export default HeroSection;
