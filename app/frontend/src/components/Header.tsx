import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { BRAND_MARK, BRAND_NAME } from "@/lib/brand";
import ThemeToggle from "@/components/ThemeToggle";

const SECTION_IDS = ["accueil", "services", "apropos", "portfolio", "temoignages", "contact"] as const;

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const { t } = useLanguage();
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

      const activationOffset = (headerRef.current?.offsetHeight ?? 72) + 34;
      let nextActiveSection = SECTION_IDS[0];
      for (const id of SECTION_IDS) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= activationOffset) {
          nextActiveSection = id;
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

  const scrollToSection = useCallback((sectionId: string, options?: { updateHash?: boolean; behavior?: ScrollBehavior }) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    const targetTop = window.scrollY + target.getBoundingClientRect().top - 4;
    const behavior = options?.behavior ?? "smooth";

    setActiveSection(sectionId);
    setIsOpen(false);

    if (behavior === "smooth") {
      pendingSectionRef.current = sectionId;
      if (pendingSectionTimeoutRef.current !== null) {
        window.clearTimeout(pendingSectionTimeoutRef.current);
      }
      pendingSectionTimeoutRef.current = window.setTimeout(clearPendingSection, 1100);
    } else {
      clearPendingSection();
    }

    if (options?.updateHash !== false) {
      window.history.replaceState(null, "", `#${sectionId}`);
    }
    window.scrollTo({ top: Math.max(0, targetTop), behavior });
  }, [clearPendingSection]);

  useEffect(() => {
    const scrollFromHash = (behavior: ScrollBehavior = "auto") => {
      const sectionId = window.location.hash.replace(/^#/, "");
      if (!sectionId) return;
      scrollToSection(sectionId, { updateHash: false, behavior });
    };

    const initialTimer = window.setTimeout(() => scrollFromHash("auto"), 2100);
    const handleHashChange = () => scrollFromHash("smooth");
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.clearTimeout(initialTimer);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [scrollToSection]);

  return (
    <div className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <motion.header
        ref={headerRef}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`mx-auto max-w-7xl overflow-hidden rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? "border-slate-200 bg-white/95 shadow-[0_4px_24px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-black/95 dark:shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            : "border-slate-200/50 bg-white/75 shadow-none dark:border-white/5 dark:bg-black/75"
        }`}
      >
        {/* Barre de progression */}
        <motion.div
          style={{ scaleX }}
          className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-[#0066FF] to-[#00D4FF]"
        />

        <div className="px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-4">

            {/* Logo */}
            <motion.a
              href="#accueil"
              onClick={(e) => { e.preventDefault(); scrollToSection("accueil"); }}
              whileHover={{ scale: 1.02 }}
              className="flex flex-shrink-0 items-center gap-2.5"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/5">
                <img src={BRAND_MARK} alt={BRAND_NAME} className="h-6 w-6 object-contain" />
              </div>
              <span className="text-lg font-bold tracking-tight text-[#071a3d] dark:text-white">
                Proxia<span className="text-[#00D4FF]">Tech</span>
              </span>
            </motion.a>

            {/* Nav desktop */}
            <nav className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                  className="relative px-3.5 py-2 text-sm font-medium transition-colors"
                >
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeNavPill"
                      className="absolute inset-0 rounded-lg bg-[#0066FF]/8 dark:bg-white/8"
                      transition={{ type: "spring", stiffness: 500, damping: 38 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors ${
                    activeSection === link.id
                      ? "text-[#0066FF] dark:text-[#00D4FF]"
                      : "text-slate-600 hover:text-[#0066FF] dark:text-slate-400 dark:hover:text-white"
                  }`}>
                    {link.label}
                  </span>
                </a>
              ))}
            </nav>

            {/* Actions desktop */}
            <div className="hidden xl:flex items-center gap-2">
              <ThemeToggle variant="inline" />
              <Button
                asChild
                className="h-9 rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00D4FF] px-5 text-sm text-white shadow-none hover:opacity-90 transition-opacity"
              >
                <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}>
                  {t.cta.startProject}
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </a>
              </Button>
            </div>

            {/* Actions mobile */}
            <div className="flex items-center gap-2 xl:hidden">
              <ThemeToggle variant="inline" />
              <button
                type="button"
                onClick={() => setIsOpen((v) => !v)}
                aria-label="Menu"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <X size={18} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                      <Menu size={18} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Menu mobile déroulant */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden border-t border-slate-200/60 xl:hidden dark:border-white/8"
              >
                <div className="py-3 space-y-0.5">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.id}
                      href={link.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }}
                      className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                        activeSection === link.id
                          ? "bg-[#0066FF]/8 text-[#0066FF] dark:bg-white/8 dark:text-[#00D4FF]"
                          : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/5"
                      }`}
                    >
                      {activeSection === link.id && (
                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#0066FF] dark:bg-[#00D4FF]" />
                      )}
                      {link.label}
                    </motion.a>
                  ))}
                  <div className="pt-2">
                    <Button
                      asChild
                      className="h-10 w-full rounded-xl bg-gradient-to-r from-[#0066FF] to-[#00D4FF] text-sm text-white hover:opacity-90"
                    >
                      <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection("contact"); }}>
                        {t.cta.startProject}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
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
