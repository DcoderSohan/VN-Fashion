import React, { useState, useEffect, useRef } from "react";

const SERIF = "'Playfair Display', 'Times New Roman', serif";
const SANS  = "'Raleway', system-ui, sans-serif";

const BRAND_LETTERS = ["V", "N", "\u00a0", "F", "A", "S", "H", "I", "O", "N"];

const InitialLoader = ({ onComplete }) => {
  const [lettersIn, setLettersIn] = useState(false);
  const [subIn, setSubIn]         = useState(false);
  const [barIn, setBarIn]         = useState(false);
  const [exiting, setExiting]     = useState(false);

  const percentRef   = useRef(null);
  const fillRef      = useRef(null);
  const glowRef      = useRef(null);
  const rafRef       = useRef(null);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.body.style.height = "100%";
    document.documentElement.style.height = "100%";

    // Staggered presentation stages
    const t1 = setTimeout(() => setLettersIn(true), 100);
    const t2 = setTimeout(() => setSubIn(true), 500);
    const t3 = setTimeout(() => setBarIn(true), 750);

    // High performance progress counter using requestAnimationFrame & direct DOM updates.
    // Avoids 100 React state changes and re-renders entirely.
    const START_DELAY = 750; // matches bar appearance
    const DURATION = 1500;
    let startTimestamp = null;

    const tick = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const pct = Math.min((elapsed / DURATION) * 100, 100);

      // Direct DOM mutation for absolute smoothness
      if (percentRef.current) {
        percentRef.current.textContent = `${Math.floor(pct)}%`;
      }
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${pct / 100})`;
      }
      if (glowRef.current) {
        glowRef.current.style.left = `${pct}%`;
      }

      if (elapsed < DURATION) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Complete -> pause slightly, trigger exit transitions
        const t4 = setTimeout(() => {
          setExiting(true);

          // Unmount when exit completes
          const t5 = setTimeout(() => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            document.body.style.height = "";
            document.documentElement.style.height = "";
            const initialBgEl = document.getElementById("initial-bg");
            if (initialBgEl) {
              initialBgEl.remove();
            }
            onComplete();
          }, 850);
          return () => clearTimeout(t5);
        }, 350);
        return () => clearTimeout(t4);
      }
    };

    const tLoader = setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick);
    }, START_DELAY);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(tLoader);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.body.style.height = "";
      document.documentElement.style.height = "";
      
      // Safety cleanup if unmounted early
      const initialBgEl = document.getElementById("initial-bg");
      if (initialBgEl) {
        initialBgEl.remove();
      }
    };
  }, [onComplete]);

  return (
    <div className={`il-root${exiting ? " il-exiting" : ""}`} aria-label="Loading VN Fashion" role="status">

      {/* Decorative split background panels */}
      <div className="il-panels" aria-hidden="true">
        <div className="il-panel il-panel-l" />
        <div className="il-panel il-panel-r" />
      </div>

      {/* Organic grain overlay */}
      <div className="il-grain" aria-hidden="true" />

      {/* Main core loader panel */}
      <div className="il-center">

        {/* Brand logo lettering */}
        <div className="il-brand-row" aria-label="VN FASHION">
          {BRAND_LETTERS.map((ch, i) => (
            <span
              key={i}
              className={`il-letter${lettersIn ? " il-letter-in" : ""}`}
              style={{
                fontFamily: SERIF,
                transitionDelay: lettersIn ? `${i * 50}ms` : "0ms",
              }}
              aria-hidden="true"
            >
              {ch}
            </span>
          ))}
        </div>

        {/* Couture subtitle */}
        <p
          className={`il-sub${subIn ? " il-sub-in" : ""}`}
          style={{ fontFamily: SANS }}
        >
          Couture Atelier
        </p>

        {/* Gold geometric dot separator */}
        <div className={`il-dot${subIn ? " il-dot-in" : ""}`} aria-hidden="true" />

        {/* Progress tracker box */}
        <div className={`il-bar-wrap${barIn ? " il-bar-wrap-in" : ""}`}>
          <div className="il-bar-track">
            <div
              ref={fillRef}
              className="il-bar-fill"
              style={{ transform: "scaleX(0)" }}
            />
            <div
              ref={glowRef}
              className="il-bar-glow"
              style={{ left: "0%" }}
            />
          </div>
          <div className="il-bar-footer" style={{ fontFamily: SANS }}>
            <span className="il-loading-text">Loading</span>
            <span ref={percentRef} className="il-percent">0%</span>
          </div>
        </div>

      </div>

      {/* Transition veil curtain */}
      <div className={`il-curtain${exiting ? " il-curtain-in" : ""}`} aria-hidden="true" />

      <style>{`
        .il-root {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          z-index: 999999;
          background: #0c0c0b;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          will-change: transform, opacity;
        }

        /* Smooth hardware accelerated slide exit */
        .il-exiting {
          animation: il-slide-up 0.85s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        @keyframes il-slide-up {
          from { transform: translateY(0); opacity: 1; }
          to   { transform: translateY(-100%); opacity: 1; }
        }

        /* Background layout layers */
        .il-panels {
          position: absolute;
          inset: -2px;
          pointer-events: none;
        }
        .il-panel {
          position: absolute;
          top: 0; bottom: 0;
          width: 50%;
        }
        .il-panel-l {
          left: 0;
          background: linear-gradient(135deg, #111110 0%, #0c0c0b 100%);
          border-right: 1px solid rgba(184, 134, 11, 0.06);
        }
        .il-panel-r {
          right: 0;
          background: linear-gradient(225deg, #131311 0%, #0c0c0b 100%);
        }

        /* Subtle luxury film grain overlay */
        .il-grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.028;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 160px 160px;
        }

        .il-center {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 1.5rem;
          width: 100%;
          max-width: 520px;
          text-align: center;
        }

        /* Staggered brand typography reveal */
        .il-brand-row {
          display: flex;
          align-items: baseline;
          gap: 0;
          margin-bottom: 0.9rem;
          overflow: hidden;
        }

        .il-letter {
          display: inline-block;
          font-size: clamp(2.4rem, 9vw, 4.2rem);
          font-weight: 300;
          letter-spacing: 0.22em;
          color: #ffffff;
          text-transform: uppercase;
          line-height: 1;
          opacity: 0;
          transform: translateY(35px) rotateX(25deg);
          transition: opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
                      transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform, opacity;
        }

        .il-letter-in {
          opacity: 1;
          transform: translateY(0) rotateX(0deg);
        }

        .il-sub {
          font-size: clamp(0.52rem, 2vw, 0.62rem);
          font-weight: 700;
          letter-spacing: 0.42em;
          text-transform: uppercase;
          color: #c9a84c;
          margin: 0 0 1.4rem;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.6s ease, transform 0.6s ease;
          will-change: transform, opacity;
        }
        .il-sub-in {
          opacity: 1;
          transform: translateY(0);
        }

        .il-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #b8860b;
          margin-bottom: 1.8rem;
          opacity: 0;
          transform: scale(0);
          transition: opacity 0.4s ease 0.1s, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s;
        }
        .il-dot-in {
          opacity: 1;
          transform: scale(1);
        }

        /* Clean progress meter layout */
        .il-bar-wrap {
          width: min(280px, 80vw);
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          will-change: transform, opacity;
        }
        .il-bar-wrap-in {
          opacity: 1;
          transform: translateY(0);
        }

        .il-bar-track {
          position: relative;
          width: 100%;
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
          margin-bottom: 0.9rem;
          overflow: visible;
        }

        .il-bar-fill {
          position: absolute;
          inset: 0;
          transform-origin: left center;
          background: linear-gradient(90deg, #8a6300, #b8860b 40%, #e4c97e 80%, #f0d98e 100%);
          will-change: transform;
        }

        .il-bar-glow {
          position: absolute;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #e4c97e;
          box-shadow: 0 0 10px 3px rgba(228, 201, 126, 0.6);
          pointer-events: none;
          will-change: left;
        }

        .il-bar-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .il-loading-text {
          font-size: 0.52rem;
          font-weight: 600;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.25);
        }

        .il-percent {
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.4);
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum";
        }

        /* Veil transition element */
        .il-curtain {
          position: absolute;
          inset: -2px;
          z-index: 10;
          background: linear-gradient(180deg, #b8860b 0%, #0c0c0b 100%);
          transform: translateY(100%);
          pointer-events: none;
          will-change: transform;
        }
        .il-curtain-in {
          animation: il-curtain-rise 0.65s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        @keyframes il-curtain-rise {
          from { transform: translateY(100%); }
          to   { transform: translateY(-100%); }
        }

        @media (max-width: 480px) {
          .il-letter {
            letter-spacing: 0.14em;
          }
          .il-bar-wrap {
            width: 85vw;
          }
        }
      `}</style>
    </div>
  );
};

export default InitialLoader;
