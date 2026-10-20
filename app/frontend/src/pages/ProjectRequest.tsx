import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useEffect, useId, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import GradientDefs from "@/components/brand/GradientDefs";
import SectionBackground from "@/components/brand/SectionBackground";
import Button from "@/components/common/Button";
import { CheckCircleIcon, PaperPlaneIcon, WarningCircleIcon } from "@/components/icons";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { EASE_OUT_EXPO, Reveal, SplitText } from "@/components/motion/Reveal";
import { PROJECT_BACKGROUNDS } from "@/data/backgrounds";
import { SERVICES } from "@/data/site";
import { useLanguage } from "@/hooks/useLanguage";
import type { TitleSegment } from "@/lib/translations";
import { cn } from "@/lib/utils";
import { ProjectForm } from "@/types/ProjectForm";
import { useProjectContact } from "@/hooks/useProjectContact";

/** Noms des champs = clés de ProjectForm = attributs name du HTML. */
type Field = keyof ProjectForm;

/** Champs (maquette desktop_detailed_form) : 47 px, bordure #334155 à 24 %, coins 5 px. */
const inputClass =
  "type-text block h-[47px] w-full rounded-[5px] border border-brand-slate/25 bg-surface px-[21px] text-ink placeholder:text-body/50 transition-[border-color,box-shadow] duration-300 focus:border-brand/50 focus:outline-none focus:ring-4 focus:ring-brand/10 dark:border-line";
/** Listes déroulantes : bordure #DCDCDC + chevron. */
const selectClass = cn(inputClass, "appearance-none border-[#DCDCDC] pr-12 text-body dark:border-line");

/**
 * Apparition des champs à l'arrivée sur la page (une seule fois, pas au scroll) :
 * même effet que les textes (montée + fondu + flou), en cascade ligne par ligne.
 */
const FIELDS_DELAY = 0.45;
const FIELD_STEP = 0.07;
/** Rang d'apparition : ligne par ligne, colonne gauche puis droite. */
const FIELD_ORDER: Record<Field, number> = { services: 0, name: 1, avancement: 2, email: 3, deadline: 4, organisation: 5, description: 6, telephone: 7 };
const fieldDelay = (field: Field) => FIELDS_DELAY + FIELD_ORDER[field] * FIELD_STEP;
const appear = (delay: number) => ({
  initial: { opacity: 0, y: 18, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.8, delay, ease: EASE_OUT_EXPO },
});

const FieldBlock = ({ id, field, label, required, children }: { id: string; field: Field; label: string; required?: boolean; children: ReactNode }) => (
  <div>
    <motion.label htmlFor={id} className="type-text block text-body" {...appear(fieldDelay(field))}>
      {label}
      {/* Astérisque : style Figma « red » */}
      {required && <span aria-hidden="true" className="text-[#FF4D17]"> *</span>}
    </motion.label>
    {/* Le champ suit son libellé de peu */}
    <motion.div className="relative mt-[11px]" {...appear(fieldDelay(field) + 0.08)}>
      {children}
    </motion.div>
  </div>
);

