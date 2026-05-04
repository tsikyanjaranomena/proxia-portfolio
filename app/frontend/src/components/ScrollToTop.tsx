import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", toggleVisibility);
    toggleVisibility();
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          aria-label="Remonter en haut de la page"
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-[#0066FF] via-[#00A8FF] to-[#00D4FF] text-white shadow-lg shadow-blue-500/40 hover:shadow-xl hover:shadow-blue-500/50 flex items-center justify-center group transition-shadow"
        >
          {/* Pulsing ring */}
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00D4FF] opacity-40 animate-ping" />

          {/* Arrow icon */}
          <ArrowUp
            className="w-5 h-5 md:w-6 md:h-6 relative z-10 group-hover:-translate-y-0.5 transition-transform"
            strokeWidth={2.5}
          />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;