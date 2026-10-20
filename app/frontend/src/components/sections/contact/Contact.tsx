import DecorShape from "@/components/brand/DecorShape";
import SectionBackground from "@/components/brand/SectionBackground";
import FadeLine from "@/components/common/FadeLine";
import { MapPinIcon, PhoneIcon } from "@/components/icons";
import { Reveal, SplitText } from "@/components/motion/Reveal";
import ContactForm from "@/components/sections/contact/ContactForm";
import { DESKTOP_BACKGROUNDS } from "@/data/backgrounds";
import { DECOR } from "@/data/decor";
import { SECTION_IDS } from "@/data/site";
import { useLanguage } from "@/hooks/useLanguage";
import { CONTACT_LOCATION, CONTACT_PHONE, CONTACT_PHONE_HREF } from "@/lib/contact";

const Contact = () => {
  const { t } = useLanguage();

  return (
    <section id={SECTION_IDS.contact} className="relative overflow-x-clip pb-24 lg:pb-[100px]">
      <SectionBackground desktop={DESKTOP_BACKGROUNDS.contact} />
      <div className="container relative">
        <Reveal distance={50} className="relative lg:-mx-5">
          {/* Halo cyan sous la carte */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 left-[52%] h-[260px] w-[360px] rounded-full bg-brand-sky/25 blur-[80px]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 top-1/3 h-[300px] w-[160px] rounded-full bg-brand-cyan/20 blur-[70px]"
          />

          <div className="relative overflow-hidden rounded-xl bg-brand-gradient-diagonal shadow-[0_40px_80px_-40px_rgb(0_102_255/0.55)]">
            {/* Grande branche du symbole derrière le formulaire (repris de la maquette Figma) */}
            <DecorShape {...DECOR.contactBranch} style={{ left: 373, top: -352 }} />
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-transparent" />

            <div className="relative grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1fr)_477px]">
              <div className="flex flex-col px-7 py-12 text-white sm:px-[63px] sm:py-[70px]">
                <div className="flex items-center gap-10">
                  <span className="type-subtitle font-medium">{t.contact.eyebrow}</span>
                  {/* Trait affiché sur tous les écrans */}
                  <FadeLine anchor="start" tone="white" className="w-full max-w-[380px]" />
                </div>
                <SplitText
                  segments={t.contact.title}
                  className="type-hero mt-7 text-balance text-white [&_br]:hidden sm:[&_br]:inline lg:[text-wrap:wrap]"
                />
                <Reveal delay={0.2}>
                  <p className="type-text mt-12 max-w-[323px] text-pretty text-white/90">{t.contact.description}</p>
                </Reveal>

                <span aria-hidden="true" className="mt-16 block h-px max-w-[580px] bg-gradient-to-r from-white/5 via-white/30 to-white/0 lg:mt-auto" />

                <ul className="mt-14 space-y-3.5">
                  <li>
                    <a href={`tel:${CONTACT_PHONE_HREF}`} className="group inline-flex items-center gap-4 font-body text-[15px] text-white">
                      <PhoneIcon size={22} strokeWidth={18} className="shrink-0 transition-transform duration-500 group-hover:-rotate-12" />
                      <span className="transition-opacity group-hover:opacity-80">{CONTACT_PHONE}</span>
                    </a>
                  </li>
                  <li className="inline-flex items-center gap-4 font-body text-[15px] text-white">
                    <MapPinIcon size={22} strokeWidth={18} className="shrink-0" />
                    {CONTACT_LOCATION}
                  </li>
                </ul>
              </div>

              <div className="px-3 pb-3 lg:py-[14px] lg:pl-0 lg:pr-[15px]">
                <ContactForm />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
