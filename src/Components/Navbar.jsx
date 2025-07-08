import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Gallery", href: "#gallery" },
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
              <span className="text-2xl font-bold text-blue-600 tracking-tight">
                VN Fashion
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
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="h-7 w-7" />
                ) : (
                  <Menu className="h-7 w-7" />
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
          className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-30 transform transition-transform duration-300 ease-in-out
            ${isOpen ? "translate-x-0" : "translate-x-full"}
          md:hidden`}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <span className="text-xl font-bold text-blue-600">
                VN Fashion
              </span>
              <button
                onClick={toggleMenu}
                className="text-gray-700 hover:text-blue-600 focus:outline-none"
                aria-label="Close menu"
              >
                <X className="h-7 w-7" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col gap-2 px-6 py-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded transition-colors duration-200 text-lg"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </nav>

      {/* Demo content */}
      <div className="pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <section
            id="home"
            className="min-h-screen flex items-center justify-center bg-blue-50 rounded-lg"
          >
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Home Section
              </h1>
              <p className="text-lg text-gray-600">
                This is the home section content.
              </p>
            </div>
          </section>

          <section
            id="about"
            className="min-h-screen flex items-center justify-center bg-green-50 rounded-lg"
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                About Section
              </h2>
              <p className="text-lg text-gray-600">
                This is the about section content.
              </p>
            </div>
          </section>

          <section
            id="services"
            className="min-h-screen flex items-center justify-center bg-purple-50 rounded-lg"
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Services Section
              </h2>
              <p className="text-lg text-gray-600">
                This is the services section content.
              </p>
            </div>
          </section>

          <section
            id="gallery"
            className="min-h-screen flex items-center justify-center bg-yellow-50 rounded-lg"
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Gallery Section
              </h2>
              <p className="text-lg text-gray-600">
                This is the gallery section content.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
