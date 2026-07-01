import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/hooks/useLanguage";
import {
  CONTACT_FORM_ENDPOINT,
  CONTACT_LOCATION,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
} from "@/lib/contact";

const Contact = () => {
  const { t, language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const defaultSubject = language === "fr" ? "Demande d'information" : "Information request";

    setSubmitting(true);
    setSubmitError(null);

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("email", formData.email);
      payload.append("subject", formData.subject || defaultSubject);
      payload.append("message", formData.message);
      payload.append("_subject", `ProxiaTech - ${formData.subject || defaultSubject}`);
      payload.append("_replyto", formData.email);
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

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setSubmitError(t.contact.error.description);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (submitError) {
      setSubmitError(null);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 bg-white dark:bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fade-up" className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-[#0066FF] dark:text-[#60a5fa] text-sm font-medium mb-4">
            {t.contact.badge}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A0E27] dark:text-white mb-4">
            {t.contact.title1}{" "}
            <span className="bg-gradient-to-r from-[#0066FF] to-[#00D4FF] bg-clip-text text-transparent">
              {t.contact.titleHighlight}
            </span>
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {t.contact.description}
          </p>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <AnimatedSection animation="slide-right" className="lg:col-span-2 space-y-4">
            <div className="bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#2A2A2A] rounded-2xl p-8 relative overflow-hidden h-full">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-[#0A0E27] dark:text-white mb-6">{t.contact.infoTitle}</h3>
                <p className="text-slate-600 dark:text-white/70 mb-8">
                  {t.contact.infoDescription}
                </p>

                <div className="space-y-6">
                  <motion.a
                    href={`tel:${CONTACT_PHONE_HREF}`}
                    whileHover={{ x: 6 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-11 h-11 rounded-lg bg-[#0066FF]/10 dark:bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0066FF] transition-colors">
                      <Phone className="w-5 h-5 text-[#0066FF] dark:text-white group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 dark:text-white/60 mb-1">{t.contact.labels.phone}</div>
                      <div className="font-medium text-[#0A0E27] dark:text-white">{CONTACT_PHONE}</div>
                    </div>
                  </motion.a>

                  <motion.div
                    whileHover={{ x: 6 }}
                    className="flex items-start gap-4"
                  >
                    <div className="w-11 h-11 rounded-lg bg-[#0066FF]/10 dark:bg-white/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-[#0066FF] dark:text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-slate-500 dark:text-white/60 mb-1">{t.contact.labels.location}</div>
                      <div className="font-medium text-[#0A0E27] dark:text-white">{CONTACT_LOCATION}</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slide-left" className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-slate-50 dark:bg-[#1A1A1A] border border-slate-200 dark:border-[#2A2A2A] rounded-2xl p-8"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold text-[#0A0E27] dark:text-white mb-2">
                    {t.contact.success.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {t.contact.success.description}
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-5">
                  {submitError && (
                    <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                      <div>
                        <div className="font-semibold">{t.contact.error.title}</div>
                        <div>{submitError}</div>
                      </div>
                    </div>
                  )}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-[#0A0E27] dark:text-slate-200 mb-2 block">
                        {t.contact.labels.name}
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t.contact.labels.namePlaceholder}
                        className="bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:placeholder:text-slate-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-[#0A0E27] dark:text-slate-200 mb-2 block">
                        {t.contact.labels.email}
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t.contact.labels.emailPlaceholder}
                        className="bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-[#0A0E27] dark:text-slate-200 mb-2 block">
                      {t.contact.labels.subject}
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder={t.contact.labels.subjectPlaceholder}
                      className="bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:placeholder:text-slate-500"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-[#0A0E27] dark:text-slate-200 mb-2 block">
                      {t.contact.labels.message}
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t.contact.labels.messagePlaceholder}
                      rows={6}
                      className="bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:placeholder:text-slate-500 resize-none"
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={submitting}
                      className="w-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-white hover:opacity-90 shadow-lg shadow-blue-500/30"
                    >
                      {submitting ? t.contact.labels.sending : t.contact.labels.send}
                      <Send className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.div>
                </div>
              )}
            </form>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};

export default Contact;
