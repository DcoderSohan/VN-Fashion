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
    <div className="relativ">
      <div className="relative pt-7 mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen overflow-hidden">
        {/* Background overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />
        {/* Content goes here */}
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="relative">
            {/* Main Logo Container */}
            <div className="relative text-9xl font-bold select-none">
              {/* Base metallic text */}
              <div
                className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] mx-auto"
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

              {/* Animated rainbow reflection overlay */}
              {/* <div className="absolute inset-0 text-transparent bg-gradient-to-r from-blue-400 via-pink-500 via-red-500 via-orange-500 via-yellow-500 to-green-500 bg-clip-text opacity-60 animate-pulse">
            YS
          </div> */}

              {/* Chrome reflection effect */}
              <div className="absolute inset-0 text-transparent bg-gradient-to-b from-white  via-transparent to-gray-600 bg-clip-text opacity-30">
                <img src="./VN.png" alt="" />
              </div>

              {/* Additional metallic depth */}
              <div className="absolute inset-0 text-transparent bg-gradient-to-tr from-gray-600 via-gray-200 to-gray-400 bg-clip-text opacity-20">
                <img src="./VN.png" alt="" />
              </div>
            </div>

            {/* Horizontally Scrolling Text Overlay - positioned to cover bottom half */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[200px] md:h-[300px] overflow-hidden">
              <div className="scrolling-text-container">
                <div className="scrolling-text text-6xl">
                  <span className="text-[12rem] text-black">
                    {" "}
                    VN FASHION • VN FASHION • VN FASHION • VN FASHION • VN
                    FASHION • VN FASHION • VN FASHION • VN FASHION • VN FASHION
                    • VN FASHION • VN FASHION • VN FASHION • VN FASHION • VN
                    FASHION • VN FASHION • VN FASHION • VN FASHION • VN FASHION
                    •{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Custom CSS for animations */}
        <style jsx>{`
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
            display: flex;
            align-items: center;
            position: relative;
            overflow: hidden;
          }

          .scrolling-text {
            font-weight: bold;
            color: white;
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
            white-space: nowrap;
            animation: scroll-horizontal 45s linear infinite;
            letter-spacing: 0.1em;
          }

          @media (min-width: 768px) {
            .scrolling-text {
              font-size: 2rem;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default HeroSection;
