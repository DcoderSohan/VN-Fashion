import React, { useState, useEffect } from 'react'
import MetallicPaint, { parseLogoImage } from "./MetallicPaint";

// replace with your own SVG
// NOTE: your SVG should have a bit of padding around the shape, to keep it from being cut off
// it should also have black fill color, to allow the metallic effect to show through the mask
import logo from '../../assets/logos/react-bits-logo-small-black.svg';

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
      <div className="space-y-8">
        <section
          id="home"
          className="min-h-screen flex items-center justify-center bg-blue-50 rounded-lg"
        >
          <MetallicPaint 
            imageData={imageData ?? new ImageData(1, 1)} 
            params={{ edge: 2, patternBlur: 0.005, patternScale: 2, refraction: 0.015, speed: 0.3, liquid: 0.07 }} 
          />
        </section>
      </div>
    </div>
  )
}

export default HeroSection
