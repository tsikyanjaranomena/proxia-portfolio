import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "@/components/brand/Logo";
import Button from "@/components/common/Button";
import { ListIcon, XIcon } from "@/components/icons";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { EASE_OUT_EXPO } from "@/components/motion/Reveal";
import { NAV_ITEMS, PROJECT_PATH, SECTION_IDS } from "@/data/site";
import { scrollToSection, useActiveSection } from "@/hooks/useActiveSection";
import { useLanguage } from "@/hooks/useLanguage";
import { cn } from "@/lib/utils";

const NAV_IDS = NAV_ITEMS.map((item) => item.id);
/** Durée de fermeture du menu mobile (ms). */
const MENU_CLOSE_MS = 320;
/** Filet de sécurité si la fin d'animation n'est pas signalée (onglet en arrière-plan…). */
const MENU_SCROLL_FALLBACK_MS = 900;

const Header = () => {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(NAV_IDS);
  // Section à atteindre une fois le menu mobile refermé : défiler pendant qu'il se replie
  // décale la page sous le doigt et certains navigateurs mobiles annulent le défilement.
  const pendingScroll = useRef<string | null>(null);
  const fallbackTimer = useRef<number>();

  const flushPendingScroll = () => {
    window.clearTimeout(fallbackTimer.current);
    const id = pendingScroll.current;
    pendingScroll.current = null;
    if (id) requestAnimationFrame(() => scrollToSection(id));
  };
  useEffect(() => () => window.clearTimeout(fallbackTimer.current), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu mobile au changement de page et avec la touche Échap
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /** Va à une section : défilement sur l'accueil, sinon retour à l'accueil sur l'ancre. */
  const go = (id: string) => (event: React.MouseEvent) => {
    event.preventDefault();
    if (!onHome) {
      setOpen(false);
      navigate(`/#${id}`);
      return;
    }
    if (open) {
      pendingScroll.current = id;
      setOpen(false);
      window.clearTimeout(fallbackTimer.current);
      fallbackTimer.current = window.setTimeout(flushPendingScroll, MENU_SCROLL_FALLBACK_MS);
    } else {
      scrollToSection(id);
    }
  };

  const cta = (className: string, size?: "block") => (
    <Button asLink={PROJECT_PATH} variant="primary" size={size ?? "sm"} className={className}>
      {t.nav.cta}
    </Button>
  );

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE_OUT_EXPO }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500",
        scrolled || open
          ? "border-b border-line/70 bg-surface/90 shadow-[0_8px_30px_-20px_rgb(15_23_42/0.25)] backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <div
        className={cn(
          "container flex items-center justify-between gap-6 transition-[height] duration-500 ease-out-expo",
          scrolled ? "h-[72px]" : "h-[96px] lg:h-[120px]",
        )}
      >
        <Link to={`/#${SECTION_IDS.home}`} onClick={go(SECTION_IDS.home)} className="shrink-0" aria-label="ProxiaTech">
          <Logo className={cn("transition-[height] duration-500 ease-out-expo", scrolled ? "h-10" : "h-11 lg:h-[50px]")} />
        </Link>

        <nav className="ml-auto hidden items-center gap-6 lg:flex" aria-label="Navigation principale">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              onClick={go(item.id)}
              className={cn(
                "group relative py-2 font-body text-sm transition-colors duration-300",
                onHome && active === item.id ? "text-brand" : "text-body hover:text-ink",
              )}
            >
              {t.nav[item.label]}
              <span
                className={cn(
                  "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-brand-gradient transition-transform duration-500 ease-out-expo",
                  onHome && active === item.id ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                )}
              />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4 lg:ml-16 lg:gap-6">
          <ThemeToggle />
          {/* Pas de bouton « Démarrer un projet » sur la page du formulaire elle-même */}
          {pathname !== PROJECT_PATH && cta("hidden sm:inline-flex")}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="flex size-[42px] items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-brand/40 hover:text-brand lg:hidden"
          >
            {open ? <XIcon size={20} /> : <ListIcon size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence onExitComplete={flushPendingScroll}>
        {open && (
          <motion.nav
            id="mobile-navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: MENU_CLOSE_MS / 1000, ease: EASE_OUT_EXPO }}
            className="overflow-hidden lg:hidden"
            aria-label="Navigation mobile"
          >
            <div className="container flex flex-col gap-1 pb-6">
              {NAV_ITEMS.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={`/#${item.id}`}
                  onClick={go(item.id)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index, duration: 0.4, ease: EASE_OUT_EXPO }}
                  className={cn(
                    "rounded-md px-3 py-3 font-body text-[15px] transition-colors",
                    onHome && active === item.id ? "bg-brand/[0.06] text-brand" : "text-body hover:bg-chip",
                  )}
                >
                  {t.nav[item.label]}
                </motion.a>
              ))}
              {pathname !== PROJECT_PATH && cta("mt-3 sm:hidden", "block")}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
