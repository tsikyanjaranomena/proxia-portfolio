import { motion, useScroll, useTransform } from "framer-motion";
import { useId, useMemo, useRef, type CSSProperties } from "react";
import BlurredRaster from "@/components/brand/BlurredRaster";
import { SYMBOL_SHAPES, type SymbolShape } from "@/components/brand/symbolShapes";
import { cn } from "@/lib/utils";

export interface GradientStop {
  offset: number;
  color: string;
  opacity: number;
}

/**
 * Convertit un dégradé linéaire Figma (matrice de peinture [m00, m01, m02, m10, m11, m12])
 * en points de départ / arrivée dans le repère 0–1 du tracé.
 */
export const figmaGradient = (
  t: [number, number, number, number, number, number],
  stops: Array<[number, string, number]>,
): DecorShapeProps["gradient"] => {
  const [a, b, c, d, e, f] = t;
  const det = a * e - b * d;
  const inv = (x: number, y: number): [number, number] => {
    const px = x - c, py = y - f;
    return [+((e * px - b * py) / det).toFixed(3), +((-d * px + a * py) / det).toFixed(3)];
  };
  return {
    from: inv(0, 0.5),
    to: inv(1, 0.5),
    stops: stops.map(([offset, color, opacity]) => ({ offset, color, opacity })),
  };
};

export interface DecorShapeProps {
  shape: SymbolShape;
  /** Position du coin d'origine (classes ou style), avant transformation. */
  className?: string;
  style?: CSSProperties;
  /** Largeur rendue (px). */
  width: number;
  /** Hauteur rendue (px) ; par défaut, suit le ratio du tracé (sinon la forme est étirée). */
  height?: number;
  /** Matrice Figma [m00, m10, m01, m11] (rotation / miroir autour du coin haut-gauche). */
  matrix?: [number, number, number, number];
  /** Dégradé linéaire en coordonnées 0–1 du tracé : [x1, y1, x2, y2]. */
  gradient: { from: [number, number]; to: [number, number]; stops: GradientStop[] };
  opacity: number;
  /** Flou de calque Figma (rayon) ; converti en blur CSS = rayon / 2. */
  blur?: number;
  /** Déplacement vertical au scroll (px). */
  parallax?: number;
}

/** Fragment du symbole reproduit à l'identique de la maquette Figma. */
const DecorShape = ({
  shape,
  className,
  style,
  width,
  height,
  matrix = [1, 0, 0, 1],
  gradient,
  opacity,
  blur = 0,
  parallax = 0,
}: DecorShapeProps) => {
  const { width: w, height: h, d } = SYMBOL_SHAPES[shape];
  const gradientId = `decor-${useId().replace(/[^a-zA-Z0-9]/g, "")}`;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);
  const renderedHeight = height ?? (width * h) / w;
  const cssBlur = blur / 2;

  // Forme floutée : même tracé et même dégradé, mais flou pré-calculé (voir BlurredRaster)
  const markup = useMemo(() => {
    if (!cssBlur) return "";
    const stops = gradient.stops
      .map((stop) => `<stop offset="${stop.offset}" stop-color="${stop.color}" stop-opacity="${stop.opacity}"/>`)
      .join("");
    return (
      `<defs><linearGradient id="g" gradientUnits="userSpaceOnUse" x1="${gradient.from[0] * w}" y1="${gradient.from[1] * h}" ` +
      `x2="${gradient.to[0] * w}" y2="${gradient.to[1] * h}">${stops}</linearGradient></defs><path d="${d}" fill="url(#g)"/>`
    );
  }, [cssBlur, gradient, w, h, d]);

  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      // Couche GPU dédiée : la parallaxe déplace la forme déjà floutée sans la redessiner
      className={cn("pointer-events-none absolute select-none will-change-transform", className)}
      style={{ ...style, width, y }}
    >
      <div
        className="relative"
        style={{
          transform: `matrix(${matrix.join(",")},0,0)`,
          transformOrigin: "0 0",
          opacity,
          width,
          height: renderedHeight,
        }}
      >
        {cssBlur ? (
          <BlurredRaster markup={markup} viewBox={[w, h]} width={width} height={renderedHeight} blur={cssBlur} />
        ) : (
        <svg
          viewBox={`0 0 ${w} ${h}`}
          width={width}
          height={renderedHeight}
          preserveAspectRatio={height ? "none" : undefined}
          focusable="false"
        >
          <defs>
            <linearGradient
              id={gradientId}
              gradientUnits="userSpaceOnUse"
              x1={gradient.from[0] * w}
              y1={gradient.from[1] * h}
              x2={gradient.to[0] * w}
              y2={gradient.to[1] * h}
            >
              {gradient.stops.map((stop) => (
                <stop key={stop.offset} offset={stop.offset} stopColor={stop.color} stopOpacity={stop.opacity} />
              ))}
            </linearGradient>
          </defs>
          <path d={d} fill={`url(#${gradientId})`} />
        </svg>
        )}
      </div>
    </motion.div>
  );
};

export default DecorShape;
