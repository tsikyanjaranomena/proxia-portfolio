import DecorShape, { figmaGradient } from "@/components/brand/DecorShape";
import GridPatch from "@/components/brand/GridPatch";
import type { BackgroundSet } from "@/data/backgrounds";
import { cn } from "@/lib/utils";

interface SectionBackgroundProps {
  /** Décor desktop / tablette (x relatif au centre de la page). */
  desktop?: BackgroundSet;
  /** Décor mobile (x depuis le bord gauche). */
  mobile?: BackgroundSet;
  /** Classe de visibilité : desktop à partir de md, mobile en dessous. */
  className?: string;
}

const Layer = ({ set, centered, className }: { set: BackgroundSet; centered: boolean; className: string }) => (
  <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
    {set.grids.map((g, i) => (
      <GridPatch
        key={`g${i}`}
        fade={g.fade}
        clip={g.clip}
        style={{ left: centered ? `calc(50% + ${g.x}px)` : g.x, top: g.top, width: g.w, height: g.h }}
      />
    ))}
    {set.shapes.map((s, i) => (
      <DecorShape
        key={`s${i}`}
        shape={s.shape}
        width={s.w}
        height={s.h}
        matrix={s.m}
        opacity={s.opacity}
        blur={s.blur}
        gradient={figmaGradient(s.t, s.stops)}
        parallax={40}
        style={{ left: centered ? `calc(50% + ${s.x}px)` : s.x, top: s.top }}
      />
    ))}
  </div>
);

/**
 * Décor de fond d'une section (nappes de grille + formes floues de la maquette Figma).
 * À placer dans un conteneur `relative` ; le contenu de la section doit être en `relative`.
 */
const SectionBackground = ({ desktop, mobile }: SectionBackgroundProps) => (
  <>
    {desktop && <Layer set={desktop} centered className="hidden md:block" />}
    {mobile && <Layer set={mobile} centered={false} className="md:hidden" />}
  </>
);

export default SectionBackground;
