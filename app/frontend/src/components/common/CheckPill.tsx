import type { CSSProperties } from "react";
import { CheckCircleIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

/** Bande vitrée du hero (Figma) : fond et contour qui s'estompent en s'éloignant de l'icône. */
export interface PillBand {
  /** Positions (%) du fond blanc : opaque → 51 % → transparent. */
  fill: [number, number, number];
  /** Position (%) où le contour devient transparent. */
  border: number;
  /** Opacité globale de la bande (0.9 pour les bandes inversées). */
  dim?: number;
  /** Flou d'arrière-plan Figma (rayon) ; converti en backdrop-blur CSS = rayon / 2, plafonné. */
  blur: number;
}

interface CheckPillProps {
  label: string;
  /** Côté de l'icône. */
  side?: "left" | "right";
  /** Bande vitrée façon maquette ; sans elle, pastille compacte (mobile). */
  band?: PillBand;
  className?: string;
  style?: CSSProperties;
}

/** Pastille « ✓ Livraison rapide » (captures/Frame 33.png, Figma Frames 42–46). */
const CheckPill = ({ label, side = "left", band, className, style }: CheckPillProps) => {
  // Direction « en s'éloignant de l'icône »
  const away = side === "left" ? "90deg" : "270deg";

  const bandStyle: CSSProperties | undefined = band && {
    background: [
      `linear-gradient(${away}, rgb(var(--surface)) ${band.fill[0]}%, rgb(var(--surface) / 0.51) ${band.fill[1]}%, rgb(var(--surface) / 0) ${band.fill[2]}%) padding-box`,
      `linear-gradient(${away}, rgb(var(--hairline-soft)) 0%, rgb(var(--hairline-soft) / 0) ${band.border}%) border-box`,
    ].join(", "),
    opacity: band.dim,
    backdropFilter: `blur(${Math.min(band.blur / 2, 60)}px)`,
    WebkitBackdropFilter: `blur(${Math.min(band.blur / 2, 60)}px)`,
  };

  return (
    <div
      style={{ ...style, ...bandStyle }}
      className={cn(
        "flex items-center rounded-[5px] border",
        band
          ? "h-[54px] gap-[25px] border-transparent px-[25px]"
          : "h-10 gap-2 border-line bg-surface/90 px-3 shadow-soft sm:h-11 sm:gap-3 sm:px-4",
        side === "right" && "flex-row-reverse",
        className,
      )}
    >
      {/* Figma : cercle de 26 px, trait 2 px, #76DC9D */}
      <CheckCircleIcon size={band ? 35 : 26} strokeWidth={15} className="-m-1 shrink-0 text-brand-success" />
      <span className={cn("type-text whitespace-nowrap text-body", !band && "text-[13px] sm:text-sm")}>{label}</span>
    </div>
  );
};

export default CheckPill;
