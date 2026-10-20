import SectionBackground from "@/components/brand/SectionBackground";
import SectionIntro from "@/components/common/SectionIntro";
import { StarFilledIcon } from "@/components/icons";
import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";
import { EASE_OUT_EXPO, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { DESKTOP_BACKGROUNDS } from "@/data/backgrounds";
import { PROJECT_PATH, SECTION_IDS, TESTIMONIALS } from "@/data/site";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

/** Vitesse du carrousel : durée d'un cycle complet. */
const MARQUEE_DURATION = "70s";

/** Carte : ses éléments apparaissent en cascade, décalée d'une carte à l'autre. */
const cardVariants = (index: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 + index * 0.12 } },
});
/** Étoiles : une à une, avec un léger rebond. */
const starsVariants: Variants = { hidden: {}, visible: { transition: { staggerChildren: 0.07 } } };
const starVariants: Variants = {
  hidden: { opacity: 0, scale: 0.3, rotate: -40 },
  visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 420, damping: 16 } },
};
/** Séparateur : tracé de gauche à droite. */
const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.9, ease: EASE_OUT_EXPO } },
};
/** Avatar : grossit depuis le centre. */
const avatarVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 18 } },
};

const Testimonials = () => {
  const { t } = useLanguage();
  // Liste doublée : l'animation translate de -50 % boucle sans couture
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];
  // Carrousel en pause hors de l'écran (la pause au survol reste gérée en CSS)
  const marqueeRef = useRef<HTMLUListElement>(null);
  const marqueeVisible = useInView(marqueeRef);

  return (
    <section id={SECTION_IDS.testimonials} className="relative overflow-x-clip py-24 lg:pb-[150px] lg:pt-[150px]">
      <SectionBackground desktop={DESKTOP_BACKGROUNDS.testimonials} />
      <div className="container relative">
        <SectionIntro
          eyebrow={t.testimonials.eyebrow}
          title={t.testimonials.title}
          description={t.testimonials.description}
          cta={{ label: t.testimonials.cta, to: PROJECT_PATH }}
          layout="title-start"
          tone="body"
          descriptionWidth={317}
        />
      </div>

      {/* Déclenché une fois à l'entrée à l'écran ; chaque carte anime ensuite ses propres éléments */}
      <RevealGroup className="mask-fade-x pause-on-hover relative mt-16 lg:mt-[150px]">
        {/* Cartes Figma « Frame 156 » : 533 × 287 fixes, espacées de 15 px */}
        <ul
          ref={marqueeRef}
          className={cn("animate-marquee flex w-max gap-[15px] py-6", !marqueeVisible && "[animation-play-state:paused]")}
          style={{ "--marquee-duration": MARQUEE_DURATION } as React.CSSProperties}
        >
          {loop.map((item, index) => {
            const content = t.testimonials.items[item.id];
            const duplicate = index >= TESTIMONIALS.length;
            return (
              <li key={`${item.id}-${index}`} aria-hidden={duplicate || undefined} className="w-[min(533px,86vw)] shrink-0">
                <motion.figure
                  variants={cardVariants(index % TESTIMONIALS.length)}
                  className={cn(
                    // Contour 1 px #BCBCBC à 30 %, coins 15 px, sans ombre (comme la maquette)
                    "flex h-[287px] flex-col overflow-hidden rounded-[15px] border border-[#BCBCBC]/30 bg-surface pl-[37px] pr-[37px] pt-[36px]",
                    "transition-colors duration-500 hover:border-brand/25 dark:border-line",
                  )}
                >
                  {/* Étoiles orange 13 px, pas de 21 px */}
                  <motion.div variants={starsVariants} className="flex h-[13px] items-center gap-[5px] text-[#FF7F00]" aria-label={`${item.rating}/5`}>
                    {Array.from({ length: item.rating }, (_, star) => (
                      <motion.span key={star} variants={starVariants} className="flex shrink-0">
                        <StarFilledIcon size={16} strokeWidth={8} />
                      </motion.span>
                    ))}
                  </motion.div>
                  {/* Citation : 20 px sous les étoiles, 4 lignes max (hauteur fixe 108 px) */}
                  {/* Espaces insécables : les guillemets ne partent jamais seuls à la ligne */}
                  <RevealItem as="blockquote" distance={14} className="type-text mt-5 line-clamp-4 h-[108px] text-ink">{`“\u00A0${content.quote}\u00A0”`}</RevealItem>
                  {/* Séparateur très pâle entre la citation et l'auteur */}
                  <motion.span aria-hidden="true" variants={lineVariants} className="block h-px origin-left bg-[#F0F0F0] dark:bg-line" />
                  <figcaption className="mt-[23px] flex items-start gap-5">
                    <motion.span
                      variants={avatarVariants}
                      className="flex size-[52px] shrink-0 items-center justify-center rounded-full font-body text-[15px] font-black text-white"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.initials}
                    </motion.span>
                    <RevealItem as="span" direction="left" distance={12} blur={false} className="flex flex-col pt-[5px]">
                      <span className="font-body text-sm font-medium leading-[25px] text-ink">{item.name}</span>
                      <span className="-mt-[7px] font-body text-sm leading-[25px] text-[#BFBFBF] dark:text-muted-text">{content.role}</span>
                    </RevealItem>
                  </figcaption>
                </motion.figure>
              </li>
            );
          })}
        </ul>
      </RevealGroup>
    </section>
  );
};

export default Testimonials;
