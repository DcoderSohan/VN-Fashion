import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 py-6 px-4">
      <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
        {/* Logo and brand */}
        <a href="/" className="flex items-center gap-2">
          <div
            className="morphing-square bg-black shadow-lg flex items-center justify-center"
            style={{ width: 56, height: 56 }}
          >
            <img src="/VN.png" alt="VN Fashion Logo" width={40} height={40} />
          </div>
          <span className="text-black text-xl sm:text-2xl font-Unbounded">
            VN FASHION
          </span>
        </a>

        {/* Copyright */}
        <div className="text-gray-600 text-sm text-center">
          &copy; {new Date().getFullYear()} VN Fashion. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
