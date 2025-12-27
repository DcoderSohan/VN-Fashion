import React, { useState, useEffect } from "react";

const logo = "/VN.png";

const HeroSection = () => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    async function loadDefaultImage() {
      try {
        const response = await fetch(logo);
        const blob = await response.blob();
        const file = new File([blob], "default.png", { type: blob.type });
        // Note: parseLogoImage function not available in this environment
        // const parsedData = await parseLogoImage(file);
        // setImageData(parsedData?.imageData ?? null);
      } catch (err) {
        console.error("Error loading default image:", err);
      }
    }

    loadDefaultImage();
  }, []);

  const bgImage = "/HeroBg.jpg"; // or "/HeroBgImg.jpg"

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />
      
      {/* Content goes here */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="relative w-full h-full">
          {/* Main Logo Container */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold select-none">
            {/* Base metallic text */}
            <div
              className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] mx-auto"
              style={{
                WebkitMaskImage: 'url("./VN.png")',
                maskImage: 'url("./VN.png")',
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                background:
                  "linear-gradient(90deg, #ff00cc, #3333ff, #00ffcc, #ffcc00)",
                backgroundSize: "200% 200%",
                animation: "rainbow 4s ease-in-out infinite",
              }}
            />

            {/* Chrome reflection effect */}
            <div className="absolute inset-0 text-transparent bg-gradient-to-b from-white via-transparent to-gray-600 bg-clip-text opacity-30">
              <img src="./VN.png" alt="" loading="lazy" />
            </div>

            {/* Additional metallic depth */}
            <div className="absolute inset-0 text-transparent bg-gradient-to-tr from-gray-600 via-gray-200 to-gray-400 bg-clip-text opacity-20">
              <img src="./VN.png" alt="" loading="lazy" />
            </div>
          </div>

          {/* Horizontally Scrolling Text Overlay - Full width at bottom */}
          <div className="absolute bottom-14 left-0 right-0 h-[120px] sm:h-[150px] md:h-[200px] lg:h-[300px] overflow-hidden w-full">
            <div className="scrolling-text-container">
              <div className="scrolling-text-wrapper">
                <div className="scrolling-text">
                  <span className="scrolling-text-span text-black">
                    VN FASHION • VN FASHION • VN FASHION • VN FASHION • VN
                    FASHION • VN FASHION • VN FASHION • VN FASHION • VN FASHION
                    • VN FASHION • VN FASHION • VN FASHION • VN FASHION • VN
                    FASHION • VN FASHION • VN FASHION • VN FASHION • VN FASHION •{" "}
                  </span>
                </div>
                <div className="scrolling-text" aria-hidden="true">
                  <span className="scrolling-text-span text-black">
                    VN FASHION • VN FASHION • VN FASHION • VN FASHION • VN
                    FASHION • VN FASHION • VN FASHION • VN FASHION • VN FASHION
                    • VN FASHION • VN FASHION • VN FASHION • VN FASHION • VN
                    FASHION • VN FASHION • VN FASHION • VN FASHION • VN FASHION •{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Custom CSS for animations */}
        <style>{`
          @keyframes shine {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }

          @keyframes rainbow {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }

          @keyframes scroll-horizontal {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-shine {
            animation: shine 3s ease-in-out infinite;
          }

          .animate-rainbow {
            background-size: 200% 200%;
            animation: rainbow 4s ease-in-out infinite;
          }

          .scrolling-text-container {
            height: 100%;
            width: 100%;
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
          }

          .scrolling-text-wrapper {
            display: inline-flex;
            white-space: nowrap;
            animation: scroll-horizontal 45s linear infinite;
            will-change: transform;
          }

          .scrolling-text {
            font-weight: bold;
            color: black;
            white-space: nowrap;
            letter-spacing: 0.1em;
            flex-shrink: 0;
            display: inline-block;
          }

          .scrolling-text-span {
            display: inline-block;
            font-size: 8rem;
            line-height: 1;
            font-weight: bold;
          }

          @media (min-width: 640px) {
            .scrolling-text-span {
              font-size: 12rem;
            }
          }

          @media (min-width: 768px) {
            .scrolling-text-span {
              font-size: 14rem;
            }
          }

          @media (min-width: 1024px) {
            .scrolling-text-span {
              font-size: 16rem;
            }
          }

          @media (min-width: 1280px) {
            .scrolling-text-span {
              font-size: 18rem;
            }
          }
        `}</style>
      </div>
  );
};

export default HeroSection;
