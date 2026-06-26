import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Classes", href: "/classes" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  /* ---- Scroll detection ---- */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---- Lock body scroll when drawer open ---- */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  /* ---- Close drawer on route change ---- */
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((p) => !p), []);

  return (
    <>
      {/* ============ MAIN NAVBAR ============ */}
      <nav className={`vn-navbar${isScrolled ? " scrolled" : ""}`} role="navigation" aria-label="Main navigation">
        <div className="vn-nav-inner">

          {/* Logo */}
          <Link to="/" className="vn-logo" aria-label="VN Fashion — Home">
            VN FASHION
          </Link>

          {/* Desktop nav links */}
          <ul className="vn-links" role="list">
            {NAV_ITEMS.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`vn-link${location.pathname === item.href ? " active" : ""}`}
                  aria-current={location.pathname === item.href ? "page" : undefined}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="vn-cta">
            <Link to="/booking" className="vn-book-btn" aria-label="Book an appointment">
              <span className="btn-text">Book Appointment</span>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`vn-hamburger${isOpen ? " open" : ""}`}
            onClick={toggle}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="vn-drawer"
          >
            <span className="vn-bar" aria-hidden="true" />
            <span className="vn-bar" aria-hidden="true" />
            <span className="vn-bar" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* ============ MOBILE OVERLAY ============ */}
      <div
        className={`vn-overlay${isOpen ? " visible" : ""}`}
        onClick={close}
        aria-hidden="true"
      />

      {/* ============ MOBILE DRAWER ============ */}
      <aside
        id="vn-drawer"
        className={`vn-drawer${isOpen ? " open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!isOpen}
      >
        {/* Drawer header */}
        <div className="vn-drawer-head">
          <Link to="/" className="vn-logo" onClick={close} aria-label="VN Fashion — Home">
            VN FASHION
          </Link>
          <button
            className="vn-drawer-close"
            onClick={close}
            aria-label="Close menu"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Drawer nav links */}
        <nav className="vn-drawer-nav" aria-label="Drawer navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`vn-drawer-link${location.pathname === item.href ? " active" : ""}`}
              onClick={close}
              aria-current={location.pathname === item.href ? "page" : undefined}
            >
              {item.name}
              <span className="vn-drawer-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </nav>

        {/* Drawer footer CTA */}
        <div className="vn-drawer-footer">
          <Link to="/booking" className="vn-drawer-book-btn" onClick={close}>
            <span className="btn-text" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Book Appointment
            </span>
          </Link>
          <p className="vn-drawer-label">EST. 2024 — ATELIER VN</p>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
