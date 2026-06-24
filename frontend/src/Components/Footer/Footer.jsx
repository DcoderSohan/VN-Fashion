import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Instagram, Facebook, Youtube, MessageCircle, Linkedin, Github, Globe,
  Mail as MailIcon, Phone, MapPin, Share2,
} from "lucide-react";
import { contentApi } from "../../utils/api";

const SERIF = "'Playfair Display', 'Times New Roman', serif";
const SANS = "'Raleway', system-ui, sans-serif";

const iconMap = {
  Instagram, Facebook, Twitter: null, Youtube, WhatsApp: MessageCircle,
  LinkedIn: Linkedin, GitHub: Github, Globe, Mail: MailIcon,
  Phone, MapPin, Share2,
};

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

const COLL_LINKS = [
  { name: "Bridal Wear", href: "/gallery" },
  { name: "Aari Embroidery", href: "/services" },
  { name: "Custom Designs", href: "/services" },
  { name: "Fabric Painting", href: "/services" },
  { name: "Ready-to-Wear", href: "/gallery" },
];

const Footer = () => {
  const phoneNumber = "7798370430";
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await contentApi.getSettings();
        if (res.data) {
          const links = res.data.socialLinks || [];
          setSocialLinks(links.sort((a, b) => (a.order || 0) - (b.order || 0)));
        }
      } catch (_) {
        setSocialLinks([
          { name: "Instagram", icon: "Instagram", url: "https://instagram.com/vnfashion", order: 0 },
          { name: "WhatsApp", icon: "WhatsApp", url: `https://api.whatsapp.com/send?phone=${phoneNumber}`, order: 1 },
        ]);
      }
    })();
  }, []);

  const mappedSocials = useMemo(() =>
    socialLinks.map(l => ({ name: l.name, icon: iconMap[l.icon] || Globe, href: l.url })),
    [socialLinks]
  );

  return (
    <footer className="ft-root" aria-label="Site footer">
      <div className="ft-inner">

        {/* ── Top row: logo + tagline ── */}
        <div className="ft-top">
          <Link to="/" className="ft-logo" style={{ fontFamily: "'Cormorant Garamond', serif" }}
            aria-label="VN Fashion Home">
            VN FASHION
          </Link>
          <p className="ft-tagline" style={{ fontFamily: SANS }}>
            Atelier of intentional design
          </p>
        </div>

        {/* ── Main columns ── */}
        <div className="ft-columns">

          {/* About blurb + socials */}
          <div className="ft-col ft-col-brand">
            <p className="ft-blurb" style={{ fontFamily: SANS }}>
              Transforming fashion through intentional design and artisan craft.
              Each piece a testament to tradition and modernity.
            </p>
            <div className="ft-socials">
              {mappedSocials.map(s => {
                const Icon = s.icon;
                if (!Icon) return null;
                return (
                  <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                    aria-label={s.name} className="ft-social-icon">
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <div className="ft-col">
            <h4 className="ft-col-heading" style={{ fontFamily: SANS }}>Navigation</h4>
            <ul className="ft-links">
              {NAV_LINKS.map(l => (
                <li key={l.name}>
                  <Link to={l.href} className="ft-link" style={{ fontFamily: SANS }}>
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Collections */}
          <div className="ft-col">
            <h4 className="ft-col-heading" style={{ fontFamily: SANS }}>Collections</h4>
            <ul className="ft-links">
              {COLL_LINKS.map(l => (
                <li key={l.name}>
                  <Link to={l.href} className="ft-link" style={{ fontFamily: SANS }}>
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="ft-col">
            <h4 className="ft-col-heading" style={{ fontFamily: SANS }}>Contact</h4>
            <ul className="ft-links">
              <li>
                <a href={`tel:+91${phoneNumber}`} className="ft-link" style={{ fontFamily: SANS }}>
                  +91 {phoneNumber}
                </a>
              </li>
              <li>
                <a href="mailto:info@vnfashion.com" className="ft-link" style={{ fontFamily: SANS }}>
                  info@vnfashion.com
                </a>
              </li>
              <li>
                <p className="ft-address" style={{ fontFamily: SANS }}>
                  Ratnagiri,<br />Maharashtra — 415 626
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="ft-bottom">
          <p className="ft-copy" style={{ fontFamily: SANS }}>
            © {new Date().getFullYear()} VN Fashion. All rights reserved.
          </p>
          <p className="ft-credit" style={{ fontFamily: SANS }}>
            Designed &amp; Developed by{" "}
            <a href="https://sohansarang.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="ft-credit-link">
              Sohan Sarang
            </a>
          </p>
        </div>
      </div>

      <style>{`
        .ft-root {
          width: 100%;
          background: #f8f7f5;
          border-top: 1px solid #e5e7eb;
        }
        .ft-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 3rem;
        }
        @media (max-width: 1023px) { .ft-inner { padding: 0 2rem; } }
        @media (max-width: 640px)  { .ft-inner { padding: 0 1.25rem; } }

        /* Top */
        .ft-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 2rem 0;
          border-bottom: 1px solid #e5e7eb;
        }
        @media (max-width: 640px) {
          .ft-top { flex-direction: column; gap: 0.5rem; align-items: flex-start; }
        }
        .ft-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #0a0a0a;
          text-decoration: none;
          transition: opacity 0.3s;
        }
        .ft-logo:hover { opacity: 0.7; }
        .ft-tagline {
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #9ca3af;
          margin: 0;
        }

        /* Columns */
        .ft-columns {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 3rem;
          padding: 2.5rem 0;
        }
        @media (max-width: 768px) {
          .ft-columns {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
        }
        @media (max-width: 480px) {
          .ft-columns { grid-template-columns: 1fr; gap: 1.5rem; }
        }

        .ft-col {}
        .ft-col-heading {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: #0a0a0a;
          margin: 0 0 1rem;
        }
        .ft-blurb {
          font-size: 0.78rem;
          font-weight: 400;
          line-height: 1.7;
          color: #6b7280;
          margin: 0 0 1.25rem;
          max-width: 280px;
        }
        .ft-socials {
          display: flex;
          gap: 0.5rem;
        }
        .ft-social-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #e5e7eb;
          color: #6b7280;
          text-decoration: none;
          transition: color 0.25s, border-color 0.25s, background 0.25s;
        }
        .ft-social-icon:hover {
          color: #ffffff;
          background: #0a0a0a;
          border-color: #0a0a0a;
        }

        .ft-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }
        .ft-link {
          font-size: 0.75rem;
          font-weight: 400;
          color: #6b7280;
          text-decoration: none;
          transition: color 0.25s;
        }
        .ft-link:hover { color: #0a0a0a; }
        .ft-address {
          font-size: 0.75rem;
          font-weight: 400;
          color: #6b7280;
          line-height: 1.6;
          margin: 0;
        }

        /* Bottom bar */
        .ft-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 0;
          border-top: 1px solid #e5e7eb;
          gap: 1rem;
        }
        @media (max-width: 640px) {
          .ft-bottom {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }
        }
        .ft-copy {
          font-size: 0.55rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #9ca3af;
          margin: 0;
        }
        .ft-credit {
          font-size: 0.55rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #9ca3af;
          margin: 0;
        }
        .ft-credit-link {
          background: none;
          border: none;
          cursor: pointer;
          font-size: inherit;
          font-weight: 700;
          letter-spacing: inherit;
          text-transform: uppercase;
          color: #0a0a0a;
          text-decoration: underline;
          text-underline-offset: 2px;
          font-family: inherit;
          padding: 0;
          transition: color 0.25s;
        }
        .ft-credit-link:hover { color: #b8860b; }
      `}</style>
    </footer>
  );
};

export default React.memo(Footer);
