import React, { useRef, useEffect } from 'react';

const services = [
  { title: 'Embroidery', img: '/public/aariWork.jpg' },
  { title: 'Tailoring', img: '/public/HeroBg.jpg' },
  { title: 'Design', img: '/public/HeroBgImg.jpg' },
  { title: 'Consulting', img: '/public/vite.svg' },
  { title: 'Alteration', img: '/public/VN.png' },
  { title: 'Styling', img: '/public/aariWork.jpg' },
  { title: 'Custom Fit', img: '/public/HeroBg.jpg' },
  { title: 'Patterning', img: '/public/HeroBgImg.jpg' },
  { title: 'Finishing', img: '/public/vite.svg' },
];

const CARD_WIDTH = 320; // adjust as needed
const CARD_HEIGHT = 420;
const CARD_GAP = 32;

const Services = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const sc = scrollRef.current;
    let isDown = false,
      startX = 0,
      scrollLeft = 0;

    const onMouseDown = (e) => {
      isDown = true;
      sc.classList.add('active');
      startX = e.pageX - sc.offsetLeft;
      scrollLeft = sc.scrollLeft;
    };
    const onMouseUpLeave = () => {
      isDown = false;
      sc.classList.remove('active');
    };
    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - sc.offsetLeft;
      const walk = x - startX;
      sc.scrollLeft = scrollLeft - walk;
    };

    sc.addEventListener('mousedown', onMouseDown);
    sc.addEventListener('mouseleave', onMouseUpLeave);
    sc.addEventListener('mouseup', onMouseUpLeave);
    sc.addEventListener('mousemove', onMouseMove);

    return () => {
      sc.removeEventListener('mousedown', onMouseDown);
      sc.removeEventListener('mouseleave', onMouseUpLeave);
      sc.removeEventListener('mouseup', onMouseUpLeave);
      sc.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div style={{ padding: '40px 0', background: '#f8f8f8' }} className='px-10'>
      <h2
        style={{
          textAlign: 'center',
          marginBottom: 32,
          fontSize: 32,
          fontWeight: 700,
          borderRadius: 20,
        }}
      >
        Our Services
      </h2>

      <div
        ref={scrollRef}
        className="hide-scrollbar px-8"
        style={{
          overflowX: 'auto',
          overflowY: 'visible',
          borderRadius: 20,
          whiteSpace: 'nowrap',
          scrollBehavior: 'smooth',
          paddingBottom: 24,
          minHeight: CARD_HEIGHT * 1.1 + CARD_GAP, // accommodate hover scale
          paddingTop: CARD_GAP, // extra space for hover
          cursor: 'grab',
          scrollbarGutter: 'stable',
        }}
      >
        {services.map((service, idx) => (
          <div
            key={idx}
            className="service-card rounded-md"
            style={{
              display: 'inline-block',
              width: CARD_WIDTH,
              height: CARD_HEIGHT,
              marginRight: CARD_GAP,
              background: `url(${service.img}) center/cover no-repeat`,
              borderRadius: 18,
              position: 'relative',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              verticalAlign: 'top',
              overflow: 'hidden', // <-- change this from 'visible' to 'hidden'
            }}
          >
            <div
              className="service-title"
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 48,
                background: 'rgba(0,0,0,0.5)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                fontSize: 24,
                fontWeight: 600,
                letterSpacing: 2,
                transition: 'background 0.3s, color 0.3s',
                zIndex: 2,
              }}
            >
              {service.title}
            </div>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(120deg,rgba(0,0,0,0.1) 60%,rgba(0,0,0,0.3) 100%)',
                zIndex: 1,
              }}
            />
          </div>
        ))}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar.active {
          cursor: grabbing;
          user-select: none;
        }
        .service-card:hover {
          transform: scale(1.07) rotate(-2deg);
          box-shadow: 0 16px 48px rgba(0,0,0,0.25);
          z-index: 10;
        }
        .service-card:hover .service-title {
          background: rgba(255,99,71,0.85);
          color: #fffbe7;
        }
      `}</style>
    </div>
  );
};

export default Services;
