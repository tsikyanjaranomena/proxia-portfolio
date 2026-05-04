import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Cursor position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Trailing dot (follows faster)
  const dotX = useSpring(cursorX, { stiffness: 800, damping: 35 });
  const dotY = useSpring(cursorY, { stiffness: 800, damping: 35 });

  // Outer ring (follows slower for trail effect)
  const ringX = useSpring(cursorX, { stiffness: 180, damping: 22 });
  const ringY = useSpring(cursorY, { stiffness: 180, damping: 22 });

  useEffect(() => {
    // Detect touch device
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(isTouch);
    if (isTouch) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handlePointerCheck = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor-hover]'
      );
      setIsPointer(!!interactive);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousemove", handlePointerCheck);
    window.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousemove", handlePointerCheck);
      window.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
    };
  }, [cursorX, cursorY, isVisible]);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer ring with gradient border */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isPointer ? 56 : 36,
          height: isPointer ? 56 : 36,
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.85 : 1,
        }}
        transition={{
          width: { type: "spring", stiffness: 300, damping: 20 },
          height: { type: "spring", stiffness: 300, damping: 20 },
          scale: { type: "spring", stiffness: 400, damping: 20 },
          opacity: { duration: 0.2 },
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            backgroundColor: isPointer ? "rgba(147, 197, 253, 0.24)" : "transparent",
            opacity: isPointer ? 0.95 : 0.8,
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              backgroundColor: "transparent",
              border: isPointer
                ? "2px solid rgba(0, 168, 255, 0.9)"
                : "1.5px solid rgba(0, 102, 255, 0.75)",
            }}
          />
        </div>
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          background: "linear-gradient(135deg, #0066FF, #00D4FF)",
          boxShadow: "0 0 12px rgba(0, 102, 255, 0.45)",
        }}
        animate={{
          width: isPointer ? 10 : 8,
          height: isPointer ? 10 : 8,
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 1.35 : 1,
        }}
        transition={{
          scale: { type: "spring", stiffness: 500, damping: 20 },
          width: { type: "spring", stiffness: 300, damping: 20 },
          height: { type: "spring", stiffness: 300, damping: 20 },
        }}
      />
    </>
  );
};

export default CustomCursor;
