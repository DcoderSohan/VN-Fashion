import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

// Responsive hook
function useVisibleCards() {
  const [visible, setVisible] = useState(getVisible(window.innerWidth));
  useEffect(() => {
    const onResize = () => setVisible(getVisible(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return visible;
}
function getVisible(width) {
  if (width >= 1024) return 5; // large
  if (width >= 640) return 3;  // tablet
  return 2;                    // mobile
}

function useCardWidth() {
  const [width, setWidth] = useState(getCardWidth(window.innerWidth));
  useEffect(() => {
    const onResize = () => setWidth(getCardWidth(window.innerWidth));
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return width;
}
function getCardWidth(width) {
  if (width >= 1024) return 300; // large
  if (width >= 640) return 270;  // tablet
  return 200;                    // mobile
}

const cards = [
  { id: 1, title: 'Serene Forest', imgUrl: 'https://picsum.photos/seed/forest/300/400' },
  { id: 2, title: 'Desert Dunes', imgUrl: 'https://picsum.photos/seed/desert/300/400' },
  { id: 3, title: 'Ocean Waves', imgUrl: 'https://picsum.photos/seed/ocean/300/400' },
  { id: 4, title: 'Snowy Mountains', imgUrl: 'https://picsum.photos/seed/mountain/300/400' },
  { id: 5, title: 'City Lights', imgUrl: 'https://picsum.photos/seed/city/300/400' },
  { id: 6, title: 'Golden Sunset', imgUrl: 'https://picsum.photos/seed/sunset/300/400' },
  { id: 7, title: 'Misty Lake', imgUrl: 'https://picsum.photos/seed/lake/300/400' },
  { id: 8, title: 'Autumn Leaves', imgUrl: 'https://picsum.photos/seed/autumn/300/400' },
  { id: 9, title: 'Starry Night', imgUrl: 'https://picsum.photos/seed/stars/300/400' },
];

export default function Services() {
  const [current, setCurrent] = useState(0);
  const [hovered, setHovered] = useState(null);
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const VISIBLE = useVisibleCards();
  const CARD_WIDTH = useCardWidth(); // <-- use responsive card width

  // Card width and gap
  const GAP = 20;
  const totalCount = cards.length;
  const maxIndex = totalCount - VISIBLE;
  const trackWidth = totalCount * (CARD_WIDTH + GAP);

  // Calculate container width based on visible cards
  const containerWidth = VISIBLE * (CARD_WIDTH + GAP) - GAP;

  // Animate to the current card
  useEffect(() => {
    const targetX = -current * (CARD_WIDTH + GAP);
    const controls = animate(x, targetX, { type: "spring", stiffness: 120, damping: 20 });
    return controls.stop;
  }, [current, CARD_WIDTH, GAP, x]);

  // Drag end logic
  const handleDragEnd = (_e, info) => {
    const moved = -info.offset.x / (CARD_WIDTH + GAP);
    let newIndex = Math.round(current + moved);
    newIndex = Math.max(0, Math.min(maxIndex, newIndex));
    setCurrent(newIndex);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-x-hidden">
      <div
        ref={containerRef}
        className="overflow-visible"
        style={{ width: containerWidth, maxWidth: '100%' }}
      >
        <motion.div
          className={`flex items-center cursor-grab justify-center lg:justify-start`}
          style={{ x }}
          drag="x"
          dragConstraints={{
            left: -trackWidth + containerWidth,
            right: 0
          }}
          onDragEnd={handleDragEnd}
        >
          {cards.map((card, idx) => {
            // Calculate position relative to current
            let offset = ((idx - current + totalCount) % totalCount + totalCount) % totalCount;
            let pos = offset > totalCount / 2 ? offset - totalCount : offset;
            let isCenter = pos === 0;

            return (
              <motion.div
                key={card.id}
                className="flex-none relative rounded-xl shadow-lg bg-gray-300"
                style={{ width: CARD_WIDTH, marginRight: GAP, zIndex: hovered === idx ? 10 : 1 }}
                animate={{ scale: hovered === idx ? 1.05 : 0.92, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
              >
                <img
                  src={card.imgUrl}
                  alt={card.title}
                  className="w-full h-96 object-cover rounded-xl"
                />
                <div
                  className="absolute bottom-2 left-2 text-white text-2xl font-bold"
                  style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                >
                  {card.title}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <div className="mt-6 flex space-x-6">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          Prev
        </button>
        <button
          onClick={() => setCurrent((c) => Math.min(maxIndex, c + 1))}
          disabled={current === maxIndex}
          className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
