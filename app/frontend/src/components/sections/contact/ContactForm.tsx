import { AnimatePresence, motion } from "framer-motion";
import { useState, type ChangeEvent, type FormEvent } from "react";
import Button from "@/components/common/Button";
import { CheckCircleIcon, PaperPlaneIcon, WarningCircleIcon } from "@/components/icons";
import { EASE_OUT_EXPO } from "@/components/motion/Reveal";
import { useLanguage } from "@/hooks/useLanguage";
import { CONTACT_FORM_ENDPOINT } from "@/lib/contact";
import { cn } from "@/lib/utils";
import type { ContactForm } from "@/types/ContactForm";

const EMPTY_FORM: ContactForm = { name: "", email: "", subject: "", message: "" };

const fieldClass =
  "type-text peer w-full border-0 border-b border-line bg-transparent px-0 pb-3 pt-2 text-ink placeholder:text-muted-text/80 focus:outline-none focus:ring-0";

/** Champ souligné, avec un trait dégradé qui se dessine au focus. */
const UnderlineField = ({ children }: { children: React.ReactNode }) => (
  <div className="relative">
    {children}
    <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-brand-gradient transition-transform duration-500 ease-out-expo peer-focus:scale-x-100" />
  </div>
);

const ContactForm = () => {
  const { t } = useLanguage();
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (status === "error") setStatus("idle");
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus("sending");
    const subject = form.subject || t.contact.defaultSubject;

    // Envoi identique à l'ancienne landing page (branche main) : FormSubmit, sans backend
    try {
      const payload = new FormData();
      payload.append("name", form.name);
      payload.append("email", form.email);
      payload.append("subject", subject);
      payload.append("message", form.message);
      payload.append("_subject", `ProxiaTech - ${subject}`);
      payload.append("_replyto", form.email);
      payload.append("_template", "table");
      payload.append("_honey", "");

      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: payload,
      });

      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success === false) {
        throw new Error("CONTACT_SUBMIT_FAILED");
      }

      setForm(EMPTY_FORM);
      setStatus("success");
      window.setTimeout(() => setStatus("idle"), 4000);
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setStatus("error");
    }
  };

  return (
    <div className="relative h-full rounded-lg bg-surface px-6 pb-8 pt-9 shadow-[0_30px_60px_-30px_rgb(0_40_120/0.45)] sm:px-10 sm:pb-8 sm:pt-10">
      <h3 className="type-hero whitespace-pre-line text-center text-brand-sky">{t.contact.formTitle}</h3>
      <span
        aria-hidden="true"
        className="mx-auto mt-8 block h-px w-[276px]"
        // Figma : #00EEFD 0 % → #01C0FE 50 % → #0065FC 50 % → #0065FC 0 %
        style={{ background: "linear-gradient(90deg, rgb(0 238 253 / 0) 13%, rgb(1 192 254 / 0.5) 33%, rgb(0 101 252 / 0.5) 62%, rgb(0 101 252 / 0) 90%)" }}
      />

      {/*
        Le formulaire reste toujours dans la page (invisible et inactif pendant le message de succès) :
        la carte blanche garde exactement la même hauteur, le message s'affiche par-dessus,
        centré sur toute la carte (pas de "relative" ici : il se positionne sur la carte elle-même).
      */}
      <div className="mt-6">
        <motion.form
          onSubmit={onSubmit}
          initial={false}
          animate={status === "success" ? { opacity: 0, y: -16 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          aria-hidden={status === "success" || undefined}
          className={cn(status === "success" && "pointer-events-none")}
        >
          {/* fieldset désactivé : aucun champ atteignable au clavier pendant le message de succès */}
          <fieldset disabled={status === "success"} className="flex min-w-0 flex-col gap-4 border-0 p-0">
            {(["name", "email", "subject"] as const).map((field) => (
              <UnderlineField key={field}>
                <input
                  id={`contact-${field}`}
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  autoComplete={field === "subject" ? "off" : field}
                  required={field !== "subject"}
                  value={form[field]}
                  onChange={onChange}
                  placeholder={t.contact.fields[field]}
                  aria-label={t.contact.fields[field]}
                  className={fieldClass}
                />
              </UnderlineField>
            ))}
            <UnderlineField>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={onChange}
                placeholder={t.contact.fields.message}
                aria-label={t.contact.fields.message}
                className={cn(fieldClass, "resize-none pb-6")}
              />
            </UnderlineField>

            {status === "error" && (
              <div role="alert" className="flex items-start gap-3 rounded-md bg-red-50 px-4 py-3 text-red-700 dark:bg-red-500/10 dark:text-red-300">
                <WarningCircleIcon size={18} className="mt-1 shrink-0" />
                <p className="type-text">
                  <strong className="font-semibold">{t.contact.error.title}.</strong> {t.contact.error.description}
                </p>
              </div>
            )}

            <div className="mt-4">
              <Button type="submit" variant="primary" size="block" disabled={status === "sending"}>
                {status === "sending" ? t.contact.sending : t.contact.send}
                <PaperPlaneIcon
                  size={16}
                  strokeWidth={18}
                  className="transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-1"
                />
              </Button>
              <p className="type-details mt-2 text-center text-muted-text">{t.contact.closing}</p>
            </div>
          </fieldset>
        </motion.form>

        <AnimatePresence>
          {status === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center sm:px-10"
              role="status"
            >
              <CheckCircleIcon size={56} strokeWidth={12} className="text-brand-success" />
              <p className="type-subtitle mt-5 text-ink">{t.contact.success.title}</p>
              <p className="type-text mt-2 max-w-[300px] text-body">{t.contact.success.description}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ContactForm;
