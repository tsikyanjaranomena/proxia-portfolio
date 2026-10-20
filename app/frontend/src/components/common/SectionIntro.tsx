import Button from "@/components/common/Button";
import FadeLine from "@/components/common/FadeLine";
import { ArrowDownRightIcon } from "@/components/icons";
import { Reveal, SplitText, type TextSegment } from "@/components/motion/Reveal";
import type { TitleSegment } from "@/lib/translations";
import { cn } from "@/lib/utils";

/**
 * Flèche des CTA de section (Figma « Default button size ») : icônes/arrow-down-right_raw.svg
 * retournée verticalement (↗), 18 px, blanche, trait 2 px, à 8 px du texte.
 */
export const CtaArrow = () => (
  <ArrowDownRightIcon
    size={18}
    strokeWidth={28}
    className="shrink-0 -scale-y-100 transition-transform duration-500 ease-out-expo group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
  />
);

export const toSegments = (title: ReadonlyArray<TitleSegment>): TextSegment[] =>
  title.map((segment) => ({ text: segment.text, className: segment.highlight ? "text-gradient" : undefined }));

interface SectionIntroProps {
  eyebrow: string;
  title: ReadonlyArray<TitleSegment>;
  description: string;
  /** Bouton d'action sous la description (tablette et desktop). */
  cta?: { label: string; to: string };
  /**
   * `title-start` : libellé à gauche + trait vers la droite ; titre à gauche, description à droite.
   * `title-end`   : trait depuis la gauche + libellé à droite ; description à gauche, titre à droite.
   */
  layout?: "title-start" | "title-end";
  /** Couleur du titre : `body` (#334155) ou `ink` (#0A0E27), comme dans la maquette. */
  tone?: "body" | "ink";
  /** Largeur max de la description en desktop (px, maquette). */
  descriptionWidth?: number;
  className?: string;
}

/**
 * En-tête de section (maquette desktop_landing / mobile_landing) :
 * - mobile (< 640) : libellé + trait jusqu'au bord, titre, description, alignés à gauche
 * - tablette (640–1023) : centré, sans trait, avec le bouton
 * - desktop : ligne libellé + trait sur toute la largeur, puis titre et description (+ bouton)
 *   calés sur les bords opposés
 */
const SectionIntro = ({
  eyebrow,
  title,
  description,
  cta,
  layout = "title-start",
  tone = "body",
  descriptionWidth = 453,
  className,
}: SectionIntroProps) => {
  const titleStart = layout === "title-start";

  return (
    <div className={className}>
      {/* Ligne 1 : libellé + trait */}
      <Reveal
        blur={false}
        distance={12}
        className={cn("flex items-center gap-5 sm:justify-center lg:justify-start lg:gap-[43px]", !titleStart && "lg:flex-row-reverse")}
      >
        <span className="type-subtitle shrink-0 text-brand">{eyebrow}</span>
        {/* Mobile : trait jusqu'au bord droit, point près du libellé, tracé de droite à gauche */}
        <FadeLine anchor="start" className="-mr-[1.875rem] flex-1 sm:hidden" />
        {/* Desktop : trait sur toute la largeur restante (masqué sur tablette) */}
        <FadeLine anchor={titleStart ? "start" : "end"} className="hidden flex-1 lg:block" />
      </Reveal>

      {/* Ligne 2 : titre + description (+ bouton) */}
      <div
        className={cn(
          "mt-5 flex flex-col gap-5 sm:items-center lg:mt-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16",
          !titleStart && "lg:flex-row-reverse",
        )}
      >
        <SplitText
          segments={toSegments(title)}
          className={cn(
            "type-hero max-w-[561px] text-balance [&_br]:hidden sm:text-center sm:[&_br]:inline lg:[text-wrap:wrap]",
            tone === "ink" ? "text-ink" : "text-body dark:text-ink",
            titleStart ? "lg:text-left" : "lg:text-right",
          )}
        />

        <Reveal
          delay={0.15}
          className={cn("flex flex-col sm:items-center lg:mt-2 lg:shrink-0", titleStart ? "lg:items-end lg:text-right" : "lg:items-start lg:text-left")}
          style={{ ["--desc-w" as string]: `${descriptionWidth}px` }}
        >
          {/* Mobile : retour à la ligne naturel ; tablette : lignes équilibrées */}
          <p
            className={cn(
              "type-text text-pretty text-body sm:max-w-[440px] sm:whitespace-pre-line sm:text-center sm:text-balance lg:max-w-[var(--desc-w)] lg:whitespace-normal lg:[text-wrap:wrap]",
              titleStart ? "lg:text-right" : "lg:text-left",
            )}
          >
            {description}
          </p>
          {cta && (
            <Button asLink={cta.to} variant="primary" size="sm" className="mt-7 inline-flex min-w-[220px] gap-2 self-start font-display text-[15px] sm:self-center lg:self-auto">
              {cta.label}
              <CtaArrow />
            </Button>
          )}
        </Reveal>
      </div>
    </div>
  );
};

export default SectionIntro;
