import SectionBackground from "@/components/brand/SectionBackground";
import Button from "@/components/common/Button";
import FadeLine from "@/components/common/FadeLine";
import { CtaArrow, toSegments } from "@/components/common/SectionIntro";
import { Reveal, RevealGroup, RevealItem, SplitText } from "@/components/motion/Reveal";
import { DESKTOP_BACKGROUNDS } from "@/data/backgrounds";
import { PROJECT_PATH, TECHNOLOGY_ROWS, type Technology, type TechnologyBand } from "@/data/site";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

/** Liste à plat (même ordre que la grille desktop) pour les cases tablette. */
const TECHNOLOGIES = TECHNOLOGY_ROWS.flatMap((row) => row.items);

/** Mobile : les 9 technos de la maquette mobile_landing en tête (dans son ordre, libellés adaptés). */
const MOBILE_FIRST: Array<Technology & { label: string }> = [
  ["Next.js", "Next.js"],
  ["React", "React.js"],
  ["Node.js", "Node.js"],
  ["Vue.js", "Vue.js"],
  ["Typescript", "Typescript"],
  ["Tailwind CSS", "Tailwind CSS"],
  ["Javascript", "Javascript"],
  ["Python", "Python"],
  ["Postgresql", "PostgreSQL"],
].map(([name, label]) => ({ ...TECHNOLOGIES.find((tech) => tech.name === name)!, label }));

/** Mobile : toutes les technos, comme sur desktop (les 9 de la maquette d'abord, puis les autres). */
const MOBILE_TECHNOLOGIES: Array<Technology & { label: string }> = [
  ...MOBILE_FIRST,
  ...TECHNOLOGIES.filter((tech) => !MOBILE_FIRST.some((first) => first.name === tech.name)).map((tech) => ({ ...tech, label: tech.name })),
];

const TechBox = ({ tech, label, className }: { tech: Technology; label: string; className?: string }) => (
  <div
    className={cn(
      "group flex h-[116px] flex-col items-center justify-center gap-3 rounded-[12px] border border-[#BCBCBC]/30 bg-surface px-2 text-center transition-colors duration-300 hover:border-brand/25 dark:border-line sm:h-[96px] sm:gap-2.5",
      className,
    )}
  >
    <img
      src={tech.icon}
      alt=""
      loading="lazy"
      decoding="async"
      className={cn(
        "size-10 object-contain transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 sm:size-9",
        tech.invertOnDark && "dark:invert",
      )}
    />
    <span className="font-body text-sm leading-tight text-ink sm:text-[11px] sm:font-medium sm:text-body">{label}</span>
  </div>
);

/** Style d'une bande vitrée, d'après ses réglages Figma (voir TECHNOLOGY_ROWS). */
const bandStyle = (band: TechnologyBand): React.CSSProperties => ({
  left: band.left,
  right: -band.right,
  background: band.fill,
  // Ombre intérieure Figma : y 6, flou 6.5, étalement -6, #F6F6F6 à 38 %
  boxShadow: band.innerShadow ? "inset 0 6px 6.5px -6px rgb(var(--hairline-soft) / 0.38)" : undefined,
  backdropFilter: band.blur ? `blur(${band.blur / 2}px)` : undefined,
  WebkitBackdropFilter: band.blur ? `blur(${band.blur / 2}px)` : undefined,
});

/** Filet bas : transparent → #F6F6F6 → transparent. */
const bandLine = ({ line }: TechnologyBand) =>
  `linear-gradient(90deg, rgb(var(--hairline-soft) / 0) ${line.from}%, rgb(var(--hairline-soft)) ${line.peak}%, rgb(var(--hairline-soft) / 0) ${line.to}%)`;

const Technologies = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-x-clip py-24 lg:pb-40 lg:pt-28">
      {/* Nappes de grille + anneaux flous (maquette Figma) */}
      <SectionBackground desktop={DESKTOP_BACKGROUNDS.technologies} />

      <div className="container relative">
        {/* Mobile : libellé + trait (maquette mobile_landing) */}
        <Reveal blur={false} distance={12} className="mb-5 flex items-center gap-5 sm:hidden">
          <span className="type-subtitle shrink-0 text-brand">{t.technologies.eyebrow}</span>
          <FadeLine anchor="start" className="-mr-[1.875rem] flex-1" />
        </Reveal>

        {/* Mobile : aligné à gauche ; tablette et desktop : centré */}
        <div className="max-w-[620px] sm:mx-auto sm:text-center">
          <SplitText segments={toSegments(t.technologies.title)} className="type-hero text-balance text-body dark:text-ink" />
          <Reveal delay={0.15} className="flex flex-col sm:items-center">
            <p className="type-text mt-6 text-pretty text-body sm:whitespace-pre-line sm:text-balance lg:[text-wrap:wrap]">
              {t.technologies.description}
            </p>
            <Button asLink={PROJECT_PATH} variant="primary" size="sm" className="mt-7 inline-flex min-w-[252px] gap-2 self-start font-display text-[15px] sm:self-center">
              {t.technologies.cta}
              <CtaArrow />
            </Button>
          </Reveal>
        </div>

        {/* Mobile : toutes les technos en cases, sur 3 colonnes */}
        <RevealGroup stagger={0.03} className="mt-12 grid grid-cols-3 gap-[14px] sm:hidden">
          {MOBILE_TECHNOLOGIES.map((tech) => (
            <RevealItem key={tech.label} distance={12} blur={false}>
              <TechBox tech={tech} label={tech.label} />
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Tablette : toutes les technos en cases */}
        <RevealGroup stagger={0.03} className="mt-12 hidden grid-cols-4 gap-3 sm:grid md:grid-cols-5 lg:hidden">
          {TECHNOLOGIES.map((tech) => (
            <RevealItem key={tech.name} distance={12} blur={false}>
              <TechBox tech={tech} label={tech.name} />
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Desktop : grille en quinconce de la maquette, avec bandes vitrées */}
        <div className="mx-auto mt-[150px] hidden max-w-[994px] lg:block">
          {TECHNOLOGY_ROWS.map((row, rowIndex) => (
            <div key={rowIndex} className={cn("relative w-[900px]", row.offset)}>
              {row.band && (
                <span aria-hidden="true" className="absolute inset-y-0" style={bandStyle(row.band)}>
                  <span className="absolute inset-x-0 bottom-0 h-px" style={{ background: bandLine(row.band) }} />
                </span>
              )}
              <RevealGroup stagger={0.06} className="relative grid grid-cols-4">
                {row.items.map((tech) => (
                  <RevealItem key={tech.name} distance={16} blur={false}>
                    <div className="group flex h-[73px] items-center gap-[17px] pl-[31px]">
                      <img
                        src={tech.icon}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className={cn(
                          "size-10 object-contain transition-transform duration-500 ease-out-expo group-hover:-translate-y-1 group-hover:scale-110",
                          tech.invertOnDark && "dark:invert",
                        )}
                      />
                      <span className="font-body text-sm text-ink transition-colors duration-300 group-hover:text-brand">
                        {tech.name}
                      </span>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          ))}
        </div>      </div>
    </section>
  );
};

export default Technologies;
