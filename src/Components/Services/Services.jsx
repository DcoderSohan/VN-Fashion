import React, { useState } from "react";

const Services = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const services = [
    {
      id: 1,
      title: "Aari Embroidery",
      description:
        "Traditional hooked‑needle technique creating chain‑stitch motifs using silk, cotton, or metallic threads to form delicate, continuous designs on fabric.",
      image: "/public/aariWork.jpg", // Example, update as needed
    },
    {
      id: 2,
      title: "Bead Embroidery",
      description:
        "Decorative embellishment where beads are stitched onto fabric to create textured, ornate patterns on clothing and accessories.",
      image: "/public/beadWork.jpg", // Add your image
    },
    {
      id: 3,
      title: "Mirror Work",
      description:
        "Incorporating small mirrors into fabric by securing them with embroidery stitches, adding sparkle and symbolic charm.",
      image: "/public/mirrorWork.jpg", // Add your image
    },
    {
      id: 4,
      title: "Cut‑Pipe & Cutwork Embellishment",
      description:
        "Techniques involving fabric tubing (cut‑pipe) or cutting away sections of the base fabric (cutwork), reinforced and filled with embroidery or lace.",
      image: "/public/cutPipe.jpg", // Add your image
    },
    {
      id: 5,
      title: "Zari Thread Work",
      description:
        "Rich metallic thread embroidery—traditionally gold or silver—that imparts shimmer and opulence to fabric designs.",
      image: "/public/zariWork.jpg", // Add your image
    },
    {
      id: 6,
      title: "Silk‑Thread Butta Work",
      description:
        "Tiny motifs embroidered with silk thread (buttas) across the fabric to create repeated ornamental patterns.",
      image: "/public/silkButta.jpg", // Add your image
    },
    {
      id: 7,
      title: "Net Overlay Work",
      description:
        "Adding net overlays, stitched and decorated with complementary embroidery elements for added texture and dimension.",
      image: "/public/netOverlay.jpg", // Add your image
    },
    {
      id: 8,
      title: "Patchwork Embroidery",
      description:
        "Applying and stitching smaller fabric pieces onto a base, often embellished with additional embroidery for depth.",
      image: "/public/patchwork.jpg", // Add your image
    },
    {
      id: 9,
      title: "3D Embellishments",
      description:
        "Creating raised, dimensional embroidery designs (like padded stitches or layered motifs) that stand out from the fabric surface.",
      image: "/public/3DEmbellishments.jpg", // Add your image
    },
  ];

  const handleCardClick = (cardId) => {
    setSelectedCard(selectedCard === cardId ? null : cardId);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div
      className="min-h-screen p-8 bg-gradient-to-br from-blue-100 via-pink-100 to-orange-100"
      id="services"
    >
      <div className="py-24 w-[100%] mx-auto">
        <h1 className="text-4xl font-bold text-center text-black mb-12">
          Our Services
        </h1>

        {/* Desktop and Tablet Layout (md and up) */}
        <div className="hidden md:flex gap-4 h-96">
          {services.map((service) => (
            <div
              key={service.id}
              className={`
                relative cursor-pointer rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-in-out
                ${
                  selectedCard === service.id
                    ? "flex-[3] opacity-100"
                    : selectedCard === null
                    ? "flex-1 opacity-100"
                    : "flex-[0.5] opacity-70 hover:opacity-90"
                }
                bg-white/20 backdrop-blur-md border border-white/30
              `}
              style={{
                backgroundImage: `url(${service.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              onClick={() => handleCardClick(service.id)}
            >
              <div className="relative z-10 p-6 h-full flex flex-col justify-between text-black">
                <div>
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3
                    className={`
                    font-bold transition-all duration-300 opacity-95
                    ${selectedCard === service.id ? "text-2xl" : "text-xl"}
                  `}
                  >
                    {service.title}
                  </h3>
                </div>

                <div
                  className={`
                  transition-all duration-500 overflow-hidden opacity-
                  ${
                    selectedCard === service.id
                      ? "max-h-96 opacity-100 mt-4"
                      : "max-h-0 opacity-0"
                  }
                `}
                >
                  <p className="text-black leading-relaxed mb-4">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 bg-white/10 rounded-tr-full"></div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel Layout (sm and below) */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            {/* Carousel Container */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {services.map((service) => (
                <div
                  key={service.id}
                  className="w-[340px] flex-shrink-0 px-2 mx-auto" // Fixed width, centered
                >
                  <div
                    className="rounded-lg shadow-lg p-6 relative overflow-hidden border border-white/30"
                    style={{
                      height: "32rem",
                      backgroundImage: `url(${service.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="relative z-10 h-full flex flex-col gap-20 bg-white/15 backdrop-blur-md rounded-lg p-4">
                      <div className="text-4xl mb-4">{service.icon}</div>
                      <h3 className="text-xl font-bold text-black mb-4 opacity-95">
                        {service.title}
                      </h3>
                      <p className="text-black leading-relaxed text-sm flex-1 overflow-y-auto">
                        {service.description}
                      </p>
                    </div>
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-full"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 bg-white/10 rounded-tr-full"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-2 hover:bg-white/30 transition-colors duration-200"
            >
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full p-2 hover:bg-white/30 transition-colors duration-200"
            >
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Reset button for desktop/tablet */}
        {selectedCard && (
          <div className="hidden md:block text-center mt-8">
            <button
              onClick={() => setSelectedCard(null)}
              className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
            >
              Reset View
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;