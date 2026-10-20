import { motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useId, useLayoutEffect, useRef, useState } from "react";
import { EASE_OUT_EXPO } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

export interface MethodStep {
  id: string;
  title: string;
  description: string;
}

/**
 * Étapes en zigzag (maquette mobile_landing) :
 * le chemin descend sous « 01 » à gauche, traverse vers la droite, descend sous « 02 », etc.
 * Au scroll, la ligne se dessine le long de ce chemin et un point lumineux avance à sa pointe ;
 * le numéro, le titre et le texte d'une étape n'apparaissent qu'une fois atteints par la ligne.
 *
 * Géométrie (maquette 390 px, marges 30) : trait gauche à 58 px du bord du contenu,
 * trait droit à 74 px du bord droit, une étape par tranche de 210 px.
 */
const ROW_H = 210;
const LEFT_X = 58;
const RIGHT_INSET = 74;
const START_Y = 6;

const MethodPath = ({ steps }: { steps: MethodStep[] }) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [width, setWidth] = useState(330);
  const gradientId = `method-path-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;

  // Largeur du conteneur → coordonnées du chemin
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const rightX = width - RIGHT_INSET;
  const height = steps.length * ROW_H;
  // Chemin : vertical (gauche) → horizontal → vertical (droite) → horizontal → …
  const d = steps
    .map((_, i) => {
      const x = i % 2 === 0 ? LEFT_X : rightX;
      const nextX = i % 2 === 0 ? rightX : LEFT_X;
      const yEnd = (i + 1) * ROW_H;
      const vertical = `${i === 0 ? `M${x} ${START_Y}` : ""} V${yEnd}`;
      return i < steps.length - 1 ? `${vertical} H${nextX}` : vertical;
    })
    .join(" ");

  // Progression : la ligne avance quand la liste traverse le milieu de l'écran
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start 70%", "end 65%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.0005 });
  // pathLength (0 → 1) : framer-motion gère lui-même le tiret, quelle que soit la longueur du chemin
  const drawn = useTransform(progress, (p) => Math.min(1, Math.max(0, p)));
  // Point lumineux : valeurs animées (pas d'état React) → aucun re-rendu à chaque image du scroll
  const dotX = useMotionValue(LEFT_X);
  const dotY = useMotionValue(START_Y);
  const [dotVisible, setDotVisible] = useState(false);
  const [reached, setReached] = useState(-1);

  useMotionValueEvent(progress, "change", (p) => {
    const path = pathRef.current;
    if (!path) return;
    const clamped = Math.min(1, Math.max(0, p));
    const point = path.getPointAtLength(clamped * path.getTotalLength());
    dotX.set(point.x);
    dotY.set(point.y);
    // États React mis à jour seulement quand ils changent réellement
    const visible = clamped > 0.001;
    setDotVisible((current) => (current === visible ? current : visible));
    // Étape atteinte : la pointe a dépassé le haut de sa tranche (aucune avant le départ de la ligne)
    const next = clamped <= 0.001 ? -1 : Math.min(steps.length - 1, Math.floor((point.y - START_Y + 30) / ROW_H));
    setReached((current) => (current === next ? current : next));
  });

  return (
    <div ref={wrapRef} className="relative" style={{ height }}>
      <svg className="pointer-events-none absolute inset-0 overflow-visible" width={width} height={height} aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={width} y2="0">
            <stop offset="0" stopColor="#00EEFD" />
            <stop offset="0.37" stopColor="#01C0FE" />
            <stop offset="0.79" stopColor="#0065FC" />
          </linearGradient>
        </defs>
        <motion.path
          ref={pathRef}
          d={d}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ pathLength: drawn }}
        />
        {/* Point de départ et point lumineux qui avance avec la ligne */}
        <circle cx={LEFT_X} cy={START_Y} r="3" fill="#00D4FF" />
        <g style={{ opacity: dotVisible ? 1 : 0, transition: "opacity 0.3s" }}>
          <motion.circle cx={dotX} cy={dotY} r="9" fill="#00C6FF" opacity="0.18" />
          <motion.circle cx={dotX} cy={dotY} r="3.5" fill="#0066FF" />
        </g>
      </svg>

      {steps.map((step, i) => {
        const left = i % 2 === 0;
        const active = i <= reached;
        return (
          <div key={step.id} className="absolute inset-x-0" style={{ top: i * ROW_H, height: ROW_H }}>
            {/* Numéro : à gauche du trait (étapes impaires) ou à droite (paires) */}
            <motion.span
              className={cn(
                "text-gradient absolute top-0 font-display text-[40px] font-medium leading-none",
                left ? "left-[-10px] w-[60px] text-center" : "w-[64px] text-center",
              )}
              style={left ? undefined : { left: rightX + 6 }}
              initial={false}
              animate={active ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 10 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            >
              {String(i + 1).padStart(2, "0")}
            </motion.span>
            <div
              className={cn("absolute top-[15px]", left ? "text-left" : "text-right")}
              style={left ? { left: LEFT_X + 31, right: 0 } : { left: 0, width: rightX - 30 }}
            >
              <motion.h3
                className="type-subtitle text-brand"
                initial={false}
                animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: left ? -14 : 14 }}
                transition={{ duration: 0.6, delay: active ? 0.12 : 0, ease: EASE_OUT_EXPO }}
              >
                {step.title}
              </motion.h3>
              <motion.p
                className={cn("type-text mt-3 max-w-[300px] text-body", !left && "ml-auto")}
                initial={false}
                animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.7, delay: active ? 0.25 : 0, ease: EASE_OUT_EXPO }}
              >
                {step.description}
              </motion.p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MethodPath;
