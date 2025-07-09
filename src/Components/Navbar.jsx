import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  // Move useState inside the component
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div>
      <nav className="fixed w-full z-20 border-b border-gray-200 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <span className="text-3xl font-bold text-blue-600 tracking-tight font-Poppins">
                <a href="/">VN FASHION</a>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="relative group text-gray-700 hover:text-blue-600 px-3 py-2 text-base font-medium transition-colors duration-200"
                >
                  {item.name}
                  <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 text-xl"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  "Close"
                ) : (
                  "Menu"
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`fixed inset-0 z-10 bg-black bg-opacity-30 transition-opacity duration-300 ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        ></div>
        <div
          className={`fixed left-0 top-0 w-full h-full z-30 flex flex-col md:hidden transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] 
            bg-white
            ${isOpen ? "translate-x-0" : "translate-x-full"}
          `}
          style={{ transformOrigin: "top right" }}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <span className="text-4xl font-bold text-blue-600">VN Fashion</span>
            <button
              onClick={toggleMenu}
              className="text-gray-700 text-xl"
              aria-label="Close menu"
            >
              Close
            </button>
          </div>
          <nav className="flex-1 flex flex-col gap-4 px-6 py-10 items-center justify-center animate-fade-in">
            {navItems.map((item, idx) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded transition-colors duration-200 text-4xl font-semibold"
                onClick={() => setIsOpen(false)}
                style={{
                  transitionDelay: `${isOpen ? idx * 60 + 100 : 0}ms`,
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(20px)",
                  transitionProperty: "opacity, transform",
                }}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
