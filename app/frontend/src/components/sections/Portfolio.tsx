import SectionBackground from "@/components/brand/SectionBackground";
import SectionIntro from "@/components/common/SectionIntro";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { DESKTOP_BACKGROUNDS } from "@/data/backgrounds";
import { PROJECT_PATH, PROJECTS, SECTION_IDS } from "@/data/site";
import { useLanguage } from "@/hooks/useLanguage";

/** Image : dévoilée de haut en bas, avec un léger dézoom. */
const imageReveal = {
  hidden: { clipPath: "inset(0 0 100% 0 round 16px)", scale: 1.06 },
  visible: { clipPath: "inset(0 0 0% 0 round 16px)", scale: 1, transition: { duration: 1.1, ease: EASE_OUT_EXPO } },
};

const Portfolio = () => {
  const { t } = useLanguage();

  return (
    <section id={SECTION_IDS.portfolio} className="relative overflow-x-clip py-24 lg:pb-32 lg:pt-[150px]">
      {/* Nappes de grille + branche floue (maquette Figma) */}
      <SectionBackground desktop={DESKTOP_BACKGROUNDS.portfolio} />

      <div className="container relative">
        <SectionIntro
          eyebrow={t.portfolio.eyebrow}
          title={t.portfolio.title}
          description={t.portfolio.description}
          cta={{ label: t.portfolio.cta, to: PROJECT_PATH }}
          descriptionWidth={451}
          layout="title-end"
          tone="ink"
        />

        <div className="mx-auto mt-16 grid max-w-[1022px] gap-x-[66px] gap-y-16 md:grid-cols-2 lg:mt-[150px] lg:gap-y-[100px]">
          {PROJECTS.map((project, index) => {
            const content = t.portfolio.projects[project.id];
            return (
              // Chaque carte apparaît en entrant à l'écran, ses éléments en cascade :
              // image → titre et catégorie → description → étiquettes une à une
              <RevealGroup key={project.id} as="article" stagger={0.1} delay={(index % 2) * 0.12} className="group">
                <motion.div variants={imageReveal} className="relative aspect-[478/250] overflow-hidden rounded-2xl bg-chip shadow-card ring-1 ring-line/60">
                    <img
                      src={project.image}
                      alt={content.imageAlt}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.04]"
                    />
                    {/* Reflet doux au survol */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-tr from-brand/0 via-white/0 to-white/20 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    />
                </motion.div>

                <div className="mt-6 flex items-center justify-between gap-4">
                  <RevealItem as="h3" distance={14} className="type-subtitle text-brand">
                    {content.title}
                  </RevealItem>
                  <RevealItem as="span" direction="left" distance={14} blur={false} className="type-details shrink-0 rounded-full border border-line/70 bg-surface px-3 text-ink">
                    {content.category}
                  </RevealItem>
                </div>

                <RevealItem as="p" distance={16} className="type-text mt-7 text-body">
                  {content.description}
                </RevealItem>

                <motion.ul variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }} className="mt-6 flex flex-wrap gap-4">
                  {project.tags.map((tag) => (
                    <RevealItem key={tag} as="li" distance={10} blur={false} className="type-details rounded-[4px] bg-chip px-2.5 text-ink">
                      {tag}
                    </RevealItem>
                  ))}
                </motion.ul>
              </RevealGroup>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
