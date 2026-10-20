import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Nappe de grille de fond (Figma : motif « Line pattern » en mosaïque de 20 px,
 * traits #334155, opacité image 0.2 × calque 0.25, dégradé radial blanc sur les bords).
 * `GRID_LINE_ALPHA` règle l'intensité des traits (les traits Figma font 0,4 px, d'où un
 * équivalent 1 px plus transparent).
 */
export const GRID_CELL = 20;
export const GRID_LINE_ALPHA = 0.035;

interface GridPatchProps {
  className?: string;
  style?: CSSProperties;
  /**
   * `radial` : visible au centre, fondu vers les bords (rectangles Figma).
   * `inset` : bords fondus en rectangle (ombre intérieure blanche, nappe du hero).
   */
  fade?: "radial" | "inset";
  /** Contour SVG (repère de la nappe) : la grille n'apparaît qu'à l'intérieur. */
  clip?: string;
}

const MASKS = {
  // Figma : blanc transparent à 18 % du rayon, opaque au bord → la grille disparaît sur les bords
  radial: "radial-gradient(closest-side, #000 18%, transparent 100%)",
  // Ombre intérieure blanche très large (flou 250, étalement 272) : seul le cœur de la forme reste visible
  inset:
    "linear-gradient(90deg, transparent 8%, #000 30%, #000 70%, transparent 92%), linear-gradient(180deg, transparent 25%, #000 75%, transparent)",
} as const;

const GridPatch = ({ className, style, fade = "radial", clip }: GridPatchProps) => {
  const line = `rgb(var(--grid-line) / var(--grid-alpha, ${GRID_LINE_ALPHA}))`;
  const mask = MASKS[fade];
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute select-none", className)}
      style={{
        ...style,
        backgroundImage: `linear-gradient(${line} 1px, transparent 1px), linear-gradient(90deg, ${line} 1px, transparent 1px)`,
        backgroundSize: `${GRID_CELL}px ${GRID_CELL}px`,
        clipPath: clip ? `path("${clip}")` : undefined,
        WebkitMaskImage: mask,
        maskImage: mask,
        // Deux masques linéaires combinés : intersection des fondus horizontal et vertical
        ...(fade === "inset" ? { WebkitMaskComposite: "source-in", maskComposite: "intersect" } : {}),
      }}
    />
  );
};

export default GridPatch;
