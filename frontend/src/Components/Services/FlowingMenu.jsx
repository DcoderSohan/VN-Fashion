// FlowingMenu.jsx
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

function FlowingMenu({ items = [] }) {
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    const preloadImage = (src) =>
      new Promise((res, rej) => {
        const img = new window.Image();
        img.onload = res;
        img.onerror = rej;
        img.src = src;
      });

    const images = items.map((i) => i.image).filter(Boolean);
    Promise.all(images.map(preloadImage))
      .then(() => setAssetsLoaded(true))
      .catch((e) => {
        console.warn('Image preload error:', e);
        setAssetsLoaded(true); // still proceed
      });
  }, [items]);

  if (!assetsLoaded) {
    return <div className="p-4">Loading menu...</div>;
  }

  return (
    <>
      {/* Optional preloads for critical images */}
      <Helmet>
        {items.map((item) =>
          item.image ? (
            <link
              rel="preload"
              as="image"
              href={item.image}
              key={item.image}
            />
          ) : null
        )}
      </Helmet>

      <div className="w-full h-full overflow-visible">
        <nav className="flex flex-col h-full m-0 p-0 gap-y-8">
          {items.map((item, idx) => (
            <React.Fragment key={idx}>
              <MenuItem {...item} />
              {idx !== items.length - 1 && (
                <hr className="border-t border-gray-300 w-[90%] mx-auto my-2" />
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </>
  );
}

function MenuItem({ link, text, image }) {
  const [showImage, setShowImage] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const itemRef = React.useRef(null);

  const IMAGE_WIDTH = 300;
  const IMAGE_HEIGHT = 300;
  const OFFSET_X = 20;
  const OFFSET_Y = -40;
  const PADDING = 16; // px from window edge

  const handleMouseEnter = () => image && setShowImage(true);
  const handleMouseLeave = () => setShowImage(false);

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // Calculate absolute position in viewport
    let absX = rect.left + x + OFFSET_X;
    let absY = rect.top + y + OFFSET_Y;

    // Clamp to viewport
    const maxX = window.innerWidth - IMAGE_WIDTH - PADDING;
    const maxY = window.innerHeight - IMAGE_HEIGHT - PADDING;
    if (absX > maxX) x -= (absX - maxX);
    if (absY > maxY) y -= (absY - maxY);
    if (absX < PADDING) x += (PADDING - absX);
    if (absY < PADDING) y += (PADDING - absY);

    setCoords({ x, y });
  };

  return (
    <div
      ref={itemRef}
      className="relative flex items-center justify-center h-[80px] cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{ marginBottom: '1em' }}
    >
      <a
        href={link}
        className="uppercase font-semibold text-black text-[2rem] no-underline"
        style={{ zIndex: 1 }}
      >
        {text}
      </a>
      {showImage && (
        <img
          src={image}
          alt={text}
          style={{
            position: 'absolute',
            left: coords.x + OFFSET_X,
            top: coords.y + OFFSET_Y,
            width: IMAGE_WIDTH,
            height: IMAGE_HEIGHT,
            pointerEvents: 'none',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
            transition: 'left 0.1s, top 0.1s',
            zIndex: 2,
          }}
        />
      )}
    </div>
  );
}

export default FlowingMenu;
