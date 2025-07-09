  // ... existing code ...
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
          className={`
            fixed top-0 right-0 h-full w-4/5 max-w-xs bg-white z-30 flex flex-col
            transform transition-transform duration-500 ease-in-out
            ${isOpen ? "translate-x-0" : "translate-x-full"}
            md:hidden
          `}
          style={{ boxShadow: isOpen ? "0 0 0 9999px rgba(0,0,0,0.3)" : "none" }}
        >
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
          <nav className="flex-1 flex flex-col gap-4 px-6 py-10 items-center justify-center">
            {navItems.map((item, idx) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded transition-colors duration-200 text-2xl font-semibold"
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
// ... existing code ...