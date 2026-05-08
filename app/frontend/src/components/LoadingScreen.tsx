import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BRAND_MARK } from "@/lib/brand";

const LOADER_DURATION_MS = 1800;
const LOADER_FALLBACK_MS = 2800;
const PROGRESS_INTERVAL_MS = 65;
const RING_RADIUS = 68;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

const LoadingScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startedAt = Date.now();
    let hideScheduled = false;
    let hideTimer: ReturnType<typeof window.setTimeout> | undefined;

    const progressInterval = window.setInterval(() => {
      setProgress((current) => (current >= 92 ? current : current + 4));
    }, PROGRESS_INTERVAL_MS);

    const hideLoader = () => {
      if (hideScheduled) {
        return;
      }

      hideScheduled = true;
      const remaining = Math.max(0, LOADER_DURATION_MS - (Date.now() - startedAt));

      hideTimer = window.setTimeout(() => {
        setProgress(100);
        setIsLoading(false);
      }, remaining);
    };

    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener("load", hideLoader);
    }

    const fallbackTimer = window.setTimeout(hideLoader, LOADER_FALLBACK_MS);

    return () => {
      window.clearInterval(progressInterval);
      window.clearTimeout(fallbackTimer);
      if (hideTimer) {
        window.clearTimeout(hideTimer);
      }
      window.removeEventListener("load", hideLoader);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#f7fbff]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,102,255,0.16),transparent_24%),radial-gradient(circle_at_80%_20%,rgba(0,212,255,0.14),transparent_18%)]" />
          <div className="absolute inset-x-0 top-0 h-[420px] bg-[linear-gradient(rgba(7,26,61,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(7,26,61,0.08)_1px,transparent_1px)] bg-[length:34px_34px] opacity-35 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

          <motion.div
            animate={{ scale: [1, 1.18, 1], opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[16%] top-[18%] h-80 w-80 rounded-full bg-gradient-to-br from-[#0066FF] to-[#00D4FF] blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.16, 1, 1.16], opacity: [0.1, 0.18, 0.1] }}
            transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            className="absolute bottom-[18%] right-[16%] h-80 w-80 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#0066FF] blur-3xl"
          />

          <div className="relative z-10 flex w-[min(92vw,440px)] flex-col items-center rounded-[2.25rem] border border-white/70 bg-white/80 px-6 py-8 text-center backdrop-blur-2xl shadow-[0_30px_100px_rgba(7,26,61,0.12)]">
            <div className="relative flex h-48 w-48 items-center justify-center">
              <motion.div
                animate={{ scale: [0.96, 1.06, 0.96], opacity: [0.28, 0.5, 0.28] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-6 rounded-full bg-gradient-to-br from-[#0066FF]/18 to-[#00D4FF]/24 blur-2xl"
              />

              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                viewBox="0 0 160 160"
                className="absolute inset-0 h-full w-full -rotate-90"
              >
                <defs>
                  <linearGradient id="loaderRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#0066FF" />
                    <stop offset="55%" stopColor="#00A8FF" />
                    <stop offset="100%" stopColor="#00D4FF" />
                  </linearGradient>
                </defs>
                <circle
                  cx="80"
                  cy="80"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="rgba(148, 163, 184, 0.18)"
                  strokeWidth="8"
                />
                <circle
                  cx="80"
                  cy="80"
                  r={RING_RADIUS}
                  fill="none"
                  stroke="url(#loaderRingGradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={RING_CIRCUMFERENCE}
                  strokeDashoffset={RING_CIRCUMFERENCE - (progress / 100) * RING_CIRCUMFERENCE}
                  className="transition-[stroke-dashoffset] duration-300 ease-out"
                />
              </motion.svg>

              <div className="relative flex h-[8.5rem] w-[8.5rem] items-center justify-center rounded-full border border-slate-200 bg-white shadow-[0_18px_40px_rgba(7,26,61,0.12)]">
                <img
                  src={BRAND_MARK}
                  alt="ProxiaTech"
                  className="h-24 w-24 object-contain"
                />
              </div>
            </div>

            <div className="mt-5">
              <h1 className="text-3xl font-bold text-[#0A0E27] tracking-tight">
                Proxia
                <span className="bg-gradient-to-r from-[#0066FF] to-[#00D4FF] bg-clip-text text-transparent">
                  Tech
                </span>
              </h1>
            </div>

            <p className="mt-4 text-sm uppercase tracking-[0.18em] text-slate-500">
              Build. Launch. Scale.
            </p>

            <div className="mt-3 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
              Loading {progress}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
