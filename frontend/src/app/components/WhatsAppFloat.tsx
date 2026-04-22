// import React from "react";
// import { FaWhatsapp } from "react-icons/fa";

// const WHATSAPP_NUMBER = "919776069949";
// const MESSAGE = "Hello, I want to inquire about your lift services";

// const WhatsAppFloat = () => {
//   const handleClick = () => {
//     const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;
//     window.open(url, "_blank");
//   };

//   return (
//     <button
//       onClick={handleClick}
//       aria-label="Chat on WhatsApp"
//       className="fixed bottom-5 right-5 z-[9999] w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg hover:scale-110 transition"
//     >
//       <FaWhatsapp className="text-white text-2xl" />
//     </button>
//   );
// };

// export default WhatsAppFloat;

import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "919993277492";
const MESSAGE = "Hello, I want to inquire about your lift services";

const WhatsAppFloat = () => {
  const handleClick = () => {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(MESSAGE)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Chat on WhatsApp"
      className="
        fixed bottom-5 right-5 z-[9999]
        flex items-center justify-center

        w-16 h-16 md:w-14 md:h-14   /* ✅ bigger on mobile */

        rounded-full
        bg-gradient-to-br from-green-400 to-green-600

        shadow-[0_10px_25px_rgba(0,0,0,0.4),inset_0_2px_6px_rgba(255,255,255,0.3)]
        
        hover:scale-110 hover:shadow-[0_15px_35px_rgba(0,0,0,0.5)]
        active:scale-95

        transition-all duration-300 ease-out
      "
    >
      {/* 3D Glow Layer */}
      <span className="absolute inset-0 rounded-full bg-white/10 blur-md"></span>

      {/* Icon */}
      <FaWhatsapp className="relative text-white text-[34px] md:text-[28px] drop-shadow-lg" />
    </button>
  );
};

export default WhatsAppFloat;