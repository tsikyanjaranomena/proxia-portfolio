import type { DecorShapeProps } from "@/components/brand/DecorShape";

type DecorPreset = Omit<DecorShapeProps, "className" | "style" | "parallax">;

/**
 * Formes de fond relevées dans Proxiatech.fig (Wireframe - 6) :
 * fragment, taille, matrice, dégradé (couleurs + opacités), opacité et flou de calque.
 */
export const DECOR = {
  /** Anneau flou à droite de « À propos » (x 1012, rotation -10°). */
  aboutRing: {
    shape: "ring",
    width: 1133,
    matrix: [0.983, -0.182, 0.182, 0.983],
    opacity: 0.1,
    blur: 40,
    gradient: {
      from: [0.02, 1],
      to: [0.981, 0],
      stops: [
        { offset: 0.15, color: "#00EEFD", opacity: 0 },
        { offset: 0.58, color: "#01C0FE", opacity: 0.3 },
        { offset: 0.79, color: "#0065FC", opacity: 0.6 },
      ],
    },
  },
  /** Anneau flou sur le bord gauche, derrière « Technologies maîtrisées » (miroir + 113°). */
  technologiesRing: {
    shape: "ring",
    width: 1133,
    matrix: [-0.388, 0.922, 0.922, 0.388],
    opacity: 0.1,
    blur: 40,
    gradient: {
      from: [0.097, 0.912],
      to: [0.732, 0.88],
      stops: [
        { offset: 0.14, color: "#0065FC", opacity: 0.2 },
        { offset: 0.55, color: "#01C0FE", opacity: 0.1 },
        { offset: 0.85, color: "#00EEFD", opacity: 0 },
      ],
    },
  },
  /** Branche floue à droite de « Nos réalisations » (miroir + 103°). */
  portfolioBranch: {
    shape: "branch",
    width: 676,
    matrix: [-0.233, 0.973, 0.973, 0.233],
    opacity: 0.1,
    blur: 40,
    gradient: {
      from: [0.929, 0.157],
      to: [0.001, 0.868],
      stops: [
        { offset: 0.03, color: "#00EEFD", opacity: 0.05 },
        { offset: 0.42, color: "#01C0FE", opacity: 0.25 },
        { offset: 0.79, color: "#0065FC", opacity: 0.4 },
      ],
    },
  },
  /** Grande branche dans la carte contact, derrière le formulaire (rotation 8°). */
  contactBranch: {
    shape: "branch",
    width: 1189,
    matrix: [0.991, 0.137, -0.137, 0.991],
    opacity: 0.5,
    gradient: {
      from: [0.739, 0.37],
      to: [0.076, 0.794],
      stops: [
        { offset: 0.25, color: "#00EEFD", opacity: 0.1 },
        { offset: 0.35, color: "#01C0FE", opacity: 1 },
        { offset: 0.51, color: "#01BFFE", opacity: 1 },
        { offset: 0.76, color: "#0065FC", opacity: 0.1 },
      ],
    },
  },
} satisfies Record<string, DecorPreset>;
