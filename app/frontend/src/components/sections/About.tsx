import SectionBackground from "@/components/brand/SectionBackground";
import { BRAND_STROKE } from "@/components/brand/GradientDefs";
import SectionIntro from "@/components/common/SectionIntro";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { DESKTOP_BACKGROUNDS } from "@/data/backgrounds";
import { ABOUT_PILLARS, PROJECT_PATH, SECTION_IDS } from "@/data/site";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

/**
 * Contour des cartes, haut et bas uniquement (Figma : #F8F8F8 0 % → #00D4FF 10 % → #EBEBEB 0 %).
 * Le trait démarre à PILLAR_BORDER_START du bord gauche ; le pic reste au même endroit
 * (142 px = 23 % de 618) et le côté droit est inchangé.
 */
const PILLAR_BORDER_START = 70;
const PILLAR_BORDER = `linear-gradient(90deg, rgb(248 248 248 / 0) 0px, rgb(0 212 255 / 0.1) ${142 - PILLAR_BORDER_START}px, rgb(235 235 235 / 0) 100%)`;
/** Tablette (cartes centrées) : même contour, symétrique, qui s'estompe des deux côtés. */
const PILLAR_BORDER_CENTERED =
  "linear-gradient(90deg, rgb(248 248 248 / 0) 0%, rgb(0 212 255 / 0.12) 50%, rgb(235 235 235 / 0) 100%)";
/** Mobile (zigzag) : trait bas qui part du côté du texte et s'estompe vers l'autre bord. */
const pillarBorderMobile = (align: "left" | "right") =>
  `linear-gradient(${align === "left" ? "90deg" : "270deg"}, rgb(0 212 255 / 0.04) 0%, rgb(0 212 255 / 0.12) 25%, rgb(235 235 235 / 0) 100%)`;

const About = () => {
  const { t } = useLanguage();

  return (
    <section id={SECTION_IDS.about} className="relative overflow-x-clip py-24 lg:pb-36 lg:pt-[150px]">
      {/* Nappes de grille + forme floue (maquette Figma) */}
      <SectionBackground desktop={DESKTOP_BACKGROUNDS.about} />

      <div className="container relative">
        <SectionIntro
          eyebrow={t.about.eyebrow}
          title={t.about.title}
          description={t.about.description}
          cta={{ label: t.about.cta, to: PROJECT_PATH }}
          layout="title-start"
          tone="body"
        />

        {/* Desktop : haut du paragraphe aligné sur le titre « Notre mission » */}
        <div className="mt-20 grid items-center gap-16 lg:mt-[140px] lg:grid-cols-2 lg:items-start lg:gap-[70px]">
          {/* Piliers en quinconce : cartes vitrées, sans ombre, contour haut et bas */}
          {/* Pas de flou sur l'apparition : un filter sur le parent annulerait le backdrop-blur des cartes */}
          <RevealGroup stagger={0.14} className="about-pillars-offset relative">
            {ABOUT_PILLARS.map(({ id, offset, align, icon: Icon, tilt, raise }) => {
              const pillar = t.about.pillars[id];
              return (
                <RevealItem key={id} direction="right" distance={36} blur={false} className={cn("relative", offset)}>
                  {/*
                    Mobile : zigzag pleine largeur (gauche / droite / gauche), trait bas uniquement.
                    Tablette : carte centrée, texte centré. Desktop : quinconce de la maquette + icône de fond.
                  */}
                  <article
                    className={cn(
                      "group relative -mx-[1.875rem] overflow-hidden bg-surface/10 px-[1.875rem] py-7 backdrop-blur-[18px] transition-transform duration-700 ease-out-expo",
                      align === "right" ? "text-right" : "text-left",
                      "sm:mx-auto sm:w-full sm:max-w-[560px] sm:px-8 sm:py-[18px] sm:text-center",
                      "lg:mx-0 lg:min-h-[115px] lg:max-w-[618px] lg:pl-[94px] lg:text-left lg:hover:translate-x-1",
                    )}
                  >
                    {/* Contours : mobile (bas, selon le côté), tablette (haut + bas symétriques), desktop (maquette) */}
                    <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px sm:hidden" style={{ background: pillarBorderMobile(align) }} />
                    <span aria-hidden="true" className="absolute inset-x-0 top-0 hidden h-px sm:block lg:hidden" style={{ background: PILLAR_BORDER_CENTERED }} />
                    <span aria-hidden="true" className="absolute inset-x-0 bottom-0 hidden h-px sm:block lg:hidden" style={{ background: PILLAR_BORDER_CENTERED }} />
                    <span aria-hidden="true" className="absolute right-0 top-0 hidden h-px lg:block" style={{ left: PILLAR_BORDER_START, background: PILLAR_BORDER }} />
                    <span aria-hidden="true" className="absolute bottom-0 right-0 hidden h-px lg:block" style={{ left: PILLAR_BORDER_START, background: PILLAR_BORDER }} />

                    {/* Grande icône de fond inclinée, coupée par le bas (comme les cartes Services), sur tous les écrans */}
                    <span
                      aria-hidden="true"
                      className={cn("pointer-events-none absolute right-6 sm:right-8 lg:right-10", align === "right" && "left-6 right-auto sm:left-auto sm:right-8")}
                      style={{ bottom: -124 + raise, transform: `rotate(${tilt}deg)` }}
                    >
                      <Icon
                        size={180}
                        strokeWidth={14}
                        stroke={BRAND_STROKE}
                        className="text-brand-sky opacity-[0.045] transition-all duration-700 ease-out-expo group-hover:-translate-y-2 group-hover:opacity-[0.12] dark:opacity-[0.1]"
                      />
                    </span>

                    <h3 className="relative type-subtitle text-brand">{pillar.title}</h3>
                    <p className={cn("relative type-text mt-2 max-w-[440px] text-body sm:mx-auto lg:mx-0", align === "right" && "ml-auto")}>
                      {pillar.description}
                    </p>
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>

          {/* Présentation */}
          {/* Mobile : aligné à gauche (maquette iPhone) ; tablette et desktop : centré */}
          <Reveal delay={0.2} className="max-w-[460px] sm:mx-auto sm:text-center lg:mx-0 lg:mt-[18px] lg:max-w-[608px] lg:text-left">
            <p className="type-text text-body">
              <span className="text-brand">{t.about.brand}</span>
              {t.about.p1}
            </p>
            <p className="type-text mt-[25px] text-body">{t.about.p2}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
