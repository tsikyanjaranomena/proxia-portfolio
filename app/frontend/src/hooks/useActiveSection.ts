import { useEffect, useState } from "react";

/** Renvoie l'id de la section actuellement sous la ligne d'activation (scroll spy). */
export const useActiveSection = (ids: readonly string[], activationOffset = 140) => {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= activationOffset) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, activationOffset]);

  return active;
};

/** Défilement doux vers une section, en tenant compte du header fixe. */
export const scrollToSection = (id: string) => {
  const target = document.getElementById(id);
  if (!target) return;
  const top = window.scrollY + target.getBoundingClientRect().top - 72;
  window.history.replaceState(null, "", `#${id}`);
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
};
