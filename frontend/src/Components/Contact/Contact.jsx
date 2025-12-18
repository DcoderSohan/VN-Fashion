import React, { useState } from "react";

const Contact = ({
  phone = "7798370430",
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const message = `Hi Vidisha! My name is ${formData.name}. ${formData.message} Contact: ${formData.email} | ${formData.phone}`;
    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-8" id="contact">
      {/* Title Section */}
      <div className="flex flex-col sm:flex-row items-center justify-center text-center gap-2 sm:gap-6 py-10">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold">
          Let's
        </h1>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-blue-600">
          Connect
        </h1>
      </div>

      {/* Contact Form */}
      <div className="w-full max-w-2xl mt-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              placeholder="+91 1234567890"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              placeholder="I'm looking for a custom outfit for an upcoming event. I love your designs and would love to discuss ideas, timeline, and pricing..."
            />
          </div>

          <button
            type="submit"
            className="w-full relative overflow-hidden border border-gray-400 px-8 py-4 rounded-full hover:bg-gradient-to-r from-black to-black bg-[length:200%_100%] bg-right text-black hover:text-white transition-all duration-500 hover:bg-left text-base sm:text-lg md:text-xl font-medium"
          >
            Send Message via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
