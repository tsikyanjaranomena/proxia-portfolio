import { motion, useInView } from "framer-motion";
import { useRef, type CSSProperties } from "react";
import BlurredRaster from "@/components/brand/BlurredRaster";
import { SYMBOL_FULL } from "@/components/brand/symbolShapes";

/**
 * Fond du hero, repris de Proxiatech.fig (Group 77) : trois symboles complets
 * concentriques, centrés près du bord droit, du plus grand au plus petit.
 * Chacun tourne lentement : petit (horaire), moyen (anti-horaire), grand (horaire).
 *
 * Valeurs Figma : opacité de groupe 0.5, flou de calque 60 (= blur CSS 30 px),
 * dégradé radial #00D4FF 0 % → #00C6FF 50 % → #0065FC 70 %, opacité de peinture 0.02.
 * `INTENSITY` multiplie l'opacité de peinture : 4 reproduit le rendu de l'éditeur Figma
 * (capture du 06/10, mesurée pixel à pixel) ; 1 = valeurs brutes du fichier, quasi invisibles.
 */
const INTENSITY = 4;
const FIGMA_PAINT_OPACITY = 0.02;
const FIGMA_GROUP_OPACITY = 0.5;

const SYMBOLS = [
  // centre (px depuis le bord droit / le haut du hero), taille, rotation initiale (°)
  { id: "big", size: 1969, right: 35, top: 501, rotate: -24.2, spin: "animate-spin-cw", duration: "220s" },
  { id: "mid", size: 978, right: 48, top: 509, rotate: -94.4, spin: "animate-spin-ccw", duration: "150s" },
  { id: "small", size: 464, right: 38, top: 537, rotate: 24, spin: "animate-spin-cw", duration: "90s" },
] as const;

const { width: SYMBOL_W, height: SYMBOL_H, paths: SYMBOL_PATHS } = SYMBOL_FULL;
/** Flou de calque Figma 60 → blur CSS 30 px. */
const SYMBOL_BLUR = 30;
/**
 * Symbole complet, dégradé radial par tracé (objectBoundingBox) comme le remplissage Figma.
 * Dessiné une seule fois, flou compris, par BlurredRaster.
 */
const SYMBOL_MARKUP =
  `<defs><radialGradient id="r"><stop offset="0" stop-color="#00D4FF" stop-opacity="0"/>` +
  `<stop offset="0.63" stop-color="#00C6FF" stop-opacity="0.5"/><stop offset="1" stop-color="#0065FC" stop-opacity="0.7"/></radialGradient></defs>` +
  `<g fill="url(#r)" opacity="${Math.min(1, FIGMA_PAINT_OPACITY * INTENSITY)}">` +
  SYMBOL_PATHS.map((path) => `<path d="${path.d}" transform="translate(${path.x} ${path.y})"/>`).join("") +
  `</g>`;

const HeroBackground = () => {
  // Rotation en pause quand le hero n'est plus à l'écran (économise GPU et batterie)
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {SYMBOLS.map((symbol, index) => (
        <motion.div
          key={symbol.id}
          className="absolute"
          style={{
            width: symbol.size,
            height: symbol.size,
            left: `calc(100% - ${symbol.right}px)`,
            top: symbol.top,
            x: "-50%",
            y: "-50%",
            rotate: symbol.rotate,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: FIGMA_GROUP_OPACITY }}
          transition={{ duration: 2.2, delay: 0.2 + index * 0.25 }}
        >
          {/*
            Performance : la rotation est appliquée AU-DESSUS du flou (et non l'inverse).
            Le symbole flouté est ainsi rendu une seule fois puis simplement tourné par le GPU,
            au lieu de recalculer un flou de 30 px sur ~2000 px à chaque image. Rendu identique
            (un flou gaussien est le même quelle que soit l'orientation).
          */}
          <div
            className={`${symbol.spin} h-full w-full will-change-transform`}
            style={{ "--spin-duration": symbol.duration, animationPlayState: inView ? "running" : "paused" } as CSSProperties}
          >
            {/* Même cadrage que l'ancien SVG (préserve les proportions, centré dans le carré) */}
            <div
              className="relative h-full"
              style={{ width: (symbol.size * SYMBOL_W) / SYMBOL_H, marginLeft: (symbol.size - (symbol.size * SYMBOL_W) / SYMBOL_H) / 2 }}
            >
              <BlurredRaster
                markup={SYMBOL_MARKUP}
                viewBox={[SYMBOL_W, SYMBOL_H]}
                width={(symbol.size * SYMBOL_W) / SYMBOL_H}
                height={symbol.size}
                blur={SYMBOL_BLUR}
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default HeroBackground;
