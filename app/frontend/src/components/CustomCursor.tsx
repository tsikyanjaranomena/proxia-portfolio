import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "default" | "pointer" | "text";

const CustomCursor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Dot — très réactif
  const dotX = useSpring(cursorX, { stiffness: 950, damping: 40 });
  const dotY = useSpring(cursorY, { stiffness: 950, damping: 40 });

  // Anneau — suit avec un léger retard
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 20 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    // Seul critère fiable sur Windows : l'appareil a-t-il un pointeur précis (souris) ?
    const hasMouse = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!hasMouse) {
      setIsTouchDevice(true);
      return;
    }

    document.body.style.cursor = "none";

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handlePointerCheck = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      if (target.closest('a, button, [role="button"], [data-cursor-hover]')) {
        setCursorState("pointer");
      } else if (target.closest("p, h1, h2, h3, h4, h5, h6, li")) {
        setCursorState("text");
      } else {
        setCursorState("default");
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousemove", handlePointerCheck);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousemove", handlePointerCheck);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
    };
  }, []); // dépendances vides — pas de fermeture obsolète

  if (isTouchDevice) return null;

  const isPointer = cursorState === "pointer";
  const isText = cursorState === "text";

  return (
    <>
      {/* Anneau externe */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isPointer ? 58 : isText ? 40 : 34,
          height: isPointer ? 58 : isText ? 40 : 34,
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.78 : 1,
        }}
        transition={{
          width: { type: "spring", stiffness: 260, damping: 22 },
          height: { type: "spring", stiffness: 260, damping: 22 },
          scale: { type: "spring", stiffness: 420, damping: 18 },
          opacity: { duration: 0.15 },
        }}
      >
        {/* Bordure statique */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            border: isPointer
              ? "1.5px solid rgba(0,212,255,0.6)"
              : "1.5px solid rgba(0,102,255,0.65)",
            boxShadow: isPointer
              ? "0 0 20px rgba(0,102,255,0.3), inset 0 0 10px rgba(0,212,255,0.06)"
              : "none",
            background: isPointer ? "rgba(0,102,255,0.05)" : "transparent",
            transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
          }}
        />

        {/* Arc tournant visible en état pointer */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            border: "1.5px solid transparent",
            borderTopColor: "#00D4FF",
            borderRightColor: "rgba(0,102,255,0.5)",
          }}
          animate={{
            rotate: isPointer ? 360 : 0,
            opacity: isPointer ? 1 : 0,
          }}
          transition={{
            rotate: isPointer
              ? { duration: 1.8, repeat: Infinity, ease: "linear" }
              : { duration: 0.3 },
            opacity: { duration: 0.2 },
          }}
        />
      </motion.div>

      {/* Point central */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          background: "linear-gradient(135deg, #0066FF 0%, #00D4FF 100%)",
        }}
        animate={{
          width: isText ? 4 : isPointer ? 6 : 8,
          height: isText ? 4 : isPointer ? 6 : 8,
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 1.7 : 1,
          boxShadow: isPointer
            ? "0 0 18px rgba(0,102,255,0.7), 0 0 6px rgba(0,212,255,0.5)"
            : "0 0 10px rgba(0,102,255,0.45)",
        }}
        transition={{
          scale: { type: "spring", stiffness: 500, damping: 20 },
          width: { type: "spring", stiffness: 320, damping: 22 },
          height: { type: "spring", stiffness: 320, damping: 22 },
          opacity: { duration: 0.15 },
          boxShadow: { duration: 0.2 },
        }}
      />
    </>
  );
};

export default CustomCursor;
