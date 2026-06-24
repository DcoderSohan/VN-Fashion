import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

/* ============================================================
   VN FASHION — Page Transition
   A cinematic "blur & crossfade" overlay.
   When navigating, the page blurs out behind a translucent dark
   glassmorphism screen. Centered is a gold spinning loader and
   the brand logo. It fades out to reveal the new page.
   ============================================================ */

const BRAND_LABEL = "VN FASHION";

const TRANSITION_PHASES = {
  IDLE:   "idle",    // no overlay
  ENTER:  "enter",   // overlay fading & blurring in
  HOLD:   "hold",    // overlay holding — brand details visible
  EXIT:   "exit",    // overlay fading out
};

let pendingNavigate = null; // queued route change during animation

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [phase, setPhase]         = useState(TRANSITION_PHASES.IDLE);
  const [displayChildren, setDisplayChildren] = useState(children);
  const prevPath = useRef(location.pathname);
  const inFlight = useRef(false);

  useEffect(() => {
    // Same route — skip
    if (location.pathname === prevPath.current) return;

    if (inFlight.current) {
      // Queue another navigation mid-animation
      pendingNavigate = { children, path: location.pathname };
      return;
    }

    runTransition(children, location.pathname);
    prevPath.current = location.pathname;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  function runTransition(newChildren, newPath) {
    inFlight.current = true;

    // Phase 1 — overlay fades in & blurs
    setPhase(TRANSITION_PHASES.ENTER);

    const holdTimer = setTimeout(() => {
      // Phase 2 — hold: swap content silently while blurred
      setPhase(TRANSITION_PHASES.HOLD);
      setDisplayChildren(newChildren);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });

      const exitTimer = setTimeout(() => {
        // Phase 3 — overlay fades out
        setPhase(TRANSITION_PHASES.EXIT);

        const doneTimer = setTimeout(() => {
          setPhase(TRANSITION_PHASES.IDLE);
          inFlight.current = false;

          // Handle queued navigation
          if (pendingNavigate) {
            const { children: qc, path: qp } = pendingNavigate;
            pendingNavigate = null;
            prevPath.current = qp;
            runTransition(qc, qp);
          }
        }, 400); // exit duration

        return () => clearTimeout(doneTimer);
      }, 300); // hold duration

      return () => clearTimeout(exitTimer);
    }, 400); // enter duration

    return () => clearTimeout(holdTimer);
  }

  const isVisible = phase !== TRANSITION_PHASES.IDLE;

  return (
    <>
      {/* Page Content */}
      <div style={{ opacity: 1 }}>
        {displayChildren}
      </div>

      {/* ---- Cinematic Blur Overlay ---- */}
      {isVisible && (
        <div
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "all", // block clicks during transitions
            animation:
              phase === TRANSITION_PHASES.ENTER
                ? "blurFadeIn 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards"
                : phase === TRANSITION_PHASES.EXIT
                ? "blurFadeOut 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards"
                : "none",
            ...(phase === TRANSITION_PHASES.HOLD && {
              opacity: 1,
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              background: "rgba(12, 12, 11, 0.88)"
            })
          }}
        >
          {/* Brand details shown during hold */}
          <div
            style={{
              opacity: phase === TRANSITION_PHASES.HOLD ? 1 : 0,
              transform: phase === TRANSITION_PHASES.HOLD ? "scale(1) translateY(0)" : "scale(0.97) translateY(8px)",
              transition: "opacity 0.3s cubic-bezier(0.25, 1, 0.5, 1), transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
              textAlign: "center",
              userSelect: "none",
            }}
          >
            {/* Spinning gold loader ring */}
            <div
              style={{
                width: 38,
                height: 38,
                border: "1.5px solid rgba(184, 134, 11, 0.15)",
                borderTopColor: "#b8860b",
                borderRadius: "50%",
                margin: "0 auto 20px",
                animation: "spinGold 0.8s linear infinite"
              }}
            />
            {/* Logo text */}
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.8rem, 5.5vw, 2.8rem)",
                fontWeight: 300,
                letterSpacing: "0.45em",
                color: "#ffffff",
                textTransform: "uppercase",
                lineHeight: 1,
                margin: 0
              }}
            >
              {BRAND_LABEL}
            </p>
            {/* Subtext */}
            <p
              style={{
                fontFamily: "'Raleway', sans-serif",
                fontSize: "0.55rem",
                fontWeight: 600,
                letterSpacing: "0.3em",
                color: "#c9a84c",
                textTransform: "uppercase",
                marginTop: "12px",
                opacity: 0.8
              }}
            >
              Couture Atelier
            </p>
          </div>
        </div>
      )}

      {/* ---- Keyframes injected once ---- */}
      <style>{`
        @keyframes blurFadeIn {
          from {
            opacity: 0;
            backdrop-filter: blur(0px);
            -webkit-backdrop-filter: blur(0px);
            background: rgba(12, 12, 11, 0);
          }
          to {
            opacity: 1;
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            background: rgba(12, 12, 11, 0.88);
          }
        }
        @keyframes blurFadeOut {
          from {
            opacity: 1;
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            background: rgba(12, 12, 11, 0.88);
          }
          to {
            opacity: 0;
            backdrop-filter: blur(0px);
            -webkit-backdrop-filter: blur(0px);
            background: rgba(12, 12, 11, 0);
          }
        }
        @keyframes spinGold {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default PageTransition;

