import { motion } from "framer-motion";
import Button from "@/components/common/Button";
import CheckPill from "@/components/common/CheckPill";
import CountUp from "@/components/common/CountUp";
import { toSegments } from "@/components/common/SectionIntro";
import { ArrowDownRightIcon, PlayIcon } from "@/components/icons";
import { EASE_OUT_EXPO, Reveal, RevealGroup, RevealItem, SplitText } from "@/components/motion/Reveal";
import SectionBackground from "@/components/brand/SectionBackground";
import HeroBackground from "@/components/sections/hero/HeroBackground";
import { DESKTOP_BACKGROUNDS, MOBILE_BACKGROUNDS } from "@/data/backgrounds";
import { HERO_HIGHLIGHTS, SECTION_IDS, STATS } from "@/data/site";
import { scrollToSection } from "@/hooks/useActiveSection";
import { useLanguage } from "@/hooks/useLanguage";

/**
 * Hero aux dimensions de la maquette Figma (1440) :
 * zone haute de 560 px (titre à y = 245), puis bande de chiffres de 252 px.
 */
const Hero = () => {
  const { t } = useLanguage();

  return (
    <section id={SECTION_IDS.home} className="relative">
      {/* Mobile : zone haute = écran moins la bande de chiffres, contenu centré verticalement.
          Desktop : 560 px comme la maquette. */}
      <div className="relative flex min-h-[calc(100svh-136px)] items-center sm:min-h-[calc(100svh-200px)] lg:block lg:h-[560px] lg:min-h-0">
        {/* Le fond s'arrête au-dessus des chiffres, comme dans la maquette */}
        <HeroBackground />
        {/* Nappe de grille aux bords fondus (desktop) et décor mobile (maquettes Figma) */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <SectionBackground desktop={DESKTOP_BACKGROUNDS.hero} mobile={MOBILE_BACKGROUNDS.hero} />
        </div>

        <div className="container relative pb-10 pt-24 lg:pb-0 lg:pt-[245px]">
          <div className="relative w-full">
            {/* Texte au-dessus des bandes vitrées (ordre des calques Figma) */}
            <div className="relative z-10 mx-auto max-w-[640px] text-center lg:mx-0 lg:text-left">
              <SplitText
                as="h1"
                segments={toSegments(t.hero.title)}
                delay={0.35}
                stagger={0.08}
                className="type-hero text-balance text-ink lg:[text-wrap:wrap]"
              />
              <Reveal delay={0.7}>
                <p className="type-text mx-auto mt-[14px] max-w-[565px] text-pretty text-body sm:text-balance lg:mx-0 lg:[text-wrap:wrap]">{t.hero.description}</p>
              </Reveal>

              <Reveal delay={0.9} className="mt-10 flex flex-wrap items-center justify-center gap-x-12 gap-y-5 lg:mt-[57px] lg:justify-start">
                <Button
                  href={`#${SECTION_IDS.services}`}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(SECTION_IDS.services);
                  }}
                  variant="gradient"
                  size="md"
                >
                  {t.hero.primaryCta}
                  <ArrowDownRightIcon
                    size={18}
                    strokeWidth={22}
                    className="transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-0.5 group-hover/btn:translate-y-0.5"
                  />
                </Button>
                <Button
                  href={`#${SECTION_IDS.portfolio}`}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(SECTION_IDS.portfolio);
                  }}
                  variant="ghost"
                  size="text"
                  className="gap-3.5"
                >
                  {t.hero.secondaryCta}
                  <PlayIcon
                    size={18}
                    strokeWidth={16}
                    className="transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-1"
                  />
                </Button>
              </Reveal>
            </div>

            {/* Pastilles fixes — desktop. Dans la maquette, la 1re rangée est 76 px au-dessus du titre. */}
            <RevealGroup
              delay={0.8}
              stagger={0.12}
              className="absolute -top-[76px] right-0 hidden h-[276px] w-[680px] xl:block"
              aria-hidden="true"
            >
              {HERO_HIGHLIGHTS.map((item) => (
                // Pas de flou à l'apparition : un filter sur le parent annulerait le backdrop-blur des bandes
                <RevealItem
                  key={item.id}
                  direction={item.side === "left" ? "left" : "right"}
                  distance={40}
                  blur={false}
                  className="absolute"
                  style={{ left: item.left, top: item.top, width: item.width }}
                >
                  <CheckPill
                    label={t.hero.highlights[item.id]}
                    side={item.side}
                    band={{ fill: item.fill, border: item.border, dim: item.dim, blur: item.blur }}
                  />
                </RevealItem>
              ))}
            </RevealGroup>

            {/* Pastilles — mobile / tablette */}
            {/* Mobile et tablette : centré ; tablette : 3 pastilles max par ligne (3 + 2) */}
          <RevealGroup delay={1} stagger={0.06} className="mt-12 flex flex-wrap justify-center gap-3 sm:mx-auto sm:max-w-[560px] lg:mx-0 lg:max-w-none lg:justify-start xl:hidden">
              {HERO_HIGHLIGHTS.map((item) => (
                <RevealItem key={item.id} blur={false}>
                  <CheckPill label={t.hero.highlights[item.id]} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>

      {/* Chiffres clés (Figma : 3 × 480 × 252, contours #EAEAEA, chiffre Bold 64 à +69 px, libellé à +165 px) */}
      <div className="relative border-y border-[#EAEAEA] bg-surface dark:border-line">
        {/* Toujours sur une seule ligne, quel que soit le format */}
        <div className="grid grid-cols-3">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1 + index * 0.12, ease: EASE_OUT_EXPO }}
              className="flex h-[136px] flex-col items-center border-[#EAEAEA] px-2 pt-[30px] text-center dark:border-line sm:h-[200px] sm:pt-[52px] lg:h-[252px] lg:pt-[69px] [&:not(:first-child)]:border-l"
            >
              <span className="text-gradient font-display text-[clamp(30px,9vw,64px)] font-bold leading-[1.27]">
                <CountUp value={stat.value} />
                {stat.suffix}
              </span>
              <span className="type-text mt-2 text-[12px] leading-[16px] text-body sm:text-sm lg:mt-[15px] lg:leading-[17px]">{t.hero.stats[stat.id]}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
