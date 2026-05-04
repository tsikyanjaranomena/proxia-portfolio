import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/hooks/useLanguage";

const LOGO_URL = "https://mgx-backend-cdn.metadl.com/generate/images/798409/2026-05-03/n2ocl7qaaflq/proxiatech-logo.png";
const SECTION_IDS = ["accueil", "services", "apropos", "portfolio", "temoignages", "contact"] as const;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const { t } = useLanguage();
  const headerRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const activationOffset = (headerRef.current?.offsetHeight ?? 88) + 24;
      let nextActiveSection = SECTION_IDS[0];

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const { top } = el.getBoundingClientRect();
          if (top <= activationOffset) {
            nextActiveSection = id;
          }
        }
      }

      setActiveSection(nextActiveSection);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const navLinks = [
    { href: "#accueil", label: t.nav.home, id: "accueil" },
    { href: "#services", label: t.nav.services, id: "services" },
    { href: "#apropos", label: t.nav.about, id: "apropos" },
    { href: "#portfolio", label: t.nav.portfolio, id: "portfolio" },
    { href: "#temoignages", label: t.nav.testimonials, id: "temoignages" },
    { href: "#contact", label: t.nav.contact, id: "contact" },
  ];

  const scrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const headerOffset = (headerRef.current?.offsetHeight ?? 88) + 12;
    const targetTop = window.scrollY + target.getBoundingClientRect().top - headerOffset;

    setActiveSection(sectionId);
    setIsOpen(false);
    window.history.replaceState(null, "", `#${sectionId}`);
    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: "smooth",
    });
  };

  return (
    <motion.header
      ref={headerRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white ${
        scrolled
          ? "shadow-[0_4px_20px_rgb(0,0,0,0.04)] border-b border-slate-100 py-1"
          : "border-b border-transparent py-2"
      }`}
    >
      <motion.div
        style={{ scaleX }}
        className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#0066FF] via-[#00A8FF] to-[#00D4FF] origin-left z-50"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#accueil"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("accueil");
            }}
            whileHover={{ scale: 1.03 }}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#0066FF] to-[#00D4FF] rounded-xl blur-md opacity-0 group-hover:opacity-60 transition-opacity"
              />
              <img
                src={LOGO_URL}
                alt="Proxiatech Logo"
                className="w-10 h-10 object-contain relative"
              />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-bold text-[#0A0E27] tracking-tight">
                Proxia<span className="bg-gradient-to-r from-[#0066FF] to-[#00D4FF] bg-clip-text text-transparent">tech</span>
              </span>
              <span className="text-[10px] text-slate-500 tracking-widest uppercase mt-0.5">
                Digital Agency
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
                className="relative px-4 py-2 text-sm font-medium transition-colors rounded-full"
              >
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeNavPill"
                    className="absolute inset-0 bg-blue-50 rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors ${
                    activeSection === link.id
                      ? "text-[#0066FF]"
                      : "text-slate-700 hover:text-[#0066FF]"
                  }`}
                >
                  {link.label}
                </span>
              </a>
            ))}
          </nav>

          {/* Desktop: Language Switcher + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-white hover:opacity-90 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all rounded-full px-5 group"
              >
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("contact");
                  }}
                >
                  {t.cta.startProject}
                  <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Mobile: Language Switcher + Menu */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="text-[#0A0E27] p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Menu"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <nav className="flex flex-col gap-1 py-4">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.id);
                    }}
                    className={`text-sm font-medium px-4 py-3 rounded-lg transition-colors ${
                      activeSection === link.id
                        ? "bg-blue-50 text-[#0066FF]"
                        : "text-slate-700 hover:bg-slate-50 hover:text-[#0066FF]"
                    }`}
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                  className="px-2 mt-2"
                >
                  <Button
                    asChild
                    className="bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-white w-full rounded-full"
                  >
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("contact");
                      }}
                    >
                      {t.cta.startProject}
                      <ArrowRight className="ml-1.5 w-4 h-4" />
                    </a>
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Header;
