import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { VIEWPORT } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

interface FadeLineProps {
  /** Côté du point : la ligne y est opaque puis s'estompe vers l'autre extrémité. */
  anchor?: "start" | "end";
  tone?: "brand" | "white";
  /** Afficher le point d'ancrage. */
  dot?: boolean;
  className?: string;
  delay?: number;
  /** Durée du tracé (s). */
  duration?: number;
}

const COLORS = {
  brand: { solid: "rgb(0 102 255)", mid: "rgb(0 198 255 / 0.45)", dot: "bg-brand" },
  white: { solid: "rgb(255 255 255 / 0.85)", mid: "rgb(255 255 255 / 0.3)", dot: "bg-white" },
} as const;

const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

/**
 * Trait fin + point (remplace captures/line.png).
 * Au scroll, le trait se dessine depuis le bord de la page jusqu'au point,
 * puis le point apparaît. Le trait reste opaque côté point et transparent côté bord.
 */
const FadeLine = ({
  anchor = "start",
  tone = "brand",
  dot = true,
  className,
  delay = 0,
  duration = 1.6,
}: FadeLineProps) => {
  const { solid, mid, dot: dotClass } = COLORS[tone];
  const fromStart = anchor === "start";
  // Le trait part du bord de la page (côté opposé au point) et avance vers le point
  const hidden = fromStart ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)";

  // On observe le conteneur (non masqué) : un élément entièrement coupé par clip-path
  // n'est jamais considéré comme visible par l'IntersectionObserver.
  const ref = useRef<HTMLSpanElement>(null);
  // Même déclencheur que les textes (Reveal / SplitText) : tout démarre ensemble
  const inView = useInView(ref, VIEWPORT);

  return (
    <span ref={ref} aria-hidden="true" className={cn("relative block h-[5px] min-w-0", className)}>
      <motion.span
        className="absolute inset-0 my-auto h-px"
        style={{
          background: `linear-gradient(${fromStart ? "90deg" : "270deg"}, ${solid} 0%, ${mid} 45%, transparent 100%)`,
        }}
        initial={{ clipPath: hidden }}
        animate={{ clipPath: inView ? "inset(0 0% 0 0%)" : hidden }}
        transition={{ duration, delay, ease: EASE_IN_OUT }}
      />
      {/* Le point apparaît (scale 0 → 1) quand le trait atteint sa position.
          Centrage par inset-y-0 + my-auto : framer-motion gère le transform (scale). */}
      {dot && (
        <motion.span
          className={cn("absolute inset-y-0 my-auto size-[5px] rounded-full", dotClass, fromStart ? "left-0" : "right-0")}
          initial={{ scale: 0 }}
          animate={{ scale: inView ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 18, delay: delay + duration * 0.92 }}
        />
      )}
    </span>
  );
};

export default FadeLine;
