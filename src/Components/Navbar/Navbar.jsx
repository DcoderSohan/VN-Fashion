import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleNavClick = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      }
    }
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  return (
    <nav
      className={`fixed w-full z-20 py-2 transition-all duration-300 ${
        isScrolled ? "nav-bg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2 font-Unbounded text-3xl">
              <div
                className="morphing-square bg-black shadow-lg flex items-center justify-center"
                style={{ width: 56, height: 56 }}
              >
                <img src="/VN.png" alt="VN Fashion Logo" width={40} height={40} />
              </div>
              <span className="text-black">VN FASHION</span>
            </a>
          </div>
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group relative px-3 py-2 text-base font-medium text-gray-700 transition-colors duration-200"
                onClick={(e) => handleNavClick(e, item.href)}
              >
                {item.name}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Toggle menu">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-30 bg-black bg-opacity-30 transition-opacity ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
        style={{ touchAction: "none" }}
      />

      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 w-4/5 max-w-xs h-full z-40 flex flex-col bg-white shadow-lg transition-transform duration-500 md:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <a href="/" className="flex items-center gap-2 text-3xl font-semibold">
            <div className="morphing-square bg-black flex items-center justify-center" style={{ width: 56, height: 56 }}>
              <img src="/VN.png" alt="VN Fashion Logo" width={40} height={40} />
            </div>
            <span>VN FASHION</span>
          </a>
          <button onClick={toggleMenu} aria-label="Close menu">
            <X size={28} />
          </button>
        </div>
        <nav className="flex-1 flex flex-col items-center justify-center px-6 py-10 space-y-4">
          {navItems.map((item, idx) => (
            <a
              key={item.name}
              href={item.href}
              className="text-2xl text-gray-700 transition-opacity transform"
              style={{
                transitionDelay: `${isOpen ? idx * 60 + 100 : 0}ms`,
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? "translateY(0)" : "translateY(20px)",
                transitionProperty: "opacity, transform",
              }}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.name}
            </a>
          ))}
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
