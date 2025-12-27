import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.15, // Minimal duration for smooth but fast transition
};

const PageTransition = ({ children }) => {
  const location = useLocation();

  // Scroll to top when route changes (optimized)
  useEffect(() => {
    // Use requestAnimationFrame for smoother scroll
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    });
  }, [location.pathname]);

  return (
    <motion.div
      key={location.pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      style={{ willChange: 'opacity' }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;

