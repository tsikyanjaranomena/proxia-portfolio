import { AnimatePresence, LayoutGroup, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import SectionBackground from "@/components/brand/SectionBackground";
import SectionIntro from "@/components/common/SectionIntro";
import MethodPath from "@/components/sections/method/MethodPath";
import { DESKTOP_BACKGROUNDS } from "@/data/backgrounds";
import { EASE_OUT_EXPO, Reveal } from "@/components/motion/Reveal";
import { METHOD_STEPS, PROJECT_PATH, SECTION_IDS } from "@/data/site";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

const LAYOUT_TRANSITION = { layout: { duration: 0.9, ease: EASE_OUT_EXPO } } as const;
const DIGIT_SIZE = "text-[min(30vw,60vh,470px)]";
/** Trait vertical entre le chiffre actif et le texte (pâle en haut et en bas). */
const STEP_DIVIDER = "linear-gradient(180deg, rgb(0 198 255 / 0), rgb(0 198 255 / 0.55) 45%, rgb(0 102 255 / 0.25) 80%, rgb(0 102 255 / 0))";

interface StepDigitProps {
  value: number;
  label: string;
  active: boolean;
  onSelect: () => void;
}

/**
 * Chiffre géant cliquable : couche pâle + couche dégradée qui s'allume quand l'étape est active.
 * Un clic fait défiler jusqu'à l'étape (même résultat que le scroll).
 */
const StepDigit = ({ value, label, active, onSelect }: StepDigitProps) => (
  <motion.button
    type="button"
    layout="position"
    transition={LAYOUT_TRANSITION}
    onClick={onSelect}
    aria-label={`${value}. ${label}`}
    aria-current={active ? "step" : undefined}
    // La taille doit précéder `leading-*` : tailwind-merge retire un leading placé avant une taille.
    // Pas de letter-spacing négatif : il rognerait le dégradé (background-clip: text) ; marge négative à la place.
    className={cn(
      DIGIT_SIZE,
      "group relative block cursor-pointer select-none -mr-[0.05em] text-left font-display font-medium leading-[0.84] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30 focus-visible:ring-offset-4",
    )}
  >
    <span
      className={cn(
        "text-gradient block opacity-[0.045] transition-opacity duration-500 dark:opacity-[0.08]",
        !active && "group-hover:opacity-[0.14] dark:group-hover:opacity-[0.18]",
      )}
    >
      {value}
    </span>
    <motion.span
      aria-hidden="true"
      className="text-gradient absolute inset-0 block"
      initial={false}
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
    >
      {value}
    </motion.span>
  </motion.button>
);

const Method = () => {
  const { t } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Progression du scroll dans la piste épinglée → étape active (fonctionne dans les deux sens)
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const next = Math.min(METHOD_STEPS.length - 1, Math.max(0, Math.floor(progress * METHOD_STEPS.length)));
    setActive((current) => (current === next ? current : next));
  });

  const step = t.method.steps[METHOD_STEPS[active]];

  /** Défile jusqu'au milieu de la tranche de scroll de l'étape `index`. */
  const goToStep = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const top = window.scrollY + track.getBoundingClientRect().top;
    const range = track.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (range * (index + 0.5)) / METHOD_STEPS.length, behavior: "smooth" });
  };

  return (
    <section id={SECTION_IDS.method} className="relative overflow-x-clip pt-16 lg:pt-28">
      <SectionBackground desktop={DESKTOP_BACKGROUNDS.method} />
      <div className="container relative">
        <SectionIntro
          eyebrow={t.method.eyebrow}
          title={t.method.title}
          description={t.method.description}
          cta={{ label: t.method.cta, to: PROJECT_PATH }}
          descriptionWidth={323}
          layout="title-end"
          tone="ink"
        />
      </div>

      {/* Desktop : piste épinglée, une étape par hauteur d'écran */}
      <div ref={trackRef} className="relative hidden lg:block" style={{ height: `${METHOD_STEPS.length * 100}vh` }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <Reveal className="container relative" distance={60}>
            <LayoutGroup>
              <div className="flex items-start">
                {METHOD_STEPS.flatMap((id, index) => {
                  const digit = (
                    <StepDigit
                      key={id}
                      value={index + 1}
                      label={t.method.steps[id].title}
                      active={index === active}
                      onSelect={() => goToStep(index)}
                    />
                  );
                  if (index !== active) return [digit];
                  return [
                    digit,
                    // Même clé à chaque étape : React déplace le bloc au lieu de le recréer,
                    // framer-motion anime son glissement.
                    <motion.div
                      key="step-detail"
                      layout="position"
                      transition={LAYOUT_TRANSITION}
                      className="flex shrink-0 items-stretch self-stretch"
                    >
                      <span
                        aria-hidden="true"
                        className="ml-[3vw] w-px self-stretch"
                        style={{ background: STEP_DIVIDER }}
                      />
                      <div className="ml-10 mr-[4vw] w-[280px] pt-[min(4.6vw,64px)]" aria-live="polite">
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.div
                            key={METHOD_STEPS[active]}
                            // Apparition / disparition de gauche à droite (reste aligné sur le titre)
                            initial={{ opacity: 0, x: -24, filter: "blur(6px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, x: 24, filter: "blur(6px)" }}
                            transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
                          >
                            <h3 className="type-subtitle text-brand">{step.title}</h3>
                            <p className="type-text mt-3 text-body">{step.description}</p>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </motion.div>,
                  ];
                })}
              </div>
            </LayoutGroup>
          </Reveal>
        </div>
      </div>

      {/* Mobile / tablette : étapes en zigzag, ligne qui se dessine au scroll (maquette mobile_landing) */}
      <div className="container mt-16 max-w-[560px] pb-24 lg:hidden">
        <MethodPath steps={METHOD_STEPS.map((id) => ({ id, ...t.method.steps[id] }))} />
      </div>
    </section>
  );
};

export default Method;
