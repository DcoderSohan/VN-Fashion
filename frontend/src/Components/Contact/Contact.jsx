import React, { useState } from "react";

const SERIF = "'Playfair Display', 'Times New Roman', serif";
const SANS  = "'Raleway', system-ui, sans-serif";

const Contact = () => {
  const [email, setEmail]         = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section id="contact" className="ct-root" aria-label="Newsletter signup">

      {/* Faded bg texture */}
      <div className="ct-bg" aria-hidden="true">
        <img src="/VN-6.jpg" alt=""
          onError={(e) => { e.target.src = "/HeroBgImg.jpg"; }} />
      </div>

      <div className="ct-inner">

        <div className="ct-grid">

          {/* Heading */}
          <div className="ct-left">
            <span className="ct-eyebrow" style={{ fontFamily: SANS }}>Newsletter</span>
            <h2 className="ct-heading" style={{ fontFamily: SERIF }}>
              Join the<br /><em>Collective.</em>
            </h2>
            <p className="ct-desc" style={{ fontFamily: SANS }}>
              Private previews, atelier updates, and digital journals — delivered to your inbox.
            </p>
          </div>

          {/* Form */}
          <div className="ct-right">
            {subscribed ? (
              <div className="ct-success" style={{ fontFamily: SANS }}>
                <span className="ct-check">✓</span>
                You're in the collective
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="ct-form">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="ct-input"
                  style={{ fontFamily: SANS }}
                />
                <button type="submit" id="newsletter-submit-btn" className="ct-submit" style={{ fontFamily: SANS }}>
                  <span className="ct-submit-fill" />
                  <span className="ct-submit-text">Subscribe</span>
                </button>
              </form>
            )}
            <p className="ct-privacy" style={{ fontFamily: SANS }}>
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .ct-root {
          position: relative;
          width: 100%;
          background: #0c0c0b;
          overflow: hidden;
          padding: 4.5rem 0;
        }
        .ct-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }
        .ct-bg img {
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.06;
          filter: grayscale(100%);
          display: block;
        }
        .ct-inner {
          position: relative;
          z-index: 1;
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 3rem;
        }
        @media (max-width: 1023px) { .ct-inner { padding: 0 2rem; } }
        @media (max-width: 640px)  { .ct-inner { padding: 0 1.25rem; } }

        .ct-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }
        @media (max-width: 768px) {
          .ct-grid { grid-template-columns: 1fr; gap: 2rem; }
        }

        /* Left */
        .ct-eyebrow {
          display: block;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: #b8860b;
          margin-bottom: 0.8rem;
        }
        .ct-heading {
          font-size: clamp(2.2rem, 4.5vw, 3.8rem);
          font-weight: 700;
          line-height: 1.05;
          color: #ffffff;
          margin: 0 0 1rem;
        }
        .ct-heading em {
          font-style: italic;
          font-weight: 400;
          background: linear-gradient(110deg, #b8860b 0%, #c9a84c 60%, #e4c97e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .ct-desc {
          font-size: 0.78rem;
          font-weight: 400;
          line-height: 1.75;
          color: rgba(255,255,255,0.45);
          max-width: 380px;
          margin: 0;
        }

        /* Right */
        .ct-form {
          display: flex;
          gap: 0;
          border: 1.5px solid rgba(255,255,255,0.15);
          overflow: hidden;
        }
        .ct-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #ffffff;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          padding: 1rem 1.2rem;
        }
        .ct-input::placeholder {
          color: rgba(255,255,255,0.3);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          font-size: 0.62rem;
          font-weight: 600;
        }
        .ct-submit {
          position: relative;
          overflow: hidden;
          background: transparent;
          border: none;
          border-left: 1.5px solid rgba(255,255,255,0.15);
          color: #ffffff;
          cursor: pointer;
          padding: 1rem 1.6rem;
          transition: color 0.4s ease;
          flex-shrink: 0;
        }

        /* ── Mobile: stack form vertically ── */
        @media (max-width: 768px) {
          .ct-form {
            flex-direction: column;
            border: none;
            gap: 0.75rem;
          }
          .ct-input {
            width: 100%;
            box-sizing: border-box;
            font-size: 1rem; /* prevents iOS auto-zoom */
            padding: 0.95rem 1.1rem;
            border: 1.5px solid rgba(255,255,255,0.18);
            background: rgba(255,255,255,0.04);
          }
          .ct-input::placeholder {
            font-size: 0.72rem;
          }
          .ct-submit {
            width: 100%;
            box-sizing: border-box;
            border-left: none;
            border: none;
            background: #b8860b;
            padding: 1rem;
            color: #ffffff;
            justify-content: center;
          }
          /* Hide the fill span on mobile – button already has bg */
          .ct-submit .ct-submit-fill { display: none; }
        }

        .ct-submit-fill {
          position: absolute;
          inset: 0;
          width: 0;
          background: #b8860b;
          transition: width 0.45s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 0;
        }
        .ct-submit:hover .ct-submit-fill { width: 100%; }
        .ct-submit-text {
          position: relative;
          z-index: 1;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .ct-privacy {
          margin-top: 0.75rem;
          font-size: 0.55rem;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.2);
        }
        .ct-success {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          border: 1.5px solid #b8860b;
          padding: 1rem 1.4rem;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #b8860b;
        }
        .ct-check {
          font-size: 1rem;
          line-height: 1;
        }
      `}</style>
    </section>
  );
};

export default Contact;
