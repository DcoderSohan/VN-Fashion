import React from "react";
import './About.css';

const About = () => {
  return (
    <div>
      <div className="container flex flex-col md:flex-row items-center justify-center w-full h-screen  mx-auto px-4 md:px-0 py-2 gap-6" id="about">
        <div className="left w-full md:w-1/2 mb-6 md:mb-0">
          <p className="about-info-animate text-[10px] sm:text-lg md:text-[2rem] leading-normal">
            We specialize in exquisite Aari embroidery, a refined handcraft
            using a hooked needle to create delicate chain-stitch motifs
            enhanced with beads, mirrors, metallic zari threads, and intricate
            embellishments like cut‑pipe, patchwork, 3D elements, net overlays,
            and silk-threaded buttas. Using traditional techniques, our artisans
            transform regular fabrics into richly textured, elegant pieces
            perfect for garments, accessories, and décor.
          </p>
        </div>
        <div className="right morphing-square-bg w-full md:w-1/2 h-40 md:h-64"></div>
      </div>
    </div>
  );
};

export default About;
