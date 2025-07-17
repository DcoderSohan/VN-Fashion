// FlowingMenu.jsx
import React, { useEffect, useState, useRef } from 'react';

function FlowingMenu({ items = [] }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const preload = (src) => new Promise(res => {
      const img = new Image();
      img.onload = res;
      img.src = src;
    });

    Promise.all(items.filter(i => i.image).map(i => preload(i.image)))
      .then(() => setLoaded(true))
      .catch(() => setLoaded(true));
  }, [items]);

  if (!loaded) return <div className="p-4">Loading...</div>;

  return (
    <div className="w-full h-full overflow-visible">
      <nav className="flex flex-col h-full m-0 p-0 gap-y-8">
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            <MenuItem {...item} />
            {idx < items.length - 1 && <hr className="border-t border-gray-300 w-full my-2" />}
          </React.Fragment>
        ))}
      </nav>
    </div>
  );
}

function MenuItem({ link, text, image }) {
  const [show, setShow] = useState(false);
  const coords = useRef({ x: 0, y: 0 });
  const itemRef = useRef(null);
  const frame = useRef(null);
  const imgRef = useRef(null);

  const handleMouseEnter = () => image && setShow(true);
  const handleMouseLeave = () => {
    setShow(false);
    cancelAnimationFrame(frame.current);
  };

  const handleMouseMove = (e) => {
    const rect = itemRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left + 20;
    const y = e.clientY - rect.top - 40;
    coords.current = { x, y };
    cancelAnimationFrame(frame.current);

    frame.current = requestAnimationFrame(() => {
      if (imgRef.current) {
        imgRef.current.style.transform = `translate(${coords.current.x}px, ${coords.current.y}px)`;
      }
    });
  };

  return (
    <div
      ref={itemRef}
      className="relative flex items-center justify-center h-[80px] cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <a href={link} className="uppercase font-semibold text-black text-[2rem] z-10">{text}</a>
      {show && (
        <img
          ref={imgRef}
          src={image}
          alt={text}
          className="absolute w-[300px] h-[300px] pointer-events-none rounded-xl shadow-md hover-img"
          style={{ transform: 'translate(0,0)' }}
        />
      )}
    </div>
  );
}

export default FlowingMenu;
