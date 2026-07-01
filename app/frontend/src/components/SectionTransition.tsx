import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface SectionTransitionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const SectionTransition = ({ children, className = "", id }: SectionTransitionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Opacity uniquement — GPU-accelerated, pas de repaint
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.88, 1],
    [0.4, 1, 1, 0.7]
  );

  return (
    <motion.section
      ref={ref}
      id={id}
      style={{ opacity }}
      className={className}
    >
      {children}
    </motion.section>
  );
};

export default SectionTransition;
