import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_URL = "https://mgx-backend-cdn.metadl.com/generate/images/798409/2026-05-03/n2ocl7qaaflq/proxiatech-logo.png";

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 25);

    // Hide loader after window load or timeout
    const hideLoader = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
    };

    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener("load", hideLoader);
    }

    // Fallback timeout
    const fallbackTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      window.removeEventListener("load", hideLoader);
      clearTimeout(fallbackTimer);
    };
  }, []);

  // Prevent body scroll while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white overflow-hidden"
        >
          {/* Animated gradient orbs background */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00D4FF] blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#0066FF] blur-3xl"
          />

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo with rotating ring */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              {/* Outer rotating ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full"
                style={{
                  background: "conic-gradient(from 0deg, transparent 0%, #0066FF 40%, #00D4FF 60%, transparent 100%)",
                  mask: "radial-gradient(circle, transparent 55%, black 58%, black 62%, transparent 65%)",
                  WebkitMask: "radial-gradient(circle, transparent 55%, black 58%, black 62%, transparent 65%)",
                }}
              />

              {/* Inner reverse rotating ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full"
                style={{
                  background: "conic-gradient(from 180deg, transparent 0%, #00D4FF 30%, #0066FF 50%, transparent 80%)",
                  mask: "radial-gradient(circle, transparent 62%, black 65%, black 68%, transparent 71%)",
                  WebkitMask: "radial-gradient(circle, transparent 62%, black 65%, black 68%, transparent 71%)",
                }}
              />

              {/* Pulsing glow */}
              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-4 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00D4FF] blur-xl"
              />

              {/* Logo */}
              <motion.img
                src={LOGO_URL}
                alt="Proxiatech"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale: [0.95, 1.05, 0.95],
                  opacity: 1,
                }}
                transition={{
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.5 },
                }}
                className="relative w-16 h-16 object-contain z-10 drop-shadow-lg"
              />
            </div>

            {/* Brand name */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col items-center gap-2"
            >
              <h1 className="text-3xl font-bold text-[#0A0E27] tracking-tight">
                Proxia
                <span className="bg-gradient-to-r from-[#0066FF] to-[#00D4FF] bg-clip-text text-transparent">
                  tech
                </span>
              </h1>
              <p className="text-xs text-slate-500 tracking-[0.3em] uppercase">
                Digital Agency
              </p>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "200px" }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="relative h-1 bg-slate-100 rounded-full overflow-hidden"
            >
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0066FF] via-[#00A8FF] to-[#00D4FF] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
              {/* Shimmer effect */}
              <motion.div
                animate={{ x: ["-100%", "300%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent"
              />
            </motion.div>

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xs text-slate-400 tracking-widest uppercase"
            >
              Chargement{".".repeat((Math.floor(progress / 20) % 4) + 1)}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;