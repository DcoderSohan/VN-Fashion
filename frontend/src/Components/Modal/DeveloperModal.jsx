import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Code, Briefcase, Mail, Github, Linkedin, Globe } from 'lucide-react';

const DeveloperModal = ({ isOpen, onClose }) => {
  const developerInfo = {
    name: 'Sohan Sarang',
    role: 'Full Stack Developer',
    image: '/Me.jpg', // You can add a developer image
    bio: 'Passionate full stack developer specializing in modern web technologies. Creating beautiful, responsive, and performant web applications with React, Node.js, and MongoDB.',
    skills: ['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'Tailwind CSS','Github','HTML','CSS'],
    portfolio: 'https://sohan-sarang-portfolio.vercel.app/',
    email: 'sohansarang21@gmail.com',
    github: 'https://github.com/DcoderSohan',
    linkedin: 'https://linkedin.com/in/sohan-sarang',
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 md:p-6"
            style={{ willChange: 'opacity' }}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ 
                type: "spring", 
                damping: 30, 
                stiffness: 400,
                mass: 0.5
              }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto overflow-x-hidden border border-gray-700/50 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-800/90 hover:bg-gray-700 flex items-center justify-center text-gray-400 hover:text-white transition-colors shadow-lg"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>

              {/* Content */}
              <div className="p-4 sm:p-6 md:p-8">
                {/* Developer Image */}
                <motion.div 
                  className="flex justify-center mb-4 sm:mb-6"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <div className="relative">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500 p-0.5 sm:p-1">
                      <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                        {developerInfo.image && developerInfo.image !== '/developer-avatar.jpg' ? (
                          <img
                            src={developerInfo.image}
                            alt={developerInfo.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl sm:text-2xl md:text-3xl font-bold">
                            {developerInfo.name.split(' ').map(n => n[0]).join('')}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Golden Role Badge */}
                    <div className="absolute -bottom-1.5 sm:-bottom-2 left-1/2 transform -translate-x-1/2">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.25, type: 'spring', stiffness: 200, damping: 15 }}
                        className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 text-gray-900 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-lg flex items-center gap-1 sm:gap-1.5 whitespace-nowrap"
                      >
                        <Briefcase className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        <span className="hidden sm:inline">{developerInfo.role}</span>
                        <span className="sm:hidden">Developer</span>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>

                {/* Developer Name */}
                <motion.h2 
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center mb-2 sm:mb-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.3 }}
                >
                  {developerInfo.name}
                </motion.h2>

                {/* Bio */}
                <motion.p 
                  className="text-gray-300 text-xs sm:text-sm md:text-base text-center mb-4 sm:mb-6 leading-relaxed px-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  {developerInfo.bio}
                </motion.p>

                {/* Skills */}
                <motion.div 
                  className="mb-4 sm:mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.3 }}
                >
                  <h3 className="text-gray-400 text-[10px] sm:text-xs uppercase tracking-wider mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2">
                    <Code className="w-3 h-3 sm:w-4 sm:h-4" />
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {developerInfo.skills.map((skill, index) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.03, type: 'spring', stiffness: 200 }}
                        className="px-2 py-1 sm:px-3 sm:py-1.5 bg-gray-700/50 text-gray-300 rounded-md sm:rounded-lg text-[10px] sm:text-xs font-medium border border-gray-600/50"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Social Links */}
                <motion.div 
                  className="flex justify-center gap-2.5 sm:gap-3 mb-4 sm:mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.3 }}
                >
                  {developerInfo.github && (
                    <motion.a
                      href={developerInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors shadow-md"
                      aria-label="GitHub"
                    >
                      <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.a>
                  )}
                  {developerInfo.linkedin && (
                    <motion.a
                      href={developerInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-700 hover:bg-blue-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors shadow-md"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.a>
                  )}
                  {developerInfo.email && (
                    <motion.a
                      href={`mailto:${developerInfo.email}`}
                      whileHover={{ scale: 1.15, y: -3 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-700 hover:bg-red-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors shadow-md"
                      aria-label="Email"
                    >
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.a>
                  )}
                </motion.div>

                {/* Portfolio Button */}
                <motion.a
                  href={developerInfo.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm sm:text-base py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl active:scale-95"
                >
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>View Portfolio</span>
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DeveloperModal;

