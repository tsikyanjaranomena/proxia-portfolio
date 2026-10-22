import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface CountUpProps {
  value: number;
  duration?: number;
  className?: string;
}

/**
 * Compteur animé de 0 à `value` quand il entre dans le viewport.
 * Le nombre est écrit directement dans le DOM à chaque image (pas d'état React → pas de re-rendu).
 */
const CountUp = ({ value, duration = 2, className }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        if (ref.current) ref.current.textContent = String(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
};

export default CountUp;
