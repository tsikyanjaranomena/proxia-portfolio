import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import {
  CONTACT_EMAIL,
  CONTACT_LOCATION,
  CONTACT_PHONE,
  CONTACT_PHONE_HREF,
} from "@/lib/contact";
import { BRAND_MARK } from "@/lib/brand";

const Footer = () => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const description = language === "fr"
    ? "Votre partenaire de confiance pour des solutions informatiques innovantes et performantes."
    : "Your trusted partner for innovative and high-performance IT solutions.";

  const servicesList = language === "fr"
    ? ["Développement Web", "Développement Mobile", "Solutions sur mesure", "Conseil IT", "Maintenance"]
    : ["Web Development", "Mobile Development", "Custom Solutions", "IT Consulting", "Maintenance"];

  const legalLinks = language === "fr"
    ? ["Mentions légales", "Politique de confidentialité", "CGU"]
    : ["Legal notice", "Privacy policy", "Terms of use"];

  const rights = language === "fr" ? "Tous droits réservés." : "All rights reserved.";

  return (
    <footer className="bg-gradient-to-br from-[#0A0E27] to-[#0F1642] text-white pt-16 pb-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0066FF] rounded-full mix-blend-screen filter blur-3xl opacity-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#00D4FF] rounded-full mix-blend-screen filter blur-3xl opacity-10 pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src={BRAND_MARK}
                alt="ProxiaTech Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-xl font-bold">
                Proxia<span className="text-[#00D4FF]">Tech</span>
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              {description}
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#0066FF] flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#0066FF] flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#0066FF] flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li><a href="#accueil" className="hover:text-[#00D4FF] transition-colors">{t.nav.home}</a></li>
              <li><a href="#services" className="hover:text-[#00D4FF] transition-colors">{t.nav.services}</a></li>
              <li><a href="#apropos" className="hover:text-[#00D4FF] transition-colors">{t.nav.about}</a></li>
              <li><a href="#portfolio" className="hover:text-[#00D4FF] transition-colors">{t.nav.portfolio}</a></li>
              <li><a href="#contact" className="hover:text-[#00D4FF] transition-colors">{t.nav.contact}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.footer.servicesTitle}</h4>
            <ul className="space-y-2 text-sm text-white/60">
              {servicesList.map((s) => (
                <li key={s}>
                  <a href="#services" className="hover:text-[#00D4FF] transition-colors">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t.footer.contactTitle}</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#00D4FF]" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-[#00D4FF] transition-colors break-all">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#00D4FF]" />
                <a href={`tel:${CONTACT_PHONE_HREF}`} className="hover:text-[#00D4FF] transition-colors">
                  {CONTACT_PHONE}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#00D4FF]" />
                <span>{CONTACT_LOCATION}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <div>
            © {currentYear} ProxiaTech. {rights}
          </div>
          <div className="flex gap-6">
            {legalLinks.map((link) => (
              <a key={link} href="#" className="hover:text-[#00D4FF] transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
