import React, { useState, useEffect } from "react";
import MetallicPaint, { parseLogoImage } from "./MetallicPaint";

// replace with your own SVG
// NOTE: your SVG should have a bit of padding around the shape, to keep it from being cut off
// it should also have black fill color, to allow the metallic effect to show through the mask
// import logo from '../../assets/logos/react-bits-logo-small-black.svg';

const logo = "/VN.png";

const HeroSection = () => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    async function loadDefaultImage() {
      try {
        const response = await fetch(logo);
        const blob = await response.blob();
        const file = new File([blob], "default.png", { type: blob.type });

        const parsedData = await parseLogoImage(file);
        setImageData(parsedData?.imageData ?? null);
      } catch (err) {
        console.error("Error loading default image:", err);
      }
    }

    loadDefaultImage();
  }, []);

  return (
    <div className="pt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="relative">
          {/* Main Logo Container */}
          <div className="relative text-9xl font-bold select-none">
            {/* Base metallic text */}
            <div className="relative text-transparent bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400 bg-clip-text">
              <img src="./VN.png" alt="" />
            </div>

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

          {/* Glow effect */}

          {/* Outer glow */}
          {/* <div className="absolute inset-0 text-9xl font-bold text-blue-400 opacity-5 blur-lg animate-pulse">
          YS
        </div> */}
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

          .animate-shine {
            animation: shine 3s ease-in-out infinite;
          }

          .animate-rainbow {
            background-size: 200% 200%;
            animation: rainbow 4s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default HeroSection;
