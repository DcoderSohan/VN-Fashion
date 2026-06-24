import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { contentApi } from "../../utils/api";

const SERIF = "'Playfair Display', 'Times New Roman', serif";
const SANS  = "'Raleway', system-ui, sans-serif";

const TAGS = ["Artisan Craft", "Avant-Garde", "Sustainable"];

const AboutSection = () => {
  const [aboutText, setAboutText] = useState(
    "We construct artifacts of intentional identity — where textiles become structural components that redefine the modern silhouette."
  );

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await (await import("../../utils/api")).contentApi.getAbout();
        if (data?.aboutText) setAboutText(data.aboutText);
      } catch (_) {}
    };
    fetch();
  }, []);

  return (
    <section id="about" className="ab-root" aria-label="About VN Fashion">

      {/* Faded bg image */}
      <div className="ab-bg" aria-hidden="true">
        <img src="/VN-5.jpg" alt=""
          onError={(e) => { e.target.src = "/HeroBg.jpg"; }} />
      </div>

      <div className="ab-inner">

        {/* Top rule + label */}
        <div className="ab-top">
          <div className="ab-rule" />
          <span className="ab-label">VN Studio — Est. 2024</span>
        </div>

        {/* Two-column: heading left, content right */}
        <div className="ab-grid">

          {/* Left — Big heading */}
          <div className="ab-left">
            <h2 className="ab-heading" style={{ fontFamily: SERIF }}>
              Fashion as<br />
              <em>Architecture.</em>
            </h2>
          </div>

          {/* Right — Quote + tags + CTA */}
          <div className="ab-right">
            <p className="ab-quote" style={{ fontFamily: SERIF }}>
              {aboutText}
            </p>

            {/* Tags row */}
            <div className="ab-tags">
              {TAGS.map((t, i) => (
                <span key={i} className="ab-tag" style={{ fontFamily: SANS }}>
                  {t}
                </span>
              ))}
            </div>

            {/* CTA */}
            <Link to="/about" className="ab-cta" style={{ fontFamily: SANS }}>
              <span className="ab-cta-fill" />
              <span className="ab-cta-text">Our Full Story</span>
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                strokeLinejoin="round" aria-hidden="true" className="ab-cta-arrow">
                <line x1="0" y1="7" x2="12" y2="7" />
                <polyline points="7,2 12,7 7,12" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Bottom decorative image strip */}
        <div className="ab-strip">
          {["/VN-1.jpg", "/VN-3.jpg", "/VN-6.jpg"].map((src, i) => (
            <div key={i} className="ab-strip-img">
              <img src={src} alt={`VN Fashion look ${i + 1}`}
                loading="lazy"
                onError={(e) => { e.target.src = "/VN.jpg"; }} />
            </div>
          ))}
          <div className="ab-strip-text" style={{ fontFamily: SERIF }}>
            <span>S/S</span>
            <em>2024</em>
          </div>
        </div>

      </div>

      <style>{`

        /* Root */
        .ab-root {
          position: relative;
          width: 100%;
          background: #0c0c0b;
          overflow: hidden;
          padding: 4rem 0 0;
        }

        /* Faded BG */
        .ab-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .ab-bg img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 30%;
          opacity: 0.05;
          filter: grayscale(100%);
          display: block;
        }

        /* Inner */
        .ab-inner {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 3rem;
        }
        @media (max-width: 1023px) { .ab-inner { padding: 0 2rem; } }
        @media (max-width: 640px)  { .ab-inner { padding: 0 1.25rem; } }

        /* Top rule row */
        .ab-top {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin-bottom: 3rem;
        }
        .ab-rule {
          width: 36px;
          height: 1px;
          background: #b8860b;
          flex-shrink: 0;
        }
        .ab-label {
          font-family: 'Raleway', system-ui, sans-serif;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
        }

        /* Two-column grid */
        .ab-grid {
          display: grid;
          grid-template-columns: 1fr 1.1fr;
          gap: 4rem;
          align-items: start;
          margin-bottom: 3.5rem;
        }
        @media (max-width: 768px) {
          .ab-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
        }

        /* Left heading */
        .ab-left {}
        .ab-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.4rem, 4.5vw, 4rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.01em;
          color: #ffffff;
          margin: 0;
        }
        .ab-heading em {
          font-style: italic;
          font-weight: 400;
          background: linear-gradient(110deg, #b8860b 0%, #c9a84c 55%, #e4c97e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Right content */
        .ab-right {
          display: flex;
          flex-direction: column;
          gap: 1.75rem;
        }
        .ab-quote {
          font-family: 'Playfair Display', serif;
          font-size: clamp(0.95rem, 1.4vw, 1.15rem);
          font-weight: 300;
          line-height: 1.9;
          color: rgba(255,255,255,0.55);
          margin: 0;
        }

        /* Tags */
        .ab-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }
        .ab-tag {
          font-family: 'Raleway', system-ui, sans-serif;
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.35);
          border: 1px solid rgba(255,255,255,0.1);
          padding: 0.4rem 0.85rem;
          transition: color 0.25s, border-color 0.25s;
        }
        .ab-tag:hover {
          color: #b8860b;
          border-color: #b8860b;
        }

        /* CTA */
        .ab-cta {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 0.65rem;
          overflow: hidden;
          text-decoration: none;
          border: 1.5px solid rgba(255,255,255,0.2);
          padding: 0.75rem 1.5rem;
          color: #ffffff;
          width: fit-content;
          transition: color 0.4s ease, border-color 0.4s ease;
        }
        .ab-cta-fill {
          position: absolute;
          inset: 0;
          width: 0;
          background: #b8860b;
          transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .ab-cta:hover .ab-cta-fill { width: 100%; }
        .ab-cta:hover { border-color: #b8860b; }
        .ab-cta-text {
          position: relative;
          z-index: 1;
          font-family: 'Raleway', system-ui, sans-serif;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
        }
        .ab-cta-arrow {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
          flex-shrink: 0;
        }
        .ab-cta:hover .ab-cta-arrow { transform: translateX(4px); }

        /* Bottom image strip */
        .ab-strip {
          display: flex;
          align-items: stretch;
          gap: 3px;
          height: 180px;
          position: relative;
        }
        @media (max-width: 640px) { .ab-strip { height: 130px; } }

        .ab-strip-img {
          flex: 1;
          overflow: hidden;
          background: #1a1a1a;
        }
        .ab-strip-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          filter: grayscale(100%) brightness(0.7);
          transition: filter 0.6s ease, transform 0.6s ease;
        }
        .ab-strip-img:hover img {
          filter: grayscale(0%) brightness(0.9);
          transform: scale(1.06);
        }

        /* Floating text card in strip */
        .ab-strip-text {
          flex-shrink: 0;
          width: 100px;
          background: #b8860b;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
        }
        @media (max-width: 480px) { .ab-strip-text { width: 70px; } }
        .ab-strip-text span {
          font-family: 'Playfair Display', serif;
          font-size: 0.65rem;
          font-weight: 400;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.7);
        }
        .ab-strip-text em {
          font-family: 'Playfair Display', serif;
          font-size: 1.6rem;
          font-weight: 700;
          font-style: italic;
          color: #ffffff;
          line-height: 1;
        }

      `}</style>
    </section>
  );
};

export default AboutSection;
