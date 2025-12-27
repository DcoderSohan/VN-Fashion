import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, MessageCircle, Linkedin, Github, Globe, Mail as MailIcon, Share2 } from "lucide-react";
import { contentApi } from "../../utils/api";
import DeveloperModal from "../Modal/DeveloperModal";
import "../Navbar/Navbar.css";

// Icon mapping for dynamic icon rendering
const iconMap = {
  Instagram: Instagram,
  Facebook: Facebook,
  Twitter: null, // Add if needed
  Youtube: Youtube,
  WhatsApp: MessageCircle,
  LinkedIn: Linkedin,
  GitHub: Github,
  Globe: Globe,
  Mail: MailIcon,
  Phone: Phone,
  MapPin: MapPin,
  Share2: Share2,
};

const Footer = () => {
  const phoneNumber = "7798370430";
  const [socialLinks, setSocialLinks] = useState([]);
  const [showDeveloperModal, setShowDeveloperModal] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await contentApi.getSettings();
        if (response.data) {
          const links = response.data.socialLinks || [];
          // Sort by order
          const sortedLinks = links.sort((a, b) => (a.order || 0) - (b.order || 0));
          setSocialLinks(sortedLinks);
        }
      } catch (error) {
        console.error('Error fetching settings:', error);
        // Use fallback values if API fails
        setSocialLinks([
          {
            name: "Instagram",
            icon: "Instagram",
            url: "https://instagram.com/vnfashion",
            order: 0,
          },
          {
            name: "WhatsApp",
            icon: "WhatsApp",
            url: `https://api.whatsapp.com/send?phone=${phoneNumber}`,
            order: 1,
          },
        ]);
      }
    };
    fetchSettings();
  }, []);

  // Map social links to footer format (memoized for performance)
  const mappedSocialLinks = useMemo(() => {
    return socialLinks.map((link) => {
      const IconComponent = iconMap[link.icon] || Globe;
      return {
        name: link.name,
        icon: IconComponent,
        href: link.url,
        color: "hover:text-blue-600",
      };
    });
  }, [socialLinks]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <footer className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="morphing-square bg-white flex items-center justify-center shadow-lg overflow-hidden" style={{ width: 40, height: 40 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    WebkitMaskImage: 'url("/VN.png")',
                    maskImage: 'url("/VN.png")',
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskSize: "contain",
                    maskSize: "contain",
                    WebkitMaskPosition: "center",
                    maskPosition: "center",
                    background: "linear-gradient(90deg, #ff00cc, #3333ff, #00ffcc, #ffcc00)",
                    backgroundSize: "200% 200%",
                    animation: "rainbow 4s ease-in-out infinite",
                  }}
                />
              </div>
              <span className="text-white text-lg sm:text-xl md:text-2xl font-Unbounded font-semibold">
                VN FASHION
              </span>
            </Link>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Transforming Fashion, One Design at a Time. Crafting exquisite designs with passion and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-xs sm:text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Contact Us</h3>
            <ul className="space-y-2 sm:space-y-3">
              <li className="flex items-center gap-2 sm:gap-3 text-gray-400 text-xs sm:text-sm">
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <a
                  href={`tel:${phoneNumber}`}
                  className="hover:text-white transition-colors break-all"
                >
                  +91 {phoneNumber}
                </a>
              </li>
              <li className="flex items-center gap-2 sm:gap-3 text-gray-400 text-xs sm:text-sm">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                <a
                  href="mailto:info@vnfashion.com"
                  className="hover:text-white transition-colors break-all"
                >
                  info@vnfashion.com
                </a>
              </li>
              <li className="flex items-start gap-2 sm:gap-3 text-gray-400 text-xs sm:text-sm">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mt-0.5 sm:mt-1 flex-shrink-0" />
                <span>Gavade Ambere Kharviwada, Ratnagiri, Maharashtra - 415 626</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Follow Us</h3>
            <div className="flex gap-3 sm:gap-4 flex-wrap">
              {mappedSocialLinks.length > 0 ? (
                mappedSocialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 ${social.color} transition-colors`}
                      aria-label={social.name}
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.a>
                  );
                })
              ) : (
                <p className="text-gray-400 text-xs">No social links configured</p>
              )}
            </div>
            {mappedSocialLinks.length > 0 && (
              <p className="text-gray-400 text-xs mt-3 sm:mt-4">
                Stay connected for latest designs and updates
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-gray-400 text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} VN Fashion. All rights reserved.
          </div>
          <div className="text-gray-400 text-xs sm:text-sm text-center sm:text-right">
            Developed by{" "}
            <motion.button
              onClick={() => setShowDeveloperModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-blue-400 hover:text-blue-300 font-semibold underline transition-colors cursor-pointer text-xs sm:text-sm"
            >
              Sohan Sarang
            </motion.button>
          </div>
        </div>
      </div>

      {/* Developer Modal */}
      <DeveloperModal
        isOpen={showDeveloperModal}
        onClose={() => setShowDeveloperModal(false)}
      />
    </footer>
  );
};

export default React.memo(Footer);
