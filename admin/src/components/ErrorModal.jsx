import { X, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ErrorModal = ({ isOpen, onClose, title, message }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 12 }}
              transition={{ type: "spring", damping: 30, stiffness: 350 }}
              className="bg-white border border-gray-200 max-w-md w-full p-6 sm:p-8 relative pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 transition-colors rounded-sm"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Icon */}
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 border border-red-200 bg-red-50 flex items-center justify-center">
                  <AlertCircle size={28} className="text-red-600" />
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <h3
                  className="text-lg font-semibold text-black mb-2 tracking-wide"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {title || "Error"}
                </h3>
                <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                  {message}
                </p>

                {/* Button */}
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-black text-white text-xs font-medium tracking-widest uppercase hover:bg-gray-800 transition-all duration-200"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ErrorModal;
