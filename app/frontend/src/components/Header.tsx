import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/hooks/useLanguage";
import { BRAND_MARK, BRAND_NAME } from "@/lib/brand";

const SECTION_IDS = ["accueil", "services", "apropos", "portfolio", "temoignages", "contact"] as const;
const DARK_SURFACE_SECTIONS = new Set(["temoignages"]);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const [brandOnDarkSurface, setBrandOnDarkSurface] = useState(false);
  const { t, language } = useLanguage();
  const headerRef = useRef<HTMLElement | null>(null);
  const pendingSectionRef = useRef<string | null>(null);
  const pendingSectionTimeoutRef = useRef<number | null>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  const clearPendingSection = useCallback(() => {
    pendingSectionRef.current = null;
    if (pendingSectionTimeoutRef.current !== null) {
      window.clearTimeout(pendingSectionTimeoutRef.current);
      pendingSectionTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    const footerElement = document.querySelector("footer");

    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      const pendingSectionId = pendingSectionRef.current;
      if (pendingSectionId) {
        const pendingSection = document.getElementById(pendingSectionId);
        const pendingTop = pendingSection?.getBoundingClientRect().top;

        if (pendingTop !== undefined && Math.abs(pendingTop - 4) <= 18) {
          clearPendingSection();
        } else {
          return;
        }
      }

      const activationOffset = (headerRef.current?.offsetHeight ?? 88) + 34;
      let nextActiveSection = SECTION_IDS[0];

      for (const id of SECTION_IDS) {
        const element = document.getElementById(id);
        if (!element) {
          continue;
        }

        const { top } = element.getBoundingClientRect();
        if (top <= activationOffset) {
          nextActiveSection = id;
        }
      }

      const headerBottom = headerRef.current?.getBoundingClientRect().bottom ?? 0;
      const footerTop = footerElement?.getBoundingClientRect().top ?? Number.POSITIVE_INFINITY;

      setBrandOnDarkSurface(
        DARK_SURFACE_SECTIONS.has(nextActiveSection) || footerTop <= headerBottom + 8,
      );
      setActiveSection(nextActiveSection);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      clearPendingSection();
    };
  }, [clearPendingSection]);

  const navLinks = [
    { href: "#accueil", label: t.nav.home, id: "accueil" },
    { href: "#services", label: t.nav.services, id: "services" },
    { href: "#apropos", label: t.nav.about, id: "apropos" },
    { href: "#portfolio", label: t.nav.portfolio, id: "portfolio" },
    { href: "#temoignages", label: t.nav.testimonials, id: "temoignages" },
    { href: "#contact", label: t.nav.contact, id: "contact" },
  ];

  const mobileLabel =
    language === "fr" ? "Conception, build, lancement" : "Strategy, build, launch";

  const scrollToSection = useCallback((sectionId: string, options?: { updateHash?: boolean; behavior?: ScrollBehavior }) => {
    const target = document.getElementById(sectionId);
    if (!target) {
      return;
    }

    const targetTop = window.scrollY + target.getBoundingClientRect().top - 4;
    const behavior = options?.behavior ?? "smooth";

    setActiveSection(sectionId);
    setBrandOnDarkSurface(DARK_SURFACE_SECTIONS.has(sectionId));
    setIsOpen(false);

    if (behavior === "smooth") {
      pendingSectionRef.current = sectionId;
      if (pendingSectionTimeoutRef.current !== null) {
        window.clearTimeout(pendingSectionTimeoutRef.current);
      }
      pendingSectionTimeoutRef.current = window.setTimeout(() => {
        clearPendingSection();
      }, 1100);
    } else {
      clearPendingSection();
    }

    if (options?.updateHash !== false) {
      window.history.replaceState(null, "", `#${sectionId}`);
    }
    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior,
    });
  }, [clearPendingSection]);

  useEffect(() => {
    const scrollFromHash = (behavior: ScrollBehavior = "auto") => {
      const sectionId = window.location.hash.replace(/^#/, "");
      if (!sectionId) {
        return;
      }

      scrollToSection(sectionId, {
        updateHash: false,
        behavior,
      });
    };

    const initialTimer = window.setTimeout(() => {
      scrollFromHash("auto");
    }, 2100);

    const handleHashChange = () => {
      scrollFromHash("smooth");
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.clearTimeout(initialTimer);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [scrollToSection]);

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <motion.header
        ref={headerRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border backdrop-blur-2xl transition-all duration-500 ${
          scrolled
            ? "border-white/80 bg-white/82 shadow-[0_24px_80px_rgba(7,26,61,0.16)]"
            : "border-white/65 bg-white/60 shadow-[0_16px_50px_rgba(7,26,61,0.08)]"
        }`}
      >
        <motion.div
          style={{ scaleX }}
          className="absolute inset-x-0 top-0 h-[3px] origin-left bg-gradient-to-r from-[#0066FF] via-[#00A8FF] to-[#00D4FF]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,102,255,0.14),transparent_22%),radial-gradient(circle_at_78%_0%,rgba(0,212,255,0.12),transparent_20%)]" />

        <div className="relative px-4 sm:px-6">
          <div className="flex h-[68px] items-center justify-between gap-4">
            <motion.a
              href="#accueil"
              onClick={(event) => {
                event.preventDefault();
                scrollToSection("accueil");
              }}
              whileHover={{ scale: 1.02 }}
              className="flex min-w-0 items-center gap-3"
            >
              <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border border-slate-200/70 bg-white shadow-[0_16px_40px_rgba(0,102,255,0.18)]">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0066FF]/12 to-[#00D4FF]/18" />
                <img src={BRAND_MARK} alt={BRAND_NAME} className="relative h-7 w-7 object-contain" />
              </div>

              <div className="min-w-0">
                <div
                  className={`text-base font-bold tracking-tight transition-colors sm:text-lg ${
                    brandOnDarkSurface
                      ? "text-white drop-shadow-[0_8px_24px_rgba(7,26,61,0.4)]"
                      : "text-[#071a3d]"
                  }`}
                >
                  {BRAND_NAME}
                </div>
              </div>
            </motion.a>

            <nav className="hidden xl:flex items-center gap-1 rounded-full border border-slate-200/70 bg-white/72 p-1 shadow-inner shadow-slate-200/40">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection(link.id);
                  }}
                  className="relative rounded-full px-4 py-1.5 text-sm font-semibold text-slate-600 transition-colors"
                >
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00D4FF] shadow-[0_12px_28px_rgba(0,102,255,0.28)]"
                      transition={{ type: "spring", stiffness: 520, damping: 36, mass: 0.55 }}
                    />
                  )}
                  <span
                    className={`relative z-10 transition-colors ${
                      activeSection === link.id ? "text-white" : "hover:text-[#0066FF]"
                    }`}
                  >
                    {link.label}
                  </span>
                </a>
              ))}
            </nav>

            <div className="hidden xl:flex items-center gap-3">
              <LanguageSwitcher />
              <Button
                asChild
                className="h-10 rounded-full bg-[#071a3d] px-5 text-white shadow-[0_16px_34px_rgba(7,26,61,0.22)] transition-transform hover:translate-y-[-1px] hover:bg-[#0d2454]"
              >
                <a
                  href="#contact"
                  onClick={(event) => {
                    event.preventDefault();
                    scrollToSection("contact");
                  }}
                >
                  {t.cta.startProject}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="flex items-center gap-2 xl:hidden">
              <LanguageSwitcher />
              <button
                type="button"
                className="rounded-2xl border border-slate-200/70 bg-white/75 p-2 text-[#071a3d] transition-colors hover:bg-slate-50"
                onClick={() => setIsOpen((current) => !current)}
                aria-label="Menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={22} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={22} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.28 }}
                className="overflow-hidden border-t border-slate-200/80 xl:hidden"
              >
                <div className="space-y-2 py-4">
                  <div className="rounded-[1.5rem] border border-slate-200/70 bg-white/75 p-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0066FF]/12 to-[#00D4FF]/18">
                        <img src={BRAND_MARK} alt={BRAND_NAME} className="h-7 w-7 object-contain" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#071a3d]">
                          {BRAND_NAME}
                        </div>
                        <div className="text-[10px] uppercase tracking-[0.28em] text-slate-500">
                          {mobileLabel}
                        </div>
                      </div>
                    </div>
                  </div>

                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.id}
                      href={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToSection(link.id);
                      }}
                      className={`block rounded-[1.25rem] px-4 py-3 text-sm font-semibold transition-colors ${
                        activeSection === link.id
                          ? "bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-white shadow-[0_12px_28px_rgba(0,102,255,0.22)]"
                          : "bg-white/70 text-slate-700 hover:text-[#0066FF]"
                      }`}
                    >
                      {link.label}
                    </motion.a>
                  ))}

                  <Button
                    asChild
                    className="mt-2 h-12 w-full rounded-[1.25rem] bg-[#071a3d] text-white hover:bg-[#0d2454]"
                  >
                    <a
                      href="#contact"
                      onClick={(event) => {
                        event.preventDefault();
                        scrollToSection("contact");
                      }}
                    >
                      {t.cta.startProject}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </div>
  );
};

export default Header;