const Chevron = () => (
  <svg aria-hidden="true" viewBox="0 0 9 5" className="pointer-events-none absolute right-[32px] top-1/2 h-[5px] w-[9px] -translate-y-1/2">
    <path d="M0.75 0.75 4.5 4.25 8.25 0.75" fill="none" stroke="#DCDCDC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * Page « Parlons de votre projet » (maquettes desktop_detailed_form / mobile_detailed_form) :
 * formulaire détaillé en deux colonnes (besoin du projet / coordonnées), une colonne sur mobile.
 */
const ProjectRequest = () => {
  const { t, language } = useLanguage();
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const serviceOptions = SERVICES.map((s) => t.services.items[s.id].title);
  const initial: ProjectForm = {
    name: "",
    email: "",
    organisation: "",
    telephone: "",
    services: serviceOptions[0],
    avancement: t.project.stages[0],
    deadline: t.project.timelines[1],
    description: "",
  };
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const { submitProjectForm } = useProjectContact();

  useEffect(() => {
    const previous = document.title;
    document.title = `${t.project.metaTitle} · ProxiaTech`;
    return () => {
      document.title = previous;
    };
  }, [t.project.metaTitle]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  // Les listes suivent la langue choisie
  useEffect(() => {
    setForm((current) => ({ ...current, services: serviceOptions[0], avancement: t.project.stages[0], deadline: t.project.timelines[1] }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (status === "error") setStatus("idle");
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("sending");
    try {
      
      await submitProjectForm(form);
      setForm(initial);
      setStatus("success");
    } catch (error) {
      console.error("Project request submission failed:", error);
      setStatus("error");
    }
  };

  const id = (field: Field) => `${uid}-${field}`;
  const f = t.project.fields;
  const p = t.project.placeholders;

  const select = (field: "services" | "avancement" | "deadline", options: readonly string[], label: string) => (
    <FieldBlock id={id(field)} field={field} label={label} required>
      <select id={id(field)} name={field} value={form[field]} onChange={onChange} required className={selectClass}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <Chevron />
    </FieldBlock>
  );

  const input = (field: "name" | "email" | "organisation" | "telephone", label: string, placeholder: string, type = "text", required = false, autoComplete?: string) => (
    <FieldBlock id={id(field)} field={field} label={label} required={required}>
      <input
        id={id(field)}
        name={field}
        type={type}
        value={form[field]}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        className={inputClass}
      />
    </FieldBlock>
  );

  return (
    <MotionConfig reducedMotion="user">
      <GradientDefs />
      <div className="relative min-h-screen overflow-clip bg-surface">
        <Header />
        <main className="relative">
          {/* Nappes de grille + formes floues (maquettes Figma) */}
          <SectionBackground desktop={PROJECT_BACKGROUNDS.desktop} mobile={PROJECT_BACKGROUNDS.mobile} />

          <div className="container relative max-w-[1244px] pb-[70px] pt-[108px] lg:pt-[173px]">
            <SplitText as="h1" segments={(t.project.title as readonly TitleSegment[]).map((s) => ({ text: s.text, className: s.highlight ? "text-gradient" : undefined }))} delay={0.2} className="type-hero text-balance text-ink" />
            <Reveal delay={0.35}>
              <p className="type-text mt-[38px] max-w-[917px] text-pretty text-body lg:mt-10">{t.project.description}</p>
            </Reveal>

            {/* Pas de initial={false} : il couperait l'apparition des champs à l'arrivée sur la page */}
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                  className="mt-14 flex flex-col items-center rounded-[10px] border border-line/70 bg-surface/80 px-6 py-16 text-center backdrop-blur-sm"
                  role="status"
                >
                  <CheckCircleIcon size={56} strokeWidth={12} className="text-brand-success" />
                  <p className="type-subtitle mt-5 text-ink">{t.project.success.title}</p>
                  <p className="type-text mt-2 max-w-[380px] text-body">{t.project.success.description}</p>
                  <Button asLink="/" variant="primary" size="sm" className="mt-8">
                    {t.project.success.back}
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  // Le formulaire reste visible : ce sont ses libellés et champs qui apparaissent en cascade
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                  className="mt-14 lg:mt-[57px]"
                >
                  <div className="grid gap-y-[37px] lg:grid-cols-2 lg:gap-x-[30px] lg:gap-y-0">
                    {/* Colonne 1 : le projet */}
                    <div className="flex flex-col gap-[37px] lg:gap-10">
                      {select("services", serviceOptions, f.services)}
                      {select("avancement", t.project.stages, f.stage)}
                      {select("deadline", t.project.timelines, f.timeline)}
                      <FieldBlock id={id("description")} field="description" label={f.details} required>
                        <textarea
                          id={id("description")}
                          name="description"
                          value={form.description}
                          onChange={onChange}
                          placeholder={p.details}
                          required
                          rows={6}
                          className={cn(inputClass, "h-[170px] resize-none border-[#E3E3E3] py-[11px] dark:border-line")}
                        />
                      </FieldBlock>
                    </div>
                    {/* Colonne 2 : les coordonnées */}
                    <div className="flex flex-col gap-[37px] lg:gap-10">
                      {input("name", f.name, p.name, "text", true, "name")}
                      {input("email", f.email, p.email, "email", true, "email")}
                      {input("organisation", f.organization, p.organization, "text", false, "organization")}
                      {input("telephone", f.phone, p.phone, "tel", false, "tel")}
                    </div>
                  </div>

                  {status === "error" && (
                    <div role="alert" className="mt-8 flex items-start gap-3 rounded-md bg-red-50 px-4 py-3 text-red-700 dark:bg-red-500/10 dark:text-red-300">
                      <WarningCircleIcon size={18} className="mt-1 shrink-0" />
                      <p className="type-text">
                        <strong className="font-semibold">{t.project.error.title}.</strong> {t.project.error.description}
                      </p>
                    </div>
                  )}

                  <motion.div className="mt-[45px]" {...appear(FIELDS_DELAY + 8 * FIELD_STEP + 0.1)}>
                    <Button type="submit" variant="primary" size="block" disabled={status === "sending"} className="text-sm">
                      {status === "sending" ? t.project.sending : t.project.send}
                      <PaperPlaneIcon
                        size={16}
                        strokeWidth={18}
                        className="transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-1"
                      />
                    </Button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
};

export default ProjectRequest;
