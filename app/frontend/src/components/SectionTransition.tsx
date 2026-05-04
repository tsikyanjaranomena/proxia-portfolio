import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * SectionTransition wraps a section with progressive reveal effects:
 * - Opacity fades in from 0 → 1 as the section enters
 * - Subtle scale + blur effect for smooth depth transition
 * - Works across scroll direction (both up and down)
 */
const SectionTransition = ({ children, className = "", id }: SectionTransitionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Fade in/out at edges
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.3, 1, 1, 0.6]
  );

  // Subtle scale effect
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.97, 1, 1, 0.99]
  );

  // Slight blur at edges
  const blur = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    ["blur(3px)", "blur(0px)", "blur(0px)", "blur(2px)"]
  );

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ opacity, scale, filter: blur }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default SectionTransition;