import React, { useRef, useEffect } from 'react';

const services = [
  { title: 'Designer Blouses', img: '/aariWork.jpg' },
  { title: 'Aari embroidery blouses/dress', img: '/VN-1.jpg' },   
  { title: 'Fabric painting blouses/dress ', img: '/VN-2.jpg' },      
  { title: 'Stitching (all type)', img: '/VN-3.jpg' },  
  { title: 'Rent costumes', img: '/VN-4.jpg' },  
  { title: 'Natural colour made fabric sales', img: '/VN-5.jpg' },     
  { title: 'Custom Fit', img: '/VN-6.jpg' },  
];

const CARD_WIDTH = 320; // desktop default
const CARD_HEIGHT = 500; // increased from 420
const CARD_GAP = 32;

const Services = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const sc = scrollRef.current;
    let isDown = false,
      startX = 0,
      scrollLeft = 0;

    // Touch support for mobile/tablet
    let touchStartX = 0;
    let touchScrollLeft = 0;

    const onTouchStart = (e) => {
      isDown = true;
      sc.classList.add('active');
      touchStartX = e.touches[0].pageX - sc.offsetLeft;
      touchScrollLeft = sc.scrollLeft;
    };
    const onTouchEnd = () => {
      isDown = false;
      sc.classList.remove('active');
    };
    const onTouchMove = (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - sc.offsetLeft;
      const walk = x - touchStartX;
      sc.scrollLeft = touchScrollLeft - walk;
    };

    sc.addEventListener('touchstart', onTouchStart);
    sc.addEventListener('touchend', onTouchEnd);
    sc.addEventListener('touchmove', onTouchMove);

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
      sc.removeEventListener('touchstart', onTouchStart);
      sc.removeEventListener('touchend', onTouchEnd);
      sc.removeEventListener('touchmove', onTouchMove);
      sc.removeEventListener('mousedown', onMouseDown);
      sc.removeEventListener('mouseleave', onMouseUpLeave);
      sc.removeEventListener('mouseup', onMouseUpLeave);
      sc.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div
      style={{
        padding: '50px 24px', // increased horizontal padding
        background: '#f8f8f8',
        borderRadius: 20, // optional: add border radius to container
      }}
      className='px-2 sm:px-6 md:px-10 md:py-20' id='services'
    >
      <h2
        style={{
          textAlign: 'center',
          marginBottom: 32,
          fontWeight: 700,
          borderRadius: 20,
        }}
        className="services-title text-5xl"
      >
        Our Services
      </h2>

      <div
        ref={scrollRef}
        className="hide-scrollbar px-2 sm:px-6 md:px-8"
        style={{
          overflowX: 'auto',
          overflowY: 'visible',
          borderRadius: 20,
          whiteSpace: 'nowrap',
          scrollBehavior: 'smooth',
          paddingBottom: 24,
          minHeight: CARD_HEIGHT * 1.1 + CARD_GAP,
          paddingTop: CARD_GAP,
          cursor: 'grab',
          scrollbarGutter: 'stable',
          touchAction: 'pan-x', // for mobile
          WebkitOverflowScrolling: 'touch', // for iOS smooth scroll
        }}
      >
        {services.map((service, idx) => (
          <div
            key={idx}
            className="service-card rounded-md"
            style={{
              display: 'inline-block',
              width: '80vw', // default for mobile, overridden in media queries
              maxWidth: 320,
              minWidth: 220,
              height: 400, // increased from 340
              marginRight: 16,
              background: `url(${service.img}) center/cover no-repeat`,
              borderRadius: 18,
              position: 'relative',
              boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
              transition: 'transform 0.3s, box-shadow 0.3s',
              verticalAlign: 'top',
              overflow: 'hidden',
            }}
          >
            <div
              className="service-title"
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 36,
                background: 'rgba(0,0,0,0.5)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed',
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: 1,
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
        .service-card {
          width: 80vw;
          max-width: 320px;
          min-width: 220px;
          height: 400px; /* increased from 340px */
          margin-right: 16px;
        }
        .service-title {
          width: 36px;
          font-size: 18px;
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
        @media (min-width: 640px) {
          .service-card {
            width: 45vw;
            max-width: 260px;
            height: 440px; /* increased from 360px */
            margin-right: 20px;
          }
          .service-title {
            width: 40px;
            font-size: 20px;
          }
        }
        @media (min-width: 900px) {
          .service-card {
            width: 320px;
            height: 500px; /* increased from 420px */
            margin-right: 32px;
          }
          .service-title {
            width: 48px;
            font-size: 24px;
          }
        }
        .services-title {
        }
        @media (min-width: 640px) {
          .services-title {
          }
        }
        @media (min-width: 900px) {
          .services-title {
          }
        }
      `}</style>
    </div>
  );
};

export default Services;