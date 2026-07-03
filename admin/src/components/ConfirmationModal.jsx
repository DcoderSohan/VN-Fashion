import { X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'warning',
}) => {
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
              transition={{ type: 'spring', damping: 30, stiffness: 350 }}
              className="bg-white border border-gray-200 max-w-md w-full p-6 sm:p-8 relative pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-black" />

              {/* Icon */}
              <div className="flex justify-center mb-5">
                <div className="w-14 h-14 border border-[#b8860b]/30 bg-[#fbfbfa] flex items-center justify-center">
                  <AlertTriangle size={26} className="text-[#b8860b]" />
                </div>
              </div>

              {/* Content */}
              <div className="text-center">
                <p className="text-[9px] font-medium tracking-[0.18em] uppercase text-gray-400 mb-2">
                  Confirmation Required
                </p>
                <h3
                  className="text-xl font-light text-black mb-2 tracking-wide"
                  style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif" }}
                >
                  {title}
                </h3>
                <div className="w-8 h-[1px] bg-gray-200 mx-auto mb-4" />
                <p className="text-[12px] text-gray-500 mb-7 leading-relaxed font-light">
                  {message}
                </p>

                {/* Buttons */}
                <div className="flex gap-3 justify-center">
                  <button
                    onClick={onClose}
                    className="flex-1 py-2.5 border border-gray-200 text-gray-500 text-[10px] font-medium tracking-[0.16em] uppercase hover:bg-gray-50 hover:text-black transition-all duration-200"
                  >
                    {cancelText}
                  </button>
                  <button
                    onClick={() => {
                      onConfirm();
                      onClose();
                    }}
                    className="flex-1 py-2.5 bg-black text-white text-[10px] font-medium tracking-[0.16em] uppercase hover:bg-gray-800 transition-all duration-200"
                  >
                    {confirmText}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ConfirmationModal;
