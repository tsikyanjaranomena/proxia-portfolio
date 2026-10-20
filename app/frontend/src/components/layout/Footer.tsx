import Logo from "@/components/brand/Logo";
import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { Reveal } from "@/components/motion/Reveal";
import { NAV_ITEMS, SECTION_IDS, SOCIAL_LINKS } from "@/data/site";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "@/hooks/useActiveSection";
import { useLanguage } from "@/hooks/useLanguage";
import { CONTACT_EMAIL, CONTACT_LOCATION, CONTACT_PHONE, CONTACT_PHONE_HREF } from "@/lib/contact";
import type { Language } from "@/lib/translations";
import { cn } from "@/lib/utils";

const QUICK_LINKS = NAV_ITEMS.filter((item) => item.id !== SECTION_IDS.testimonials);
const LANGUAGES: Language[] = ["fr", "en"];

const linkClass = "font-body text-sm leading-[25px] text-white/90 transition-colors duration-300 hover:text-brand-cyan";

const Footer = () => {
  const { t, language, setLanguage } = useLanguage();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  /** Section de l'accueil : défilement sur l'accueil, sinon navigation vers l'ancre. */
  const goTo = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    if (pathname === "/") scrollToSection(id);
    else navigate(`/#${id}`);
  };
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-brand-slate text-white dark:bg-surface-raised">
      <div className="container pb-24 pt-[88px]">
        <Reveal className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr] lg:gap-8">
          <div>
            <Logo variant="white" className="h-[42px]" />
            <p className="mt-7 max-w-[270px] font-body text-sm leading-[25px] text-white/90">{t.footer.description}</p>
            <div className="mt-8 flex gap-2.5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  aria-label={social.label}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex size-12 items-center justify-center rounded-md bg-[#1E293B] shadow-[inset_0_1px_0_rgb(255_255_255/0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand"
                >
                  <img src={social.icon} alt="" decoding="async" className="size-[26px] object-contain" />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:pl-12">
            <h4 className="font-body text-sm font-semibold">{t.footer.quickLinks}</h4>
            <ul className="mt-6 space-y-0">
              {QUICK_LINKS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    onClick={goTo(item.id)}
                    className={linkClass}
                  >
                    {t.nav[item.label]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body text-sm font-semibold">{t.footer.servicesTitle}</h4>
            <ul className="mt-6">
              {t.footer.services.map((service) => (
                <li key={service}>
                  <a href={`/#${SECTION_IDS.services}`} onClick={goTo(SECTION_IDS.services)} className={linkClass}>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-body text-sm font-semibold">{t.footer.contactTitle}</h4>
            <ul className="mt-6 space-y-0.5">
              <li className="flex items-center gap-3.5">
                <EnvelopeIcon size={18} strokeWidth={20} className="shrink-0 text-white" />
                <a href={`mailto:${CONTACT_EMAIL}`} className={cn(linkClass, "break-all")}>
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-3.5">
                <PhoneIcon size={18} strokeWidth={20} className="shrink-0 text-white" />
                <a href={`tel:${CONTACT_PHONE_HREF}`} className={linkClass}>
                  {CONTACT_PHONE}
                </a>
              </li>
              <li className="flex items-center gap-3.5">
                <MapPinIcon size={18} strokeWidth={20} className="shrink-0 text-white" />
                <span className="font-body text-sm leading-[25px] text-white/90">{CONTACT_LOCATION}</span>
              </li>
            </ul>
          </div>
        </Reveal>

        <div className="mt-[72px] h-px bg-white/25" />

        <div className="mt-6 flex flex-col gap-4 font-body text-sm text-white/90 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} ProxiaTech. {t.footer.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {t.footer.legal.map((link) => (
              <a key={link} href="#" className="transition-colors hover:text-brand-cyan">
                {link}
              </a>
            ))}
            <div className="flex items-center gap-1 rounded-full bg-white/[0.06] p-0.5" role="group" aria-label={t.footer.language}>
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  aria-pressed={language === lang}
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs uppercase transition-colors",
                    language === lang ? "bg-white text-brand-slate" : "text-white/70 hover:text-white",
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
