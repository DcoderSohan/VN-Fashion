import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) => {
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
              className={`bg-white border border-gray-200 ${maxWidth} w-full pointer-events-auto max-h-[90vh] flex flex-col`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 flex-shrink-0">
                <h3
                  className="text-xl font-semibold text-black tracking-widest uppercase"
                  style={{ fontFamily: "'Cormorant Garamond', 'Times New Roman', serif", letterSpacing: '0.1em' }}
                >
                  {title}
                </h3>
                <button
                  onClick={onClose}
                  className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 transition-colors rounded-sm"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content - Scrollable but without visible scrollbar */}
              <div className="flex-1 overflow-y-auto p-6 modal-content-scroll">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
