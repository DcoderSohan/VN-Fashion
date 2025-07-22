import React from "react";

const Contact = ({
  phone = "7798370430",
  message = `Hi Vidisha ! I’m looking for a custom outfit for an upcoming event. I love your designs and would love to discuss ideas, timeline, and pricing. Can we connect?
`,
}) => {
  const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 sm:px-8">
      {/* Title Section */}
      <div className="flex flex-col sm:flex-row items-center justify-center text-center gap-2 sm:gap-6 py-10">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold">
          Let's
        </h1>
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-bold text-blue-600">
          Connect
        </h1>
      </div>

      {/* WhatsApp Button */}
      <div className="btn mt-6">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <button
            className="
              relative overflow-hidden border border-gray-400 px-8 py-3 rounded-full
              hover:bg-gradient-to-r from-black to-black bg-[length:200%_100%] bg-right
              text-black hover:text-white transition-all duration-500
              hover:bg-left
              text-base sm:text-lg md:text-xl font-medium
            "
          >
            Message Me
          </button>
        </a>
      </div>
    </div>
  );
};

export default Contact;
