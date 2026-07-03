import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Mail, Phone, Clock, ArrowRight, CheckCircle } from "lucide-react";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import { contentApi } from "../utils/api";
import ErrorModal from "../Components/Modal/ErrorModal";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    contactNumber: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [focused, setFocused] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "email") {
      setEmailError(value && !value.includes("@gmail.com")
        ? "Please enter a valid Gmail address (@gmail.com)"
        : "");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.includes("@gmail.com")) {
      setEmailError("Please enter a valid Gmail address (@gmail.com)");
      return;
    }
    setEmailError("");
    try {
      await contentApi.createContact({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        contactNumber: formData.contactNumber || formData.phone,
        message: formData.message,
      });
      setIsSubmitted(true);
      setFormData({ firstName: "", lastName: "", email: "", phone: "", contactNumber: "", message: "" });
    } catch (err) {
      console.error("Contact submit error:", err);
      setErrorMessage("Failed to send message. Please try again.");
      setShowErrorModal(true);
    }
  };

  /* ── Scoped CSS ──────────────────────────────────────────────────── */
  const css = String.raw`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');

    .cpage {
      background: #fbfbfa; color: #1a1a1a;
      font-family: 'Inter', sans-serif; min-height: 100vh; overflow-x: hidden; position: relative;
    }

    /* Film grain */
    .cpage::before {
      content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
      opacity: 0.022; mix-blend-mode: multiply;
    }

    /* Faded watermark background */
    .cwm {
      position: fixed; inset: 0; z-index: 0; pointer-events: none;
      background-image: url('/VN-6.jpg');
      background-size: cover; background-position: center;
      opacity: 0.04; filter: grayscale(1);
    }

    .cbody { position: relative; z-index: 1; }

    /* Left accent panel */
    .c-left-panel {
      background: #1a1a1a; color: #fbfbfa;
      padding: clamp(48px, 8vw, 80px) clamp(28px, 5vw, 56px);
      display: flex; flex-direction: column; justify-content: space-between;
      min-height: 520px;
    }

    /* Form field — underline style */
    .cfield {
      position: relative; border-bottom: 1px solid #d4cfc8;
      transition: border-color 0.3s; padding-bottom: 10px; margin-bottom: 0;
    }
    .cfield.focused { border-bottom-color: #b8860b; }
    .cfield.has-error { border-bottom-color: #c0392b; }

    .cfield label {
      display: block; font-size: 0.58rem; letter-spacing: 0.22em;
      text-transform: uppercase; font-weight: 600; color: #999; margin-bottom: 6px;
      transition: color 0.3s;
    }
    .cfield.focused label { color: #b8860b; }
    .cfield.has-error label { color: #c0392b; }

    .cfield input, .cfield textarea {
      width: 100%; background: transparent; border: none; outline: none;
      font-size: 0.9rem; color: #1a1a1a; font-weight: 300;
      font-family: 'Inter', sans-serif; resize: none;
    }
    .cfield textarea { min-height: 90px; }

    /* Gold submit button */
    .csub-btn {
      display: flex; align-items: center; justify-content: center; gap: 12px;
      width: 100%; background: #1a1a1a; color: #fbfbfa;
      font-size: 0.62rem; letter-spacing: 0.28em; text-transform: uppercase;
      font-weight: 600; padding: 18px 32px; border: none; cursor: pointer;
      transition: background 0.28s, color 0.28s; margin-top: 6px;
    }
    .csub-btn:hover { background: #b8860b; }

    /* Info pill */
    .c-info-pill {
      display: flex; align-items: flex-start; gap: 14px;
      padding: 20px 0; border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .c-info-pill:last-child { border-bottom: none; }
    .c-info-icon {
      width: 34px; height: 34px; border: 1px solid rgba(255,255,255,0.2);
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      flex-shrink: 0; color: #b8860b; margin-top: 2px;
    }
    .c-info-label {
      font-size: 0.56rem; letter-spacing: 0.2em; text-transform: uppercase;
      font-weight: 600; color: rgba(255,255,255,0.45); margin-bottom: 5px;
    }
    .c-info-value {
      font-size: 0.85rem; color: rgba(255,255,255,0.88); font-weight: 300; line-height: 1.55;
    }
    .c-info-value a { color: inherit; text-decoration: none; }
    .c-info-value a:hover { color: #b8860b; }

    /* Gold line */
    .gold-bar { width: 40px; height: 1.5px; background: #b8860b; }

    /* Success screen */
    .c-success {
      display: flex; flex-direction: column; align-items: flex-start;
      gap: 18px; padding: 48px 0;
    }

    /* Panel image overlay */
    .panel-img-wrap { position: relative; overflow: hidden; }
    .panel-img-wrap img { width: 100%; height: 100%; object-fit: cover; display: block;
      filter: grayscale(0.3); transition: transform 0.7s ease; }
    .panel-img-wrap:hover img { transform: scale(1.04); }

    /* Divider line */
    .c-divider { width: 1px; background: #e0dbd3; align-self: stretch; }
  `;

  const serif = { fontFamily: "'Cormorant Garamond', serif" };

  const infoItems = [
    {
      icon: <MapPin size={14} />,
      label: "Studio Address",
      value: "Mumbai Studio, Maharashtra, India",
    },
    {
      icon: <Mail size={14} />,
      label: "Email",
      value: <a href="mailto:info@vnfashion.com">info@vnfashion.com</a>,
    },
    {
      icon: <Phone size={14} />,
      label: "Phone",
      value: <a href="tel:+917798370430">+91 77983 70430</a>,
    },
    {
      icon: <Clock size={14} />,
      label: "Atelier Hours",
      value: <>Mon – Sat &nbsp;|&nbsp; 10:00 AM – 07:00 PM<br />Sunday: Closed</>,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className="cpage">
      <style>{css}</style>
      <div className="cwm" />
      <Navbar />

      <div className="cbody" style={{ paddingTop: "128px", paddingBottom: "0" }}>

        {/* ── Hero headline ───────────────────────────────── */}
        <div style={{ padding: "0 clamp(20px,5vw,80px) 56px", maxWidth: "1380px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
          >
            <p style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 600, color: "#b8860b", marginBottom: "16px" }}>
              Get In Touch
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "20px" }}>
              <h1 style={{ ...serif, fontSize: "clamp(2.8rem, 7vw, 6.5rem)", fontWeight: 300, lineHeight: 0.94, letterSpacing: "-0.02em", color: "#1a1a1a", margin: 0 }}>
                Shape the future<br /><em style={{ fontStyle: "italic" }}>of your style.</em>
              </h1>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingBottom: "8px" }}>
                <div className="gold-bar" />
                <p style={{ fontSize: "0.78rem", color: "#888", fontWeight: 300, maxWidth: "280px", lineHeight: 1.65, margin: 0 }}>
                  Every great design starts with a dialogue. Tell us your vision.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Main grid ───────────────────────────────────── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "680px" }}
          className="contact-main-grid"
        >
          <style>{`
            @media(max-width:900px){
              .contact-main-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>

          {/* Left — Dark Info Panel */}
          <motion.div
            className="c-left-panel"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 0.61, 0.36, 1] }}
          >
            {/* Atelier image */}
            <div className="panel-img-wrap" style={{ marginBottom: "40px", height: "220px" }}>
              <img src="/HeroBg.jpg" alt="VN Fashion Atelier" />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(26,26,26,0.6) 0%, transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: "18px", left: "18px" }}>
                <span style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, color: "#b8860b" }}>VN Fashion Atelier</span>
              </div>
            </div>

            <div>
              <p style={{ ...serif, fontSize: "1.5rem", fontWeight: 300, color: "rgba(255,255,255,0.9)", lineHeight: 1.3, marginBottom: "32px" }}>
                "Crafted for those who<br />dare to be distinct."
              </p>

              <div>
                {infoItems.map((item, i) => (
                  <div key={i} className="c-info-pill">
                    <div className="c-info-icon">{item.icon}</div>
                    <div>
                      <p className="c-info-label">{item.label}</p>
                      <p className="c-info-value">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Form Panel */}
          <motion.div
            style={{ background: "#fbfbfa", padding: "clamp(40px,6vw,72px) clamp(24px,5vw,56px)" }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 0.61, 0.36, 1], delay: 0.1 }}
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  className="c-success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div style={{ width: "52px", height: "52px", borderRadius: "50%", border: "1.5px solid #b8860b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CheckCircle size={22} color="#b8860b" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, color: "#b8860b", marginBottom: "10px" }}>Message Sent</p>
                    <h3 style={{ ...serif, fontSize: "2.5rem", fontWeight: 300, color: "#1a1a1a", lineHeight: 1.1, marginBottom: "12px" }}>Thank you.</h3>
                    <p style={{ fontSize: "0.82rem", color: "#888", lineHeight: 1.75, fontWeight: 300, maxWidth: "340px" }}>
                      Your message has been received. Our atelier team will be in touch with you shortly.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    style={{ fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 600, color: "#1a1a1a", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", padding: 0, marginTop: "8px" }}
                  >
                    Send Another Message <ArrowRight size={14} />
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <p style={{ fontSize: "0.6rem", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 600, color: "#b8860b", marginBottom: "32px" }}>
                    Send a Message
                  </p>

                  {/* Name row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "28px" }}>
                    <div className={`cfield${focused === "firstName" ? " focused" : ""}`}>
                      <label htmlFor="firstName">First Name *</label>
                      <input
                        id="firstName" name="firstName" type="text" required
                        value={formData.firstName} onChange={handleChange}
                        onFocus={() => setFocused("firstName")}
                        onBlur={() => setFocused("")}
                        placeholder="Vidisha"
                      />
                    </div>
                    <div className={`cfield${focused === "lastName" ? " focused" : ""}`}>
                      <label htmlFor="lastName">Last Name *</label>
                      <input
                        id="lastName" name="lastName" type="text" required
                        value={formData.lastName} onChange={handleChange}
                        onFocus={() => setFocused("lastName")}
                        onBlur={() => setFocused("")}
                        placeholder="Natekar"
                      />
                    </div>
                  </div>

                  {/* Email + Phone row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "28px" }}>
                    <div className={`cfield${focused === "email" ? " focused" : ""}${emailError ? " has-error" : ""}`}>
                      <label htmlFor="email">{emailError ? emailError : "Email Address *"}</label>
                      <input
                        id="email" name="email" type="email" required
                        value={formData.email} onChange={handleChange}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused("")}
                        placeholder="hello@gmail.com"
                      />
                    </div>
                    <div className={`cfield${focused === "phone" ? " focused" : ""}`}>
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        id="phone" name="phone" type="tel" required
                        value={formData.phone} onChange={handleChange}
                        onFocus={() => setFocused("phone")}
                        onBlur={() => setFocused("")}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className={`cfield${focused === "message" ? " focused" : ""}`} style={{ marginBottom: "36px" }}>
                    <label htmlFor="message">Your Message *</label>
                    <textarea
                      id="message" name="message" required
                      value={formData.message} onChange={handleChange}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused("")}
                      placeholder="Tell us about your vision, project, or inquiry..."
                      rows={5}
                    />
                  </div>

                  <button type="submit" className="csub-btn">
                    Send Message <ArrowRight size={15} />
                  </button>

                  <p style={{ fontSize: "0.62rem", color: "#aaa", marginTop: "16px", fontWeight: 300, textAlign: "center", lineHeight: 1.6 }}>
                    We typically respond within 1–2 business days.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* ── Bottom strip with social links ──────────────── */}
        <motion.div
          style={{
            borderTop: "1px solid #e0dbd3",
            padding: "28px clamp(20px,5vw,80px)",
            display: "flex", flexWrap: "wrap", alignItems: "center",
            justifyContent: "space-between", gap: "18px",
            background: "#fbfbfa", position: "relative", zIndex: 1,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <div className="gold-bar" />
            <span style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, color: "#888" }}>
              VN Fashion — Mumbai Atelier
            </span>
          </div>
          <div style={{ display: "flex", gap: "24px" }}>
            {["Instagram", "Pinterest", "Behance"].map((s) => (
              <a key={s} href="#"
                style={{ fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 600, color: "#888", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#b8860b"}
                onMouseLeave={e => e.target.style.color = "#888"}
              >
                {s}
              </a>
            ))}
          </div>
        </motion.div>

      </div>

      <Footer />

      <ErrorModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        title="Error"
        message={errorMessage}
      />
    </div>
  );
};

export default Contact;
