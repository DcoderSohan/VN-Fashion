import React from "react";
import { motion } from "framer-motion";

const Introduction = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-100 to-orange-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              Transforming Fashion,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
                One Design at a Time
              </span>
            </h2>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-3xl mx-auto">
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6">
              Welcome to VN Fashion, where creativity meets craftsmanship. We specialize in
              creating exquisite, handcrafted designs that celebrate your unique style and
              personality.
            </p>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-6">
              Our mission is to transform your vision into reality through meticulous attention
              to detail, premium quality fabrics, and innovative design techniques. Whether
              you're looking for traditional elegance or contemporary flair, we bring your
              fashion dreams to life.
            </p>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              Every piece is crafted with passion, precision, and a commitment to excellence
              that sets us apart in the world of fashion design.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap justify-center gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Our Philosophy
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-pink-600 to-orange-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Craftsmanship Excellence
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Custom Designs
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Introduction;
