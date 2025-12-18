import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star } from "lucide-react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Bride",
      image: "/VN-1.jpg", // You can replace with actual client photos
      quote:
        "VN Fashion created the most beautiful bridal lehenga for my wedding! The attention to detail and craftsmanship was exceptional. I felt like a princess on my special day.",
      rating: 5,
    },
    {
      id: 2,
      name: "Anjali Patel",
      role: "Client",
      image: "/VN-2.jpg",
      quote:
        "The custom blouse designs are absolutely stunning. Vidisha understood exactly what I wanted and delivered beyond my expectations. Highly recommend!",
      rating: 5,
    },
    {
      id: 3,
      name: "Meera Desai",
      role: "Client",
      image: "/VN-3.jpg",
      quote:
        "The aari work on my saree is exquisite! The quality and finish are outstanding. VN Fashion has become my go-to designer for all special occasions.",
      rating: 5,
    },
    {
      id: 4,
      name: "Riya Kapoor",
      role: "Client",
      image: "/VN-4.jpg",
      quote:
        "Professional service, beautiful designs, and timely delivery. The team at VN Fashion made my entire experience seamless and enjoyable.",
      rating: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tr from-pink-100 to-purple-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
              What Our <span className="text-blue-600">Clients Say</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </motion.div>
        </motion.div>

        <div className="relative h-96 sm:h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl p-8 sm:p-12 max-w-4xl mx-auto border border-gray-100">
                <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="relative"
                  >
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-blue-100 shadow-lg">
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-blue-600 rounded-full p-2 shadow-lg">
                      <Quote className="w-4 h-4 text-white" />
                    </div>
                  </motion.div>

                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex justify-center sm:justify-start gap-1 mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-lg sm:text-xl text-gray-700 italic mb-6 leading-relaxed"
                    >
                      "{testimonials[currentIndex].quote}"
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <h4 className="text-xl font-bold text-gray-800">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-3 mt-8">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-blue-600 w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
