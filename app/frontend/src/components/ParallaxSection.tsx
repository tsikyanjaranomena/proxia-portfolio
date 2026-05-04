import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  speed?: number; // negative for reverse, positive for normal. Typical range: -0.5 to 0.5
  offset?: ["start end" | "start start" | "start center", "end start" | "end end" | "end center"];
}

/**
 * Wraps content with a subtle vertical parallax effect based on scroll progress.
 */
const ParallaxSection = ({
  children,
  className = "",
  speed = 0.15,
}: ParallaxSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${speed * 100}px`, `${-speed * 100}px`]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
};

export default ParallaxSection;

/**
 * Background parallax layer — moves slower than scroll for depth effect.
 */
export const ParallaxBackground = ({
  children,
  speed = 0.3,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`${-speed * 200}px`, `${speed * 200}px`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="absolute inset-0">
        {children}
      </motion.div>
    </div>
  );
};

/**
 * Hook: returns a parallax Y motion value for custom elements.
 */
export const useParallax = (speed: number = 0.2): MotionValue<string> => {
  const { scrollYProgress } = useScroll();
  return useTransform(scrollYProgress, [0, 1], [`0px`, `${-speed * 500}px`]);
};