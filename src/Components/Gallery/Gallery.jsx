// Gallery.jsx
import React from "react";
import "./Gallery.css";

const images = [
  "/VN-1.jpg", "/VN-2.jpg", "/VN-3.jpg",
  "/VN-4.jpg", "/VN-5.jpg", "/VN-6.jpg",
  "/VN-1.jpg", "/VN-2.jpg", "/VN-3.jpg",
  "/VN-4.jpg", "/VN-5.jpg", "/VN-6.jpg",
];

const masonrySpans = [
  "row-span-1","row-span-2","row-span-1","row-span-2",
  "row-span-1","row-span-1","row-span-2","row-span-1",
  "row-span-1","row-span-2","row-span-1","row-span-1",
];

const Gallery = () => {
  return (
    <div id="gallery">
      <h1 className="text-center text-5xl font-semibold mt-16 py-10">
        My Work
      </h1>
      {/* Responsive mobile/tablet behavior with unchanged desktop layout */}
      <div className="px-4 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((src, idx) => (
          <div
            key={idx}
            className={`
              overflow-hidden rounded-lg shadow-md bg-white animate-fadeIn
              ${masonrySpans[idx % masonrySpans.length]}
            `}
            style={{
              animationDelay: `${idx * 80}ms`,
              animationFillMode: "both",
            }}
          >
            <img
              src={src}
              alt={`Gallery ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
