import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, MessageCircle } from "lucide-react";

const Footer = () => {
  const phoneNumber = "7798370430";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}`;

  const socialLinks = [
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/vnfashion", // Update with actual links
      color: "hover:text-pink-600",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://facebook.com/vnfashion",
      color: "hover:text-blue-600",
    },
    {
      name: "YouTube",
      icon: Youtube,
      href: "https://youtube.com/@vnfashion",
      color: "hover:text-red-600",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: whatsappUrl,
      color: "hover:text-green-600",
    },
  ];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div
                className="morphing-square bg-white shadow-lg flex items-center justify-center rounded-lg"
                style={{ width: 56, height: 56 }}
              >
                <img src="/VN.png" alt="VN Fashion Logo" width={40} height={40} />
              </div>
              <span className="text-white text-xl sm:text-2xl font-Unbounded">
                VN FASHION
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transforming Fashion, One Design at a Time. Crafting exquisite designs with passion and precision.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-4 h-4" />
                <a
                  href={`tel:${phoneNumber}`}
                  className="hover:text-white transition-colors"
                >
                  +91 {phoneNumber}
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-4 h-4" />
                <a
                  href="mailto:info@vnfashion.com"
                  className="hover:text-white transition-colors"
                >
                  info@vnfashion.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-1" />
                <span>Your Location, City, State</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 ${social.color} transition-colors`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
            <p className="text-gray-400 text-xs mt-4">
              Stay connected for latest designs and updates
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-gray-400 text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} VN Fashion. All rights reserved.
          </div>
          <div className="text-gray-400 text-sm text-center sm:text-right">
            Developed by{" "}
            <a
              href="https://your-portfolio-url.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 font-semibold underline transition-colors"
            >
              Sohan Sarang
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
